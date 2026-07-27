import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "fr",
  seo: {
    title: 'Politique de confidentialité | AGGELOS Rentals',
    description: 'Comment AGGELOS Rentals traite les données personnelles pour les réservations et le site sur Paros et Antiparos, et comment exercer vos droits.',
    keywords: [],
  },
  h1: 'Politique de confidentialité',
  intro: 'Cette politique explique comment AGGELOS Rentals traite les données personnelles lorsque vous parcourez antiparosrentacar.com, demandez un devis ou réservez un véhicule pour Paros et Antiparos.',
  cta: {
    primary: 'Contact',
    secondary: 'Cookies',
    whatsapp: 'WhatsApp',
    call: 'Appeler',
  },
  sections: [
    {
      heading: 'Responsable',
      body: [
        'AGGELOS Rentals, Port d\'Antiparos, 840 07 Antiparos, Cyclades, Grèce. Contact: aggelos@antiparosrentacar.com, +30 694 495 0094 ou WhatsApp.',
      ],
    },
    {
      heading: 'Données collectées',
      body: [
        'Selon l\'usage, nous pouvons traiter:',
      ],
      bullets: [
        'Coordonnées saisies dans les formulaires ou le chat.',
        'Détails de réservation: lieux, dates, tranche d\'âge, préférences véhicule.',
        'Données techniques pour le site et le choix cookies.',
        'Messages liés à la location.',
      ],
    },
    {
      heading: 'Finalités',
      body: [
        'Répondre, gérer les réservations, livrer les véhicules, obligations comptables, fiabilité du site et analyses limitées après consentement.',
      ],
    },
    {
      heading: 'Bases légales',
      body: [
        'Contrat et démarches précontractuelles. Intérêt légitime pour la sécurité. Consentement pour cookies optionnels ou marketing. Obligation légale pour les factures en Grèce.',
      ],
    },
    {
      heading: 'Partage',
      body: [
        'Uniquement avec des prestataires nécessaires comme GoCars, l\'hébergement et la messagerie. Pas de vente de données.',
      ],
    },
    {
      heading: 'Conservation',
      body: [
        'Demandes aussi longtemps que nécessaire. Archives comptables selon les délais grecs. Choix cookies jusqu\'à effacement des données du site.',
      ],
    },
    {
      heading: 'Vos droits',
      body: [
        'Accès, rectification, effacement, limitation, portabilité ou opposition, et plainte auprès de l\'autorité grecque de protection des données.',
      ],
    },
    {
      heading: 'Cookies',
      body: [
        'Stockage essentiel pour la langue et le choix cookies. Outils optionnels seulement après acceptation. Voir la politique cookies (UE).',
      ],
    },
    {
      heading: 'Mises à jour',
      body: [
        'Nous pouvons mettre à jour cette politique. La version sur cette URL s\'applique.',
      ],
    },
  ],
  faqs: [
    { q: 'Qui voit ma réservation?', a: 'Le bureau AGGELOS et les systèmes nécessaires à la confirmation et à la remise.' },
    { q: 'Puis-je supprimer une demande?', a: 'Oui via contact. Nous effaçons ou limitons ce qui n\'est pas requis pour une réservation active ou une obligation légale.' },
    { q: 'Envoyez-vous des e-mails marketing?', a: 'Seulement avec consentement. Les messages opérationnels de réservation ne sont pas du marketing.' },
  ],
  related: [
    { to: 'legal/cookie-policy-eu', anchor: 'Politique cookies' },
    { to: 'legal/terms-conditions', anchor: 'Conditions' },
    { to: 'contact/contact', anchor: 'Contact' },
    { to: 'contact/about-us', anchor: 'À propos' },
  ],
  finalCta: {
    heading: 'Questions sur vos données?',
    sub: 'Écrivez au bureau du port d\'Antiparos.',
    button: 'Nous contacter',
  },
};

export default copy;
