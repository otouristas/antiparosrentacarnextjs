/**
 * Fleet category structure.
 *
 * GoCars models the inventory as 42 *models* grouped into 33 *types* (`type_id`).
 * Checkout takes `type_id`, and prices are quoted per type, several models share
 * one type and one price (e.g. type 48 "Mini Manual" = Toyota Aygo / Skoda Citygo /
 * Citroen C1, all at the same rate). So the site publishes one page per `type_id`
 * and lists its models as "… or similar".
 *
 * The `type_id -> category` mapping below is INTENTIONALLY EXPLICIT rather than
 * derived from `type_name` by pattern. A GoCars admin adding a new type must not
 * be able to silently land it in an arbitrary bucket: `scripts/fleet/normalize.ts`
 * hard-fails on any `type_id` missing from this table.
 *
 * Reference labels here are English and used only for tooling output and slug
 * derivation. All rendered category copy lives in `src/content/fleet/category/*`.
 */

export const FLEET_CATEGORY_SLUGS = [
  "mini",
  "compact",
  "crossover",
  "suvs",
  "convertible",
  "people-carriers",
  "scooters",
  "atvs",
  "bikes",
] as const;

export type FleetCategorySlug = (typeof FLEET_CATEGORY_SLUGS)[number];

export type FleetCategory = {
  slug: FleetCategorySlug;
  /** English reference label, not rendered; see src/content/fleet/category/. */
  refLabel: string;
  /** GoCars `vehicle_type` this category draws from, or null when editorial. */
  vehicleType: "car" | "moto" | "atv" | null;
  /**
   * false = no GoCars inventory backs this category, so it renders without a
   * booking widget and without Offer/price schema. GoCars carries no bicycles
   * (live inventory is car 29 / moto 6 / atv 7), but the site has long ranked
   * for bike hire, so the page stays as an enquiry-driven editorial page.
   */
  bookable: boolean;
  order: number;
};

export const FLEET_CATEGORIES: readonly FleetCategory[] = [
  {
    slug: "mini",
    refLabel: "Mini cars",
    vehicleType: "car",
    bookable: true,
    order: 1,
  },
  {
    slug: "compact",
    refLabel: "Compact cars",
    vehicleType: "car",
    bookable: true,
    order: 2,
  },
  {
    slug: "crossover",
    refLabel: "Crossovers",
    vehicleType: "car",
    bookable: true,
    order: 3,
  },
  {
    slug: "suvs",
    refLabel: "SUVs & 4x4",
    vehicleType: "car",
    bookable: true,
    order: 4,
  },
  {
    slug: "convertible",
    refLabel: "Convertibles",
    vehicleType: "car",
    bookable: true,
    order: 5,
  },
  {
    slug: "people-carriers",
    refLabel: "People carriers",
    vehicleType: "car",
    bookable: true,
    order: 6,
  },
  {
    slug: "scooters",
    refLabel: "Scooters",
    vehicleType: "moto",
    bookable: true,
    order: 7,
  },
  {
    slug: "atvs",
    refLabel: "ATVs, quads & buggies",
    vehicleType: "atv",
    bookable: true,
    order: 8,
  },
  {
    slug: "bikes",
    refLabel: "Bicycles & e-bikes",
    vehicleType: null,
    bookable: false,
    order: 9,
  },
] as const;

/**
 * Every GoCars `type_id` currently in the live catalogue.
 * Verified against getModelsDataForPlugin, 33 types / 42 models.
 * An unmapped id fails `npm run fleet:sync` with the id listed.
 */
export const TYPE_ID_TO_CATEGORY: Readonly<Record<string, FleetCategorySlug>> =
  {
    // mini
    "48": "mini", // Mini Manual, Toyota Aygo, Skoda Citygo, Citroen C1
    "60": "mini", // Mini Automatic, Skoda Citigo Automatic
    "71": "mini", // Premium Mini Automatic, Mitsubishi SpaceStar, Kia Picanto

    // compact
    "50": "compact", // Compact Manual, Fiat Panda, Suzuki Celerio
    "72": "compact", // Compact Hybrid Manual, Mitsubishi SpaceStar, Fiat Panda Hybrid
    "59": "compact", // Medium Manual, Peugeot 208
    "81": "compact", // Medium 2024 Manual, Peugeot 208 2024

    // crossover
    "52": "crossover", // Crossover Automatic, Hyundai i20, Citroen C3 Automatic
    "84": "crossover", // Crossover Manual, Citroen C3

    // suvs
    "53": "suvs", // 4x4 Offroad Manual, Suzuki Jimny
    "54": "suvs", // Elite SUVs, Mercedes Benz GLB
    "75": "suvs", // SUVs Manual, Jeep Renegade Manual
    "76": "suvs", // SUVs Automatic, MG SUV ZS, Jeep Renegade Automatic
    "77": "suvs", // SUVs Hybrid 4xe, Jeep Renegade UPLAND Hybrid 4xe
    "78": "suvs", // SUVs Open Top Automatic, Jeep Renegade 4x4 Panorama Open Roof

    // convertible
    "51": "convertible", // Convertibles Manual, Fiat 500C
    "73": "convertible", // Convertibles Automatic, Peugeot 108 / Toyota Aygo Soft Top
    "74": "convertible", // Convertibles Hybrid Manual, Fiat 500c Hybrid
    "85": "convertible", // Elite Convertibles Automatic, Mini Cooper Cabrio

    // people carriers
    "55": "people-carriers", // 7 Seater Manual, Fiat Doblo
    "79": "people-carriers", // 9 Seater, VW Transporter (lowest_price 0 -> not bookable)

    // scooters
    "61": "scooters", // Scooters 50cc
    "62": "scooters", // Scooters 125cc
    "63": "scooters", // Scooters 150cc
    "64": "scooters", // Scooters 200cc
    "65": "scooters", // Scooters 300cc
    "80": "scooters", // Elite Scooters, Vespa Primavera 125cc

    // atvs
    "58": "atvs", // UTVs 500cc, Buggy 500cc
    "68": "atvs", // ATVs 300cc, Kayo 300cc, VOGE Wolf
    "69": "atvs", // ATVs 450cc
    "70": "atvs", // ATVs 520cc, CF Moto
    "82": "atvs", // ATV 550cc, Kymco Mxu550i
    "83": "atvs", // UTVs 850cc, CF Moto UTV ZFORCE
  };

export function getCategory(slug: string): FleetCategory | undefined {
  return FLEET_CATEGORIES.find((c) => c.slug === slug);
}

export function isFleetCategorySlug(value: string): value is FleetCategorySlug {
  return (FLEET_CATEGORY_SLUGS as readonly string[]).includes(value);
}
