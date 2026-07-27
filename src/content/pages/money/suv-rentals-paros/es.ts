import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "es",
  seo: {
    title: "SUV Rentals Paros | Jeep & Mercedes | AGGELOS",
    description: "Alquila un SUV premium en Paros con AGGELOS Rentals. Modelos top como Mercedes-Benz GLB y Jeep Renegade. ¡Reserva tu SUV online hoy!",
    keywords: [],
  },
  h1: "Alquiler SUV Paros en Grecia",
  intro: "SUV y jeeps en Paros para familias, maletas y accesos de playa irregulares.",
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
    { to: "money/paros-rent-a-car", anchor: "Alquiler Paros · suv-rentals-paros" },
    { to: "fleet-category/suvs", anchor: "SUV y 4x4 · suv-rentals-paros" },
    { to: "money/paros-airport-rent-a-car-port", anchor: "Recogida en aeropuerto · suv-rentals-paros" },
    { to: "fleet-category/people-carriers", anchor: "Monovolúmenes · suv-rentals-paros" },
  ],
  finalCta: {
    heading: "¿Listo para las carreteras de la isla?",
    sub: "Reserva online y recógelo en aeropuerto o puerto.",
    button: "Buscar vehículos",
  },
};

export default copy;
