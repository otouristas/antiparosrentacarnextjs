import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "en",
  seo: {
    title: "Rent a car and moto in Paros | AGGELOS Rentals",
    description: "Rent a car on Paros island with AGGELOS Rentals. Book online in 60 seconds for airport, port and island pickup with trusted local service since 1994.",
    keywords: [],
  },
  h1: "Paros Rent a Car with Local Pickup",
  intro: "Explore Paros with a local fleet based next door on Antiparos. Meet us at Paros Airport (PAS) or Parikia port, with transparent rates and fast WhatsApp support.",
  cta: {
    primary: "Check Paros availability",
    secondary: "View fleet",
    whatsapp: "WhatsApp us",
    call: "Call now",
  },
  sections: [
    {
      heading: "Why a rental helps on Paros",
      body: ["Buses cover the main towns, but beaches, sunset dinners, and last ferries are easier with your own wheels. A compact car or scooter turns Paros into a flexible island, not a transfer timetable.", "AGGELOS Rentals has been family-run since 1994 with desks that understand both Paros traffic and the Antiparos crossing."],
    },
    {
      heading: "Airport and port pickup",
      body: ["Land at Paros Airport (PAS)? We meet you at arrivals with flight timing in mind. Arrive by ferry at Parikia? Collect near the gangway or arrange hotel delivery.", "One-way options between Paros and Antiparos keep multi-island plans simple."],
    },
    {
      heading: "What travellers usually book",
      body: ["Couples often choose mini or compact cars for village parking. Families lean toward SUVs or people carriers. Scooters and ATVs suit lighter luggage and beach hopping."],
    },
  ],
  faqs: [
    { q: "Where do I pick up a rental car on Paros?", a: "Paros Airport (PAS), Parikia port, or selected hotels and villas. Choose your location when you search." },
    { q: "Can I take the car to Antiparos?", a: "Yes on agreed one-way or island-crossing rentals. Confirm ferry rules for your vehicle type when booking." },
    { q: "Is fuel included?", a: "Standard fuel policy applies: return at the same level unless your voucher states otherwise." },
  ],
  related: [
    { to: "money/paros-airport-rent-a-car-port", anchor: "Paros Airport pickup · paros-rent-a-car" },
    { to: "money/paros-port-parikia-rent-a-car", anchor: "Parikia port pickup · paros-rent-a-car" },
    { to: "money/rent-a-car-antiparos-aggelos", anchor: "Antiparos rent a car · paros-rent-a-car" },
    { to: "fleet-category/compact", anchor: "Compact cars for villages · paros-rent-a-car" },
  ],
  finalCta: {
    heading: "Ready for Paros roads?",
    sub: "Book online, meet us at the airport or port, and drive to Naoussa, Golden Beach, or the Antiparos ferry.",
    button: "Search vehicles",
  },
};

export default copy;
