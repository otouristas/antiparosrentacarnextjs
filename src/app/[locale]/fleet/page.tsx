import { setRequestLocale, getTranslations } from "next-intl/server";
import { getVehicles, vehicleDisplayName } from "@/data/fleet";
import { metadataFor } from "@/seo/metadata";
import { getRouteSeo } from "@/seo/route-seo";
import FleetCatalog from "@/components/fleet/FleetCatalog";
import BookingWidget from "@/components/booking/BookingWidget";
import TrustBadges from "@/components/cro/TrustBadges";
import FinalCtaBlock from "@/components/cro/FinalCtaBlock";
import RelatedLinks from "@/components/content/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import { itemListSchema, breadcrumbSchema } from "@/lib/schema";
import type { Locale } from "@/i18n/routing";
import { absoluteUrl } from "@/routes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return metadataFor(
    "fleet",
    locale as Locale,
    getRouteSeo("fleet", locale as Locale),
  );
}

export default async function FleetIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: loc } = await params;
  const locale = loc as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("fleet");
  const vehicles = await getVehicles();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: `/${locale}/` },
            { name: t("title"), path: `/${locale}/fleet/` },
          ]),
          itemListSchema(
            vehicles.map((v) => ({
              name: vehicleDisplayName(v),
              url: absoluteUrl(`vehicle/${v.category}/${v.slug}`, locale),
            })),
            t("title"),
          ),
        ]}
      />

      <section className="bg-navy pb-20 pt-14 text-foam">
        <div className="mx-auto max-w-page px-4 sm:px-6">
          <h1 className="font-display text-4xl font-extrabold text-foam sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-3 max-w-2xl text-foam/75">{t("subtitle")}</p>
        </div>
      </section>

      <section className="relative z-10 -mt-10 bg-brand-light pb-4">
        <div className="mx-auto max-w-page px-4 sm:px-6">
          <BookingWidget variant="bar" />
          <TrustBadges className="mt-4" />
        </div>
      </section>

      <section className="mx-auto max-w-page px-4 py-14 sm:px-6">
        <FleetCatalog vehicles={vehicles} showCategoryStrip />
      </section>

      <RelatedLinks
        locale={locale}
        links={[
          { id: "paros-rent-a-car", label: "Paros rent a car" },
          { id: "rent-a-car-antiparos-aggelos", label: "Antiparos rent a car" },
          { href: "/faq/", label: "FAQ" },
          { id: "contact", label: "Contact" },
        ]}
      />
      <FinalCtaBlock />
    </>
  );
}
