/**
 * Normalize the committed GoCars response into data/fleet.json.
 *
 * npx tsx scripts/fleet/normalize.ts
 *
 * Groups 42 models into 33 types, applies the category mapping, resolves stable
 * slugs, and coerces GoCars' inconsistent field encodings. Pure function of the
 * committed inputs, no network.
 *
 * Hard-fails (writing nothing) on an unmapped type_id or a missing slug, so new
 * GoCars inventory always requires a human decision about where it belongs.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { asArray } from "@/lib/gocars-core/client";
import type { GoCarsModel } from "@/lib/gocars-core/types";
import { TYPE_ID_TO_CATEGORY, getCategory } from "@/data/fleet-categories";
import type { FleetArtifact, FleetVehicleType } from "@/data/fleet-types";

const ROOT = process.cwd();
const RAW_PATH = path.join(ROOT, "data/gocars/models.raw.json");
const META_PATH = path.join(ROOT, "data/gocars/models.meta.json");
const SLUGS_PATH = path.join(ROOT, "data/fleet-slugs.json");
const IMAGES_PATH = path.join(ROOT, "data/fleet-images.json");
const OUT_PATH = path.join(ROOT, "data/fleet.json");

function fail(message: string): never {
  console.error(
    `\n normalize FAILED\n ${message}\n\n data/fleet.json was not written.\n`,
  );
  process.exit(1);
}

/* ---- GoCars field coercion -------------------------------------------------
 * Verified against the live response:
 * - every boolean is the string "T" | "F" | null
 * - air_condition is a STRING ENUM ("aircondition" | "noaircondition"), not a bool
 * - lowest_price arrives as int, string AND float within one response
 * - price is HTML-entity encoded ("171,00 &euro;") and must never be rendered
 * -------------------------------------------------------------------------- */

const toBool = (v: unknown): boolean => v === "T";

const toNum = (v: unknown): number | null => {
  if (v === null || v === undefined || v === "") return null;
  const n = Number(String(v).replace(",", "."));
  return Number.isFinite(n) ? n : null;
};

const toInt = (v: unknown): number | null => {
  const n = toNum(v);
  return n === null ? null : Math.round(n);
};

const hasAircon = (v: unknown): boolean => v === "aircondition";

