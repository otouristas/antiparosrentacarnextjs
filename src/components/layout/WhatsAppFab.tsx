import { SITE } from "@/lib/site";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

export default function WhatsAppFab() {
  return (
    <a
      href={SITE.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp AGGELOS Rentals"
      className="fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 lg:bottom-5 lg:right-5"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
