import type { Locale } from "@/i18n/routing";
import seoMeta from "../../content/seo-meta.json";

export type RouteSeo = { title: string; description: string };

type SeoStore = Record<string, Partial<Record<Locale, RouteSeo>>>;

const STORE = seoMeta as SeoStore;

/**
 * Authored SEO for an indexable route key. No English fallback: a missing
 * locale fails loudly so we never ship duplicate EN meta on localized URLs.
 */
export function getRouteSeo(key: string, locale: Locale): RouteSeo {
  const byLocale = STORE[key];
  if (!byLocale) {
    throw new Error(
      `Missing SEO meta for route "${key}". Add it to content/seo-meta.json (or re-run scripts/generate-seo-meta.mjs).`,
    );
  }
  const entry = byLocale[locale];
  if (!entry?.title?.trim() || !entry?.description?.trim()) {
    throw new Error(
      `Missing SEO meta for route "${key}" locale "${locale}". Every locale must be authored uniquely.`,
    );
  }
  return { title: entry.title.trim(), description: entry.description.trim() };
}

export function hasRouteSeo(key: string, locale: Locale): boolean {
  const entry = STORE[key]?.[locale];
  return Boolean(entry?.title?.trim() && entry?.description?.trim());
}

export function allSeoRouteKeys(): string[] {
  return Object.keys(STORE);
}
