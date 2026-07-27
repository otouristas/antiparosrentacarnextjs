import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "fr",
  seo: {
    title: "Le Pirée louer une voiture | Locations AGGELOS",
    description: "Louez une voiture au port du Pirée avec AGGELOS Rentals. Choisissez parmi une large gamme de véhicules et voyagez en toute sérénité. Réservez dès maintenant !",
    keywords: [],
  },
  h1: "Location Pirée en Grèce",
  intro: "Commencez au Pirée avant le ferry vers les Cyclades. Coordination avec votre départ, puis suite possible à Paros ou Antiparos.",
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
    { to: "money/paros-rent-a-car", anchor: "Location Paros · piraeus-rent-a-car" },
    { to: "money/paros-port-parikia-rent-a-car", anchor: "Prise en charge Parikia · piraeus-rent-a-car" },
    { to: "contact/contact", anchor: "Nous contacter · piraeus-rent-a-car" },
    { to: "fleet-category/compact", anchor: "Voitures compactes · piraeus-rent-a-car" },
  ],
  finalCta: {
    heading: "Prêt pour les routes de l'île ?",
    sub: "Réservez en ligne, retrouvez-nous à l'aéroport ou au port.",
    button: "Chercher un véhicule",
  },
};

export default copy;
