/**
 * Normalize scraped Google reviews into site data + fleet insights.
 *
 * npx tsx scripts/reviews/normalize.ts
 *
 * Inputs:
 * data/raw/google-reviews.json (export from google-reviews-scraper-pro)
 * data/fleet.json
 *
 * Outputs:
 * data/reviews.json
 * data/fleet-review-insights.json
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const RAW_CANDIDATES = [
  path.join(ROOT, "data/raw/google-reviews.json"),
  path.join(ROOT, "tools/google-reviews-scraper-pro/google_reviews.json"),
];
const FLEET_PATH = path.join(ROOT, "data/fleet.json");
const OUT_REVIEWS = path.join(ROOT, "data/reviews.json");
const OUT_INSIGHTS = path.join(ROOT, "data/fleet-review-insights.json");

const PLACE_URL =
  "https://www.google.com/maps/place/AGGELOS+Rentals/@37.0398079,25.0845734,17z/data=!4m6!3m5!1s0x1498655b76d68d07:0x740cbe8b35e316f6!8m2!3d37.0398079!4d25.0845734!16s%2Fg%2F11cmj3m3qr";

type FleetModel = { make: string; model: string; note?: string };
type FleetVehicle = {
  typeId: string;
  slug: string;
  category: string;
  typeName: string;
  models: FleetModel[];
};

type RawReview = {
  review_id?: string;
  id?: string;
  author?: string;
  rating?: number;
  description?: string | Record<string, string>;
  review_text?: string | Record<string, string>;
  text?: string;
  review_date?: string;
  created_date?: string;
  owner_responses?: Record<string, { text?: string } | string>;
  owner_response?: string;
  profile_picture?: string;
  likes?: number;
};

type SiteReview = {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  language?: string;
  ownerReply?: string;
  profilePicture?: string;
  fleetSlugs: string[];
  categorySlugs: string[];
};

type IdealTheme = {
  id: string;
  label: string;
  patterns: RegExp[];
};

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  mini: [
    "mini car",
    "small car",
    "city car",
    "aygo",
    "citigo",
    "citygo",
    "picanto",
    "spacestar",
    "c1",
  ],
  compact: ["compact", "panda", "celerio", "peugeot 208", "208"],
  crossover: ["crossover", "i20", "citroen c3", "c3"],
  suvs: [
    "suv",
    "4x4",
    "jimny",
    "jeep",
    "renegade",
    "offroad",
    "off-road",
    "off road",
    "glb",
    "mg zs",
  ],
  convertible: [
    "convertible",
    "cabrio",
    "cabriolet",
    "soft top",
    "open top",
    "500c",
    "500 c",
    "mini cooper",
  ],
  "people-carriers": [
    "7 seater",
    "7-seater",
    "nine seater",
    "9 seater",
    "9-seater",
    "family van",
    "doblo",
    "transporter",
    "people carrier",
  ],
  scooters: [
    "scooter",
    "vespa",
    "moto",
    "motorbike",
    "motorcycle",
    "50cc",
    "125cc",
    "150cc",
    "200cc",
    "300cc",
  ],
  atvs: ["atv", "quad", "buggy", "utv", "cf moto", "kymco", "kayo", "wolf"],
  bikes: ["bicycle", "bike", "e-bike", "ebike", "cycle"],
};

const IDEAL_THEMES: IdealTheme[] = [
  {
    id: "couples",
    label: "Couples exploring the island",
    patterns: [
      /\bcouple\b/i,
      /\bromantic\b/i,
      /\bhoneymoon\b/i,
      /\btwo of us\b/i,
      /\bmy wife\b/i,
      /\bmy husband\b/i,
      /\bgirlfriend\b/i,
      /\bboyfriend\b/i,
    ],
  },
  {
    id: "families",
    label: "Families with kids",
    patterns: [
      /\bfamily\b/i,
      /\bkids?\b/i,
      /\bchildren\b/i,
      /\bbaby\b/i,
      /\bchild seat\b/i,
      /\bcar seat\b/i,
      /\bwith our son\b/i,
      /\bwith our daughter\b/i,
    ],
  },
  {
    id: "beaches",
    label: "Beach hopping around Paros & Antiparos",
    patterns: [
      /\bbeach(es)?\b/i,
      /\bcove\b/i,
      /\bswimming\b/i,
      /\bsororos\b/i,
      /\bdespina\b/i,
      /\bcamping\b/i,
    ],
  },
  {
    id: "first-timers",
    label: "First-time visitors",
    patterns: [
      /\bfirst (time|visit|trip)\b/i,
      /\bnever been\b/i,
      /\brecommend(ed)? for beginners\b/i,
      /\beasy to drive\b/i,
    ],
  },
  {
    id: "groups",
    label: "Groups traveling together",
    patterns: [
      /\bgroup\b/i,
      /\bfriends\b/i,
      /\b7 seat/i,
      /\b9 seat/i,
      /\blarge (group|family)\b/i,
    ],
  },
  {
    id: "adventure",
    label: "Off-road & adventure days",
    patterns: [
      /\boff[- ]?road\b/i,
      /\bdirt (road|track)\b/i,
      /\badventure\b/i,
      /\bquad\b/i,
      /\batv\b/i,
      /\bbuggy\b/i,
      /\bjimny\b/i,
    ],
  },
  {
    id: "luggage",
    label: "Travelers with luggage",
    patterns: [
      /\bluggage\b/i,
      /\bsuitcase/i,
      /\bbags?\b/i,
      /\bairport\b/i,
      /\bferry\b/i,
      /\bport\b/i,
    ],
  },
  {
    id: "easy-drive",
    label: "Easy, stress-free island driving",
    patterns: [
      /\beasy to (drive|park|use)\b/i,
      /\bperfect size\b/i,
      /\bsmall (enough|roads)\b/i,
      /\bnarrow (roads|streets)\b/i,
      /\bautomatic\b/i,
    ],
  },
];

function pickText(desc: RawReview["description"] | string | undefined): {
  text: string;
  language?: string;
} {
  if (!desc) return { text: "" };
  if (typeof desc === "string") return { text: desc.trim() };
  const entries = Object.entries(desc).filter(
    ([, v]) => typeof v === "string" && v.trim(),
  );
  if (!entries.length) return { text: "" };
  const en = entries.find(([k]) => k.toLowerCase() === "en");
  if (en) return { text: en[1].trim(), language: "en" };
  const [lang, text] = entries[0];
  return { text: text.trim(), language: lang };
}

function pickOwnerReply(r: RawReview): string | undefined {
  if (typeof r.owner_response === "string" && r.owner_response.trim())
    return r.owner_response.trim();
  if (!r.owner_responses) return undefined;
  const entries = Object.entries(r.owner_responses);
  for (const [, val] of entries) {
    if (typeof val === "string" && val.trim()) return val.trim();
    if (
      val &&
      typeof val === "object" &&
      typeof val.text === "string" &&
      val.text.trim()
    ) {
      return val.text.trim();
    }
  }
  return undefined;
}

function normalizeRaw(raw: unknown): RawReview[] {
  if (Array.isArray(raw)) return raw as RawReview[];
  if (raw && typeof raw === "object") {
    const obj = raw as Record<string, unknown>;
    if (Array.isArray(obj.reviews)) return obj.reviews as RawReview[];
    if (Array.isArray(obj.data)) return obj.data as RawReview[];
    // place_id keyed map
    for (const v of Object.values(obj)) {
      if (Array.isArray(v) && v.length && typeof v[0] === "object")
        return v as RawReview[];
    }
  }
  return [];
}

function buildMatchers(vehicles: FleetVehicle[]) {
  const perVehicle: { slug: string; category: string; patterns: RegExp[] }[] =
    [];
  for (const v of vehicles) {
    const terms = new Set<string>();
    for (const m of v.models) {
      const model = m.model.replace(/\s+/g, " ").trim();
      const make = m.make.trim();
      if (model.length >= 2) terms.add(model.toLowerCase());
      if (make && model) terms.add(`${make} ${model}`.toLowerCase());
      // strip "or similar" noise already not in model field
      const short = model
        .replace(
          /\s+(manual|automatic|hybrid|2024|2025|soft top|full extra.*)$/i,
          "",
        )
        .trim();
      if (short.length >= 3) terms.add(short.toLowerCase());
    }
    // type name tokens that are distinctive
    const typeBits = v.typeName.toLowerCase();
    if (/\bjimny\b|\bvespa\b|\bbuggy\b|\butv\b/.test(typeBits)) {
      for (const t of typeBits.split(/\s+/)) if (t.length > 3) terms.add(t);
    }
    const patterns = [...terms]
      .filter((t) => t.length >= 3)
      .map(
        (t) =>
          new RegExp(
            `\\b${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+")}\\b`,
            "i",
          ),
      );
    perVehicle.push({ slug: v.slug, category: v.category, patterns });
  }

  const perCategory: { category: string; patterns: RegExp[] }[] =
    Object.entries(CATEGORY_KEYWORDS).map(([category, words]) => ({
      category,
      patterns: words.map(
        (w) =>
          new RegExp(
            `\\b${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+")}\\b`,
            "i",
          ),
      ),
    }));

  return { perVehicle, perCategory };
}

function matchFleet(
  text: string,
  matchers: ReturnType<typeof buildMatchers>,
): { fleetSlugs: string[]; categorySlugs: string[] } {
  const fleetSlugs = new Set<string>();
  const categorySlugs = new Set<string>();
  const hay = text;

  for (const v of matchers.perVehicle) {
    if (v.patterns.some((p) => p.test(hay))) {
      fleetSlugs.add(v.slug);
      categorySlugs.add(v.category);
    }
  }
  for (const c of matchers.perCategory) {
    if (c.patterns.some((p) => p.test(hay))) {
      categorySlugs.add(c.category);
    }
  }
  return { fleetSlugs: [...fleetSlugs], categorySlugs: [...categorySlugs] };
}

function detectThemes(text: string): IdealTheme[] {
  return IDEAL_THEMES.filter((th) => th.patterns.some((p) => p.test(text)));
}

function snippet(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trim()}…`;
}

function main() {
  const rawPath = RAW_CANDIDATES.find((p) => existsSync(p));
  if (!rawPath) {
    console.error(
      "Missing raw reviews. Expected one of:\n " + RAW_CANDIDATES.join("\n "),
    );
    process.exit(1);
  }

  const fleet = JSON.parse(readFileSync(FLEET_PATH, "utf8")) as {
    vehicles: FleetVehicle[];
  };
  const rawJson = JSON.parse(readFileSync(rawPath, "utf8"));
  const rawReviews = normalizeRaw(rawJson);
  const matchers = buildMatchers(fleet.vehicles);

  const reviews: SiteReview[] = [];
  const seen = new Set<string>();

  for (const r of rawReviews) {
    const id = String(r.review_id || r.id || "").trim();
    if (!id || seen.has(id)) continue;
    seen.add(id);
    const { text, language } = pickText(
      r.review_text ?? r.description ?? r.text,
    );
    const rating = Number(r.rating ?? 0);
    if (!rating && !text) continue;
    const date = String(r.review_date || r.created_date || "").trim();
    const matched = matchFleet(text, matchers);
    reviews.push({
      id,
      author: String(r.author || "Google user").trim() || "Google user",
      rating: Math.max(1, Math.min(5, Math.round(rating))),
      text,
      date,
      language,
      ownerReply: pickOwnerReply(r),
      profilePicture: r.profile_picture || undefined,
      fleetSlugs: matched.fleetSlugs,
      categorySlugs: matched.categorySlugs,
    });
  }

  // Sort: 5-star first, then newest
  reviews.sort((a, b) => {
    if (b.rating !== a.rating) return b.rating - a.rating;
    return String(b.date).localeCompare(String(a.date));
  });

  const rated = reviews.filter((r) => r.rating > 0);
  const avg =
    rated.length > 0
      ? Math.round(
          (rated.reduce((s, r) => s + r.rating, 0) / rated.length) * 10,
        ) / 10
      : 0;

  const reviewsOut = {
    scrapedAt: new Date().toISOString(),
    placeUrl: PLACE_URL,
    placeId: "0x1498655b76d68d07:0x740cbe8b35e316f6",
    rating: avg,
    reviewCount: reviews.length,
    source: "google-reviews-scraper-pro",
    reviews,
  };

  // Insights per vehicle + category
  const bySlug = new Map<string, SiteReview[]>();
  const byCategory = new Map<string, SiteReview[]>();
  for (const rev of reviews) {
    for (const slug of rev.fleetSlugs) {
      const list = bySlug.get(slug) ?? [];
      list.push(rev);
      bySlug.set(slug, list);
    }
    for (const cat of rev.categorySlugs) {
      const list = byCategory.get(cat) ?? [];
      list.push(rev);
      byCategory.set(cat, list);
    }
  }

  const vehiclesOut: Record<
    string,
    {
      typeId: string;
      slug: string;
      category: string;
      idealFor: string;
      reviewIds: string[];
      quotes: { id: string; author: string; text: string; rating: number }[];
    }
  > = {};

  for (const v of fleet.vehicles) {
    const matched = bySlug.get(v.slug) ?? [];
    // Also pull category-level matches that aren't already vehicle-matched,
    // but only for Ideal For theme synthesis (quotes prefer direct mentions).
    const categoryPool = byCategory.get(v.category) ?? [];
    const themeSource = matched.length
      ? matched
      : categoryPool.filter((r) => r.rating >= 4);
    const themeCounts = new Map<string, { theme: IdealTheme; n: number }>();
    for (const rev of themeSource) {
      for (const th of detectThemes(rev.text)) {
        const cur = themeCounts.get(th.id);
        themeCounts.set(th.id, { theme: th, n: (cur?.n ?? 0) + 1 });
      }
    }
    const topThemes = [...themeCounts.values()].sort((a, b) => b.n - a.n);
    let idealFor =
      topThemes[0]?.theme.label ??
      (v.category === "scooters"
        ? "Exploring the island light and free"
        : v.category === "atvs"
          ? "Beach tracks and off-road adventure"
          : v.category === "suvs"
            ? "Rough roads and scenic drives"
            : v.category === "convertible"
              ? "Sunny open-air island days"
              : v.category === "people-carriers"
                ? "Families and groups traveling together"
                : v.category === "mini" || v.category === "compact"
                  ? "Easy parking and narrow island roads"
                  : "Getting around Paros & Antiparos");

    // Spec-based refine when no theme hit
    if (!topThemes.length) {
      if (
        (v.specs as { passengers?: number } | undefined)?.passengers &&
        false
      ) {
        /* noop, fleet type has specs on full object */
      }
    }

    const quotes = (matched.length ? matched : categoryPool)
      .filter((r) => r.rating >= 4 && r.text.length > 40)
      .slice(0, 2)
      .map((r) => ({
        id: r.id,
        author: r.author,
        text: snippet(r.text),
        rating: r.rating,
      }));

    vehiclesOut[v.slug] = {
      typeId: v.typeId,
      slug: v.slug,
      category: v.category,
      idealFor,
      reviewIds: matched.map((r) => r.id),
      quotes,
    };
  }

  // Patch idealFor using passengers from fleet.json properly
  for (const v of fleet.vehicles as (FleetVehicle & {
    specs?: { passengers?: number };
  })[]) {
    const entry = vehiclesOut[v.slug];
    if (!entry) continue;
    const matched = bySlug.get(v.slug) ?? [];
    const categoryPool = byCategory.get(v.category) ?? [];
    const themeSource = matched.length
      ? matched
      : categoryPool.filter((r) => r.rating >= 4);
    const hasTheme = themeSource.some((r) => detectThemes(r.text).length > 0);
    if (!hasTheme && v.specs?.passengers && v.specs.passengers >= 7) {
      entry.idealFor = "Families and groups traveling together";
    }
  }

  const categoriesOut: Record<
    string,
    {
      slug: string;
      idealFor: string;
      reviewIds: string[];
      quotes: { id: string; author: string; text: string; rating: number }[];
    }
  > = {};

  for (const [cat, list] of byCategory) {
    const themeCounts = new Map<string, { theme: IdealTheme; n: number }>();
    for (const rev of list) {
      for (const th of detectThemes(rev.text)) {
        const cur = themeCounts.get(th.id);
        themeCounts.set(th.id, { theme: th, n: (cur?.n ?? 0) + 1 });
      }
    }
    const top = [...themeCounts.values()].sort((a, b) => b.n - a.n)[0];
    const fallbackSlug = Object.keys(vehiclesOut).find(
      (s) => vehiclesOut[s].category === cat,
    );
    categoriesOut[cat] = {
      slug: cat,
      idealFor:
        top?.theme.label ??
        (fallbackSlug
          ? vehiclesOut[fallbackSlug].idealFor
          : "Getting around Paros & Antiparos"),
      reviewIds: list.map((r) => r.id),
      quotes: list
        .filter((r) => r.rating >= 4 && r.text.length > 40)
        .slice(0, 3)
        .map((r) => ({
          id: r.id,
          author: r.author,
          text: snippet(r.text),
          rating: r.rating,
        })),
    };
  }

  mkdirSync(path.dirname(OUT_REVIEWS), { recursive: true });
  writeFileSync(OUT_REVIEWS, JSON.stringify(reviewsOut, null, 2) + "\n");
  writeFileSync(
    OUT_INSIGHTS,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        vehicles: vehiclesOut,
        categories: categoriesOut,
      },
      null,
      2,
    ) + "\n",
  );

  const withFleet = reviews.filter(
    (r) => r.fleetSlugs.length || r.categorySlugs.length,
  ).length;
  console.log(
    `Normalized ${reviews.length} reviews (avg ${avg}) from ${rawPath}`,
  );
  console.log(`Fleet-tagged: ${withFleet}`);
  console.log(`Wrote ${OUT_REVIEWS}`);
  console.log(`Wrote ${OUT_INSIGHTS}`);
}

main();
