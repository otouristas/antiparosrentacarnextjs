import type { ReactNode } from "react";

/**
 * The layout primitive.
 *
 * `mx-auto max-w-7xl px-4 py-14 sm:px-6` appeared verbatim ~20 times and was the
 * single largest source of layout drift. It also replaces `.section-band`, which
 * only set `position:relative; width:100%` — both already <section> defaults.
 *
 * `tone` carries the band colour AND its default text colour together, because
 * the two must agree: the old global `h1-h4 { color: navy }` forced every dark
 * band to re-declare `text-foam` on each heading.
 */

export type SectionTone =
  "light" | "white" | "sand" | "navy" | "navy-deep" | "transparent";
export type SectionWidth = "page" | "prose" | "full";
export type SectionPad = "none" | "sm" | "md" | "lg";

const TONE: Record<SectionTone, string> = {
  light: "bg-brand-light text-ink",
  white: "bg-white text-ink",
  sand: "bg-sand text-ink",
  navy: "bg-navy text-foam [&_h1]:text-foam [&_h2]:text-foam [&_h3]:text-foam",
  "navy-deep":
    "bg-navy-deep text-foam [&_h1]:text-foam [&_h2]:text-foam [&_h3]:text-foam",
  transparent: "",
};

const WIDTH: Record<SectionWidth, string> = {
  page: "mx-auto w-full max-w-page px-4 sm:px-6",
  prose: "mx-auto w-full max-w-prose px-4 sm:px-6",
  full: "w-full",
};

const PAD: Record<SectionPad, string> = {
  none: "",
  sm: "py-10 sm:py-12",
  md: "py-14 sm:py-18",
  lg: "py-20 sm:py-28",
};

export default function Section({
  children,
  tone = "light",
  width = "page",
  pad = "md",
  id,
  className = "",
  innerClassName = "",
  as: Tag = "section",
  "aria-labelledby": ariaLabelledBy,
}: {
  children: ReactNode;
  tone?: SectionTone;
  width?: SectionWidth;
  pad?: SectionPad;
  id?: string;
  className?: string;
  innerClassName?: string;
  as?: "section" | "div" | "article" | "aside" | "header" | "footer";
  "aria-labelledby"?: string;
}) {
  return (
    <Tag
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={`relative w-full ${TONE[tone]} ${className}`}
    >
      <div className={`${WIDTH[width]} ${PAD[pad]} ${innerClassName}`}>
        {children}
      </div>
    </Tag>
  );
}

/** Standard band heading + optional lead, so vertical rhythm stays consistent. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  id,
  align = "left",
  tone = "dark",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  id?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
}) {
  const muted = tone === "light" ? "text-foam/70" : "text-ink/65";
  const accent = tone === "light" ? "text-yellow" : "text-navy/45";
  return (
    <header
      className={`${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} mb-10`}
    >
      {eyebrow ? (
        <p
          className={`mb-2 text-xs font-bold uppercase tracking-[0.18em] ${accent}`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 id={id} className="font-display text-3xl font-extrabold sm:text-4xl">
        {title}
      </h2>
      {lead ? <p className={`mt-4 text-lg ${muted}`}>{lead}</p> : null}
    </header>
  );
}
