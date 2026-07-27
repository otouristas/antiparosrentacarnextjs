import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "en",
  seo: {
    title: "Paros Airport Rent a Car 2026 | PAS Pickup | AGGELOS",
    description: "Paros airport rent a car at PAS with AGGELOS Rentals. Book online for fast terminal pickup, competitive rates and local support since 1994.",
    keywords: [],
  },
  h1: "Paros Airport Car Rental at PAS",
  intro: "Skip the taxi queue. Book Paros Airport (PAS) pickup with AGGELOS Rentals: flight-aware handover and a clear path to your hotel or the Antiparos ferry.",
  cta: {
    primary: "Book airport pickup",
    secondary: "View fleet",
    whatsapp: "WhatsApp us",
    call: "Call now",
  },
  sections: [
    {
      heading: "Pickup process",
      body: ["Select Paros Airport (PAS) in the booking widget. Share your flight number if requested. We track delays and meet you at arrivals with paperwork ready."],
    },
    {
      heading: "After landing",
      body: ["Clear arrivals, look for AGGELOS Rentals or your confirmation name, do a quick contract check and license scan, then drive toward Parikia, Naoussa, or the Antiparos ferry terminal."],
    },
    {
      heading: "Vehicle tips after a flight",
      body: ["Automatics feel easier after a long inbound flight. Families often prefer SUVs for luggage. Couples travelling light do well with mini or compact cars."],
    },
  ],
  faqs: [
    { q: "What if my flight is delayed?", a: "We monitor arrivals for airport bookings. Message WhatsApp if the delay is major so we can adjust staffing." },
    { q: "How long does pickup take?", a: "Most handovers take a few minutes once you reach the meeting point. Have your license and voucher ready." },
    { q: "Can I drop off at the airport too?", a: "Yes. Choose airport return in the form or ask us to arrange it on a one-way plan." },
  ],
  related: [
    { to: "money/paros-rent-a-car", anchor: "All Paros rental options · paros-airport-rent" },
    { to: "money/paros-port-parikia-rent-a-car", anchor: "Prefer port pickup instead · paros-airport-rent" },
    { to: "money/suv-rentals-paros", anchor: "SUV for airport luggage · paros-airport-rent" },
    { to: "fleet-category/mini", anchor: "Mini cars after landing · paros-airport-rent" },
  ],
  finalCta: {
    heading: "Land, collect, drive",
    sub: "Tell us your flight details at booking. We will be at arrivals when you clear the terminal.",
    button: "Search vehicles",
  },
};

export default copy;
