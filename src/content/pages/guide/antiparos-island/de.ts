import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "de",
  seo: {
    title: "Antiparos Reiseführer | AGGELOS",
    description: "Strände, Höhle, Hafenleben und wann sich eine Miete lohnt. Lokale Tipps von AGGELOS Rentals am Hafen. AGGELOS Rentals.",
    keywords: [],
  },
  h1: "Reiseführer Antiparos",
  intro: "Strände, Höhle, Hafenleben und wann sich eine Miete lohnt. Lokale Tipps von AGGELOS Rentals am Hafen. AGGELOS Rentals.",
  cta: {
    primary: "Verfügbarkeit prüfen",
    secondary: "Fuhrpark ansehen",
    whatsapp: "WhatsApp",
    call: "Anrufen",
  },
  sections: [
    {
      heading: "Warum mieten",
      body: ["Praktisch: Seit 1994 am Hafen von Antiparos kennen wir Fähren, Parken und den Augustverkehr.", "Kurz: Sie wählen den Treffpunkt, wir bereiten Fahrzeug und Papiere vor."],
    },
    {
      heading: "Abholung und Lieferung",
      body: ["Praktisch: Seit 1994 am Hafen von Antiparos kennen wir Fähren, Parken und den Augustverkehr."],
    },
    {
      heading: "Was Gäste wählen",
      body: ["Praktisch: Seit 1994 am Hafen von Antiparos kennen wir Fähren, Parken und den Augustverkehr."],
    },
  ],
  faqs: [
    { q: "Wo ist die Abholung?", a: "Sie wählen Flughafen, Hafen oder Unterkunft, sofern verfügbar." },
    { q: "Welchen Führerschein brauche ich?", a: "Wir prüfen die Führerscheinklasse bei der Übergabe." },
    { q: "Geht eine Inselüberfahrt?", a: "Ja bei vereinbarten One-Way-Fahrten zwischen Paros und Antiparos." },
  ],
  related: [
    { to: "money/rent-a-car-antiparos-aggelos", anchor: "Mietwagen Antiparos · antiparos-island" },
    { to: "money/paros-rent-a-car", anchor: "Mietwagen Paros · antiparos-island" },
    { to: "fleet", anchor: "Gesamter Fuhrpark · antiparos-island" },
    { to: "contact/contact", anchor: "Kontakt · antiparos-island" },
  ],
  finalCta: {
    heading: "Bereit für die Inselstraßen?",
    sub: "Online buchen, am Flughafen oder Hafen treffen, klar fahren.",
    button: "Fahrzeuge suchen",
  },
};

export default copy;
