import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "es",
  seo: {
    title: 'Política de cookies (UE) | AGGELOS Rentals',
    description: 'Cómo AGGELOS Rentals usa cookies en antiparosrentacar.com y cómo gestionar preferencias para reservas en Paros y Antíparos.',
    keywords: [],
  },
  h1: 'Política de cookies (UE)',
  intro: 'Esta página explica qué cookies y tecnologías similares usa AGGELOS Rentals en antiparosrentacar.com para visitantes del Espacio Económico Europeo y Suiza, y cómo controlarlas.',
  cta: {
    primary: 'Buscar vehículos',
    secondary: 'Flota',
    whatsapp: 'WhatsApp',
    call: 'Llamar',
  },
  sections: [
    {
      heading: 'Quiénes somos',
      body: [
        'AGGELOS Rentals opera este sitio desde el puerto de Antíparos, Cícladas, Grecia. Para privacidad sobre reservas o el sitio, use contacto, teléfono o WhatsApp.',
      ],
    },
    {
      heading: 'Qué son las cookies',
      body: [
        'Las cookies son pequeños archivos de texto en su dispositivo. Herramientas similares como el almacenamiento local guardan preferencias. Ayudan al sitio a recordar opciones y mantener funciones básicas.',
      ],
    },
    {
      heading: 'Cookies en este sitio',
      body: [
        'Este sitio Next.js no es la antigua instalación WordPress. Aquí no ejecutamos WordPress, Elementor ni redes publicitarias como Google AdSense.',
      ],
      bullets: [
        'Esenciales: guardan su elección (Aceptar todas o Solo esenciales) para que el aviso no reaparezca en cada visita.',
        'Esenciales: idioma y campos de búsqueda de reserva pueden mantenerse un momento en el navegador.',
        'Cookies opcionales de análisis o marketing solo si acepta y si esas herramientas están activas.',
      ],
    },
    {
      heading: 'Cómo gestionar cookies',
      body: [
        'Use Aceptar todas o Solo esenciales en el aviso. Borrar datos del sitio en el navegador restablece la elección.',
      ],
    },
    {
      heading: 'Actualizaciones',
      body: [
        'Podemos actualizar esta política si cambian leyes o funciones. La versión en esta URL es la referencia en la fecha de su visita o reserva.',
      ],
    },
    {
      heading: 'Contacto',
      body: [
        'Preguntas sobre cookies o datos: Contacto, +30 694 495 0094 o WhatsApp. Indique su referencia de reserva si la tiene.',
      ],
    },
  ],
  faqs: [
    { q: '¿Debo aceptar cookies opcionales para reservar?', a: 'No. Las esenciales bastan para navegar e iniciar una reserva.' },
    { q: '¿Dónde se guarda mi elección?', a: 'En el almacenamiento local del navegador con una clave de consentimiento de AGGELOS Rentals.' },
    { q: '¿Sustituye al contrato de alquiler?', a: 'No. El contrato y el bono en la recogida rigen el alquiler. Esta página solo cubre cookies del sitio.' },
  ],
  related: [
    { to: 'legal/privacy-policy', anchor: 'Política de privacidad' },
    { to: 'legal/terms-conditions', anchor: 'Términos y condiciones' },
    { to: 'contact/contact', anchor: 'Contactar AGGELOS Rentals' },
    { to: 'home', anchor: 'Volver al inicio' },
  ],
  finalCta: {
    heading: 'Cuando quiera',
    sub: 'Busque precios en vivo para Paros y Antíparos, o pregunte al mostrador familiar.',
    button: 'Buscar vehículos',
  },
};

export default copy;
