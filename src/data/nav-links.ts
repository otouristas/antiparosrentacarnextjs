import { LOCALE_ORDER, NAV_LINKS } from "./nav-links.generated";
import type { Locale } from "@/i18n/routing";

/**
 * Locale-correct href for a content id.
 *
 * Backed by `nav-links.generated.ts`, emitted from the route manifest, so it
 * cannot drift from the canonical/hreflang URLs. It replaced
 * `content/nav-links.json`, a separately-generated copy of the URL model that
 * stored English unprefixed and would have kept emitting root URLs after the
 * move to `/en/`.
 */
const INDEX_OF = new Map<string, number>(LOCALE_ORDER.map((l, i) => [l, i]));

export function localizedHref(pageId: string, locale: Locale): string {
  const entry = NAV_LINKS[pageId];
  if (!entry) {
    // Unknown id, still produce a prefixed path rather than a root one.
    return `/${locale}/${pageId.replace(/^\/|\/$/g, "")}/`;
  }
  const i = INDEX_OF.get(locale);
  return (
    (i !== undefined ? entry[i] : undefined) ??
    entry[INDEX_OF.get("en") ?? 0] ??
    `/${locale}/`
  );
}

export function hasNavLink(pageId: string): boolean {
  return pageId in NAV_LINKS;
}
