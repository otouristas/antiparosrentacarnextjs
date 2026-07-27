/**
 * One-shot generator for content/seo-meta.json.
 * Produces unique native title/description per locale for every indexable route.
 * Run: node scripts/generate-seo-meta.mjs
 */
import { writeFileSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const LOCALES = ["en", "el", "fr", "es", "it", "de", "nl", "sv", "pt", "ru", "tr"];
const BRAND = "AGGELOS Rentals";
const TITLE_MIN = 25;
const TITLE_MAX = 65;
const DESC_MIN = 110;
const DESC_MAX = 160;

const fleet = JSON.parse(readFileSync(join(ROOT, "data/fleet.json"), "utf8"));

function len(s) {
  return [...s].length;
}

function clip(s, max) {
  if (len(s) <= max) return s;
  const chars = [...s];
  let cut = chars.slice(0, max - 1).join("");
  const lastSpace = cut.lastIndexOf(" ");
  if (lastSpace > max * 0.6) cut = cut.slice(0, lastSpace);
  return cut.replace(/[,:;\s]+$/, "") + ".";
}

function ensureDesc(s) {
  let out = s.replace(/[—–]/g, ",").replace(/\s+/g, " ").trim();
  if (len(out) > DESC_MAX) out = clip(out, DESC_MAX);
  if (len(out) < DESC_MIN) {
    const pad =
      " Book online with free cancellation and island pickup from our Antiparos desk.";
    // locale-agnostic pad only as last resort; prefer authored length
    while (len(out) < DESC_MIN) out = (out + pad).trim();
    if (len(out) > DESC_MAX) out = clip(out, DESC_MAX);
  }
  return out;
}

function ensureTitle(s) {
  let out = s.replace(/[—–]/g, ",").replace(/\s+/g, " ").trim();
  if (len(out) > TITLE_MAX) {
    // drop brand if needed
    const without = out.replace(new RegExp(`\\s*\\|\\s*${BRAND}$`), "");
    if (len(without) <= TITLE_MAX) out = without;
    else out = clip(without, TITLE_MAX).replace(/\.$/, "");
  }
  if (len(out) < TITLE_MIN) out = `${out} | ${BRAND}`;
  if (len(out) > TITLE_MAX) out = clip(out, TITLE_MAX).replace(/\.$/, "");
  return out;
}

function L(map) {
  const out = {};
  for (const loc of LOCALES) {
    if (!map[loc]) throw new Error(`Missing locale ${loc} in map`);
    out[loc] = {
      title: ensureTitle(map[loc].title),
      description: ensureDesc(map[loc].description),
    };
  }
  return out;
}

/** Shared fillers that keep descriptions in range, unique per locale. */
const trust = {
  en: "Free cancellation. Family-run since 1994.",
  el: "Δωρεάν ακύρωση. Οικογενειακή επιχείρηση από το 1994.",
  fr: "Annulation gratuite. Entreprise familiale depuis 1994.",
  es: "Cancelación gratuita. Empresa familiar desde 1994.",
  it: "Cancellazione gratuita. Azienda familiare dal 1994.",
  de: "Kostenfrei stornierbar. Familiengeführt seit 1994.",
  nl: "Gratis annuleren. Familiebedrijf sinds 1994.",
  sv: "Fri avbokning. Familjeföretag sedan 1994.",
  pt: "Cancelamento grátis. Empresa familiar desde 1994.",
  ru: "Бесплатная отмена. Семейный прокат с 1994 года.",
  tr: "Ücretsiz iptal. 1994'ten beri aile işletmesi.",
};

const pickup = {
  en: "Pickup at Antiparos Port, Paros Airport, or Parikia.",
  el: "Παραλαβή σε λιμάνι Αντιπάρου, αεροδρόμιο Πάρου ή Παροικία.",
  fr: "Prise en charge au port d'Antiparos, à l'aéroport ou à Parikia.",
  es: "Recogida en el puerto de Antíparos, aeropuerto de Paros o Parikia.",
  it: "Ritiro al porto di Antiparos, aeroporto di Paros o Parikia.",
  de: "Übergabe am Hafen Antiparos, Flughafen Paros oder in Parikia.",
  nl: "Ophalen in Antiparos-haven, Paros Airport of Parikia.",
  sv: "Hämtning i Antiparos hamn, Paros flygplats eller Parikia.",
  pt: "Recolha no porto de Antíparos, aeroporto de Paros ou Parikia.",
  ru: "Подача в порт Антипароса, аэропорт Пароса или Парикию.",
  tr: "Antiparos limanı, Paros havalimanı veya Parikia teslimi.",
};

function pack(titleBy, descBy) {
  const map = {};
  for (const loc of LOCALES) {
    map[loc] = {
      title: titleBy[loc],
      description: `${descBy[loc]} ${trust[loc]}`.trim(),
    };
  }
  return L(map);
}

const seo = {};

// ─── HOME ───────────────────────────────────────────────────────────
seo.home = L({
  en: {
    title: `Antiparos & Paros Rent a Car | ${BRAND}`,
    description: `Cars, scooters, ATVs and bikes on Antiparos and Paros since 1994. Airport, port and hotel delivery with free cancellation.`,
  },
  el: {
    title: `Ενοικίαση Αυτοκινήτου Αντίπαρος & Πάρος | ${BRAND}`,
    description: `Αυτοκίνητα, σκούτερ, γουρούνες και ποδήλατα σε Αντίπαρο και Πάρο από το 1994. Παράδοση σε αεροδρόμιο, λιμάνι και ξενοδοχείο.`,
  },
  fr: {
    title: `Location de voiture Antiparos & Paros | ${BRAND}`,
    description: `Voitures, scooters, quads et vélos à Antiparos et Paros depuis 1994. Livraison aéroport, port ou hôtel, annulation gratuite.`,
  },
  es: {
    title: `Alquiler de coches Antíparos y Paros | ${BRAND}`,
    description: `Coches, scooters, quads y bicicletas en Antíparos y Paros desde 1994. Entrega en aeropuerto, puerto y hotel, cancelación gratis.`,
  },
  it: {
    title: `Noleggio auto Antiparos e Paros | ${BRAND}`,
    description: `Auto, scooter, quad e bici ad Antiparos e Paros dal 1994. Consegna in aeroporto, porto o hotel, con cancellazione gratuita.`,
  },
  de: {
    title: `Mietwagen Antiparos & Paros | ${BRAND}`,
    description: `Autos, Roller, Quads und Fahrräder auf Antiparos und Paros seit 1994. Übergabe am Flughafen, Hafen oder Hotel, kostenfrei stornierbar.`,
  },
  nl: {
    title: `Auto huren Antiparos & Paros | ${BRAND}`,
    description: `Auto's, scooters, quads en fietsen op Antiparos en Paros sinds 1994. Levering op luchthaven, haven of hotel, gratis annuleren.`,
  },
  sv: {
    title: `Hyrbil Antiparos & Paros | ${BRAND}`,
    description: `Bilar, scootrar, fyrhjulingar och cyklar på Antiparos och Paros sedan 1994. Leverans till flygplats, hamn eller hotell.`,
  },
  pt: {
    title: `Aluguer de carros Antíparos e Paros | ${BRAND}`,
    description: `Carros, scooters, quads e bicicletas em Antíparos e Paros desde 1994. Entrega no aeroporto, porto ou hotel, cancelamento grátis.`,
  },
  ru: {
    title: `Аренда авто Антипарос и Парос | ${BRAND}`,
    description: `Авто, скутеры, квадроциклы и велосипеды на Антипаросе и Паросе с 1994 года. Подача в аэропорт, порт и отель.`,
  },
  tr: {
    title: `Antiparos ve Paros Araç Kiralama | ${BRAND}`,
    description: `Antiparos ve Paros'ta 1994'ten beri otomobil, scooter, ATV ve bisiklet. Havalimanı, liman ve otel teslimi, ücretsiz iptal.`,
  },
});

// ─── MONEY PAGES ────────────────────────────────────────────────────
const money = {
  "money/paros-rent-a-car": {
    en: { title: `Paros Rent a Car | ${BRAND}`, d: `Rent a car on Paros with island pickup at the airport, Parikia port, or your villa.` },
    el: { title: `Ενοικίαση Αυτοκινήτου Πάρος | ${BRAND}`, d: `Ενοικιάστε αυτοκίνητο στην Πάρο με παραλαβή στο αεροδρόμιο, την Παροικία ή τη βίλα σας.` },
    fr: { title: `Location de voiture à Paros | ${BRAND}`, d: `Louez une voiture à Paros avec prise en charge à l'aéroport, au port de Parikia ou à votre villa.` },
    es: { title: `Alquiler de coches en Paros | ${BRAND}`, d: `Alquile un coche en Paros con recogida en el aeropuerto, el puerto de Parikia o su villa.` },
    it: { title: `Noleggio auto a Paros | ${BRAND}`, d: `Noleggia un'auto a Paros con ritiro in aeroporto, al porto di Parikia o in villa.` },
    de: { title: `Mietwagen auf Paros | ${BRAND}`, d: `Mieten Sie ein Auto auf Paros mit Übergabe am Flughafen, in Parikia oder an Ihrer Villa.` },
    nl: { title: `Auto huren op Paros | ${BRAND}`, d: `Huur een auto op Paros met ophalen op de luchthaven, in Parikia of bij uw villa.` },
    sv: { title: `Hyrbil på Paros | ${BRAND}`, d: `Hyr bil på Paros med upphämtning på flygplatsen, i Parikia eller vid din villa.` },
    pt: { title: `Aluguer de carros em Paros | ${BRAND}`, d: `Alugue um carro em Paros com recolha no aeroporto, no porto de Parikia ou na sua villa.` },
    ru: { title: `Аренда авто на Паросе | ${BRAND}`, d: `Арендуйте авто на Паросе с подачей в аэропорт, порт Парикия или к вашей вилле.` },
    tr: { title: `Paros Araç Kiralama | ${BRAND}`, d: `Paros'ta havalimanı, Parikia limanı veya villanızda teslim ile araç kiralayın.` },
  },
  "money/rent-a-car-antiparos-aggelos": {
    en: { title: `Antiparos Rent a Car | ${BRAND}`, d: `Local Antiparos car rental from our port office. Meet us at the ferry, helipad, or your villa.` },
    el: { title: `Ενοικίαση Αυτοκινήτου Αντίπαρος | ${BRAND}`, d: `Τοπική ενοικίαση στην Αντίπαρο από το γραφείο στο λιμάνι. Συνάντηση στο φέρι, ελικοδρόμιο ή βίλα.` },
    fr: { title: `Location de voiture Antiparos | ${BRAND}`, d: `Location locale à Antiparos depuis notre bureau au port. Rendez-vous au ferry, héliport ou villa.` },
    es: { title: `Alquiler de coches Antíparos | ${BRAND}`, d: `Alquiler local en Antíparos desde nuestra oficina en el puerto. Quedamos en el ferry, helipuerto o villa.` },
    it: { title: `Noleggio auto Antiparos | ${BRAND}`, d: `Noleggio locale ad Antiparos dal nostro ufficio al porto. Ci troviamo al traghetto, eliporto o villa.` },
    de: { title: `Mietwagen Antiparos | ${BRAND}`, d: `Lokaler Mietwagen auf Antiparos von unserem Büro am Hafen. Treffpunkt Fähre, Helipad oder Villa.` },
    nl: { title: `Auto huren Antiparos | ${BRAND}`, d: `Lokale autoverhuur op Antiparos vanaf ons kantoor in de haven. Afspraak bij ferry, helipad of villa.` },
    sv: { title: `Hyrbil Antiparos | ${BRAND}`, d: `Lokal biluthyrning på Antiparos från vårt kontor i hamnen. Möte vid färja, helikopterplatta eller villa.` },
    pt: { title: `Aluguer de carros Antíparos | ${BRAND}`, d: `Aluguer local em Antíparos a partir do nosso escritório no porto. Encontro no ferry, heliporto ou villa.` },
    ru: { title: `Аренда авто на Антипаросе | ${BRAND}`, d: `Местный прокат на Антипаросе из офиса в порту. Встреча у парома, вертолетной площадки или виллы.` },
    tr: { title: `Antiparos Araç Kiralama | ${BRAND}`, d: `Antiparos liman ofisimizden yerel kiralama. Feribot, helikopter pisti veya villada buluşalım.` },
  },
  "money/paros-airport-rent-a-car-port": {
    en: { title: `Paros Airport Rent a Car | ${BRAND}`, d: `Land at Paros Airport (PAS) and collect your rental car fast. Clear meeting point and island-ready vehicles.` },
    el: { title: `Ενοικίαση στο Αεροδρόμιο Πάρου | ${BRAND}`, d: `Φτάστε στο αεροδρόμιο Πάρου (PAS) και παραλάβετε γρήγορα. Καθαρό σημείο συνάντησης και έτοιμα οχήματα.` },
    fr: { title: `Location aéroport de Paros | ${BRAND}`, d: `Atterrissez à l'aéroport de Paros (PAS) et récupérez vite votre voiture. Point de rendez-vous clair.` },
    es: { title: `Alquiler aeropuerto de Paros | ${BRAND}`, d: `Llegue al aeropuerto de Paros (PAS) y recoja su coche rápido. Punto de encuentro claro y coches listos.` },
    it: { title: `Noleggio aeroporto di Paros | ${BRAND}`, d: `Arriva all'aeroporto di Paros (PAS) e ritira subito l'auto. Punto di incontro chiaro e veicoli pronti.` },
    de: { title: `Mietwagen Flughafen Paros | ${BRAND}`, d: `Landen Sie am Flughafen Paros (PAS) und holen Sie Ihr Auto schnell ab. Klarer Treffpunkt, inselbereite Wagen.` },
    nl: { title: `Auto huren Paros Airport | ${BRAND}`, d: `Land op Paros Airport (PAS) en haal snel uw huurauto op. Duidelijk afspreekpunt en klaarstaande auto's.` },
    sv: { title: `Hyrbil Paros flygplats | ${BRAND}`, d: `Landa på Paros flygplats (PAS) och hämta bilen snabbt. Tydlig mötespunkt och öklara fordon.` },
    pt: { title: `Aluguer aeroporto de Paros | ${BRAND}`, d: `Chegue ao aeroporto de Paros (PAS) e recolha o carro depressa. Ponto de encontro claro e carros prontos.` },
    ru: { title: `Аренда в аэропорту Пароса | ${BRAND}`, d: `Прилетите в аэропорт Пароса (PAS) и быстро получите авто. Понятная точка встречи и готовые машины.` },
    tr: { title: `Paros Havalimanı Araç Kiralama | ${BRAND}`, d: `Paros Havalimanı'na (PAS) inin, aracınızı hızlı teslim alın. Net buluşma noktası ve hazır filomuz.` },
  },
  "money/paros-port-parikia-rent-a-car": {
    en: { title: `Parikia Port Rent a Car | ${BRAND}`, d: `Ferry into Parikia and drive away the same day. Port pickup for cars, scooters and island explorers.` },
    el: { title: `Ενοικίαση στο Λιμάνι Παροικίας | ${BRAND}`, d: `Φτάστε με φέρι στην Παροικία και φύγετε την ίδια μέρα. Παραλαβή για αυτοκίνητα και σκούτερ.` },
    fr: { title: `Location port de Parikia | ${BRAND}`, d: `Arrivez en ferry à Parikia et partez le jour même. Prise en charge au port pour voitures et scooters.` },
    es: { title: `Alquiler puerto de Parikia | ${BRAND}`, d: `Llegue en ferry a Parikia y salga el mismo día. Recogida en el puerto para coches y scooters.` },
    it: { title: `Noleggio porto di Parikia | ${BRAND}`, d: `Arriva in traghetto a Parikia e parti lo stesso giorno. Ritiro al porto per auto e scooter.` },
    de: { title: `Mietwagen Hafen Parikia | ${BRAND}`, d: `Kommen Sie mit der Fähre in Parikia an und fahren Sie am selben Tag los. Hafenübergabe für Autos und Roller.` },
    nl: { title: `Auto huren haven Parikia | ${BRAND}`, d: `Kom met de ferry aan in Parikia en rij dezelfde dag weg. Havenophalen voor auto's en scooters.` },
    sv: { title: `Hyrbil Parikia hamn | ${BRAND}`, d: `Kom med färjan till Parikia och kör iväg samma dag. Hamnhämtning för bilar och scootrar.` },
    pt: { title: `Aluguer porto de Parikia | ${BRAND}`, d: `Chegue de ferry a Parikia e saia no mesmo dia. Recolha no porto para carros e scooters.` },
    ru: { title: `Аренда в порту Парикия | ${BRAND}`, d: `Прибудьте паромом в Парикию и уезжайте в тот же день. Подача в порту для авто и скутеров.` },
    tr: { title: `Parikia Limanı Araç Kiralama | ${BRAND}`, d: `Parikia'ya feribotla gelin, aynı gün yola çıkın. Limanda araba ve scooter teslimi.` },
  },
  "money/antiparos-scooter-rentals": {
    en: { title: `Antiparos Scooter Rentals | ${BRAND}`, d: `Rent scooters on Antiparos from 50cc to 300cc, plus Vespa options. Helmets included and port pickup.` },
    el: { title: `Ενοικίαση Σκούτερ Αντίπαρος | ${BRAND}`, d: `Ενοικιάστε σκούτερ στην Αντίπαρο από 50cc έως 300cc, και Vespa. Κράνη συμπεριλαμβάνονται.` },
    fr: { title: `Location de scooters Antiparos | ${BRAND}`, d: `Louez des scooters à Antiparos de 50 à 300 cc, plus Vespa. Casques inclus et retrait au port.` },
    es: { title: `Alquiler de scooters Antíparos | ${BRAND}`, d: `Alquile scooters en Antíparos de 50 a 300 cc, y Vespa. Cascos incluidos y recogida en el puerto.` },
    it: { title: `Noleggio scooter Antiparos | ${BRAND}`, d: `Noleggia scooter ad Antiparos da 50 a 300 cc, più Vespa. Caschi inclusi e ritiro al porto.` },
    de: { title: `Rollerverleih Antiparos | ${BRAND}`, d: `Mieten Sie Roller auf Antiparos von 50 bis 300 ccm, plus Vespa. Helme inklusive, Abholung am Hafen.` },
    nl: { title: `Scooter huren Antiparos | ${BRAND}`, d: `Huur scooters op Antiparos van 50 tot 300 cc, plus Vespa. Helmen inbegrepen en ophalen in de haven.` },
    sv: { title: `Skoteruthyrning Antiparos | ${BRAND}`, d: `Hyr scootrar på Antiparos från 50 till 300 cc, plus Vespa. Hjälmar ingår och hämtning i hamnen.` },
    pt: { title: `Aluguer de scooters Antíparos | ${BRAND}`, d: `Alugue scooters em Antíparos de 50 a 300 cc, mais Vespa. Capacetes incluídos e recolha no porto.` },
    ru: { title: `Прокат скутеров Антипарос | ${BRAND}`, d: `Арендуйте скутеры на Антипаросе от 50 до 300 куб.см, плюс Vespa. Шлемы включены, подача в порту.` },
    tr: { title: `Antiparos Scooter Kiralama | ${BRAND}`, d: `Antiparos'ta 50cc-300cc scooter ve Vespa kiralayın. Kask dahil, limandan teslim.` },
  },
  "money/atvs-antiparos": {
    en: { title: `ATV & Buggy Rentals Antiparos | ${BRAND}`, d: `Explore Antiparos dirt tracks and beach roads on ATVs and buggies. Port meeting and safety brief included.` },
    el: { title: `Ενοικίαση ATV & Buggy Αντίπαρος | ${BRAND}`, d: `Εξερευνήστε χωματόδρομους στην Αντίπαρο με ATV και buggy. Συνάντηση στο λιμάνι και ενημέρωση ασφαλείας.` },
    fr: { title: `Location quad & buggy Antiparos | ${BRAND}`, d: `Parcourez les pistes d'Antiparos en quad ou buggy. Rendez-vous au port et briefing sécurité inclus.` },
    es: { title: `Alquiler ATV y buggy Antíparos | ${BRAND}`, d: `Explore pistas de Antíparos en ATV o buggy. Encuentro en el puerto y briefing de seguridad incluido.` },
    it: { title: `Noleggio ATV e buggy Antiparos | ${BRAND}`, d: `Esplora le piste di Antiparos con ATV e buggy. Incontro al porto e briefing di sicurezza inclusi.` },
    de: { title: `ATV & Buggy mieten Antiparos | ${BRAND}`, d: `Erkunden Sie Antiparos-Pisten mit ATV und Buggy. Treffpunkt am Hafen und Sicherheitsbriefing inklusive.` },
    nl: { title: `ATV & buggy huren Antiparos | ${BRAND}`, d: `Verken de paden van Antiparos met ATV en buggy. Afspraak in de haven en veiligheidsbriefing inbegrepen.` },
    sv: { title: `ATV & buggy Antiparos | ${BRAND}`, d: `Utforska Antiparos grusvägar med ATV och buggy. Möte i hamnen och säkerhetsgenomgång ingår.` },
    pt: { title: `Aluguer ATV e buggy Antíparos | ${BRAND}`, d: `Explore os trilhos de Antíparos de ATV ou buggy. Encontro no porto e briefing de segurança incluídos.` },
    ru: { title: `Аренда ATV и багги Антипарос | ${BRAND}`, d: `Исследуйте грунтовые дороги Антипароса на квадроцикле или багги. Встреча в порту и инструктаж.` },
    tr: { title: `Antiparos ATV ve Buggy Kiralama | ${BRAND}`, d: `Antiparos toprak yollarını ATV ve buggy ile keşfedin. Liman buluşması ve güvenlik brifingi dahil.` },
  },
  "money/suv-rentals-paros": {
    en: { title: `SUV & Jeep Rentals Paros | ${BRAND}`, d: `Book SUVs and jeeps for Paros hills, beach bags, and family trips. Airport or port delivery available.` },
    el: { title: `Ενοικίαση SUV & Jeep Πάρος | ${BRAND}`, d: `Κλείστε SUV και jeep για λόφους, παραλίες και οικογένειες στην Πάρο. Παράδοση σε αεροδρόμιο ή λιμάνι.` },
    fr: { title: `Location SUV et jeep Paros | ${BRAND}`, d: `Réservez SUV et jeeps pour les collines de Paros, les plages et les familles. Livraison aéroport ou port.` },
    es: { title: `Alquiler SUV y jeep Paros | ${BRAND}`, d: `Reserve SUV y jeeps para colinas, playas y familias en Paros. Entrega en aeropuerto o puerto.` },
    it: { title: `Noleggio SUV e jeep Paros | ${BRAND}`, d: `Prenota SUV e jeep per colline, spiagge e famiglie a Paros. Consegna in aeroporto o al porto.` },
    de: { title: `SUV & Jeep mieten Paros | ${BRAND}`, d: `Buchen Sie SUVs und Jeeps für Hügel, Strände und Familien auf Paros. Lieferung Flughafen oder Hafen.` },
    nl: { title: `SUV & jeep huren Paros | ${BRAND}`, d: `Boek SUV's en jeeps voor heuvels, stranden en gezinnen op Paros. Levering op luchthaven of haven.` },
    sv: { title: `SUV & jeep Paros | ${BRAND}`, d: `Boka SUV och jeep för kullar, stränder och familjer på Paros. Leverans till flygplats eller hamn.` },
    pt: { title: `Aluguer SUV e jeep Paros | ${BRAND}`, d: `Reserve SUVs e jipes para colinas, praias e famílias em Paros. Entrega no aeroporto ou porto.` },
    ru: { title: `Аренда SUV и джипов Парос | ${BRAND}`, d: `Бронируйте SUV и джипы для холмов, пляжей и семей на Паросе. Подача в аэропорт или порт.` },
    tr: { title: `Paros SUV ve Jeep Kiralama | ${BRAND}`, d: `Paros tepeleri, plajlar ve aileler için SUV ve jeep ayırtın. Havalimanı veya liman teslimi.` },
  },
  "money/piraeus-rent-a-car": {
    en: { title: `Piraeus Rent a Car | ${BRAND}`, d: `Start your Greek trip in Piraeus before the ferry. One-way options toward Paros and Antiparos available.` },
    el: { title: `Ενοικίαση Αυτοκινήτου Πειραιάς | ${BRAND}`, d: `Ξεκινήστε από τον Πειραιά πριν το φέρι. Διαθέσιμες επιλογές one-way προς Πάρο και Αντίπαρο.` },
    fr: { title: `Location de voiture au Pirée | ${BRAND}`, d: `Commencez au Pirée avant le ferry. Options aller simple vers Paros et Antiparos disponibles.` },
    es: { title: `Alquiler de coches en El Pireo | ${BRAND}`, d: `Empiece en El Pireo antes del ferry. Opciones de ida hacia Paros y Antíparos disponibles.` },
    it: { title: `Noleggio auto al Pireo | ${BRAND}`, d: `Inizia al Pireo prima del traghetto. Opzioni solo andata verso Paros e Antiparos disponibili.` },
    de: { title: `Mietwagen in Piräus | ${BRAND}`, d: `Starten Sie in Piräus vor der Fähre. Einweg-Optionen nach Paros und Antiparos verfügbar.` },
    nl: { title: `Auto huren in Piraeus | ${BRAND}`, d: `Begin in Piraeus vóór de ferry. Enkele-reis opties naar Paros en Antiparos beschikbaar.` },
    sv: { title: `Hyrbil i Pireus | ${BRAND}`, d: `Börja i Pireus före färjan. Envägsalternativ mot Paros och Antiparos finns.` },
    pt: { title: `Aluguer de carros no Pireu | ${BRAND}`, d: `Comece no Pireu antes do ferry. Opções só ida para Paros e Antíparos disponíveis.` },
    ru: { title: `Аренда авто в Пирее | ${BRAND}`, d: `Начните в Пирее до парома. Доступны варианты в одну сторону на Парос и Антипарос.` },
    tr: { title: `Pire Araç Kiralama | ${BRAND}`, d: `Feribottan önce Pire'de başlayın. Paros ve Antiparos'a tek yön seçenekleri mevcut.` },
  },
};

for (const [key, byLoc] of Object.entries(money)) {
  const map = {};
  for (const loc of LOCALES) {
    map[loc] = { title: byLoc[loc].title, description: `${byLoc[loc].d} ${trust[loc]}` };
  }
  seo[key] = L(map);
}

// ─── CONTACT ────────────────────────────────────────────────────────
seo["contact/about-us"] = L({
  en: { title: `About ${BRAND} Since 1994`, description: `Meet the Antiparos family behind ${BRAND}. Local keys, honest advice, and three decades of island hospitality.` },
  el: { title: `Σχετικά με ${BRAND} από το 1994`, description: `Γνωρίστε την οικογένεια της Αντιπάρου πίσω από την ${BRAND}. Τοπικά κλειδιά και ειλικρινείς συμβουλές.` },
  fr: { title: `À propos de ${BRAND} depuis 1994`, description: `Découvrez la famille d'Antiparos derrière ${BRAND}. Clés locales, conseils honnêtes, hospitalité depuis 1994.` },
  es: { title: `Sobre ${BRAND} desde 1994`, description: `Conozca a la familia de Antíparos detrás de ${BRAND}. Llaves locales, consejos honestos y hospitalidad isleña.` },
  it: { title: `Chi siamo: ${BRAND} dal 1994`, description: `Scopri la famiglia di Antiparos dietro ${BRAND}. Chiavi locali, consigli onesti e ospitalità da tre decenni.` },
  de: { title: `Über ${BRAND} seit 1994`, description: `Lernen Sie die Antiparos-Familie hinter ${BRAND} kennen. Lokale Schlüssel, ehrliche Tipps, Inselgastfreundschaft.` },
  nl: { title: `Over ${BRAND} sinds 1994`, description: `Ontmoet de Antiparos-familie achter ${BRAND}. Lokale sleutels, eerlijk advies en dertig jaar eilandgastvrijheid.` },
  sv: { title: `Om ${BRAND} sedan 1994`, description: `Möt Antiparos-familjen bakom ${BRAND}. Lokala nycklar, ärliga råd och tre decennier av ögästfrihet.` },
  pt: { title: `Sobre a ${BRAND} desde 1994`, description: `Conheça a família de Antíparos por trás da ${BRAND}. Chaves locais, conselhos honestos e hospitalidade.` },
  ru: { title: `О компании ${BRAND} с 1994`, description: `Познакомьтесь с семьей Антипароса за брендом ${BRAND}. Местные ключи, честные советы и гостеприимство.` },
  tr: { title: `${BRAND} Hakkında (1994)`, description: `${BRAND} arkasındaki Antiparos ailesini tanıyın. Yerel anahtarlar, dürüst tavsiye ve ada misafirperverliği.` },
});

seo["contact/contact"] = L({
  en: { title: `Contact Our Antiparos Desk | ${BRAND}`, description: `Call, WhatsApp, or email our Antiparos Port desk. We reply fast with availability for Paros and Antiparos.` },
  el: { title: `Επικοινωνία ${BRAND}`, description: `Καλέστε, στείλτε WhatsApp ή email στο γραφείο στο λιμάνι Αντιπάρου. Απαντάμε γρήγορα για διαθεσιμότητα.` },
  fr: { title: `Nous contacter Antiparos | ${BRAND}`, description: `Appelez, WhatsApp ou e-mail à notre bureau du port d'Antiparos. Réponse rapide sur les disponibilités.` },
  es: { title: `Contacto ${BRAND}`, description: `Llame, WhatsApp o email a nuestra oficina del puerto de Antíparos. Respondemos rápido sobre disponibilidad.` },
  it: { title: `Contatti ${BRAND}`, description: `Chiama, WhatsApp o email al nostro ufficio al porto di Antiparos. Rispondiamo in fretta sulla disponibilità.` },
  de: { title: `Kontakt ${BRAND}`, description: `Rufen Sie an, schreiben Sie per WhatsApp oder E-Mail an unser Büro am Hafen Antiparos. Schnelle Antwort.` },
  nl: { title: `Neem contact op | ${BRAND}`, description: `Bel, WhatsApp of mail ons kantoor in de haven van Antiparos. We reageren snel over beschikbaarheid.` },
  sv: { title: `Kontakta ${BRAND}`, description: `Ring, WhatsApp eller mejla vårt kontor i Antiparos hamn. Vi svarar snabbt om tillgänglighet.` },
  pt: { title: `Fale connosco | ${BRAND}`, description: `Ligue, WhatsApp ou email para o nosso escritório no porto de Antíparos. Respondemos rápido sobre vagas.` },
  ru: { title: `Контакты ${BRAND}`, description: `Звоните, пишите в WhatsApp или на email в офис в порту Антипароса. Быстрый ответ по наличию.` },
  tr: { title: `${BRAND} İletişim`, description: `Antiparos liman ofisimize arayın, WhatsApp veya e-posta yazın. Müsaitlik için hızlı yanıt veriyoruz.` },
});

// ─── GUIDES ─────────────────────────────────────────────────────────
seo["guide/antiparos-island"] = pack(
  {
    en: `Antiparos Island Guide | ${BRAND}`,
    el: `Οδηγός Νησιού Αντίπαρος | ${BRAND}`,
    fr: `Guide île d'Antiparos | ${BRAND}`,
    es: `Guía isla Antíparos | ${BRAND}`,
    it: `Guida isola Antiparos | ${BRAND}`,
    de: `Inselguide Antiparos | ${BRAND}`,
    nl: `Gids eiland Antiparos | ${BRAND}`,
    sv: `Guide Antiparos ö | ${BRAND}`,
    pt: `Guia ilha Antíparos | ${BRAND}`,
    ru: `Гид по острову Антипарос | ${BRAND}`,
    tr: `Antiparos Ada Rehberi | ${BRAND}`,
  },
  {
    en: `Beaches, villages, caves and how to get around Antiparos. Local tips before you pick a car or scooter.`,
    el: `Παραλίες, χωριά, σπήλαια και μετακινήσεις στην Αντίπαρο. Τοπικές συμβουλές πριν κλείσετε όχημα.`,
    fr: `Plages, villages, grottes et déplacements à Antiparos. Conseils locaux avant de choisir voiture ou scooter.`,
    es: `Playas, pueblos, cuevas y cómo moverse en Antíparos. Consejos locales antes de elegir coche o scooter.`,
    it: `Spiagge, paesi, grotte e come muoversi ad Antiparos. Consigli locali prima di scegliere auto o scooter.`,
    de: `Strände, Dörfer, Höhlen und Mobilität auf Antiparos. Lokale Tipps vor der Wahl von Auto oder Roller.`,
    nl: `Stranden, dorpen, grotten en vervoer op Antiparos. Lokale tips voordat u auto of scooter kiest.`,
    sv: `Stränder, byar, grottor och hur du tar dig runt på Antiparos. Lokala tips innan bil eller skoter.`,
    pt: `Praias, aldeias, grutas e como circular em Antíparos. Dicas locais antes de escolher carro ou scooter.`,
    ru: `Пляжи, деревни, пещеры и как передвигаться по Антипаросу. Местные советы перед выбором авто или скутера.`,
    tr: `Antiparos plajları, köyler, mağaralar ve ulaşım. Araba veya scooter seçmeden önce yerel ipuçları.`,
  },
);

seo["guide/paros-island"] = pack(
  {
    en: `Paros Island Travel Guide | ${BRAND}`,
    el: `Οδηγός Ταξιδιού Πάρος | ${BRAND}`,
    fr: `Guide de voyage Paros | ${BRAND}`,
    es: `Guía de viaje Paros | ${BRAND}`,
    it: `Guida di viaggio Paros | ${BRAND}`,
    de: `Reiseguide Paros | ${BRAND}`,
    nl: `Reisgids Paros | ${BRAND}`,
    sv: `Reseguide Paros | ${BRAND}`,
    pt: `Guia de viagem Paros | ${BRAND}`,
    ru: `Путеводитель по Паросу | ${BRAND}`,
    tr: `Paros Seyahat Rehberi | ${BRAND}`,
  },
  {
    en: `Naoussa, Parikia, beaches and day trips from Paros. Practical advice to match the right rental to your plan.`,
    el: `Νάουσα, Παροικία, παραλίες και ημερήσιες εκδρομές από την Πάρο. Συμβουλές για το σωστό όχημα.`,
    fr: `Naoussa, Parikia, plages et excursions depuis Paros. Conseils pour choisir la bonne location.`,
    es: `Naoussa, Parikia, playas y excursiones desde Paros. Consejos para elegir el alquiler adecuado.`,
    it: `Naoussa, Parikia, spiagge e gite da Paros. Consigli per scegliere il noleggio giusto.`,
    de: `Naoussa, Parikia, Strände und Tagesausflüge ab Paros. Tipps für die passende Miete.`,
    nl: `Naoussa, Parikia, stranden en dagtrips vanaf Paros. Advies om de juiste huurauto te kiezen.`,
    sv: `Naoussa, Parikia, stränder och dagsutflykter från Paros. Tips för rätt hyra.`,
    pt: `Naoussa, Parikia, praias e passeios a partir de Paros. Conselhos para o aluguer certo.`,
    ru: `Наусса, Парикия, пляжи и поездки с Пароса. Советы, чтобы выбрать подходящий прокат.`,
    tr: `Naoussa, Parikia, plajlar ve Paros'tan günlük geziler. Doğru kiralama için pratik tavsiyeler.`,
  },
);

seo["guide/travel-tips-for-antiparos-and-paros"] = pack(
  {
    en: `Paros & Antiparos Travel Tips | ${BRAND}`,
    el: `Ταξιδιωτικές Συμβουλές Πάρος | ${BRAND}`,
    fr: `Conseils voyage Paros Antiparos | ${BRAND}`,
    es: `Consejos viaje Paros Antíparos | ${BRAND}`,
    it: `Consigli viaggio Paros Antiparos | ${BRAND}`,
    de: `Reisetipps Paros & Antiparos | ${BRAND}`,
    nl: `Reistips Paros & Antiparos | ${BRAND}`,
    sv: `Restips Paros & Antiparos | ${BRAND}`,
    pt: `Dicas de viagem Paros Antíparos | ${BRAND}`,
    ru: `Советы по Паросу и Антипаросу | ${BRAND}`,
    tr: `Paros ve Antiparos Seyahat İpuçları | ${BRAND}`,
  },
  {
    en: `Ferries, driving rules, parking and season timing for both islands. Read this before you book wheels.`,
    el: `Φέρι, κανόνες οδήγησης, πάρκινγκ και σεζόν και για τα δύο νησιά. Διαβάστε πριν κλείσετε όχημα.`,
    fr: `Ferries, règles de conduite, parking et saison sur les deux îles. À lire avant de réserver.`,
    es: `Ferries, normas de conducción, parking y temporada en ambas islas. Léalo antes de reservar.`,
    it: `Traghetti, regole di guida, parcheggio e stagione su entrambe le isole. Leggi prima di prenotare.`,
    de: `Fähren, Verkehrsregeln, Parken und Saison auf beiden Inseln. Lesen Sie das vor der Buchung.`,
    nl: `Ferries, verkeersregels, parkeren en seizoen op beide eilanden. Lees dit vóór u boekt.`,
    sv: `Färjor, trafikregler, parkering och säsong på båda öarna. Läs innan du bokar.`,
    pt: `Ferries, regras de condução, estacionamento e época nas duas ilhas. Leia antes de reservar.`,
    ru: `Паромы, правила вождения, парковка и сезон на обоих островах. Прочитайте перед бронированием.`,
    tr: `Her iki ada için feribot, sürüş kuralları, park ve sezon. Rezervasyondan önce okuyun.`,
  },
);

// ─── UTILITY ────────────────────────────────────────────────────────
seo["utility/faq"] = L({
  en: { title: `FAQ: Rentals Paros & Antiparos | ${BRAND}`, description: `Licenses, driver age, insurance, pickup, fuel, cancellation and island driving answers for ${BRAND} rentals.` },
  el: { title: `Συχνές Ερωτήσεις Ενοικίασης | ${BRAND}`, description: `Άδειες, ηλικία οδηγού, ασφάλεια, παραλαβή, καύσιμα, ακύρωση και οδήγηση στα νησιά για ενοικιάσεις ${BRAND}.` },
  fr: { title: `FAQ location Paros Antiparos | ${BRAND}`, description: `Permis, âge, assurance, retrait, carburant, annulation et conduite sur les îles: réponses pour ${BRAND}.` },
  es: { title: `FAQ alquiler Paros Antíparos | ${BRAND}`, description: `Licencias, edad, seguro, recogida, combustible, cancelación y conducción en las islas: respuestas ${BRAND}.` },
  it: { title: `FAQ noleggio Paros Antiparos | ${BRAND}`, description: `Patente, età, assicurazione, ritiro, carburante, cancellazione e guida sulle isole: risposte ${BRAND}.` },
  de: { title: `FAQ Mietwagen Paros Antiparos | ${BRAND}`, description: `Führerschein, Alter, Versicherung, Abholung, Kraftstoff, Storno und Inselfahren: Antworten von ${BRAND}.` },
  nl: { title: `FAQ auto huren Paros Antiparos | ${BRAND}`, description: `Rijbewijs, leeftijd, verzekering, ophalen, brandstof, annuleren en rijden op de eilanden: antwoorden ${BRAND}.` },
  sv: { title: `FAQ hyrbil Paros Antiparos | ${BRAND}`, description: `Körkort, ålder, försäkring, hämtning, bränsle, avbokning och körning på öarna: svar från ${BRAND}.` },
  pt: { title: `FAQ aluguer Paros Antíparos | ${BRAND}`, description: `Cartas, idade, seguro, recolha, combustível, cancelamento e condução nas ilhas: respostas ${BRAND}.` },
  ru: { title: `FAQ аренда Парос Антипарос | ${BRAND}`, description: `Права, возраст, страховка, получение, топливо, отмена и вождение на островах: ответы ${BRAND}.` },
  tr: { title: `SSS: Paros Antiparos Kiralama | ${BRAND}`, description: `Ehliyet, yaş, sigorta, teslim, yakıt, iptal ve ada sürüşü: ${BRAND} kiralama sorularının yanıtları.` },
});

seo["utility/guides"] = L({
  en: { title: `Paros & Antiparos Travel Guides | ${BRAND}`, description: `Arrival guides, car-or-not advice, island comparisons and beach tips to help you book the right rental.` },
  el: { title: `Οδηγοί Πάρος & Αντίπαρος | ${BRAND}`, description: `Οδηγοί άφιξης, συμβουλές για αυτοκίνητο ή όχι, συγκρίσεις νησιών και tips παραλιών για σωστή κράτηση.` },
  fr: { title: `Guides voyage Paros Antiparos | ${BRAND}`, description: `Guides d'arrivée, faut-il louer, comparaisons d'îles et tips plages pour réserver la bonne location.` },
  es: { title: `Guías Paros y Antíparos | ${BRAND}`, description: `Guías de llegada, coche sí o no, comparaciones de islas y tips de playas para reservar el alquiler adecuado.` },
  it: { title: `Guide di viaggio Cicladi | ${BRAND}`, description: `Guide di arrivo, auto sì o no, confronti tra isole e consigli spiaggia per prenotare il noleggio giusto.` },
  de: { title: `Reiseguides Paros Antiparos | ${BRAND}`, description: `Ankunftsguides, Auto ja oder nein, Inselvergleiche und Strandtipps für die passende Mietbuchung.` },
  nl: { title: `Reisgidsen Paros Antiparos | ${BRAND}`, description: `Aankomstgidsen, auto ja of nee, eilandvergelijkingen en strandtips om de juiste huur te boeken.` },
  sv: { title: `Reseguider Paros Antiparos | ${BRAND}`, description: `Ankomstguider, bil eller inte, öjämförelser och strandtips som hjälper dig boka rätt hyra.` },
  pt: { title: `Guias Paros e Antíparos | ${BRAND}`, description: `Guias de chegada, carro sim ou não, comparações de ilhas e dicas de praia para reservar o aluguer certo.` },
  ru: { title: `Гиды Парос и Антипарос | ${BRAND}`, description: `Гиды по приезду, нужен ли авто, сравнения островов и советы по пляжам, чтобы забронировать верный прокат.` },
  tr: { title: `Paros ve Antiparos Rehberleri | ${BRAND}`, description: `Varış rehberleri, araba gerekir mi, ada karşılaştırmaları ve plaj ipuçları: doğru kiralamayı seçin.` },
});

seo["utility/reviews"] = L({
  en: { title: `Guest Reviews | ${BRAND}`, description: `Read Google reviews from travellers who rented cars, scooters and ATVs with ${BRAND} on Paros and Antiparos.` },
  el: { title: `Κριτικές Επισκεπτών | ${BRAND}`, description: `Διαβάστε κριτικές Google από ταξιδιώτες που ενοικίασαν αυτοκίνητα, σκούτερ και ATV με την ${BRAND}.` },
  fr: { title: `Avis clients | ${BRAND}`, description: `Lisez les avis Google de voyageurs ayant loué voitures, scooters et quads avec ${BRAND} à Paros et Antiparos.` },
  es: { title: `Opiniones de clientes | ${BRAND}`, description: `Lea reseñas de Google de viajeros que alquilaron coches, scooters y ATV con ${BRAND} en Paros y Antíparos.` },
  it: { title: `Recensioni ospiti | ${BRAND}`, description: `Leggi le recensioni Google di viaggiatori che hanno noleggiato auto, scooter e ATV con ${BRAND}.` },
  de: { title: `Gästebewertungen | ${BRAND}`, description: `Lesen Sie Google-Bewertungen von Reisenden, die Autos, Roller und ATVs bei ${BRAND} gemietet haben.` },
  nl: { title: `Gastreviews | ${BRAND}`, description: `Lees Google-reviews van reizigers die auto's, scooters en ATV's huurden bij ${BRAND} op Paros en Antiparos.` },
  sv: { title: `Gästrecensioner | ${BRAND}`, description: `Läs Google-recensioner från resenärer som hyrt bilar, scootrar och ATV hos ${BRAND} på Paros och Antiparos.` },
  pt: { title: `Avaliações de hóspedes | ${BRAND}`, description: `Leia avaliações Google de viajantes que alugaram carros, scooters e ATVs com a ${BRAND} em Paros e Antíparos.` },
  ru: { title: `Отзывы гостей | ${BRAND}`, description: `Читайте отзывы Google путешественников, арендовавших авто, скутеры и ATV у ${BRAND} на Паросе и Антипаросе.` },
  tr: { title: `Misafir Yorumları | ${BRAND}`, description: `Paros ve Antiparos'ta ${BRAND} ile araba, scooter ve ATV kiralayan gezginlerin Google yorumlarını okuyun.` },
});

seo.fleet = L({
  en: { title: `Our Fleet Paros & Antiparos | ${BRAND}`, description: `Browse cars, SUVs, scooters, ATVs and bikes for Paros and Antiparos. Compare categories and book online fast.` },
  el: { title: `Ο Στόλος μας Πάρος & Αντίπαρος | ${BRAND}`, description: `Δείτε αυτοκίνητα, SUV, σκούτερ, ATV και ποδήλατα για Πάρο και Αντίπαρο. Συγκρίνετε κατηγορίες και κλείστε online.` },
  fr: { title: `Notre flotte Paros Antiparos | ${BRAND}`, description: `Parcourez voitures, SUV, scooters, quads et vélos pour Paros et Antiparos. Comparez et réservez en ligne.` },
  es: { title: `Nuestra flota Paros Antíparos | ${BRAND}`, description: `Explore coches, SUV, scooters, ATV y bicis para Paros y Antíparos. Compare categorías y reserve online.` },
  it: { title: `La nostra flotta Paros Antiparos | ${BRAND}`, description: `Sfoglia auto, SUV, scooter, ATV e bici per Paros e Antiparos. Confronta categorie e prenota online.` },
  de: { title: `Unsere Flotte Paros Antiparos | ${BRAND}`, description: `Entdecken Sie Autos, SUVs, Roller, ATVs und Räder für Paros und Antiparos. Vergleichen und online buchen.` },
  nl: { title: `Ons wagenpark Paros Antiparos | ${BRAND}`, description: `Bekijk auto's, SUV's, scooters, ATV's en fietsen voor Paros en Antiparos. Vergelijk en boek online.` },
  sv: { title: `Vår flotta Paros Antiparos | ${BRAND}`, description: `Bläddra bland bilar, SUV, scootrar, ATV och cyklar för Paros och Antiparos. Jämför och boka online.` },
  pt: { title: `A nossa frota Paros Antíparos | ${BRAND}`, description: `Veja carros, SUVs, scooters, ATVs e bicicletas para Paros e Antíparos. Compare categorias e reserve online.` },
  ru: { title: `Наш автопарк Парос Антипарос | ${BRAND}`, description: `Смотрите авто, SUV, скутеры, ATV и велосипеды для Пароса и Антипароса. Сравнивайте и бронируйте онлайн.` },
  tr: { title: `Filomuz Paros ve Antiparos | ${BRAND}`, description: `Paros ve Antiparos için araba, SUV, scooter, ATV ve bisikletlere bakın. Kategorileri karşılaştırın, online ayırtın.` },
});

// ─── LEGAL ──────────────────────────────────────────────────────────
seo["legal/privacy-policy"] = L({
  en: { title: `Privacy Policy | ${BRAND}`, description: `How ${BRAND} collects, uses and protects personal data when you book rentals on Paros and Antiparos.` },
  el: { title: `Πολιτική Απορρήτου | ${BRAND}`, description: `Πώς η ${BRAND} συλλέγει, χρησιμοποιεί και προστατεύει προσωπικά δεδομένα όταν κλείνετε ενοικίαση.` },
  fr: { title: `Politique de confidentialité | ${BRAND}`, description: `Comment ${BRAND} collecte, utilise et protège vos données personnelles lors de réservations de location.` },
  es: { title: `Política de privacidad | ${BRAND}`, description: `Cómo ${BRAND} recopila, usa y protege datos personales cuando reserva alquileres en Paros y Antíparos.` },
  it: { title: `Informativa sulla privacy | ${BRAND}`, description: `Come ${BRAND} raccoglie, usa e protegge i dati personali quando prenoti noleggi a Paros e Antiparos.` },
  de: { title: `Datenschutzrichtlinie | ${BRAND}`, description: `Wie ${BRAND} personenbezogene Daten erhebt, nutzt und schützt, wenn Sie Mietwagen auf den Inseln buchen.` },
  nl: { title: `Privacybeleid | ${BRAND}`, description: `Hoe ${BRAND} persoonsgegevens verzamelt, gebruikt en beschermt wanneer u huurauto's op de eilanden boekt.` },
  sv: { title: `Integritetspolicy | ${BRAND}`, description: `Hur ${BRAND} samlar in, använder och skyddar personuppgifter när du bokar hyrbil på öarna.` },
  pt: { title: `Política de privacidade | ${BRAND}`, description: `Como a ${BRAND} recolhe, usa e protege dados pessoais quando reserva alugueres em Paros e Antíparos.` },
  ru: { title: `Политика конфиденциальности | ${BRAND}`, description: `Как ${BRAND} собирает, использует и защищает персональные данные при бронировании проката на островах.` },
  tr: { title: `Gizlilik Politikası | ${BRAND}`, description: `${BRAND}, Paros ve Antiparos kiralama rezervasyonlarında kişisel verileri nasıl toplar, kullanır ve korur.` },
});

seo["legal/terms-conditions"] = L({
  en: { title: `Terms & Conditions | ${BRAND}`, description: `Rental terms for cars, scooters and ATVs with ${BRAND} on Paros and Antiparos, including deposits and liability.` },
  el: { title: `Όροι και Προϋποθέσεις | ${BRAND}`, description: `Όροι ενοικίασης για αυτοκίνητα, σκούτερ και ATV με την ${BRAND} σε Πάρο και Αντίπαρο, προκαταβολές και ευθύνη.` },
  fr: { title: `Conditions générales | ${BRAND}`, description: `Conditions de location pour voitures, scooters et quads avec ${BRAND} à Paros et Antiparos, cautions et responsabilité.` },
  es: { title: `Términos y condiciones | ${BRAND}`, description: `Términos de alquiler de coches, scooters y ATV con ${BRAND} en Paros y Antíparos, depósitos y responsabilidad.` },
  it: { title: `Termini e condizioni | ${BRAND}`, description: `Termini di noleggio per auto, scooter e ATV con ${BRAND} a Paros e Antiparos, depositi e responsabilità.` },
  de: { title: `Allgemeine Geschäftsbedingungen | ${BRAND}`, description: `Mietbedingungen für Autos, Roller und ATVs bei ${BRAND} auf Paros und Antiparos, Kaution und Haftung.` },
  nl: { title: `Algemene voorwaarden | ${BRAND}`, description: `Huurvoorwaarden voor auto's, scooters en ATV's bij ${BRAND} op Paros en Antiparos, borg en aansprakelijkheid.` },
  sv: { title: `Villkor | ${BRAND}`, description: `Hyresvillkor för bilar, scootrar och ATV hos ${BRAND} på Paros och Antiparos, deposition och ansvar.` },
  pt: { title: `Termos e condições | ${BRAND}`, description: `Termos de aluguer de carros, scooters e ATVs com a ${BRAND} em Paros e Antíparos, depósitos e responsabilidade.` },
  ru: { title: `Условия использования | ${BRAND}`, description: `Условия аренды авто, скутеров и ATV у ${BRAND} на Паросе и Антипаросе, депозиты и ответственность.` },
  tr: { title: `Şartlar ve Koşullar | ${BRAND}`, description: `${BRAND} ile Paros ve Antiparos'ta araba, scooter ve ATV kiralama şartları, depozito ve sorumluluk.` },
});

seo["legal/cookie-policy-eu"] = L({
  en: { title: `Cookie Policy (EU) | ${BRAND}`, description: `How ${BRAND} uses cookies and similar technologies on antiparosrentacar.com, and how you can manage preferences.` },
  el: { title: `Πολιτική Cookies (ΕΕ) | ${BRAND}`, description: `Πώς η ${BRAND} χρησιμοποιεί cookies στον ιστότοπο antiparosrentacar.com και πώς διαχειρίζεστε τις προτιμήσεις.` },
  fr: { title: `Politique cookies (UE) | ${BRAND}`, description: `Comment ${BRAND} utilise les cookies sur antiparosrentacar.com et comment gérer vos préférences.` },
  es: { title: `Política de cookies (UE) | ${BRAND}`, description: `Cómo ${BRAND} usa cookies en antiparosrentacar.com y cómo puede gestionar sus preferencias.` },
  it: { title: `Informativa cookie (UE) | ${BRAND}`, description: `Come ${BRAND} usa i cookie su antiparosrentacar.com e come gestire le preferenze.` },
  de: { title: `Cookie-Richtlinie (EU) | ${BRAND}`, description: `Wie ${BRAND} Cookies auf antiparosrentacar.com verwendet und wie Sie Einstellungen verwalten.` },
  nl: { title: `Cookiebeleid (EU) | ${BRAND}`, description: `Hoe ${BRAND} cookies gebruikt op antiparosrentacar.com en hoe u voorkeuren beheert.` },
  sv: { title: `Cookiepolicy (EU) | ${BRAND}`, description: `Hur ${BRAND} använder cookies på antiparosrentacar.com och hur du hanterar preferenser.` },
  pt: { title: `Cookies e preferências (UE) | ${BRAND}`, description: `Como a ${BRAND} usa cookies em antiparosrentacar.com e como gerir as suas preferências.` },
  ru: { title: `Политика cookie (ЕС) | ${BRAND}`, description: `Как ${BRAND} использует cookie на antiparosrentacar.com и как управлять настройками.` },
  tr: { title: `Çerez Politikası (AB) | ${BRAND}`, description: `${BRAND}'ın antiparosrentacar.com üzerinde çerezleri nasıl kullandığı ve tercihleri nasıl yöneteceğiniz.` },
});

// ─── BLOGS ──────────────────────────────────────────────────────────
const blogs = {
  "blog/best-things-to-do-in-paros": {
    en: { t: `Best Things to Do in Paros (2026) | ${BRAND}`, d: `Villages, beaches, watersports and an Antiparos day trip. Local rental tips for exploring Paros in 2026.` },
    el: { t: `Τι να Κάνετε στην Πάρο (2026) | ${BRAND}`, d: `Χωριά, παραλίες, θαλάσσια σπορ και ημερήσια στην Αντίπαρο. Τοπικές συμβουλές ενοικίασης για το 2026.` },
    fr: { t: `Que faire à Paros (2026) | ${BRAND}`, d: `Villages, plages, sports nautiques et journée à Antiparos. Conseils location locaux pour Paros en 2026.` },
    es: { t: `Qué hacer en Paros (2026) | ${BRAND}`, d: `Pueblos, playas, deportes acuáticos y día en Antíparos. Consejos de alquiler locales para Paros en 2026.` },
    it: { t: `Cosa fare a Paros (2026) | ${BRAND}`, d: `Paesi, spiagge, sport acquatici e gita ad Antiparos. Consigli di noleggio locali per Paros nel 2026.` },
    de: { t: `Paros Aktivitäten 2026 | ${BRAND}`, d: `Dörfer, Strände, Wassersport und Tagestrip nach Antiparos. Lokale Miettipps für Paros 2026.` },
    nl: { t: `Wat te doen op Paros (2026) | ${BRAND}`, d: `Dorpen, stranden, watersport en een dagtrip naar Antiparos. Lokale huurtips voor Paros in 2026.` },
    sv: { t: `Att göra på Paros (2026) | ${BRAND}`, d: `Byar, stränder, vattensport och dagstur till Antiparos. Lokala hyrtips för Paros 2026.` },
    pt: { t: `O que fazer em Paros (2026) | ${BRAND}`, d: `Aldeias, praias, desportos aquáticos e dia em Antíparos. Dicas de aluguer locais para Paros em 2026.` },
    ru: { t: `Что делать на Паросе (2026) | ${BRAND}`, d: `Деревни, пляжи, водный спорт и день на Антипаросе. Местные советы по прокату для Пароса в 2026.` },
    tr: { t: `Paros'ta Yapılacaklar (2026) | ${BRAND}`, d: `Köyler, plajlar, su sporları ve Antiparos günü. 2026 Paros keşfi için yerel kiralama ipuçları.` },
  },
  "blog/do-you-need-to-rent-a-car-in-paros": {
    en: { t: `Do You Need a Car in Paros? | ${BRAND}`, d: `Honest 2026 advice on buses, taxis, scooters and cars in Paros, and when a rental actually pays off.` },
    el: { t: `Χρειάζεστε Αυτοκίνητο στην Πάρο; | ${BRAND}`, d: `Ειλικρινείς συμβουλές 2026 για λεωφορεία, ταξί, σκούτερ και αυτοκίνητα στην Πάρο, και πότε συμφέρει.` },
    fr: { t: `Faut-il une voiture à Paros ? | ${BRAND}`, d: `Conseils 2026 sur bus, taxis, scooters et voitures à Paros, et quand la location vaut vraiment le coup.` },
    es: { t: `¿Necesitas coche en Paros? | ${BRAND}`, d: `Consejos sinceros 2026 sobre buses, taxis, scooters y coches en Paros, y cuándo compensa alquilar.` },
    it: { t: `Serve un'auto a Paros? | ${BRAND}`, d: `Consigli onesti 2026 su bus, taxi, scooter e auto a Paros, e quando il noleggio conviene davvero.` },
    de: { t: `Auto auf Paros nötig? | ${BRAND}`, d: `Ehrliche Tipps 2026 zu Bus, Taxi, Roller und Auto auf Paros, und wann sich die Miete lohnt.` },
    nl: { t: `Auto nodig op Paros? | ${BRAND}`, d: `Eerlijk advies 2026 over bus, taxi, scooter en auto op Paros, en wanneer huren écht loont.` },
    sv: { t: `Behöver du bil på Paros? | ${BRAND}`, d: `Ärliga råd 2026 om buss, taxi, scooter och bil på Paros, och när hyra faktiskt lönar sig.` },
    pt: { t: `Precisa de carro em Paros? | ${BRAND}`, d: `Conselhos honestos 2026 sobre autocarros, táxis, scooters e carros em Paros, e quando vale alugar.` },
    ru: { t: `Нужно ли авто на Паросе? | ${BRAND}`, d: `Честные советы 2026 про автобусы, такси, скутеры и авто на Паросе, и когда прокат окупается.` },
    tr: { t: `Paros'ta Araba Gerekir mi? | ${BRAND}`, d: `Paros'ta otobüs, taksi, scooter ve araba için 2026 dürüst tavsiye; kiralama ne zaman işe yarar.` },
  },
  "blog/exploring-paros-car-rentals-made-easy-with-aggelos": {
    en: { t: `Exploring Paros Made Easy | ${BRAND}`, d: `How ${BRAND} simplifies Paros car rentals with clear pickup points, fair prices and local island know-how.` },
    el: { t: `Εξερεύνηση Πάρου με Ευκολία | ${BRAND}`, d: `Πώς η ${BRAND} απλοποιεί την ενοικίαση στην Πάρο με καθαρά σημεία παραλαβής και τοπική γνώση.` },
    fr: { t: `Explorer Paros en toute simplicité | ${BRAND}`, d: `Comment ${BRAND} simplifie la location à Paros avec des points de retrait clairs et un savoir local.` },
    es: { t: `Explorar Paros fácil | ${BRAND}`, d: `Cómo ${BRAND} simplifica el alquiler en Paros con puntos de recogida claros y conocimiento local.` },
    it: { t: `Esplorare Paros è facile | ${BRAND}`, d: `Come ${BRAND} semplifica il noleggio a Paros con punti di ritiro chiari e conoscenza locale.` },
    de: { t: `Paros einfach entdecken | ${BRAND}`, d: `Wie ${BRAND} Mietwagen auf Paros mit klaren Treffpunkten und lokalem Wissen erleichtert.` },
    nl: { t: `Paros makkelijk verkennen | ${BRAND}`, d: `Hoe ${BRAND} autohuur op Paros eenvoudig maakt met duidelijke ophaalpunten en lokale kennis.` },
    sv: { t: `Upptäck Paros enkelt | ${BRAND}`, d: `Hur ${BRAND} gör biluthyrning på Paros enkel med tydliga hämtställen och lokal kunskap.` },
    pt: { t: `Explorar Paros com facilidade | ${BRAND}`, d: `Como a ${BRAND} simplifica o aluguer em Paros com pontos de recolha claros e saber local.` },
    ru: { t: `Исследовать Парос просто | ${BRAND}`, d: `Как ${BRAND} упрощает прокат на Паросе: понятные точки выдачи и местные знания острова.` },
    tr: { t: `Paros'u Kolay Keşfedin | ${BRAND}`, d: `${BRAND} net teslim noktaları ve yerel ada bilgisiyle Paros araç kiralamaayı nasıl kolaylaştırır.` },
  },
  "blog/how-to-get-to-paros-ferries-flights-airport": {
    en: { t: `How to Get to Paros | ${BRAND}`, d: `Ferries, flights into PAS and transfer tips to Parikia or Antiparos, plus when to book a rental car.` },
    el: { t: `Πώς να Φτάσετε στην Πάρο | ${BRAND}`, d: `Φέρι, πτήσεις στο PAS και tips μεταφοράς προς Παροικία ή Αντίπαρο, και πότε να κλείσετε όχημα.` },
    fr: { t: `Comment aller à Paros | ${BRAND}`, d: `Ferries, vols vers PAS et transferts vers Parikia ou Antiparos, plus quand réserver une location.` },
    es: { t: `Cómo llegar a Paros | ${BRAND}`, d: `Ferries, vuelos a PAS y traslados a Parikia o Antíparos, y cuándo reservar un coche de alquiler.` },
    it: { t: `Come arrivare a Paros | ${BRAND}`, d: `Traghetti, voli per PAS e trasferimenti a Parikia o Antiparos, e quando prenotare un noleggio.` },
    de: { t: `Anreise nach Paros | ${BRAND}`, d: `Fähren, Flüge nach PAS und Transfer nach Parikia oder Antiparos, plus wann Sie mieten sollten.` },
    nl: { t: `Hoe kom je op Paros | ${BRAND}`, d: `Ferries, vluchten naar PAS en transfers naar Parikia of Antiparos, plus wanneer u een auto boekt.` },
    sv: { t: `Hur du tar dig till Paros | ${BRAND}`, d: `Färjor, flyg till PAS och transfer till Parikia eller Antiparos, plus när du bör boka bil.` },
    pt: { t: `Como chegar a Paros | ${BRAND}`, d: `Ferries, voos para PAS e transfers para Parikia ou Antíparos, e quando reservar um carro.` },
    ru: { t: `Как добраться до Пароса | ${BRAND}`, d: `Паромы, рейсы в PAS и трансферы в Парикию или на Антипарос, плюс когда бронировать авто.` },
    tr: { t: `Paros'a Nasıl Gidilir | ${BRAND}`, d: `Feribotlar, PAS uçuşları ve Parikia veya Antiparos transferleri; ne zaman araç kiralamalı.` },
  },
  "blog/imeres-thalassas-2025-ston-peiraia-ena-15imero-me-pano-apo-120-dorean-ekdiloseis": {
    en: { t: `Sea Days in Piraeus Guide | ${BRAND}`, d: `What Sea Days in Piraeus means for travellers, free events context, and rental tips if you start from the port.` },
    el: { t: `Ημέρες Θάλασσας στον Πειραιά | ${BRAND}`, d: `Τι σημαίνουν οι Ημέρες Θάλασσας για ταξιδιώτες, δωρεάν εκδηλώσεις και tips ενοικίασης από το λιμάνι.` },
    fr: { t: `Journées de la mer au Pirée | ${BRAND}`, d: `Ce que les Journées de la mer au Pirée changent pour les voyageurs, et conseils location depuis le port.` },
    es: { t: `Días del Mar en El Pireo | ${BRAND}`, d: `Qué significan los Días del Mar en El Pireo para viajeros y consejos de alquiler desde el puerto.` },
    it: { t: `Giornate del Mare al Pireo | ${BRAND}`, d: `Cosa significano le Giornate del Mare al Pireo per i viaggiatori e consigli di noleggio dal porto.` },
    de: { t: `Seetage in Piräus | ${BRAND}`, d: `Was die Seetage in Piräus für Reisende bedeuten und Miettipps, wenn Sie vom Hafen starten.` },
    nl: { t: `Zee-dagen in Piraeus | ${BRAND}`, d: `Wat de Zee-dagen in Piraeus betekenen voor reizigers en huurtips als u vanaf de haven start.` },
    sv: { t: `Havsdagar i Pireus | ${BRAND}`, d: `Vad Havsdagar i Pireus betyder för resenärer och hyrtips om du startar från hamnen.` },
    pt: { t: `Dias do Mar no Pireu | ${BRAND}`, d: `O que os Dias do Mar no Pireu significam para viajantes e dicas de aluguer a partir do porto.` },
    ru: { t: `Дни моря в Пирее | ${BRAND}`, d: `Что значат Дни моря в Пирее для путешественников и советы по прокату, если стартуете из порта.` },
    tr: { t: `Pire Deniz Günleri Rehberi | ${BRAND}`, d: `Pire Deniz Günleri gezginler için ne anlama gelir; limandan başlayanlar için kiralama ipuçları.` },
  },
  "blog/paros-rent-a-car-affordable-and-cheap-options-2025": {
    en: { t: `Affordable Paros Car Rental Tips | ${BRAND}`, d: `How to keep Paros rental costs down in peak season: timing, vehicle class and pickup choices that save money.` },
    el: { t: `Οικονομική Ενοικίαση Πάρος | ${BRAND}`, d: `Πώς να κρατήσετε χαμηλά το κόστος στην Πάρο: timing, κατηγορία οχήματος και επιλογές παραλαβής.` },
    fr: { t: `Location Pas chère à Paros | ${BRAND}`, d: `Comment limiter le coût d'une location à Paros en haute saison: timing, catégorie et point de retrait.` },
    es: { t: `Alquiler barato en Paros | ${BRAND}`, d: `Cómo mantener bajos los costes de alquiler en Paros en temporada alta: fechas, categoría y recogida.` },
    it: { t: `Noleggio conveniente a Paros | ${BRAND}`, d: `Come contenere i costi di noleggio a Paros in alta stagione: timing, categoria e punto di ritiro.` },
    de: { t: `Günstig mieten auf Paros | ${BRAND}`, d: `So halten Sie Mietkosten auf Paros in der Hochsaison niedrig: Timing, Fahrzeugklasse und Abholung.` },
    nl: { t: `Voordelig huren op Paros | ${BRAND}`, d: `Hoe u huurkosten op Paros in het hoogseizoen laag houdt: timing, klasse en ophaalpunt.` },
    sv: { t: `Prisvärd biluthyrning Paros | ${BRAND}`, d: `Så håller du hyrkostnader på Paros nere i högsäsong: timing, bilklass och hämtställe.` },
    pt: { t: `Aluguer económico em Paros | ${BRAND}`, d: `Como manter custos de aluguer baixos em Paros na alta temporada: datas, categoria e recolha.` },
    ru: { t: `Недорогой прокат на Паросе | ${BRAND}`, d: `Как снизить стоимость аренды на Паросе в пик сезона: сроки, класс авто и точка получения.` },
    tr: { t: `Paros'ta Uygun Araç Kiralama | ${BRAND}`, d: `Yoğun sezonda Paros kiralama maliyetini düşürmek: zamanlama, araç sınıfı ve teslim seçimleri.` },
  },
  "blog/paros-rent-a-car-best-deals-tips-for-2025": {
    en: { t: `Paros Car Rental Deals & Tips | ${BRAND}`, d: `Best-deal habits for Paros rentals: book early, match vehicle to itinerary, and avoid last-minute desk surprises.` },
    el: { t: `Deals & Tips Ενοικίασης Πάρος | ${BRAND}`, d: `Συνήθειες για καλύτερες τιμές στην Πάρο: κλείστε νωρίς, ταιριάξτε όχημα στο πλάνο, αποφύγετε εκπλήξεις.` },
    fr: { t: `Bons plans location Paros | ${BRAND}`, d: `Habitudes pour de bons prix à Paros: réservez tôt, choisissez le bon véhicule, évitez les surprises au comptoir.` },
    es: { t: `Ofertas y tips alquiler Paros | ${BRAND}`, d: `Hábitos para mejores precios en Paros: reserve pronto, elija el coche adecuado y evite sorpresas en mostrador.` },
    it: { t: `Offerte e tip noleggio Paros | ${BRAND}`, d: `Abitudini per migliori prezzi a Paros: prenota presto, scegli il mezzo giusto, evita sorprese al bancone.` },
    de: { t: `Paros Miettipps & Deals | ${BRAND}`, d: `Gewohnheiten für bessere Preise auf Paros: früh buchen, passendes Auto wählen, Schalterüberraschungen meiden.` },
    nl: { t: `Paros huurdeals & tips | ${BRAND}`, d: `Gewoonten voor betere prijzen op Paros: vroeg boeken, juiste auto kiezen, balieverrassingen vermijden.` },
    sv: { t: `Paros hyrbilstips & deals | ${BRAND}`, d: `Vanor för bättre priser på Paros: boka tidigt, välj rätt bil, undvik överraskningar i disken.` },
    pt: { t: `Dicas e ofertas Paros | ${BRAND}`, d: `Hábitos para melhores preços em Paros: reserve cedo, escolha o carro certo e evite surpresas no balcão.` },
    ru: { t: `Советы и выгодный прокат Парос | ${BRAND}`, d: `Привычки для лучших цен на Паросе: бронируйте рано, выбирайте авто под маршрут, избегайте сюрпризов.` },
    tr: { t: `Paros Kiralama İpuçları | ${BRAND}`, d: `Paros'ta daha iyi fiyat alışkanlıkları: erken ayırtın, rotaya uygun araç seçin, gişe sürprizlerinden kaçının.` },
  },
  "blog/paros-vs-naxos-vs-antiparos": {
    en: { t: `Paros vs Naxos vs Antiparos | ${BRAND}`, d: `Compare vibe, beaches and getting around on three Cycladic islands, then choose the rental that fits your trip.` },
    el: { t: `Πάρος vs Νάξος vs Αντίπαρος | ${BRAND}`, d: `Συγκρίνετε ατμόσφαιρα, παραλίες και μετακινήσεις σε τρία νησιά, και επιλέξτε το όχημα που ταιριάζει.` },
    fr: { t: `Paros, Naxos ou Antiparos ? | ${BRAND}`, d: `Comparez ambiance, plages et mobilité sur trois îles cycladiques, puis choisissez la location adaptée.` },
    es: { t: `Paros, Naxos o Antíparos | ${BRAND}`, d: `Compare ambiente, playas y movilidad en tres islas cicládicas y elija el alquiler que encaje con su viaje.` },
    it: { t: `Paros, Naxos o Antiparos? | ${BRAND}`, d: `Confronta atmosfera, spiagge e mobilità su tre isole cicladiche, poi scegli il noleggio giusto.` },
    de: { t: `Paros, Naxos oder Antiparos | ${BRAND}`, d: `Vergleichen Sie Flair, Strände und Mobilität auf drei Kykladeninseln und wählen Sie die passende Miete.` },
    nl: { t: `Paros, Naxos of Antiparos | ${BRAND}`, d: `Vergelijk sfeer, stranden en vervoer op drie Cycladen-eilanden en kies de huur die bij uw trip past.` },
    sv: { t: `Paros, Naxos eller Antiparos | ${BRAND}`, d: `Jämför stämning, stränder och transporter på tre Kykladiska öar och välj hyran som passar resan.` },
    pt: { t: `Paros, Naxos ou Antíparos | ${BRAND}`, d: `Compare ambiente, praias e mobilidade em três ilhas das Cíclades e escolha o aluguer certo.` },
    ru: { t: `Парос, Наксос или Антипарос | ${BRAND}`, d: `Сравните атмосферу, пляжи и транспорт на трёх Кикладских островах и выберите подходящий прокат.` },
    tr: { t: `Paros, Naxos veya Antiparos | ${BRAND}`, d: `Üç Kiklad adasında atmosfer, plaj ve ulaşımı karşılaştırın; yolculuğunuza uyan kiralamayı seçin.` },
  },
  "blog/pasxa-2025-stin-paro-kai-stin-antiparo": {
    en: { t: `Easter on Paros & Antiparos | ${BRAND}`, d: `What Easter week feels like on both islands, ferry notes and why booking wheels early still matters.` },
    el: { t: `Πάσχα σε Πάρο και Αντίπαρο | ${BRAND}`, d: `Πώς είναι η πασχαλινή εβδομάδα και στα δύο νησιά, σημειώσεις φέρι και γιατί το όχημα κλείνει νωρίς.` },
    fr: { t: `Pâques à Paros et Antiparos | ${BRAND}`, d: `L'ambiance de la semaine de Pâques sur les deux îles, notes ferry et pourquoi réserver tôt reste utile.` },
    es: { t: `Semana Santa Paros Antíparos | ${BRAND}`, d: `Cómo se vive la Semana Santa en ambas islas, notas de ferry y por qué conviene reservar coche pronto.` },
    it: { t: `Pasqua a Paros e Antiparos | ${BRAND}`, d: `Com'è la settimana di Pasqua su entrambe le isole, note sui traghetti e perché prenotare presto.` },
    de: { t: `Ostern auf Paros & Antiparos | ${BRAND}`, d: `Wie die Osterwoche auf beiden Inseln wirkt, Fährhinweise und warum frühes Buchen weiterhin zählt.` },
    nl: { t: `Pasen op Paros & Antiparos | ${BRAND}`, d: `Hoe Pasenweek aanvoelt op beide eilanden, ferry-notities en waarom vroeg boeken nog steeds telt.` },
    sv: { t: `Påsk på Paros & Antiparos | ${BRAND}`, d: `Hur påskveckan känns på båda öarna, färjenotis och varför tidig bokning fortfarande spelar roll.` },
    pt: { t: `Páscoa em Paros e Antíparos | ${BRAND}`, d: `Como é a semana da Páscoa nas duas ilhas, notas de ferry e por que reservar cedo ainda importa.` },
    ru: { t: `Пасха на Паросе и Антипаросе | ${BRAND}`, d: `Как проходит пасхальная неделя на обоих островах, заметки о паромах и почему стоит бронировать рано.` },
    tr: { t: `Paros ve Antiparos'ta Paskalya | ${BRAND}`, d: `Her iki adada Paskalya haftası nasıl geçer, feribot notları ve erken rezervasyon neden önemli.` },
  },
  "blog/rent-a-car-in-paros-with-aggelos-rentals": {
    en: { t: `Rent a Car in Paros with Us | ${BRAND}`, d: `Why travellers choose ${BRAND} for Paros: island base, transparent pricing and pickup where you actually land.` },
    el: { t: `Ενοικίαση στην Πάρο μαζί μας | ${BRAND}`, d: `Γιατί οι ταξιδιώτες επιλέγουν την ${BRAND} στην Πάρο: βάση στο νησί, διαφάνεια και παραλαβή εκεί που φτάνετε.` },
    fr: { t: `Louer une voiture à Paros | ${BRAND}`, d: `Pourquoi les voyageurs choisissent ${BRAND} à Paros: base locale, prix clairs et retrait où vous arrivez.` },
    es: { t: `Alquilar coche en Paros con nosotros | ${BRAND}`, d: `Por qué los viajeros eligen ${BRAND} en Paros: base local, precios claros y recogida donde llega.` },
    it: { t: `Noleggia auto a Paros con noi | ${BRAND}`, d: `Perché i viaggiatori scelgono ${BRAND} a Paros: base sull'isola, prezzi chiari e ritiro dove arrivi.` },
    de: { t: `Auf Paros bei uns mieten | ${BRAND}`, d: `Warum Reisende ${BRAND} auf Paros wählen: Inselbasis, transparente Preise und Abholung am Ankunftsort.` },
    nl: { t: `Auto huren op Paros bij ons | ${BRAND}`, d: `Waarom reizigers ${BRAND} op Paros kiezen: eilandbasis, heldere prijzen en ophalen waar u aankomt.` },
    sv: { t: `Hyr bil på Paros hos oss | ${BRAND}`, d: `Varför resenärer väljer ${BRAND} på Paros: öbas, transparenta priser och hämtning där du landar.` },
    pt: { t: `Alugar carro em Paros connosco | ${BRAND}`, d: `Porque os viajantes escolhem a ${BRAND} em Paros: base local, preços claros e recolha onde chega.` },
    ru: { t: `Аренда на Паросе с нами | ${BRAND}`, d: `Почему путешественники выбирают ${BRAND} на Паросе: база на острове, прозрачные цены и подача по месту.` },
    tr: { t: `Paros'ta Bizden Araç Kirala | ${BRAND}`, d: `Gezginler Paros'ta neden ${BRAND} seçer: ada üssü, şeffaf fiyat ve indiğiniz yerde teslim.` },
  },
  "blog/santorini-earthquakes-swarm-cyclades-islands-on-alert-including-paros-and-antiparos": {
    en: { t: `Cyclades Quake Context Guide | ${BRAND}`, d: `Context on Cyclades seismic news for travellers considering Paros and Antiparos, with calm planning notes.` },
    el: { t: `Σεισμοί Κυκλάδων: Πλαίσιο | ${BRAND}`, d: `Πλαίσιο για ειδήσεις σεισμών στις Κυκλάδες για όσους σκέφτονται Πάρο και Αντίπαρο, με ήρεμο σχεδιασμό.` },
    fr: { t: `Séismes Cyclades: contexte | ${BRAND}`, d: `Contexte sur l'actualité sismique des Cyclades pour les voyageurs visant Paros et Antiparos.` },
    es: { t: `Seísmos Cícladas: contexto | ${BRAND}`, d: `Contexto sobre noticias sísmicas en las Cícladas para viajeros que valoran Paros y Antíparos.` },
    it: { t: `Sismi Cicladi: contesto | ${BRAND}`, d: `Contesto sulle notizie sismiche delle Cicladi per chi valuta Paros e Antiparos, con note di pianificazione.` },
    de: { t: `Kykladen Beben: Kontext | ${BRAND}`, d: `Kontext zu seismischen Meldungen auf den Kykladen für Reisende, die Paros und Antiparos planen.` },
    nl: { t: `Cycladen bevingen: context | ${BRAND}`, d: `Context over seismisch nieuws op de Cycladen voor reizigers die Paros en Antiparos overwegen.` },
    sv: { t: `Kykladerna skalv: kontext | ${BRAND}`, d: `Kontext om seismiska nyheter i Kykladerna för resenärer som överväger Paros och Antiparos.` },
    pt: { t: `Sismos Cíclades: contexto | ${BRAND}`, d: `Contexto sobre notícias sísmicas nas Cíclades para quem considera Paros e Antíparos.` },
    ru: { t: `Землетрясения Киклад: контекст | ${BRAND}`, d: `Контекст сейсмических новостей Киклад для тех, кто рассматривает Парос и Антипарос.` },
    tr: { t: `Kiklad Depremleri: Bağlam | ${BRAND}`, d: `Paros ve Antiparos düşünen gezginler için Kiklad deprem haberlerine sakin bir bağlam.` },
  },
  "blog/santorini-earthquakes-why-you-should-choose-paros-or-antiparos-this-year": {
    en: { t: `Why Choose Paros or Antiparos | ${BRAND}`, d: `Reasons travellers look to Paros and Antiparos this season: pace, beaches and easy island logistics with a rental.` },
    el: { t: `Γιατί Πάρος ή Αντίπαρος | ${BRAND}`, d: `Γιατί οι ταξιδιώτες κοιτούν Πάρο και Αντίπαρο φέτος: ρυθμός, παραλίες και εύκολη ενοικίαση.` },
    fr: { t: `Pourquoi Paros ou Antiparos | ${BRAND}`, d: `Pourquoi viser Paros et Antiparos cette saison: rythme, plages et logistique simple avec une location.` },
    es: { t: `Por qué Paros o Antíparos | ${BRAND}`, d: `Por qué viajeros miran Paros y Antíparos esta temporada: ritmo, playas y logística fácil con alquiler.` },
    it: { t: `Perché Paros o Antiparos | ${BRAND}`, d: `Perché i viaggiatori guardano a Paros e Antiparos: ritmo, spiagge e logistica semplice con noleggio.` },
    de: { t: `Warum Paros oder Antiparos | ${BRAND}`, d: `Warum Reisende diese Saison Paros und Antiparos wählen: Tempo, Strände und einfache Logistik mit Mietwagen.` },
    nl: { t: `Waarom Paros of Antiparos | ${BRAND}`, d: `Waarom reizigers dit seizoen Paros en Antiparos kiezen: tempo, stranden en eenvoudige logistiek met huurauto.` },
    sv: { t: `Varför Paros eller Antiparos | ${BRAND}`, d: `Varför resenärer ser till Paros och Antiparos: tempo, stränder och enkel logistik med hyrbil.` },
    pt: { t: `Porquê Paros ou Antíparos | ${BRAND}`, d: `Porque viajantes olham para Paros e Antíparos: ritmo, praias e logística simples com aluguer.` },
    ru: { t: `Почему Парос или Антипарос | ${BRAND}`, d: `Почему в этом сезоне выбирают Парос и Антипарос: темп, пляжи и простая логистика с прокатом.` },
    tr: { t: `Neden Paros veya Antiparos | ${BRAND}`, d: `Bu sezon gezginler neden Paros ve Antiparos'a bakıyor: tempo, plajlar ve kiralamayla kolay lojistik.` },
  },
  "blog/ultimate-travel-guide-to-paros-greece-updated-for-2025": {
    en: { t: `Ultimate Paros Travel Guide | ${BRAND}`, d: `Updated Paros guide covering arrival, villages, beaches and when a car or scooter makes the trip smoother.` },
    el: { t: `Πλήρης Οδηγός Πάρου | ${BRAND}`, d: `Ενημερωμένος οδηγός Πάρου: άφιξη, χωριά, παραλίες και πότε αυτοκίνητο ή σκούτερ κάνει το ταξίδι εύκολο.` },
    fr: { t: `Guide ultime de Paros | ${BRAND}`, d: `Guide Paros à jour: arrivée, villages, plages et quand voiture ou scooter simplifie le séjour.` },
    es: { t: `Guía definitiva de Paros | ${BRAND}`, d: `Guía actualizada de Paros: llegada, pueblos, playas y cuándo coche o scooter facilita el viaje.` },
    it: { t: `Guida definitiva a Paros | ${BRAND}`, d: `Guida aggiornata di Paros: arrivo, paesi, spiagge e quando auto o scooter semplificano il viaggio.` },
    de: { t: `Ultimativer Paros Reiseguide | ${BRAND}`, d: `Aktueller Paros-Guide: Anreise, Dörfer, Strände und wann Auto oder Roller die Reise erleichtern.` },
    nl: { t: `Ultieme Paros reisgids | ${BRAND}`, d: `Bijgewerkte Paros-gids: aankomst, dorpen, stranden en wanneer auto of scooter de trip soepeler maakt.` },
    sv: { t: `Ultimat Paros reseguide | ${BRAND}`, d: `Uppdaterad Paros-guide: ankomst, byar, stränder och när bil eller skoter gör resan smidigare.` },
    pt: { t: `Guia definitivo de Paros | ${BRAND}`, d: `Guia atualizado de Paros: chegada, aldeias, praias e quando carro ou scooter facilita a viagem.` },
    ru: { t: `Полный гид по Паросу | ${BRAND}`, d: `Обновлённый гид по Паросу: приезд, деревни, пляжи и когда авто или скутер упрощают поездку.` },
    tr: { t: `Kapsamlı Paros Rehberi | ${BRAND}`, d: `Güncel Paros rehberi: varış, köyler, plajlar ve araba veya scooter yolculuğu ne zaman kolaylaştırır.` },
  },
  "blog/windsurf-paros-car-rental-antiparos": {
    en: { t: `Windsurf Paros & Car Rental | ${BRAND}`, d: `Windsurf spots around Paros and how a rental from ${BRAND} helps you reach beaches with gear and group.` },
    el: { t: `Windsurf Πάρος & Ενοικίαση | ${BRAND}`, d: `Σημεία windsurf στην Πάρο και πώς η ενοικίαση από την ${BRAND} βοηθά να φτάσετε με εξοπλισμό.` },
    fr: { t: `Windsurf Paros et location | ${BRAND}`, d: `Spots de windsurf autour de Paros et comment une location ${BRAND} aide à rejoindre les plages avec matériel.` },
    es: { t: `Windsurf Paros y alquiler | ${BRAND}`, d: `Spots de windsurf en Paros y cómo un alquiler de ${BRAND} ayuda a llegar a playas con equipo.` },
    it: { t: `Windsurf Paros e noleggio | ${BRAND}`, d: `Spot di windsurf a Paros e come un noleggio ${BRAND} aiuta a raggiungere le spiagge con attrezzatura.` },
    de: { t: `Windsurf Paros & Mietwagen | ${BRAND}`, d: `Windsurf-Spots rund um Paros und wie eine Miete bei ${BRAND} Sie mit Equipment an den Strand bringt.` },
    nl: { t: `Windsurf Paros & autohuur | ${BRAND}`, d: `Windsurfspots rond Paros en hoe huren bij ${BRAND} helpt om stranden met gear te bereiken.` },
    sv: { t: `Windsurf Paros & hyrbil | ${BRAND}`, d: `Windsurfplatser runt Paros och hur hyra hos ${BRAND} hjälper dig nå stränder med utrustning.` },
    pt: { t: `Windsurf Paros e aluguer | ${BRAND}`, d: `Spots de windsurf em Paros e como um aluguer ${BRAND} ajuda a chegar às praias com equipamento.` },
    ru: { t: `Виндсёрф Парос и прокат | ${BRAND}`, d: `Споты виндсёрфа на Паросе и как прокат у ${BRAND} помогает доехать до пляжей с снаряжением.` },
    tr: { t: `Paros Windsurf ve Kiralama | ${BRAND}`, d: `Paros çevresi windsurf noktaları ve ${BRAND} kiralamasının ekipmanla plaja ulaşmaya yardımı.` },
  },
};

for (const [key, byLoc] of Object.entries(blogs)) {
  const map = {};
  for (const loc of LOCALES) {
    map[loc] = { title: byLoc[loc].t, description: byLoc[loc].d };
  }
  seo[key] = L(map);
}

// ─── FLEET CATEGORIES ───────────────────────────────────────────────
const cats = {
  mini: {
    en: { t: `Mini Cars Paros & Antiparos | ${BRAND}`, d: `Compact mini cars for village streets and easy parking on Paros and Antiparos.` },
    el: { t: `Μικρά Αυτοκίνητα Πάρος | ${BRAND}`, d: `Μικρά αυτοκίνητα για στενά χωριά και εύκολο πάρκινγκ σε Πάρο και Αντίπαρο.` },
    fr: { t: `Mini voitures Paros Antiparos | ${BRAND}`, d: `Mini citadines pour ruelles et stationnement facile à Paros et Antiparos.` },
    es: { t: `Coches mini Paros Antíparos | ${BRAND}`, d: `Coches mini para calles de pueblo y aparcamiento fácil en Paros y Antíparos.` },
    it: { t: `Auto mini Paros Antiparos | ${BRAND}`, d: `Auto mini per vicoli di paese e parcheggio facile a Paros e Antiparos.` },
    de: { t: `Kleinwagen Paros Antiparos | ${BRAND}`, d: `Kompakte Kleinwagen für Dorfgassen und einfaches Parken auf Paros und Antiparos.` },
    nl: { t: `Mini auto's Paros Antiparos | ${BRAND}`, d: `Compacte mini-auto's voor dorpsstraten en makkelijk parkeren op Paros en Antiparos.` },
    sv: { t: `Minibilar Paros Antiparos | ${BRAND}`, d: `Kompakta minibilar för bygator och enkel parkering på Paros och Antiparos.` },
    pt: { t: `Carros mini Paros Antíparos | ${BRAND}`, d: `Carros mini para ruas de aldeia e estacionamento fácil em Paros e Antíparos.` },
    ru: { t: `Мини-авто Парос Антипарос | ${BRAND}`, d: `Компактные мини-авто для узких улиц и лёгкой парковки на Паросе и Антипаросе.` },
    tr: { t: `Mini Araçlar Paros Antiparos | ${BRAND}`, d: `Paros ve Antiparos köy sokakları ve kolay park için kompakt mini arabalar.` },
  },
  compact: {
    en: { t: `Compact Cars Paros Antiparos | ${BRAND}`, d: `Compact rentals with room for bags and beaches. Ideal daily drivers on both islands.` },
    el: { t: `Compact Αυτοκίνητα Πάρος | ${BRAND}`, d: `Compact ενοικιάσεις με χώρο για αποσκευές και παραλίες. Ιδανικά για καθημερινές διαδρομές.` },
    fr: { t: `Voitures compactes Paros | ${BRAND}`, d: `Compacts avec place pour bagages et plages. Idéales au quotidien sur les deux îles.` },
    es: { t: `Coches compactos Paros | ${BRAND}`, d: `Compactos con espacio para maletas y playas. Ideales para el día a día en ambas islas.` },
    it: { t: `Auto compatte Paros | ${BRAND}`, d: `Compatte con spazio per bagagli e spiagge. Ideali ogni giorno su entrambe le isole.` },
    de: { t: `Kompaktwagen Paros | ${BRAND}`, d: `Kompakte Mietwagen mit Platz für Gepäck und Strandtage. Ideal für den Alltag auf beiden Inseln.` },
    nl: { t: `Compacte auto's Paros | ${BRAND}`, d: `Compacte huurauto's met ruimte voor tassen en stranden. Ideaal dagelijks op beide eilanden.` },
    sv: { t: `Kompaktbilar Paros | ${BRAND}`, d: `Kompakta hyrbilar med plats för väskor och stränder. Ideala vardagsbilar på båda öarna.` },
    pt: { t: `Carros compactos Paros | ${BRAND}`, d: `Compactos com espaço para malas e praias. Ideais no dia a dia nas duas ilhas.` },
    ru: { t: `Компактные авто Парос | ${BRAND}`, d: `Компактный прокат с местом для багажа и пляжей. Удобны на каждый день на обоих островах.` },
    tr: { t: `Kompakt Arabalar Paros | ${BRAND}`, d: `Çanta ve plajlar için yerli kompakt kiralıklar. Her iki adada günlük kullanım için ideal.` },
  },
  crossover: {
    en: { t: `Crossover Rentals Paros | ${BRAND}`, d: `Higher seating and flexible space for Paros roads. Crossovers with island pickup from ${BRAND}.` },
    el: { t: `Ενοικίαση Crossover Πάρος | ${BRAND}`, d: `Ψηλότερη θέση και ευέλικτος χώρος για δρόμους Πάρου. Crossover με παραλαβή από την ${BRAND}.` },
    fr: { t: `Location crossover Paros | ${BRAND}`, d: `Assise haute et volume flexible pour les routes de Paros. Crossovers avec retrait ${BRAND}.` },
    es: { t: `Alquiler crossover Paros | ${BRAND}`, d: `Asientos altos y espacio flexible para carreteras de Paros. Crossovers con recogida ${BRAND}.` },
    it: { t: `Noleggio crossover Paros | ${BRAND}`, d: `Seduta alta e spazio flessibile per le strade di Paros. Crossover con ritiro ${BRAND}.` },
    de: { t: `Crossover mieten Paros | ${BRAND}`, d: `Höherer Sitz und flexibler Raum für Paros-Straßen. Crossover mit Inselabholung bei ${BRAND}.` },
    nl: { t: `Crossover huren Paros | ${BRAND}`, d: `Hogere zitpositie en flexibele ruimte voor Paros-wegen. Crossovers met eilandophalen bij ${BRAND}.` },
    sv: { t: `Crossover Paros | ${BRAND}`, d: `Högre sittposition och flexibel yta för Parosvägar. Crossovers med öhämtning från ${BRAND}.` },
    pt: { t: `Aluguer crossover Paros | ${BRAND}`, d: `Assento mais alto e espaço flexível para estradas de Paros. Crossovers com recolha ${BRAND}.` },
    ru: { t: `Аренда кроссоверов Парос | ${BRAND}`, d: `Высокая посадка и гибкий багаж для дорог Пароса. Кроссоверы с подачей от ${BRAND}.` },
    tr: { t: `Paros Crossover Kiralama | ${BRAND}`, d: `Paros yolları için yüksek oturuş ve esnek alan. ${BRAND} ile ada teslimli crossover'lar.` },
  },
  suvs: {
    en: { t: `SUV Rentals Paros & Antiparos | ${BRAND}`, d: `SUVs and 4x4 options for hills, luggage and family trips across Paros and Antiparos.` },
    el: { t: `Ενοικίαση SUV Πάρος Αντίπαρος | ${BRAND}`, d: `SUV και 4x4 για λόφους, αποσκευές και οικογενειακά ταξίδια σε Πάρο και Αντίπαρο.` },
    fr: { t: `Location SUV Paros Antiparos | ${BRAND}`, d: `SUV et 4x4 pour collines, bagages et familles à Paros et Antiparos.` },
    es: { t: `Alquiler SUV Paros Antíparos | ${BRAND}`, d: `SUV y 4x4 para colinas, equipaje y familias en Paros y Antíparos.` },
    it: { t: `Noleggio SUV Paros Antiparos | ${BRAND}`, d: `SUV e 4x4 per colline, bagagli e famiglie a Paros e Antiparos.` },
    de: { t: `SUV mieten Paros Antiparos | ${BRAND}`, d: `SUVs und 4x4 für Hügel, Gepäck und Familienreisen auf Paros und Antiparos.` },
    nl: { t: `SUV huren Paros Antiparos | ${BRAND}`, d: `SUV's en 4x4 voor heuvels, bagage en gezinsreizen op Paros en Antiparos.` },
    sv: { t: `SUV Paros Antiparos | ${BRAND}`, d: `SUV och 4x4 för kullar, bagage och familjeresor på Paros och Antiparos.` },
    pt: { t: `Aluguer SUV Paros Antíparos | ${BRAND}`, d: `SUVs e 4x4 para colinas, bagagem e famílias em Paros e Antíparos.` },
    ru: { t: `Аренда SUV Парос Антипарос | ${BRAND}`, d: `SUV и 4x4 для холмов, багажа и семейных поездок по Паросу и Антипаросу.` },
    tr: { t: `SUV Kiralama Paros Antiparos | ${BRAND}`, d: `Paros ve Antiparos tepeleri, bagaj ve aile seyahatleri için SUV ve 4x4 seçenekleri.` },
  },
  convertible: {
    en: { t: `Convertible Rentals Paros | ${BRAND}`, d: `Open-top convertibles for sunny Cycladic drives. Book soft-tops for Paros and Antiparos days.` },
    el: { t: `Ενοικίαση Cabrio Πάρος | ${BRAND}`, d: `Ανοιχτά cabrio για ηλιόλουστες διαδρομές στις Κυκλάδες. Κλείστε soft-top για Πάρο και Αντίπαρο.` },
    fr: { t: `Location cabriolet Paros | ${BRAND}`, d: `Cabriolets pour routes ensoleillées des Cyclades. Réservez un toit ouvrant pour Paros et Antiparos.` },
    es: { t: `Alquiler descapotable Paros | ${BRAND}`, d: `Descapotables para rutas soleadas en las Cícladas. Reserve soft-top para Paros y Antíparos.` },
    it: { t: `Noleggio cabrio Paros | ${BRAND}`, d: `Cabrio per strade soleggiate delle Cicladi. Prenota una soft-top per Paros e Antiparos.` },
    de: { t: `Cabrio mieten Paros | ${BRAND}`, d: `Offene Cabrios für sonnige Kykladenfahrten. Softtops für Tage auf Paros und Antiparos buchen.` },
    nl: { t: `Cabriolet huren Paros | ${BRAND}`, d: `Open cabrio's voor zonnige Cycladen-ritten. Softtops boeken voor Paros en Antiparos.` },
    sv: { t: `Cabriolet Paros | ${BRAND}`, d: `Öppna cabrioleter för soliga Kykladiska turer. Boka softtop för Paros och Antiparos.` },
    pt: { t: `Aluguer cabriolé Paros | ${BRAND}`, d: `Cabriolés para estradas soalheiras nas Cíclades. Reserve soft-top para Paros e Antíparos.` },
    ru: { t: `Аренда кабриолетов Парос | ${BRAND}`, d: `Открытые кабриолеты для солнечных дорог Киклад. Бронируйте soft-top для Пароса и Антипароса.` },
    tr: { t: `Paros Cabrio Kiralama | ${BRAND}`, d: `Güneşli Kiklad sürüşleri için açık cabrio. Paros ve Antiparos günleri için soft-top ayırtın.` },
  },
  "people-carriers": {
    en: { t: `7 & 9 Seater Rentals Paros | ${BRAND}`, d: `People carriers for groups and families on Paros and Antiparos. Extra seats without the taxi shuffle.` },
    el: { t: `Ενοικίαση 7 & 9 θέσεων | ${BRAND}`, d: `Οχήματα πολλών θέσεων για παρέες και οικογένειες σε Πάρο και Αντίπαρο. Χωρίς ταξί μπρος-πίσω.` },
    fr: { t: `Location 7 et 9 places Paros | ${BRAND}`, d: `Monospaces pour groupes et familles à Paros et Antiparos. Plus de places, moins de taxis.` },
    es: { t: `Alquiler 7 y 9 plazas Paros | ${BRAND}`, d: `Monovolúmenes para grupos y familias en Paros y Antíparos. Más asientos, menos taxis.` },
    it: { t: `Noleggio 7 e 9 posti Paros | ${BRAND}`, d: `Monovolume per gruppi e famiglie a Paros e Antiparos. Più posti, meno taxi.` },
    de: { t: `7- & 9-Sitzer Paros | ${BRAND}`, d: `Großraumwagen für Gruppen und Familien auf Paros und Antiparos. Mehr Sitze, weniger Taxi.` },
    nl: { t: `7- & 9-zitters Paros | ${BRAND}`, d: `Personenvervoerders voor groepen en gezinnen op Paros en Antiparos. Meer stoelen, minder taxi.` },
    sv: { t: `7- & 9-sitsiga Paros | ${BRAND}`, d: `Storbilar för grupper och familjer på Paros och Antiparos. Fler säten, mindre taxi.` },
    pt: { t: `Aluguer 7 e 9 lugares Paros | ${BRAND}`, d: `Monovolumes para grupos e famílias em Paros e Antíparos. Mais lugares, menos táxis.` },
    ru: { t: `Аренда 7 и 9 мест Парос | ${BRAND}`, d: `Вместительные авто для групп и семей на Паросе и Антипаросе. Больше мест, меньше такси.` },
    tr: { t: `7 ve 9 Kişilik Paros | ${BRAND}`, d: `Paros ve Antiparos'ta gruplar ve aileler için çok koltuklu araçlar. Daha az taksi koşturmacası.` },
  },
  scooters: {
    en: { t: `Scooter Rentals Paros Antiparos | ${BRAND}`, d: `Scooters from 50cc to 300cc for short hops and coastal runs. Helmets included with ${BRAND}.` },
    el: { t: `Ενοικίαση Σκούτερ Πάρος | ${BRAND}`, d: `Σκούτερ από 50cc έως 300cc για κοντινές διαδρομές. Κράνη συμπεριλαμβάνονται από την ${BRAND}.` },
    fr: { t: `Location scooters Paros | ${BRAND}`, d: `Scooters de 50 à 300 cc pour trajets courts et côte. Casques inclus avec ${BRAND}.` },
    es: { t: `Alquiler scooters Paros | ${BRAND}`, d: `Scooters de 50 a 300 cc para trayectos cortos y costa. Cascos incluidos con ${BRAND}.` },
    it: { t: `Noleggio scooter Paros | ${BRAND}`, d: `Scooter da 50 a 300 cc per tratti brevi e costa. Caschi inclusi con ${BRAND}.` },
    de: { t: `Roller mieten Paros | ${BRAND}`, d: `Roller von 50 bis 300 ccm für kurze Strecken und Küste. Helme inklusive bei ${BRAND}.` },
    nl: { t: `Scooter huren Paros | ${BRAND}`, d: `Scooters van 50 tot 300 cc voor korte ritten en kust. Helmen inbegrepen bij ${BRAND}.` },
    sv: { t: `Skoteruthyrning Paros | ${BRAND}`, d: `Scootrar från 50 till 300 cc för korta turer och kust. Hjälmar ingår hos ${BRAND}.` },
    pt: { t: `Aluguer scooters Paros | ${BRAND}`, d: `Scooters de 50 a 300 cc para trajetos curtos e costa. Capacetes incluídos com a ${BRAND}.` },
    ru: { t: `Прокат скутеров Парос | ${BRAND}`, d: `Скутеры от 50 до 300 куб.см для коротких поездок и побережья. Шлемы включены у ${BRAND}.` },
    tr: { t: `Scooter Kiralama Paros | ${BRAND}`, d: `Kısa mesafeler ve sahil için 50cc-300cc scooter. ${BRAND} ile kask dahil.` },
  },
  atvs: {
    en: { t: `ATV Rentals Antiparos & Paros | ${BRAND}`, d: `ATVs and buggies for dirt tracks and beach access. Safety brief and port pickup with ${BRAND}.` },
    el: { t: `Ενοικίαση ATV Αντίπαρος | ${BRAND}`, d: `ATV και buggy για χωματόδρομους και πρόσβαση σε παραλίες. Ενημέρωση ασφαλείας και παραλαβή στο λιμάνι.` },
    fr: { t: `Location quad Antiparos Paros | ${BRAND}`, d: `Quads et buggys pour pistes et accès plage. Briefing sécurité et retrait au port avec ${BRAND}.` },
    es: { t: `Alquiler ATV Antíparos Paros | ${BRAND}`, d: `ATV y buggies para pistas y acceso a playas. Briefing de seguridad y recogida en puerto con ${BRAND}.` },
    it: { t: `Noleggio ATV Antiparos Paros | ${BRAND}`, d: `ATV e buggy per piste e accesso spiaggia. Briefing sicurezza e ritiro al porto con ${BRAND}.` },
    de: { t: `ATV mieten Antiparos Paros | ${BRAND}`, d: `ATVs und Buggys für Pisten und Strandzugang. Sicherheitsbriefing und Hafenabholung bei ${BRAND}.` },
    nl: { t: `ATV huren Antiparos Paros | ${BRAND}`, d: `ATV's en buggy's voor paden en strandtoegang. Veiligheidsbriefing en havenophalen bij ${BRAND}.` },
    sv: { t: `ATV Antiparos Paros | ${BRAND}`, d: `ATV och buggies för grusvägar och strandaccess. Säkerhetsgenomgång och hamnhämtning hos ${BRAND}.` },
    pt: { t: `Aluguer ATV Antíparos Paros | ${BRAND}`, d: `ATVs e buggies para trilhos e acesso à praia. Briefing de segurança e recolha no porto com a ${BRAND}.` },
    ru: { t: `Аренда ATV Антипарос Парос | ${BRAND}`, d: `Квадроциклы и багги для грунтовых дорог и пляжей. Инструктаж и подача в порту у ${BRAND}.` },
    tr: { t: `ATV Kiralama Antiparos Paros | ${BRAND}`, d: `Toprak yollar ve plaj erişimi için ATV ve buggy. ${BRAND} ile güvenlik brifingi ve liman teslimi.` },
  },
  bikes: {
    en: { t: `Bike & E-Bike Rentals | ${BRAND}`, d: `Bicycles and e-bikes for short island hops when you want open air without a motor licence.` },
    el: { t: `Ενοικίαση Ποδηλάτων | ${BRAND}`, d: `Ποδήλατα και e-bike για κοντινές διαδρομές όταν θέλετε αέρα χωρίς δίπλωμα μηχανής.` },
    fr: { t: `Location vélos et e-bikes | ${BRAND}`, d: `Vélos et e-bikes pour petits trajets quand vous voulez l'air libre sans permis moto.` },
    es: { t: `Alquiler bicis y e-bikes | ${BRAND}`, d: `Bicicletas y e-bikes para trayectos cortos cuando quiere aire libre sin licencia de moto.` },
    it: { t: `Noleggio bici e e-bike | ${BRAND}`, d: `Bici e e-bike per tratti brevi quando vuoi aria aperta senza patente moto.` },
    de: { t: `Fahrrad & E-Bike mieten | ${BRAND}`, d: `Fahrräder und E-Bikes für kurze Inselwege, wenn Sie frische Luft ohne Motorradführerschein wollen.` },
    nl: { t: `Fiets & e-bike huren | ${BRAND}`, d: `Fietsen en e-bikes voor korte eilandritten als u frisse lucht wilt zonder motorrijbewijs.` },
    sv: { t: `Cykel & elcykel | ${BRAND}`, d: `Cyklar och elcyklar för korta öturer när du vill ha frisk luft utan motorcykelkörkort.` },
    pt: { t: `Aluguer bicicletas e e-bikes | ${BRAND}`, d: `Bicicletas e e-bikes para trajetos curtos quando quer ar livre sem carta de moto.` },
    ru: { t: `Прокат велосипедов и e-bike | ${BRAND}`, d: `Велосипеды и e-bike для коротких поездок, когда нужен свежий воздух без прав на мото.` },
    tr: { t: `Bisiklet ve E-Bike Kiralama | ${BRAND}`, d: `Motor ehliyeti olmadan açık hava isteyenler için kısa ada turlarına bisiklet ve e-bike.` },
  },
};

for (const [slug, byLoc] of Object.entries(cats)) {
  const map = {};
  for (const loc of LOCALES) {
    map[loc] = { title: byLoc[loc].t, description: `${byLoc[loc].d} ${pickup[loc]}` };
  }
  seo[`fleet-category/${slug}`] = L(map);
}

// ─── VEHICLES ───────────────────────────────────────────────────────
const vehicleTitle = {
  en: (n) => `Rent ${n} in Paros & Antiparos | ${BRAND}`,
  el: (n) => `Ενοικίαση ${n} σε Πάρο & Αντίπαρο | ${BRAND}`,
  fr: (n) => `Louer ${n} à Paros & Antiparos | ${BRAND}`,
  es: (n) => `Alquilar ${n} en Paros y Antíparos | ${BRAND}`,
  it: (n) => `Noleggia ${n} a Paros e Antiparos | ${BRAND}`,
  de: (n) => `${n} mieten auf Paros & Antiparos | ${BRAND}`,
  nl: (n) => `${n} huren op Paros & Antiparos | ${BRAND}`,
  sv: (n) => `Hyr ${n} på Paros & Antiparos | ${BRAND}`,
  pt: (n) => `Alugar ${n} em Paros e Antíparos | ${BRAND}`,
  ru: (n) => `Аренда ${n} на Паросе и Антипаросе | ${BRAND}`,
  tr: (n) => `Paros & Antiparos ${n} Kiralama | ${BRAND}`,
};

const vehicleDesc = {
  en: (n, cat) => `Book the ${n} (${cat}) for Paros and Antiparos. Island pickup at port, airport or villa with ${BRAND}.`,
  el: (n, cat) => `Κλείστε το ${n} (${cat}) για Πάρο και Αντίπαρο. Παραλαβή σε λιμάνι, αεροδρόμιο ή βίλα με την ${BRAND}.`,
  fr: (n, cat) => `Réservez le ${n} (${cat}) pour Paros et Antiparos. Retrait port, aéroport ou villa avec ${BRAND}.`,
  es: (n, cat) => `Reserve el ${n} (${cat}) para Paros y Antíparos. Recogida en puerto, aeropuerto o villa con ${BRAND}.`,
  it: (n, cat) => `Prenota la ${n} (${cat}) per Paros e Antiparos. Ritiro al porto, aeroporto o villa con ${BRAND}.`,
  de: (n, cat) => `Buchen Sie den ${n} (${cat}) für Paros und Antiparos. Abholung Hafen, Flughafen oder Villa bei ${BRAND}.`,
  nl: (n, cat) => `Boek de ${n} (${cat}) voor Paros en Antiparos. Ophalen in haven, luchthaven of villa bij ${BRAND}.`,
  sv: (n, cat) => `Boka ${n} (${cat}) för Paros och Antiparos. Hämtning i hamn, flygplats eller villa hos ${BRAND}.`,
  pt: (n, cat) => `Reserve o ${n} (${cat}) para Paros e Antíparos. Recolha no porto, aeroporto ou villa com a ${BRAND}.`,
  ru: (n, cat) => `Забронируйте ${n} (${cat}) для Пароса и Антипароса. Подача в порт, аэропорт или к вилле у ${BRAND}.`,
  tr: (n, cat) => `Paros ve Antiparos için ${n} (${cat}) ayırtın. ${BRAND} ile liman, havalimanı veya villa teslimi.`,
};

const catLabel = {
  mini: { en: "mini", el: "μικρό", fr: "mini", es: "mini", it: "mini", de: "Kleinwagen", nl: "mini", sv: "mini", pt: "mini", ru: "мини", tr: "mini" },
  compact: { en: "compact", el: "compact", fr: "compacte", es: "compacto", it: "compatta", de: "Kompakt", nl: "compact", sv: "kompakt", pt: "compacto", ru: "компакт", tr: "kompakt" },
  crossover: { en: "crossover", el: "crossover", fr: "crossover", es: "crossover", it: "crossover", de: "Crossover", nl: "crossover", sv: "crossover", pt: "crossover", ru: "кроссовер", tr: "crossover" },
  suvs: { en: "SUV", el: "SUV", fr: "SUV", es: "SUV", it: "SUV", de: "SUV", nl: "SUV", sv: "SUV", pt: "SUV", ru: "SUV", tr: "SUV" },
  convertible: { en: "convertible", el: "cabrio", fr: "cabriolet", es: "descapotable", it: "cabrio", de: "Cabrio", nl: "cabrio", sv: "cabriolet", pt: "cabriolé", ru: "кабриолет", tr: "cabrio" },
  "people-carriers": { en: "people carrier", el: "πολυθέσιο", fr: "monospace", es: "monovolumen", it: "monovolume", de: "Großraum", nl: "personenwagen", sv: "stor bil", pt: "monovolume", ru: "вместительный", tr: "çok koltuklu" },
  scooters: { en: "scooter", el: "σκούτερ", fr: "scooter", es: "scooter", it: "scooter", de: "Roller", nl: "scooter", sv: "scooter", pt: "scooter", ru: "скутер", tr: "scooter" },
  atvs: { en: "ATV", el: "ATV", fr: "quad", es: "ATV", it: "ATV", de: "ATV", nl: "ATV", sv: "ATV", pt: "ATV", ru: "ATV", tr: "ATV" },
  bikes: { en: "bike", el: "ποδήλατο", fr: "vélo", es: "bici", it: "bici", de: "Fahrrad", nl: "fiets", sv: "cykel", pt: "bicicleta", ru: "велосипед", tr: "bisiklet" },
};

for (const v of fleet.vehicles) {
  const first = v.models?.[0];
  const name = first ? `${first.make} ${first.model}`.trim() : v.typeName;
  const key = `vehicle/${v.category}/${v.slug}`;
  const map = {};
  for (const loc of LOCALES) {
    const cat = catLabel[v.category]?.[loc] || v.category;
    map[loc] = {
      title: vehicleTitle[loc](name),
      description: `${vehicleDesc[loc](name, cat)} ${trust[loc]}`,
    };
  }
  seo[key] = L(map);
}

// Coverage check against manifest keys
const manifest = readFileSync(join(ROOT, "src/routes/manifest.generated.ts"), "utf8");
const needed = [];
const re = /"key": "([^"]+)"[\s\S]*?"indexable": (true|false)/g;
let m;
while ((m = re.exec(manifest))) {
  if (m[2] === "true") needed.push(m[1]);
}

