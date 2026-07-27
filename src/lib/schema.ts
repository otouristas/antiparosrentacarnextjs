import { SITE } from "@/lib/site";
import { locales, type Locale } from "@/i18n/routing";
import { getReviewStats } from "@/data/reviews";

const LOGO = `${SITE.domain}/aggelos-rent-a-car-logo-final.png`;

const POSTAL_ADDRESS = {
 "@type": "PostalAddress",
 streetAddress: SITE.address.street,
 addressLocality: SITE.address.city,
 addressRegion: SITE.address.region,
 postalCode: SITE.address.postalCode,
 addressCountry: SITE.address.country,
} as const;

/** Stable @id so Organization, AutoRental and page-level nodes can cross-link. */
export const ORG_ID = `${SITE.domain}/#organization`;
export const BUSINESS_ID = `${SITE.domain}/#business`;

export function organizationSchema() {
 return {
 "@context": "https://schema.org",
 "@type": "Organization",
 "@id": ORG_ID,
 name: SITE.name,
 url: SITE.domain,
 logo: { "@type": "ImageObject", url: LOGO },
 email: SITE.email,
 telephone: SITE.phone,
 foundingDate: String(SITE.foundedYear),
 sameAs: Object.values(SITE.social),
 address: POSTAL_ADDRESS,
 contactPoint: [
 {
 "@type": "ContactPoint",
 telephone: SITE.phone,
 contactType: "reservations",
 email: SITE.email,
 areaServed: ["GR"],
 availableLanguage: [...locales],
 },
 ],
 };
}

export function autoRentalSchema() {
 const stats = getReviewStats();
 return {
 "@context": "https://schema.org",
 "@type": ["AutoRental", "LocalBusiness", "RentACar"],
 "@id": BUSINESS_ID,
 name: SITE.name,
 url: SITE.domain,
 parentOrganization: { "@id": ORG_ID },
 telephone: SITE.phone,
 email: SITE.email,
 foundingDate: String(SITE.foundedYear),
 image: LOGO,
 address: POSTAL_ADDRESS,
 geo: {
 "@type": "GeoCoordinates",
 latitude: SITE.coordinates.lat,
 longitude: SITE.coordinates.lng,
 },
 hasMap: SITE.googleMapsUrl,
 // Structured form alongside the human-readable string, the string alone is
 // not machine-parseable for opening-hours rich results.
 openingHours: SITE.hours,
 openingHoursSpecification: [
 {
 "@type": "OpeningHoursSpecification",
 dayOfWeek: [
 "Monday",
 "Tuesday",
 "Wednesday",
 "Thursday",
 "Friday",
 "Saturday",
 "Sunday",
 ],
 opens: "08:00",
 closes: "22:00",
 },
 ],
 sameAs: [...Object.values(SITE.social), SITE.googleMapsUrl, SITE.trustpilotUrl],
 areaServed: [
 { "@type": "Place", name: "Antiparos" },
 { "@type": "Place", name: "Paros" },
 { "@type": "Place", name: "Paros Airport" },
 { "@type": "Place", name: "Parikia" },
 { "@type": "Place", name: "Piraeus" },
 ],
 priceRange: "€€", ...(stats.reviewCount > 0
 ? {
 aggregateRating: {
 "@type": "AggregateRating",
 ratingValue: stats.rating,
 reviewCount: stats.reviewCount,
 bestRating: 5,
 worstRating: 1,
 },
 }
 : {}),
 };
}

/**
 * WebSite node. Homepage only, it describes the site, not each page.
 *
 * NOTE: the previous version declared a SearchAction whose urlTemplate was
 * `${domain}/#book` with `query-input: required name=search_term_string`. There
 * is no `{search_term_string}` placeholder in that template, so the action was
 * invalid and silently discarded. It is omitted rather than faked: the booking
 * flow takes structured params (dates, locations, age band), not a free-text
 * query, so there is no honest sitelinks-searchbox target to declare.
 */
