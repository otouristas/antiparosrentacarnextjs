import type { PageCopy } from "@/content/types";

/**
 * legal/terms-conditions , de
 *
 * Rental terms body is served from content/raw markdown (2026 edition).
 * This module holds locale-native SEO chrome and related links.
 */
export const copy: PageCopy = {
  locale: "de",

  seo: {
    title: 'AGB 2026 | AGGELOS Rentals',
    description: 'Mietbedingungen 2026 für Autos, Roller und ATVs bei AGGELOS Rentals auf Paros und Antiparos, Kaution und Stornierung.',
    keywords: [],
  },

  h1: 'Allgemeine Geschäftsbedingungen',
  intro: 'Bitte lesen Sie unsere Mietbedingungen für Antiparos, Paros und Piräus sorgfältig.',

  cta: {
    primary: 'Fahrzeug buchen',
    secondary: "",
    whatsapp: 'WhatsApp',
    call: 'Anrufen',
  },

  sections: [
    { heading: 'Geltungsbereich', body: ['Diese Bedingungen gelten für Buchungen und Vermietung bei AGGELOS Rentals auf Paros, Antiparos und zugehörigen Abholpunkten.'] },
    { heading: 'Vertrag bei Übergabe', body: ['Vertrag und Voucher bei der Übergabe bleiben verbindlich für Kaution, Versicherung und Rückgabe.'] },
    { heading: 'Fragen', body: ['Kontaktieren Sie das Büro am Hafen von Antiparos, wenn eine Klausel vor der Abholung unklar ist.'] },
  ],

  faqs: [
    { q: 'Sind Buchungen erstattungsfähig?', a: 'Nein. Alle Reservierungen für Antiparos, Paros und Piräus sind nicht erstattungsfähig.' },
    { q: 'Wie alt muss der Fahrer mindestens sein?', a: 'Mindestalter 24, bei Premium-/Luxuswagen 26. Höchstalter 74 ohne Zuschlag.' },
    { q: 'Gibt es unbegrenzte Kilometer?', a: 'Unbegrenzt auf Antiparos und Paros. In Piräus: 150 km/Tag.' }
  ],

  related: [
    { to: 'money/paros-rent-a-car', anchor: 'Autovermietung Paros' },
    { to: 'money/rent-a-car-antiparos-aggelos', anchor: 'Autovermietung Antiparos' },
    { to: 'legal/privacy-policy', anchor: 'Datenschutzrichtlinie' }
  ],

  finalCta: { heading: 'Bereit zu mieten?', sub: 'Live-Preise für Ihre Reisedaten prüfen.', button: 'Preise suchen' },
};

export default copy;
