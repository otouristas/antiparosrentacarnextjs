import type { GuideCategory } from "@/components/content/GuideCard";

/** Curated portal categories for the travel guides hub. */
export const GUIDE_CATEGORY: Record<string, GuideCategory> = {
  "do-you-need-to-rent-a-car-in-paros": "getting-around",
  "exploring-paros-car-rentals-made-easy-with-aggelos": "getting-around",
  "rent-a-car-in-paros-with-aggelos-rentals": "getting-around",
  "paros-rent-a-car-affordable-and-cheap-options-2025": "getting-around",
  "paros-rent-a-car-best-deals-tips-for-2025": "getting-around",
  "how-to-get-to-paros-ferries-flights-airport": "tips",
  "travel-tips-for-antiparos-and-paros": "tips",
  "windsurf-paros-car-rental-antiparos": "tips",
  "best-things-to-do-in-paros": "islands",
  "paros-vs-naxos-vs-antiparos": "islands",
  "ultimate-travel-guide-to-paros-greece-updated-for-2025": "islands",
  "antiparos-island": "islands",
  "paros-island": "islands",
  "pasxa-2025-stin-paro-kai-stin-antiparo": "seasonal",
  "imeres-thalassas-2025-ston-peiraia-ena-15imero-me-pano-apo-120-dorean-ekdiloseis":
    "seasonal",
  "santorini-earthquakes-swarm-cyclades-islands-on-alert-including-paros-and-antiparos":
    "seasonal",
  "santorini-earthquakes-why-you-should-choose-paros-or-antiparos-this-year":
    "seasonal",
};

export const FEATURED_GUIDE_IDS = [
  "best-things-to-do-in-paros",
  "how-to-get-to-paros-ferries-flights-airport",
  "do-you-need-to-rent-a-car-in-paros",
  "paros-vs-naxos-vs-antiparos",
] as const;

export function guideImage(images: string[]): string {
  const local = images.find((i) => i.startsWith("/"));
  if (local) return local;
  const media = images.find((i) => i.includes("/media/"));
  if (media) {
    try {
      return new URL(media).pathname;
    } catch {
      /* fall through */
    }
  }
  return "/media/2026/06/paros-naoussa-village.png.webp";
}

export function estimateReadMinutes(markdown: string): number {
  const words = markdown
    .replace(/[#*_>[\]()!`]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(3, Math.round(words / 220));
}