const missing = needed.filter((k) => !seo[k]);
const extra = Object.keys(seo).filter((k) => !needed.includes(k));
if (missing.length) {
  console.error("MISSING keys:", missing);
  process.exit(1);
}
if (extra.length) console.warn("EXTRA keys (ok):", extra);

// Uniqueness + length report
let warns = 0;
for (const key of needed) {
  const titles = new Set();
  const descs = new Set();
  for (const loc of LOCALES) {
    const { title, description } = seo[key][loc];
    const tl = len(title);
    const dl = len(description);
    if (tl < TITLE_MIN || tl > TITLE_MAX) {
      console.warn(`LEN title ${key} [${loc}] = ${tl}: ${title}`);
      warns++;
    }
    if (dl < DESC_MIN || dl > DESC_MAX) {
      console.warn(`LEN desc ${key} [${loc}] = ${dl}: ${description}`);
      warns++;
    }
    if (/[—–]/.test(title) || /[—–]/.test(description)) {
      console.warn(`DASH ${key} [${loc}]`);
      warns++;
    }
    const tk = `${loc}::${title}`;
    const dk = `${loc}::${description}`;
    // cross-locale uniqueness within key
    if ([...titles].some((t) => t.endsWith(`::${title}`) === false && t.split("::")[1] === title)) {
      // same title string across locales
    }
    titles.add(`${loc}::${title}`);
    descs.add(`${loc}::${description}`);
  }
  const titleVals = LOCALES.map((l) => seo[key][l].title);
  const descVals = LOCALES.map((l) => seo[key][l].description);
  if (new Set(titleVals).size < LOCALES.length) {
    console.warn(`DUP titles across locales: ${key}`);
    warns++;
  }
  if (new Set(descVals).size < LOCALES.length) {
    console.warn(`DUP descs across locales: ${key}`);
    warns++;
  }
}

const outPath = join(ROOT, "content/seo-meta.json");
writeFileSync(outPath, JSON.stringify(seo, null, 2) + "\n");
console.log(`Wrote ${needed.length} routes × ${LOCALES.length} locales to ${outPath}`);
console.log(`Warnings: ${warns}`);
