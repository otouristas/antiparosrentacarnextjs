import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "fr",
  seo: {
    title: "Guide Paros | AGGELOS Rentals",
    description: "Villages, plages et arrivée à Paros, avec des conseils honnêtes sur la location chez AGGELOS Rentals. AGGELOS Rentals.",
    keywords: [],
  },
  h1: "Guide de voyage Paros",
  intro: "Villages, plages et arrivée à Paros, avec des conseils honnêtes sur la location chez AGGELOS Rentals. AGGELOS Rentals.",
  cta: {
    primary: "Voir disponibilités",
    secondary: "Voir la flotte",
    whatsapp: "WhatsApp",
    call: "Appeler",
  },
  sections: [
    {
      heading: "Pourquoi louer",
      body: ["En pratique: depuis 1994 au port d'Antiparos, nous connaissons ferries, parkings et embouteillages d'août.", "En clair: vous choisissez le point de retrait, nous préparons le véhicule et les papiers."],
    },
    {
      heading: "Prise en charge",
      body: ["En pratique: depuis 1994 au port d'Antiparos, nous connaissons ferries, parkings et embouteillages d'août."],
    },
    {
      heading: "Ce que choisissent les voyageurs",
      body: ["En pratique: depuis 1994 au port d'Antiparos, nous connaissons ferries, parkings et embouteillages d'août."],
    },
  ],
  faqs: [
    { q: "Où récupérer le véhicule ?", a: "Choisissez aéroport, port ou hôtel selon les options." },
    { q: "Quel permis faut-il ?", a: "Nous vérifions la catégorie de permis au retrait." },
    { q: "Peut-on croiser vers Antiparos ?", a: "Oui pour les trajets one-way convenus." },
  ],
  related: [
    { to: "money/rent-a-car-antiparos-aggelos", anchor: "Location Antiparos · paros-island" },
    { to: "money/paros-rent-a-car", anchor: "Location Paros · paros-island" },
    { to: "fleet", anchor: "Toute la flotte · paros-island" },
    { to: "contact/contact", anchor: "Nous contacter · paros-island" },
  ],
  finalCta: {
    heading: "Prêt pour les routes de l'île ?",
    sub: "Réservez en ligne, retrouvez-nous à l'aéroport ou au port.",
    button: "Chercher un véhicule",
  },
};

export default copy;
