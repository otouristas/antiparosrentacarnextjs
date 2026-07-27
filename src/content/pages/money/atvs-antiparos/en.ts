import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "en",
  seo: {
    title: "Antiparos ATV Rentals | Quad & Buggy Rentals | AGGELOS",
    description: "Explore Antiparos with our top rated ATV rentals! Best quads - buggies for your island adventure. Book online today with AGGELOS Rentals",
    keywords: [],
  },
  h1: "Antiparos ATV and Quad Rentals",
  intro: "Explore Antiparos trails and remote coves on an ATV or buggy. Most models accept a standard car license.",
  cta: {
    primary: "Book an ATV",
    secondary: "View fleet",
    whatsapp: "WhatsApp us",
    call: "Call now",
  },
  sections: [
    {
      heading: "Best for",
      body: ["Guests chasing quieter beaches and dirt access roads where a low car is not ideal."],
    },
    {
      heading: "License and safety",
      body: ["A category B car license covers most ATVs in our fleet. Minimum age and a short safety briefing apply at pickup."],
    },
    {
      heading: "Choosing engine size",
      body: ["Smaller ATVs suit first-timers. Larger quads and buggies feel more stable for two-up adventure. We match size to experience."],
    },
  ],
  faqs: [
    { q: "Do I need a motorcycle license?", a: "Usually no for ATVs up to common island displacements. We confirm per model." },
    { q: "Can two people ride?", a: "Many models allow two-up when both wear helmets and meet age rules." },
    { q: "Scooter or ATV for Antiparos?", a: "Scooters for town and paved beach roads. ATVs for dirt tracks and rougher approaches." },
  ],
  related: [
    { to: "money/antiparos-scooter-rentals", anchor: "Scooter rentals · atvs-antiparos" },
    { to: "money/rent-a-car-antiparos-aggelos", anchor: "Cars on Antiparos · atvs-antiparos" },
    { to: "fleet-category/atvs", anchor: "ATV fleet details · atvs-antiparos" },
    { to: "fleet-category/suvs", anchor: "Prefer a 4x4 car · atvs-antiparos" },
  ],
  finalCta: {
    heading: "Go beyond the paved roads",
    sub: "We match engine size to experience level and where you plan to ride.",
    button: "Search vehicles",
  },
};

export default copy;
