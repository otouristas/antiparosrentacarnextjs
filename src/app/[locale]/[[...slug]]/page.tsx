import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { renderPageTemplate } from "@/components/content/PageTemplates";
import { findPageById } from "@/data/content-registry";
import { locales, type Locale } from "@/i18n/routing";
import { findRouteByPath, pathFromSlugParts, staticParamsFor } from "@/routes";
import { metadataFor } from "@/seo/metadata";
import { getRouteSeo } from "@/seo/route-seo";
import { hasPageCopy, getPageCopy } from "@/content/loader";

export const dynamicParams = false;

/** Editorial kinds served by this catch-all. Fleet/utility have their own routes. */
const EDITORIAL = [
  "home",
  "money",
  "guide",
  "blog",
  "legal",
  "contact",
] as const;

export function generateStaticParams() {
  return staticParamsFor([...EDITORIAL]).map((p) => ({
    locale: p.locale,
    slug: p.slug.length ? p.slug : undefined,
  }));
}

/**
 * Resolve params -> manifest route.
 *
 * `pathFromSlugParts` + `findRouteByPath` apply decodeURIComponent and NFC
 * normalization. The previous registry did neither, so every percent-encoded
 * Cyrillic and Greek slug missed the lookup and fell through to notFound() —
 * 27 pages, essentially the whole Russian tree, built as empty __next_error__
 * shells while still appearing in the sitemap and being pointed at by hreflang
 * from all ten other locales.
 */
function resolve(locale: Locale, slug?: string[]) {
  const route = findRouteByPath(locale, pathFromSlugParts(locale, slug));
  if (!route) return null;
  const page = findPageById(route.contentRef.id);
  return page ? { route, page } : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>;
}): Promise<Metadata> {
  const { locale: loc, slug } = await params;
  if (!(locales as readonly string[]).includes(loc)) return {};
  const locale = loc as Locale;

  const found = resolve(locale, slug);
  if (!found) return {};
  const { route, page } = found;

  const fallback = getRouteSeo(route.key, locale);
  let title = fallback.title;
  let description = fallback.description;

  if (hasPageCopy(route.key, locale)) {
    const copy = getPageCopy(route.key, locale);
    if (copy.seo.title?.trim()) title = copy.seo.title;
    if (copy.seo.description?.trim()) description = copy.seo.description;
  }

  const ogImage = page.images.find((i) => i.startsWith("/")) || page.images[0];

  return metadataFor(route.key, locale, {
    title,
    description,
    ogImage,
    ogType: page.type === "blog" ? "article" : "website",
    modifiedTime: route.updated,
  });
}

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>;
}) {
  const { locale: loc, slug } = await params;
  if (!(locales as readonly string[]).includes(loc)) notFound();
  const locale = loc as Locale;
  setRequestLocale(locale);

  const found = resolve(locale, slug);
  if (!found) notFound();

  return renderPageTemplate(found.page, locale);
}
