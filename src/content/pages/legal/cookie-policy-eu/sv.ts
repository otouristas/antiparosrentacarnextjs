import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "sv",
  seo: {
    title: 'Cookiepolicy (EU) | AGGELOS Rentals',
    description: 'Hur AGGELOS Rentals använder cookies på antiparosrentacar.com och hur du hanterar preferenser för Paros och Antiparos.',
    keywords: [],
  },
  h1: 'Cookiepolicy (EU)',
  intro: 'Den här sidan förklarar vilka cookies och liknande tekniker AGGELOS Rentals använder på antiparosrentacar.com för besökare i Europeiska ekonomiska samarbetsområdet och Schweiz, och hur du styr dem.',
  cta: {
    primary: 'Sök fordon',
    secondary: 'Flotta',
    whatsapp: 'WhatsApp',
    call: 'Ring nu',
  },
  sections: [
    {
      heading: 'Vilka vi är',
      body: [
        'AGGELOS Rentals driver webbplatsen från Antiparos hamn, Kykladerna, Grekland. För integritetsfrågor om bokningar eller sajten: kontaktsidan, telefon eller WhatsApp.',
      ],
    },
    {
      heading: 'Vad cookies är',
      body: [
        'Cookies är små textfiler på din enhet. Liknande verktyg som lokal lagring kan spara preferenser. De hjälper sajten att minnas val och hålla grundfunktioner igång.',
      ],
    },
    {
      heading: 'Cookies på den här sajten',
      body: [
        'Den här Next.js-sajten är inte den gamla WordPress-installationen. Vi kör inte WordPress, Elementor eller annonsnätverk som Google AdSense här.',
      ],
      bullets: [
        'Nödvändiga: sparar ditt cookieval (Acceptera alla eller Endast nödvändiga) så att bannern inte syns vid varje besök.',
        'Nödvändiga: språk och bokningsfält kan sparas kort i webbläsaren.',
        'Valfria analys- eller marknadsföringscookies bara om du godkänner och verktygen är aktiva.',
      ],
    },
    {
      heading: 'Hantera cookies',
      body: [
        'Använd Acceptera alla eller Endast nödvändiga på bannern. Rensa webbplatsdata i webbläsaren återställer valet.',
      ],
    },
    {
      heading: 'Uppdateringar',
      body: [
        'Vi kan uppdatera policyn när lagar eller funktioner ändras. Versionen på denna URL gäller vid ditt besök eller din bokning.',
      ],
    },
    {
      heading: 'Kontakt',
      body: [
        'Frågor om cookies eller personuppgifter: Kontakt, +30 694 495 0094 eller WhatsApp. Ange bokningsreferens om du har en.',
      ],
    },
  ],
  faqs: [
    { q: 'Måste jag acceptera valfria cookies för att boka?', a: 'Nej. Nödvändiga cookies räcker för att surfa och starta en bokning.' },
    { q: 'Var sparas mitt val?', a: 'I webbläsarens lokala lagring under en AGGELOS-samtyckesnyckel.' },
    { q: 'Ersätter detta hyresavtalet?', a: 'Nej. Avtal och voucher vid upphämtning styr hyran. Sidan gäller endast webbplatscookies.' },
  ],
  related: [
    { to: 'legal/privacy-policy', anchor: 'Integritetspolicy' },
    { to: 'legal/terms-conditions', anchor: 'Villkor' },
    { to: 'contact/contact', anchor: 'Kontakta AGGELOS Rentals' },
    { to: 'home', anchor: 'Till startsidan' },
  ],
  finalCta: {
    heading: 'När du är redo',
    sub: 'Sök livepriser för Paros och Antiparos, eller fråga familjedisken.',
    button: 'Sök fordon',
  },
};

export default copy;
