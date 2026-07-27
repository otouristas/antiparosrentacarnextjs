"use client";

import { useMemo, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { AlertCircle, Calendar, Loader2, MapPin, Search, User } from "lucide-react";
import { GOCARS_AGES, GOCARS_LOCATIONS } from "@/lib/site";

/**
 * Booking search. Builds a GoCars query and hands off to /book/results.
 *
 * Layout uses container queries so the same widget fits a 420px hero panel,
 * a fleet search strip, and a 360px sidebar without overflowing.
 */

const todayIso = () => new Date().toISOString().slice(0, 10);

function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00`);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function defaultDates() {
  const pickup = addDays(todayIso(), 2);
  return { pickupDate: pickup, dropoffDate: addDays(pickup, 3) };
}

function toGoCarsDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

type VehicleTypeId = "car" | "moto" | "atv";

const VEHICLE_TYPES: { id: VehicleTypeId; key: VehicleTypeId }[] = [
  { id: "car", key: "car" },
  { id: "moto", key: "moto" },
  { id: "atv", key: "atv" },
];

const FIELD =
  "min-h-11 w-full min-w-0 rounded-sm border border-navy/15 bg-white px-3 text-sm text-ink outline-none transition-[border-color,box-shadow] duration-200 focus:border-navy focus:shadow-focus";
const FIELD_LABEL =
  "mb-1.5 flex items-center gap-1.5 text-2xs font-bold uppercase tracking-[0.12em] text-navy/55";
const SELECT =
  `${FIELD} appearance-none bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat pr-10`;

const CHEVRON = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23112553' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
} as const;

export default function BookingWidget({
  compact = false,
  variant = "panel",
  defaultVehicleType = "car",
  lockedVehicleType,
  typeId,
  vehicleName,
}: {
  compact?: boolean;
  /** `bar` = fleet strip; `panel` = glass card; `vehicle` = PDP locked-model form. */
  variant?: "panel" | "bar" | "vehicle";
  defaultVehicleType?: VehicleTypeId;
  lockedVehicleType?: VehicleTypeId;
  typeId?: string;
  vehicleName?: string;
}) {
  const t = useTranslations("booking");
  const locale = useLocale();
  const router = useRouter();
  const defaults = useMemo(() => defaultDates(), []);
  const minDate = useMemo(() => todayIso(), []);
  const [pending, startTransition] = useTransition();

  const isVehicle = variant === "vehicle";
  const lockedType =
    lockedVehicleType ?? (isVehicle ? defaultVehicleType : undefined);

  const [vehicleType, setVehicleType] = useState<VehicleTypeId>(
    lockedType ?? defaultVehicleType,
  );
  const [pickupId, setPickupId] = useState("1");
  const [returnId, setReturnId] = useState("1");
  const [differentReturn, setDifferentReturn] = useState(false);
  const [dateFrom, setDateFrom] = useState(defaults.pickupDate);
  const [timeFrom, setTimeFrom] = useState("10:00");
  const [dateTo, setDateTo] = useState(defaults.dropoffDate);
  const [timeTo, setTimeTo] = useState("10:00");
  const [ageGroup, setAgeGroup] = useState("28");
  const [error, setError] = useState<string | null>(null);

  const onPickupDate = (value: string) => {
    setDateFrom(value);
    setError(null);
    if (value >= dateTo) setDateTo(addDays(value, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dateTo < dateFrom || (dateTo === dateFrom && timeTo <= timeFrom)) {
      setError(t("errorDates"));
      return;
    }
    setError(null);

    const effectiveType = lockedType ?? vehicleType;
    const params = new URLSearchParams({
      pickup_id: pickupId,
      return_id: differentReturn ? returnId : pickupId,
      date_from: toGoCarsDate(dateFrom),
      time_from: timeFrom,
      date_to: toGoCarsDate(dateTo),
      time_to: timeTo,
      age_group_id: ageGroup,
      vehicle_type: effectiveType,
      lang: locale,
    });
    if (typeId) params.set("type_id", typeId);
    startTransition(() => router.push(`/book/results?${params.toString()}`));
  };

  const typeTabs = !lockedType ? (
    <div
      role="radiogroup"
      aria-label={t("title")}
      className="flex gap-1 rounded-sm bg-navy/[0.04] p-1"
    >
      {VEHICLE_TYPES.map((v) => (
        <button
          key={v.id}
          type="button"
          role="radio"
          aria-checked={vehicleType === v.id}
          onClick={() => setVehicleType(v.id)}
          className={`min-h-10 flex-1 rounded-sm px-3 py-2 text-sm font-bold transition-colors duration-200 ${
            vehicleType === v.id
              ? "bg-yellow text-navy shadow-xs"
              : "text-navy/70 hover:bg-navy/5 hover:text-navy"
          }`}
        >
          {t(v.key)}
        </button>
      ))}
    </div>
  ) : null;

  const submitLabel =
    isVehicle && vehicleName
      ? t("seePricesFor", { name: vehicleName })
      : t("searchPrices");

  const submitBtn = (
    <button
      type="submit"
      disabled={pending}
      className="btn-yellow min-h-11 w-full shrink-0 text-base disabled:pointer-events-none disabled:opacity-60 lg:w-auto lg:min-w-[10.5rem]"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {t("searching")}
        </>
      ) : (
        <>
          <Search className="h-4 w-4" />
          {submitLabel}
        </>
      )}
    </button>
  );

  const errorBlock = error ? (
    <p
      role="alert"
      className="flex items-center gap-2 rounded-sm bg-danger/8 px-3 py-2 text-sm font-semibold text-danger"
    >
      <AlertCircle className="h-4 w-4 shrink-0" />
      {error}
    </p>
  ) : null;

  if (variant === "bar") {
    return (
      <form
        id="book"
        onSubmit={handleSubmit}
        noValidate
        className="@container w-full rounded-lg border border-line bg-white p-4 shadow-md sm:p-5"
      >
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-display text-base font-bold text-navy sm:text-lg">{t("title")}</h2>
          <a
            href="https://antiparosrentacar.gocars.gr/user-area"
            className="rounded-sm text-sm font-semibold text-navy-panel underline-offset-2 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("existingClient")}
          </a>
        </div>

        <div className="grid gap-3 lg:grid-cols-[auto_minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1.1fr)_minmax(0,0.7fr)_auto] lg:items-end">
          {typeTabs ? (
            <div className="min-w-0 lg:min-w-[11rem]">{typeTabs}</div>
          ) : null}

          <label className="block min-w-0">
            <span className={FIELD_LABEL}>
              <MapPin className="h-3.5 w-3.5" />
              {t("pickupLocation")}
            </span>
            <select
              value={pickupId}
              onChange={(e) => setPickupId(e.target.value)}
              className={SELECT}
              style={CHEVRON}
            >
              {GOCARS_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {t(loc.key)}
                </option>
              ))}
            </select>
          </label>

          <label className="block min-w-0">
            <span className={FIELD_LABEL}>
              <Calendar className="h-3.5 w-3.5" />
              {t("pickupDate")}
            </span>
            <div className="grid grid-cols-1 gap-2 @xs:grid-cols-[1fr_auto]">
              <input
                type="date"
                value={dateFrom}
                min={minDate}
                onChange={(e) => onPickupDate(e.target.value)}
                className={FIELD}
              />
              <input
                type="time"
                value={timeFrom}
                onChange={(e) => setTimeFrom(e.target.value)}
                className={`${FIELD} @xs:w-[7.5rem] @xs:flex-none`}
              />
            </div>
          </label>

          <label className="block min-w-0">
            <span className={FIELD_LABEL}>
              <Calendar className="h-3.5 w-3.5" />
              {t("dropoffDate")}
            </span>
            <div className="grid grid-cols-1 gap-2 @xs:grid-cols-[1fr_auto]">
              <input
                type="date"
                value={dateTo}
                min={dateFrom}
                onChange={(e) => {
                  setDateTo(e.target.value);
                  setError(null);
                }}
                aria-invalid={Boolean(error)}
                className={`${FIELD} ${error ? "border-danger" : ""}`}
              />
              <input
                type="time"
                value={timeTo}
                onChange={(e) => setTimeTo(e.target.value)}
                className={`${FIELD} @xs:w-[7.5rem] @xs:flex-none`}
              />
            </div>
          </label>

          <label className="block min-w-0">
            <span className={FIELD_LABEL}>
              <User className="h-3.5 w-3.5" />
              {t("ageGroup")}
            </span>
            <select
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value)}
              className={SELECT}
              style={CHEVRON}
            >
              {GOCARS_AGES.map((age) => (
                <option key={age.id} value={age.id}>
                  {t(age.key)}
                </option>
              ))}
            </select>
          </label>

          <div className="min-w-0">{submitBtn}</div>
        </div>

        <label className="mt-3 flex items-center gap-2 text-sm text-navy/80">
          <input
            type="checkbox"
            checked={differentReturn}
            onChange={(e) => setDifferentReturn(e.target.checked)}
            className="h-4 w-4 accent-navy"
          />
          {t("differentReturn")}
        </label>

        {differentReturn ? (
          <label className="mt-2 block max-w-md min-w-0">
            <span className={FIELD_LABEL}>{t("dropoffLocation")}</span>
            <select
              value={returnId}
              onChange={(e) => setReturnId(e.target.value)}
              className={SELECT}
              style={CHEVRON}
            >
              {GOCARS_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {t(loc.key)}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        {errorBlock ? <div className="mt-3">{errorBlock}</div> : null}
      </form>
    );
  }

  if (isVehicle) {
    return (
      <form
        onSubmit={handleSubmit}
        noValidate
        className="@container w-full overflow-hidden rounded-xl border border-navy/10 bg-white shadow-md animate-fade-up-delay-2"
      >
        <div className="border-b border-yellow/40 bg-navy px-4 py-4 text-foam sm:px-5">
          <p className="text-2xs font-bold uppercase tracking-[0.16em] text-yellow">
            {t("checkThisVehicle")}
          </p>
          <h2 className="mt-1 font-display text-lg font-extrabold leading-snug sm:text-xl">
            {vehicleName ?? t("title")}
          </h2>
        </div>
        <div className="p-4 sm:p-5">
          <div className="grid grid-cols-1 gap-3">
            <label className="block min-w-0">
              <span className={FIELD_LABEL}>
                <MapPin className="h-3.5 w-3.5" />
                {t("pickupLocation")}
              </span>
              <select
                value={pickupId}
                onChange={(e) => setPickupId(e.target.value)}
                className={SELECT}
                style={CHEVRON}
              >
                {GOCARS_LOCATIONS.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {t(loc.key)}
                  </option>
                ))}
              </select>
            </label>

            <label className="block min-w-0">
              <span className={FIELD_LABEL}>
                <Calendar className="h-3.5 w-3.5" />
                {t("pickupDate")}
              </span>
              <div className="grid grid-cols-1 gap-2 @xs:grid-cols-[1fr_auto]">
                <input
                  type="date"
                  value={dateFrom}
                  min={minDate}
                  onChange={(e) => onPickupDate(e.target.value)}
                  className={FIELD}
                />
                <input
                  type="time"
                  value={timeFrom}
                  onChange={(e) => setTimeFrom(e.target.value)}
                  className={`${FIELD} @xs:w-[7.5rem] @xs:flex-none`}
                />
              </div>
            </label>

            <label className="block min-w-0">
              <span className={FIELD_LABEL}>
                <Calendar className="h-3.5 w-3.5" />
                {t("dropoffDate")}
              </span>
              <div className="grid grid-cols-1 gap-2 @xs:grid-cols-[1fr_auto]">
                <input
                  type="date"
                  value={dateTo}
                  min={dateFrom}
                  onChange={(e) => {
                    setDateTo(e.target.value);
                    setError(null);
                  }}
                  aria-invalid={Boolean(error)}
                  className={`${FIELD} ${error ? "border-danger" : ""}`}
                />
                <input
                  type="time"
                  value={timeTo}
                  onChange={(e) => setTimeTo(e.target.value)}
                  className={`${FIELD} @xs:w-[7.5rem] @xs:flex-none`}
                />
              </div>
            </label>

            <label className="block min-w-0">
              <span className={FIELD_LABEL}>
                <User className="h-3.5 w-3.5" />
                {t("ageGroup")}
              </span>
              <select
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
                className={SELECT}
                style={CHEVRON}
              >
                {GOCARS_AGES.map((age) => (
                  <option key={age.id} value={age.id}>
                    {t(age.key)}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="mt-3 flex items-center gap-2 text-sm text-navy/80">
            <input
              type="checkbox"
              checked={differentReturn}
              onChange={(e) => setDifferentReturn(e.target.checked)}
              className="h-4 w-4 accent-navy"
            />
            {t("differentReturn")}
          </label>

          {differentReturn ? (
            <label className="mt-2 block min-w-0">
              <span className={FIELD_LABEL}>{t("dropoffLocation")}</span>
              <select
                value={returnId}
                onChange={(e) => setReturnId(e.target.value)}
                className={SELECT}
                style={CHEVRON}
              >
                {GOCARS_LOCATIONS.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {t(loc.key)}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          {errorBlock ? <div className="mt-3">{errorBlock}</div> : null}

          <div className="mt-5">{submitBtn}</div>
          <a
            href="https://antiparosrentacar.gocars.gr/user-area"
            className="mt-3 block text-center text-sm font-semibold text-navy-panel underline-offset-2 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("existingClient")}
          </a>
        </div>
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`glass-panel @container w-full ${compact ? "p-4" : "p-5 sm:p-6"} animate-fade-up-delay-2`}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-display text-lg font-bold text-navy sm:text-xl">{t("title")}</h2>
        <a
          href="https://antiparosrentacar.gocars.gr/user-area"
          className="rounded-sm text-sm font-semibold text-navy-panel underline-offset-2 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("existingClient")}
        </a>
      </div>

      {typeTabs ? <div className="mb-4">{typeTabs}</div> : null}

      <div className="grid grid-cols-1 gap-3 @md:grid-cols-2">
        <label className="block min-w-0">
          <span className={FIELD_LABEL}>
            <MapPin className="h-3.5 w-3.5" />
            {t("pickupLocation")}
          </span>
          <select
            value={pickupId}
            onChange={(e) => setPickupId(e.target.value)}
            className={SELECT}
            style={CHEVRON}
          >
            {GOCARS_LOCATIONS.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {t(loc.key)}
              </option>
            ))}
          </select>
        </label>

        <label className="block min-w-0">
          <span className={FIELD_LABEL}>
            <Calendar className="h-3.5 w-3.5" />
            {t("pickupDate")}
          </span>
          <div className="grid grid-cols-1 gap-2 @xs:grid-cols-[1fr_auto]">
            <input
              type="date"
              value={dateFrom}
              min={minDate}
              onChange={(e) => onPickupDate(e.target.value)}
              className={FIELD}
            />
            <input
              type="time"
              value={timeFrom}
              onChange={(e) => setTimeFrom(e.target.value)}
              className={`${FIELD} @xs:w-[7.5rem] @xs:flex-none`}
            />
          </div>
        </label>

        <label className="block min-w-0">
          <span className={FIELD_LABEL}>
            <Calendar className="h-3.5 w-3.5" />
            {t("dropoffDate")}
          </span>
          <div className="grid grid-cols-1 gap-2 @xs:grid-cols-[1fr_auto]">
            <input
              type="date"
              value={dateTo}
              min={dateFrom}
              onChange={(e) => {
                setDateTo(e.target.value);
                setError(null);
              }}
              aria-invalid={Boolean(error)}
              className={`${FIELD} ${error ? "border-danger" : ""}`}
            />
            <input
              type="time"
              value={timeTo}
              onChange={(e) => setTimeTo(e.target.value)}
              className={`${FIELD} @xs:w-[7.5rem] @xs:flex-none`}
            />
          </div>
        </label>

        <label className="block min-w-0">
          <span className={FIELD_LABEL}>
            <User className="h-3.5 w-3.5" />
            {t("ageGroup")}
          </span>
          <select
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value)}
            className={SELECT}
            style={CHEVRON}
          >
            {GOCARS_AGES.map((age) => (
              <option key={age.id} value={age.id}>
                {t(age.key)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-3 flex items-center gap-2 text-sm text-navy/80">
        <input
          type="checkbox"
          checked={differentReturn}
          onChange={(e) => setDifferentReturn(e.target.checked)}
          className="h-4 w-4 accent-navy"
        />
        {t("differentReturn")}
      </label>

      {differentReturn ? (
        <label className="mt-2 block min-w-0">
          <span className={FIELD_LABEL}>{t("dropoffLocation")}</span>
          <select
            value={returnId}
            onChange={(e) => setReturnId(e.target.value)}
            className={SELECT}
            style={CHEVRON}
          >
            {GOCARS_LOCATIONS.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {t(loc.key)}
              </option>
            ))}
          </select>
        </label>
      ) : null}

      {errorBlock ? <div className="mt-3">{errorBlock}</div> : null}

      <div className="mt-5">{submitBtn}</div>
    </form>
  );
}
