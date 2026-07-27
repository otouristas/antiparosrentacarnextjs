/** Parse GOCARS European price strings like "508,25€" or "72,61 €/day". */
export function parseEuroPrice(text?: string | null): number | undefined {
  if (!text) return undefined;
  const cleaned = text
    .replace(/[^\d,.\-]/g, "")
    .replace(/\.(?=\d{3}(?:\D|$))/g, "")
    .replace(",", ".");
  const n = Number.parseFloat(cleaned);
  return Number.isFinite(n) ? n : undefined;
}
