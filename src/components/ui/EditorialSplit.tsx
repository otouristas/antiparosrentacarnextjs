import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

/**
 * Sticky editorial header + content column (directory language).
 */
export default function EditorialSplit({
  eyebrow,
  title,
  lead,
  action,
  children,
  titleId,
  pad = true,
  invert = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  action?: { href: string; label: string };
  children: ReactNode;
  titleId?: string;
  pad?: boolean;
  /** Light text on navy atmospheres */
  invert?: boolean;
}) {
  const muted = invert ? "text-foam/70" : "text-ink/65";
  const eyebrowCls = invert ? "text-foam/45" : "text-navy/45";
  const titleCls = invert ? "text-foam" : "text-navy";
  const actionCls = invert
    ? "border-yellow text-foam hover:border-foam"
    : "border-yellow text-navy hover:border-navy";

  return (
    <div
      className={`mx-auto grid max-w-page gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)] lg:gap-16 ${
        pad ? "py-16 sm:py-20 lg:py-24" : ""
      }`}
    >
      <header className="lg:sticky lg:top-28 lg:self-start">
        {eyebrow ? (
          <p
            className={`text-xs font-bold uppercase tracking-[0.2em] ${eyebrowCls}`}
          >
            {eyebrow}
          </p>
        ) : null}
        <div
          id={titleId}
          className={`max-w-md font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl ${titleCls} ${
            eyebrow ? "mt-3" : ""
          }`}
        >
          {title}
        </div>
        {lead ? (
          <div className={`mt-5 max-w-sm text-lg leading-relaxed ${muted}`}>
            {lead}
          </div>
        ) : null}
        {action ? (
          <a
            href={action.href}
            className={`group mt-8 inline-flex min-h-12 items-center gap-2 border-b-2 pb-1 text-sm font-bold transition-colors ${actionCls}`}
          >
            {action.label}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        ) : null}
      </header>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
