import type { CategoryCopy } from "@/content/types";

export const copy: CategoryCopy = {
  locale: "fr",
  label: "Vélos",
  bestFor: "Choisissez aéroport, port ou hôtel selon les options.",
  licence: "Nous vérifions la catégorie de permis au retrait.",
  compare: "Oui pour les trajets one-way convenus.",
  seo: {
    title: "Vélos | AGGELOS Rentals · Grèce",
    description: "Vélos: En pratique: depuis 1994 au port d'Antiparos, nous connaissons ferries, parkings et embouteillages d'août.",
    keywords: [],
  },
  h1: "Vélos en Grèce",
  intro: "Vélos: En pratique: depuis 1994 au port d'Antiparos, nous connaissons ferries, parkings et embouteillages d'août.",
  cta: {
    primary: "Voir disponibilités",
    secondary: "Voir la flotte",
    whatsapp: "WhatsApp",
    call: "Appeler",
  },
  sections: [
    {
      heading: "Pourquoi louer",
      body: ["En pratique: depuis 1994 au port d'Antiparos, nous connaissons ferries, parkings et embouteillages d'août."],
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
    { to: "fleet-category/scooters", anchor: "Flotte scooters · bikes" },
    { to: "fleet-category/mini", anchor: "Mini voitures · bikes" },
    { to: "contact/contact", anchor: "Nous contacter · bikes" },
    { to: "money/rent-a-car-antiparos-aggelos", anchor: "Location Antiparos · bikes" },
  ],
  finalCta: {
    heading: "Prêt pour les routes de l'île ?",
    sub: "Réservez en ligne, retrouvez-nous à l'aéroport ou au port.",
    button: "Chercher un véhicule",
  },
};

export default copy;
