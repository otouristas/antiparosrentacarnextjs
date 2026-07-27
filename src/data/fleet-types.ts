import type { FleetCategorySlug } from "./fleet-categories";

/**
 * A bookable GoCars vehicle *type* (not an individual model).
 *
 * One entry === one `type_id` === one checkout target === one price.
 * `models` lists the concrete cars that satisfy the type, rendered as
 * "Toyota Aygo, Skoda Citygo or similar".
 */
export type FleetVehicleType = {
  /** GoCars `type_id`, the checkout key. Never changes. */
  typeId: string;
  /** Stable URL slug from data/fleet-slugs.json. Never derived from typeName. */
  slug: string;
  category: FleetCategorySlug;
  vehicleType: "car" | "moto" | "atv";
  /** English GoCars label. Tooling/reference only, never rendered. */
  typeName: string;
  models: { make: string; model: string; note: string }[];

  /** Cheapest per-day rate across the type's models, excluding zeros. Null when unpriced. */
  priceFrom: number | null;
  priceCurrency: "EUR";
  minimumDays: number | null;

  specs: {
    passengers: number | null;
    doors: number | null;
    luggages: number | null;
    handbags: number | null;
    transmission: string | null;
    fuel: string | null;
    cc: number | null;
    airCondition: boolean;
  };

  features: {
    abs: boolean;
    bluetooth: boolean;
    navigation: boolean;
    usb: boolean;
    appleCarplay: boolean;
    androidAuto: boolean;
    cruiseControl: boolean;
    keyless: boolean;
    rearTrunk: boolean;
    tpms: boolean;
  };

  images: {
    /** Hand-curated override from data/fleet-images.json, wins when set. */
    local: string | null;
    /** Mirrored GoCars studio render (source for normalisation). */
    remote: string | null;
    /**
     * Normalised render: 1200x800 RGBA, common scale and baseline, synthetic
     * contact shadow, burned-in wordmark removed. Produced by
     * `npm run fleet:images`. This is what the UI should render.
     * Optional until the image pipeline has rewritten fleet.json.
     */
    normalized?: string | null;
  };

  /** false => no booking widget, no Offer schema, no "from €X" anywhere. */
  bookable: boolean;
  order: number;
};

export type FleetArtifact = {
  generatedAt: string;
  sourceFetchedAt: string;
  typeCount: number;
  modelCount: number;
  vehicles: FleetVehicleType[];
};
