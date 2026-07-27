import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "de",
  seo: {
    title: "Autovermietung Antiparos & Paros | AGGELOS Rentals",
    description: "Entdecken Sie Antiparos und Paros ganz bequem. AGGELOS Rentals bietet Autos, Roller und Quads zu günstigen Preisen. Buchen Sie jetzt für eine entspannte Fahrt!",
    keywords: [],
  },
  h1: "Mietwagen Antiparos & Paros in Griechenland",
  intro: "Autos, Roller, ATVs und Fahrräder seit 1994 am Hafen von Antiparos. Treffpunkt Flughafen Paros, Parikia oder Antiparos.",
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
    { to: "money/paros-rent-a-car", anchor: "Mietwagen Paros · home" },
    { to: "money/rent-a-car-antiparos-aggelos", anchor: "Mietwagen Antiparos · home" },
    { to: "fleet", anchor: "Gesamter Fuhrpark · home" },
    { to: "guide/antiparos-island", anchor: "Link 4 · home" },
  ],
  finalCta: {
    heading: "Bereit für die Inselstraßen?",
    sub: "Online buchen, am Flughafen oder Hafen treffen, klar fahren.",
    button: "Fahrzeuge suchen",
  },
};

export default copy;
