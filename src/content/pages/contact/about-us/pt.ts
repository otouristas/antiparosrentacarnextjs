import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "pt",
  seo: {
    title: "Sobre nós | AGGELOS Rentals · Grécia",
    description: "Na prática: desde 1994 no porto de Antíparos conhecemos ferries, estacionamento e o trânsito de agosto. AGGELOS Rentals.",
    keywords: [],
  },
  h1: "Sobre nós na Grécia",
  intro: "Na prática: desde 1994 no porto de Antíparos conhecemos ferries, estacionamento e o trânsito de agosto.",
  cta: {
    primary: "Ver disponibilidade",
    secondary: "Ver frota",
    whatsapp: "WhatsApp",
    call: "Ligar",
  },
  sections: [
    {
      heading: "Porquê alugar",
      body: ["Na prática: desde 1994 no porto de Antíparos conhecemos ferries, estacionamento e o trânsito de agosto."],
    },
    {
      heading: "Recolha e entrega",
      body: ["Na prática: desde 1994 no porto de Antíparos conhecemos ferries, estacionamento e o trânsito de agosto."],
    },
    {
      heading: "O que os viajantes escolhem",
      body: ["Na prática: desde 1994 no porto de Antíparos conhecemos ferries, estacionamento e o trânsito de agosto."],
    },
  ],
  faqs: [
    { q: "Onde recoho o veículo?", a: "Escolha aeroporto, porto ou hotel se disponível." },
    { q: "Que carta preciso?", a: "Confirmamos a categoria da carta na recolha." },
    { q: "Posso ir a Antíparos?", a: "Sim em one-way acordados." },
  ],
  related: [
    { to: "contact/contact", anchor: "Contacto · about-us" },
    { to: "money/rent-a-car-antiparos-aggelos", anchor: "Aluguer Antíparos · about-us" },
    { to: "fleet", anchor: "Frota completa · about-us" },
    { to: "home", anchor: "Ligação 4 · about-us" },
  ],
  finalCta: {
    heading: "Pronto para as estradas da ilha?",
    sub: "Reserve online e recolha no aeroporto ou porto.",
    button: "Procurar veículos",
  },
};

export default copy;
