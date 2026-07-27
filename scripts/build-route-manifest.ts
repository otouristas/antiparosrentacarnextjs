/**
 * Generate src/routes/manifest.generated.ts, the single source of URL truth.
 *
 * npx tsx scripts/build-route-manifest.ts
 *
 * Inputs (all committed):
 * content/pages.json editorial pages + their localized slugs (from WordPress)
 * content/redirects.json 301 sources, which must never also be live routes
 * data/fleet.json 33 GoCars vehicle types
 * src/data/fleet-categories.ts
 *
 * Emits a TypeScript module rather than JSON so the manifest is bundled by
 * Turbopack instead of read with readFileSync at render time. The old
 * content-registry read `content/pages.json` from process.cwd() on every render,
 * which @vercel/nft cannot trace statically.
 */
import {
  existsSync,
  readFileSync,
  statSync,
  writeFileSync,
  mkdirSync,
} from "node:fs";
import path from "node:path";
import { locales, defaultLocale, type Locale } from "@/i18n/routing";
import { FLEET_CATEGORIES } from "@/data/fleet-categories";
import type { FleetArtifact } from "@/data/fleet-types";
import type { RouteEntry, RouteKind, RouteManifest } from "@/routes/types";

const ROOT = process.cwd();
const OUT_PATH = path.join(ROOT, "src/routes/manifest.generated.ts");

/**
 * WordPress fleet URLs that redirect to /fleet/*. They exist in pages.json but
 * must not become routes, redirects run before routing, so a route here would
 * be permanently unreachable while still occupying the sitemap.
 */
const REDIRECTED_PAGE_IDS = new Set([
  "car-fleet",
  "aggelos-fleet",
  "bicycles-fleet",
]);

type ContentPage = {
  id: string;
  enSlug: string;
  type: string;
  paths: Partial<Record<Locale, string>>;
  titles: Partial<Record<Locale, string>>;
  descriptions: Partial<Record<Locale, string>>;
  h1s?: Partial<Record<Locale, string>>;
  bodyPaths: Partial<Record<Locale, string>>;
  images: string[];
  indexable: boolean;
};

const problems: string[] = [];

function fail(): never {
  console.error(
    `\n build-route-manifest FAILED (${problems.length} problem(s))\n`,
  );
  for (const p of problems) console.error(` - ${p}`);
  console.error("\n Nothing was written.\n");
  process.exit(1);
}

function readJson<T>(rel: string): T {
  const p = path.join(ROOT, rel);
  if (!existsSync(p)) {
    console.error(`\n Missing required input: ${rel}\n`);
    process.exit(1);
  }
  return JSON.parse(readFileSync(p, "utf8")) as T;
}

function normalizePath(p: string): string {
  if (!p || p === "/") return "/";
  let out = p.startsWith("/") ? p : `/${p}`;
  if (!out.endsWith("/")) out += "/";
  // NFC so Greek/Cyrillic slugs compare equal regardless of how they were produced.
  return out.normalize("NFC");
}

/**
 * Build a locale-prefixed path. EVERY locale is prefixed, English included,
 * `localePrefix: "always"` in src/i18n/routing.ts.
 */
function localePath(basePath: string, locale: Locale): string {
  const clean = normalizePath(basePath);
  return normalizePath(`/${locale}${clean === "/" ? "" : clean}`);
}

/**
 * The registry stores English paths unprefixed (they came from the WordPress
 * site, where English lived at the root). Lift them under /en/, and record the
 * old path so a 301 can be emitted for it.
 */
function liftEnglish(rawPath: string): string {
  const clean = normalizePath(rawPath);
  if (clean === "/") return "/en/";
  if (clean.startsWith("/en/")) return clean;
  return normalizePath(`/en${clean}`);
}

function mtimeIso(relPath: string | undefined, fallback: string): string {
  if (!relPath) return fallback;
  try {
    return statSync(path.join(ROOT, relPath)).mtime.toISOString();
  } catch {
    return fallback;
  }
}

/** pages.json `type` -> manifest RouteKind. */
function kindForPageType(type: string, id: string): RouteKind {
  if (type === "home") return "home";
  if (type === "money") return "money";
  if (type === "guide") return "guide";
  if (type === "blog") return "blog";
  if (type === "legal") return "legal";
  if (type === "contact") return "contact";
  problems.push(`page "${id}" has unmapped type "${type}"`);
  return "guide";
}

