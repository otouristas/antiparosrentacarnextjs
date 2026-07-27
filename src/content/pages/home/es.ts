import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "es",
  seo: {
    title: "Alquiler de Coches Antíparos & Paros | AGGELOS Rentals",
    description: "Explora Antíparos y Paros con facilidad. AGGELOS Rentals ofrece coches, scooters y ATV a precios competitivos. ¡Reserva ahora!",
    keywords: [],
  },
  h1: "Alquiler Antíparos y Paros en Grecia",
  intro: "Coches, scooters, quads y bicis desde el puerto de Antíparos desde 1994. Quedamos en aeropuerto de Paros, Parikia o Antíparos.",
  cta: {
    primary: "Ver disponibilidad",
    secondary: "Ver flota",
    whatsapp: "WhatsApp",
    call: "Llamar",
  },
  sections: [
    {
      heading: "Por qué alquilar",
      body: ["En la práctica: desde 1994 en el puerto de Antíparos conocemos ferries, parkings y el tráfico de agosto.", "En resumen: eliges el punto de recogida y preparamos el vehículo y los papeles."],
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
    { to: "money/paros-rent-a-car", anchor: "Alquiler Paros · home" },
    { to: "money/rent-a-car-antiparos-aggelos", anchor: "Alquiler Antíparos · home" },
    { to: "fleet", anchor: "Toda la flota · home" },
    { to: "guide/antiparos-island", anchor: "Enlace 4 · home" },
  ],
  finalCta: {
    heading: "¿Listo para las carreteras de la isla?",
    sub: "Reserva online y recógelo en aeropuerto o puerto.",
    button: "Buscar vehículos",
  },
};

export default copy;
