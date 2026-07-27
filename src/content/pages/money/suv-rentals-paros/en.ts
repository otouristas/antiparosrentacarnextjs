import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "en",
  seo: {
    title: "SUV Rentals Paros | Jeep & Mercedes | AGGELOS",
    description: "Rent a premium SUV in Paros with AGGELOS Rentals. Top models like the Mercedes-Benz GLB and Jeep Renegade. Book your SUV online today!",
    keywords: [],
  },
  h1: "SUV Rentals on Paros",
  intro: "Rent an SUV or jeep on Paros for families, luggage, and rougher approaches to east-coast beaches.",
  cta: {
    primary: "Book an SUV",
    secondary: "View fleet",
    whatsapp: "WhatsApp us",
    call: "Call now",
  },
  sections: [
    {
      heading: "Best for Paros",
      body: ["Families, golf bags, multiple suitcases, or daily drives that mix asphalt with uneven beach parking."],
    },
    {
      heading: "Airport and port",
      body: ["SUV category is available for Paros Airport and Parikia pickup when inventory allows. Book early for July and August."],
    },
    {
      heading: "SUV versus compact",
      body: ["Compacts win in tight Naoussa streets. SUVs win for height, luggage, and confidence on uneven tracks. Tell us your hotels and we will advise."],
    },
  ],
  faqs: [
    { q: "Are SUVs available at the airport?", a: "Yes when inventory allows. Book early in peak summer." },
    { q: "Do I need a special license?", a: "A standard car license covers our SUVs and most 4x4s." },
    { q: "Automatic SUVs available?", a: "Yes. Filter for automatic when you search live availability." },
  ],
  related: [
    { to: "money/paros-rent-a-car", anchor: "Paros rent a car · suv-rentals-paros" },
    { to: "fleet-category/suvs", anchor: "SUV and 4x4 fleet · suv-rentals-paros" },
    { to: "money/paros-airport-rent-a-car-port", anchor: "Airport SUV pickup · suv-rentals-paros" },
    { to: "fleet-category/people-carriers", anchor: "Need 7 or 9 seats · suv-rentals-paros" },
  ],
  finalCta: {
    heading: "More room. More roads.",
    sub: "Airport or port pickup available. Select SUV category when you search.",
    button: "Search vehicles",
  },
};

export default copy;
