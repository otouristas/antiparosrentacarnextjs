/**
 * Pexels hero pipeline, dormant until PEXELS_API_KEY is set.
 *
 * PEXELS_API_KEY=… npx tsx scripts/media/fetch-pexels.ts
 *
 * Searches curated Cyclades / Aegean queries, downloads originals, crops to
 * 2560×1440 (desktop) and 1200×1600 (mobile), exports AVIF+WebP into
 * public/images/hero/, and writes a credit manifest (Pexels licence requires
 * attribution).
 *
 * Excluded photographers until licensing is confirmed: "Ali Boyle",
 * "the common wanderer".
 */
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "public/images/hero");
const CREDITS = path.join(ROOT, "data/pexels-hero-credits.json");

const QUERIES = [
  "paros greece beach golden hour",
  "antiparos island aerial",
  "cyclades village white houses sea",
  "aegean sea ferry sunset",
  "naoussa paros harbour",
];

const EXCLUDED_PHOTOGRAPHERS = new Set(
  ["ali boyle", "the common wanderer"].map((s) => s.toLowerCase()),
);

type PexelsPhoto = {
  id: number;
  width: number;
  height: number;
  photographer: string;
  photographer_url: string;
  url: string;
  src: { original: string; large2x: string };
  alt: string;
};

async function main() {
  const key = process.env.PEXELS_API_KEY?.trim();
  if (!key) {
    console.log(
      " PEXELS_API_KEY is not set, pipeline dormant, nothing fetched.",
    );
    console.log(" Set the key and re-run to download hero art.");
    process.exit(0);
  }

  mkdirSync(OUT_DIR, { recursive: true });

  // sharp is already a project dependency (fleet normalisation).
  const sharp = (await import("sharp")).default;

  const credits: {
    query: string;
    id: number;
    photographer: string;
    photographerUrl: string;
    pexelsUrl: string;
    files: string[];
  }[] = [];

  for (const query of QUERIES) {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=8&orientation=landscape`,
      { headers: { Authorization: key } },
    );
    if (!res.ok) {
      console.error(` search failed for "${query}": ${res.status}`);
      continue;
    }
    const data = (await res.json()) as { photos: PexelsPhoto[] };
    const photo = data.photos.find(
      (p) => !EXCLUDED_PHOTOGRAPHERS.has(p.photographer.toLowerCase()),
    );
    if (!photo) {
      console.log(` no eligible photo for "${query}"`);
      continue;
    }

    const raw = await fetch(photo.src.original);
    if (!raw.ok) {
      console.error(` download failed for photo ${photo.id}`);
      continue;
    }
    const buf = Buffer.from(await raw.arrayBuffer());
    const slug = `pexels-${photo.id}`;
    const files: string[] = [];

    for (const [suffix, w, h] of [
      ["desktop", 2560, 1440],
      ["mobile", 1200, 1600],
    ] as const) {
      for (const format of ["webp", "avif"] as const) {
        const name = `${slug}-${suffix}.${format}`;
        const out = path.join(OUT_DIR, name);
        if (!existsSync(out)) {
          await sharp(buf)
            .resize(w, h, { fit: "cover", position: "attention" })
            .toFormat(format, { quality: 82 })
            .toFile(out);
        }
        files.push(`/images/hero/${name}`);
      }
    }

    credits.push({
      query,
      id: photo.id,
      photographer: photo.photographer,
      photographerUrl: photo.photographer_url,
      pexelsUrl: photo.url,
      files,
    });
    console.log(` ${slug} ← ${photo.photographer} (${query})`);
  }

  writeFileSync(
    CREDITS,
    `${JSON.stringify({ generatedAt: new Date().toISOString(), credits }, null, 2)}\n`,
  );
  console.log(`\n wrote ${path.relative(ROOT, CREDITS)}`);
  console.log(` wrote assets under ${path.relative(ROOT, OUT_DIR)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
