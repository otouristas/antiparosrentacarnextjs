import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "es",
  seo: {
    title: "Consejos Paros Antíparos | AGGELOS",
    description: "Consejos prácticos sobre ferries, maletas, viento y moverse. Para quien reserva con AGGELOS Rentals. AGGELOS Rentals.",
    keywords: [],
  },
  h1: "Consejos de viaje Paros y Antíparos",
  intro: "Consejos prácticos sobre ferries, maletas, viento y moverse. Para quien reserva con AGGELOS Rentals. AGGELOS Rentals.",
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
    { to: "money/rent-a-car-antiparos-aggelos", anchor: "Alquiler Antíparos · travel-tips-for-an" },
    { to: "money/paros-rent-a-car", anchor: "Alquiler Paros · travel-tips-for-an" },
    { to: "fleet", anchor: "Toda la flota · travel-tips-for-an" },
    { to: "contact/contact", anchor: "Contacto · travel-tips-for-an" },
  ],
  finalCta: {
    heading: "¿Listo para las carreteras de la isla?",
    sub: "Reserva online y recógelo en aeropuerto o puerto.",
    button: "Buscar vehículos",
  },
};

export default copy;
