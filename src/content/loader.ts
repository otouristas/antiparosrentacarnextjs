import type { Locale } from "@/i18n/routing";
import type { ArticleCopy, CategoryCopy, PageCopy, VehicleCopy } from "./types";
import { CONTENT } from "./registry.generated";

/**
 * Thrown when a (page, locale) module is absent.
 *
 * There is deliberately NO English fallback. Because generateStaticParams
 * enumerates all 11 locales for every route, a missing module fails `next build`
 * loudly instead of shipping English copy on a localized URL.
 *
 * The previous model did the opposite: src/content/money/index.ts returned
 * `moneyEn[pageId] || null` and src/content/home/index.ts returned
 * `map[locale] || homeEn`, which is why 9 of 11 locales silently rendered
 * English on every money page and homepage.
 */
export class MissingContentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MissingContentError";
  }
}

function pick<T>(
  bucket: Record<string, Partial<Record<Locale, T>>> | undefined,
  collection: string,
  key: string,
  locale: Locale,
): T {
  const byLocale = bucket?.[key];
  if (!byLocale) {
    throw new MissingContentError(
      `No "${collection}" content registered for "${key}". ` +
        `Scaffold it with: npm run content:scaffold -- ${key}`,
    );
  }
  const copy = byLocale[locale];
  if (!copy) {
    throw new MissingContentError(
      `Missing "${locale}" copy for ${collection} "${key}". ` +
        `Every locale must be authored natively; there is no English fallback.`,
    );
  }
  return copy;
}

export function getPageCopy(key: string, locale: Locale): PageCopy {
  return pick<PageCopy>(CONTENT.pages, "page", key, locale);
}

export function getCategoryCopy(slug: string, locale: Locale): CategoryCopy {
  return pick<CategoryCopy>(
    CONTENT["fleet-category"],
    "fleet-category",
    slug,
    locale,
  );
}

export function getVehicleCopy(typeId: string, locale: Locale): VehicleCopy {
  return pick<VehicleCopy>(CONTENT.vehicle, "vehicle", typeId, locale);
}

export function getArticleCopy(slug: string, locale: Locale): ArticleCopy {
  return pick<ArticleCopy>(CONTENT.articles, "articles", slug, locale);
}

/** Non-throwing probe, for validators and conditional rendering. */
export function hasPageCopy(key: string, locale: Locale): boolean {
  return Boolean(CONTENT.pages?.[key]?.[locale]);
}

export function hasCategoryCopy(slug: string, locale: Locale): boolean {
  return Boolean(CONTENT["fleet-category"]?.[slug]?.[locale]);
}

export function hasVehicleCopy(typeId: string, locale: Locale): boolean {
  return Boolean(CONTENT.vehicle?.[typeId]?.[locale]);
}

export function hasArticleCopy(slug: string, locale: Locale): boolean {
  return Boolean(CONTENT.articles?.[slug]?.[locale]);
}

export function registeredKeys(collection: keyof typeof CONTENT): string[] {
  return Object.keys(CONTENT[collection] ?? {});
}

export { CONTENT };
