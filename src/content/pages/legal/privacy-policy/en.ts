import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "en",
  seo: {
    title: 'Privacy Policy | AGGELOS Rentals',
    description: 'How AGGELOS Rentals collects and uses personal data for bookings and website use on Paros and Antiparos, and how you can contact us about your rights.',
    keywords: [],
  },
  h1: 'Privacy Policy',
  intro: 'This policy explains how AGGELOS Rentals processes personal data when you browse antiparosrentacar.com, request a quote, or book a vehicle for Paros and Antiparos.',
  cta: {
    primary: 'Contact us',
    secondary: 'Cookie policy',
    whatsapp: 'WhatsApp us',
    call: 'Call now',
  },
  sections: [
    {
      heading: 'Controller',
      body: [
        'AGGELOS Rentals, Antiparos Port, 840 07 Antiparos, Cyclades, Greece, is the controller for personal data collected through this website and related booking communications. Contact: aggelos@antiparosrentacar.com, +30 694 495 0094, or WhatsApp.',
      ],
    },
    {
      heading: 'What we collect',
      body: [
        'Depending on how you use the site, we may process:',
      ],
      bullets: [
        'Identity and contact details you submit in forms or chat: name, email, phone, message content.',
        'Booking details: pickup and return locations, dates, times, age group, vehicle preferences, and voucher references.',
        'Technical data needed to run the site: IP address, browser type, language, and essential consent preferences stored locally.',
        'Communications you send by phone, email, or WhatsApp about a rental.',
      ],
    },
    {
      heading: 'Why we use data',
      body: [
        'We process data to respond to enquiries, create and manage bookings, deliver vehicles, meet legal accounting and tax duties, improve site reliability, and, where allowed, measure limited analytics after consent.',
      ],
    },
    {
      heading: 'Legal bases',
      body: [
        'Contract and pre-contract steps for quotes and rentals. Legitimate interests for securing the site and answering general questions. Consent where required for optional cookies or marketing messages. Legal obligation for invoices and retention rules that apply in Greece.',
      ],
    },
    {
      heading: 'Sharing',
      body: [
        'We share data only with providers needed to run the service, such as our GoCars booking platform, hosting, email or messaging tools, and payment partners when used. We do not sell personal data. Some providers may process data outside the EEA under appropriate safeguards.',
      ],
    },
    {
      heading: 'Retention',
      body: [
        'Enquiry messages are kept as long as needed to resolve your request. Booking and accounting records follow Greek commercial retention periods. Cookie consent choices remain in your browser until you clear site data.',
      ],
    },
    {
      heading: 'Your rights',
      body: [
        'Under GDPR you may request access, rectification, erasure, restriction, portability, or objection where applicable, and you may withdraw consent at any time for optional processing. You can lodge a complaint with the Hellenic Data Protection Authority. To exercise rights, contact us with enough detail to locate your request.',
      ],
    },
    {
      heading: 'Cookies',
      body: [
        'Essential storage remembers language and your cookie choice. Optional tools run only if you accept them. Details are in our Cookie Policy (EU).',
      ],
    },
    {
      heading: 'Updates',
      body: [
        'We may update this policy when laws or systems change. The version on this URL applies on the date you visit or book.',
      ],
    },
  ],
  faqs: [
    { q: 'Who sees my booking details?', a: 'The AGGELOS Rentals desk and systems required to confirm and deliver the rental, not unrelated advertisers.' },
    { q: 'Can I delete my enquiry?', a: 'Yes. Ask via contact, phone, or WhatsApp. We will erase or restrict data that is not needed for a live booking or legal retention.' },
    { q: 'Do you send marketing emails?', a: 'Only if you ask for updates or otherwise consent. Operational messages about your booking are not marketing.' },
  ],
  related: [
    { to: 'legal/cookie-policy-eu', anchor: 'Cookie policy' },
    { to: 'legal/terms-conditions', anchor: 'Terms and conditions' },
    { to: 'contact/contact', anchor: 'Contact AGGELOS Rentals' },
    { to: 'contact/about-us', anchor: 'About the family desk' },
  ],
  finalCta: {
    heading: 'Questions about your data?',
    sub: 'Write to the Antiparos Port desk and we will reply with a clear answer.',
    button: 'Contact us',
  },
};

export default copy;
