import Image from "next/image";
import { getFormatter, getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { fleetImage } from "@/data/fleet";
import type { FleetVehicleType } from "@/data/fleet-types";
import { SITE } from "@/lib/site";

export default async function VehicleHero({
  vehicle,
  name,
  categoryLabel,
  orSimilar,
  isAuto,
  isManual,
}: {
  vehicle: FleetVehicleType;
  name: string;
  categoryLabel: string;
  orSimilar?: string | null;
  isAuto: boolean;
  isManual: boolean;
}) {
  const t = await getTranslations("fleet");
  const format = await getFormatter();
  const image = fleetImage(vehicle);
  const bookable = vehicle.bookable;

  return (
    <div className="min-w-0">
      <div className="animate-fade-up relative overflow-hidden border-y border-navy/8 bg-sand lg:rounded-2xl lg:border">
        <div className="relative aspect-[16/10] sm:aspect-[3/2]">
          <Image
            src={image}
            alt={name}
            fill
            priority
            className="object-contain object-center p-5 sm:p-8 lg:p-10"
            sizes="(max-width:1024px) 100vw, 640px"
          />
        </div>
      </div>

      <header className="animate-fade-up-delay mt-8">
        <p className="text-2xs font-bold uppercase tracking-[0.18em] text-navy/45">
          {categoryLabel}
          {isAuto ? ` · ${t("specs.automatic")}` : null}
          {isManual ? ` · ${t("specs.manual")}` : null}
        </p>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
          {name}
        </h1>
        {orSimilar ? (
          <p className="mt-2 text-sm font-semibold text-navy/45">{orSimilar}</p>
        ) : null}

        {bookable && vehicle.priceFrom != null ? (
          <p className="mt-5 flex flex-wrap items-baseline gap-x-2" data-price>
            <span className="text-2xs font-bold uppercase tracking-[0.14em] text-navy/45">
              {t("from")}
            </span>
            <span className="font-display text-3xl font-extrabold tabular text-navy sm:text-4xl">
              {format.number(vehicle.priceFrom, {
                style: "currency",
                currency: "EUR",
              })}
            </span>
            <span className="text-base font-semibold text-navy/50">
              {t("perDay")}
            </span>
          </p>
        ) : (
          <p className="mt-5 text-lg font-semibold text-navy/60">{t("enquire")}</p>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          {bookable ? (
            <Button href="#book" variant="yellow" size="lg" className="lg:hidden">
              {t("checkAvailability")}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          ) : null}
          <Button href={SITE.whatsapp} variant="whatsapp" size="lg">
            WhatsApp
          </Button>
        </div>
      </header>
    </div>
  );
}
