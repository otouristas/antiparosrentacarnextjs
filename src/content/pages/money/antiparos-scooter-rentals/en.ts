import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "en",
  seo: {
    title: "Antiparos Rent a Scooter | AGGELOS Rentals",
    description: "Rent a scooter in Antiparos or Paros with AGGELOS Rentals. Flexible, reliable, and ideal for exploring the islands. Book your scooter now!",
    keywords: [],
  },
  h1: "Antiparos Scooter Rentals",
  intro: "Rent a scooter on Antiparos with helmets included. Ideal for beach hops, village parking, and travelling light.",
  cta: {
    primary: "Book a scooter",
    secondary: "View fleet",
    whatsapp: "WhatsApp us",
    call: "Call now",
  },
  sections: [
    {
      heading: "Best for",
      body: ["Couples and solo travellers staying near Antiparos town who want flexible beach access without a car footprint."],
    },
    {
      heading: "License notes",
      body: ["50cc models often work with a car license. 125cc and above typically need a motorcycle category. We verify at pickup for insurance validity."],
    },
    {
      heading: "Scooter or ATV?",
      body: ["Scooters win in the village. ATVs win on dirt tracks and rougher beach approaches. Tell us your route and we will recommend honestly."],
    },
  ],
  faqs: [
    { q: "Are helmets included?", a: "Yes. Helmets are included with scooter rentals." },
    { q: "What size should I book?", a: "50cc for short hops and lighter traffic confidence. 125cc to 300cc for more power when you are licensed for it." },
    { q: "Where is scooter pickup?", a: "Usually Antiparos Port. Hotel delivery can be arranged for longer stays." },
  ],
  related: [
    { to: "money/atvs-antiparos", anchor: "Prefer an ATV instead · antiparos-scooter-" },
    { to: "money/rent-a-car-antiparos-aggelos", anchor: "Need a car on Antiparos · antiparos-scooter-" },
    { to: "fleet-category/scooters", anchor: "See scooter fleet · antiparos-scooter-" },
    { to: "fleet-category/bikes", anchor: "Bicycles and e-bikes · antiparos-scooter-" },
  ],
  finalCta: {
    heading: "Island mode: scooter on",
    sub: "License rules depend on engine size. We confirm the right model for your paperwork.",
    button: "Search vehicles",
  },
};

export default copy;
