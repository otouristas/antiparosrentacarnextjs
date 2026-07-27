import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "en",
  seo: {
    title: 'About AGGELOS Rentals | Since 1994',
    description: 'AGGELOS Rentals is a family vehicle desk at Antiparos Port since 1994. Cars, scooters, ATVs and bikes for Paros and Antiparos with local pickup.',
    keywords: [],
  },
  h1: 'About AGGELOS Rentals',
  intro: 'A family-run rental desk headquartered at Antiparos Port. We have helped travellers explore Paros and Antiparos since 1994.',
  cta: {
    primary: 'Search vehicles',
    secondary: 'Contact us',
    whatsapp: 'WhatsApp us',
    call: 'Call now',
  },
  sections: [
    {
      heading: 'Local since 1994',
      body: [
        'We live the ferry timetable, the August parking puzzle, and the quiet shoulder-season roads. That knowledge shapes every handover at the port and across Paros.',
      ],
    },
    {
      heading: 'What we rent',
      body: [
        'Cars from mini to SUV, convertibles, people carriers, scooters, ATVs and buggies, plus bikes on enquiry. Live inventory powers online search for your dates.',
      ],
    },
    {
      heading: 'How we work',
      body: [
        'Book online, meet at an agreed point, and reach a real person on WhatsApp when plans change. Clear prices, no mystery extras at the keys.',
      ],
    },
    {
      heading: 'Where we meet you',
      body: [
        'Antiparos Port is home base. We also arrange Paros Airport, Parikia port, and selected hotels or villas when the booking allows.',
      ],
    },
  ],
  faqs: [
    { q: 'Where is your main office?', a: 'Antiparos Port, Cyclades, Greece.' },
    { q: 'Do you serve Paros as well?', a: 'Yes. Airport, Parikia port, and selected hotels on Paros.' },
    { q: 'Is AGGELOS Rentals the brand name?', a: 'Yes. Always AGGELOS Rentals in every language.' },
  ],
  related: [
    { to: 'contact/contact', anchor: 'Contact the Antiparos desk' },
    { to: 'money/rent-a-car-antiparos-aggelos', anchor: 'Antiparos car rental' },
    { to: 'money/paros-rent-a-car', anchor: 'Paros car rental' },
    { to: 'home', anchor: 'Back to homepage' },
  ],
  finalCta: {
    heading: 'Talk to a local desk',
    sub: 'Call, WhatsApp, or send the contact form with your dates and pickup point.',
    button: 'Search vehicles',
  },
};

export default copy;
