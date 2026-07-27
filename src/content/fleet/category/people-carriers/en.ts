import type { CategoryCopy } from "@/content/types";

export const copy: CategoryCopy = {
  locale: "en",
  label: "People carriers",
  bestFor: "Groups, airport runs with lots of bags, and multi-hotel island days.",
  licence: "Standard car license for 7-seaters. Confirm any special notes on 9-seaters.",
  compare: "More seats than SUV. Book early in peak weeks for group arrivals.",
  seo: {
    title: "7 & 9 Seater Hire Paros Antiparos",
    description: "Rent people carriers on Paros and Antiparos. 7-seat and 9-seat options for groups with AGGELOS Rentals. Airport and port pickup.",
    keywords: [],
  },
  h1: "People Carriers for Groups",
  intro: "Space for friends and family without splitting into two cars. Ideal for airport arrivals and shared villa weeks.",
  cta: {
    primary: "Check availability",
    secondary: "View fleet",
    whatsapp: "WhatsApp us",
    call: "Call now",
  },
  sections: [
    {
      heading: "7-seater use",
      body: ["The usual sweet spot for families and small groups who still want manageable island driving."],
    },
    {
      heading: "9-seater notes",
      body: ["Nine-seat types may have different bookability and pricing. Check the live page or enquire if the online rate shows zero."],
    },
    {
      heading: "Pickup planning",
      body: ["Tell us flight or ferry times so we stage a larger vehicle without rush. Hotel delivery helps with heavy luggage."],
    },
  ],
  faqs: [
    { q: "Can I book a 9-seater online?", a: "Sometimes. If it is enquiry-only for your dates, message us and we confirm manually." },
    { q: "Child seats?", a: "Ask in advance so we can prepare. Availability depends on dates." },
    { q: "Better than two compacts?", a: "For one villa and shared plans, one people carrier is often simpler and cheaper than two cars." },
  ],
  related: [
    { to: "fleet-category/suvs", anchor: "SUV alternative · people-carriers" },
    { to: "money/paros-airport-rent-a-car-port", anchor: "Airport group pickup · people-carriers" },
    { to: "money/paros-rent-a-car", anchor: "Paros rental options · people-carriers" },
    { to: "contact/contact", anchor: "Ask about group needs · people-carriers" },
  ],
  finalCta: {
    heading: "Keep the group in one vehicle",
    sub: "Search 7-seat availability or enquire for 9-seat dates with our team.",
    button: "Search vehicles",
  },
};

export default copy;
