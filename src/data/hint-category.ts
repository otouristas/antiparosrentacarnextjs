import type { FleetCategorySlug } from "@/data/fleet-categories";

/** Map money-page vehicle hint titles → GoCars category for icon + href. */
export function hintCategorySlug(title: string): FleetCategorySlug {
  const t = title.toLowerCase();
  if (t.includes("scooter") || t.includes("50cc") || t.includes("125"))
    return "scooters";
  if (t.includes("atv") || t.includes("quad") || t.includes("bugg"))
    return "atvs";
  if (t.includes("bike") || t.includes("e-bike")) return "bikes";
  if (t.includes("suv") || t.includes("jeep") || t.includes("4x4"))
    return "suvs";
  if (t.includes("mini")) return "mini";
  if (t.includes("crossover")) return "crossover";
  if (t.includes("convertible")) return "convertible";
  if (t.includes("people") || t.includes("van") || t.includes("carrier")) {
    return "people-carriers";
  }
  if (
    t.includes("automatic") ||
    t.includes("economy") ||
    t.includes("compact")
  ) {
    return "compact";
  }
  return "compact";
}