const toStr = (v: unknown): string | null => {
  const s = v === null || v === undefined ? "" : String(v).trim();
  return s === "" ? null : s;
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function readJson<T>(p: string, what: string): T {
  if (!existsSync(p)) {
    fail(
      `${what} not found at ${path.relative(ROOT, p)}\n Run: npx tsx scripts/fleet/fetch-gocars.ts`,
    );
  }
  try {
    return JSON.parse(readFileSync(p, "utf8")) as T;
  } catch (err) {
    fail(`${what} is not valid JSON: ${(err as Error).message}`);
  }
}

function main() {
  const raw = readJson<GoCarsModel[] | Record<string, GoCarsModel>>(
    RAW_PATH,
    "raw GoCars response",
  );
  const meta = existsSync(META_PATH)
    ? readJson<{ fetchedAt?: string }>(META_PATH, "fetch metadata")
    : {};
  const slugFile = readJson<{ slugs: Record<string, string> }>(
    SLUGS_PATH,
    "slug map",
  );
  const slugs = slugFile.slugs ?? {};
  const imageOverrides = existsSync(IMAGES_PATH)
    ? readJson<Record<string, string>>(IMAGES_PATH, "image overrides")
    : {};

  const models = asArray<GoCarsModel>(raw);
  if (models.length === 0) fail("raw response contained no models");

  // --- group models by type_id, preserving GoCars order ---
  const byType = new Map<string, GoCarsModel[]>();
  for (const m of models) {
    const id = String(m.type_id);
    const bucket = byType.get(id);
    if (bucket) bucket.push(m);
    else byType.set(id, [m]);
  }

  // --- fail loudly on anything a human has not classified ---
  const unmapped = [...byType.keys()].filter((id) => !TYPE_ID_TO_CATEGORY[id]);
  if (unmapped.length > 0) {
    const lines = unmapped.map((id) => {
      const first = byType.get(id)![0];
      return ` "${id}": "…", // ${first.type_name}, ${byType
        .get(id)!
        .map((m) => `${m.make_name} ${m.model_name}`.trim())
        .join(", ")}`;
    });
    fail(
      `${unmapped.length} GoCars type_id(s) are not in TYPE_ID_TO_CATEGORY.\n` +
        ` Add them to src/data/fleet-categories.ts, do not guess by name:\n\n${lines.join("\n")}\n`,
    );
  }

  const missingSlugs = [...byType.keys()].filter((id) => !slugs[id]);
  if (missingSlugs.length > 0) {
    const lines = missingSlugs.map((id) => {
      const first = byType.get(id)![0];
      return ` "${id}": "${slugify(first.type_name || `type-${id}`)}", // ${first.type_name}`;
    });
    fail(
      `${missingSlugs.length} type_id(s) have no stable slug.\n` +
        ` Add to data/fleet-slugs.json (proposed, review before committing):\n\n${lines.join("\n")}\n`,
    );
  }

  const seenSlugs = new Map<string, string>();
  const vehicles: FleetVehicleType[] = [];
  let order = 0;

  for (const [typeId, group] of [...byType.entries()].sort(
    (a, b) => Number(a[0]) - Number(b[0]),
  )) {
    const head = group[0];
    const slug = slugs[typeId];

    const clash = seenSlugs.get(slug);
    if (clash)
      fail(`slug "${slug}" is used by both type_id ${clash} and ${typeId}`);
    seenSlugs.set(slug, typeId);

    const category = TYPE_ID_TO_CATEGORY[typeId];
    const categoryDef = getCategory(category);
    if (!categoryDef)
      fail(`type_id ${typeId} maps to unknown category "${category}"`);

    // Cheapest real rate across the type's models. Zeros mean "not priced online"
    // (type 79, the 9-seater), not "free".
    const prices = group
      .map((m) => toNum(m.lowest_price))
      .filter((n): n is number => n !== null && n > 0);
    const priceFrom = prices.length > 0 ? Math.min(...prices) : null;

    const available = group.some(
      (m) => toBool(m.availability) && toBool(m.status),
    );

    vehicles.push({
      typeId,
      slug,
      category,
      vehicleType:
        (head.vehicle_type as FleetVehicleType["vehicleType"]) ?? "car",
      typeName: head.type_name ?? `Type ${typeId}`,
      models: group.map((m) => ({
        make: toStr(m.make_name) ?? "",
        model: toStr(m.model_name) ?? "",
        note: toStr(m.model_description) ?? "",
      })),

      priceFrom,
      priceCurrency: "EUR",
      minimumDays: toInt(head.minimum_days),

      specs: {
        passengers: toInt(head.passengers),
        doors: toInt(head.doors),
        luggages: toInt(head.luggages),
        handbags: toInt(head.handbags),
        transmission: toStr(head.transmission),
        fuel: toStr(head.fuel),
        cc: toInt(head.cc),
        airCondition: hasAircon(head.air_condition),
      },

      features: {
        abs: toBool(head.abs),
        bluetooth: toBool(head.bluetooth),
        navigation: toBool(head.navigation),
        usb: toBool(head.usb),
        appleCarplay: toBool(head.apple_carplay),
        androidAuto: toBool(head.android_auto),
        cruiseControl: toBool(head.cruise_control),
        keyless: toBool(head.keyless),
        rearTrunk: toBool(head.rear_trunk),
        tpms: toBool(head.tpms),
      },

      images: {
        local: imageOverrides[typeId] ?? null,
        remote: toStr(head.thumb_path),
      },

      // An unpriced type cannot complete a booking, so it must not advertise one.
      bookable:
        categoryDef.bookable &&
        available &&
        priceFrom !== null &&
        priceFrom > 0,
      order: order++,
    });
  }

  const artifact: FleetArtifact = {
    generatedAt: new Date().toISOString(),
    sourceFetchedAt: meta.fetchedAt ?? "unknown",
    typeCount: vehicles.length,
    modelCount: models.length,
    vehicles,
  };

  writeFileSync(OUT_PATH, `${JSON.stringify(artifact, null, 2)}\n`, "utf8");

  const unbookable = vehicles.filter((v) => !v.bookable);
  const noImage = vehicles.filter(
    (v) => v.bookable && !v.images.local && !v.images.remote,
  );

  /* --- source-data sanity -------------------------------------------------
   * GoCars admin data contains fields that are wrong or meaningless for the
   * vehicle class (petrol cars flagged diesel, quad bikes flagged air-conditioned).
   * Rendering these verbatim reads as carelessness, so surface them on every sync.
   * Suppression of class-irrelevant specs happens at render time; genuinely wrong
   * values have to be corrected in the GoCars admin.
   * ---------------------------------------------------------------------- */
  const suspicious: string[] = [];
  for (const v of vehicles) {
    if (v.vehicleType !== "car" && v.specs.airCondition) {
      suspicious.push(
        `${v.slug} (${v.typeId}): ${v.vehicleType} flagged air-conditioned`,
      );
    }
    if (v.vehicleType !== "car" && v.specs.doors !== null) {
      suspicious.push(
        `${v.slug} (${v.typeId}): ${v.vehicleType} reports ${v.specs.doors} doors`,
      );
    }
    if (v.specs.fuel === "diesel" && v.category === "mini") {
      suspicious.push(
        `${v.slug} (${v.typeId}): fuel=diesel on ${v.models.map((m) => m.model).join("/")}, likely petrol`,
      );
    }
  }

  console.log(` ${vehicles.length} types from ${models.length} models`);
  for (const c of new Set(vehicles.map((v) => v.category))) {
    const list = vehicles.filter((v) => v.category === c);
    const priced = list
      .filter((v) => v.priceFrom !== null)
      .map((v) => v.priceFrom!);
    const range = priced.length
      ? `€${Math.min(...priced)}, €${Math.max(...priced)}`
      : "unpriced";
    console.log(
      ` ${c.padEnd(16)} ${String(list.length).padStart(2)} types ${range}`,
    );
  }
  if (unbookable.length) {
    console.log(
      ` not bookable: ${unbookable.map((v) => `${v.slug}(${v.typeId})`).join(", ")}`,
    );
  }
  if (noImage.length) {
    console.log(` WARNING no image: ${noImage.map((v) => v.slug).join(", ")}`);
  }
  if (suspicious.length) {
    console.log(
      `\n GoCars source-data warnings (${suspicious.length}), fix in GoCars admin:`,
    );
    for (const s of suspicious) console.log(` - ${s}`);
    console.log("");
  }
  console.log(` wrote ${path.relative(ROOT, OUT_PATH)}`);
}

main();
