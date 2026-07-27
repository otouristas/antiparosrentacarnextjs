export type VehicleType = "car" | "moto" | "atv" | string;

export interface GoCarsDatesData {
  default_hour: string;
  time_space: string;
  default_max_hour: string;
  current_datetime_rounded: string;
  o_booking_starts_after_hours: string;
  reservation_starts_after: string;
  pickup_reservation_start_datetime: string;
  min_length_hours?: string;
  date_from?: string;
  date_to?: string;
  time_from?: string;
  time_to?: string;
  min_hour?: string;
  [key: string]: unknown;
}

export interface GoCarsLocation {
  id: string;
  location_id?: string;
  location_name: string;
  front_active?: string;
  status?: string;
  location_order?: string;
  location_fee?: string | null;
  location_return_fee?: string | null;
  [key: string]: unknown;
}

export interface GoCarsAgeGroup {
  id: string;
  age_range: string;
  type_of_charge: string;
  amount: string;
  age_order: string;
}

export interface GoCarsModel {
  id: string;
  type_id: string;
  vehicle_type: VehicleType;
  type_name: string;
  make_name: string;
  model_name: string;
  model_description?: string;
  thumb_path?: string;
  price?: string;
  lowest_price?: number;
  passengers?: string;
  doors?: string;
  luggages?: string;
  transmission?: string;
  fuel?: string;
  air_condition?: string;
  availability?: string;
  status?: string;
  [key: string]: unknown;
}

export interface SearchParams {
  pickup_id: string;
  return_id: string;
  date_from: string;
  time_from: string;
  date_to: string;
  time_to: string;
  age_group_id: string;
  vehicle_type?: VehicleType;
  lang?: string;
  vehicles_sort_by?: string;
  type_id?: string;
  agent_code?: string;
  website?: string;
}

export interface SearchVehiclePerk {
  label: string;
  positive: boolean;
}

export interface SearchVehicle {
  id: string;
  typeId?: string;
  typeLabel: string;
  title: string;
  subtitle?: string;
  thumb?: string;
  totalPriceText?: string;
  perDayPriceText?: string;
  totalPrice?: number;
  perDayPrice?: number;
  strikePriceText?: string;
  strikePrice?: number;
  rentalDays?: number;
  remaining?: number;
  available: boolean;
  seats?: number;
  doors?: number;
  transmission?: string;
  largeBags?: number;
  smallBags?: number;
  fuel?: string;
  airCondition?: boolean;
  included: string[];
  perks: SearchVehiclePerk[];
  checkoutUrl: string;
}

export interface SearchResult {
  vehicles: SearchVehicle[];
  searchUrl: string;
  scrapedAt: string;
  count: number;
}
