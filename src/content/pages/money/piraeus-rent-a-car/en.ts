import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "en",
  seo: {
    title: "Piraeus rent a car | AGGELOS Rentals",
    description: "Rent a car at Piraeus Port with AGGELOS Rentals. Choose from a wide range of vehicles and enjoy a stress-free journey. Book your rental now!",
    keywords: [],
  },
  h1: "Piraeus Rent a Car Before the Ferry",
  intro: "Pick up in Piraeus and begin your Cyclades trip from Athens. Timed for ferry departures to Paros and beyond.",
  cta: {
    primary: "Check Piraeus options",
    secondary: "View fleet",
    whatsapp: "WhatsApp us",
    call: "Call now",
  },
  sections: [
    {
      heading: "Why start in Piraeus",
      body: ["Some itineraries are smoother with a mainland pickup before boarding. We support Piraeus collection so your island time is not spent waiting in lines."],
    },
    {
      heading: "Linking to the islands",
      body: ["Many guests rent in Piraeus for the mainland leg, then book a second vehicle with us on Paros or Antiparos after the ferry. Ask if a one-way plan fits your dates."],
    },
    {
      heading: "Practical tips",
      body: ["Leave extra time for port traffic before sailings. Compact cars are easier around ferry approaches. Confirm drop-off rules when you book."],
    },
  ],
  faqs: [
    { q: "Can I drop the car on Paros?", a: "Ask for a one-way plan when booking. Availability depends on dates and vehicle type." },
    { q: "Do you meet at the ferry gates?", a: "We share a clear meeting point for Piraeus pickups on confirmation." },
    { q: "Can I also book an island rental?", a: "Yes. Many travellers book Piraeus plus a Paros or Antiparos vehicle for the island days." },
  ],
  related: [
    { to: "money/paros-rent-a-car", anchor: "Paros island rentals · piraeus-rent-a-car" },
    { to: "money/paros-port-parikia-rent-a-car", anchor: "Parikia ferry arrival · piraeus-rent-a-car" },
    { to: "contact/contact", anchor: "Ask about one-way plans · piraeus-rent-a-car" },
    { to: "fleet-category/compact", anchor: "Compact cars for port runs · piraeus-rent-a-car" },
  ],
  finalCta: {
    heading: "Athens to the islands, keys in hand",
    sub: "Coordinate pickup with your sailing, then continue with AGGELOS Rentals on Paros and Antiparos if you need a second leg.",
    button: "Search vehicles",
  },
};

export default copy;
