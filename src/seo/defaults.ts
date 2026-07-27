import type { Locale } from "@/i18n/routing";

/**
 * Site-level fallback title and description, written natively per locale.
 *
 * These are complete strings. No brand template is appended anywhere.
 * Kept in sync with content/seo-meta.json (home).
 */
export type SiteDefault = {
  title: string;
  description: string;
  skipToContent: string;
};

export const SITE_DEFAULTS: Record<Locale, SiteDefault> = {
  en: {
    title: "Antiparos & Paros Rent a Car | AGGELOS Rentals",
    description:
      "Explore Antiparos and Paros with ease. AGGELOS Rentals offers cars, scooters, and ATVs at competitive rates. Book now for a smooth ride!",
    skipToContent: "Skip to content",
  },
  el: {
    title: "Ενοικίαση Αυτοκινήτου Αντίπαρος & Πάρος | AGGELOS Rentals",
    description:
      "Ενοικιάσεις αυτοκινήτων στην Αντίπαρο και την Πάρο. Η AGGELOS Rentals προσφέρει αυτοκίνητα, σκούτερ και ATV σε ανταγωνιστικές τιμές. Κάντε κράτηση!",
    skipToContent: "Μετάβαση στο περιεχόμενο",
  },
  de: {
    title: "Autovermietung Antiparos & Paros | AGGELOS Rentals",
    description:
      "Entdecken Sie Antiparos und Paros ganz bequem. AGGELOS Rentals bietet Autos, Roller und Quads zu günstigen Preisen. Buchen Sie jetzt für eine entspannte Fahrt!",
    skipToContent: "Zum Inhalt springen",
  },
  fr: {
    title: "Location Voiture Antiparos & Paros | AGGELOS Rentals",
    description:
      "Explorez Antiparos et Paros en toute simplicité. AGGELOS Rentals propose voitures, scooters et ATV à prix compétitifs. Réservez vite !",
    skipToContent: "Aller au contenu",
  },
  es: {
    title: "Alquiler de Coches Antíparos & Paros | AGGELOS Rentals",
    description:
      "Explora Antíparos y Paros con facilidad. AGGELOS Rentals ofrece coches, scooters y ATV a precios competitivos. ¡Reserva ahora!",
    skipToContent: "Ir al contenido",
  },
  it: {
    title: "Autonoleggio Antiparos & Paros | AGGELOS Rentals",
    description:
      "Esplora Antiparos e Paros in tutta comodità. AGGELOS Rentals offre auto, scooter e quad a prezzi competitivi. Prenota ora per un viaggio senza pensieri!",
    skipToContent: "Vai al contenuto",
  },
  nl: {
    title: "Auto Huren Antiparos & Paros | AGGELOS Rentals",
    description:
      "Ontdek Antiparos en Paros met gemak. AGGELOS Rentals biedt auto's, scooters en ATV's aan tegen scherpe prijzen. Boek nu voor een soepele rit!",
    skipToContent: "Naar de inhoud",
  },
  sv: {
    title: "Hyrbil Antiparos & Paros | AGGELOS Rentals",
    description:
      "Utforska Antiparos och Paros med lätthet. AGGELOS Rentals erbjuder bilar, skotrar och fyrhjulingar till konkurrenskraftiga priser. Boka nu för en smidig resa!",
    skipToContent: "Hoppa till innehåll",
  },
  pt: {
    title: "Aluguer de Carros Antíparos & Paros | AGGELOS Rentals",
    description:
      "Explore Antíparos e Paros com facilidade. A AGGELOS Rentals oferece carros, scooters e ATV a preços competitivos. Reserve já!",
    skipToContent: "Ir para o conteúdo",
  },
  ru: {
    title: "Аренда авто Антипарос и Парос | AGGELOS Rentals",
    description:
      "Исследуйте Антипарос и Парос с лёгкостью. AGGELOS Rentals предлагает авто, скутеры и квадроциклы по выгодным ценам. Бронируйте!",
    skipToContent: "Перейти к содержимому",
  },
  tr: {
    title: "Antiparos & Paros Araç Kiralama | AGGELOS Rentals",
    description:
      "Antiparos ve Paros'u rahatça keşfedin. AGGELOS Rentals uygun fiyatlarla araba, scooter ve ATV sunar. Hemen rezervasyon yapın!",
    skipToContent: "İçeriğe geç",
  },
};
