import { getTranslations } from "next-intl/server";
import {
  Car,
  DoorOpen,
  Fuel,
  Gauge,
  Luggage,
  Users,
  Wind,
} from "lucide-react";
import type { FleetVehicleType } from "@/data/fleet-types";

function fuelLabel(
  fuel: string | null | undefined,
  petrol: string,
  diesel: string,
  hybrid: string,
) {
  const f = fuel?.toLowerCase() ?? "";
  if (f.includes("diesel")) return diesel;
  if (f.includes("hybrid")) return hybrid;
  if (f.includes("petrol") || f.includes("gas")) return petrol;
  return fuel;
}

export default async function VehicleSpecRunway({
  vehicle,
}: {
  vehicle: FleetVehicleType;
}) {
  const t = await getTranslations("fleet");
  const transmission = vehicle.specs.transmission?.toLowerCase() ?? "";
  const isAuto = transmission.includes("auto");
  const isManual = transmission.includes("manual");
  const fuel = fuelLabel(
    vehicle.specs.fuel,
    t("petrol"),
    t("diesel"),
    t("hybrid"),
  );

  const specs: { Icon: typeof Users; label: string; hint?: string }[] = [];
  if (vehicle.specs.passengers) {
    specs.push({
      Icon: Users,
      label: String(vehicle.specs.passengers),
      hint: t("specs.seats"),
    });
  }
  if (vehicle.specs.doors) {
    specs.push({
      Icon: DoorOpen,
      label: String(vehicle.specs.doors),
      hint: t("specs.doors"),
    });
  }
  if (vehicle.specs.luggages) {
    specs.push({
      Icon: Luggage,
      label: String(vehicle.specs.luggages),
      hint: t("specs.bags"),
    });
  }
  if (isAuto) specs.push({ Icon: Gauge, label: t("specs.automatic") });
  else if (isManual) specs.push({ Icon: Gauge, label: t("specs.manual") });
  if (fuel) specs.push({ Icon: Fuel, label: fuel });
  if (vehicle.specs.airCondition) {
    specs.push({ Icon: Wind, label: t("specs.ac") });
  }
  if (vehicle.specs.cc) {
    specs.push({ Icon: Car, label: `${vehicle.specs.cc} cc` });
  }

  if (specs.length === 0) return null;

  return (
    <div>
      <h2 className="font-display text-2xl font-extrabold text-navy sm:text-3xl">
        {t("specRunwayTitle")}
      </h2>
      <ul className="animate-fade-up-delay-2 mt-6 flex gap-0 overflow-x-auto border-y border-navy/10 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {specs.map(({ Icon, label, hint }, i) => (
          <li
            key={`${label}-${hint ?? ""}-${i}`}
            className="flex min-w-[7.5rem] flex-1 flex-col items-start gap-3 border-r border-navy/10 px-5 py-5 last:border-r-0 sm:min-w-0 sm:px-6"
          >
            <Icon
              className="h-5 w-5 text-navy/55"
              strokeWidth={1.75}
              aria-hidden
            />
            <span>
              <span className="block font-display text-xl font-extrabold leading-tight text-navy">
                {label}
              </span>
              {hint ? (
                <span className="mt-1 block text-2xs font-bold uppercase tracking-[0.14em] text-navy/40">
                  {hint}
                </span>
              ) : null}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
