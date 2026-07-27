/**
 * Normalise the GoCars vehicle renders into one visually consistent set.
 *
 * npm run fleet:images # uses cached downloads
 * npm run fleet:images -- --refetch
 *
 * The source renders are one style family but are wildly inconsistent in the
 * ways that actually show in a grid:
 * - four canvas sizes (743x403, 750x450, 750x550, 600x450), so every vehicle
 * sits at a different scale and baseline
 * - nine are 8-bit indexed colour, which bands on gradients
 * - at least one is fully opaque white with no alpha, so it punches a white
 * rectangle through a card while its neighbours float
 * - ground treatment varies: mirror reflection / drop shadow / nothing
 *
 * Output: 33 identical 1200x800 RGBA WebPs, vehicle scaled to a common width,
 * baseline locked, one synthetic contact shadow on all of them.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import type { FleetArtifact } from "@/data/fleet-types";

const ROOT = process.cwd();
const FLEET_JSON = path.join(ROOT, "data/fleet.json");
const CACHE_DIR = path.join(ROOT, "data/gocars/thumbs");
const OUT_DIR = path.join(ROOT, "public/fleet/normalized");
const REPORT = path.join(ROOT, "data/fleet-images.report.json");

/** Output canvas. 3:2 matches the card aspect and leaves room for the shadow. */
const W = 1200;
const H = 800;
/** Vehicle occupies this much of the canvas width, leaving consistent margins. */
const TARGET_W = 0.84;
/** Ground line, as a fraction of height, where every vehicle's wheels sit. */
const BASELINE = 0.82;
/** How close to white counts as background during the flood fill. */
const WHITE_TOLERANCE = 22;

const REFETCH = process.argv.includes("--refetch");

type Report = {
  typeId: string;
  slug: string;
  source: { w: number; h: number; hasAlpha: boolean; channels: number };
  backgroundRemoved: boolean;
  trimmed: { w: number; h: number };
  notes: string[];
};

function fail(msg: string): never {
  console.error(`\n normalize-fleet FAILED\n ${msg}\n`);
  process.exit(1);
}

