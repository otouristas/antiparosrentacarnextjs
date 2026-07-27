import { fetchLocations } from "@/lib/gocars-core";
import { jsonError, jsonOk, optionsOk } from "@/lib/http";

export const dynamic = "force-dynamic";

export function OPTIONS() {
  return optionsOk();
}

export async function GET(request: Request) {
  try {
    const lang = new URL(request.url).searchParams.get("lang") ?? "1";
    const data = await fetchLocations(lang, { timeoutMs: 20000 });
    return jsonOk(data, { cacheSeconds: 600 });
  } catch (err) {
    return jsonError(
      err instanceof Error ? err.message : "Failed locations",
      502,
    );
  }
}
