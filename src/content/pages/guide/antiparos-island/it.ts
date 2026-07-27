import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "it",
  seo: {
    title: "Guida Antiparos | AGGELOS Rentals",
    description: "Spiagge, grotta, vita del porto e quando noleggiare ad Antiparos. Note locali di AGGELOS Rentals al porto. AGGELOS Rentals.",
    keywords: [],
  },
  h1: "Guida di viaggio Antiparos",
  intro: "Spiagge, grotta, vita del porto e quando noleggiare ad Antiparos. Note locali di AGGELOS Rentals al porto. AGGELOS Rentals.",
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
    { to: "money/rent-a-car-antiparos-aggelos", anchor: "Noleggio Antiparos · antiparos-island" },
    { to: "money/paros-rent-a-car", anchor: "Noleggio Paros · antiparos-island" },
    { to: "fleet", anchor: "Tutta la flotta · antiparos-island" },
    { to: "contact/contact", anchor: "Contatti · antiparos-island" },
  ],
  finalCta: {
    heading: "Pronti per le strade dell'isola?",
    sub: "Prenota online e ritira in aeroporto o al porto.",
    button: "Cerca veicoli",
  },
};

export default copy;
