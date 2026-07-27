import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "es",
  seo: {
    title: "Guía Paros | AGGELOS Rentals",
    description: "Pueblos, playas y llegada a Paros, con consejos sinceros sobre alquilar coche o scooter con AGGELOS Rentals en las islas.",
    keywords: [],
  },
  h1: "Guía de viaje de Paros",
  intro: "Pueblos, playas y llegada a Paros, con consejos sinceros sobre alquilar con AGGELOS Rentals. AGGELOS Rentals.",
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
    { to: "money/rent-a-car-antiparos-aggelos", anchor: "Alquiler Antíparos · paros-island" },
    { to: "money/paros-rent-a-car", anchor: "Alquiler Paros · paros-island" },
    { to: "fleet", anchor: "Toda la flota · paros-island" },
    { to: "contact/contact", anchor: "Contacto · paros-island" },
  ],
  finalCta: {
    heading: "¿Listo para las carreteras de la isla?",
    sub: "Reserva online y recógelo en aeropuerto o puerto.",
    button: "Buscar vehículos",
  },
};

export default copy;
