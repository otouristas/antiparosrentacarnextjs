import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "en",
  seo: {
    title: "Paros Port Rent a Car Parikia | Ferry Pickup | AGGELOS",
    description: "Paros port rent a car at Parikia ferry terminal with AGGELOS Rentals. Book online for fast port pickup, competitive rates and local support since 1994.",
    keywords: [],
  },
  h1: "Paros Port Car Rental in Parikia",
  intro: "Step off the ferry in Parikia and collect your rental nearby. Clear walking directions, local routing tips, and vehicles sized for island roads.",
  cta: {
    primary: "Book port pickup",
    secondary: "View fleet",
    whatsapp: "WhatsApp us",
    call: "Call now",
  },
  sections: [
    {
      heading: "Pickup instructions",
      body: ["Choose Paros Port (Parikia) when booking. We send a precise meeting pin, typically a short walk from the main ferry exit, away from the densest taxi scramble."],
    },
    {
      heading: "Walking and luggage",
      body: ["With light bags, walking to the meeting point is straightforward. Heavy luggage? Ask for vehicle delivery closer to the dock or your Parikia hotel."],
    },
    {
      heading: "Local routing tips",
      body: ["From Parikia you can reach Naoussa, the east-coast beaches, or the Pounda Antiparos ferry in under an hour depending on traffic. Midday August traffic near the port is the main delay."],
    },
  ],
  faqs: [
    { q: "How far is pickup from the ferry?", a: "Usually a short walk. The exact pin is shared on confirmation." },
    { q: "Can I continue to Antiparos the same day?", a: "Yes. Drive to the short ferry or arrange Antiparos drop-off on a one-way rental." },
    { q: "Is parking easy in Parikia?", a: "Village streets are tight. Compact cars help. We share parking tips at handover." },
  ],
  related: [
    { to: "money/paros-airport-rent-a-car-port", anchor: "Flying in? Airport pickup · paros-port-parikia" },
    { to: "money/paros-rent-a-car", anchor: "Paros rent a car overview · paros-port-parikia" },
    { to: "money/rent-a-car-antiparos-aggelos", anchor: "Continue to Antiparos · paros-port-parikia" },
    { to: "fleet-category/compact", anchor: "Compact cars for Parikia · paros-port-parikia" },
  ],
  finalCta: {
    heading: "Ferry in. Drive out.",
    sub: "Ideal for Athens to Paros sailings and island hoppers continuing to Antiparos.",
    button: "Search vehicles",
  },
};

export default copy;
