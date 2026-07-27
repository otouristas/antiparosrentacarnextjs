import { getTranslations } from "next-intl/server";
import {
  Bluetooth,
  Car,
  Gauge,
  KeyRound,
  Luggage,
  Navigation,
  Shield,
  Smartphone,
  Usb,
  Wind,
} from "lucide-react";
import type { FleetVehicleType } from "@/data/fleet-types";

type FeatureKey = keyof FleetVehicleType["features"];

type AmenityGroup = {
  id: "comfort" | "tech" | "safety";
  keys: FeatureKey[];
  includeAc?: boolean;
};

const GROUPS: AmenityGroup[] = [
  {
    id: "comfort",
    keys: ["cruiseControl", "keyless", "rearTrunk"],
    includeAc: true,
  },
  {
    id: "tech",
    keys: ["bluetooth", "usb", "appleCarplay", "androidAuto", "navigation"],
  },
  {
    id: "safety",
    keys: ["abs", "tpms"],
  },
];

const ICONS: Record<FeatureKey | "airCondition", typeof Shield> = {
  abs: Shield,
  bluetooth: Bluetooth,
  navigation: Navigation,
  usb: Usb,
  appleCarplay: Smartphone,
  androidAuto: Smartphone,
  cruiseControl: Gauge,
  keyless: KeyRound,
  rearTrunk: Luggage,
  tpms: Car,
  airCondition: Wind,
};

export default async function VehicleAmenities({
  vehicle,
}: {
  vehicle: FleetVehicleType;
}) {
  const t = await getTranslations("fleet");

  const boards = GROUPS.map((group) => {
    const items: {
      key: string;
      label: string;
      benefit: string;
      Icon: typeof Shield;
    }[] = [];

    if (group.includeAc && vehicle.specs.airCondition) {
      items.push({
        key: "airCondition",
        label: t("specs.ac"),
        benefit: t("amenityBenefits.airCondition"),
        Icon: ICONS.airCondition,
      });
    }

    for (const key of group.keys) {
      if (!vehicle.features[key]) continue;
      items.push({
        key,
        label: t(`featureLabels.${key}`),
        benefit: t(`amenityBenefits.${key}`),
        Icon: ICONS[key],
      });
    }

    return { id: group.id, items };
  }).filter((b) => b.items.length > 0);

  if (boards.length === 0) return null;

  return (
    <section className="mt-12 border-t border-navy/10 pt-10">
      <h2 className="font-display text-2xl font-extrabold text-navy sm:text-3xl">
        {t("amenitiesTitle")}
      </h2>
      <p className="mt-2 max-w-prose text-base text-ink/65">{t("amenitiesLead")}</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {boards.map((board) => (
          <div key={board.id} className="min-w-0">
            <h3 className="border-b border-yellow pb-2 font-display text-lg font-bold text-navy">
              {t(`amenityGroups.${board.id}`)}
            </h3>
            <ul className="mt-4 space-y-4">
              {board.items.map(({ key, label, benefit, Icon }) => (
                <li key={key} className="flex gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-navy/[0.05] text-navy">
                    <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold text-navy">
                      {label}
                    </span>
                    <span className="mt-0.5 block text-sm leading-snug text-ink/65">
                      {benefit}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
