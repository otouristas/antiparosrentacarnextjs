import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "nl",
  seo: {
    title: "Gids Paros | AGGELOS Rentals",
    description: "Dorpen, stranden en aankomst op Paros, met eerlijk advies over autohuur en scooters bij AGGELOS Rentals op de eilanden.",
    keywords: [],
  },
  h1: "Reisgids Paros",
  intro: "Dorpen, stranden en aankomst op Paros, met eerlijk advies over huren bij AGGELOS Rentals. AGGELOS Rentals.",
  cta: {
    primary: "Beschikbaarheid checken",
    secondary: "Bekijk vloot",
    whatsapp: "WhatsApp",
    call: "Bellen",
  },
  sections: [
    {
      heading: "Waarom huren",
      body: ["In de praktijk: sinds 1994 in de haven van Antiparos kennen we veerboten, parkeren en augustusdrukte.", "Kort gezegd: u kiest het afleverpunt, wij klaarzetten voertuig en papieren."],
    },
    {
      heading: "Ophalen en bezorgen",
      body: ["In de praktijk: sinds 1994 in de haven van Antiparos kennen we veerboten, parkeren en augustusdrukte."],
    },
    {
      heading: "Wat gasten kiezen",
      body: ["In de praktijk: sinds 1994 in de haven van Antiparos kennen we veerboten, parkeren en augustusdrukte."],
    },
  ],
  faqs: [
    { q: "Waar is de ophaallocatie?", a: "Kies luchthaven, haven of hotel als dat beschikbaar is." },
    { q: "Welk rijbewijs heb ik nodig?", a: "We controleren de rijbewijscategorie bij ophalen." },
    { q: "Kan ik naar Antiparos?", a: "Ja bij afgesproken one-way ritten tussen Paros en Antiparos." },
  ],
  related: [
    { to: "money/rent-a-car-antiparos-aggelos", anchor: "Huren op Antiparos · paros-island" },
    { to: "money/paros-rent-a-car", anchor: "Huren op Paros · paros-island" },
    { to: "fleet", anchor: "Volledige vloot · paros-island" },
    { to: "contact/contact", anchor: "Contact · paros-island" },
  ],
  finalCta: {
    heading: "Klaar voor de eilandwegen?",
    sub: "Boek online, ontmoet ons op luchthaven of haven, rij met duidelijke voorwaarden.",
    button: "Zoek voertuigen",
  },
};

export default copy;
