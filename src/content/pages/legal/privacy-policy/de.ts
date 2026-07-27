import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "de",
  seo: {
    title: "Datenschutz | AGGELOS Rentals",
    description: "Datenschutzerklärung: Lesen Sie diese Richtlinie zu Buchungen und Website-Nutzung von AGGELOS Rentals auf Paros und Antiparos. Kontakt bei Mietfragen.",
    keywords: [],
  },
  h1: "Datenschutzerklärung",
  intro: "Datenschutzerklärung: Lesen Sie diese Richtlinie zu Buchungen und Website-Nutzung von AGGELOS Rentals auf Paros und Antiparos. Kontakt bei Mietfragen.",
  cta: {
    primary: "Verfügbarkeit prüfen",
    secondary: "Fuhrpark ansehen",
    whatsapp: "WhatsApp",
    call: "Anrufen",
  },
  sections: [
    {
      heading: "Warum mieten",
      body: ["Praktisch: Seit 1994 am Hafen von Antiparos kennen wir Fähren, Parken und den Augustverkehr."],
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
    { to: "contact/contact", anchor: "Kontakt · privacy-policy" },
    { to: "contact/about-us", anchor: "Link 2 · privacy-policy" },
    { to: "home", anchor: "Link 3 · privacy-policy" },
    { to: "money/paros-rent-a-car", anchor: "Mietwagen Paros · privacy-policy" },
  ],
  finalCta: {
    heading: "Bereit für die Inselstraßen?",
    sub: "Online buchen, am Flughafen oder Hafen treffen, klar fahren.",
    button: "Fahrzeuge suchen",
  },
};

export default copy;
