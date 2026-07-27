import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "fr",
  seo: {
    title: "Location Voiture & Moto à Paros | AGGELOS Rentals",
    description: "Louez une voiture à Paros avec AGGELOS Rentals. Réservez en ligne en 60 secondes pour aéroport, port et livraison sur l'île, service local depuis 1994.",
    keywords: [],
  },
  h1: "Location Paros en Grèce",
  intro: "Parcourez Paros avec une flotte locale basée à Antiparos. Prise en charge à l'aéroport (PAS) ou au port de Parikia, tarifs clairs et aide WhatsApp rapide.",
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
      body: ["En pratique: depuis 1994 au port d'Antiparos, nous connaissons ferries, parkings et embouteillages d'août.", "En clair: vous choisissez le point de retrait, nous préparons le véhicule et les papiers."],
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
    { to: "money/paros-airport-rent-a-car-port", anchor: "Prise en charge aéroport · paros-rent-a-car" },
    { to: "money/paros-port-parikia-rent-a-car", anchor: "Prise en charge Parikia · paros-rent-a-car" },
    { to: "money/rent-a-car-antiparos-aggelos", anchor: "Location Antiparos · paros-rent-a-car" },
    { to: "fleet-category/compact", anchor: "Voitures compactes · paros-rent-a-car" },
  ],
  finalCta: {
    heading: "Prêt pour les routes de l'île ?",
    sub: "Réservez en ligne, retrouvez-nous à l'aéroport ou au port.",
    button: "Chercher un véhicule",
  },
};

export default copy;
