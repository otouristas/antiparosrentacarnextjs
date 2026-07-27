import reviewsData from "../../data/reviews.json";
import insightsData from "../../data/fleet-review-insights.json";

export type SiteReview = {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  language?: string;
  ownerReply?: string;
  profilePicture?: string;
  fleetSlugs: string[];
  categorySlugs: string[];
};

export type ReviewsArtifact = {
  scrapedAt: string;
  placeUrl: string;
  placeId: string;
  rating: number;
  reviewCount: number;
  source: string;
  reviews: SiteReview[];
};

export type FleetReviewInsight = {
  typeId: string;
  slug: string;
  category: string;
  idealFor: string;
  reviewIds: string[];
  quotes: { id: string; author: string; text: string; rating: number }[];
};

export type CategoryReviewInsight = {
  slug: string;
  idealFor: string;
  reviewIds: string[];
  quotes: { id: string; author: string; text: string; rating: number }[];
};

const data = reviewsData as ReviewsArtifact;
const insights = insightsData as {
  generatedAt: string;
  vehicles: Record<string, FleetReviewInsight>;
  categories: Record<string, CategoryReviewInsight>;
};

export function getReviewsArtifact(): ReviewsArtifact {
  return data;
}

export function getAllReviews(): SiteReview[] {
  return data.reviews;
}

/** 5-star first, then newest, matches reviews.json sort. */
export function getSortedReviews(minRating?: number): SiteReview[] {
  const list = minRating
    ? data.reviews.filter((r) => r.rating >= minRating)
    : data.reviews;
  return [...list].sort((a, b) => {
    if (b.rating !== a.rating) return b.rating - a.rating;
    return String(b.date).localeCompare(String(a.date));
  });
}

export function getFeaturedReviews(limit = 6): SiteReview[] {
  return getSortedReviews(5)
    .filter((r) => r.text.trim().length >= 40)
    .slice(0, limit);
}

export function getReviewStats() {
  return {
    rating: data.rating,
    reviewCount: data.reviewCount,
    placeUrl: data.placeUrl,
    scrapedAt: data.scrapedAt,
  };
}

export function getVehicleInsight(slug: string): FleetReviewInsight | null {
  return insights.vehicles[slug] ?? null;
}

export function getCategoryInsight(slug: string): CategoryReviewInsight | null {
  return insights.categories[slug] ?? null;
}

export function getReviewsByIds(ids: string[]): SiteReview[] {
  const map = new Map(data.reviews.map((r) => [r.id, r]));
  return ids.map((id) => map.get(id)).filter(Boolean) as SiteReview[];
}

export function formatReviewDate(iso: string, locale = "en"): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  try {
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(d);
  } catch {
    return iso.slice(0, 10);
  }
}
