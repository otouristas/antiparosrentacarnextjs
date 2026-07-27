/**
 * Fetch the live GoCars model catalogue and commit it as a provenance artifact.
 *
 * This is a deliberate, human/cron-triggered step, it is NEVER part of `next build`.
 * The build reads only the committed `data/fleet.json`, so a GoCars outage can
 * never break a deploy or a rollback.
 *
 * npx tsx scripts/fleet/fetch-gocars.ts [--allow-removals]
 *
 * Writes (only on success):
 * data/gocars/models.raw.json byte-exact response body
 * data/gocars/models.meta.json fetch provenance
 *
 * Exits non-zero without writing on: HTTP error, timeout, parse error, a model
 * count below the sanity floor, or a type_id disappearing (unless --allow-removals).
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import { modelsUrl } from "@/lib/gocars-core/urls";
import { asArray } from "@/lib/gocars-core/client";
import type { GoCarsModel } from "@/lib/gocars-core/types";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "data/gocars");
const RAW_PATH = path.join(OUT_DIR, "models.raw.json");
const META_PATH = path.join(OUT_DIR, "models.meta.json");

/** Live catalogue is 42 models / 33 types. A response far below this is a fault, not a change. */
const MIN_MODELS = 30;
const TIMEOUT_MS = 30_000;

function fail(message: string): never {
  console.error(
    `\n fetch-gocars FAILED\n ${message}\n\n Nothing was written.\n`,
  );
  process.exit(1);
}

function previousTypeIds(): Set<string> {
  if (!existsSync(RAW_PATH)) return new Set();
  try {
    const prev = JSON.parse(readFileSync(RAW_PATH, "utf8"));
    return new Set(asArray<GoCarsModel>(prev).map((m) => String(m.type_id)));
  } catch {
    return new Set();
  }
}

async function main() {
  const allowRemovals = process.argv.includes("--allow-removals");
  const url = modelsUrl("1");

  console.log(` GET ${url}`);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let body: string;
  let status: number;
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "User-Agent":
          "AGGELOS-Rentals-App/0.1 (+https://antiparosrentacar.com)",
      },
      cache: "no-store",
    });
    status = res.status;
    if (!res.ok) fail(`HTTP ${res.status} ${res.statusText}`);
    body = await res.text();
  } catch (err) {
    const e = err as Error;
    fail(
      e.name === "AbortError" ? `timed out after ${TIMEOUT_MS}ms` : e.message,
    );
  } finally {
    clearTimeout(timer);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(body);
  } catch (err) {
    fail(`response is not valid JSON: ${(err as Error).message}`);
  }

  // GoCars returns arrays as {"0":…,"1":…} objects.
  const models = asArray<GoCarsModel>(
    parsed as GoCarsModel[] | Record<string, GoCarsModel>,
  );
  if (models.length < MIN_MODELS) {
    fail(
      `only ${models.length} models returned (sanity floor is ${MIN_MODELS})`,
    );
  }

  const typeIds = new Set(models.map((m) => String(m.type_id)));
  const removed = [...previousTypeIds()].filter((id) => !typeIds.has(id));
  if (removed.length > 0 && !allowRemovals) {
    fail(
      `${removed.length} type_id(s) vanished from the catalogue: ${removed.join(", ")}\n` +
        ` Each backs 11 live URLs. If this is a real withdrawal, re-run with --allow-removals\n` +
        ` and add 301s for the affected slugs before deploying.`,
    );
  }

  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(RAW_PATH, body, "utf8");
  writeFileSync(
    META_PATH,
    `${JSON.stringify(
      {
        fetchedAt: new Date().toISOString(),
        url,
        httpStatus: status,
        bytes: body.length,
        modelCount: models.length,
        typeCount: typeIds.size,
        removedTypeIds: removed,
        sortedTypeIds: [...typeIds].sort((a, b) => Number(a) - Number(b)),
      },
      null,
      2,
    )}\n`,
    "utf8",
  );

  console.log(` ${models.length} models / ${typeIds.size} types`);
  if (removed.length) console.log(` removals accepted: ${removed.join(", ")}`);
  console.log(` wrote ${path.relative(ROOT, RAW_PATH)}`);
  console.log(` wrote ${path.relative(ROOT, META_PATH)}`);
}

main();
