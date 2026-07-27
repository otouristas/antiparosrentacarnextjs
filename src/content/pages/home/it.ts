import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "it",
  seo: {
    title: "Autonoleggio Antiparos & Paros | AGGELOS Rentals",
    description: "Esplora Antiparos e Paros in tutta comodità. AGGELOS Rentals offre auto, scooter e quad a prezzi competitivi. Prenota ora per un viaggio senza pensieri!",
    keywords: [],
  },
  h1: "Noleggio Antiparos e Paros in Grecia",
  intro: "Auto, scooter, quad e bici dal porto di Antiparos dal 1994. Ci trovi in aeroporto a Paros, a Parikia o ad Antiparos.",
  cta: {
    primary: "Controlla disponibilità",
    secondary: "Vedi flotta",
    whatsapp: "WhatsApp",
    call: "Chiama",
  },
  sections: [
    {
      heading: "Perché noleggiare",
      body: ["In pratica: dal 1994 al porto di Antiparos conosciamo traghetti, parcheggi e il traffico di agosto.", "In sintesi: scegli il punto di ritiro e prepariamo veicolo e documenti."],
    },
    {
      heading: "Ritiro e consegna",
      body: ["In pratica: dal 1994 al porto di Antiparos conosciamo traghetti, parcheggi e il traffico di agosto."],
    },
    {
      heading: "Cosa scelgono i viaggiatori",
      body: ["In pratica: dal 1994 al porto di Antiparos conosciamo traghetti, parcheggi e il traffico di agosto."],
    },
  ],
  faqs: [
    { q: "Dove ritiro il veicolo?", a: "Scegli aeroporto, porto o hotel se disponibile." },
    { q: "Che patente serve?", a: "Verifichiamo la categoria della patente al ritiro." },
    { q: "Posso andare ad Antiparos?", a: "Sì per i one-way concordati." },
  ],
  related: [
    { to: "money/paros-rent-a-car", anchor: "Noleggio Paros · home" },
    { to: "money/rent-a-car-antiparos-aggelos", anchor: "Noleggio Antiparos · home" },
    { to: "fleet", anchor: "Tutta la flotta · home" },
    { to: "guide/antiparos-island", anchor: "Link 4 · home" },
  ],
  finalCta: {
    heading: "Pronti per le strade dell'isola?",
    sub: "Prenota online e ritira in aeroporto o al porto.",
    button: "Cerca veicoli",
  },
};

export default copy;
