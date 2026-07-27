import type { CategoryCopy } from "@/content/types";

export const copy: CategoryCopy = {
  locale: "en",
  label: "ATVs, quads and buggies",
  bestFor: "Dirt tracks, quieter beaches, and off-main-road exploring.",
  licence: "Most ATVs accept a car license. Minimum age and briefing apply.",
  compare: "ATVs for tracks. Scooters for village asphalt. SUVs if you want a cabin.",
  seo: {
    title: "ATV & Quad Rentals Paros Antiparos",
    description: "Rent ATVs, quads and buggies on Antiparos and Paros. Most models with a car license. Local tips from AGGELOS Rentals since 1994.",
    keywords: [],
  },
  h1: "ATV, Quad and Buggy Rentals",
  intro: "Reach coves and dirt access roads that feel awkward in a low car. We match engine size to experience.",
  cta: {
    primary: "Check availability",
    secondary: "View fleet",
    whatsapp: "WhatsApp us",
    call: "Call now",
  },
  sections: [
    {
      heading: "What is in the category",
      body: ["ATVs from lighter to stronger displacements, plus buggy and UTV options when inventory allows."],
    },
    {
      heading: "Safety first",
      body: ["Short briefing at pickup, helmets as required, and honest advice if conditions are rough."],
    },
    {
      heading: "Antiparos favourite",
      body: ["Many guests combine a morning ATV loop with an afternoon swim. Tell us your route and skill level."],
    },
  ],
  faqs: [
    { q: "Motorcycle license needed?", a: "Usually not for common ATV models. We confirm per type." },
    { q: "First time on an ATV?", a: "Start with a smaller engine. We will not upsell you into something uncomfortable." },
    { q: "Buggy versus quad?", a: "Buggies feel more stable for two-up fun. Quads are nimble on narrower tracks." },
  ],
  related: [
    { to: "money/atvs-antiparos", anchor: "ATV rentals guide · atvs" },
    { to: "fleet-category/scooters", anchor: "Scooter alternative · atvs" },
    { to: "fleet-category/suvs", anchor: "Prefer a 4x4 cabin · atvs" },
    { to: "money/rent-a-car-antiparos-aggelos", anchor: "Antiparos car desk · atvs" },
  ],
  finalCta: {
    heading: "Leave the asphalt when you want",
    sub: "Check ATV and buggy availability, then meet us at Antiparos Port.",
    button: "Search vehicles",
  },
};

export default copy;
