import type { CategoryCopy } from "@/content/types";

export const copy: CategoryCopy = {
  locale: "en",
  label: "Scooters",
  bestFor: "Quick rides between beach and town when you travel light.",
  licence: "50cc often with car license. 125cc and above usually need motorcycle category.",
  compare: "Scooters for paved village hops. ATVs for dirt tracks.",
  seo: {
    title: "Scooter Rentals Paros & Antiparos",
    description: "Rent scooters from 50cc to 300cc on Antiparos and Paros. Helmets included. License guidance from AGGELOS Rentals at booking.",
    keywords: [],
  },
  h1: "Scooter Rentals for Beach Hops",
  intro: "Light, parkable, and perfect for short island loops. Helmets included. We match engine size to your license.",
  cta: {
    primary: "Check availability",
    secondary: "View fleet",
    whatsapp: "WhatsApp us",
    call: "Call now",
  },
  sections: [
    {
      heading: "Engine sizes",
      body: ["From easy 50cc hops to stronger 125cc to 300cc models, plus elite scooter options when listed."],
    },
    {
      heading: "License check",
      body: ["Bring the physical license that covers the engine you book. We verify at pickup for insurance validity."],
    },
    {
      heading: "Where scooters shine",
      body: ["Antiparos town to nearby beaches, Parikia evening runs, and travellers who skip large suitcases."],
    },
  ],
  faqs: [
    { q: "Are helmets included?", a: "Yes for scooter rentals." },
    { q: "Two-up riding?", a: "When the model allows and both wear helmets. Ask us to confirm per type." },
    { q: "Scooter or car?", a: "Scooter if you stay near town and travel light. Car if you have luggage or night drives with kids." },
  ],
  related: [
    { to: "money/antiparos-scooter-rentals", anchor: "Antiparos scooter guide · scooters" },
    { to: "fleet-category/atvs", anchor: "Prefer an ATV · scooters" },
    { to: "fleet-category/bikes", anchor: "Bicycles and e-bikes · scooters" },
    { to: "money/rent-a-car-antiparos-aggelos", anchor: "Need a car instead · scooters" },
  ],
  finalCta: {
    heading: "Grab the keys and a helmet",
    sub: "Search scooter sizes for your dates or message WhatsApp with your license category.",
    button: "Search vehicles",
  },
};

export default copy;
