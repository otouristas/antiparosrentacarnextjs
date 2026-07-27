"use client";

import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import { ArrowRight, Fuel, Gauge, Luggage, Users, Wind } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { fleetImage, vehicleDisplayName } from "@/data/fleet-display";
import type { FleetVehicleType } from "@/data/fleet-types";
import { getVehicleIdealFor } from "@/data/fleet-insights-lite";

function useVehicleSpecs(vehicle: FleetVehicleType) {
  const t = useTranslations("fleet");
  const transmission = vehicle.specs.transmission?.toLowerCase() ?? "";
  const isAuto = transmission.includes("auto");
  const isManual = transmission.includes("manual");
  const fuel = vehicle.specs.fuel?.toLowerCase() ?? "";

  const fuelLabel = fuel.includes("diesel")
    ? t("diesel")
    : fuel.includes("hybrid")
      ? t("hybrid")
      : fuel.includes("petrol") || fuel.includes("gas")
        ? t("petrol")
        : fuel || null;

  const specs: { Icon: typeof Users; label: string }[] = [];
  if (vehicle.specs.passengers) {
    specs.push({ Icon: Users, label: String(vehicle.specs.passengers) });
  }
  if (isAuto) specs.push({ Icon: Gauge, label: t("specs.automatic") });
  else if (isManual) specs.push({ Icon: Gauge, label: t("specs.manual") });
  if (fuelLabel) specs.push({ Icon: Fuel, label: fuelLabel });
  if (vehicle.specs.luggages) {
    specs.push({ Icon: Luggage, label: String(vehicle.specs.luggages) });
  }
  if (vehicle.specs.airCondition) {
    specs.push({ Icon: Wind, label: t("specs.ac") });
  }
  return specs;
}

/**
 * Collection-style vehicle card: normalised image, icon specs, price + CTA.
 * `variant="popular"` uses a sand-band aesthetic (filllo / PrimeCruise featured).
 */
export default function VehicleCard({
  vehicle,
  href,
  badge,
  variant = "collection",
}: {
  vehicle: FleetVehicleType;
  href: string;
  badge?: string;
  variant?: "collection" | "popular";
}) {
  const t = useTranslations("fleet");
  const tr = useTranslations("reviews");
  const format = useFormatter();
  const name = vehicleDisplayName(vehicle);
  const image = fleetImage(vehicle);
  const specs = useVehicleSpecs(vehicle);
  const isPopular = variant === "popular";
  const insightIdeal = getVehicleIdealFor(vehicle.slug);

  const priceBlock =
    vehicle.bookable && vehicle.priceFrom != null ? (
      <p
        className={`font-display font-extrabold text-navy ${isPopular ? "text-2xl" : "text-xl"}`}
        data-price
      >
        <span className="mr-1.5 text-2xs font-bold uppercase tracking-[0.14em] text-navy/45">
          {t("from")}
        </span>
        {format.number(vehicle.priceFrom, {
          style: "currency",
          currency: "EUR",
        })}
        <span className="ml-1 text-sm font-semibold text-navy/50">
          {t("perDay")}
        </span>
      </p>
    ) : (
      <p className="text-sm font-semibold text-navy/55">{t("enquire")}</p>
    );

  const idealChip = insightIdeal ? (
    <p className="mt-2 line-clamp-1 border-l-2 border-yellow pl-2 text-xs font-semibold text-navy/60">
      <span className="text-navy">{tr("idealFor")}: </span>
      {insightIdeal}
    </p>
  ) : null;

  if (isPopular) {
    return (
      <a
        href={href}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-navy/8 bg-white/70 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-yellow/70 hover:shadow-md motion-reduce:hover:translate-y-0"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-sand">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
            sizes="(max-width:768px) 100vw, 360px"
          />
          <div className="absolute left-3 top-3">
            <Badge tone="yellow">{badge ?? t("popularBadge")}</Badge>
          </div>
        </div>
        <div className="flex flex-1 flex-col border-t-2 border-transparent p-5 transition-colors group-hover:border-yellow">
          <p className="text-2xs font-bold uppercase tracking-[0.14em] text-navy/45">
            {t(`categories.${vehicle.category}`)}
          </p>
          <h3 className="mt-1 font-display text-xl font-extrabold text-navy">
            {name}
          </h3>
          {idealChip}
          {specs.length ? (
            <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-2">
              {specs.map(({ Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-navy/55"
                >
                  <Icon
                    className="h-3.5 w-3.5 text-navy/40"
                    strokeWidth={1.75}
                  />
                  {label}
                </li>
              ))}
            </ul>
          ) : null}
          <div className="mt-auto flex items-end justify-between gap-3 pt-5">
            {priceBlock}
            <span className="inline-flex min-h-10 items-center gap-1 rounded-sm bg-navy px-3 text-sm font-bold text-foam transition-colors group-hover:bg-navy-panel">
              {t("viewDetails")}
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </a>
    );
  }

  return (
    <a
      href={href}
      className="group flex flex-col overflow-hidden rounded-lg border border-line bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-yellow/80 hover:shadow-md motion-reduce:hover:translate-y-0"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-brand-light">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
          sizes="(max-width:768px) 100vw, 280px"
        />
        {badge ? (
          <div className="absolute left-3 top-3">
            <Badge tone="yellow">{badge}</Badge>
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col border-t-2 border-transparent p-4 transition-colors group-hover:border-yellow sm:p-5">
        <p className="text-2xs font-bold uppercase tracking-[0.14em] text-navy/45">
          {t(`categories.${vehicle.category}`)}
        </p>
        <h3 className="mt-1 font-display text-lg font-extrabold text-navy sm:text-xl">
          {name}
        </h3>
        {idealChip}

        {specs.length ? (
          <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-2">
            {specs.map(({ Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-1 text-xs font-semibold text-navy/55 transition-colors group-hover:text-navy"
              >
                <Icon
                  className="h-3.5 w-3.5 text-navy/40 group-hover:text-navy"
                  strokeWidth={1.75}
                />
                {label}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          {priceBlock}
          <span className="inline-flex min-h-10 items-center gap-1 rounded-sm bg-yellow px-3 text-sm font-bold text-navy transition-colors group-hover:bg-yellow-hover">
            {t("viewDetails")}
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </a>
  );
}
