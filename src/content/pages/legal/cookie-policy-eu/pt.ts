import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "pt",
  seo: {
    title: 'Cookies e preferências (UE) | AGGELOS Rentals',
    description: 'Como a AGGELOS Rentals trata cookies em antiparosrentacar.com e como gerir preferências nas reservas em Paros e Antíparos com a nossa equipa.',
    keywords: [],
  },
  h1: 'Cookies e preferências (UE)',
  intro: 'Esta página explica que cookies e tecnologias semelhantes a AGGELOS Rentals usa em antiparosrentacar.com para visitantes do Espaço Económico Europeu e da Suíça, e como as controlar no site novo.',
  cta: {
    primary: 'Pesquisar veículos',
    secondary: 'Frota',
    whatsapp: 'WhatsApp',
    call: 'Ligar',
  },
  sections: [
    {
      heading: 'Quem somos',
      body: [
        'A AGGELOS Rentals opera este site a partir do porto de Antíparos, Cíclades, Grécia. Para privacidade sobre reservas ou o site: contacto, telefone ou WhatsApp.',
      ],
    },
    {
      heading: 'O que são cookies',
      body: [
        'Cookies são pequenos ficheiros de texto no seu dispositivo. Ferramentas semelhantes como o armazenamento local podem guardar preferências. Ajudam o site a lembrar escolhas e a manter funções básicas.',
      ],
    },
    {
      heading: 'Cookies neste site',
      body: [
        'Este site Next.js não é a antiga instalação WordPress. Não corremos WordPress, Elementor nem redes publicitárias como Google AdSense nestas páginas.',
      ],
      bullets: [
        'Essenciais: guardam a sua escolha (Aceitar todos ou Apenas essenciais) para o banner não reaparecer em cada visita.',
        'Essenciais: idioma e campos de pesquisa de reserva podem ficar brevemente no browser.',
        'Cookies opcionais de análise ou marketing só se aceitar e se essas ferramentas estiverem ativas.',
      ],
    },
    {
      heading: 'Como gerir cookies',
      body: [
        'Use Aceitar todos ou Apenas essenciais no banner. Limpar dados do site no browser repõe a escolha.',
      ],
    },
    {
      heading: 'Atualizações',
      body: [
        'Podemos atualizar esta política quando leis ou funções mudarem. A versão neste URL é a referência na data da visita ou reserva.',
      ],
    },
    {
      heading: 'Contacto',
      body: [
        'Perguntas sobre cookies ou dados: Contacto, +30 694 495 0094 ou WhatsApp. Indique a referência da reserva se tiver.',
      ],
    },
  ],
  faqs: [
    { q: 'Tenho de aceitar cookies opcionais para reservar?', a: 'Não. Os essenciais bastam para navegar e iniciar uma reserva.' },
    { q: 'Onde fica a minha escolha?', a: 'No armazenamento local do browser com uma chave de consentimento AGGELOS Rentals.' },
    { q: 'Substitui o contrato de aluguer?', a: 'Não. O contrato e o voucher na recolha regem o aluguer. Esta página cobre só cookies do site.' },
  ],
  related: [
    { to: 'legal/privacy-policy', anchor: 'Política de privacidade' },
    { to: 'legal/terms-conditions', anchor: 'Termos e condições' },
    { to: 'contact/contact', anchor: 'Contactar AGGELOS Rentals' },
    { to: 'home', anchor: 'Voltar à página inicial' },
  ],
  finalCta: {
    heading: 'Quando quiser',
    sub: 'Pesquise preços em direto para Paros e Antíparos, ou pergunte ao balcão familiar.',
    button: 'Pesquisar veículos',
  },
};

export default copy;
