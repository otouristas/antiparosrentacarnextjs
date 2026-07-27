import type { PageCopy } from "@/content/types";

/**
 * legal/terms-conditions , it
 *
 * Rental terms body is served from content/raw markdown (2026 edition).
 * This module holds locale-native SEO chrome and related links.
 */
export const copy: PageCopy = {
  locale: "it",

  seo: {
    title: 'Termini e condizioni 2026 | AGGELOS Rentals',
    description: 'Termini di noleggio 2026 per auto, scooter e ATV con AGGELOS Rentals a Paros e Antiparos, depositi e cancellazione.',
    keywords: [],
  },

  h1: 'Termini e condizioni',
  intro: 'Si prega di leggere attentamente le condizioni di noleggio per Antiparos, Paros e Pireo.',

  cta: {
    primary: "Prenota un'auto",
    secondary: "",
    whatsapp: 'WhatsApp',
    call: 'Chiamaci',
  },

  sections: [
    { heading: 'Ambito', body: ['Questi termini coprono prenotazioni e noleggio con AGGELOS Rentals a Paros, Antiparos e punti di ritiro collegati.'] },
    { heading: 'Contratto al ritiro', body: ['Il contratto e il voucher alla consegna restano vincolanti per deposito, assicurazione e reso.'] },
    { heading: 'Domande', body: ['Contatta l\'ufficio al porto di Antiparos se una clausola non è chiara prima del ritiro.'] },
  ],

  faqs: [
    { q: 'Le prenotazioni sono rimborsabili?', a: 'No. Tutte le prenotazioni per Antiparos, Paros e Pireo non sono rimborsabili.' },
    { q: "Qual è l'età minima del conducente?", a: '24 anni, o 26 per auto premium/luxury. Massimo 74 senza supplemento.' },
    { q: 'Il chilometraggio è illimitato?', a: 'Illimitato ad Antiparos e Paros. Al Pireo: 150 km/giorno.' }
  ],

  related: [
    { to: 'money/paros-rent-a-car', anchor: 'Noleggio auto a Paros' },
    { to: 'money/rent-a-car-antiparos-aggelos', anchor: 'Noleggio auto ad Antiparos' },
    { to: 'legal/privacy-policy', anchor: 'Informativa sulla privacy' }
  ],

  finalCta: { heading: 'Pronto a noleggiare?', sub: 'Consulta i prezzi in tempo reale per le tue date.', button: 'Cerca prezzi' },
};

export default copy;
