import { GOCARS_ADMIN, GOCARS_FRONT, GOCARS_ORIGIN } from "./config";
import type { SearchParams } from "./types";

function qs(params: Record<string, string | undefined>): string {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "") sp.set(k, v);
  }
  return sp.toString();
}

export function adminActionUrl(
  action: string,
  extra: Record<string, string | undefined> = {},
): string {
  const params: Record<string, string | undefined> = {
    controller: "gcFront",
    action,
  };
  for (const [k, v] of Object.entries(extra)) {
    params[k] = v;
  }
  return `${GOCARS_ADMIN}/index.php?${qs(params)}`;
}

export function datesUrl(): string {
  return adminActionUrl("getDatesData");
}

export function locationsUrl(lang = "1"): string {
  return adminActionUrl("getLocationsData", { lang });
}

export function optionsUrl(lang?: string): string {
  return adminActionUrl("getOptionsData", lang ? { lang } : {});
}

export function agesUrl(): string {
  return adminActionUrl("getAgeGroupsData");
}

export function modelsUrl(lang = "1"): string {
  return adminActionUrl("getModelsDataForPlugin", { lang });
}

export function attemptsUrl(): string {
  return adminActionUrl("getAttemptsData");
}

export function searchParamsToQuery(params: SearchParams): Record<string, string> {
  const q: Record<string, string> = {
    controller: "gcFront",
    action: "gcActionCars",
    pickup_id: params.pickup_id,
    return_id: params.return_id,
    date_from: params.date_from,
    time_from: params.time_from,
    date_to: params.date_to,
    time_to: params.time_to,
    age_group_id: params.age_group_id,
    lang: params.lang ?? "en",
  };
  if (params.vehicle_type) q.vehicle_type = params.vehicle_type;
  if (params.vehicles_sort_by) q.vehicles_sort_by = params.vehicles_sort_by;
  if (params.type_id) q.type_id = params.type_id;
  if (params.agent_code) q.agent_code = params.agent_code;
  if (params.website) q.website = params.website;
  return q;
}

/** Date-specific availability results (SSR HTML). */
export function searchCarsUrl(params: SearchParams): string {
  return `${GOCARS_FRONT}?${qs(searchParamsToQuery(params))}`;
}

/**
 * GoCars hosted checkout — matches their Select button (`gcCars.js`):
 * `FRONT_URL/checkout?pickup_id=…&model_id=…&payment_method=…&insurance=…`
 */
export function checkoutUrl(
  params: SearchParams & {
    model_id: string;
    payment_method?: string;
    insurance?: string;
  },
): string {
  const q: Record<string, string | undefined> = {
    pickup_id: params.pickup_id,
    return_id: params.return_id,
    date_from: params.date_from,
    time_from: params.time_from,
    date_to: params.date_to,
    time_to: params.time_to,
    age_group_id: params.age_group_id,
    lang: params.lang ?? "en",
    model_id: params.model_id,
    payment_method: params.payment_method ?? "pay_now_total",
    insurance: params.insurance,
  };
  if (params.vehicle_type) q.vehicle_type = params.vehicle_type;
  if (params.agent_code) q.agent_code = params.agent_code;
  if (params.website) q.website = params.website;
  return `${GOCARS_ORIGIN}/checkout?${qs(q)}`;
}

export function findReservationUrl(lang = "en"): string {
  return `${GOCARS_ORIGIN}/?lang=${encodeURIComponent(lang)}#find`;
}

export function searchShellUrl(lang = "en"): string {
  return `${GOCARS_FRONT}?${qs({
    controller: "gcFront",
    action: "gcActionSearch",
    lang,
  })}`;
}
