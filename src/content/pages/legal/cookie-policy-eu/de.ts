import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "de",
  seo: {
    title: 'Cookie-Richtlinie (EU) | AGGELOS Rentals',
    description: 'Wie AGGELOS Rentals Cookies auf antiparosrentacar.com nutzt und wie Sie Einstellungen für Buchungen auf Paros und Antiparos verwalten.',
    keywords: [],
  },
  h1: 'Cookie-Richtlinie (EU)',
  intro: 'Diese Seite erklärt, welche Cookies und ähnliche Technologien AGGELOS Rentals auf antiparosrentacar.com für Besucher im Europäischen Wirtschaftsraum und in der Schweiz verwendet und wie Sie sie steuern.',
  cta: {
    primary: 'Fahrzeuge suchen',
    secondary: 'Flotte',
    whatsapp: 'WhatsApp',
    call: 'Jetzt anrufen',
  },
  sections: [
    {
      heading: 'Wer wir sind',
      body: [
        'AGGELOS Rentals betreibt diese Website vom Hafen Antiparos, Kykladen, Griechenland. Bei Datenschutzfragen zu Buchungen oder zur Website erreichen Sie uns über Kontakt, Telefon oder WhatsApp.',
      ],
    },
    {
      heading: 'Was Cookies sind',
      body: [
        'Cookies sind kleine Textdateien auf Ihrem Gerät. Ähnliche Mittel wie Local Storage speichern Präferenzen. Sie helfen der Website, Auswahl zu merken und Grundfunktionen zu halten.',
      ],
    },
    {
      heading: 'Cookies auf dieser Website',
      body: [
        'Diese Next.js-Website ist nicht die frühere WordPress-Installation. Wir betreiben hier kein WordPress, Elementor oder Werbenetzwerke wie Google AdSense.',
      ],
      bullets: [
        'Notwendig: speichert Ihre Cookie-Wahl (Alle akzeptieren oder Nur notwendige), damit das Banner nicht bei jedem Besuch erscheint.',
        'Notwendig: Sprache und Buchungsfelder können kurz im Browser gehalten werden.',
        'Optionale Analyse- oder Marketing-Cookies nur bei Zustimmung und wenn die Tools aktiv sind.',
      ],
    },
    {
      heading: 'Cookies verwalten',
      body: [
        'Nutzen Sie Alle akzeptieren oder Nur notwendige im Banner. Site-Daten im Browser löschen setzt die Wahl zurück und zeigt das Banner erneut.',
      ],
    },
    {
      heading: 'Aktualisierungen',
      body: [
        'Wir können diese Richtlinie anpassen, wenn sich Gesetze oder Funktionen ändern. Die Version unter dieser URL gilt zum Zeitpunkt Ihres Besuchs oder Ihrer Buchung.',
      ],
    },
    {
      heading: 'Kontakt',
      body: [
        'Fragen zu Cookies oder personenbezogenen Daten: Kontaktseite, +30 694 495 0094 oder WhatsApp. Nennen Sie Ihre Buchungsnummer, falls vorhanden.',
      ],
    },
  ],
  faqs: [
    { q: 'Muss ich optionale Cookies akzeptieren, um zu buchen?', a: 'Nein. Notwendige Cookies reichen zum Surfen und Starten einer Buchung.' },
    { q: 'Wo wird meine Wahl gespeichert?', a: 'Im Local Storage Ihres Browsers unter einem AGGELOS-Zustimmungsschlüssel. Site-Daten löschen entfernt sie.' },
    { q: 'Ersetzt das den Mietvertrag?', a: 'Nein. Vertrag und Voucher bei Übergabe regeln die Vermietung. Diese Seite betrifft nur Website-Cookies.' },
  ],
  related: [
    { to: 'legal/privacy-policy', anchor: 'Datenschutz' },
    { to: 'legal/terms-conditions', anchor: 'AGB' },
    { to: 'contact/contact', anchor: 'AGGELOS Rentals kontaktieren' },
    { to: 'home', anchor: 'Zur Startseite' },
  ],
  finalCta: {
    heading: 'Wann immer Sie bereit sind',
    sub: 'Live-Preise für Paros und Antiparos suchen oder das Familiendesk fragen.',
    button: 'Fahrzeuge suchen',
  },
};

export default copy;
