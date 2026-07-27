"use client";

import Image from "next/image";

type MegaTileProps = {
  href: string;
  image: string;
  label: string;
  active?: boolean;
  dimmed?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

/**
 * Photographic nav tile — full-bleed image, navy scrim, label pill.
 * Used by Locations / Guides megas.
 */
export default function MegaTile({
  href,
  image,
  label,
  active = false,
  dimmed = false,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
}: MegaTileProps) {
  return (
    <a
      href={href}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-current={active ? "true" : undefined}
      className={`group relative block aspect-[4/3] overflow-hidden rounded-sm outline-none transition-[opacity,transform,box-shadow] duration-200 focus-visible:shadow-focus ${
        dimmed ? "opacity-40" : "opacity-100"
      } ${active ? "ring-2 ring-yellow ring-offset-2 ring-offset-sand" : ""}`}
    >
      <Image
        src={image}
        alt=""
        fill
        className="object-cover transition-transform duration-500 ease-[var(--ease-out-soft)] motion-safe:group-hover:scale-105 motion-reduce:transition-none"
        sizes="(max-width: 1024px) 40vw, 220px"
      />
      <span
        className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/25 to-transparent"
        aria-hidden
      />
      <span className="absolute inset-x-0 bottom-0 flex justify-center p-2.5 sm:p-3">
        <span className="rounded-sm bg-white/95 px-3 py-1.5 text-center text-xs font-bold tracking-wide text-navy shadow-xs sm:text-sm">
          {label}
        </span>
      </span>
    </a>
  );
}

type FleetIconTileProps = {
  href: string;
  icon: string;
  label: string;
  active?: boolean;
  dimmed?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

/**
 * Editorial fleet tile — branded silhouette SVG, yellow hover rail.
 */
export function FleetIconTile({
  href,
  icon,
  label,
  active = false,
  dimmed = false,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
}: FleetIconTileProps) {
  return (
    <a
      href={href}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-current={active ? "true" : undefined}
      className={`group relative flex flex-col items-center gap-3 rounded-lg border bg-white px-3 py-5 text-center outline-none transition-[border-color,box-shadow,opacity,transform] duration-200 focus-visible:shadow-focus ${
        dimmed ? "opacity-40" : "opacity-100"
      } ${
        active
          ? "border-yellow shadow-sm ring-2 ring-yellow ring-offset-2 ring-offset-sand"
          : "border-navy/10 hover:border-navy/25 hover:shadow-sm"
      }`}
    >
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-1 origin-center scale-y-0 rounded-l-lg bg-yellow transition-transform duration-300 group-hover:scale-y-100 group-focus-visible:scale-y-100"
      />
      <span className="relative flex h-14 w-14 items-center justify-center sm:h-16 sm:w-16">
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-sand/0 transition-colors duration-300 group-hover:bg-sand"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={icon}
          alt=""
          width={64}
          height={64}
          className="relative h-12 w-12 object-contain transition-transform duration-500 group-hover:scale-110 motion-reduce:group-hover:scale-100 sm:h-14 sm:w-14"
        />
      </span>
      <span className="font-display text-sm font-extrabold leading-snug text-navy sm:text-base">
        {label}
      </span>
    </a>
  );
}

type MegaRailButtonProps = {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

export function MegaRailButton({
  active,
  onClick,
  children,
}: MegaRailButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`w-full rounded-sm px-3 py-2.5 text-left text-sm font-semibold transition-colors duration-150 ${
        active
          ? "border border-yellow bg-yellow text-navy shadow-xs"
          : "border border-transparent text-navy/75 hover:bg-navy/5 hover:text-navy"
      }`}
    >
      {children}
    </button>
  );
}
