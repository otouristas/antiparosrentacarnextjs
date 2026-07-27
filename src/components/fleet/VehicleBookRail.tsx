import { getFormatter, getTranslations } from "next-intl/server";
import BookingWidget from "@/components/booking/BookingWidget";
import TrustBadges from "@/components/cro/TrustBadges";
import Button from "@/components/ui/Button";
import type { FleetVehicleType } from "@/data/fleet-types";

/**
 * One product card on the right: identity + price + WhatsApp + booking fields.
 * Intentionally a single surface so title/price/actions don't float apart.
 */
export default async function VehicleBookRail({
  vehicle,
  vehicleName,
  categoryLabel,
  orSimilar,
  isAuto,
  isManual,
}: {
  vehicle: FleetVehicleType;
  vehicleName: string;
  categoryLabel: string;
  orSimilar?: string | null;
  isAuto: boolean;
  isManual: boolean;
}) {
  const t = await getTranslations("fleet");
  const tb = await getTranslations("booking");
  const format = await getFormatter();
  const defaultVehicleType =
    vehicle.vehicleType === "moto" || vehicle.vehicleType === "atv"
      ? vehicle.vehicleType
      : "car";
  const bookable = vehicle.bookable;

  const price =
    bookable && vehicle.priceFrom != null ? (
      <div
        className="shrink-0 text-right"
        data-price
      >
        <p className="text-2xs font-bold uppercase tracking-[0.16em] text-navy/45">
          {t("from")}
        </p>
        <p className="mt-0.5 font-display text-2xl font-extrabold leading-none tabular text-navy sm:text-[1.75rem]">
          {format.number(vehicle.priceFrom, {
            style: "currency",
            currency: "EUR",
          })}
        </p>
        <p className="mt-1 text-2xs font-semibold uppercase tracking-[0.12em] text-navy/50">
          {t("perDay")}
        </p>
      </div>
    ) : (
      <p className="shrink-0 self-center text-sm font-bold text-navy/55">
        {t("enquire")}
      </p>
    );

  return (
    <aside className="min-w-0 pb-24 xl:pb-0">
      <div className="animate-fade-up-delay lg:sticky lg:top-[calc(var(--spacing-header)+1rem)]">
        <div
          id="book"
          className="scroll-mt-28 overflow-hidden rounded-xl border border-navy/10 bg-white shadow-md"
        >
          <header className="border-b border-navy/8 px-5 pb-5 pt-5 sm:px-6 sm:pt-6">
            <p className="text-2xs font-bold uppercase tracking-[0.16em] text-navy/45">
              {categoryLabel}
              {isAuto ? ` · ${t("specs.automatic")}` : null}
              {isManual ? ` · ${t("specs.manual")}` : null}
            </p>

            <div className="mt-2 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h1 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-navy sm:text-3xl">
                  {vehicleName}
                </h1>
                {orSimilar ? (
                  <p className="mt-1 text-sm font-medium text-navy/45">
                    {orSimilar}
                  </p>
                ) : null}
              </div>

              <div className="border-l-4 border-yellow pl-3 sm:pl-4">
                {price}
              </div>
            </div>
          </header>

          {bookable ? (
            <div className="px-5 py-5 sm:px-6 sm:py-6">
              <p className="mb-4 text-2xs font-bold uppercase tracking-[0.14em] text-navy/45">
                {tb("checkThisVehicle")}
              </p>
              <BookingWidget
                variant="vehicle"
                embedded
                lockedVehicleType={defaultVehicleType}
                defaultVehicleType={defaultVehicleType}
                typeId={vehicle.typeId}
                vehicleName={vehicleName}
              />
            </div>
          ) : (
            <div className="px-5 py-5 sm:px-6 sm:py-6">
              <p className="text-sm text-ink/70">{t("enquiryCategoryBody")}</p>
              <Button
                href="/#book"
                variant="yellow"
                size="md"
                className="mt-5"
                full
              >
                {t("checkAvailability")}
              </Button>
            </div>
          )}
        </div>

        {bookable ? <TrustBadges className="mt-4" /> : null}
      </div>
    </aside>
  );
}
