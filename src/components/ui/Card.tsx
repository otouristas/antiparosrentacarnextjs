import type { ReactNode } from "react";

/**
 * Surface primitive with a real elevation scale.
 *
 * Previously the codebase had 9 shadow usages, only 3 of them designed — the
 * rest were bare `shadow-md`/`shadow-lg`/`shadow-xl` defaults with no
 * relationship to each other, and radii were split across 6 unrelated values.
 */

export type CardTone =
  "white" | "light" | "sand" | "navy" | "glass" | "outline";
export type CardElevation = "flat" | "sm" | "md" | "lg";

const TONE: Record<CardTone, string> = {
  white: "bg-white border border-line",
  light: "bg-brand-light border border-line",
  sand: "bg-sand border border-line",
  navy: "bg-navy-panel/60 border border-foam/10 text-foam",
  glass: "glass-panel",
  outline: "border border-line-strong bg-transparent",
};

const ELEVATION: Record<CardElevation, string> = {
  flat: "",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
};

export default function Card({
  children,
  tone = "white",
  elevation = "sm",
  interactive = false,
  href,
  className = "",
  ...rest
}: {
  children: ReactNode;
  tone?: CardTone;
  elevation?: CardElevation;
  /** Adds lift-on-hover. Implied when `href` is set. */
  interactive?: boolean;
  href?: string;
  className?: string;
} & Record<string, unknown>) {
  const lift =
    interactive || href
      ? "group transition duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:hover:translate-y-0"
      : "";
  const cls = `flex flex-col overflow-hidden rounded-lg ${TONE[tone]} ${ELEVATION[elevation]} ${lift} ${className}`;

  if (href) {
    return (
      <a href={href} className={cls} {...(rest as Record<string, never>)}>
        {children}
      </a>
    );
  }
  return (
    <div className={cls} {...(rest as Record<string, never>)}>
      {children}
    </div>
  );
}