async function cacheThumb(typeId: string, url: string): Promise<Buffer> {
  mkdirSync(CACHE_DIR, { recursive: true });
  const file = path.join(CACHE_DIR, `${typeId}.png`);
  if (existsSync(file) && !REFETCH) return readFileSync(file);

  const res = await fetch(url, {
    headers: {
      "User-Agent": "AGGELOS-Rentals-App/0.1 (+https://antiparosrentacar.com)",
    },
  });
  if (!res.ok) fail(`GET ${url} -> HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(file, buf);
  return buf;
}

/**
 * Make the backdrop transparent by flood-filling near-white inward from the
 * canvas edges.
 *
 * Edge-connectivity is the whole point: a simple "every near-white pixel becomes
 * transparent" threshold would punch holes through white bodywork, white roofs
 * and headlights. Only background reachable from the border is removed.
 */
function removeWhiteBackground(
  data: Buffer,
  width: number,
  height: number,
): { data: Buffer; removed: number } {
  const alphaIdx = (i: number) => i * 4 + 3;
  const isNearWhite = (i: number) => {
    const o = i * 4;
    return (
      data[o] >= 255 - WHITE_TOLERANCE &&
      data[o + 1] >= 255 - WHITE_TOLERANCE &&
      data[o + 2] >= 255 - WHITE_TOLERANCE
    );
  };

  const visited = new Uint8Array(width * height);
  // Typed-array stack rather than recursion, 337k pixels would blow the call stack.
  const stack = new Int32Array(width * height);
  let sp = 0;

  const pushIf = (x: number, y: number) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const i = y * width + x;
    if (visited[i]) return;
    visited[i] = 1;
    if (!isNearWhite(i)) return;
    stack[sp++] = i;
  };

  for (let x = 0; x < width; x++) {
    pushIf(x, 0);
    pushIf(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    pushIf(0, y);
    pushIf(width - 1, y);
  }

  let removed = 0;
  while (sp > 0) {
    const i = stack[--sp];
    data[alphaIdx(i)] = 0;
    removed++;
    const x = i % width;
    const y = (i / width) | 0;
    pushIf(x + 1, y);
    pushIf(x - 1, y);
    pushIf(x, y + 1);
    pushIf(x, y - 1);
  }

  return { data, removed };
}

/**
 * Drop the burned-in "AGGELOS RENTALS" wordmark.
 *
 * It is baked into the pixels of every GoCars render, at a different size each
 * time, floating in the top-right corner detached from the vehicle, so on a
 * card it reads as a stray logo hovering in space. Because it is a *separate*
 * blob it can be removed structurally rather than by inpainting: label the
 * connected components of opaque pixels, keep the vehicle (the largest), and
 * discard small isolated blobs sitting in the top-right.
 *
 * The size and position tests together are what make this safe, a wing mirror
 * or roof rack is either connected to the body or not small-and-top-right.
 */
function dropDetachedMarks(
  data: Buffer,
  width: number,
  height: number,
): { data: Buffer; dropped: number } {
  const n = width * height;
  const label = new Int32Array(n).fill(-1);
  const stack = new Int32Array(n);
  const opaque = (i: number) => data[i * 4 + 3] > 40;

  const components: {
    size: number;
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  }[] = [];

  for (let start = 0; start < n; start++) {
    if (label[start] !== -1 || !opaque(start)) continue;
    const id = components.length;
    let sp = 0;
    stack[sp++] = start;
    label[start] = id;
    let size = 0;
    let minX = width;
    let maxX = 0;
    let minY = height;
    let maxY = 0;

    while (sp > 0) {
      const i = stack[--sp];
      size++;
      const x = i % width;
      const y = (i / width) | 0;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;

      const neighbours = [
        x + 1 < width ? i + 1 : -1,
        x - 1 >= 0 ? i - 1 : -1,
        y + 1 < height ? i + width : -1,
        y - 1 >= 0 ? i - width : -1,
      ];
      for (const j of neighbours) {
        if (j < 0 || label[j] !== -1 || !opaque(j)) continue;
        label[j] = id;
        stack[sp++] = j;
      }
    }
    components.push({ size, minX, maxX, minY, maxY });
  }

  if (components.length <= 1) return { data, dropped: 0 };

  let largest = 0;
  for (let i = 1; i < components.length; i++) {
    if (components[i].size > components[largest].size) largest = i;
  }
  const vehicleSize = components[largest].size;

  const doomed = new Set<number>();
  components.forEach((c, i) => {
    if (i === largest) return;
    const small = c.size < vehicleSize * 0.06;
    const cx = (c.minX + c.maxX) / 2;
    const cy = (c.minY + c.maxY) / 2;
    const topRight = cx > width * 0.5 && cy < height * 0.5;
    // Anything tiny is noise regardless of where it sits.
    if ((small && topRight) || c.size < vehicleSize * 0.005) doomed.add(i);
  });

  if (doomed.size === 0) return { data, dropped: 0 };

  let dropped = 0;
  for (let i = 0; i < n; i++) {
    if (doomed.has(label[i])) {
      data[i * 4 + 3] = 0;
      dropped++;
    }
  }
  return { data, dropped };
}

/** Soft elliptical contact shadow, identical for every vehicle. */
function shadowSvg(width: number): Buffer {
  const w = Math.round(width * 0.92);
  const h = Math.round(w * 0.09);
  return Buffer.from(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
 <defs>
 <radialGradient id="g" cx="50%" cy="50%" r="50%">
 <stop offset="0%" stop-color="#112553" stop-opacity="0.34"/>
 <stop offset="55%" stop-color="#112553" stop-opacity="0.15"/>
 <stop offset="100%" stop-color="#112553" stop-opacity="0"/>
 </radialGradient>
 </defs>
 <ellipse cx="${w / 2}" cy="${h / 2}" rx="${w / 2}" ry="${h / 2}" fill="url(#g)"/>
 </svg>`,
  );
}

