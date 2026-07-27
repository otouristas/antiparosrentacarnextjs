import type { FleetCategorySlug } from "@/data/fleet-categories";
import { FLEET_CATEGORIES } from "@/data/fleet-categories";

/** Trip intents that filter the fleet icon grid. */
export type FleetIntentId =
  "all" | "airport" | "explore" | "family" | "twowheels";

export type FleetTile = {
  slug: FleetCategorySlug;
  image: string;
  icon: string;
};

export type LocationIsland = "paros" | "antiparos" | "mainland";

export type LocationTile = {
  id: string;
  /** Page id for localizedHref, or null when using localePath. */
  pageId: string;
  island: LocationIsland;
  image: string;
  /** WGS84 coordinates for the OpenStreetMap pickup pin. */
  coords: { lat: number; lng: number } | null;
};

export type GuideCategoryId = "all" | "islands" | "getting-around" | "tips";

export type GuideTile = {
  id: string;
  pageId: string;
  category: Exclude<GuideCategoryId, "all">;
  image: string;
};

export const FLEET_INTENTS: readonly {
  id: FleetIntentId;
  /** Categories highlighted when this intent is active. Empty = show all. */
  categories: readonly FleetCategorySlug[];
}[] = [
  { id: "all", categories: [] },
  { id: "airport", categories: ["mini", "compact", "crossover"] },
  { id: "explore", categories: ["suvs", "convertible", "atvs", "crossover"] },
  {
    id: "family",
    categories: ["people-carriers", "crossover", "suvs", "compact"],
  },
  { id: "twowheels", categories: ["scooters", "atvs", "bikes"] },
] as const;

const FLEET_IMAGES: Record<FleetCategorySlug, { image: string; icon: string }> =
  {
    mini: { image: "/fleet/Citroen-C1.jpg", icon: "/icons/fleet/car.svg" },
    compact: { image: "/fleet/fiat-panda.jpeg", icon: "/icons/fleet/car.svg" },
    crossover: {
      image: "/fleet/c3-aircross.webp",
      icon: "/icons/fleet/jeep.svg",
    },
    suvs: {
      image: "/fleet/Suzuki-Jimny-Paros-rent-a-car.webp",
      icon: "/icons/fleet/jeep.svg",
    },
    convertible: {
      image: "/fleet/fiat-500-cabrio.jpg",
      icon: "/icons/fleet/car.svg",
    },
    "people-carriers": {
      image: "/images/rent-a-car-paros.webp",
      icon: "/icons/fleet/van.svg",
    },
    scooters: {
      image: "/images/antiparos-rent-a-scooter.webp",
      icon: "/icons/fleet/scooter.svg",
    },
    atvs: {
      image: "/images/antiparos-atv-rentals.webp",
      icon: "/icons/fleet/buggy.svg",
    },
    bikes: {
      image: "/images/rent-a-bike-paros.webp",
      icon: "/icons/fleet/bike.svg",
    },
  };

export const FLEET_TILES: readonly FleetTile[] = FLEET_CATEGORIES.map((c) => ({
  slug: c.slug,
  image: FLEET_IMAGES[c.slug].image,
  icon: FLEET_IMAGES[c.slug].icon,
}));

/** Featured 6 for the 3×2 grid (still linkable to all via footer). */
export const FLEET_FEATURED_SLUGS: readonly FleetCategorySlug[] = [
  "mini",
  "compact",
  "suvs",
  "convertible",
  "scooters",
  "atvs",
];

/** Island overview bounds (Paros + Antiparos). */
export const ISLANDS_MAP_BOUNDS: [[number, number], [number, number]] = [
  [36.98, 25.02],
  [37.16, 25.32],
];

export const LOCATION_TILES: readonly LocationTile[] = [
  {
    id: "paros-airport",
    pageId: "paros-airport-rent-a-car-port",
    island: "paros",
    image: "/media/2026/06/paros-ferry-port-1-650x433.png.webp",
    coords: { lat: 37.0205, lng: 25.1132 },
  },
  {
    id: "parikia-port",
    pageId: "paros-port-parikia-rent-a-car",
    island: "paros",
    image: "/media/2026/06/paros-ferry-deck-650x433.png.webp",
    coords: { lat: 37.085, lng: 25.1485 },
  },
  {
    id: "paros-island",
    pageId: "paros-rent-a-car",
    island: "paros",
    image: "/media/2026/06/paros-antiparos-islands-650x433.png.webp",
    coords: { lat: 37.0856, lng: 25.179 },
  },
  {
    id: "antiparos-port",
    pageId: "rent-a-car-antiparos-aggelos",
    island: "antiparos",
    image: "/media/2025/02/Aerial-View-of-Antiparos-Island-1024x576.webp",
    coords: { lat: 37.0394, lng: 25.0822 },
  },
  {
    id: "piraeus",
    pageId: "piraeus-rent-a-car",
    island: "mainland",
    image: "/images/hero-jeep.webp",
    coords: { lat: 37.9419, lng: 23.6465 },
  },
] as const;

export const GUIDE_TILES: readonly GuideTile[] = [
  {
    id: "best-things",
    pageId: "best-things-to-do-in-paros",
    category: "islands",
    image: "/media/2026/06/paros-kolymbithres-650x433.png.webp",
  },
  {
    id: "how-to-get",
    pageId: "how-to-get-to-paros-ferries-flights-airport",
    category: "getting-around",
    image: "/media/2026/06/paros-ferry-deck-650x433.png.webp",
  },
  {
    id: "need-car",
    pageId: "do-you-need-to-rent-a-car-in-paros",
    category: "getting-around",
    image: "/images/rent-a-car-paros.webp",
  },
  {
    id: "paros-vs",
    pageId: "paros-vs-naxos-vs-antiparos",
    category: "islands",
    image: "/media/2026/06/paros-antiparos-islands-650x433.png.webp",
  },
  {
    id: "travel-tips",
    pageId: "travel-tips-for-antiparos-and-paros",
    category: "tips",
    image: "/media/2026/06/paros-naoussa-village-650x433.png.webp",
  },
  {
    id: "antiparos-island",
    pageId: "antiparos-island",
    category: "islands",
    image: "/media/2025/02/Aerial-View-of-Antiparos-Island-1024x576.webp",
  },
] as const;

export function fleetTilesForIntent(intent: FleetIntentId): FleetTile[] {
  const featured = FLEET_TILES.filter((t) =>
    FLEET_FEATURED_SLUGS.includes(t.slug),
  );
  if (intent === "all") return [...featured];
  const match = FLEET_INTENTS.find((i) => i.id === intent)?.categories ?? [];
  const filtered = FLEET_TILES.filter((t) => match.includes(t.slug));
  // Prefer featured order, then fill to 6 from the intent set
  const ordered = [
    ...featured.filter((t) => match.includes(t.slug)),
    ...filtered.filter((t) => !FLEET_FEATURED_SLUGS.includes(t.slug)),
  ];
  return ordered.slice(0, 6);
}

export function locationTilesForIsland(
  island: LocationIsland | "all",
): LocationTile[] {
  if (island === "all") return [...LOCATION_TILES];
  return LOCATION_TILES.filter((t) => t.island === island);
}

export function guideTilesForCategory(category: GuideCategoryId): GuideTile[] {
  if (category === "all") return [...GUIDE_TILES];
  return GUIDE_TILES.filter((t) => t.category === category);
}
