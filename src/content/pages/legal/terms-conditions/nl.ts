import type { PageCopy } from "@/content/types";

/**
 * legal/terms-conditions , nl
 *
 * Rental terms body is served from content/raw markdown (2026 edition).
 * This module holds locale-native SEO chrome and related links.
 */
export const copy: PageCopy = {
  locale: "nl",

  seo: {
    title: 'Algemene voorwaarden 2026 | AGGELOS Rentals',
    description: "Huurvoorwaarden 2026 voor auto's, scooters en ATV's bij AGGELOS Rentals op Paros en Antiparos, borg en annulering.",
    keywords: [],
  },

  h1: 'Algemene voorwaarden',
  intro: 'Lees zorgvuldig onze huurvoorwaarden voor Antiparos, Paros en Piraeus.',

  cta: {
    primary: 'Auto boeken',
    secondary: "",
    whatsapp: 'WhatsApp',
    call: 'Bel ons',
  },

  sections: [
    { heading: 'Toepassingsgebied', body: ['Deze voorwaarden dekken boekingen en verhuur bij AGGELOS Rentals op Paros, Antiparos en gerelateerde ophaalpunten.'] },
    { heading: 'Contract bij ophalen', body: ['Het contract en de voucher bij overdracht blijven bindend voor borg, verzekering en inlevering.'] },
    { heading: 'Vragen', body: ['Neem contact op met het kantoor in de haven van Antiparos als een clausule onduidelijk is vóór ophalen.'] },
  ],

  faqs: [
    { q: 'Zijn boekingen restitueerbaar?', a: 'Nee. Alle reserveringen voor Antiparos, Paros en Piraeus zijn niet-restitueerbaar.' },
    { q: 'Wat is de minimumleeftijd van de bestuurder?', a: 'Minimaal 24, of 26 voor premium/luxe. Maximaal 74 zonder toeslag.' },
    { q: 'Is de kilometerstand onbeperkt?', a: 'Onbeperkt op Antiparos en Paros. In Piraeus: 150 km/dag.' }
  ],

  related: [
    { to: 'money/paros-rent-a-car', anchor: 'Autoverhuur Paros' },
    { to: 'money/rent-a-car-antiparos-aggelos', anchor: 'Autoverhuur Antiparos' },
    { to: 'legal/privacy-policy', anchor: 'Privacybeleid' }
  ],

  finalCta: { heading: 'Klaar om te huren?', sub: 'Bekijk live prijzen voor uw data.', button: 'Prijzen zoeken' },
};

export default copy;
