"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Check, X } from "lucide-react";
import type { SearchVehicle } from "@/lib/gocars-core";
import { localizedHref } from "@/data/nav-links";
import type { Locale } from "@/i18n/routing";

function countLabel(n: number, one: string, many: string) {
  return `${n} ${n === 1 ? one : many}`;
}

function featureChips(
  v: SearchVehicle,
  labels: {
    seat: string;
    seats: string;
    door: string;
    doors: string;
    automatic: string;
    manual: string;
    largeBag: string;
    largeBags: string;
    smallBag: string;
    smallBags: string;
    ac: string;
  },
) {
  const chips: string[] = [];
  if (v.seats != null)
    chips.push(countLabel(v.seats, labels.seat, labels.seats));
  if (v.doors != null)
    chips.push(countLabel(v.doors, labels.door, labels.doors));
  if (v.transmission) {
    const tr = v.transmission.toLowerCase();
    chips.push(
      tr.includes("auto")
        ? labels.automatic
        : tr.includes("manual")
          ? labels.manual
          : v.transmission,
    );
  }
  if (v.largeBags != null) {
    chips.push(countLabel(v.largeBags, labels.largeBag, labels.largeBags));
  }
  if (v.smallBags != null) {
    chips.push(countLabel(v.smallBags, labels.smallBag, labels.smallBags));
  }
  if (v.fuel) chips.push(v.fuel);
  if (v.airCondition) chips.push(labels.ac);
  return chips;
}

function safeSubtitle(raw?: string): string | undefined {
  if (!raw) return undefined;
  const text = raw.trim();
  if (!text || text.length > 60) return undefined;
  if (
    /pricing|collision damage|terms and conditions|excess|waiver/i.test(text)
  ) {
    return undefined;
  }
  return text;
}

export default function ResultCarRow({
  vehicle,
  index = 0,
}: {
  vehicle: SearchVehicle;
  index?: number;
}) {
  const t = useTranslations("booking.results");
  const tFleet = useTranslations("fleet");
  const locale = useLocale() as Locale;
  const [showAllIncluded, setShowAllIncluded] = useState(false);

  const chips = featureChips(vehicle, {
    seat: t("seat"),
    seats: t("seats"),
    door: t("door"),
    doors: t("doors"),
    automatic: tFleet("specs.automatic"),
    manual: tFleet("specs.manual"),
    largeBag: t("largeBag"),
    largeBags: t("largeBags"),
    smallBag: t("smallBag"),
    smallBags: t("smallBags"),
    ac: tFleet("specs.ac"),
  });
  const subtitle = safeSubtitle(vehicle.subtitle);
  const includedVisible = showAllIncluded
    ? vehicle.included
    : vehicle.included.slice(0, 3);
  const hasMoreIncluded = vehicle.included.length > 3;
  const termsHref = localizedHref("terms-conditions", locale);

  return (
    <article
      className="group relative flex flex-col gap-5 border-b border-navy/10 py-6 sm:flex-row sm:gap-7 sm:py-7 animate-fade-up"
      style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
    >
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-1 origin-center scale-y-0 bg-yellow transition-transform duration-300 group-hover:scale-y-100"
      />

      <div className="relative mx-auto aspect-[4/3] w-full max-w-[11rem] shrink-0 bg-navy/[0.03] sm:mx-0 sm:w-44">
        {vehicle.thumb ? (
          <Image
            src={vehicle.thumb}
            alt={vehicle.title}
            fill
            className="object-contain p-2"
            sizes="176px"
          />
        ) : null}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-2xs font-bold uppercase tracking-[0.14em] text-navy/50">
          {vehicle.typeLabel}
        </p>
        <h2 className="font-display text-xl font-extrabold text-navy sm:text-2xl">
          {vehicle.title}
        </h2>
        {subtitle ? (
          <p className="mt-0.5 text-sm text-ink/55">{subtitle}</p>
        ) : null}
        {typeof vehicle.remaining === "number" ? (
          <p className="mt-1 text-xs font-semibold text-amber-700">
            {t("lastAvailable", { count: vehicle.remaining })}
          </p>
        ) : null}

        {chips.length ? (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {chips.map((chip) => (
              <li
                key={chip}
                className="rounded-sm border border-navy/10 bg-brand-light px-2 py-1 text-2xs font-semibold text-navy/80"
              >
                {chip}
              </li>
            ))}
          </ul>
        ) : null}

        {vehicle.included.length ? (
          <div className="mt-4">
            <p className="text-2xs font-bold uppercase tracking-[0.14em] text-navy/45">
              {t("included")}
            </p>
            <ul className="mt-1.5 space-y-1">
              {includedVisible.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-ink/70"
                >
                  <Check
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-navy"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {hasMoreIncluded ? (
              <button
                type="button"
                onClick={() => setShowAllIncluded((v) => !v)}
                className="mt-1.5 text-xs font-bold text-navy underline-offset-2 hover:underline"
              >
                {showAllIncluded ? t("seeLess") : t("seeAll")}
              </button>
            ) : null}
          </div>
        ) : null}

        {vehicle.perks.length ? (
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
            {vehicle.perks.map((perk) => (
              <li
                key={perk.label}
                className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                  perk.positive ? "text-navy/80" : "text-ink/45"
                }`}
              >
                {perk.positive ? (
                  <Check className="h-3.5 w-3.5 shrink-0" aria-hidden />
                ) : (
                  <X className="h-3.5 w-3.5 shrink-0" aria-hidden />
                )}
                {perk.label}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="flex w-full shrink-0 flex-col justify-between gap-3 sm:w-44 sm:items-end sm:text-right">
        <div>
          {vehicle.strikePriceText ? (
            <p className="text-sm text-ink/40 line-through">
              {vehicle.strikePriceText}
            </p>
          ) : null}
          {vehicle.totalPriceText ? (
            <p className="font-display text-2xl font-extrabold text-navy">
              {vehicle.totalPriceText}
            </p>
          ) : null}
          {vehicle.perDayPriceText ? (
            <p className="text-sm font-semibold text-navy/70">
              {vehicle.perDayPriceText}
            </p>
          ) : null}
          {vehicle.rentalDays != null ? (
            <p className="mt-1 text-2xs font-medium text-ink/50">
              {t("rentalDays", { count: vehicle.rentalDays })}
            </p>
          ) : null}
        </div>

        <div className="flex w-full flex-col gap-2 sm:items-end">
          <a
            href={termsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-navy/55 underline-offset-2 hover:text-navy hover:underline"
          >
            {t("terms")}
          </a>
          <a
            href={vehicle.checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-yellow inline-flex min-h-11 w-full items-center justify-center px-5 text-sm font-bold sm:w-auto"
          >
            {t("select")}
          </a>
        </div>
      </div>
    </article>
  );
}
