import { SITE } from "@/lib/site";

/**
 * Embedded Google Map for the Antiparos Port office — no API key required.
 */
export default function OfficeMap({
  title,
  className = "",
}: {
  title: string;
  className?: string;
}) {
  const { lat, lng } = SITE.coordinates;
  const embedSrc = `https://maps.google.com/maps?q=${lat},${lng}&z=16&hl=en&output=embed`;
  const openSrc = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  return (
    <figure
      className={`overflow-hidden rounded-lg border border-navy/10 bg-brand-light ${className}`}
    >
      <div className="relative aspect-[16/10] w-full sm:aspect-[21/9]">
        <iframe
          title={title}
          src={embedSrc}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-navy/8 px-4 py-3 sm:px-5">
        <p className="text-sm font-semibold text-navy">
          {SITE.address.street}, {SITE.address.city}
        </p>
        <a
          href={openSrc}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-bold text-navy underline decoration-yellow decoration-2 underline-offset-4 hover:text-navy-panel"
        >
          Open in Google Maps
        </a>
      </figcaption>
    </figure>
  );
}
