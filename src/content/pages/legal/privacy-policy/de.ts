import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "de",
  seo: {
    title: 'Datenschutz | AGGELOS Rentals',
    description: 'Wie AGGELOS Rentals personenbezogene Daten für Buchungen und die Website auf Paros und Antiparos verarbeitet und wie Sie Ihre Rechte ausüben.',
    keywords: [],
  },
  h1: 'Datenschutzerklärung',
  intro: 'Diese Erklärung beschreibt, wie AGGELOS Rentals personenbezogene Daten verarbeitet, wenn Sie antiparosrentacar.com nutzen, ein Angebot anfragen oder ein Fahrzeug für Paros und Antiparos buchen.',
  cta: {
    primary: 'Kontakt',
    secondary: 'Cookies',
    whatsapp: 'WhatsApp',
    call: 'Anrufen',
  },
  sections: [
    {
      heading: 'Verantwortlicher',
      body: [
        'AGGELOS Rentals, Hafen Antiparos, 840 07 Antiparos, Kykladen, Griechenland. Kontakt: aggelos@antiparosrentacar.com, +30 694 495 0094 oder WhatsApp.',
      ],
    },
    {
      heading: 'Welche Daten wir erheben',
      body: [
        'Je nach Nutzung können wir verarbeiten:',
      ],
      bullets: [
        'Kontaktdaten aus Formularen oder Chat.',
        'Buchungsdaten: Orte, Daten, Altersgruppe, Fahrzeugwünsche.',
        'Technische Daten für den Betrieb der Website und Cookie-Einwilligung.',
        'Nachrichten zu Ihrer Miete.',
      ],
    },
    {
      heading: 'Zwecke',
      body: [
        'Anfragen beantworten, Buchungen führen, Fahrzeuge übergeben, gesetzliche Pflichten erfüllen, die Website sichern und bei Einwilligung begrenzte Analysen.',
      ],
    },
    {
      heading: 'Rechtsgrundlagen',
      body: [
        'Vertrag und vorvertragliche Schritte. Berechtigte Interessen für Sicherheit. Einwilligung für optionale Cookies oder Marketing. Gesetzliche Pflichten für Rechnungen in Griechenland.',
      ],
    },
    {
      heading: 'Weitergabe',
      body: [
        'Nur an nötige Dienstleister wie GoCars, Hosting und Messaging. Kein Verkauf personenbezogener Daten.',
      ],
    },
    {
      heading: 'Speicherdauer',
      body: [
        'Anfragen so lange wie nötig. Buchhaltungsdaten nach griechischen Fristen. Cookie-Wahl bis zur Löschung der Site-Daten.',
      ],
    },
    {
      heading: 'Ihre Rechte',
      body: [
        'Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit oder Widerspruch sowie Beschwerde bei der griechischen Datenschutzbehörde.',
      ],
    },
    {
      heading: 'Cookies',
      body: [
        'Notwendige Speicherung für Sprache und Cookie-Wahl. Optionale Tools nur nach Zustimmung. Details in der Cookie-Richtlinie (EU).',
      ],
    },
    {
      heading: 'Aktualisierungen',
      body: [
        'Wir können diese Erklärung anpassen. Es gilt die Version unter dieser URL.',
      ],
    },
  ],
  faqs: [
    { q: 'Wer sieht meine Buchungsdaten?', a: 'Das AGGELOS-Team und Systeme, die Bestätigung und Übergabe ermöglichen.' },
    { q: 'Kann ich eine Anfrage löschen lassen?', a: 'Ja, per Kontakt. Wir löschen oder beschränken Daten ohne laufende Buchung oder gesetzliche Pflicht.' },
    { q: 'Senden Sie Marketing-Mails?', a: 'Nur mit Einwilligung. Operative Buchungsnachrichten sind kein Marketing.' },
  ],
  related: [
    { to: 'legal/cookie-policy-eu', anchor: 'Cookie-Richtlinie' },
    { to: 'legal/terms-conditions', anchor: 'AGB' },
    { to: 'contact/contact', anchor: 'Kontakt' },
    { to: 'contact/about-us', anchor: 'Über uns' },
  ],
  finalCta: {
    heading: 'Fragen zu Ihren Daten?',
    sub: 'Schreiben Sie dem Schalter am Hafen Antiparos.',
    button: 'Kontakt',
  },
};

export default copy;
