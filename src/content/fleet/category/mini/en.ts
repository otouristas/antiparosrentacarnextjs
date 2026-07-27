import type { CategoryCopy } from "@/content/types";

export const copy: CategoryCopy = {
  locale: "en",
  label: "Mini cars",
  bestFor: "Village streets, short hops, easy parking in Parikia and Antiparos town.",
  licence: "Standard car license. Automatic options available in the category.",
  compare: "Choose mini for parking ease. Step up to compact for more luggage space.",
  seo: {
    title: "Mini Car Rentals Paros & Antiparos",
    description: "Rent mini cars on Paros and Antiparos with AGGELOS Rentals. Easy village parking, airport and port pickup, clear daily rates.",
    keywords: [],
  },
  h1: "Mini Car Rentals for Island Streets",
  intro: "Small cars that slip through village lanes and park where larger SUVs struggle. Ideal for couples and light luggage.",
  cta: {
    primary: "Check availability",
    secondary: "View fleet",
    whatsapp: "WhatsApp us",
    call: "Call now",
  },
  sections: [
    {
      heading: "When a mini is enough",
      body: ["If you stay near town, travel as a couple, and do day trips rather than full luggage circuits, a mini keeps costs and stress down.", "Manual and automatic minis are listed live. Pick the gearbox you are comfortable driving after the ferry."],
    },
    {
      heading: "Pickup points",
      body: ["Meet us at Antiparos Port, Paros Airport (PAS), or Parikia. Hotel delivery is available on request for longer stays."],
    },
    {
      heading: "Mini versus compact",
      body: ["Minis win on the tightest streets. Compacts add boot space for beach gear and a week of shopping bags."],
    },
  ],
  faqs: [
    { q: "Are automatic minis available?", a: "Yes when inventory allows. Filter automatic in the search or ask on WhatsApp." },
    { q: "Is a mini ok with suitcases?", a: "Soft bags for two usually fit. Hard large suitcases are easier in compact or crossover." },
    { q: "Can I take a mini to Antiparos?", a: "Yes on agreed island plans. Confirm ferry loading rules when you book." },
  ],
  related: [
    { to: "fleet-category/compact", anchor: "Need more boot space · mini" },
    { to: "money/paros-rent-a-car", anchor: "Paros car rental guide · mini" },
    { to: "money/rent-a-car-antiparos-aggelos", anchor: "Antiparos car rental · mini" },
    { to: "fleet", anchor: "See all categories · mini" },
  ],
  finalCta: {
    heading: "Book a mini for the lanes",
    sub: "Check live rates for your dates, then meet us at the port or airport.",
    button: "Search vehicles",
  },
};

export default copy;
