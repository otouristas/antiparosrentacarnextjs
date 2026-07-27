import type { PageCopy } from "@/content/types";

/**
 * legal/terms-conditions , es
 *
 * Rental terms body is served from content/raw markdown (2026 edition).
 * This module holds locale-native SEO chrome and related links.
 */
export const copy: PageCopy = {
  locale: "es",

  seo: {
    title: 'Términos y condiciones 2026 | AGGELOS Rentals',
    description: 'Términos de alquiler 2026 de coches, scooters y ATV con AGGELOS Rentals en Paros y Antíparos, depósitos y cancelación.',
    keywords: [],
  },

  h1: 'Términos y condiciones',
  intro: 'Lea atentamente nuestras condiciones de alquiler para Antíparos, Paros y El Pireo.',

  cta: {
    primary: 'Reservar un coche',
    secondary: "",
    whatsapp: 'WhatsApp',
    call: 'Llámenos',
  },

  sections: [
    { heading: 'Ámbito', body: ['Estos términos cubren reservas y alquiler con AGGELOS Rentals en Paros, Antíparos y puntos de recogida relacionados.'] },
    { heading: 'Contrato en la entrega', body: ['El contrato y el bono en la recogida siguen siendo vinculantes para depósito, seguro y devolución.'] },
    { heading: 'Preguntas', body: ['Contacta la oficina del puerto de Antíparos si alguna cláusula no está clara antes de recoger.'] },
  ],

  faqs: [
    { q: '¿Las reservas son reembolsables?', a: 'No. Todas las reservas en Antíparos, Paros y El Pireo no son reembolsables.' },
    { q: '¿Cuál es la edad mínima del conductor?', a: '24 años, o 26 para coches premium/lujo. Máximo 74 sin recargo.' },
    { q: '¿El kilometraje es ilimitado?', a: 'Ilimitado en Antíparos y Paros. En El Pireo: 150 km/día.' }
  ],

  related: [
    { to: 'money/paros-rent-a-car', anchor: 'Alquiler de coches en Paros' },
    { to: 'money/rent-a-car-antiparos-aggelos', anchor: 'Alquiler de coches en Antíparos' },
    { to: 'legal/privacy-policy', anchor: 'Política de privacidad' }
  ],

  finalCta: { heading: '¿Listo para alquilar?', sub: 'Consulte precios en vivo para sus fechas.', button: 'Buscar precios' },
};

export default copy;
