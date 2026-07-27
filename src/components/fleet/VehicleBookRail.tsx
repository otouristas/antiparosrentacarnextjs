import { getTranslations } from "next-intl/server";
import BookingWidget from "@/components/booking/BookingWidget";
import TrustBadges from "@/components/cro/TrustBadges";
import Button from "@/components/ui/Button";
import type { FleetVehicleType } from "@/data/fleet-types";

export default async function VehicleBookRail({
  vehicle,
  vehicleName,
}: {
  vehicle: FleetVehicleType;
  vehicleName: string;
}) {
  const t = await getTranslations("fleet");
  const defaultVehicleType =
    vehicle.vehicleType === "moto" || vehicle.vehicleType === "atv"
      ? vehicle.vehicleType
      : "car";

  return (
    <aside className="min-w-0">
      <div className="lg:sticky lg:top-[calc(var(--spacing-header)+1rem)] lg:animate-fade-up-delay-2">
        {vehicle.bookable ? (
          <div id="book" className="scroll-mt-28">
            <BookingWidget
              variant="vehicle"
              lockedVehicleType={defaultVehicleType}
              defaultVehicleType={defaultVehicleType}
              typeId={vehicle.typeId}
              vehicleName={vehicleName}
            />
            <TrustBadges className="mt-4" />
          </div>
        ) : (
          <div
            id="book"
            className="scroll-mt-28 rounded-xl border border-navy/10 bg-white p-6 shadow-sm"
          >
            <h2 className="font-display text-xl font-bold text-navy">
              {t("enquire")}
            </h2>
            <p className="mt-2 text-sm text-ink/70">{t("enquiryCategoryBody")}</p>
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
    </aside>
  );
}
