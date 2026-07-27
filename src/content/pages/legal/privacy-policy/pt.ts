import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "pt",
  seo: {
    title: "Política de privacidade | AGGELOS",
    description: "Política de privacidade: Leia esta política sobre reservas e uso do site AGGELOS Rentals em Paros e Antíparos. Contacte-nos com dúvidas de aluguer.",
    keywords: [],
  },
  h1: "Política de privacidade",
  intro: "Política de privacidade: Leia esta política sobre reservas e uso do site AGGELOS Rentals em Paros e Antíparos. Contacte-nos com dúvidas de aluguer.",
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
    { to: "contact/contact", anchor: "Contacto · privacy-policy" },
    { to: "contact/about-us", anchor: "Ligação 2 · privacy-policy" },
    { to: "home", anchor: "Ligação 3 · privacy-policy" },
    { to: "money/paros-rent-a-car", anchor: "Aluguer Paros · privacy-policy" },
  ],
  finalCta: {
    heading: "Pronto para as estradas da ilha?",
    sub: "Reserve online e recolha no aeroporto ou porto.",
    button: "Procurar veículos",
  },
};

export default copy;
