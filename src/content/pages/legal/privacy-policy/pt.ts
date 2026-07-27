import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "pt",
  seo: {
    title: 'Política de privacidade | AGGELOS Rentals',
    description: 'Como a AGGELOS Rentals trata dados pessoais para reservas e o site em Paros e Antíparos, e como exercer os seus direitos de privacidade.',
    keywords: [],
  },
  h1: 'Política de privacidade',
  intro: 'Esta política explica como a AGGELOS Rentals trata dados pessoais quando visita antiparosrentacar.com, pede orçamento ou reserva um veículo para Paros e Antíparos.',
  cta: {
    primary: 'Contactar',
    secondary: 'Cookies',
    whatsapp: 'WhatsApp',
    call: 'Ligar',
  },
  sections: [
    {
      heading: 'Responsável',
      body: [
        'AGGELOS Rentals, Porto de Antíparos, 840 07 Antíparos, Cíclades, Grécia. Contacto: aggelos@antiparosrentacar.com, +30 694 495 0094 ou WhatsApp.',
      ],
    },
    {
      heading: 'Que dados recolhemos',
      body: [
        'Consoante o uso, podemos tratar:',
      ],
      bullets: [
        'Dados de contacto de formulários ou chat.',
        'Detalhes de reserva: locais, datas, faixa etária, preferências.',
        'Dados técnicos do site e escolha de cookies.',
        'Mensagens sobre o aluguer.',
      ],
    },
    {
      heading: 'Finalidades',
      body: [
        'Responder, gerir reservas, entregar veículos, obrigações contabilísticas, fiabilidade do site e analítica limitada com consentimento.',
      ],
    },
    {
      heading: 'Bases legais',
      body: [
        'Contrato e passos pré-contratuais. Interesse legítimo de segurança. Consentimento para cookies opcionais ou marketing. Obrigação legal de faturas na Grécia.',
      ],
    },
    {
      heading: 'Partilha',
      body: [
        'Apenas com fornecedores necessários como GoCars, alojamento e mensagens. Não vendemos dados.',
      ],
    },
    {
      heading: 'Conservação',
      body: [
        'Pedidos pelo tempo necessário. Arquivos contabilísticos segundo prazos gregos. Escolha de cookies até limpar dados do site.',
      ],
    },
    {
      heading: 'Os seus direitos',
      body: [
        'Acesso, retificação, apagamento, limitação, portabilidade ou oposição, e reclamação à autoridade grega.',
      ],
    },
    {
      heading: 'Cookies',
      body: [
        'Armazenamento essencial para idioma e escolha de cookies. Ferramentas opcionais só se aceitar. Ver política de cookies (UE).',
      ],
    },
    {
      heading: 'Atualizações',
      body: [
        'Podemos atualizar esta política. Aplica-se a versão neste URL.',
      ],
    },
  ],
  faqs: [
    { q: 'Quem vê a minha reserva?', a: 'O balcão AGGELOS e os sistemas necessários à confirmação e entrega.' },
    { q: 'Posso apagar um pedido?', a: 'Sim, por contacto. Apagamos ou limitamos o que não for preciso para reserva ativa ou retenção legal.' },
    { q: 'Enviam marketing?', a: 'Só com consentimento. Mensagens operacionais de reserva não são marketing.' },
  ],
  related: [
    { to: 'legal/cookie-policy-eu', anchor: 'Política de cookies' },
    { to: 'legal/terms-conditions', anchor: 'Termos' },
    { to: 'contact/contact', anchor: 'Contacto' },
    { to: 'contact/about-us', anchor: 'Sobre nós' },
  ],
  finalCta: {
    heading: 'Dúvidas sobre os seus dados?',
    sub: 'Escreva ao balcão do porto de Antíparos.',
    button: 'Contactar',
  },
};

export default copy;
