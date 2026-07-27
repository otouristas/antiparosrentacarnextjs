import type { FleetCategorySlug } from "./fleet-categories";

/**
 * Branded vehicle silhouette icons (recolored from ParosRentals set).
 * Used on home category tiles, fleet index strips, and filter chrome.
 */
export const FLEET_CATEGORY_ICON: Record<FleetCategorySlug, string> = {
  mini: "/icons/fleet/car.svg",
  compact: "/icons/fleet/car.svg",
  crossover: "/icons/fleet/jeep.svg",
  suvs: "/icons/fleet/jeep.svg",
  convertible: "/icons/fleet/car.svg",
  "people-carriers": "/icons/fleet/van.svg",
  scooters: "/icons/fleet/scooter.svg",
  atvs: "/icons/fleet/buggy.svg",
  bikes: "/icons/fleet/bike.svg",
};

export function categoryIcon(slug: FleetCategorySlug): string {
  return FLEET_CATEGORY_ICON[slug];
}
