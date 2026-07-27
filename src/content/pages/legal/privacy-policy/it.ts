import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "it",
  seo: {
    title: "Informativa privacy | AGGELOS",
    description: "Informativa sulla privacy: Leggi questa policy su prenotazioni e uso del sito AGGELOS Rentals a Paros e Antiparos. Contattaci per domande sul noleggio.",
    keywords: [],
  },
  h1: "Informativa sulla privacy",
  intro: "Informativa sulla privacy: Leggi questa policy su prenotazioni e uso del sito AGGELOS Rentals a Paros e Antiparos. Contattaci per domande sul noleggio.",
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
    { to: "contact/contact", anchor: "Contatti · privacy-policy" },
    { to: "contact/about-us", anchor: "Link 2 · privacy-policy" },
    { to: "home", anchor: "Link 3 · privacy-policy" },
    { to: "money/paros-rent-a-car", anchor: "Noleggio Paros · privacy-policy" },
  ],
  finalCta: {
    heading: "Pronti per le strade dell'isola?",
    sub: "Prenota online e ritira in aeroporto o al porto.",
    button: "Cerca veicoli",
  },
};

export default copy;
