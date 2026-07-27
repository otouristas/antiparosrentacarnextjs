import type { Metadata } from "next";
import { locales, defaultLocale, type Locale } from "@/i18n/routing";
import { SITE } from "@/lib/site";
import { getRoute, hreflangFor } from "@/routes";
import { SITE_DEFAULTS } from "./defaults";
import { OG_LOCALE } from "./og-locale";

/**
 * The ONE metadata builder. Every route's `generateMetadata` calls this and
 * nothing else.
 *
 * It replaces `buildMetadata` in src/data/pages.ts, which took an optional
 * `locale` and then never used it when constructing the URL:
 *
 *   const url = absoluteUrl(opts.path);   // opts.locale ignored
 *
 * Every caller passed a locale-less path ("/fleet", "/faq", "/guides"), so 430
 * non-English pages canonicalized to their English equivalent and a further 40
 * shipped no canonical at all — roughly the entire /fleet/**, /faq/, /guides/
 * and /privacy-policy/ tree across ten locales, de-indexed by self-inflicted
 * canonicalization.
 *
 * Here the canonical is always `route.paths[locale]`, and because `paths` is a
 * total Record the hreflang cluster is reciprocal by construction.
 */

export type MetadataOverrides = {
  title?: string;
  description?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
};

function absolute(url: string): string {
  if (url.startsWith("http")) return url;
  return `${SITE.domain}${url.startsWith("/") ? url : `/${url}`}`;
}

export function metadataFor(
  key: string,
  locale: Locale,
  overrides: MetadataOverrides = {},
): Metadata {
  // Throws on an unknown key: a typo fails the build rather than silently
  // shipping a page with no canonical.
  const route = getRoute(key);
  const defaults = SITE_DEFAULTS[locale] ?? SITE_DEFAULTS[defaultLocale];

  const canonical = `${SITE.domain}${route.paths[locale]}`;
  const title = overrides.title?.trim() || defaults.title;
  const description = overrides.description?.trim() || defaults.description;
  const image = absolute(overrides.ogImage || "/images/og-default.webp");
  const indexable = route.indexable && !overrides.noindex;

  return {
    // `absolute` so no template is ever appended — page titles are authored complete.
    title: { absolute: title },
    description,
    alternates: {
      canonical,
      languages: hreflangFor(key),
    },
    openGraph: {
      type: overrides.ogType ?? "website",
      title,
      description,
      url: canonical,
      siteName: SITE.name,
      // Real OG codes (el_GR), not bare language codes, which parsers reject.
      locale: OG_LOCALE[locale],
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => OG_LOCALE[l]),
      images: [{ url: image }],
      ...(overrides.publishedTime
        ? { publishedTime: overrides.publishedTime }
        : {}),
      ...(overrides.modifiedTime
        ? { modifiedTime: overrides.modifiedTime }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: indexable
      ? { index: true, follow: true }
      : {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false },
        },
  };
}
