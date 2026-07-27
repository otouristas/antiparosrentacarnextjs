import insightsData from "../../data/fleet-review-insights.json";

type InsightQuote = { id: string; author: string; text: string; rating: number };

export type FleetReviewInsightLite = {
  typeId: string;
  slug: string;
  category: string;
  idealFor: string;
  reviewIds: string[];
  quotes: InsightQuote[];
};

const insights = insightsData as {
  generatedAt: string;
  vehicles: Record<string, FleetReviewInsightLite>;
  categories: Record<string, { slug: string; idealFor: string }>;
};

/** Client-safe: does not pull the full reviews.json corpus. */
export function getVehicleIdealFor(slug: string): string | null {
  return insights.vehicles[slug]?.idealFor ?? null;
}
