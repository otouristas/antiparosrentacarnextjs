import type { CategoryCopy } from "@/content/types";

export const copy: CategoryCopy = {
  locale: "en",
  label: "Compact cars",
  bestFor: "Everyday comfort for couples and small groups exploring both islands.",
  licence: "Standard car license covers manual and automatic compact cars.",
  compare: "More space than mini, easier parking than most SUVs in village centres.",
  seo: {
    title: "Compact Car Hire Paros & Antiparos",
    description: "Rent compact cars on Paros and Antiparos. Balanced space and parking ease with AGGELOS Rentals. Airport, port and hotel pickup options.",
    keywords: [],
  },
  h1: "Compact Cars for Daily Island Driving",
  intro: "The workhorse category for Paros and Antiparos: enough space for beach bags, still manageable in village parking.",
  cta: {
    primary: "Check availability",
    secondary: "View fleet",
    whatsapp: "WhatsApp us",
    call: "Call now",
  },
  sections: [
    {
      heading: "Who books compact",
      body: ["Couples on a week-long stay, friends sharing costs, or anyone who wants a calmer drive than a scooter without SUV size."],
    },
    {
      heading: "Hybrid options",
      body: ["Some compact types include hybrid manuals when available. Check the vehicle page for current models and notes."],
    },
    {
      heading: "Pickup flexibility",
      body: ["Airport, Parikia port, Antiparos Port, and selected hotels. One-way between the islands is a frequent request."],
    },
  ],
  faqs: [
    { q: "Manual or automatic?", a: "Both appear in this category depending on dates. Choose in the booking filters." },
    { q: "Good for families?", a: "For two adults and one child, often yes. Larger families usually prefer people carriers or SUVs." },
    { q: "Fuel policy?", a: "Return at the same level unless your voucher says otherwise." },
  ],
  related: [
    { to: "fleet-category/mini", anchor: "Smaller mini cars · compact" },
    { to: "fleet-category/crossover", anchor: "Higher crossover ride · compact" },
    { to: "money/paros-airport-rent-a-car-port", anchor: "Airport pickup details · compact" },
    { to: "money/paros-port-parikia-rent-a-car", anchor: "Parikia port pickup · compact" },
  ],
  finalCta: {
    heading: "Reserve a compact for the week",
    sub: "Search your dates, lock free cancellation where offered, message us if the ferry shifts.",
    button: "Search vehicles",
  },
};

export default copy;