async function main() {
  if (!existsSync(FLEET_JSON))
    fail("data/fleet.json not found, run `npm run fleet:sync` first");
  const fleet = JSON.parse(readFileSync(FLEET_JSON, "utf8")) as FleetArtifact;

  mkdirSync(OUT_DIR, { recursive: true });
  const reports: Report[] = [];

  for (const v of fleet.vehicles) {
    const url = v.images.remote;
    if (!url) {
      console.log(` ${v.slug.padEnd(28)} SKIP, no remote render`);
      continue;
    }

    const notes: string[] = [];
    const src = await cacheThumb(v.typeId, url);

    const meta = await sharp(src).metadata();
    const srcInfo = {
      w: meta.width ?? 0,
      h: meta.height ?? 0,
      hasAlpha: Boolean(meta.hasAlpha),
      channels: meta.channels ?? 0,
    };
    if ((meta as { paletteBitDepth?: number }).paletteBitDepth) {
      notes.push("indexed-colour source, promoted to RGBA");
    }

    // Always work in RGBA so palette sources stop banding.
    const raw = await sharp(src)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    let pixels = raw.data;
    const { width, height } = raw.info;

    // If nothing is transparent, the backdrop is baked in, strip it.
    let opaque = true;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] < 250) {
        opaque = false;
        break;
      }
    }
    let backgroundRemoved = false;
    if (opaque) {
      const out = removeWhiteBackground(pixels, width, height);
      pixels = out.data;
      backgroundRemoved = true;
      const pct = Math.round((out.removed / (width * height)) * 100);
      notes.push(
        `opaque source, white backdrop flood-filled (${pct}% removed)`,
      );
      if (pct < 5)
        notes.push("WARNING: little was removed; backdrop may not be white");
    }

    // Remove the burned-in wordmark before trimming, so it cannot inflate the
    // bounding box and shrink the vehicle.
    const marks = dropDetachedMarks(pixels, width, height);
    if (marks.dropped > 0) {
      notes.push(`detached mark removed (${marks.dropped}px)`);
      pixels = marks.data;
    }

    // Trim to the vehicle's actual bounds, then rescale to a common width so
    // every vehicle reads at the same size regardless of its source canvas.
    const trimmed = await sharp(pixels, { raw: { width, height, channels: 4 } })
      .png()
      .trim({ threshold: 1 })
      .toBuffer({ resolveWithObject: true });

    const tW = trimmed.info.width;
    const tH = trimmed.info.height;

    const maxW = Math.round(W * TARGET_W);
    const maxH = Math.round(H * 0.62);
    const scale = Math.min(maxW / tW, maxH / tH);
    const drawW = Math.max(1, Math.round(tW * scale));
    const drawH = Math.max(1, Math.round(tH * scale));

    const vehicle = await sharp(trimmed.data)
      .resize(drawW, drawH)
      .png()
      .toBuffer();

    const baselineY = Math.round(H * BASELINE);
    const top = baselineY - drawH;
    const left = Math.round((W - drawW) / 2);

    // Shadow sits on the baseline, slightly behind the wheels.
    const shadow = await sharp(shadowSvg(drawW)).blur(12).png().toBuffer();
    const shadowMeta = await sharp(shadow).metadata();
    const shadowTop = baselineY - Math.round((shadowMeta.height ?? 0) * 0.55);
    const shadowLeft = Math.round((W - (shadowMeta.width ?? 0)) / 2);

    await sharp({
      create: {
        width: W,
        height: H,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .composite([
        {
          input: shadow,
          top: Math.max(0, shadowTop),
          left: Math.max(0, shadowLeft),
        },
        { input: vehicle, top: Math.max(0, top), left: Math.max(0, left) },
      ])
      .webp({ quality: 90, effort: 5 })
      .toFile(path.join(OUT_DIR, `${v.typeId}.webp`));

    reports.push({
      typeId: v.typeId,
      slug: v.slug,
      source: srcInfo,
      backgroundRemoved,
      trimmed: { w: tW, h: tH },
      notes,
    });

    const flag = notes.length ? ` <- ${notes.join("; ")}` : "";
    console.log(
      ` ${v.slug.padEnd(28)} ${String(srcInfo.w).padStart(4)}x${String(srcInfo.h).padEnd(4)}` +
        ` -> 1200x800${flag}`,
    );
  }

  writeFileSync(
    REPORT,
    `${JSON.stringify({ generatedAt: new Date().toISOString(), reports }, null, 2)}\n`,
  );

  // Persist normalised paths back onto the fleet artifact so runtime readers
  // do not need to guess the public URL.
  for (const v of fleet.vehicles) {
    const out = path.join(OUT_DIR, `${v.typeId}.webp`);
    if (existsSync(out)) {
      v.images.normalized = `/fleet/normalized/${v.typeId}.webp`;
    }
  }
  writeFileSync(FLEET_JSON, `${JSON.stringify(fleet, null, 2)}\n`);

  const removed = reports.filter((r) => r.backgroundRemoved);
  const warned = reports.filter((r) =>
    r.notes.some((n) => n.startsWith("WARNING")),
  );

  console.log(`\n ${reports.length} renders normalised to ${W}x${H} RGBA`);
  if (removed.length) {
    console.log(
      ` backdrop stripped from ${removed.length}: ${removed.map((r) => r.slug).join(", ")}`,
    );
  }
  if (warned.length) {
    console.log(`\n NEEDS A HUMAN LOOK (${warned.length}):`);
    for (const r of warned)
      console.log(` ${r.slug} (${r.typeId}), ${r.notes.join("; ")}`);
  }
  console.log(`\n wrote ${path.relative(ROOT, OUT_DIR)}/*.webp`);
  console.log(` wrote ${path.relative(ROOT, REPORT)}`);
  console.log(
    ` updated ${path.relative(ROOT, FLEET_JSON)} with images.normalized`,
  );
}

main();
