import { fetchSearch, type SearchParams } from "@/lib/gocars-core";
import { jsonError, jsonOk, optionsOk } from "@/lib/http";

export const dynamic = "force-dynamic";

const REQUIRED = [
  "pickup_id",
  "return_id",
  "date_from",
  "time_from",
  "date_to",
  "time_to",
  "age_group_id",
] as const;

export function OPTIONS() {
  return optionsOk();
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    for (const key of REQUIRED) {
      if (!searchParams.get(key)) {
        return jsonError(`Missing required query param: ${key}`, 400);
      }
    }

    const params: SearchParams = {
      pickup_id: searchParams.get("pickup_id")!,
      return_id: searchParams.get("return_id")!,
      date_from: searchParams.get("date_from")!,
      time_from: searchParams.get("time_from")!,
      date_to: searchParams.get("date_to")!,
      time_to: searchParams.get("time_to")!,
      age_group_id: searchParams.get("age_group_id")!,
      vehicle_type: searchParams.get("vehicle_type") ?? undefined,
      lang: searchParams.get("lang") ?? "en",
      vehicles_sort_by: searchParams.get("vehicles_sort_by") ?? "price_asc",
      type_id: searchParams.get("type_id") ?? undefined,
    };

    const result = await fetchSearch(params, { timeoutMs: 45000 });
    const availableOnly = searchParams.get("available_only") !== "0";
    const vehicles = availableOnly
      ? result.vehicles.filter((v) => v.available)
      : result.vehicles;

    return jsonOk(
      { ...result, vehicles, count: vehicles.length },
      { cacheSeconds: 0 },
    );
  } catch (err) {
    return jsonError(
      err instanceof Error ? err.message : "Failed to search",
      502,
    );
  }
}
