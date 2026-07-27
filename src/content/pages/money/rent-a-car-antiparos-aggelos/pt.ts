import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "pt",
  seo: {
    title: "Aluguer de Carros Antíparos | Carros e ATV",
    description: "Explore Antíparos com os nossos alugueres fiáveis. Uma gama de veículos como ATV, scooters e SUV para as suas aventuras na ilha.",
    keywords: [],
  },
  h1: "Aluguer Antiparos na Grécia",
  intro: "O balcão com sede no porto de Antíparos. Carros, scooters, quads e bicicletas para chegar a cada praia sem esperar pelo autocarro.",
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
    { to: "money/paros-rent-a-car", anchor: "Aluguer Paros · rent-a-car-antipar" },
    { to: "money/antiparos-scooter-rentals", anchor: "Scooters Antíparos · rent-a-car-antipar" },
    { to: "money/atvs-antiparos", anchor: "Quads Antíparos · rent-a-car-antipar" },
    { to: "fleet", anchor: "Frota completa · rent-a-car-antipar" },
  ],
  finalCta: {
    heading: "Pronto para as estradas da ilha?",
    sub: "Reserve online e recolha no aeroporto ou porto.",
    button: "Procurar veículos",
  },
};

export default copy;
