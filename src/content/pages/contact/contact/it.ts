import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "it",
  seo: {
    title: "Contatti | AGGELOS Rentals · Grecia",
    description: "In pratica: dal 1994 al porto di Antiparos conosciamo traghetti, parcheggi e il traffico di agosto. AGGELOS Rentals.",
    keywords: [],
  },
  h1: "Contatti in Grecia",
  intro: "In pratica: dal 1994 al porto di Antiparos conosciamo traghetti, parcheggi e il traffico di agosto.",
  cta: {
    primary: "Controlla disponibilità",
    secondary: "Vedi flotta",
    whatsapp: "WhatsApp",
    call: "Chiama",
  },
  sections: [
    {
      heading: "Perché noleggiare",
      body: ["In pratica: dal 1994 al porto di Antiparos conosciamo traghetti, parcheggi e il traffico di agosto."],
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
    { to: "contact/about-us", anchor: "Link 1 · contact" },
    { to: "money/paros-airport-rent-a-car-port", anchor: "Ritiro in aeroporto · contact" },
    { to: "fleet", anchor: "Tutta la flotta · contact" },
    { to: "home", anchor: "Link 4 · contact" },
  ],
  finalCta: {
    heading: "Pronti per le strade dell'isola?",
    sub: "Prenota online e ritira in aeroporto o al porto.",
    button: "Cerca veicoli",
  },
};

export default copy;
