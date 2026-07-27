import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import {
  getVehicleBySlug,
  getVehiclesByCategory,
  isFleetCategorySlug,
  vehicleDisplayName,
  getVehicles,
  fleetImage,
} from "@/data/fleet";
import { metadataFor } from "@/seo/metadata";
import { getRouteSeo } from "@/seo/route-seo";
import VehicleDetail from "@/components/fleet/VehicleDetail";
import FinalCtaBlock from "@/components/cro/FinalCtaBlock";
import RelatedLinks from "@/components/content/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, vehicleSchema } from "@/lib/schema";
import { hasVehicleCopy, getVehicleCopy } from "@/content/loader";
import type { Locale } from "@/i18n/routing";
import { absoluteUrl } from "@/routes";

export async function generateStaticParams() {
  const vehicles = await getVehicles();
  return vehicles.map((v) => ({ category: v.category, slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string; slug: string }>;
}) {
  const { locale, category, slug } = await params;
  const v = await getVehicleBySlug(category, slug);
  if (!v) return {};
  const key = `vehicle/${v.category}/${v.slug}`;

  if (hasVehicleCopy(v.typeId, locale as Locale)) {
    const copy = getVehicleCopy(v.typeId, locale as Locale);
    if (copy.seo.title?.trim() && copy.seo.description?.trim()) {
      return metadataFor(key, locale as Locale, {
        title: copy.seo.title,
        description: copy.seo.description,
      });
    }
  }

  return metadataFor(key, locale as Locale, getRouteSeo(key, locale as Locale));
}

export default async function VehiclePage({
  params,
}: {
  params: Promise<{ locale: string; category: string; slug: string }>;
}) {
  const { locale: loc, category, slug } = await params;
  const locale = loc as Locale;
  setRequestLocale(locale);

  if (!isFleetCategorySlug(category)) notFound();
  const v = await getVehicleBySlug(category, slug);
  if (!v) notFound();

  const t = await getTranslations("fleet");
  const name = vehicleDisplayName(v);
  const copy = hasVehicleCopy(v.typeId, locale)
    ? getVehicleCopy(v.typeId, locale)
    : null;
  const catLabel = t(`categories.${v.category}`);

  const related = (await getVehiclesByCategory(v.category))
    .filter((x) => x.typeId !== v.typeId)
    .slice(0, 3);

  const pageUrl = absoluteUrl(`vehicle/${v.category}/${v.slug}`, locale);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: `/${locale}/` },
            { name: t("title"), path: `/${locale}/fleet/` },
            { name: catLabel, path: `/${locale}/fleet/${category}/` },
            { name: name, path: `/${locale}/fleet/${category}/${slug}/` },
          ]),
          vehicleSchema({
            name,
            description: copy?.blurb ?? t("vehicleDesc", { name }),
            url: pageUrl,
            image: fleetImage(v),
            vehicleType: v.vehicleType,
            priceFrom: v.priceFrom,
            bookable: v.bookable,
            seats: v.specs.passengers,
            transmission: v.specs.transmission,
            fuel: v.specs.fuel,
            locale,
          }),
        ]}
      />

      <VehicleDetail
        vehicle={v}
        related={related}
        locale={locale}
        categoryLabel={catLabel}
        copy={
          copy
            ? {
                name: copy.name,
                blurb: copy.blurb,
                orSimilar: copy.orSimilar,
                licence: copy.licence,
                highlights: copy.highlights,
              }
            : null
        }
      />

      <RelatedLinks
        locale={locale}
        links={[
          { href: `/fleet/${category}/`, label: catLabel },
          { id: "paros-rent-a-car", label: "Paros rent a car" },
          { id: "contact", label: "Contact" },
        ]}
      />
      <FinalCtaBlock />
    </>
  );
}
