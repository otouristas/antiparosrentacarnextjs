import type { PageCopy } from "@/content/types";

/**
 * legal/terms-conditions , fr
 *
 * Rental terms body is served from content/raw markdown (2026 edition).
 * This module holds locale-native SEO chrome and related links.
 */
export const copy: PageCopy = {
  locale: "fr",

  seo: {
    title: 'Conditions générales 2026 | AGGELOS Rentals',
    description: 'Conditions de location 2026 pour voitures, scooters et quads avec AGGELOS Rentals à Paros et Antiparos, cautions et annulation.',
    keywords: [],
  },

  h1: 'Conditions générales',
  intro: 'Veuillez lire attentivement nos conditions de location pour Antiparos, Paros et Le Pirée.',

  cta: {
    primary: 'Réserver un véhicule',
    secondary: "",
    whatsapp: 'WhatsApp',
    call: 'Nous appeler',
  },

  sections: [
    { heading: 'Champ d\'application', body: ['Ces conditions couvrent les réservations et locations AGGELOS Rentals à Paros, Antiparos et points de retrait liés.'] },
    { heading: 'Contrat au retrait', body: ['Le contrat et le bon remis à la prise en charge restent opposables pour caution, assurance et retour.'] },
    { heading: 'Questions', body: ['Contactez le bureau du port d\'Antiparos si une clause n\'est pas claire avant le retrait.'] },
  ],

  faqs: [
    { q: 'Les réservations sont-elles remboursables ?', a: 'Non. Toutes les réservations à Antiparos, Paros et au Pirée sont non remboursables.' },
    { q: "Quel est l'âge minimum du conducteur ?", a: '24 ans minimum, 26 ans pour les véhicules premium/luxe. Maximum 74 ans sans majoration.' },
    { q: 'Le kilométrage est-il illimité ?', a: 'Illimité à Antiparos et Paros. Au Pirée : 150 km/jour, au-delà facturé au km.' }
  ],

  related: [
    { to: 'money/paros-rent-a-car', anchor: 'Location de voiture à Paros' },
    { to: 'money/rent-a-car-antiparos-aggelos', anchor: 'Location de voiture à Antiparos' },
    { to: 'legal/privacy-policy', anchor: 'Politique de confidentialité' }
  ],

  finalCta: { heading: 'Prêt à louer ?', sub: 'Consultez les prix en direct pour vos dates.', button: 'Voir les prix' },
};

export default copy;
