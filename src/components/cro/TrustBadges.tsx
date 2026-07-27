"use client";

import { CheckCircle2, Clock, MapPin, Shield, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

const ITEMS = [
  { key: "cancel", Icon: CheckCircle2 },
  { key: "fees", Icon: Shield },
  { key: "pickup", Icon: MapPin },
  { key: "confirm", Icon: Zap },
  { key: "support", Icon: Clock },
] as const;

export default function TrustBadges({
  className = "",
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const t = useTranslations("strip");
  const text = variant === "dark" ? "text-foam/85" : "text-navy/80";
  const icon = variant === "dark" ? "text-yellow" : "text-navy";

  return (
    <ul
      className={`flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold sm:text-sm ${text} ${className}`}
    >
      {ITEMS.map(({ key, Icon }) => (
        <li key={key} className="inline-flex items-center gap-1.5">
          <Icon className={`h-4 w-4 shrink-0 ${icon}`} aria-hidden />
          <span>{t(key)}</span>
        </li>
      ))}
    </ul>
  );
}
