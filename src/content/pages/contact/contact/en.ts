import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "en",
  seo: {
    title: "Contact AGGELOS Rentals | WhatsApp",
    description: "Contact AGGELOS Rentals for Paros and Antiparos rentals. Phone and WhatsApp +30 694 495 0094. Office at Antiparos Port.",
    keywords: [],
  },
  h1: "Contact AGGELOS Rentals",
  intro: "Questions about licenses, one-way plans, or late ferries? Reach the same local team that hands over the keys.",
  cta: {
    primary: "Check availability",
    secondary: "View fleet",
    whatsapp: "WhatsApp us",
    call: "Call now",
  },
  sections: [
    {
      heading: "Fastest channels",
      body: ["WhatsApp and phone are fastest for same-week changes. Use the form for longer itinerary questions."],
    },
    {
      heading: "What to include",
      body: ["Dates, pickup point, vehicle type, and license category. Flight or ferry numbers help for airport and port meets."],
    },
    {
      heading: "Office location",
      body: ["Port, Antiparos, Cyclades 840 07, Greece. We also meet at Paros Airport and Parikia by appointment."],
    },
  ],
  faqs: [
    { q: "What is the WhatsApp number?", a: "+30 694 495 0094." },
    { q: "Office hours in peak season?", a: "We align handovers with ferry and flight arrivals. Message us your time and we confirm." },
    { q: "Can you arrange hotel delivery?", a: "Yes on many bookings. Select it in the form or ask when you contact us." },
  ],
  related: [
    { to: "contact/about-us", anchor: "About the company · contact" },
    { to: "money/paros-airport-rent-a-car-port", anchor: "Airport pickup help · contact" },
    { to: "fleet", anchor: "Browse vehicles first · contact" },
    { to: "home", anchor: "Homepage · contact" },
  ],
  finalCta: {
    heading: "Send your dates",
    sub: "We reply with availability notes and the cleanest pickup plan for your arrival.",
    button: "Search vehicles",
  },
};

export default copy;
