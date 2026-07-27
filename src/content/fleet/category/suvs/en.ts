import type { CategoryCopy } from "@/content/types";

export const copy: CategoryCopy = {
  locale: "en",
  label: "SUVs and 4x4",
  bestFor: "Families, luggage, hills, and rougher beach access roads.",
  licence: "Standard car license for our SUVs and most 4x4 types.",
  compare: "More capability than compact. Choose open-top or hybrid variants when listed.",
  seo: {
    title: "SUV & 4x4 Rentals Paros Antiparos",
    description: "Rent SUVs and 4x4s on Paros and Antiparos. Space for families and beach roads. Book with AGGELOS Rentals for airport or port pickup.",
    keywords: [],
  },
  h1: "SUV and 4x4 Rentals",
  intro: "Height, space, and confidence on uneven approaches. From practical SUVs to off-road favourites and elite automatics.",
  cta: {
    primary: "Check availability",
    secondary: "View fleet",
    whatsapp: "WhatsApp us",
    call: "Call now",
  },
  sections: [
    {
      heading: "Best use cases",
      body: ["Family luggage, golf bags, multiple hotels in one trip, or east-coast beaches with uneven parking."],
    },
    {
      heading: "Types in this category",
      body: ["Manual and automatic SUVs, hybrid 4xe options when available, open-top variants, and dedicated off-road manuals."],
    },
    {
      heading: "Town driving note",
      body: ["Naoussa and Antiparos lanes can feel tight. If you stay mostly in town, consider compact for daytime and SUV only when needed."],
    },
  ],
  faqs: [
    { q: "Are open-top SUVs available?", a: "Yes when listed. Check the open-top automatic type for current models." },
    { q: "Do I need 4x4 experience?", a: "For paved and mild dirt roads, normal driving skill is enough. We brief off-road types at pickup." },
    { q: "Peak season tip?", a: "Book early in July and August. SUV inventory moves first for family arrivals." },
  ],
  related: [
    { to: "money/suv-rentals-paros", anchor: "SUV rentals guide · suvs" },
    { to: "fleet-category/people-carriers", anchor: "Need more seats · suvs" },
    { to: "fleet-category/crossover", anchor: "Smaller crossover option · suvs" },
    { to: "money/paros-airport-rent-a-car-port", anchor: "Airport SUV pickup · suvs" },
  ],
  finalCta: {
    heading: "Book the space you need",
    sub: "Search SUV availability for your dates, then meet us at PAS, Parikia, or Antiparos Port.",
    button: "Search vehicles",
  },
};

export default copy;
