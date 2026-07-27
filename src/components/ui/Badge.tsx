import type { ReactNode } from "react";

/**
 * Small status/label pill. Gives vehicle cards a slot for "Automatic",
 * "Best seller", "4x4", "Enquiry only" — the previous VehicleCard had no badge
 * affordance at all, so every card read identically.
 */

export type BadgeTone =
  "yellow" | "navy" | "sky" | "muted" | "success" | "warning" | "onDark";

const TONE: Record<BadgeTone, string> = {
  yellow: "bg-yellow text-navy",
  navy: "bg-navy text-foam",
  sky: "bg-sky/45 text-navy",
  muted: "bg-navy/[0.06] text-navy/70",
  success: "bg-success/12 text-success",
  warning: "bg-warning/12 text-warning",
  onDark: "bg-foam/12 text-foam",
};

export default function Badge({
  children,
  tone = "muted",
  className = "",
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-pill px-2.5 py-1 text-2xs font-bold uppercase tracking-wider ${TONE[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
