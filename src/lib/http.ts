import { NextResponse } from "next/server";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export function jsonOk(data: unknown, init?: { cacheSeconds?: number }) {
  const headers: Record<string, string> = { ...CORS_HEADERS };
  if (init?.cacheSeconds && init.cacheSeconds > 0) {
    headers["Cache-Control"] =
      `public, s-maxage=${init.cacheSeconds}, stale-while-revalidate=60`;
  } else {
    headers["Cache-Control"] = "no-store";
  }
  return NextResponse.json(data, { headers });
}

export function jsonError(message: string, status = 500) {
  return NextResponse.json(
    { error: message },
    { status, headers: { ...CORS_HEADERS, "Cache-Control": "no-store" } },
  );
}

export function optionsOk() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}
