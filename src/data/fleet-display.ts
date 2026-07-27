import type { FleetVehicleType } from "./fleet-types";

/** Public path for the UI, local override wins, then normalised render, then remote. */
export function fleetImage(v: FleetVehicleType): string {
  if (v.images.local) return v.images.local;
  if (v.images.normalized) return v.images.normalized;
  if (v.typeId) return `/fleet/normalized/${v.typeId}.webp`;
  return v.images.remote ?? "/images/og-default.webp";
}

/** Customer-facing label, never render the raw GoCars `typeName`. */
export function vehicleDisplayName(v: FleetVehicleType): string {
  const first = v.models[0];
  if (!first) return v.typeName;
  const label = `${first.make} ${first.model}`.trim();
  return v.models.length > 1 ? `${label} or similar` : label;
}

export function vehicleHref(v: FleetVehicleType): string {
  return `/fleet/${v.category}/${v.slug}/`;
}
