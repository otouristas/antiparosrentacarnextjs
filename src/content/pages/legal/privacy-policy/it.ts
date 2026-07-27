import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "it",
  seo: {
    title: 'Informativa privacy | AGGELOS Rentals',
    description: 'Come AGGELOS Rentals tratta i dati personali per prenotazioni e sito su Paros e Antiparos, e come esercitare i tuoi diritti.',
    keywords: [],
  },
  h1: 'Informativa sulla privacy',
  intro: 'Questa informativa spiega come AGGELOS Rentals tratta i dati personali quando navighi su antiparosrentacar.com, chiedi un preventivo o prenoti un veicolo per Paros e Antiparos.',
  cta: {
    primary: 'Contatti',
    secondary: 'Cookie',
    whatsapp: 'WhatsApp',
    call: 'Chiama',
  },
  sections: [
    {
      heading: 'Titolare',
      body: [
        'AGGELOS Rentals, Porto di Antiparos, 840 07 Antiparos, Cicladi, Grecia. Contatti: aggelos@antiparosrentacar.com, +30 694 495 0094 o WhatsApp.',
      ],
    },
    {
      heading: 'Dati raccolti',
      body: [
        'A seconda dell\'uso possiamo trattare:',
      ],
      bullets: [
        'Dati di contatto da moduli o chat.',
        'Dettagli prenotazione: luoghi, date, fascia d\'età, preferenze.',
        'Dati tecnici del sito e scelta cookie.',
        'Messaggi sul noleggio.',
      ],
    },
    {
      heading: 'Finalità',
      body: [
        'Rispondere, gestire prenotazioni, consegnare veicoli, obblighi contabili, affidabilità del sito e analitiche limitate con consenso.',
      ],
    },
    {
      heading: 'Basi giuridiche',
      body: [
        'Contratto e passi precontrattuali. Interesse legittimo per la sicurezza. Consenso per cookie opzionali o marketing. Obbligo di legge per fatture in Grecia.',
      ],
    },
    {
      heading: 'Condivisione',
      body: [
        'Solo con fornitori necessari come GoCars, hosting e messaggistica. Nessuna vendita di dati.',
      ],
    },
    {
      heading: 'Conservazione',
      body: [
        'Richieste per il tempo necessario. Archivi contabili secondo i termini greci. Scelta cookie fino alla cancellazione dei dati del sito.',
      ],
    },
    {
      heading: 'I tuoi diritti',
      body: [
        'Accesso, rettifica, cancellazione, limitazione, portabilità o opposizione, e reclamo all\'autorità greca.',
      ],
    },
    {
      heading: 'Cookie',
      body: [
        'Archiviazione essenziale per lingua e scelta cookie. Strumenti opzionali solo se accetti. Vedi informativa cookie (UE).',
      ],
    },
    {
      heading: 'Aggiornamenti',
      body: [
        'Possiamo aggiornare questa informativa. Vale la versione su questo URL.',
      ],
    },
  ],
  faqs: [
    { q: 'Chi vede la mia prenotazione?', a: 'Il banco AGGELOS e i sistemi necessari a conferma e consegna.' },
    { q: 'Posso cancellare una richiesta?', a: 'Sì, via contatti. Cancelliamo o limitiamo ciò che non serve a una prenotazione attiva o a obblighi di legge.' },
    { q: 'Inviate marketing?', a: 'Solo con consenso. I messaggi operativi di prenotazione non sono marketing.' },
  ],
  related: [
    { to: 'legal/cookie-policy-eu', anchor: 'Informativa cookie' },
    { to: 'legal/terms-conditions', anchor: 'Termini' },
    { to: 'contact/contact', anchor: 'Contatti' },
    { to: 'contact/about-us', anchor: 'Chi siamo' },
  ],
  finalCta: {
    heading: 'Domande sui tuoi dati?',
    sub: 'Scrivi al banco del porto di Antiparos.',
    button: 'Contattaci',
  },
};

export default copy;
