import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "sv",
  seo: {
    title: 'Integritetspolicy | AGGELOS Rentals',
    description: 'Hur AGGELOS Rentals behandlar personuppgifter för bokningar och webbplatsen på Paros och Antiparos, och hur du utövar dina rättigheter.',
    keywords: [],
  },
  h1: 'Integritetspolicy',
  intro: 'Denna policy förklarar hur AGGELOS Rentals behandlar personuppgifter när du besöker antiparosrentacar.com, ber om offert eller bokar fordon för Paros och Antiparos.',
  cta: {
    primary: 'Kontakt',
    secondary: 'Cookies',
    whatsapp: 'WhatsApp',
    call: 'Ring',
  },
  sections: [
    {
      heading: 'Personuppgiftsansvarig',
      body: [
        'AGGELOS Rentals, Antiparos hamn, 840 07 Antiparos, Kykladerna, Grekland. Kontakt: aggelos@antiparosrentacar.com, +30 694 495 0094 eller WhatsApp.',
      ],
    },
    {
      heading: 'Vilka uppgifter',
      body: [
        'Beroende på användning kan vi behandla:',
      ],
      bullets: [
        'Kontaktuppgifter via formulär eller chatt.',
        'Bokningsuppgifter: platser, datum, åldersgrupp, önskemål.',
        'Tekniska uppgifter för sajten och cookieval.',
        'Meddelanden om hyran.',
      ],
    },
    {
      heading: 'Ändamål',
      body: [
        'Svara, hantera bokningar, lämna ut fordon, lagkrav, sajtsäkerhet och begränsad analys efter samtycke.',
      ],
    },
    {
      heading: 'Rättslig grund',
      body: [
        'Avtal och förberedande steg. Berättigat intresse för säkerhet. Samtycke för valfria cookies eller marknadsföring. Rättslig skyldighet för fakturor i Grekland.',
      ],
    },
    {
      heading: 'Delning',
      body: [
        'Endast med nödvändiga leverantörer som GoCars, hosting och meddelanden. Ingen försäljning av uppgifter.',
      ],
    },
    {
      heading: 'Lagring',
      body: [
        'Förfrågningar så länge det behövs. Bokföring enligt grekiska tidsfrister. Cookieval tills webbplatsdata rensas.',
      ],
    },
    {
      heading: 'Dina rättigheter',
      body: [
        'Tillgång, rättelse, radering, begränsning, portabilitet eller invändning, och klagomål till grekisk myndighet.',
      ],
    },
    {
      heading: 'Cookies',
      body: [
        'Nödvändig lagring för språk och cookieval. Valfria verktyg bara efter godkännande. Se cookiepolicyn (EU).',
      ],
    },
    {
      heading: 'Uppdateringar',
      body: [
        'Vi kan uppdatera policyn. Versionen på denna URL gäller.',
      ],
    },
  ],
  faqs: [
    { q: 'Vem ser min bokning?', a: 'AGGELOS-disken och system som behövs för bekräftelse och utlämning.' },
    { q: 'Kan jag radera en förfrågan?', a: 'Ja via kontakt. Vi raderar eller begränsar det som inte behövs för aktiv bokning eller lagkrav.' },
    { q: 'Skickar ni marknadsföring?', a: 'Bara med samtycke. Operativa bokningsmeddelanden är inte marknadsföring.' },
  ],
  related: [
    { to: 'legal/cookie-policy-eu', anchor: 'Cookiepolicy' },
    { to: 'legal/terms-conditions', anchor: 'Villkor' },
    { to: 'contact/contact', anchor: 'Kontakt' },
    { to: 'contact/about-us', anchor: 'Om oss' },
  ],
  finalCta: {
    heading: 'Frågor om dina uppgifter?',
    sub: 'Skriv till disken i Antiparos hamn.',
    button: 'Kontakta oss',
  },
};

export default copy;
