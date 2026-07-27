import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "en",
  seo: {
    title: 'Cookie Policy (EU) | AGGELOS Rentals',
    description: 'How AGGELOS Rentals uses cookies on antiparosrentacar.com and how you manage preferences for Paros and Antiparos bookings.',
    keywords: [],
  },
  h1: 'Cookie Policy (EU)',
  intro: 'This page explains which cookies and similar technologies AGGELOS Rentals uses on antiparosrentacar.com for visitors in the European Economic Area and Switzerland, and how you can control them.',
  cta: {
    primary: 'Search vehicles',
    secondary: 'View fleet',
    whatsapp: 'WhatsApp us',
    call: 'Call now',
  },
  sections: [
    {
      heading: 'Who we are',
      body: [
        'AGGELOS Rentals operates this website from Antiparos Port, Cyclades, Greece. For privacy questions related to bookings or the site, contact us via the contact page, phone, or WhatsApp listed on every page.',
      ],
    },
    {
      heading: 'What cookies are',
      body: [
        'Cookies are small text files stored on your device when you visit a website. Similar tools such as local storage can hold the same kinds of preferences. They help the site remember choices and keep basic features working.',
      ],
    },
    {
      heading: 'Cookies we use on this site',
      body: [
        'This Next.js website is not the old WordPress installation. We do not run WordPress, Elementor, or advertising networks such as Google AdSense on these pages.',
      ],
      bullets: [
        'Essential: stores your cookie choice (Accept all or Essential only) in local storage so the banner does not reappear on every visit.',
        'Essential: language and booking search fields may be kept briefly in the browser so forms stay usable while you compare vehicles.',
        'Optional analytics or marketing cookies are only used if you accept them and if those tools are enabled for your visit.',
      ],
    },
    {
      heading: 'How to manage cookies',
      body: [
        'Use Accept all or Essential only on the cookie banner. You can also clear site data in your browser settings to reset the choice and see the banner again. Blocking all cookies in the browser may limit booking forms or language memory.',
      ],
    },
    {
      heading: 'Updates',
      body: [
        'We may update this policy when laws or site features change. The version published on this URL is the reference for the date you visit or book.',
      ],
    },
    {
      heading: 'Contact',
      body: [
        'Questions about cookies or personal data: use Contact, call +30 694 495 0094, or message us on WhatsApp. Mention your booking reference if you already have one.',
      ],
    },
  ],
  faqs: [
    { q: 'Do I have to accept optional cookies to book?', a: 'No. Essential cookies are enough to browse and start a booking. Optional tools only run if you accept them.' },
    { q: 'Where is my cookie choice stored?', a: 'In your browser local storage under a site key for AGGELOS Rentals consent. Clearing site data removes it.' },
    { q: 'Is this the same as the rental contract?', a: 'No. The rental agreement and voucher at pickup govern the vehicle hire. This page covers website cookies only.' },
  ],
  related: [
    { to: 'legal/privacy-policy', anchor: 'Privacy policy' },
    { to: 'legal/terms-conditions', anchor: 'Terms and conditions' },
    { to: 'contact/contact', anchor: 'Contact AGGELOS Rentals' },
    { to: 'home', anchor: 'Back to homepage' },
  ],
  finalCta: {
    heading: 'Ready when you are',
    sub: 'Search live prices for Paros and Antiparos, or ask the family desk any cookie or booking question.',
    button: 'Search vehicles',
  },
};

export default copy;
