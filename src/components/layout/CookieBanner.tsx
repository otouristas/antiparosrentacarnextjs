"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Cookie } from "lucide-react";
import { Link } from "@/i18n/navigation";

const STORAGE_KEY = "aggelos-cookie-consent";

type Consent = "accepted" | "essential";

export default function CookieBanner() {
  const t = useTranslations("cookies");
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const dismiss = (value: Consent) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* private mode — still hide */
    }
    setLeaving(true);
    window.setTimeout(() => setVisible(false), 280);
  };

  if (!visible) return null;

  return (
    <aside
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      className={`cookie-banner fixed z-[60] w-[min(22.5rem,calc(100vw-1.5rem))] ${
        leaving ? "cookie-banner--out" : ""
      }`}
    >
      <div className="cookie-banner__card relative overflow-hidden rounded-2xl border border-white/10 bg-navy text-foam shadow-xl">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-yellow/20 blur-2xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-10 -left-6 h-24 w-24 rounded-full bg-sky/15 blur-2xl"
        />

        <div className="relative p-4 sm:p-5">
          <div className="mb-3 flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow text-navy shadow-sm">
              <Cookie className="h-5 w-5" aria-hidden />
            </span>
            <div className="min-w-0">
              <h2
                id="cookie-banner-title"
                className="font-display text-base font-semibold tracking-tight text-white"
              >
                {t("title")}
              </h2>
              <p
                id="cookie-banner-desc"
                className="mt-1 text-sm leading-relaxed text-foam/80"
              >
                {t("body")}{" "}
                <Link
                  href="/cookie-policy-eu/"
                  className="font-medium text-yellow underline decoration-yellow/40 underline-offset-2 transition hover:decoration-yellow"
                >
                  {t("policy")}
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => dismiss("accepted")}
              className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-yellow px-4 font-display text-sm font-semibold text-navy transition hover:bg-yellow-hover focus-visible:outline-none"
            >
              {t("accept")}
            </button>
            <button
              type="button"
              onClick={() => dismiss("essential")}
              className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 font-display text-sm font-semibold text-foam transition hover:bg-white/10 focus-visible:outline-none"
            >
              {t("essential")}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
