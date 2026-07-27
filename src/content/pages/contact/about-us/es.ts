import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "es",
  seo: {
    title: "Sobre nosotros | AGGELOS · Grecia",
    description: "En la práctica: desde 1994 en el puerto de Antíparos conocemos ferries, parkings y el tráfico de agosto. AGGELOS Rentals.",
    keywords: [],
  },
  h1: "Sobre nosotros en Grecia",
  intro: "En la práctica: desde 1994 en el puerto de Antíparos conocemos ferries, parkings y el tráfico de agosto.",
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
    { to: "contact/contact", anchor: "Contacto · about-us" },
    { to: "money/rent-a-car-antiparos-aggelos", anchor: "Alquiler Antíparos · about-us" },
    { to: "fleet", anchor: "Toda la flota · about-us" },
    { to: "home", anchor: "Enlace 4 · about-us" },
  ],
  finalCta: {
    heading: "¿Listo para las carreteras de la isla?",
    sub: "Reserva online y recógelo en aeropuerto o puerto.",
    button: "Buscar vehículos",
  },
};

export default copy;
