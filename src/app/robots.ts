import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * 2026 crawl policy for antiparosrentacar.com.
 *
 * Disallows must match real locale-prefixed paths (`/en/book/results/`, etc.).
 * AI crawlers are allowed so assistants can cite accurate rental pages;
 * curated context also lives at /llms.txt and /llms-full.txt.
 */
export default function robots(): MetadataRoute.Robots {
  const disallow = [
    "/api/",
    "/check/",
    "/book/results/",
    "/*/book/results/",
    "/hotel-partners/",
    "/*/hotel-partners/",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow,
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow,
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow,
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow,
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow,
      },
    ],
    sitemap: `${SITE.domain}/sitemap.xml`,
    host: SITE.domain,
  };
}
