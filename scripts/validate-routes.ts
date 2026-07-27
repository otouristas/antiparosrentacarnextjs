/**
 * Route manifest regression guard. Wired as `prebuild`.
 *
 * npx tsx scripts/validate-routes.ts
 *
 * Checks invariants the generator cannot see on its own, chiefly that a static
 * app/ folder is not silently shadowing a manifest route. Next matches static
 * segments before optional catch-alls, so a route whose first segment collides
 * with a real directory is unreachable while still occupying the sitemap. That
 * is exactly how /privacy-policy ended up served by a hardcoded English page in
 * all 11 locales while its localized WordPress content was never reachable.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { locales, type Locale } from "@/i18n/routing";
import { allRoutes, getRoute } from "@/routes";

const ROOT = process.cwd();
const APP_LOCALE_DIR = path.join(ROOT, "src/app/[locale]");

const errors: string[] = [];
const warnings: string[] = [];

const err = (m: string) => errors.push(m);
const warn = (m: string) => warnings.push(m);

/** Directories under app/[locale]/ that Next will match before the catch-all. */
function staticSegments(): Set<string> {
  if (!existsSync(APP_LOCALE_DIR)) return new Set();
  return new Set(
    readdirSync(APP_LOCALE_DIR).filter(
      (d) =>
        statSync(path.join(APP_LOCALE_DIR, d)).isDirectory() &&
        !d.startsWith("[") &&
        !d.startsWith("(") &&
        !d.startsWith("_"),
    ),
  );
}

/** Route kinds that legitimately live under a static app/ folder. */
const STATIC_BACKED_KINDS = new Set([
  "fleet-index",
  "fleet-category",
  "vehicle",
  "utility",
]);

function firstSegment(p: string, locale: Locale): string {
  const parts = p
    .replace(/^\/|\/$/g, "")
    .split("/")
    .filter(Boolean);
  // Every path carries its locale prefix now, English included.
  if (parts[0] === locale) parts.shift();
  return parts[0] ?? "";
}

function main() {
  const routes = allRoutes();
  const statics = staticSegments();

  if (routes.length === 0) {
    err("manifest is empty, run `npm run routes:build`");
  }

  // 1. total, well-formed paths
  for (const r of routes) {
    for (const locale of locales) {
      const p = r.paths[locale];
      if (!p) {
        err(`${r.key}: missing path for locale "${locale}"`);
        continue;
      }
      if (!p.startsWith("/"))
        err(`${r.key} (${locale}): path "${p}" has no leading slash`);
      if (!p.endsWith("/"))
        err(`${r.key} (${locale}): path "${p}" has no trailing slash`);
      // localePrefix is "always": every path, English included, must carry its prefix.
      if (!p.startsWith(`/${locale}/`)) {
        err(`${r.key} (${locale}): path "${p}" is not under its locale prefix`);
      }

      // 2. NFC + encode/decode round-trip, the failure mode that killed the RU tree
      if (p !== p.normalize("NFC")) {
        err(`${r.key} (${locale}): path "${p}" is not NFC-normalized`);
      }
      let round: string;
      try {
        round = decodeURIComponent(encodeURI(p));
      } catch {
        err(
          `${r.key} (${locale}): path "${p}" does not survive encodeURI/decodeURIComponent`,
        );
        continue;
      }
      if (round !== p) {
        err(`${r.key} (${locale}): path "${p}" round-trips to "${round}"`);
      }
    }
  }

  // 3. (locale, path) uniqueness
  const claimed = new Map<string, string>();
  for (const r of routes) {
    for (const locale of locales) {
      const p = r.paths[locale];
      if (!p) continue;
      const id = `${locale}::${p.normalize("NFC")}`;
      const owner = claimed.get(id);
      if (owner)
        err(`path collision at ${locale} "${p}": "${owner}" vs "${r.key}"`);
      else claimed.set(id, r.key);
    }
  }

  // 4. static app/ folders shadowing catch-all routes
  for (const r of routes) {
    if (STATIC_BACKED_KINDS.has(r.kind)) continue;
    for (const locale of locales) {
      const p = r.paths[locale];
      if (!p) continue;
      const seg = firstSegment(p, locale);
      if (seg && statics.has(seg)) {
        err(
          `${r.key} (${locale}): "${p}" is shadowed by the static route src/app/[locale]/${seg}/ ` +
            `, the catch-all will never receive it`,
        );
      }
    }
  }

  // 5. parents resolve and do not cycle
  for (const r of routes) {
    const seen = new Set<string>([r.key]);
    let cur = r.parent;
    while (cur) {
      if (seen.has(cur)) {
        err(`${r.key}: breadcrumb parent chain cycles at "${cur}"`);
        break;
      }
      seen.add(cur);
      try {
        cur = getRoute(cur).parent;
      } catch {
        err(`${r.key}: unknown parent "${cur}"`);
        break;
      }
    }
  }

  // 6. redirects must not shadow live routes (mirrors next.config.ts's ?-filter)
  const redirectsPath = path.join(ROOT, "content/redirects.json");
  if (existsSync(redirectsPath)) {
    const rows = JSON.parse(readFileSync(redirectsPath, "utf8")) as {
      source: string;
      destination: string;
    }[];
    for (const row of rows) {
      if (!row.source || row.source.includes("?")) continue;
      const src = (
        row.source.endsWith("/") ? row.source : `${row.source}/`
      ).normalize("NFC");
      for (const locale of locales) {
        const owner = claimed.get(`${locale}::${src}`);
        if (owner)
          err(
            `redirect source "${row.source}" shadows live route "${owner}" (${locale})`,
          );
      }
    }
  } else {
    warn(
      "content/redirects.json not found, next.config.ts imports it and will fail to load",
    );
  }

  // 7. sitemap sanity
  const indexableNotInSitemap = routes.filter(
    (r) => r.indexable && !r.inSitemap,
  );
  for (const r of indexableNotInSitemap)
    warn(`${r.key}: indexable but excluded from the sitemap`);
  const sitemapNotIndexable = routes.filter((r) => r.inSitemap && !r.indexable);
  for (const r of sitemapNotIndexable)
    err(`${r.key}: in the sitemap but not indexable`);

  /* ---------- report ---------- */
  const urls = routes.length * locales.length;
  if (warnings.length) {
    console.log(`\n validate-routes: ${warnings.length} warning(s)`);
    for (const w of warnings) console.log(` ~ ${w}`);
  }
  if (errors.length) {
    console.error(`\n validate-routes FAILED, ${errors.length} error(s)\n`);
    for (const e of errors) console.error(` x ${e}`);
    console.error("");
    process.exit(1);
  }
  console.log(
    ` validate-routes OK, ${routes.length} routes / ${urls} URLs across ${locales.length} locales`,
  );
}

main();
