import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "fr",
  seo: {
    title: 'Politique cookies (UE) | AGGELOS Rentals',
    description: 'Comment AGGELOS Rentals utilise les cookies sur antiparosrentacar.com et comment gérer vos préférences pour Paros et Antiparos.',
    keywords: [],
  },
  h1: 'Politique cookies (UE)',
  intro: 'Cette page explique quels cookies et technologies similaires AGGELOS Rentals utilise sur antiparosrentacar.com pour les visiteurs de l\'Espace économique européen et de la Suisse, et comment les contrôler.',
  cta: {
    primary: 'Chercher des véhicules',
    secondary: 'Flotte',
    whatsapp: 'WhatsApp',
    call: 'Appeler',
  },
  sections: [
    {
      heading: 'Qui nous sommes',
      body: [
        'AGGELOS Rentals exploite ce site depuis le port d\'Antiparos, Cyclades, Grèce. Pour les questions de confidentialité liées aux réservations ou au site, contactez-nous via la page contact, le téléphone ou WhatsApp.',
      ],
    },
    {
      heading: 'Que sont les cookies',
      body: [
        'Les cookies sont de petits fichiers texte stockés sur votre appareil. Des outils proches comme le stockage local peuvent garder des préférences. Ils aident le site à mémoriser des choix et à faire fonctionner l\'essentiel.',
      ],
    },
    {
      heading: 'Cookies utilisés sur ce site',
      body: [
        'Ce site Next.js n\'est pas l\'ancienne installation WordPress. Nous n\'y faisons pas tourner WordPress, Elementor ni des réseaux publicitaires comme Google AdSense.',
      ],
      bullets: [
        'Essentiels: enregistrent votre choix (Tout accepter ou Essentiels seulement) pour que la bannière ne revienne pas à chaque visite.',
        'Essentiels: la langue et les champs de recherche de réservation peuvent être gardés brièvement dans le navigateur.',
        'Cookies d\'analyse ou marketing optionnels uniquement si vous acceptez et si ces outils sont actifs.',
      ],
    },
    {
      heading: 'Gérer les cookies',
      body: [
        'Utilisez Tout accepter ou Essentiels seulement sur la bannière. Effacer les données du site dans le navigateur réaffiche la bannière.',
      ],
    },
    {
      heading: 'Mises à jour',
      body: [
        'Nous pouvons mettre à jour cette politique si la loi ou les fonctions changent. La version sur cette URL fait référence à la date de votre visite ou réservation.',
      ],
    },
    {
      heading: 'Contact',
      body: [
        'Questions sur les cookies ou les données: page Contact, +30 694 495 0094 ou WhatsApp. Indiquez votre référence de réservation si vous en avez une.',
      ],
    },
  ],
  faqs: [
    { q: 'Dois-je accepter les cookies optionnels pour réserver?', a: 'Non. Les cookies essentiels suffisent pour parcourir et démarrer une réservation.' },
    { q: 'Où mon choix est-il stocké?', a: 'Dans le stockage local du navigateur sous une clé de consentement AGGELOS Rentals.' },
    { q: 'Cela remplace-t-il le contrat de location?', a: 'Non. Le contrat et le bon à la prise en charge régissent la location. Cette page concerne seulement les cookies du site.' },
  ],
  related: [
    { to: 'legal/privacy-policy', anchor: 'Politique de confidentialité' },
    { to: 'legal/terms-conditions', anchor: 'Conditions générales' },
    { to: 'contact/contact', anchor: 'Contacter AGGELOS Rentals' },
    { to: 'home', anchor: 'Retour à l\'accueil' },
  ],
  finalCta: {
    heading: 'Quand vous êtes prêts',
    sub: 'Cherchez les prix en direct pour Paros et Antiparos, ou posez une question au bureau familial.',
    button: 'Chercher des véhicules',
  },
};

export default copy;
