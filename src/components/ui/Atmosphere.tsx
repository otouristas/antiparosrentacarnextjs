import type { ReactNode } from "react";

export type AtmosphereTone = "sand" | "navy" | "white" | "light";

const TONE: Record<AtmosphereTone, string> = {
  sand: "bg-sand text-ink",
  navy: "bg-navy text-foam [&_h1]:text-foam [&_h2]:text-foam [&_h3]:text-foam",
  white: "bg-white text-ink",
  light: "bg-brand-light text-ink",
};

const WASH: Record<AtmosphereTone, string> = {
  sand: "bg-[radial-gradient(ellipse_at_12%_0%,rgb(249_229_39/0.18),transparent_42%),radial-gradient(ellipse_at_100%_80%,rgb(17_37_83/0.06),transparent_50%)]",
  navy: "bg-[radial-gradient(ellipse_at_20%_0%,rgb(190_235_255/0.16),transparent_50%),radial-gradient(ellipse_at_90%_100%,rgb(249_229_39/0.12),transparent_55%)]",
  white:
    "bg-[radial-gradient(ellipse_at_0%_0%,rgb(249_229_39/0.1),transparent_40%),radial-gradient(ellipse_at_100%_100%,rgb(17_37_83/0.04),transparent_45%)]",
  light:
    "bg-[radial-gradient(ellipse_at_10%_0%,rgb(249_229_39/0.12),transparent_40%),radial-gradient(ellipse_at_100%_80%,rgb(17_37_83/0.05),transparent_50%)]",
};

const ORB: Record<AtmosphereTone, string> = {
  sand: "bg-yellow/20",
  navy: "bg-yellow/15",
  white: "bg-yellow/15",
  light: "bg-yellow/20",
};

/**
 * Atmospheric section shell — radial washes + optional blur orb.
 * Replaces flat tone bands with directory-language depth.
 */
export default function Atmosphere({
  children,
  tone = "sand",
  orb = true,
  className = "",
  id,
  as: Tag = "section",
  "aria-labelledby": ariaLabelledBy,
}: {
  children: ReactNode;
  tone?: AtmosphereTone;
  orb?: boolean;
  className?: string;
  id?: string;
  as?: "section" | "div";
  "aria-labelledby"?: string;
}) {
  return (
    <Tag
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={`relative overflow-hidden ${TONE[tone]} ${className}`}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 ${WASH[tone]}`}
      />
      {orb ? (
        <div
          aria-hidden
          className={`pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full blur-3xl ${ORB[tone]}`}
        />
      ) : null}
      <div className="relative">{children}</div>
    </Tag>
  );
}
