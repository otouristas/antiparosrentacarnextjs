import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "es",
  seo: {
    title: "Alquiler de Coches y Motos en Paros | AGGELOS Rentals",
    description: "Rent a car on Paros island with AGGELOS Rentals. Book online in 60 seconds for airport, port and island pickup with trusted local service since 1994.",
    keywords: [],
  },
  h1: "Alquiler Paros en Grecia",
  intro: "Recorre Paros con flota local desde Antíparos. Recogida en aeropuerto (PAS) o puerto de Parikia, tarifas claras y WhatsApp rápido.",
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
      body: ["En la práctica: desde 1994 en el puerto de Antíparos conocemos ferries, parkings y el tráfico de agosto.", "En resumen: eliges el punto de recogida y preparamos el vehículo y los papeles."],
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
    { to: "money/paros-airport-rent-a-car-port", anchor: "Recogida en aeropuerto · paros-rent-a-car" },
    { to: "money/paros-port-parikia-rent-a-car", anchor: "Recogida en Parikia · paros-rent-a-car" },
    { to: "money/rent-a-car-antiparos-aggelos", anchor: "Alquiler Antíparos · paros-rent-a-car" },
    { to: "fleet-category/compact", anchor: "Coches compactos · paros-rent-a-car" },
  ],
  finalCta: {
    heading: "¿Listo para las carreteras de la isla?",
    sub: "Reserva online y recógelo en aeropuerto o puerto.",
    button: "Buscar vehículos",
  },
};

export default copy;
