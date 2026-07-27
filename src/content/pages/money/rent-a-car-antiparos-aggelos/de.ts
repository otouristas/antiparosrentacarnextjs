import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "de",
  seo: {
    title: "Autovermietung Antiparos | Autos, ATVs & Roller",
    description: "Entdecken Sie Antiparos mit unseren zuverlässigen Mietwagen. Eine Auswahl an ATVs, Rollern und SUVs für Ihre Inselabenteuer.",
    keywords: [],
  },
  h1: "Mietwagen Antiparos in Griechenland",
  intro: "Die Vermietung mit Sitz am Hafen von Antiparos. Autos, Roller, ATVs und Fahrräder, damit Sie jeden Strand ohne Buswartezeit erreichen.",
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
    { to: "money/paros-rent-a-car", anchor: "Mietwagen Paros · rent-a-car-antipar" },
    { to: "money/antiparos-scooter-rentals", anchor: "Roller Antiparos · rent-a-car-antipar" },
    { to: "money/atvs-antiparos", anchor: "ATV Antiparos · rent-a-car-antipar" },
    { to: "fleet", anchor: "Gesamter Fuhrpark · rent-a-car-antipar" },
  ],
  finalCta: {
    heading: "Bereit für die Inselstraßen?",
    sub: "Online buchen, am Flughafen oder Hafen treffen, klar fahren.",
    button: "Fahrzeuge suchen",
  },
};

export default copy;
