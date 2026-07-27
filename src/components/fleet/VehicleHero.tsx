import Image from "next/image";
import { fleetImage } from "@/data/fleet";
import type { FleetVehicleType } from "@/data/fleet-types";

/** Studio image stage — story sits in the same left column beneath this. */
export default function VehicleHero({
  vehicle,
  name,
}: {
  vehicle: FleetVehicleType;
  name: string;
}) {
  const image = fleetImage(vehicle);

  return (
    <div className="animate-fade-up relative min-w-0 overflow-hidden rounded-xl border border-navy/8 bg-sand">
      <div className="relative aspect-[16/10] sm:aspect-[3/2]">
        <Image
          src={image}
          alt={name}
          fill
          priority
          className="object-contain object-center p-5 sm:p-8"
          sizes="(max-width:1024px) 100vw, 640px"
        />
      </div>
    </div>
  );
}
