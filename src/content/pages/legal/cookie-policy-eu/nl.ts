import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "nl",
  seo: {
    title: 'Cookiebeleid (EU) | AGGELOS Rentals',
    description: 'Hoe AGGELOS Rentals cookies gebruikt op antiparosrentacar.com en hoe u voorkeuren beheert voor Paros en Antiparos.',
    keywords: [],
  },
  h1: 'Cookiebeleid (EU)',
  intro: 'Deze pagina legt uit welke cookies en vergelijkbare technologieën AGGELOS Rentals gebruikt op antiparosrentacar.com voor bezoekers in de Europese Economische Ruimte en Zwitserland, en hoe u ze beheert.',
  cta: {
    primary: 'Voertuigen zoeken',
    secondary: 'Vloot',
    whatsapp: 'WhatsApp',
    call: 'Bel nu',
  },
  sections: [
    {
      heading: 'Wie wij zijn',
      body: [
        'AGGELOS Rentals beheert deze website vanaf de haven van Antiparos, Cycladen, Griekenland. Voor privacyvragen over boekingen of de site: contactpagina, telefoon of WhatsApp.',
      ],
    },
    {
      heading: 'Wat cookies zijn',
      body: [
        'Cookies zijn kleine tekstbestanden op uw apparaat. Vergelijkbare middelen zoals local storage bewaren voorkeuren. Ze helpen de site keuzes te onthouden en basisfuncties te laten werken.',
      ],
    },
    {
      heading: 'Cookies op deze site',
      body: [
        'Deze Next.js-site is niet de oude WordPress-installatie. We draaien hier geen WordPress, Elementor of advertentienetwerken zoals Google AdSense.',
      ],
      bullets: [
        'Essentieel: slaat uw cookiekeuze op (Alles accepteren of Alleen essentieel) zodat de banner niet bij elk bezoek terugkomt.',
        'Essentieel: taal en boekingsvelden kunnen kort in de browser blijven.',
        'Optionele analyse- of marketingcookies alleen als u akkoord gaat en die tools actief zijn.',
      ],
    },
    {
      heading: 'Cookies beheren',
      body: [
        'Gebruik Alles accepteren of Alleen essentieel op de banner. Sitesgegevens wissen in de browser reset de keuze.',
      ],
    },
    {
      heading: 'Updates',
      body: [
        'We kunnen dit beleid bijwerken als wetten of functies veranderen. De versie op deze URL geldt op de datum van uw bezoek of boeking.',
      ],
    },
    {
      heading: 'Contact',
      body: [
        'Vragen over cookies of persoonsgegevens: Contact, +30 694 495 0094 of WhatsApp. Vermeld uw boekingsreferentie indien aanwezig.',
      ],
    },
  ],
  faqs: [
    { q: 'Moet ik optionele cookies accepteren om te boeken?', a: 'Nee. Essentiële cookies volstaan om te bladeren en een boeking te starten.' },
    { q: 'Waar wordt mijn keuze opgeslagen?', a: 'In de local storage van de browser onder een AGGELOS-toestemmingssleutel.' },
    { q: 'Vervangt dit het huurcontract?', a: 'Nee. Contract en voucher bij ophalen regelen de verhuur. Deze pagina gaat alleen over websitecookies.' },
  ],
  related: [
    { to: 'legal/privacy-policy', anchor: 'Privacybeleid' },
    { to: 'legal/terms-conditions', anchor: 'Algemene voorwaarden' },
    { to: 'contact/contact', anchor: 'Neem contact op met AGGELOS Rentals' },
    { to: 'home', anchor: 'Terug naar home' },
  ],
  finalCta: {
    heading: 'Wanneer u klaar bent',
    sub: 'Zoek live prijzen voor Paros en Antiparos, of stel een vraag aan de familiedesk.',
    button: 'Voertuigen zoeken',
  },
};

export default copy;
