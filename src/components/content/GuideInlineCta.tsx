import { Phone } from "lucide-react";
import Button from "@/components/ui/Button";
import { SITE } from "@/lib/site";

export default function GuideInlineCta({
  title = "Ready to explore Paros & Antiparos?",
  subtitle = "Free cancellation · No hidden fees · Port, airport & Antiparos pickup",
  primaryHref = "#book",
  primaryLabel = "Check availability",
  className = "",
}: {
  title?: string;
  subtitle?: string;
  primaryHref?: string;
  primaryLabel?: string;
  className?: string;
}) {
  return (
    <aside
      className={`my-10 overflow-hidden border border-navy/10 bg-gradient-to-br from-navy to-navy-panel p-6 text-foam sm:p-8 ${className}`}
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-yellow">
        AGGELOS Rentals
      </p>
      <h3 className="mt-2 font-display text-2xl font-extrabold leading-tight sm:text-3xl">
        {title}
      </h3>
      <p className="mt-2 max-w-xl text-sm text-foam/75 sm:text-base">
        {subtitle}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button href={primaryHref} variant="yellow" size="md">
          {primaryLabel}
        </Button>
        <Button href={`tel:${SITE.phone}`} variant="ghost" size="md">
          <Phone className="h-4 w-4" aria-hidden />
          {SITE.phoneDisplay}
        </Button>
        <Button href={SITE.whatsapp} variant="whatsapp" size="md">
          WhatsApp
        </Button>
      </div>
    </aside>
  );
}
