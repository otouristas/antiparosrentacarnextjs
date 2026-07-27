import { getTranslations } from "next-intl/server";
import { Clock, Mail, MapPin, Phone, Ship, Truck } from "lucide-react";
import BookingWidget from "@/components/booking/BookingWidget";
import MarkdownBody from "@/components/content/MarkdownBody";
import GuideInlineCta from "@/components/content/GuideInlineCta";
import ContactForm from "@/components/ui/ContactForm";
import FaqAccordion from "@/components/content/FaqAccordion";
import RelatedLinks from "@/components/content/RelatedLinks";
import FinalCtaBlock from "@/components/cro/FinalCtaBlock";
import TrustBadges from "@/components/cro/TrustBadges";
import FleetCategoryDirectory from "@/components/fleet/FleetCategoryDirectory";
import GoogleReviewsSection from "@/components/reviews/GoogleReviewsSection";
import VehicleCard from "@/components/fleet/VehicleCard";
import JsonLd from "@/components/seo/JsonLd";
import Atmosphere from "@/components/ui/Atmosphere";
import EditorialSplit from "@/components/ui/EditorialSplit";
import OfficeMap from "@/components/ui/OfficeMap";
import {
  DestinationList,
  DestinationRow,
  ReasonRow,
} from "@/components/ui/DestinationList";
import Button from "@/components/ui/Button";
import Hero, { HERO_ART } from "@/components/ui/Hero";
import {
  type ContentPage,
  getPageBody,
  getPageDescription,
  getPageTitle,
} from "@/data/content-registry";
import { getVehicles } from "@/data/fleet";
import { FLEET_CATEGORY_ICON } from "@/data/fleet-icons";
import { hintCategorySlug } from "@/data/hint-category";
import { PICKUP_LOCATIONS } from "@/data/locations";
import { getHomeContent } from "@/content/home";
import { getMoneyContent } from "@/content/money";
import { hasPageCopy, getPageCopy, hasArticleCopy, getArticleCopy } from "@/content/loader";
import type { PageCopy } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { localizedHref } from "@/data/nav-links";
import { SITE } from "@/lib/site";
import { breadcrumbSchema, websiteSchema } from "@/lib/schema";
import { href } from "@/routes";

function pageCopyToMoney(copy: PageCopy) {
  return {
    h1: copy.h1,
    intro: copy.intro,
    ctaPrimary: copy.cta.primary,
    fleetTitle:
      copy.sections[1]?.heading || copy.sections[0]?.heading || copy.h1,
    faqTitle: copy.faqs.length
      ? copy.faqs[0].q.replace(/\?$/, "") + " & more"
      : "FAQs",
    finalTitle: copy.finalCta.heading,
    finalSubtitle: copy.finalCta.sub,
    sections: copy.sections.map((s) => ({
      title: s.heading,
      paragraphs: s.body,
    })),
    vehicleHints: undefined as { title: string; body: string }[] | undefined,
    faqs: copy.faqs,
    related: copy.related.map((r) => ({ to: r.to, anchor: r.anchor })),
  };
}

function heroImage(page: ContentPage): string {
  const img = page.images.find((i) => i.startsWith("/")) || page.images[0];
  if (img?.startsWith("/")) return img;
  if (img?.includes("/media/")) {
    try {
      return new URL(img).pathname;
    } catch {
      /* fall through */
    }
  }
  return "/images/hero-jeep.webp";
}

