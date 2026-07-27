import { fetchDates } from "@/lib/gocars-core";
import { jsonError, jsonOk, optionsOk } from "@/lib/http";

export const dynamic = "force-dynamic";

export function OPTIONS() {
  return optionsOk();
}

export async function GET() {
  try {
    const data = await fetchDates({ timeoutMs: 20000 });
    return jsonOk(data, { cacheSeconds: 300 });
  } catch (err) {
    return jsonError(err instanceof Error ? err.message : "Failed dates", 502);
  }
}
