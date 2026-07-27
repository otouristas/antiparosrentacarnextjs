import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "fr",
  seo: {
    title: "Politique de confidentialité | AGGELOS",
    description: "Politique de confidentialité: Lisez cette politique pour les réservations et le site AGGELOS Rentals à Paros et Antiparos. Contactez-nous pour toute.",
    keywords: [],
  },
  h1: "Politique de confidentialité",
  intro: "Politique de confidentialité: Lisez cette politique pour les réservations et le site AGGELOS Rentals à Paros et Antiparos. Contactez-nous pour toute.",
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
    { to: "contact/contact", anchor: "Nous contacter · privacy-policy" },
    { to: "contact/about-us", anchor: "Lien 2 · privacy-policy" },
    { to: "home", anchor: "Lien 3 · privacy-policy" },
    { to: "money/paros-rent-a-car", anchor: "Location Paros · privacy-policy" },
  ],
  finalCta: {
    heading: "Prêt pour les routes de l'île ?",
    sub: "Réservez en ligne, retrouvez-nous à l'aéroport ou au port.",
    button: "Chercher un véhicule",
  },
};

export default copy;
