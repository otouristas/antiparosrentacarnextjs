import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

export function DestinationList({
  children,
  invert = false,
  "aria-label": ariaLabel,
}: {
  children: ReactNode;
  invert?: boolean;
  "aria-label"?: string;
}) {
  const border = invert
    ? "divide-foam/15 border-foam/15"
    : "divide-navy/10 border-navy/10";
  return (
    <nav aria-label={ariaLabel} className="min-w-0">
      <ul className={`divide-y border-y ${border}`}>{children}</ul>
    </nav>
  );
}

/**
 * Icon-led destination row — full-row link with yellow hover rail.
 */
export function DestinationRow({
  href,
  title,
  blurb,
  icon,
  index = 0,
  invert = false,
  marker,
}: {
  href: string;
  title: string;
  blurb?: string;
  icon?: ReactNode;
  index?: number;
  invert?: boolean;
  /** Optional "01" style marker instead of / with icon */
  marker?: string;
}) {
  const titleCls = invert ? "text-foam" : "text-navy";
  const blurbCls = invert ? "text-foam/65" : "text-ink/60";
  const circle = invert
    ? "border-foam/25 bg-white/5 text-foam group-hover:border-yellow group-hover:bg-yellow group-hover:text-navy"
    : "border-navy/15 bg-white text-navy group-hover:border-yellow group-hover:bg-yellow";
  const hoverBg = invert ? "group-hover:bg-white/10" : "group-hover:bg-white";

  return (
    <li>
      <a
        href={href}
        className="group relative flex items-center gap-5 py-5 sm:gap-7 sm:py-6 animate-fade-up"
        style={{ animationDelay: `${Math.min(index, 8) * 55}ms` }}
      >
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-1 origin-center scale-y-0 bg-yellow transition-transform duration-300 group-hover:scale-y-100"
        />

        {marker ? (
          <span className="flex h-16 w-16 shrink-0 items-center justify-center font-display text-2xl font-extrabold text-yellow sm:h-20 sm:w-20 sm:text-3xl">
            {marker}
          </span>
        ) : icon ? (
          <span className="relative flex h-16 w-16 shrink-0 items-center justify-center sm:h-20 sm:w-20">
            <span
              aria-hidden
              className={`absolute inset-0 rounded-full bg-transparent transition-colors duration-300 ${hoverBg}`}
            />
            <span className="relative flex h-12 w-12 items-center justify-center transition-transform duration-500 group-hover:scale-110 motion-reduce:group-hover:scale-100 sm:h-16 sm:w-16 [&_img]:h-full [&_img]:w-full [&_img]:object-contain [&_svg]:h-8 [&_svg]:w-8 sm:[&_svg]:h-10 sm:[&_svg]:w-10">
              {icon}
            </span>
          </span>
        ) : null}

        <span className="min-w-0 flex-1">
          <span
            className={`block font-display text-xl font-extrabold sm:text-2xl ${titleCls}`}
          >
            {title}
          </span>
          {blurb ? (
            <span
              className={`mt-1 block text-sm leading-relaxed sm:text-base ${blurbCls}`}
            >
              {blurb}
            </span>
          ) : null}
        </span>

        <span
          className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-300 group-hover:shadow-sm ${circle}`}
        >
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </a>
    </li>
  );
}

/** Non-link numbered reason row (why-us on navy). */
export function ReasonRow({
  marker,
  title,
  body,
  index = 0,
}: {
  marker: string;
  title: string;
  body: string;
  index?: number;
}) {
  return (
    <li
      className="relative flex gap-5 border-b border-foam/15 py-6 last:border-b-0 sm:gap-7 animate-fade-up"
      style={{ animationDelay: `${Math.min(index, 8) * 55}ms` }}
    >
      <span className="flex h-14 w-14 shrink-0 items-center justify-center font-display text-2xl font-extrabold text-yellow sm:h-16 sm:w-16 sm:text-3xl">
        {marker}
      </span>
      <div className="min-w-0 pt-1">
        <h3 className="font-display text-xl font-extrabold text-foam sm:text-2xl">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-foam/70 sm:text-base">
          {body}
        </p>
      </div>
    </li>
  );
}
