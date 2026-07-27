import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "pt",
  seo: {
    title: "Pireu alugar um carro | Aluguel de AGGELOS",
    description: "Alugue um carro no Porto do Pireu com a AGGELOS Rentals. Escolha entre uma vasta gama de veículos para uma viagem sem stress. Reserve!",
    keywords: [],
  },
  h1: "Aluguer Pireu na Grécia",
  intro: "Comece no Pireu antes do ferry para as Cíclades. Coordenação com a partida e possível continuação em Paros ou Antíparos.",
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
    { to: "money/paros-rent-a-car", anchor: "Aluguer Paros · piraeus-rent-a-car" },
    { to: "money/paros-port-parikia-rent-a-car", anchor: "Recolha em Parikia · piraeus-rent-a-car" },
    { to: "contact/contact", anchor: "Contacto · piraeus-rent-a-car" },
    { to: "fleet-category/compact", anchor: "Carros compactos · piraeus-rent-a-car" },
  ],
  finalCta: {
    heading: "Pronto para as estradas da ilha?",
    sub: "Reserve online e recolha no aeroporto ou porto.",
    button: "Procurar veículos",
  },
};

export default copy;
