import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "pt",
  seo: {
    title: "Guia Antíparos | AGGELOS Rentals",
    description: "Praias, gruta, vida do porto e quando alugar em Antíparos. Notas locais da AGGELOS Rentals no porto. AGGELOS Rentals.",
    keywords: [],
  },
  h1: "Guia de viagem Antíparos",
  intro: "Praias, gruta, vida do porto e quando alugar em Antíparos. Notas locais da AGGELOS Rentals no porto. AGGELOS Rentals.",
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
    { to: "money/rent-a-car-antiparos-aggelos", anchor: "Aluguer Antíparos · antiparos-island" },
    { to: "money/paros-rent-a-car", anchor: "Aluguer Paros · antiparos-island" },
    { to: "fleet", anchor: "Frota completa · antiparos-island" },
    { to: "contact/contact", anchor: "Contacto · antiparos-island" },
  ],
  finalCta: {
    heading: "Pronto para as estradas da ilha?",
    sub: "Reserve online e recolha no aeroporto ou porto.",
    button: "Procurar veículos",
  },
};

export default copy;
