import { locales, defaultLocale, type Locale } from "@/i18n/routing";
import { SITE } from "@/lib/site";
import MANIFEST from "./manifest.generated";
import type { RouteEntry, RouteKind } from "./types";

export type { RouteEntry, RouteKind } from "./types";

const ROUTES: readonly RouteEntry[] = MANIFEST.routes;

/**
 * Canonical lookup key for a (locale, path) pair.
 *
 * Both transforms are load-bearing:
 *  - decodeURIComponent: Next hands catch-all params back percent-encoded, so
 *    "/ru/аренда-автомобилей-в-паросе/" arrives as "%D0%B0%D1%80%D0%B5%D0%BD…".
 *    The previous registry skipped this, and 26 Cyrillic/Greek pages built as
 *    empty __next_error__ shells — effectively the whole Russian site.
 *  - NFC: Greek and Cyrillic strings that pass through filesystem tooling can
 *    arrive NFD-decomposed while the manifest holds NFC. They compare unequal
 *    byte-wise despite looking identical.
 */
function canonicalKey(locale: Locale, rawPath: string): string {
  let p = rawPath;
  try {
    p = decodeURIComponent(p);
  } catch {
    // Malformed escape sequence — fall through with the raw value.
  }
  p = p.normalize("NFC");
  if (!p.startsWith("/")) p = `/${p}`;
  if (!p.endsWith("/")) p += "/";
  return `${locale}::${p}`;
}

const byKey: ReadonlyMap<string, RouteEntry> = new Map(
  ROUTES.map((r) => [r.key, r]),
);

const byPath: ReadonlyMap<string, RouteEntry> = new Map(
  ROUTES.flatMap((r) =>
    locales
      .filter((l) => r.paths[l])
      .map((l) => [canonicalKey(l, r.paths[l]), r] as const),
  ),
);

/** Throws on an unknown key so a typo fails the build instead of shipping a bad page. */
export function getRoute(key: string): RouteEntry {
  const route = byKey.get(key);
  if (!route) {
    throw new Error(
      `Unknown route key "${key}". Known keys are generated into src/routes/manifest.generated.ts — run \`npm run routes:build\`.`,
    );
  }
  return route;
}

export function hasRoute(key: string): boolean {
  return byKey.has(key);
}

export function findRouteByPath(
  locale: Locale,
  path: string,
): RouteEntry | undefined {
  return byPath.get(canonicalKey(locale, path));
}

/**
 * Resolve a catch-all `slug[]` back to a path, mirroring how the manifest
 * stores it. Every locale is prefixed, English included.
 */
export function pathFromSlugParts(locale: Locale, slug?: string[]): string {
  const parts = (slug ?? []).filter(Boolean);
  if (parts.length === 0) return `/${locale}/`;
  return `/${locale}/${parts.join("/").replace(/\/+$/, "")}/`;
}

/** Locale-correct href for a route key. */
export function href(key: string, locale: Locale, hash?: string): string {
  const path = getRoute(key).paths[locale];
  return hash ? `${path}#${hash}` : path;
}

export function absoluteUrl(key: string, locale: Locale): string {
  return `${SITE.domain}${getRoute(key).paths[locale]}`;
}

export function allRoutes(): readonly RouteEntry[] {
  return ROUTES;
}

export function routesOfKind(
  kind: RouteKind | RouteKind[],
): readonly RouteEntry[] {
  const kinds = Array.isArray(kind) ? new Set(kind) : new Set([kind]);
  return ROUTES.filter((r) => kinds.has(r.kind));
}

/**
 * Full hreflang cluster for a route. Reciprocal by construction because
 * `paths` is a total Record — every locale is guaranteed present.
 */
export function hreflangFor(key: string): Record<string, string> {
  const route = getRoute(key);
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = `${SITE.domain}${route.paths[locale]}`;
  }
  languages["x-default"] = `${SITE.domain}${route.paths[defaultLocale]}`;
  return languages;
}

export function breadcrumbTrail(
  key: string,
  locale: Locale,
): { key: string; url: string }[] {
  const trail: { key: string; url: string }[] = [];
  const seen = new Set<string>();
  let current: string | null = key;
  while (current && !seen.has(current)) {
    seen.add(current);
    const route: RouteEntry = getRoute(current);
    trail.unshift({
      key: route.key,
      url: `${SITE.domain}${route.paths[locale]}`,
    });
    current = route.parent;
  }
  return trail;
}

/**
 * `generateStaticParams` input for a route kind.
 * Slug parts are locale-stripped and already decoded.
 */
export function staticParamsFor(
  kind: RouteKind | RouteKind[],
): { locale: Locale; slug: string[] }[] {
  const params: { locale: Locale; slug: string[] }[] = [];
  for (const route of routesOfKind(kind)) {
    for (const locale of locales) {
      const path = route.paths[locale];
      if (!path) continue;
      const parts = path
        .replace(/^\/|\/$/g, "")
        .split("/")
        .filter(Boolean);
      // Every path carries its locale prefix now; strip it to get the slug.
      if (parts[0] === locale) parts.shift();
      params.push({ locale, slug: parts });
    }
  }
  return params;
}

export const MANIFEST_GENERATED_AT = MANIFEST.generatedAt;
export const ROUTE_COUNT = MANIFEST.count;
