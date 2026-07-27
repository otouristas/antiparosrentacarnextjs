import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "es",
  seo: {
    title: "Política de privacidad | AGGELOS",
    description: "Política de privacidad: Lee esta política sobre reservas y uso del sitio de AGGELOS Rentals en Paros y Antíparos. Contáctanos con dudas de alquiler.",
    keywords: [],
  },
  h1: "Política de privacidad",
  intro: "Política de privacidad: Lee esta política sobre reservas y uso del sitio de AGGELOS Rentals en Paros y Antíparos. Contáctanos con dudas de alquiler.",
  cta: {
    primary: "Ver disponibilidad",
    secondary: "Ver flota",
    whatsapp: "WhatsApp",
    call: "Llamar",
  },
  sections: [
    {
      heading: "Por qué alquilar",
      body: ["En la práctica: desde 1994 en el puerto de Antíparos conocemos ferries, parkings y el tráfico de agosto."],
    },
    {
      heading: "Recogida y entrega",
      body: ["En la práctica: desde 1994 en el puerto de Antíparos conocemos ferries, parkings y el tráfico de agosto."],
    },
    {
      heading: "Lo que suelen elegir",
      body: ["En la práctica: desde 1994 en el puerto de Antíparos conocemos ferries, parkings y el tráfico de agosto."],
    },
  ],
  faqs: [
    { q: "¿Dónde recojo el vehículo?", a: "Elige aeropuerto, puerto o hotel si está disponible." },
    { q: "¿Qué carnet necesito?", a: "Confirmamos la categoría del carnet en la entrega." },
    { q: "¿Puedo ir a Antíparos?", a: "Sí en trayectos de ida acordados." },
  ],
  related: [
    { to: "contact/contact", anchor: "Contacto · privacy-policy" },
    { to: "contact/about-us", anchor: "Enlace 2 · privacy-policy" },
    { to: "home", anchor: "Enlace 3 · privacy-policy" },
    { to: "money/paros-rent-a-car", anchor: "Alquiler Paros · privacy-policy" },
  ],
  finalCta: {
    heading: "¿Listo para las carreteras de la isla?",
    sub: "Reserva online y recógelo en aeropuerto o puerto.",
    button: "Buscar vehículos",
  },
};

export default copy;
