import type { PageCopy } from "@/content/types";

/**
 * legal/terms-conditions , pt
 *
 * Rental terms body is served from content/raw markdown (2026 edition).
 * This module holds locale-native SEO chrome and related links.
 */
export const copy: PageCopy = {
  locale: "pt",

  seo: {
    title: 'Termos e condições 2026 | AGGELOS Rentals',
    description: 'Termos de aluguer 2026 de carros, scooters e ATVs com a AGGELOS Rentals em Paros e Antíparos, depósitos e cancelamento.',
    keywords: [],
  },

  h1: 'Termos e condições',
  intro: 'Leia com atenção os nossos termos de aluguer para Antíparos, Paros e Pireu.',

  cta: {
    primary: 'Reservar um carro',
    secondary: "",
    whatsapp: 'WhatsApp',
    call: 'Ligue-nos',
  },

  sections: [
    { heading: 'Âmbito', body: ['Estes termos cobrem reservas e aluguer com AGGELOS Rentals em Paros, Antíparos e pontos de recolha relacionados.'] },
    { heading: 'Contrato na recolha', body: ['O contrato e o voucher na entrega continuam vinculativos para depósito, seguro e devolução.'] },
    { heading: 'Perguntas', body: ['Contacte o balcão no porto de Antíparos se alguma cláusula não estiver clara antes da recolha.'] },
  ],

  faqs: [
    { q: 'As reservas são reembolsáveis?', a: 'Não. Todas as reservas em Antíparos, Paros e Pireu não são reembolsáveis.' },
    { q: 'Qual a idade mínima do condutor?', a: '24 anos, ou 26 para premium/luxo. Máximo 74 sem sobretaxa.' },
    { q: 'A quilometragem é ilimitada?', a: 'Ilimitada em Antíparos e Paros. No Pireu: 150 km/dia.' }
  ],

  related: [
    { to: 'money/paros-rent-a-car', anchor: 'Aluguer de carros em Paros' },
    { to: 'money/rent-a-car-antiparos-aggelos', anchor: 'Aluguer de carros em Antíparos' },
    { to: 'legal/privacy-policy', anchor: 'Política de privacidade' }
  ],

  finalCta: { heading: 'Pronto para alugar?', sub: 'Veja preços em direto para as suas datas.', button: 'Pesquisar preços' },
};

export default copy;
