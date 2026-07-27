import type { CategoryCopy } from "@/content/types";

export const copy: CategoryCopy = {
  locale: "en",
  label: "Bicycles and e-bikes",
  bestFor: "Quiet cycling near the port and short coastal hops without a motorcycle license.",
  licence: "No car or motorcycle license required for standard bicycle hire.",
  compare: "Bikes for slow days. Scooters when you need more range and speed.",
  seo: {
    title: "Bike & E-Bike Hire Antiparos Paros",
    description: "Enquire for bicycles and e-bikes on Antiparos and Paros with AGGELOS Rentals. Quiet island exploring without a motorcycle license.",
    keywords: [],
  },
  h1: "Bicycles and E-Bikes on Enquiry",
  intro: "Slow travel days around the port and nearby coves. Online bike inventory is limited, so we confirm dates by enquiry.",
  cta: {
    primary: "Check availability",
    secondary: "View fleet",
    whatsapp: "WhatsApp us",
    call: "Call now",
  },
  sections: [
    {
      heading: "How booking works",
      body: ["Tell us your dates, heights, and whether you want pedal or e-assist. We confirm availability from the local stock."],
    },
    {
      heading: "Best routes",
      body: ["Short coastal loops near Antiparos Port and easy village rides. For longer dirt exploration, consider an ATV instead."],
    },
    {
      heading: "If bikes are full",
      body: ["Scooters and mini cars cover similar day plans with live online booking when bikes are unavailable."],
    },
  ],
  faqs: [
    { q: "Can I book bikes online?", a: "Usually by enquiry. Use the contact or WhatsApp channels with your dates." },
    { q: "E-bikes available?", a: "When stock allows. Ask when you enquire so we reserve the right type." },
    { q: "Helmets?", a: "We advise helmets and can discuss what is included for your booking." },
  ],
  related: [
    { to: "fleet-category/scooters", anchor: "Scooters ready to book · bikes" },
    { to: "fleet-category/mini", anchor: "Mini cars online · bikes" },
    { to: "contact/contact", anchor: "Enquire about bikes" },
    { to: "money/rent-a-car-antiparos-aggelos", anchor: "Antiparos rentals hub · bikes" },
  ],
  finalCta: {
    heading: "Ask us about bike dates",
    sub: "Message WhatsApp with your stay dates, or browse scooters and cars with live rates.",
    button: "Search vehicles",
  },
};

export default copy;
