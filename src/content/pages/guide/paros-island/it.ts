import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "it",
  seo: {
    title: "Guida Paros | AGGELOS Rentals",
    description: "Paesi, spiagge e arrivo a Paros, con consigli onesti sul noleggio auto o scooter con AGGELOS Rentals sulle isole.",
    keywords: [],
  },
  h1: "Guida di viaggio Paros",
  intro: "Paesi, spiagge e arrivo a Paros, con consigli onesti sul noleggio con AGGELOS Rentals. AGGELOS Rentals.",
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
    { to: "money/rent-a-car-antiparos-aggelos", anchor: "Noleggio Antiparos · paros-island" },
    { to: "money/paros-rent-a-car", anchor: "Noleggio Paros · paros-island" },
    { to: "fleet", anchor: "Tutta la flotta · paros-island" },
    { to: "contact/contact", anchor: "Contatti · paros-island" },
  ],
  finalCta: {
    heading: "Pronti per le strade dell'isola?",
    sub: "Prenota online e ritira in aeroporto o al porto.",
    button: "Cerca veicoli",
  },
};

export default copy;
