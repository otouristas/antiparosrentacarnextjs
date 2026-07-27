import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "es",
  seo: {
    title: 'Política de privacidad | AGGELOS Rentals',
    description: 'Cómo AGGELOS Rentals trata datos personales para reservas y el sitio en Paros y Antíparos, y cómo ejercer sus derechos de privacidad.',
    keywords: [],
  },
  h1: 'Política de privacidad',
  intro: 'Esta política explica cómo AGGELOS Rentals trata datos personales cuando visita antiparosrentacar.com, pide presupuesto o reserva un vehículo para Paros y Antíparos.',
  cta: {
    primary: 'Contactar',
    secondary: 'Cookies',
    whatsapp: 'WhatsApp',
    call: 'Llamar',
  },
  sections: [
    {
      heading: 'Responsable',
      body: [
        'AGGELOS Rentals, Puerto de Antíparos, 840 07 Antíparos, Cícladas, Grecia. Contacto: aggelos@antiparosrentacar.com, +30 694 495 0094 o WhatsApp.',
      ],
    },
    {
      heading: 'Qué recopilamos',
      body: [
        'Según el uso, podemos tratar:',
      ],
      bullets: [
        'Datos de contacto de formularios o chat.',
        'Detalles de reserva: lugares, fechas, grupo de edad, preferencias.',
        'Datos técnicos del sitio y preferencia de cookies.',
        'Mensajes sobre el alquiler.',
      ],
    },
    {
      heading: 'Finalidades',
      body: [
        'Responder, gestionar reservas, entregar vehículos, obligaciones contables, seguridad del sitio y analítica limitada con consentimiento.',
      ],
    },
    {
      heading: 'Bases legales',
      body: [
        'Contrato y pasos precontractuales. Interés legítimo de seguridad. Consentimiento para cookies opcionales o marketing. Obligación legal de facturas en Grecia.',
      ],
    },
    {
      heading: 'Cesiones',
      body: [
        'Solo a proveedores necesarios como GoCars, hosting y mensajería. No vendemos datos.',
      ],
    },
    {
      heading: 'Conservación',
      body: [
        'Consultas el tiempo necesario. Archivos contables según plazos griegos. Elección de cookies hasta borrar datos del sitio.',
      ],
    },
    {
      heading: 'Sus derechos',
      body: [
        'Acceso, rectificación, supresión, limitación, portabilidad u oposición, y reclamación ante la autoridad griega de protección de datos.',
      ],
    },
    {
      heading: 'Cookies',
      body: [
        'Almacenamiento esencial para idioma y elección de cookies. Herramientas opcionales solo si acepta. Ver Política de cookies (UE).',
      ],
    },
    {
      heading: 'Actualizaciones',
      body: [
        'Podemos actualizar esta política. Aplica la versión en esta URL.',
      ],
    },
  ],
  faqs: [
    { q: '¿Quién ve mi reserva?', a: 'El mostrador AGGELOS y los sistemas necesarios para confirmar y entregar.' },
    { q: '¿Puedo borrar una consulta?', a: 'Sí, por contacto. Borramos o limitamos lo que no haga falta para una reserva activa o retención legal.' },
    { q: '¿Envían marketing?', a: 'Solo con consentimiento. Los mensajes operativos de reserva no son marketing.' },
  ],
  related: [
    { to: 'legal/cookie-policy-eu', anchor: 'Política de cookies' },
    { to: 'legal/terms-conditions', anchor: 'Términos' },
    { to: 'contact/contact', anchor: 'Contacto' },
    { to: 'contact/about-us', anchor: 'Sobre nosotros' },
  ],
  finalCta: {
    heading: '¿Dudas sobre sus datos?',
    sub: 'Escriba al mostrador del puerto de Antíparos.',
    button: 'Contactar',
  },
};

export default copy;
