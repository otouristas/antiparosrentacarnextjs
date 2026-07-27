import { unstable_cache } from "next/cache";
import artifact from "../../data/fleet.json";
import type { FleetCategorySlug } from "./fleet-categories";
import {
  FLEET_CATEGORIES,
  getCategory,
  isFleetCategorySlug,
} from "./fleet-categories";
import type { FleetArtifact, FleetVehicleType } from "./fleet-types";
import { fleetImage, vehicleDisplayName, vehicleHref } from "./fleet-display";

export { fleetImage, vehicleDisplayName, vehicleHref };

const fleetData = artifact as FleetArtifact;

const readFleet = unstable_cache(
  async (): Promise<FleetArtifact> => fleetData,
  ["fleet-artifact", fleetData.generatedAt],
  { revalidate: 21600 },
);

export async function getFleet(): Promise<FleetArtifact> {
  return readFleet();
}

export async function getVehicles(): Promise<FleetVehicleType[]> {
  const fleet = await getFleet();
  return fleet.vehicles;
}

export async function getVehiclesByCategory(
  category: FleetCategorySlug,
): Promise<FleetVehicleType[]> {
  const vehicles = await getVehicles();
  return vehicles
    .filter((v) => v.category === category)
    .sort((a, b) => a.order - b.order);
}

export async function getVehicleBySlug(
  category: string,
  slug: string,
): Promise<FleetVehicleType | undefined> {
  if (!isFleetCategorySlug(category)) return undefined;
  const vehicles = await getVehicles();
  return vehicles.find((v) => v.category === category && v.slug === slug);
}

export async function getVehicleByTypeId(
  typeId: string,
): Promise<FleetVehicleType | undefined> {
  const vehicles = await getVehicles();
  return vehicles.find((v) => v.typeId === typeId);
}

export function categoryHref(slug: FleetCategorySlug): string {
  return `/fleet/${slug}/`;
}

export { FLEET_CATEGORIES, getCategory, isFleetCategorySlug };
export type { FleetVehicleType, FleetArtifact, FleetCategorySlug };
