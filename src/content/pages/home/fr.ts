import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "fr",
  seo: {
    title: "Location Voiture Antiparos & Paros | AGGELOS Rentals",
    description: "Explorez Antiparos et Paros en toute simplicité. AGGELOS Rentals propose voitures, scooters et ATV à prix compétitifs. Réservez vite !",
    keywords: [],
  },
  h1: "Location Antiparos et Paros en Grèce",
  intro: "Voitures, scooters, quads et vélos depuis le port d'Antiparos depuis 1994. Retrouvez-nous à l'aéroport de Paros, Parikia ou Antiparos.",
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
    { to: "money/paros-rent-a-car", anchor: "Location Paros · home" },
    { to: "money/rent-a-car-antiparos-aggelos", anchor: "Location Antiparos · home" },
    { to: "fleet", anchor: "Toute la flotte · home" },
    { to: "guide/antiparos-island", anchor: "Lien 4 · home" },
  ],
  finalCta: {
    heading: "Prêt pour les routes de l'île ?",
    sub: "Réservez en ligne, retrouvez-nous à l'aéroport ou au port.",
    button: "Chercher un véhicule",
  },
};

export default copy;
