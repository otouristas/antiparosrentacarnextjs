"use client";

import { MessageCircle, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { SITE } from "@/lib/site";
import { localizedHref } from "@/data/nav-links";
import type { Locale } from "@/i18n/routing";

/**
 * Sticky mobile conversion bar.
 *
 * Reveals on scroll rather than sitting over the hero from the first paint,
 * where it competed with the hero's own booking CTA. It also now targets the
 * in-page `#book` widget when one exists on this page, instead of always
 * bouncing the user to the homepage.
 *
 * Breakpoint is `xl:hidden` to match the nav: between 1024-1279px the desktop
 * "Book now" button is hidden, so the bar has to stay.
 */
export default function StickyMobileBookingBar() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const [visible, setVisible] = useState(false);
  const [target, setTarget] = useState<string | null>(null);

  useEffect(() => {
    setTarget(document.getElementById("book") ? "#book" : null);
  }, []);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const bookHref = target ?? `${localizedHref("home", locale)}#book`;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-3 py-2.5 shadow-dock backdrop-blur-md transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none xl:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-lg items-center gap-2">
        <a href={bookHref} className="btn-yellow flex-1 py-3 text-sm">
          {t("bookNow")}
        </a>
        <a
          href={SITE.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-[#25D366] text-white transition hover:brightness-95"
          aria-label="WhatsApp"
        >
          <MessageCircle className="h-5 w-5" />
        </a>
        <a
          href={`tel:${SITE.phone}`}
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-navy text-white transition-colors hover:bg-navy-panel"
          aria-label={SITE.phoneDisplay}
        >
          <Phone className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}
