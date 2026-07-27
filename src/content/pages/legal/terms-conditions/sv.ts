import type { PageCopy } from "@/content/types";

/**
 * legal/terms-conditions , sv
 *
 * Rental terms body is served from content/raw markdown (2026 edition).
 * This module holds locale-native SEO chrome and related links.
 */
export const copy: PageCopy = {
  locale: "sv",

  seo: {
    title: 'Villkor 2026 | AGGELOS Rentals',
    description: 'Hyresvillkor 2026 för bilar, scootrar och ATV hos AGGELOS Rentals på Paros och Antiparos, deposition och avbokning.',
    keywords: [],
  },

  h1: 'Villkor',
  intro: 'Läs noga våra hyrvillkor för Antiparos, Paros och Pireus.',

  cta: {
    primary: 'Boka bil',
    secondary: "",
    whatsapp: 'WhatsApp',
    call: 'Ring oss',
  },

  sections: [
    { heading: 'Tillämpning', body: ['Dessa villkor gäller bokningar och uthyrning hos AGGELOS Rentals på Paros, Antiparos och relaterade upphämtningsplatser.'] },
    { heading: 'Avtal vid utlämning', body: ['Avtal och voucher vid överlämning förblir bindande för deposition, försäkring och återlämning.'] },
    { heading: 'Frågor', body: ['Kontakta kontoret i Antiparos hamn om någon klausul är oklar före upphämtning.'] },
  ],

  faqs: [
    { q: 'Är bokningar återbetalningsbara?', a: 'Nej. Alla reservationer för Antiparos, Paros och Pireus är icke-återbetalningsbara.' },
    { q: 'Vad är lägsta ålder för förare?', a: 'Minst 24 år, eller 26 för premium/lyxbilar. Max 74 utan tillägg.' },
    { q: 'Är miltalet obegränsat?', a: 'Obegränsat på Antiparos och Paros. I Pireus: 150 km/dag.' }
  ],

  related: [
    { to: 'money/paros-rent-a-car', anchor: 'Biluthyrning Paros' },
    { to: 'money/rent-a-car-antiparos-aggelos', anchor: 'Biluthyrning Antiparos' },
    { to: 'legal/privacy-policy', anchor: 'Integritetspolicy' }
  ],

  finalCta: { heading: 'Redo att hyra?', sub: 'Se livepriser för dina datum.', button: 'Sök priser' },
};

export default copy;