export function websiteSchema(locale?: Locale) {
 return {
 "@context": "https://schema.org",
 "@type": "WebSite",
 "@id": `${SITE.domain}/#website`,
 name: SITE.name,
 url: SITE.domain,
 publisher: { "@id": ORG_ID },
 inLanguage: locale ? locale : [...locales],
 };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
 return {
 "@context": "https://schema.org",
 "@type": "BreadcrumbList",
 itemListElement: items.map((item, i) => ({
 "@type": "ListItem",
 position: i + 1,
 name: item.name,
 item: `${SITE.domain}${item.path}`,
 })),
 };
}

export function faqSchema(faqs: { q: string; a: string }[], locale?: Locale) {
 return {
 "@context": "https://schema.org",
 "@type": "FAQPage", ...(locale ? { inLanguage: locale } : {}),
 mainEntity: faqs.map((f) => ({
 "@type": "Question",
 name: f.q,
 acceptedAnswer: { "@type": "Answer", text: f.a },
 })),
 };
}

export function articleSchema(opts: {
 title: string;
 description: string;
 path: string;
 datePublished: string;
 dateModified?: string;
 image?: string;
 locale?: Locale;
}) {
 return {
 "@context": "https://schema.org",
 "@type": "Article",
 headline: opts.title,
 description: opts.description,
 datePublished: opts.datePublished,
 dateModified: opts.dateModified ?? opts.datePublished, ...(opts.locale ? { inLanguage: opts.locale } : {}), ...(opts.image ? { image: opts.image.startsWith("http") ? opts.image : `${SITE.domain}${opts.image}` } : {}),
 author: { "@id": ORG_ID },
 publisher: { "@id": ORG_ID },
 mainEntityOfPage: `${SITE.domain}${opts.path}`,
 };
}

/**
 * A rental vehicle type.
 *
 * Uses schema.org `Car` / `Motorcycle` / `Vehicle` rather than the generic
 * `Product` the fleet pages emitted, and only attaches an Offer when the type
 * is actually bookable, GoCars returns `lowest_price: 0` for the 9-seater,
 * which must not be advertised as a €0 rental.
 */
export function vehicleSchema(opts: {
 name: string;
 description: string;
 url: string;
 image?: string;
 vehicleType: "car" | "moto" | "atv";
 priceFrom?: number | null;
 bookable: boolean;
 seats?: number | null;
 transmission?: string | null;
 fuel?: string | null;
 locale?: Locale;
}) {
 const type =
 opts.vehicleType === "moto" ? "Motorcycle" : opts.vehicleType === "car" ? "Car" : "Vehicle";

 return {
 "@context": "https://schema.org",
 "@type": type,
 name: opts.name,
 description: opts.description,
 url: opts.url, ...(opts.image ? { image: opts.image.startsWith("http") ? opts.image : `${SITE.domain}${opts.image}` } : {}), ...(opts.locale ? { inLanguage: opts.locale } : {}), ...(opts.seats ? { seatingCapacity: opts.seats } : {}), ...(opts.transmission ? { vehicleTransmission: opts.transmission } : {}), ...(opts.fuel ? { fuelType: opts.fuel } : {}), ...(opts.bookable && opts.priceFrom
 ? {
 offers: {
 "@type": "Offer",
 price: opts.priceFrom,
 priceCurrency: "EUR",
 availability: "https://schema.org/InStock",
 url: opts.url,
 seller: { "@id": BUSINESS_ID },
 priceSpecification: {
 "@type": "UnitPriceSpecification",
 price: opts.priceFrom,
 priceCurrency: "EUR",
 unitCode: "DAY",
 referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "DAY" },
 },
 },
 }
 : {}),
 };
}

/** Collection page listing (fleet index, category pages). */
export function itemListSchema(items: { name: string; url: string }[], name?: string) {
 return {
 "@context": "https://schema.org",
 "@type": "ItemList", ...(name ? { name } : {}),
 numberOfItems: items.length,
 itemListElement: items.map((item, i) => ({
 "@type": "ListItem",
 position: i + 1,
 name: item.name,
 url: item.url,
 })),
 };
}
