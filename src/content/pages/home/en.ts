import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "en",
  seo: {
    title: "Antiparos & Paros Rent a Car | AGGELOS Rentals",
    description: "Explore Antiparos and Paros with ease. AGGELOS Rentals offers cars, scooters, and ATVs at competitive rates. Book now for a smooth ride!",
    keywords: [],
  },
  h1: "Antiparos and Paros Vehicle Rentals",
  intro: "Cars, scooters, ATVs and bikes from a family-run desk since 1994. Meet us at Antiparos Port, Paros Airport, or Parikia.",
  cta: {
    primary: "Check availability",
    secondary: "View fleet",
    whatsapp: "WhatsApp us",
    call: "Call now",
  },
  sections: [
    {
      heading: "Why book with AGGELOS Rentals",
      body: ["Headquartered at Antiparos Port, we know the ferries, the parking, and the roads that jam in August.", "Insurance basics are included in published rates. What you see online is what you pay at pickup."],
    },
    {
      heading: "Pickup where you land",
      body: ["Paros Airport (PAS), Parikia port, Antiparos Port, selected villas, and Piraeus for mainland starts."],
    },
    {
      heading: "Choose the right category",
      body: ["Match the island to the ride: compact cars for villages, scooters for short hops, ATVs for dirt tracks, SUVs for families."],
    },
  ],
  faqs: [
    { q: "Do I need a car on Antiparos?", a: "For beaches beyond the main village and dinners away from the port, a compact car or scooter makes the island easy. In-town only, you can walk and day-trip to Paros." },
    { q: "Can you meet me at Paros Airport?", a: "Yes. Book Paros Airport (PAS) pickup. We track flights and meet you at arrivals." },
    { q: "What license do I need?", a: "A valid car license covers most cars, SUVs, and ATVs. Scooters 125cc and above need a motorcycle category. Non-EU guests should bring an IDP when required." },
  ],
  related: [
    { to: "money/paros-rent-a-car", anchor: "Paros rent a car · home" },
    { to: "money/rent-a-car-antiparos-aggelos", anchor: "Antiparos rent a car · home" },
    { to: "fleet", anchor: "Browse the fleet · home" },
    { to: "guide/antiparos-island", anchor: "Antiparos island guide · home" },
  ],
  finalCta: {
    heading: "Your keys are waiting on the Cyclades",
    sub: "Check live prices, lock free cancellation where offered, and message WhatsApp if your ferry is delayed.",
    button: "Search vehicles",
  },
};

export default copy;
