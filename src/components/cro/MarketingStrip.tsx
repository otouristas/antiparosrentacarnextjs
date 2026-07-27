"use client";

import { useTranslations } from "next-intl";

const KEYS = ["cancel", "fees", "pickup"] as const;

export default function MarketingStrip() {
  const t = useTranslations("strip");

  return (
    <div className="border-b border-navy/10 bg-navy text-foam">
      <div className="edge-fade-r mx-auto max-w-page overflow-x-auto px-4 py-2.5 sm:px-6">
        <ul className="flex min-w-max items-center gap-x-6 gap-y-1 text-[11px] font-medium tracking-wide sm:text-xs">
          {KEYS.map((key, i) => (
            <li key={key} className="flex items-center gap-6">
              {i > 0 && (
                <span
                  className="hidden h-1 w-1 rounded-full bg-foam/35 sm:block"
                  aria-hidden
                />
              )}
              <span className="whitespace-nowrap text-foam/85">{t(key)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
