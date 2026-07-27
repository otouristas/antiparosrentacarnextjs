import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import {
  getCategory,
  getVehiclesByCategory,
  isFleetCategorySlug,
  vehicleDisplayName,
} from "@/data/fleet";
import { FLEET_CATEGORIES } from "@/data/fleet-categories";
import { FAQ_DATA } from "@/data/faq";
import { metadataFor } from "@/seo/metadata";
import { getRouteSeo } from "@/seo/route-seo";
import FleetCatalog from "@/components/fleet/FleetCatalog";
import FleetAlternatives from "@/components/fleet/FleetAlternatives";
import CategoryHighlights from "@/components/fleet/CategoryHighlights";
import FaqAccordion from "@/components/content/FaqAccordion";
import FinalCtaBlock from "@/components/cro/FinalCtaBlock";
import RelatedLinks from "@/components/content/RelatedLinks";
import BookingWidget from "@/components/booking/BookingWidget";
import TrustBadges from "@/components/cro/TrustBadges";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";
import { hasCategoryCopy, getCategoryCopy } from "@/content/loader";
import type { Locale } from "@/i18n/routing";
import { absoluteUrl } from "@/routes";
import { FLEET_CATEGORY_ICON } from "@/data/fleet-icons";

export function generateStaticParams() {
  return FLEET_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  if (!isFleetCategorySlug(category)) return {};
  const key = `fleet-category/${category}`;

  if (hasCategoryCopy(category, locale as Locale)) {
    const copy = getCategoryCopy(category, locale as Locale);
    if (copy.seo.title?.trim() && copy.seo.description?.trim()) {
      return metadataFor(key, locale as Locale, {
        title: copy.seo.title,
        description: copy.seo.description,
      });
    }
  }

  return metadataFor(key, locale as Locale, getRouteSeo(key, locale as Locale));
}

export default async function FleetCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale: loc, category } = await params;
  const locale = loc as Locale;
  setRequestLocale(locale);
  if (!isFleetCategorySlug(category)) notFound();

  const cat = getCategory(category);
  if (!cat) notFound();

  const t = await getTranslations("fleet");
  const list = await getVehiclesByCategory(category);
  const label = t(`categories.${category}`);
  const copy = hasCategoryCopy(category, locale)
    ? getCategoryCopy(category, locale)
    : null;

  const faqs = FAQ_DATA.filter((f) =>
    category === "scooters"
      ? f.id.includes("scooter") || f.category === "licensing"
      : category === "atvs"
        ? f.id.includes("atv") || f.category === "licensing"
        : f.category === "licensing" || f.category === "requirements",
  ).slice(0, 4);

  const defaultVehicleType =
    cat.vehicleType === "moto" ||
    cat.vehicleType === "atv" ||
    cat.vehicleType === "car"
      ? cat.vehicleType
      : "car";

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: `/${locale}/` },
            { name: t("title"), path: `/${locale}/fleet/` },
            { name: label, path: `/${locale}/fleet/${category}/` },
          ]),
          itemListSchema(
            list.map((v) => ({
              name: vehicleDisplayName(v),
              url: absoluteUrl(`vehicle/${v.category}/${v.slug}`, locale),
            })),
            label,
          ),
        ]}
      />

      <section
        className={`bg-navy pt-14 text-foam ${cat.bookable ? "pb-20" : "pb-14"}`}
      >
        <div className="mx-auto flex max-w-page flex-col gap-6 px-4 sm:flex-row sm:items-end sm:justify-between sm:px-6">
          <div>
            <Link
              href="/fleet"
              className="text-sm font-semibold text-foam/60 hover:text-foam"
            >
              ← {t("all")}
            </Link>
            <div className="mt-3 flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={FLEET_CATEGORY_ICON[category]}
                alt=""
                width={56}
                height={56}
                className="h-14 w-14 brightness-0 invert"
              />
              <h1 className="font-display text-4xl font-extrabold text-foam sm:text-5xl">
                {copy?.h1 ?? label}
              </h1>
            </div>
            <p className="mt-3 max-w-2xl text-foam/75">
              {copy?.intro ?? t("categoryFallbackDesc", { category: label })}
            </p>
          </div>
        </div>
      </section>

      {cat.bookable ? (
        <section className="relative z-10 -mt-10 bg-brand-light pb-4">
          <div className="mx-auto max-w-page px-4 sm:px-6">
            <BookingWidget
              variant="bar"
              defaultVehicleType={defaultVehicleType}
            />
            <TrustBadges className="mt-4" />
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-page px-4 py-12 sm:px-6">
        {copy ? (
          <CategoryHighlights
            eyebrow={t("highlightsEyebrow")}
            items={[
              { label: t("bestFor"), body: copy.bestFor, icon: "bestFor" },
              { label: t("license"), body: copy.licence, icon: "license" },
              { label: t("compare"), body: copy.compare, icon: "compare" },
            ]}
          />
        ) : null}

        {list.length > 0 ? (
          <FleetCatalog vehicles={list} lockedCategory={category} />
        ) : null}
      </section>

      {list.length === 0 ? (
        <FleetAlternatives locale={locale} category={category} mode="empty" />
      ) : list.length < 4 ? (
        <FleetAlternatives locale={locale} category={category} mode="suggest" />
      ) : null}

      <FaqAccordion
        title={t("categoryFaqs", { category: label })}
        faqs={faqs.map((f) => ({ q: f.question, a: f.answer }))}
      />

      <RelatedLinks
        locale={locale}
        links={[
          { id: "paros-rent-a-car", label: "Paros rent a car" },
          { id: "rent-a-car-antiparos-aggelos", label: "Antiparos rent a car" },
          { href: "/fleet/", label: t("all") },
          { href: "/faq/", label: "FAQ" },
        ]}
      />
      <FinalCtaBlock />
    </>
  );
}
