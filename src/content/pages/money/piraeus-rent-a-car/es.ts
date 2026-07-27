import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "es",
  seo: {
    title: "El Pireo alquila un coche | AGGELOS Rentals Alquileres",
    description: "Alquila un coche en el Puerto del Pireo con AGGELOS Rentals. Elige entre una amplia gama de vehículos para un viaje sin estrés. ¡Reserva!",
    keywords: [],
  },
  h1: "Alquiler El Pireo en Grecia",
  intro: "Empieza en El Pireo antes del ferry a las Cícladas. Coordinamos con tu salida y puedes seguir en Paros o Antíparos.",
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
    { to: "money/paros-rent-a-car", anchor: "Alquiler Paros · piraeus-rent-a-car" },
    { to: "money/paros-port-parikia-rent-a-car", anchor: "Recogida en Parikia · piraeus-rent-a-car" },
    { to: "contact/contact", anchor: "Contacto · piraeus-rent-a-car" },
    { to: "fleet-category/compact", anchor: "Coches compactos · piraeus-rent-a-car" },
  ],
  finalCta: {
    heading: "¿Listo para las carreteras de la isla?",
    sub: "Reserva online y recógelo en aeropuerto o puerto.",
    button: "Buscar vehículos",
  },
};

export default copy;
