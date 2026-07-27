import type { CategoryCopy } from "@/content/types";

export const copy: CategoryCopy = {
  locale: "fr",
  label: "Mini voitures",
  bestFor: "Choisissez aéroport, port ou hôtel selon les options.",
  licence: "Nous vérifions la catégorie de permis au retrait.",
  compare: "Oui pour les trajets one-way convenus.",
  seo: {
    title: "Mini voitures | AGGELOS Rentals · Grèce",
    description: "Mini voitures: En pratique: depuis 1994 au port d'Antiparos, nous connaissons ferries, parkings et embouteillages d'août.",
    keywords: [],
  },
  h1: "Mini voitures en Grèce",
  intro: "Mini voitures: En pratique: depuis 1994 au port d'Antiparos, nous connaissons ferries, parkings et embouteillages d'août.",
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
    { to: "fleet-category/compact", anchor: "Voitures compactes · mini" },
    { to: "money/paros-rent-a-car", anchor: "Location Paros · mini" },
    { to: "money/rent-a-car-antiparos-aggelos", anchor: "Location Antiparos · mini" },
    { to: "fleet", anchor: "Toute la flotte · mini" },
  ],
  finalCta: {
    heading: "Prêt pour les routes de l'île ?",
    sub: "Réservez en ligne, retrouvez-nous à l'aéroport ou au port.",
    button: "Chercher un véhicule",
  },
};

export default copy;