function priorityFor(kind: RouteKind): number {
  switch (kind) {
    case "home":
      return 1;
    case "money":
    case "location":
      return 0.9;
    case "fleet-index":
      return 0.85;
    case "fleet-category":
    case "vehicle":
      return 0.75;
    case "comparison":
    case "guide":
      return 0.7;
    case "blog":
      return 0.6;
    default:
      return 0.5;
  }
}

function changeFreqFor(kind: RouteKind): RouteEntry["changeFrequency"] {
  if (kind === "home" || kind === "money" || kind === "location")
    return "weekly";
  if (kind === "fleet-index" || kind === "fleet-category" || kind === "vehicle")
    return "weekly";
  if (kind === "legal") return "yearly";
  return "monthly";
}

/** Assemble a total Record<Locale,string>, recording a problem for any gap. */
function totalPaths(
  key: string,
  supply: (locale: Locale) => string | undefined,
): Record<Locale, string> {
  const out = {} as Record<Locale, string>;
  for (const locale of locales) {
    const value = supply(locale);
    if (!value) {
      problems.push(`route "${key}" has no path for locale "${locale}"`);
      continue;
    }
    out[locale] = normalizePath(value);
  }
  return out;
}

function main() {
  const pagesFile = readJson<{ pages: ContentPage[] }>("content/pages.json");
  const fleet = readJson<FleetArtifact>("data/fleet.json");
  // Hand-maintained WordPress-era rows. content/redirects.json (what
  // next.config.ts imports) is GENERATED from these plus the /en/ migration.
  const legacyRedirects = readJson<
    { source: string; destination: string; permanent?: boolean }[]
  >("content/redirects.legacy.json");
  const pagesJsonMtime = statSync(
    path.join(ROOT, "content/pages.json"),
  ).mtime.toISOString();

  const routes: RouteEntry[] = [];

  /* ---------- editorial pages from the WordPress registry ---------- */
  for (const page of pagesFile.pages) {
    if (REDIRECTED_PAGE_IDS.has(page.id)) continue;

    const kind = kindForPageType(page.type, page.id);
    const key = kind === "home" ? "home" : `${kind}/${page.id}`;

    routes.push({
      key,
      kind,
      paths: totalPaths(key, (l) =>
        l === defaultLocale ? liftEnglish(page.paths[l] ?? "") : page.paths[l],
      ),
      indexable: page.indexable,
      inSitemap: page.indexable,
      priority: priorityFor(kind),
      changeFrequency: changeFreqFor(kind),
      parent: kind === "home" ? null : "home",
      contentRef: {
        collection: kind === "blog" ? "articles" : "pages",
        id: page.id,
      },
      updated: mtimeIso(page.bodyPaths.en, pagesJsonMtime),
    });
  }

  /* ---------- fleet index ---------- */
  routes.push({
    key: "fleet",
    kind: "fleet-index",
    paths: totalPaths("fleet", (l) => localePath("/fleet/", l)),
    indexable: true,
    inSitemap: true,
    priority: priorityFor("fleet-index"),
    changeFrequency: changeFreqFor("fleet-index"),
    parent: "home",
    contentRef: { collection: "fleet-index", id: "fleet" },
    updated: fleet.generatedAt,
  });

  /* ---------- fleet categories ---------- */
  for (const category of FLEET_CATEGORIES) {
    const key = `fleet-category/${category.slug}`;
    routes.push({
      key,
      kind: "fleet-category",
      paths: totalPaths(key, (l) => localePath(`/fleet/${category.slug}/`, l)),
      indexable: true,
      inSitemap: true,
      priority: priorityFor("fleet-category"),
      changeFrequency: changeFreqFor("fleet-category"),
      parent: "fleet",
      params: { category: category.slug },
      contentRef: { collection: "fleet-category", id: category.slug },
      updated: fleet.generatedAt,
    });
  }

  /* ---------- one page per GoCars vehicle type ---------- */
  for (const vehicle of fleet.vehicles) {
    const key = `vehicle/${vehicle.category}/${vehicle.slug}`;
    routes.push({
      key,
      kind: "vehicle",
      paths: totalPaths(key, (l) =>
        localePath(`/fleet/${vehicle.category}/${vehicle.slug}/`, l),
      ),
      indexable: true,
      inSitemap: true,
      priority: priorityFor("vehicle"),
      changeFrequency: changeFreqFor("vehicle"),
      parent: `fleet-category/${vehicle.category}`,
      params: {
        category: vehicle.category,
        slug: vehicle.slug,
        typeId: vehicle.typeId,
      },
      contentRef: { collection: "vehicle", id: vehicle.typeId },
      updated: fleet.generatedAt,
    });
  }

  /* ---------- utility routes ---------- */
  const utilities: {
    key: string;
    base: string;
    indexable: boolean;
    priority: number;
  }[] = [
    { key: "utility/faq", base: "/faq/", indexable: true, priority: 0.7 },
    { key: "utility/guides", base: "/guides/", indexable: true, priority: 0.7 },
    {
      key: "utility/reviews",
      base: "/reviews/",
      indexable: true,
      priority: 0.8,
    },
    {
      key: "utility/book-results",
      base: "/book/results/",
      indexable: false,
      priority: 0.1,
    },
  ];
  for (const u of utilities) {
    routes.push({
      key: u.key,
      kind: "utility",
      paths: totalPaths(u.key, (l) => localePath(u.base, l)),
      indexable: u.indexable,
      inSitemap: u.indexable,
      priority: u.priority,
      changeFrequency: "monthly",
      parent: "home",
      contentRef: { collection: "utility", id: u.key.split("/")[1] },
      updated: pagesJsonMtime,
    });
  }

  /* ---------- integrity checks ---------- */
  const byKey = new Map<string, RouteEntry>();
  for (const r of routes) {
    if (byKey.has(r.key)) problems.push(`duplicate route key "${r.key}"`);
    byKey.set(r.key, r);
  }

  // No two routes may claim the same (locale, path).
  const claimed = new Map<string, string>();
  for (const r of routes) {
    for (const locale of locales) {
      const p = r.paths[locale];
      if (!p) continue;
      const id = `${locale}::${p}`;
      const owner = claimed.get(id);
      if (owner) {
        problems.push(
          `path collision at ${locale} "${p}": "${owner}" and "${r.key}"`,
        );
      } else {
        claimed.set(id, r.key);
      }
    }
  }

  /* ---------- redirects ----------
   * Two jobs:
   * 1. Every English URL moved from the bare root to /en/. next-intl's own
   * locale redirect is a 307; search engines need a permanent one for URLs
   * that were indexed at the root, so they are emitted explicitly.
   * 2. Legacy WordPress destinations pointed at those same root URLs and must
   * be lifted with them, or each becomes a 301 into a 307.
   * -------------------------------------------------------------------- */
  const livePaths = new Set(claimed.keys());

  /** old root English path -> new /en/ path */
  const enMoves = new Map<string, string>();
  for (const r of routes) {
    const next = r.paths[defaultLocale];
    if (!next?.startsWith("/en/")) continue;
    const old = next === "/en/" ? "/" : normalizePath(next.slice("/en".length));
    if (old !== next) enMoves.set(old, next);
  }

  const generated: {
    source: string;
    destination: string;
    permanent: boolean;
  }[] = [];
  const seenSource = new Set<string>();

  const addRedirect = (source: string, destination: string) => {
    const src = normalizePath(source);
    const dest = normalizePath(destination);
    if (src === dest || seenSource.has(src)) return;
    // Never shadow a live URL with a redirect.
    if ([...locales].some((l) => livePaths.has(`${l}::${src}`))) return;
    seenSource.add(src);
    generated.push({ source: src, destination: dest, permanent: true });
  };

  // 1. root English -> /en/
  for (const [old, next] of enMoves) addRedirect(old, next);

  /**
   * Legacy destinations were written against English slugs even for localized
   * URLs, e.g. `/de/paros-airport-rent-a-car-port/`, which never existed
   * because the German page is `/de/mietwagenhafen-am-flughafen-paros/`.
   * Resolve them by content id so the redirect lands on the real page.
   */
  const routeByContentId = new Map(routes.map((r) => [r.contentRef.id, r]));
  function resolveDestination(
    rawDest: string,
  ): { dest: string; locale: Locale } | null {
    const lifted = enMoves.get(rawDest) ?? rawDest;
    const m = /^\/([a-z]{2})\/(.*)$/.exec(lifted);
    const locale = (
      m && locales.includes(m[1] as Locale) ? m[1] : defaultLocale
    ) as Locale;

    if (livePaths.has(`${locale}::${lifted}`)) return { dest: lifted, locale };

    // Try the trailing slug as a content id, in the locale the URL claims.
    const slug = (m?.[2] ?? lifted).replace(/^\/|\/$/g, "");
    const viaId = routeByContentId.get(slug);
    if (
      viaId?.paths[locale] &&
      livePaths.has(`${locale}::${viaId.paths[locale]}`)
    ) {
      return { dest: viaId.paths[locale], locale };
    }
    return null;
  }

  const dangling: { source: string; destination: string }[] = [];
  for (const row of legacyRedirects) {
    // Mirror next.config.ts, which drops query-bearing sources.
    if (!row.source || String(row.source).includes("?")) continue;
    const rawDest = normalizePath(String(row.destination).split("?")[0]);

    const resolved = resolveDestination(rawDest);
    if (!resolved) {
      dangling.push({ source: row.source, destination: rawDest });
      continue; // a 301 into a 404 is worse than no redirect at all
    }
    addRedirect(row.source, resolved.dest);
  }

  generated.sort((a, b) => a.source.localeCompare(b.source));
  writeFileSync(
    path.join(ROOT, "content/redirects.json"),
    `${JSON.stringify(generated, null, 2)}\n`,
    "utf8",
  );

  const danglingRedirects = dangling;

  // Every parent must resolve.
  for (const r of routes) {
    if (r.parent && !byKey.has(r.parent)) {
      problems.push(`route "${r.key}" has unknown parent "${r.parent}"`);
    }
  }

  if (problems.length > 0) fail();

  const manifest: RouteManifest = {
    generatedAt: new Date().toISOString(),
    count: routes.length,
    routes,
  };

  mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  writeFileSync(
    OUT_PATH,
    `// GENERATED by scripts/build-route-manifest.ts, do not edit by hand.\n` +
      `// Run: npm run routes:build\n` +
      `import type { RouteManifest } from "./types";\n\n` +
      `export const MANIFEST: RouteManifest = ${JSON.stringify(manifest, null, 2)} as const;\n\n` +
      `export default MANIFEST;\n`,
    "utf8",
  );

  /* ---------- nav link map ----------
   * Replaces the hand-generated content/nav-links.json, which stored English
   * unprefixed and would have kept emitting root URLs after the /en/ move.
   *
   * Stored as positional arrays rather than per-locale objects, the same data
   * at roughly half the bytes, which matters because localizedHref is called
   * from client components (Navbar, MobileMenu, sticky bar, final CTA).
   * -------------------------------------------------------------------- */
  const navEntries: Record<string, string[]> = {};
  for (const r of routes) {
    // Key on the content id so existing localizedHref("about-us") calls keep working.
    const id = r.key === "home" ? "home" : r.contentRef.id;
    navEntries[id] = locales.map((l) => r.paths[l]);
  }

  const navOut = path.join(ROOT, "src/data/nav-links.generated.ts");
  writeFileSync(
    navOut,
    `// GENERATED by scripts/build-route-manifest.ts, do not edit by hand.\n` +
      `// Positional arrays, ordered to match LOCALE_ORDER below.\n` +
      `export const LOCALE_ORDER = ${JSON.stringify(locales)} as const;\n\n` +
      `export const NAV_LINKS: Record<string, readonly string[]> = ${JSON.stringify(
        navEntries,
        null,
        0,
      )};\n\n` +
      `export default NAV_LINKS;\n`,
    "utf8",
  );

  const byKind = new Map<string, number>();
  for (const r of routes) byKind.set(r.kind, (byKind.get(r.kind) ?? 0) + 1);

  console.log(
    ` ${routes.length} routes x ${locales.length} locales = ${routes.length * locales.length} URLs`,
  );
  for (const [kind, n] of [...byKind.entries()].sort()) {
    console.log(` ${kind.padEnd(16)} ${String(n).padStart(3)}`);
  }
  console.log(
    ` ${generated.length} redirects written (${enMoves.size} from the /en/ move)`,
  );
  if (danglingRedirects.length > 0) {
    console.log(
      `\n DROPPED ${danglingRedirects.length} legacy redirect(s) whose destination no route serves` +
        `, emitting them would 301 into a 404:`,
    );
    for (const r of danglingRedirects) {
      console.log(` ${r.source} -> ${r.destination}`);
    }
    console.log("");
  }
  console.log(` wrote ${path.relative(ROOT, OUT_PATH)}`);
  console.log(` wrote content/redirects.json`);
  console.log(` wrote ${path.relative(ROOT, navOut)}`);
}

main();
