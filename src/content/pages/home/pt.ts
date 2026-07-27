import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "pt",
  seo: {
    title: "Aluguer de Carros Antíparos & Paros | AGGELOS Rentals",
    description: "Explore Antíparos e Paros com facilidade. A AGGELOS Rentals oferece carros, scooters e ATV a preços competitivos. Reserve já!",
    keywords: [],
  },
  h1: "Aluguer Antíparos e Paros na Grécia",
  intro: "Carros, scooters, quads e bicicletas desde o porto de Antíparos em 1994. Encontro no aeroporto de Paros, Parikia ou Antíparos.",
  cta: {
    primary: "Ver disponibilidade",
    secondary: "Ver frota",
    whatsapp: "WhatsApp",
    call: "Ligar",
  },
  sections: [
    {
      heading: "Porquê alugar",
      body: ["Na prática: desde 1994 no porto de Antíparos conhecemos ferries, estacionamento e o trânsito de agosto.", "Em resumo: escolhe o ponto de recolha e preparamos o veículo e os documentos."],
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
    { to: "money/paros-rent-a-car", anchor: "Aluguer Paros · home" },
    { to: "money/rent-a-car-antiparos-aggelos", anchor: "Aluguer Antíparos · home" },
    { to: "fleet", anchor: "Frota completa · home" },
    { to: "guide/antiparos-island", anchor: "Ligação 4 · home" },
  ],
  finalCta: {
    heading: "Pronto para as estradas da ilha?",
    sub: "Reserve online e recolha no aeroporto ou porto.",
    button: "Procurar veículos",
  },
};

export default copy;
