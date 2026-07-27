import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "fr",
  seo: {
    title: "Location Voiture Antiparos | Autos, ATV & Scooters",
    description: "Explorez Antiparos avec nos locations fiables. Une gamme de véhicules : ATV, scooters et SUV pour vos aventures sur l'île.",
    keywords: [],
  },
  h1: "Location Antiparos en Grèce",
  intro: "L'agence basée au port d'Antiparos. Voitures, scooters, quads et vélos pour rejoindre chaque plage sans attendre le bus.",
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
    { to: "money/paros-rent-a-car", anchor: "Location Paros · rent-a-car-antipar" },
    { to: "money/antiparos-scooter-rentals", anchor: "Scooters Antiparos · rent-a-car-antipar" },
    { to: "money/atvs-antiparos", anchor: "Quads Antiparos · rent-a-car-antipar" },
    { to: "fleet", anchor: "Toute la flotte · rent-a-car-antipar" },
  ],
  finalCta: {
    heading: "Prêt pour les routes de l'île ?",
    sub: "Réservez en ligne, retrouvez-nous à l'aéroport ou au port.",
    button: "Chercher un véhicule",
  },
};

export default copy;
