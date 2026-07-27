import type { MetadataRoute } from "next";
import { locales, type Locale } from "@/i18n/routing";
import { SITE } from "@/lib/site";
import { allRoutes, hreflangFor } from "@/routes";

/**
 * Sitemap driven entirely by the route manifest — including GoCars fleet
 * category and vehicle URLs. No parallel taxonomy.
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const seen = new Set<string>();

  const push = (
    url: string,
    opts: {
      lastModified: string | Date;
      changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"];
      priority: number;
      languages: Record<string, string>;
    },
  ) => {
    if (seen.has(url)) return;
    seen.add(url);
    entries.push({
      url,
      lastModified: opts.lastModified,
      changeFrequency: opts.changeFrequency,
      priority: opts.priority,
      alternates: { languages: opts.languages },
    });
  };

  for (const route of allRoutes()) {
    if (!route.inSitemap) continue;

    const languages = hreflangFor(route.key);
    for (const locale of locales) {
      push(`${SITE.domain}${route.paths[locale as Locale]}`, {
        lastModified: route.updated,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        languages,
      });
    }
  }

  return entries;
}
