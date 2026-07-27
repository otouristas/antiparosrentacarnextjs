import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "it",
  seo: {
    title: 'Informativa cookie (UE) | AGGELOS Rentals',
    description: 'Come AGGELOS Rentals usa i cookie su antiparosrentacar.com e come gestire le preferenze per Paros e Antiparos.',
    keywords: [],
  },
  h1: 'Informativa cookie (UE)',
  intro: 'Questa pagina spiega quali cookie e tecnologie simili AGGELOS Rentals usa su antiparosrentacar.com per i visitatori dello Spazio economico europeo e della Svizzera, e come controllarli.',
  cta: {
    primary: 'Cerca veicoli',
    secondary: 'Flotta',
    whatsapp: 'WhatsApp',
    call: 'Chiama',
  },
  sections: [
    {
      heading: 'Chi siamo',
      body: [
        'AGGELOS Rentals gestisce questo sito dal porto di Antiparos, Cicladi, Grecia. Per privacy su prenotazioni o sito, contattateci via pagina Contatti, telefono o WhatsApp.',
      ],
    },
    {
      heading: 'Cosa sono i cookie',
      body: [
        'I cookie sono piccoli file di testo sul dispositivo. Strumenti simili come lo storage locale possono salvare preferenze. Aiutano il sito a ricordare scelte e mantenere funzioni di base.',
      ],
    },
    {
      heading: 'Cookie su questo sito',
      body: [
        'Questo sito Next.js non è la vecchia installazione WordPress. Qui non eseguiamo WordPress, Elementor né reti pubblicitarie come Google AdSense.',
      ],
      bullets: [
        'Essenziali: memorizzano la scelta (Accetta tutti o Solo essenziali) così il banner non ripete a ogni visita.',
        'Essenziali: lingua e campi di ricerca prenotazione possono restare brevemente nel browser.',
        'Cookie opzionali di analisi o marketing solo se accetti e se gli strumenti sono attivi.',
      ],
    },
    {
      heading: 'Come gestire i cookie',
      body: [
        'Usa Accetta tutti o Solo essenziali sul banner. Cancellare i dati del sito nel browser ripristina la scelta.',
      ],
    },
    {
      heading: 'Aggiornamenti',
      body: [
        'Possiamo aggiornare questa informativa se cambiano leggi o funzioni. La versione su questo URL vale alla data della visita o prenotazione.',
      ],
    },
    {
      heading: 'Contatti',
      body: [
        'Domande su cookie o dati: Contatti, +30 694 495 0094 o WhatsApp. Indica il riferimento prenotazione se ce l\'hai.',
      ],
    },
  ],
  faqs: [
    { q: 'Devo accettare cookie opzionali per prenotare?', a: 'No. Quelli essenziali bastano per navigare e avviare una prenotazione.' },
    { q: 'Dove viene salvata la mia scelta?', a: 'Nello storage locale del browser con una chiave di consenso AGGELOS Rentals.' },
    { q: 'Sostituisce il contratto di noleggio?', a: 'No. Contratto e voucher al ritiro regolano il noleggio. Questa pagina riguarda solo i cookie del sito.' },
  ],
  related: [
    { to: 'legal/privacy-policy', anchor: 'Informativa privacy' },
    { to: 'legal/terms-conditions', anchor: 'Termini e condizioni' },
    { to: 'contact/contact', anchor: 'Contatta AGGELOS Rentals' },
    { to: 'home', anchor: 'Torna alla home' },
  ],
  finalCta: {
    heading: 'Quando sei pronto',
    sub: 'Cerca prezzi live per Paros e Antiparos, oppure chiedi al banco di famiglia.',
    button: 'Cerca veicoli',
  },
};

export default copy;
