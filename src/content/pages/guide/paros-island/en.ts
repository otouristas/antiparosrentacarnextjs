import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "en",
  seo: {
    title: "Paros Island Guide | AGGELOS Rentals",
    description: "Villages, beaches, and arrival tips for Paros, plus honest advice on when to rent with AGGELOS Rentals. AGGELOS Rentals.",
    keywords: [],
  },
  h1: "Paros Island Travel Guide",
  intro: "Villages, beaches, and arrival tips for Paros, plus honest advice on when to rent with AGGELOS Rentals. AGGELOS Rentals.",
  cta: {
    primary: "Check availability",
    secondary: "View fleet",
    whatsapp: "WhatsApp us",
    call: "Call now",
  },
  sections: [
    {
      heading: "Getting around",
      body: ["Buses and taxis cover parts of the islands, but beaches and sunset dinners are easier with your own wheels on many itineraries.", "Match vehicle type to plans: scooter for light hops, car for luggage, ATV for dirt access."],
    },
    {
      heading: "When to visit",
      body: ["July and August are busiest. June and September often feel calmer with warm water and easier parking."],
    },
    {
      heading: "How we can help",
      body: ["AGGELOS Rentals meets you at Antiparos Port, Paros Airport, or Parikia so your first hour on island is not spent hunting taxis."],
    },
  ],
  faqs: [
    { q: "Do I need a car on both islands?", a: "Not always. Many guests rent on one island and ferry day-trip. Ask us for a plan that fits your hotels." },
    { q: "Is the Antiparos cave far?", a: "It is a short trip from the port by vehicle. Parking and timing tips are shared at handover." },
    { q: "Where should I pick up?", a: "Closest to your arrival: PAS for flights, Parikia for big ferries, Antiparos Port for the short crossing." },
  ],
  related: [
    { to: "money/rent-a-car-antiparos-aggelos", anchor: "Rent on Antiparos · paros-island" },
    { to: "money/paros-rent-a-car", anchor: "Rent on Paros · paros-island" },
    { to: "fleet", anchor: "See vehicle categories · paros-island" },
    { to: "contact/contact", anchor: "Ask a local question · paros-island" },
  ],
  finalCta: {
    heading: "Turn the guide into a booking",
    sub: "Check live availability for your dates, or message WhatsApp with your hotels and arrival time.",
    button: "Search vehicles",
  },
};

export default copy;
