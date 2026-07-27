import { fetchAges } from "@/lib/gocars-core";
import { jsonError, jsonOk, optionsOk } from "@/lib/http";

export const dynamic = "force-dynamic";

export function OPTIONS() {
  return optionsOk();
}

export async function GET() {
  try {
    const data = await fetchAges({ timeoutMs: 20000 });
    return jsonOk(data, { cacheSeconds: 600 });
  } catch (err) {
    return jsonError(err instanceof Error ? err.message : "Failed ages", 502);
  }
}
