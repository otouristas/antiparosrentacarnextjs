import {
  agesUrl,
  datesUrl,
  locationsUrl,
  modelsUrl,
  optionsUrl,
  searchCarsUrl,
} from "./urls";
import { parseSearchHtml } from "./parseSearchHtml";
import type {
  GoCarsAgeGroup,
  GoCarsDatesData,
  GoCarsLocation,
  GoCarsModel,
  SearchParams,
  SearchResult,
} from "./types";

export interface FetchJsonOptions {
  signal?: AbortSignal;
  timeoutMs?: number;
  headers?: Record<string, string>;
}

async function fetchText(
  url: string,
  opts: FetchJsonOptions = {},
): Promise<string> {
  const controller = new AbortController();
  const timer =
    opts.timeoutMs !== undefined
      ? setTimeout(() => controller.abort(), opts.timeoutMs)
      : undefined;
  try {
    const res = await fetch(url, {
      signal: opts.signal ?? controller.signal,
      headers: {
        Accept: "text/html,application/json,*/*",
        "User-Agent":
          "AGGELOS-Rentals-App/0.1 (+https://antiparosrentacar.com)",
        ...opts.headers,
      },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`GOCARS request failed ${res.status} for ${url}`);
    }
    return await res.text();
  } finally {
    if (timer) clearTimeout(timer);
  }
}

/** GOCARS sometimes returns arrays as `{"0":...,"1":...}` objects. */
export function asArray<T>(
  data: T[] | Record<string, T> | null | undefined,
): T[] {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (typeof data === "object") return Object.values(data);
  return [];
}

async function fetchJson<T>(
  url: string,
  opts: FetchJsonOptions = {},
): Promise<T> {
  const text = await fetchText(url, {
    ...opts,
    headers: { Accept: "application/json", ...opts.headers },
  });
  return JSON.parse(text) as T;
}

export async function fetchDates(
  opts?: FetchJsonOptions,
): Promise<GoCarsDatesData> {
  return fetchJson(datesUrl(), opts);
}

export async function fetchLocations(
  lang = "1",
  opts?: FetchJsonOptions,
): Promise<GoCarsLocation[]> {
  const data = await fetchJson<
    GoCarsLocation[] | Record<string, GoCarsLocation>
  >(locationsUrl(lang), opts);
  return asArray(data);
}

export async function fetchOptions(
  lang?: string,
  opts?: FetchJsonOptions,
): Promise<Record<string, unknown>> {
  return fetchJson(optionsUrl(lang), opts);
}

export async function fetchAges(
  opts?: FetchJsonOptions,
): Promise<GoCarsAgeGroup[]> {
  const data = await fetchJson<
    GoCarsAgeGroup[] | Record<string, GoCarsAgeGroup>
  >(agesUrl(), opts);
  return asArray(data);
}

export async function fetchModels(
  lang = "1",
  opts?: FetchJsonOptions,
): Promise<GoCarsModel[]> {
  const data = await fetchJson<GoCarsModel[] | Record<string, GoCarsModel>>(
    modelsUrl(lang),
    opts,
  );
  return asArray(data);
}

export async function fetchSearch(
  params: SearchParams,
  opts?: FetchJsonOptions,
): Promise<SearchResult> {
  const url = searchCarsUrl(params);
  const html = await fetchText(url, {
    timeoutMs: opts?.timeoutMs ?? 45000,
    ...opts,
  });
  const parsed = parseSearchHtml(html, params);
  return { ...parsed, searchUrl: url };
}
