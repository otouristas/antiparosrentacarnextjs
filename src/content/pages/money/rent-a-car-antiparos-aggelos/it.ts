import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "it",
  seo: {
    title: "Autonoleggio Antiparos | Auto, ATV e Scooter",
    description: "Esplorate Antiparos con il nostro affidabile noleggio auto. Offriamo una gamma di veicoli tra cui ATV, scooter e SUV per le vostre avventure sull'isola.",
    keywords: [],
  },
  h1: "Noleggio Antiparos in Grecia",
  intro: "L'agenzia con sede al porto di Antiparos. Auto, scooter, quad e bici per raggiungere ogni spiaggia senza aspettare il bus.",
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
    { to: "money/paros-rent-a-car", anchor: "Noleggio Paros · rent-a-car-antipar" },
    { to: "money/antiparos-scooter-rentals", anchor: "Scooter Antiparos · rent-a-car-antipar" },
    { to: "money/atvs-antiparos", anchor: "Quad Antiparos · rent-a-car-antipar" },
    { to: "fleet", anchor: "Tutta la flotta · rent-a-car-antipar" },
  ],
  finalCta: {
    heading: "Pronti per le strade dell'isola?",
    sub: "Prenota online e ritira in aeroporto o al porto.",
    button: "Cerca veicoli",
  },
};

export default copy;
