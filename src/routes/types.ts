import type { Locale } from "@/i18n/routing";

export const ROUTE_KINDS = [
  "home",
  "money",
  "location",
  "guide",
  "comparison",
  "blog",
  "legal",
  "contact",
  "fleet-index",
  "fleet-category",
  "vehicle",
  "utility",
] as const;

export type RouteKind = (typeof ROUTE_KINDS)[number];

export type RouteEntry = {
  /** Stable identifier, e.g. "money/paros-rent-a-car", "vehicle/suvs/suv-automatic". */
  key: string;
  kind: RouteKind;

  /**
   * Locale -> path, e.g. { en: "/paros-rent-a-car/", de: "/de/paros-mietwagen/" }.
   *
   * Deliberately TOTAL (`Record`, not `Partial`). A route that cannot supply a
   * path for every locale is a generator error, never a silent English fallback.
   * The previous model used Partial and produced 40 pages with no canonical at all.
   */
  paths: Record<Locale, string>;

  indexable: boolean;
  inSitemap: boolean;
  priority: number;
  changeFrequency:
    "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

  /** Parent route key for breadcrumbs; null for top level. */
  parent: string | null;

  /** Dynamic segment values, e.g. { category: "suvs", typeId: "76" }. */
  params?: Record<string, string>;

  /** Where this route's copy lives. */
  contentRef: { collection: string; id: string };

  /** Real ISO timestamp from the underlying content — never build time. */
  updated: string;
};

export type RouteManifest = {
  generatedAt: string;
  count: number;
  routes: RouteEntry[];
};
