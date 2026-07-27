"use client";

import { Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { SITE } from "@/lib/site";
import { localizedHref } from "@/data/nav-links";
import TrustBadges from "@/components/cro/TrustBadges";
import type { Locale } from "@/i18n/routing";

/**
 * Site-wide closing CTA, appended to essentially every page.
 *
 * Was a flat navy rectangle with no depth and no reassurance at the point of
 * decision. Now carries a subtle radial wash and the trust row, so the last
 * thing before the footer answers "is this safe to book?" as well as asking.
 */
export default function FinalCtaBlock({
  title,
  subtitle,
  ctaLabel,
}: {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
}) {
  const t = useTranslations("cta");
  const locale = useLocale() as Locale;

  return (
    <section className="relative isolate w-full overflow-hidden bg-navy text-foam">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(190,235,255,0.18), transparent 60%), radial-gradient(ellipse 50% 80% at 85% 100%, rgba(249,229,39,0.10), transparent 65%)",
        }}
      />
      <div className="mx-auto max-w-page px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-foam sm:text-4xl">
            {title || t("title")}
          </h2>
          <p className="mt-5 text-lg text-foam/70">
            {subtitle || t("subtitle")}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`${localizedHref("home", locale)}#book`}
              className="btn-yellow text-base"
            >
              {ctaLabel || t("button")}
            </a>
            <a href={`tel:${SITE.phone}`} className="btn-ghost-light">
              <Phone className="h-4 w-4" />
              {SITE.phoneDisplay}
            </a>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-light"
            >
              WhatsApp
            </a>
          </div>

          <TrustBadges
            variant="dark"
            className="mt-10 justify-center border-t border-foam/10 pt-8"
          />
        </div>
      </div>
    </section>
  );
}