function localePath(locale: Locale, path: string) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean === "/" ? "/" : clean.endsWith("/") ? clean : `${clean}/`}`;
}

const LOCATION_ICON: Record<string, typeof MapPin> = {
  "paros-airport": Truck,
  "paros-port": Ship,
  "antiparos-port": Ship,
};

function readingMinutes(markdown: string): number {
  const words = markdown
    .replace(/[#*_>[\]()]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

/* ========================================================================== */
/* HOME                                                                        */
/* ========================================================================== */

export async function HomeTemplate({
  page,
  locale,
}: {
  page: ContentPage;
  locale: Locale;
}) {
  const legacy = getHomeContent(locale);
  const native = hasPageCopy("home", locale) ? getPageCopy("home", locale) : null;
  const c = native
    ? {
        ...legacy,
        brand: SITE.name,
        h1: native.h1,
        valueProp: native.intro,
        ctaBook: native.cta.primary,
        ctaWhatsApp: native.cta.whatsapp,
        ctaCall: native.cta.call,
        whyTitle: native.sections[0]?.heading ?? legacy.whyTitle,
        whySubtitle: native.sections[0]?.body[0] ?? legacy.whySubtitle,
        whyItems:
          native.sections.slice(0, 4).map((s) => ({
            title: s.heading,
            body: s.body[0] ?? "",
          })) ?? legacy.whyItems,
        faqTitle: legacy.faqTitle,
        faqs: native.faqs.length ? native.faqs : legacy.faqs,
        guidesTitle: legacy.guidesTitle,
        guidesSubtitle: legacy.guidesSubtitle,
        finalTitle: native.finalCta.heading,
        finalSubtitle: native.finalCta.sub,
        finalCta: native.finalCta.button,
      }
    : legacy;
  const t = await getTranslations();
  const vehicles = await getVehicles();

  const featured = [
    vehicles.find((v) => v.slug === "compact-manual"),
    vehicles.find((v) => v.category === "scooters" && v.bookable),
    vehicles.find((v) => v.category === "atvs" && v.bookable),
    vehicles.find((v) => v.category === "suvs" && v.bookable),
  ].filter(Boolean) as typeof vehicles;

  const pickups = PICKUP_LOCATIONS.filter(
    (p) => p.isPrimary || p.id === "piraeus",
  );

  const guideLinks = native?.related?.length
    ? native.related.map((r) => ({ to: r.to, anchor: r.anchor }))
    : [
        {
          id: "how-to-get-to-paros-ferries-flights-airport",
          label: t("menu.howToGet"),
        },
        { id: "do-you-need-to-rent-a-car-in-paros", label: t("menu.needCar") },
        { id: "paros-vs-naxos-vs-antiparos", label: t("tpl.parosVsAntiparos") },
        { id: "best-things-to-do-in-paros", label: t("tpl.bestThings") },
      ];

  return (
    <>
      <JsonLd data={[websiteSchema(locale)]} />

      <Hero
        image={HERO_ART.home.desktop}
        imageMobile={HERO_ART.home.mobile}
        eyebrow={
          <p className="inline-flex items-center gap-2 rounded-pill bg-white/12 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-yellow backdrop-blur-sm">
            {c.brand}
          </p>
        }
        title={
          <h1 className="max-w-2xl font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            {c.h1}
          </h1>
        }
        lead={
          <p className="max-w-xl text-lg text-white/85 sm:text-xl">
            {c.valueProp}
          </p>
        }
        actions={
          <>
            <Button href="#book" variant="yellow" size="lg">
              {c.ctaBook}
            </Button>
            <Button href={SITE.whatsapp} variant="ghost" size="lg">
              {c.ctaWhatsApp}
            </Button>
            <Button href={`tel:${SITE.phone}`} variant="ghost" size="lg">
              <Phone className="h-4 w-4" />
              {c.ctaCall}
            </Button>
          </>
        }
        footer={<TrustBadges variant="dark" />}
        aside={<BookingWidget />}
      />

      {/* Vehicle categories — editorial directory (icons lead, no navy tile grid) */}
      <FleetCategoryDirectory
        locale={locale}
        title={c.categoriesTitle}
        lead={c.categoriesSubtitle}
      />

      {/* Pickup locations */}
      <Atmosphere tone="white">
        <EditorialSplit
          eyebrow={t("locations.title")}
          title={c.locationsTitle}
          lead={c.locationsSubtitle}
        >
          <DestinationList aria-label={c.locationsTitle}>
            {pickups.map((loc, i) => {
              const Icon = LOCATION_ICON[loc.id] ?? MapPin;
              const pageHref =
                loc.id === "paros-airport"
                  ? localizedHref("paros-airport-rent-a-car-port", locale)
                  : loc.id === "paros-port"
                    ? localizedHref("paros-port-parikia-rent-a-car", locale)
                    : loc.id === "piraeus"
                      ? localizedHref("piraeus-rent-a-car", locale)
                      : localizedHref("rent-a-car-antiparos-aggelos", locale);
              return (
                <DestinationRow
                  key={loc.id}
                  href={pageHref}
                  title={locale === "el" ? loc.nameEl : loc.name}
                  blurb={loc.description}
                  index={i}
                  icon={<Icon className="text-navy/55" strokeWidth={1.75} />}
                />
              );
            })}
          </DestinationList>
        </EditorialSplit>
      </Atmosphere>

      {/* Why us — numbered rows on navy */}
      <Atmosphere tone="navy">
        <EditorialSplit
          eyebrow={SITE.name}
          title={c.whyTitle}
          lead={c.whySubtitle}
          invert
        >
          <ul className="border-y border-foam/15">
            {c.whyItems.map((item, i) => (
              <ReasonRow
                key={item.title}
                marker={String(i + 1).padStart(2, "0")}
                title={item.title}
                body={item.body}
                index={i}
              />
            ))}
          </ul>
        </EditorialSplit>
      </Atmosphere>

      {/* Featured fleet */}
      <Atmosphere tone="sand">
        <div className="mx-auto max-w-page px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-navy/45">
                {t("fleet.title")}
              </p>
              <h2 className="mt-3 font-display text-4xl font-extrabold text-navy sm:text-5xl">
                {c.featuredTitle}
              </h2>
              <p className="mt-4 text-lg text-ink/65">{c.featuredSubtitle}</p>
            </div>
            <a
              href={href("fleet", locale)}
              className="group inline-flex min-h-12 items-center gap-2 border-b-2 border-yellow pb-1 text-sm font-bold text-navy transition-colors hover:border-navy"
            >
              {t("fleet.viewAll")}
            </a>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((v) => (
              <VehicleCard
                key={v.typeId}
                vehicle={v}
                href={href(`vehicle/${v.category}/${v.slug}`, locale)}
              />
            ))}
          </div>
        </div>
      </Atmosphere>

      <GoogleReviewsSection locale={locale} />

      {/* Routes / arrival */}
      <Atmosphere tone="light">
        <EditorialSplit
          eyebrow={t("locations.title")}
          title={c.routesTitle}
          lead={c.routesSubtitle}
        >
          <DestinationList aria-label={c.routesTitle}>
            {c.routes.map((r, i) => {
              const routeHref =
                i === 0
                  ? localizedHref("paros-airport-rent-a-car-port", locale)
                  : i === 1
                    ? localizedHref("paros-port-parikia-rent-a-car", locale)
                    : localizedHref("piraeus-rent-a-car", locale);
              return (
                <DestinationRow
                  key={r.title}
                  href={routeHref}
                  title={r.title}
                  blurb={r.body}
                  index={i}
                  marker={String(i + 1).padStart(2, "0")}
                />
              );
            })}
          </DestinationList>
        </EditorialSplit>
      </Atmosphere>

      <FaqAccordion title={c.faqTitle} faqs={c.faqs} />
      <RelatedLinks
        locale={locale}
        title={c.guidesTitle}
        lead={c.guidesSubtitle}
        links={guideLinks}
      />
      <FinalCtaBlock
        title={c.finalTitle}
        subtitle={c.finalSubtitle}
        ctaLabel={c.finalCta}
      />
    </>
  );
}

/* ========================================================================== */
/* MONEY (commercial landing pages)                                            */
/* ========================================================================== */

export async function MoneyTemplate({
  page,
  locale,
}: {
  page: ContentPage;
  locale: Locale;
}) {
  const pageKey = `money/${page.id}`;
  const native = hasPageCopy(pageKey, locale)
    ? getPageCopy(pageKey, locale)
    : null;
  const legacy = getMoneyContent(page.id, locale);
  const money = native ? pageCopyToMoney(native) : legacy;
  const body = getPageBody(page, locale);
  const path = page.paths?.[locale] || page.paths?.en || "/";

  if (!money) {
    return (
      <>
        <section className="relative z-10 bg-brand-light pb-4 pt-10">
          <div className="mx-auto max-w-page px-4 sm:px-6">
            <BookingWidget variant="bar" />
            <TrustBadges className="mt-4" />
          </div>
        </section>
        <article className="mx-auto max-w-page px-4 py-14 sm:px-6">
          <MarkdownBody markdown={body} />
        </article>
      </>
    );
  }

  const t = await getTranslations();
  const faqTitle = native
    ? locale === "el"
      ? "Συχνές ερωτήσεις"
      : locale === "de"
        ? "Häufige Fragen"
        : locale === "fr"
          ? "Questions fréquentes"
          : locale === "es"
            ? "Preguntas frecuentes"
            : locale === "it"
              ? "Domande frequenti"
              : "Frequently asked questions"
    : money.faqTitle;
  const ctaSecondary =
    native?.cta.secondary || native?.cta.whatsapp || "WhatsApp";
  const finalCtaLabel = native?.finalCta.button || money.ctaPrimary;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: money.h1, path },
          ]),
        ]}
      />

      <Hero
        image={("image" in money && money.image) || HERO_ART.money.desktop}
        imageMobile={HERO_ART.money.mobile}
        imageOpacity={0.45}
        scrim="soft"
        className="bg-navy pb-20 pt-16 text-foam sm:pb-24 sm:pt-24"
        innerClassName="!py-0 lg:!py-0"
        eyebrow={
          <p className="inline-flex rounded-pill bg-white/12 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-sky backdrop-blur-sm">
            {SITE.name}
          </p>
        }
        title={
          <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.08] sm:text-5xl">
            {money.h1}
          </h1>
        }
        lead={<p className="max-w-2xl text-lg text-foam/85">{money.intro}</p>}
        actions={
          <>
            <Button href="#book" variant="yellow" size="lg">
              {money.ctaPrimary}
            </Button>
            <Button href={SITE.whatsapp} variant="ghost" size="lg">
              {ctaSecondary}
            </Button>
          </>
        }
        footer={<TrustBadges variant="dark" />}
      />

      <section className="relative z-10 -mt-10 bg-brand-light pb-4">
        <div className="mx-auto max-w-page px-4 sm:px-6">
          <BookingWidget variant="bar" />
          <TrustBadges className="mt-4" />
        </div>
      </section>

      <Atmosphere tone="white">
        <EditorialSplit
          eyebrow={t("tpl.onThisPage")}
          title={money.h1}
          lead={money.intro}
        >
          <div className="space-y-10">
            {money.sections.map((s, i) => (
              <div
                key={s.title}
                className="relative border-l-2 border-yellow pl-5 sm:pl-6 animate-fade-up"
                style={{ animationDelay: `${Math.min(i, 6) * 55}ms` }}
              >
                <p className="font-display text-sm font-extrabold text-navy/35">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-1 font-display text-2xl font-extrabold text-navy sm:text-3xl">
                  {s.title}
                </h2>
                {s.paragraphs.map((p) => (
                  <p
                    key={p.slice(0, 40)}
                    className="mt-4 text-lg leading-relaxed text-ink/75"
                  >
                    {p}
                  </p>
                ))}
              </div>
            ))}
            {!money.sections.length && body ? (
              <MarkdownBody markdown={body} />
            ) : null}
          </div>
        </EditorialSplit>
      </Atmosphere>

      {money.vehicleHints?.length ? (
        <Atmosphere tone="sand">
          <EditorialSplit
            eyebrow={t("fleet.title")}
            title={money.fleetTitle}
            action={{ href: href("fleet", locale), label: t("fleet.viewAll") }}
          >
            <DestinationList aria-label={money.fleetTitle}>
              {money.vehicleHints.map((h, i) => {
                const slug = hintCategorySlug(h.title);
                return (
                  <DestinationRow
                    key={h.title}
                    href={href(`fleet-category/${slug}`, locale)}
                    title={h.title}
                    blurb={h.body}
                    index={i}
                    icon={
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={FLEET_CATEGORY_ICON[slug]}
                        alt=""
                        width={72}
                        height={72}
                      />
                    }
                  />
                );
              })}
            </DestinationList>
          </EditorialSplit>
        </Atmosphere>
      ) : native && money.related.length ? (
        <FleetCategoryDirectory
          locale={locale}
          title={money.fleetTitle}
          lead={money.intro}
        />
      ) : null}

      <FaqAccordion title={faqTitle} faqs={money.faqs} />
      <RelatedLinks locale={locale} links={money.related} />
      <FinalCtaBlock
        title={money.finalTitle}
        subtitle={money.finalSubtitle}
        ctaLabel={finalCtaLabel}
      />
    </>
  );
}

/* ========================================================================== */
/* GUIDE / BLOG                                                                */
/* ========================================================================== */

export async function GuideTemplate({
  page,
  locale,
}: {
  page: ContentPage;
  locale: Locale;
}) {
  const guideKey =
    page.type === "guide"
      ? `guide/${page.id}`
      : page.type === "contact"
        ? `contact/${page.id}`
        : page.type === "legal"
          ? `legal/${page.id}`
          : null;
  const native =
    guideKey && hasPageCopy(guideKey, locale)
      ? getPageCopy(guideKey, locale)
      : null;
  const article =
    page.type === "blog" && hasArticleCopy(page.id, locale)
      ? getArticleCopy(page.id, locale)
      : null;
  const body = article?.body || getPageBody(page, locale);
  const title =
    article?.h1 ||
    native?.h1 ||
    page.h1s?.[locale] ||
    getPageTitle(page, locale).split("|")[0].trim();
  const path = page.paths?.[locale] || page.paths?.en || "/";
  const description =
    article?.seo.description ||
    native?.seo.description ||
    getPageDescription(page, locale);
  const lead =
    article?.intro ||
    native?.intro ||
    (description && !description.includes("AGGELOS Rentals, car, scooter")
      ? description
      : undefined);
  const relatedNative = article?.related || native?.related;
  const finalNative = article?.finalCta || native?.finalCta;
  const t = await getTranslations();
  const minutes = readingMinutes(body);

  const guideHero =
    heroImage(page) !== "/images/hero-jeep.webp"
      ? heroImage(page)
      : HERO_ART.guide.desktop;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: t("menu.guides"), path: localePath(locale, "/guides/") },
            { name: title, path },
          ]),
        ]}
      />

      <Hero
        image={guideHero}
        imageMobile={HERO_ART.guide.mobile}
        imageOpacity={0.45}
        scrim="soft"
        className="bg-navy text-foam"
        align="start"
        eyebrow={
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold uppercase tracking-[0.18em]">
            <span className="rounded-sm bg-yellow px-2 py-0.5 text-navy">
              {t("tpl.travelGuide")}
            </span>
            <span className="inline-flex items-center gap-1.5 text-foam/70">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              {t("tpl.readMin", { min: minutes })}
            </span>
            <span className="text-foam/55">{t("tpl.updated2026")}</span>
          </div>
        }
        title={
          <h1 className="max-w-3xl font-display text-3xl font-extrabold leading-tight sm:text-5xl">
            {title}
          </h1>
        }
        lead={
          <p className="max-w-2xl text-lg text-foam/80">
            {lead || t("tpl.guideLead")}
          </p>
        }
        actions={
          <>
            <Button href="#book" variant="yellow" size="md">
              {t("cta.button")}
            </Button>
            <Button href={`tel:${SITE.phone}`} variant="ghost" size="md">
              <Phone className="h-4 w-4" aria-hidden />
              {SITE.phoneDisplay}
            </Button>
            <Button href={SITE.whatsapp} variant="whatsapp" size="md">
              WhatsApp
            </Button>
          </>
        }
        footer={
          <TrustBadges
            variant="dark"
            className="mt-8 border-t border-foam/15 pt-6"
          />
        }
      />

      <div className="mx-auto grid max-w-page gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_360px]">
        <article>
          <MarkdownBody markdown={body} />
          <GuideInlineCta
            title={t("tpl.inlineCtaTitle")}
            subtitle={t("tpl.inlineCtaSub")}
            primaryLabel={t("cta.button")}
          />
        </article>
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div id="book" className="scroll-mt-24">
            <BookingWidget compact />
          </div>
          <TrustBadges className="mt-5" />
          <div className="mt-6 border border-navy/10 bg-foam p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-navy/45">
              {t("tpl.needHelp")}
            </p>
            <p className="mt-2 text-sm text-ink/70">{t("tpl.needHelpBody")}</p>
            <div className="mt-4 flex flex-col gap-2">
              <Button href={SITE.whatsapp} variant="whatsapp" size="sm" full>
                WhatsApp
              </Button>
              <Button
                href={`tel:${SITE.phone}`}
                variant="outline"
                size="sm"
                full
              >
                {SITE.phoneDisplay}
              </Button>
              <Button
                href={localePath(locale, "/guides/")}
                variant="outline"
                size="sm"
                full
              >
                {t("tpl.moreGuides")}
              </Button>
            </div>
          </div>
        </aside>
      </div>

      <RelatedLinks
        locale={locale}
        title={t("tpl.bookYourRental")}
        links={
          relatedNative?.length
            ? relatedNative.map((r) => ({ to: r.to, anchor: r.anchor }))
            : [
                { id: "paros-rent-a-car", label: t("nav.parosCar") },
                {
                  id: "rent-a-car-antiparos-aggelos",
                  label: t("nav.antiparosCar"),
                },
                { href: "/fleet/", label: t("menu.allFleet") },
                { href: "/guides/", label: t("menu.guides") },
                { href: "/faq/", label: t("nav.faq") },
                { id: "contact", label: t("nav.contact") },
              ]
        }
      />
      <FinalCtaBlock
        title={finalNative?.heading}
        subtitle={finalNative?.sub}
        ctaLabel={finalNative?.button}
      />
    </>
  );
}

/* ========================================================================== */
/* CONTACT / ABOUT                                                             */
/* ========================================================================== */

export async function ContactAboutTemplate({
  page,
  locale,
}: {
  page: ContentPage;
  locale: Locale;
}) {
  const body = getPageBody(page, locale);
  const title =
    page.h1s?.[locale] || getPageTitle(page, locale).split("|")[0].trim();
  const isContact = page.id === "contact";
  const t = await getTranslations();

  if (isContact) {
    return (
      <>
        <Atmosphere tone="sand">
          <div className="mx-auto max-w-page px-4 py-16 sm:px-6 sm:py-20">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-navy/45">
              {t("nav.contact")}
            </p>
            <h1 className="mt-3 max-w-2xl font-display text-4xl font-extrabold text-navy sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink/65">
              {t("pages.contact.subtitle")}
            </p>
          </div>
        </Atmosphere>

        <Atmosphere tone="white" orb={false}>
          <EditorialSplit
            eyebrow={t("pages.contact.formTitle")}
            title={t("pages.contact.h1")}
            lead={t("pages.contact.subtitle")}
          >
            <div className="rounded-lg border border-line bg-brand-light/80 p-5 sm:p-8">
              <ContactForm />
            </div>
          </EditorialSplit>
        </Atmosphere>

        <Atmosphere tone="sand">
          <EditorialSplit
            eyebrow={SITE.name}
            title={t("nav.contact")}
            lead={`${SITE.address.street}, ${SITE.address.city}`}
          >
            <DestinationList aria-label={t("nav.contact")}>
              <DestinationRow
                href={`tel:${SITE.phone}`}
                title={t("pages.contact.phone")}
                blurb={SITE.phoneDisplay}
                index={0}
                icon={<Phone className="text-navy/55" strokeWidth={1.75} />}
              />
              <DestinationRow
                href={SITE.whatsapp}
                title="WhatsApp"
                blurb={t("pages.contact.mobile")}
                index={1}
                icon={<Phone className="text-navy/55" strokeWidth={1.75} />}
              />
              <DestinationRow
                href={`mailto:${SITE.email}`}
                title={t("pages.contact.email")}
                blurb={SITE.email}
                index={2}
                icon={<Mail className="text-navy/55" strokeWidth={1.75} />}
              />
              <DestinationRow
                href={`https://maps.google.com/?q=${encodeURIComponent(`${SITE.address.street}, ${SITE.address.city}`)}`}
                title={t("pages.contact.address")}
                blurb={`${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}`}
                index={3}
                icon={<MapPin className="text-navy/55" strokeWidth={1.75} />}
              />
              <DestinationRow
                href="#book"
                title={t("pages.contact.hours")}
                blurb={SITE.hours}
                index={4}
                icon={<Clock className="text-navy/55" strokeWidth={1.75} />}
              />
            </DestinationList>
          </EditorialSplit>
        </Atmosphere>

        <Atmosphere tone="white" orb={false}>
          <div className="mx-auto max-w-page px-4 py-14 sm:px-6 sm:py-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-navy/45">
              {t("pages.contact.address")}
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl">
              {t("pages.contact.mapTitle")}
            </h2>
            <OfficeMap title={t("pages.contact.mapTitle")} className="mt-8" />
          </div>
        </Atmosphere>

        <section id="book" className="scroll-mt-24 bg-brand-light py-10">
          <div className="mx-auto max-w-page px-4 sm:px-6">
            <BookingWidget variant="bar" />
            <TrustBadges className="mt-4" />
          </div>
        </section>

        <FinalCtaBlock />
      </>
    );
  }

  return (
    <>
      <Atmosphere tone="sand">
        <div className="mx-auto max-w-page px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-navy/45">
            {t("nav.about")}
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-extrabold text-navy sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ink/65">
            {t("pages.about.story1")}
          </p>
        </div>
      </Atmosphere>

      <Atmosphere tone="white" orb={false}>
        <EditorialSplit
          eyebrow={t("tpl.ourStory")}
          title={t("pages.about.h1")}
          lead={t("pages.about.story1")}
        >
          <article className="prose-wrap">
            <MarkdownBody markdown={body} />
          </article>
        </EditorialSplit>
      </Atmosphere>

      <FinalCtaBlock />
    </>
  );
}

