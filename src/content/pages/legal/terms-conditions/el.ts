import type { PageCopy } from "@/content/types";

/**
 * legal/terms-conditions , el
 *
 * Rental terms body is served from content/raw markdown (2026 edition).
 * This module holds locale-native SEO chrome and related links.
 */
export const copy: PageCopy = {
  locale: "el",

  seo: {
    title: 'Όροι και Προϋποθέσεις 2026 | AGGELOS Rentals',
    description: 'Όροι ενοικίασης 2026 για αυτοκίνητα, σκούτερ και ATV με την AGGELOS Rentals σε Πάρο και Αντίπαρο, εγγυήσεις και ακυρώσεις.',
    keywords: [],
  },

  h1: 'Όροι και Προϋποθέσεις',
  intro: 'Διαβάστε προσεκτικά τους όρους ενοικίασης για Αντίπαρο, Πάρο και Πειραιά.',

  cta: {
    primary: 'Κράτηση οχήματος',
    secondary: "",
    whatsapp: 'WhatsApp',
    call: 'Καλέστε μας',
  },

  sections: [
    { heading: 'Πεδίο εφαρμογής', body: ['Οι όροι καλύπτουν κρατήσεις και ενοικίαση με AGGELOS Rentals σε Πάρο, Αντίπαρο και σχετικά σημεία παραλαβής.'] },
    { heading: 'Σύμβαση στην παραλαβή', body: ['Το συμβόλαιο και το voucher στην παράδοση δεσμεύουν για εγγύηση, ασφάλεια και επιστροφή.'] },
    { heading: 'Ερωτήσεις', body: ['Επικοινωνήστε με το γραφείο στο λιμάνι Αντιπάρου αν κάτι δεν είναι σαφές πριν παραλάβετε.'] },
  ],

  faqs: [
    { q: 'Είναι επιστρέψιμες οι κρατήσεις;', a: 'Όχι. Όλες οι κρατήσεις για Αντίπαρο, Πάρο και Πειραιά είναι μη επιστρέψιμες.' },
    { q: 'Ποια είναι η ελάχιστη ηλικία οδηγού;', a: 'Ελάχιστη ηλικία 24 έτη, ή 26 για premium/luxury. Μέγιστη ηλικία 74 χωρίς επιβάρυνση.' },
    { q: 'Υπάρχει απεριόριστα χιλιόμετρα;', a: 'Ναι σε Αντίπαρο και Πάρο. Στον Πειραιά ισχύει όριο 150 χλμ./ημέρα.' }
  ],

  related: [
    { to: 'money/paros-rent-a-car', anchor: 'Ενοικίαση αυτοκινήτου Πάρος' },
    { to: 'money/rent-a-car-antiparos-aggelos', anchor: 'Ενοικίαση αυτοκινήτου Αντίπαρος' },
    { to: 'legal/privacy-policy', anchor: 'Πολιτική απορρήτου' }
  ],

  finalCta: { heading: 'Έτοιμοι για κράτηση;', sub: 'Δείτε ζωντανές τιμές για τις ημερομηνίες σας.', button: 'Αναζήτηση τιμών' },
};

export default copy;
