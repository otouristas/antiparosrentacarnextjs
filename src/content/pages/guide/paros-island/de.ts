import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "de",
  seo: {
    title: "Paros Reiseführer | AGGELOS",
    description: "Dörfer, Strände und Anreise auf Paros, plus ehrliche Tipps zur Autovermietung bei AGGELOS Rentals auf den Inseln.",
    keywords: [],
  },
  h1: "Reiseführer Paros",
  intro: "Dörfer, Strände und Anreise auf Paros, plus ehrliche Miettipps von AGGELOS Rentals. AGGELOS Rentals.",
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
    { to: "money/rent-a-car-antiparos-aggelos", anchor: "Mietwagen Antiparos · paros-island" },
    { to: "money/paros-rent-a-car", anchor: "Mietwagen Paros · paros-island" },
    { to: "fleet", anchor: "Gesamter Fuhrpark · paros-island" },
    { to: "contact/contact", anchor: "Kontakt · paros-island" },
  ],
  finalCta: {
    heading: "Bereit für die Inselstraßen?",
    sub: "Online buchen, am Flughafen oder Hafen treffen, klar fahren.",
    button: "Fahrzeuge suchen",
  },
};

export default copy;
