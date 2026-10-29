import { SITE } from "@/lib/site";
import { localizedHref } from "@/data/nav-links";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { FLEET_CATEGORIES } from "@/data/fleet-categories";

export default async function Footer() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("footer");
  const tm = await getTranslations("menu");
  const tn = await getTranslations("nav");
  const tf = await getTranslations("fleet");

  const locations = [
    { id: "rent-a-car-antiparos-aggelos", label: tn("antiparosCar") },
    { id: "paros-rent-a-car", label: tn("parosCar") },
    { id: "paros-airport-rent-a-car-port", label: tn("parosAirport") },
    { id: "paros-port-parikia-rent-a-car", label: tm("parosPort") },
    { id: "piraeus-rent-a-car", label: tm("piraeus") },
  ];

  const fleet = FLEET_CATEGORIES.filter((c) =>
    ["mini", "suvs", "scooters", "atvs", "bikes"].includes(c.slug),
  ).map((c) => ({
    href: `/${locale}/fleet/${c.slug}/`,
    label: tf(`categories.${c.slug}`),
  }));

  const company = [
    { id: "about-us", label: tn("about") },
    { id: "contact", label: tn("contact") },
    { href: `/${locale}/faq/`, label: tn("faq") },
    { href: `/${locale}/reviews/`, label: tn("reviews") },
    { id: "travel-tips-for-antiparos-and-paros", label: tm("travelTips") },
    { id: "terms-conditions", label: t("terms") },
    { href: `/${locale}/privacy-policy/`, label: t("privacy") },
    { id: "cookie-policy-eu", label: "Cookies" },
  ];

  const sisterSites = [
    { href: SITE.related.rooms, label: t("sisterRooms") },
    { href: SITE.related.transfers, label: t("sisterTransfers") },
    { href: SITE.related.piraeus, label: t("sisterPiraeus") },
  ];

  const hrefFor = (item: { id?: string; href?: string }) => {
    if (item.href) return item.href;
    return localizedHref(item.id || "home", locale);
  };

  return (
    <footer className="bg-navy text-foam">
      <div className="mx-auto grid max-w-page gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="relative mb-4 h-14 w-44">
            <Image
              src="/aggelos-rent-a-car-logo-final.png"
              alt="AGGELOS Rentals"
              fill
              className="object-contain object-left brightness-0 invert"
              sizes="176px"
            />
          </div>
          <p className="text-sm leading-relaxed text-foam/70">{t("tagline")}</p>
          <ul className="mt-4 space-y-1 text-sm text-foam/85">
            <li>
              {SITE.address.street}, {SITE.address.postalCode}
            </li>
            <li>
              <a href={`tel:${SITE.phone}`} className="hover:text-yellow">
                {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-yellow">
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-yellow">
            {tm("locations")}
          </h3>
          <ul className="space-y-2 text-sm text-foam/80">
            {locations.map((l) => (
              <li key={l.id}>
                <a
                  href={localizedHref(l.id, locale)}
                  className="hover:text-foam"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-yellow">
            {t("fleet")}
          </h3>
          <ul className="space-y-2 text-sm text-foam/80">
            {fleet.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-foam">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-yellow">
            {t("company")}
          </h3>
          <ul className="space-y-2 text-sm text-foam/80">
            {company.map((l) => (
              <li key={l.id || l.href}>
                <a href={hrefFor(l)} className="hover:text-foam">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-foam/10">
        <div className="mx-auto flex max-w-page flex-col gap-3 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-yellow">
            {t("sisterSites")}
          </h3>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-foam/80">
            {sisterSites.map((site) => (
              <li key={site.href}>
                <a
                  href={site.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foam"
                >
                  {site.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-foam/10">
        <div className="mx-auto flex max-w-page flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-center text-xs text-foam/50 sm:text-left">
            © {new Date().getFullYear()} AGGELOS Rentals · Antiparos Rent A Car
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs text-foam/50 sm:justify-end">
            <a
              href="https://anotherseoguru.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foam"
            >
              Designed by{" "}
              <span className="font-semibold text-foam/75">AnotherSEOGuru</span>
            </a>
            <a
              href="https://touristas.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foam"
            >
              Powered by{" "}
              <span className="font-semibold text-foam/75">Touristas AI</span>
            </a>
            <a
              href="https://discovercyclades.gr/en"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition hover:opacity-90"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                loading="lazy"
                width={20}
                height={20}
                decoding="async"
                className="h-5 w-5"
                src="https://discovercyclades.gr/favicon.svg"
              />
              <span className="leading-tight">
                <span className="block text-xs font-bold text-foam">
                  Discover Cyclades
                </span>
                <span className="block text-[9px] font-medium uppercase tracking-wider text-foam/40">
                  Partner
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Payment methods on a light strip */}
      <div className="bg-foam">
        <div className="mx-auto max-w-page px-4 py-4 sm:px-6">
          <div className="relative mx-auto h-10 w-full max-w-3xl sm:h-12">
            <Image
              src="/images/payment-methods.webp"
              alt="Accepted payment methods: Visa, Mastercard, Maestro, American Express, PayPal — secured with Comodo SSL"
              fill
              className="object-contain object-center"
              sizes="(max-width:640px) 94vw, 768px"
            />
          </div>
        </div>
      </div>
    
      <p data-asg-copyright="notice" style={{ maxWidth: "80rem", margin: "1rem auto 0", padding: "0 1rem 1rem", fontSize: "0.75rem", lineHeight: 1.6 }}>
        <a href="/intellectual-property.html" style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: "0.2em" }}>Code &amp; development: AnotherSEOGuru, a company of Touristas Technologies. Copyright &amp; permitted use.</a>
      </p>
    </footer>
  );
}
