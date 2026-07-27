import { getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Section, { SectionHeading } from "@/components/ui/Section";
import VehicleCard from "@/components/fleet/VehicleCard";
import VehicleHero from "@/components/fleet/VehicleHero";
import VehicleStory from "@/components/fleet/VehicleStory";
import VehicleSpecRunway from "@/components/fleet/VehicleSpecRunway";
import VehicleAmenities from "@/components/fleet/VehicleAmenities";
import VehicleReviewsBand from "@/components/fleet/VehicleReviewsBand";
import VehicleBookRail from "@/components/fleet/VehicleBookRail";
import { vehicleDisplayName } from "@/data/fleet";
import type { FleetVehicleType } from "@/data/fleet-types";
import { getVehicleInsight } from "@/data/reviews";
import type { Locale } from "@/i18n/routing";
import { href } from "@/routes";

export type VehicleDetailCopy = {
  name?: string;
  blurb?: string;
  orSimilar?: string;
  licence?: string;
  highlights?: string[];
} | null;

export default async function VehicleDetail({
  vehicle,
  related,
  locale,
  categoryLabel,
  copy,
}: {
  vehicle: FleetVehicleType;
  related: FleetVehicleType[];
  locale: Locale;
  categoryLabel: string;
  copy: VehicleDetailCopy;
}) {
  const t = await getTranslations("fleet");
  const name = copy?.name ?? vehicleDisplayName(vehicle);
  const transmission = vehicle.specs.transmission?.toLowerCase() ?? "";
  const isAuto = transmission.includes("auto");
  const isManual = transmission.includes("manual");

  const modelsLine =
    vehicle.models.length > 0
      ? t("modelsLine", {
          models: vehicle.models.map((m) => `${m.make} ${m.model}`).join(", "),
        })
      : null;

  const insight = getVehicleInsight(vehicle.slug);
  const categoryStory = t.has(`categoryStory.${vehicle.category}`)
    ? t(`categoryStory.${vehicle.category}`)
    : null;

  return (
    <>
      <div className="border-b border-navy/8 bg-white">
        <div className="mx-auto flex max-w-page items-center gap-2 px-4 py-3 text-sm sm:px-6">
          <Link
            href={`/fleet/${vehicle.category}`}
            className="inline-flex items-center gap-1.5 font-semibold text-navy/55 transition-colors hover:text-navy"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            {categoryLabel}
          </Link>
          <span className="text-navy/25" aria-hidden>
            /
          </span>
          <span className="truncate font-semibold text-navy">{name}</span>
        </div>
      </div>

      <section className="bg-brand-light">
        <div className="mx-auto grid max-w-page gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:gap-10 lg:py-12 xl:gap-14">
          <div className="min-w-0">
            <VehicleHero
              vehicle={vehicle}
              name={name}
              categoryLabel={categoryLabel}
              orSimilar={copy?.orSimilar}
              isAuto={isAuto}
              isManual={isManual}
            />
            <VehicleStory
              name={name}
              blurb={copy?.blurb}
              highlights={copy?.highlights}
              licence={copy?.licence}
              modelsLine={modelsLine}
              categoryStory={categoryStory}
              idealFor={insight?.idealFor}
            />
            <VehicleSpecRunway vehicle={vehicle} />
            <VehicleAmenities vehicle={vehicle} />
          </div>

          <VehicleBookRail vehicle={vehicle} vehicleName={name} />
        </div>
      </section>

      <VehicleReviewsBand slug={vehicle.slug} locale={locale} />

      {related.length > 0 ? (
        <Section tone="sand" pad="lg">
          <SectionHeading title={t("related")} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <VehicleCard
                key={r.typeId}
                vehicle={r}
                href={href(`vehicle/${r.category}/${r.slug}`, locale)}
              />
            ))}
          </div>
        </Section>
      ) : null}
    </>
  );
}
