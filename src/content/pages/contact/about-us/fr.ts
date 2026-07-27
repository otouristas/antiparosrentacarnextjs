import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "fr",
  seo: {
    title: "À propos | AGGELOS Rentals · Grèce",
    description: "En pratique: depuis 1994 au port d'Antiparos, nous connaissons ferries, parkings et embouteillages d'août. AGGELOS Rentals.",
    keywords: [],
  },
  h1: "À propos en Grèce",
  intro: "En pratique: depuis 1994 au port d'Antiparos, nous connaissons ferries, parkings et embouteillages d'août.",
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
    { to: "contact/contact", anchor: "Nous contacter · about-us" },
    { to: "money/rent-a-car-antiparos-aggelos", anchor: "Location Antiparos · about-us" },
    { to: "fleet", anchor: "Toute la flotte · about-us" },
    { to: "home", anchor: "Lien 4 · about-us" },
  ],
  finalCta: {
    heading: "Prêt pour les routes de l'île ?",
    sub: "Réservez en ligne, retrouvez-nous à l'aéroport ou au port.",
    button: "Chercher un véhicule",
  },
};

export default copy;