/* ========================================================================== */
/* FALLBACK                                                                    */
/* ========================================================================== */

export function ContentTemplate({
  page,
  locale,
}: {
  page: ContentPage;
  locale: Locale;
}) {
  const body = getPageBody(page, locale);
  const showBooking = page.type === "fleet" || page.type === "guide";
  return (
    <div
      className={
        showBooking
          ? "mx-auto grid max-w-page gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_380px]"
          : "mx-auto max-w-3xl px-4 py-14 sm:px-6"
      }
    >
      <article>
        <MarkdownBody markdown={body} />
        {page.type === "contact" && (
          <div className="mt-12">
            <ContactForm />
          </div>
        )}
      </article>
      {showBooking && (
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <BookingWidget />
        </aside>
      )}
    </div>
  );
}

export function renderPageTemplate(page: ContentPage, locale: Locale) {
  if (page.type === "home") return <HomeTemplate page={page} locale={locale} />;
  if (page.type === "money")
    return <MoneyTemplate page={page} locale={locale} />;
  if (page.type === "guide" || page.type === "blog") {
    return <GuideTemplate page={page} locale={locale} />;
  }
  if (page.type === "contact") {
    return <ContactAboutTemplate page={page} locale={locale} />;
  }
  return <ContentTemplate page={page} locale={locale} />;
}
