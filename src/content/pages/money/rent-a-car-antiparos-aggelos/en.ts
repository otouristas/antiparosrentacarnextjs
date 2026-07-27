import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "en",
  seo: {
    title: "Antiparos Rent a Car | Cars, ATVs & Scooters",
    description: "Explore Antiparos with our reliable car rentals. Offering a range of vehicles including ATVs, scooters, and SUVs for your island adventures.",
    keywords: [],
  },
  h1: "Antiparos Rent a Car at the Port",
  intro: "The rental desk headquartered on Antiparos. Meet us at the port for cars, scooters, ATVs and bikes, then reach every beach without waiting on buses.",
  cta: {
    primary: "Book Antiparos rental",
    secondary: "View fleet",
    whatsapp: "WhatsApp us",
    call: "Call now",
  },
  sections: [
    {
      heading: "Island-specific rental overview",
      body: ["Antiparos is compact but spread out. Beaches, tavernas, and sunset spots sit beyond comfortable walking distance from the port once bags are involved.", "As a local operator since 1994, we size recommendations to how you travel: couples, families, or scooter-only weekends."],
    },
    {
      heading: "Who needs a car on Antiparos",
      body: ["Stay outside the main village, travel with kids, or plan daily beach hopping? A car or ATV pays for itself on day one. Hotel in town and mostly walking? A scooter or e-bike may be enough."],
    },
    {
      heading: "Pickup and delivery",
      body: ["Primary meeting point: Antiparos Port, steps from the ferry. Hotel and villa delivery across the island is available. Select it in the booking form."],
    },
  ],
  faqs: [
    { q: "Where is your Antiparos office?", a: "At Antiparos Port, easy to find as you leave the ferry." },
    { q: "Can I pick up on Paros and drop on Antiparos?", a: "Yes. One-way rentals between the islands are a core part of how we work." },
    { q: "Do you rent scooters and ATVs as well as cars?", a: "Yes: cars, scooters, ATVs and buggies, and bicycles from the same local fleet." },
  ],
  related: [
    { to: "money/paros-rent-a-car", anchor: "Paros car rental · rent-a-car-antipar" },
    { to: "money/antiparos-scooter-rentals", anchor: "Scooter rentals on Antiparos · rent-a-car-antipar" },
    { to: "money/atvs-antiparos", anchor: "ATV and quad rentals · rent-a-car-antipar" },
    { to: "fleet", anchor: "Browse the full fleet · rent-a-car-antipar" },
  ],
  finalCta: {
    heading: "Land on Antiparos ready to drive",
    sub: "Ferry in, grab the keys at the port, and be at Soros or Agios Georgios while others wait for taxis.",
    button: "Search vehicles",
  },
};

export default copy;
