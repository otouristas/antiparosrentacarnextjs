"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { localeNames, locales, type Locale } from "@/i18n/routing";

/**
 * Language switcher.
 *
 * Previously this imported `content/locale-switch-map.json` — 229 KB containing
 * every URL in every locale — into a "use client" module, so the entire map was
 * bundled into the JavaScript of all 820 pages just to resolve eleven links.
 *
 * The exact sibling URLs are already on the page: `metadataFor` emits a complete
 * `<link rel="alternate" hreflang>` cluster into the head. Reading those costs
 * nothing and stays automatically in sync with the canonical/hreflang signals.
 *
 * SSR renders locale-prefix-swapped hrefs so the links are crawlable and usable
 * before hydration; the effect then substitutes the exact localized slugs
 * (/de/paros-mietwagen/ rather than /de/paros-rent-a-car/). Crawlers take their
 * signal from the head cluster in either case.
 *
 * Also replaces a bare <select> + window.location assignment, which produced
 * zero crawlable locale links, with real <a hreflang> anchors.
 */

function prefixSwap(pathname: string, target: Locale): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] && (locales as readonly string[]).includes(parts[0]))
    parts.shift();
  const rest = parts.length ? `/${parts.join("/")}/` : "/";
  // Every locale is prefixed now, English included.
  return `/${target}${rest}`;
}

export default function LocaleSwitcher({
  className = "",
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const active = useLocale() as Locale;
  const pathname = usePathname() || "/";
  const [hrefs, setHrefs] = useState<Partial<Record<Locale, string>>>({});

  useEffect(() => {
    const found: Partial<Record<Locale, string>> = {};
    document
      .querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang]')
      .forEach((link) => {
        const lang = link.getAttribute("hreflang");
        if (lang && (locales as readonly string[]).includes(lang)) {
          try {
            found[lang as Locale] = new URL(link.href).pathname;
          } catch {
            /* ignore malformed href */
          }
        }
      });
    if (Object.keys(found).length) setHrefs(found);
  }, [pathname]);

  const summary =
    variant === "dark"
      ? "inline-flex min-h-9 cursor-pointer list-none items-center gap-1.5 rounded-sm border border-foam/25 bg-foam/10 px-2.5 py-1.5 text-xs font-bold text-foam transition-colors hover:border-foam/45 hover:bg-foam/15 [&::-webkit-details-marker]:hidden"
      : "inline-flex min-h-9 cursor-pointer list-none items-center gap-1.5 rounded-sm border border-navy/15 bg-white px-2.5 py-1.5 text-xs font-bold text-navy transition-colors hover:border-navy/35 [&::-webkit-details-marker]:hidden";

  return (
    <details className={`relative ${className}`}>
      <summary className={summary}>
        <Globe className="h-3.5 w-3.5" />
        <span className="uppercase">{active}</span>
      </summary>

      <ul className="absolute right-0 z-50 mt-1 max-h-80 min-w-[11rem] overflow-y-auto rounded-md border border-line bg-white py-1.5 shadow-lg">
        {locales.map((l) => (
          <li key={l}>
            <a
              href={hrefs[l] ?? prefixSwap(pathname, l)}
              hrefLang={l}
              aria-current={l === active ? "true" : undefined}
              className={`block px-3.5 py-2 text-sm transition-colors hover:bg-brand-light ${
                l === active
                  ? "font-bold text-navy"
                  : "font-medium text-navy/75"
              }`}
            >
              {localeNames[l]}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
