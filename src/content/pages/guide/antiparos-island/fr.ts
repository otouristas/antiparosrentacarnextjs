import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "fr",
  seo: {
    title: "Guide Antiparos | AGGELOS Rentals",
    description: "Plages, grotte, vie du port et quand louer à Antiparos. Notes locales d'AGGELOS Rentals au port. AGGELOS Rentals.",
    keywords: [],
  },
  h1: "Guide de voyage Antiparos",
  intro: "Plages, grotte, vie du port et quand louer à Antiparos. Notes locales d'AGGELOS Rentals au port. AGGELOS Rentals.",
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
    { to: "money/rent-a-car-antiparos-aggelos", anchor: "Location Antiparos · antiparos-island" },
    { to: "money/paros-rent-a-car", anchor: "Location Paros · antiparos-island" },
    { to: "fleet", anchor: "Toute la flotte · antiparos-island" },
    { to: "contact/contact", anchor: "Nous contacter · antiparos-island" },
  ],
  finalCta: {
    heading: "Prêt pour les routes de l'île ?",
    sub: "Réservez en ligne, retrouvez-nous à l'aéroport ou au port.",
    button: "Chercher un véhicule",
  },
};

export default copy;
