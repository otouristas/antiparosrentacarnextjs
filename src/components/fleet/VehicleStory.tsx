import { getTranslations } from "next-intl/server";
import { MapPin } from "lucide-react";

export default async function VehicleStory({
  name,
  blurb,
  highlights,
  licence,
  modelsLine,
  categoryStory,
  idealFor,
}: {
  name: string;
  blurb?: string | null;
  highlights?: string[] | null;
  licence?: string | null;
  modelsLine?: string | null;
  categoryStory?: string | null;
  idealFor?: string | null;
}) {
  const t = await getTranslations("fleet");
  const tr = await getTranslations("reviews");

  const body =
    blurb?.trim() ||
    categoryStory?.trim() ||
    modelsLine ||
    t("vehicleDesc", { name });

  return (
    <section className="mt-12 border-t border-navy/10 pt-10">
      <h2 className="font-display text-2xl font-extrabold text-navy sm:text-3xl">
        {t("storyTitle")}
      </h2>

      <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink/75">{body}</p>

      {blurb?.trim() && modelsLine ? (
        <p className="mt-2 text-sm font-medium text-navy/50">{modelsLine}</p>
      ) : null}

      {highlights && highlights.length > 0 ? (
        <ul className="mt-6 max-w-prose space-y-3">
          {highlights.slice(0, 3).map((line) => (
            <li
              key={line}
              className="flex gap-3 text-base leading-snug text-ink/80"
            >
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow"
                aria-hidden
              />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {idealFor ? (
        <p className="mt-6 inline-flex max-w-prose items-start gap-2 border-l-4 border-yellow bg-sand/80 px-4 py-3 text-base text-ink/80">
          <span className="font-bold text-navy">{tr("idealFor")}:</span>
          <span>{idealFor}</span>
        </p>
      ) : null}

      {licence ? (
        <p className="mt-5 max-w-prose text-sm leading-relaxed text-navy/60">
          <span className="font-bold text-navy">{t("license")}: </span>
          {licence}
        </p>
      ) : null}

      <div className="mt-10 flex gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-yellow text-navy">
          <MapPin className="h-5 w-5" strokeWidth={2} aria-hidden />
        </span>
        <div>
          <h3 className="font-display text-lg font-bold text-navy">
            {t("pickupOptions")}
          </h3>
          <p className="mt-1.5 max-w-prose text-sm leading-relaxed text-ink/70">
            {t("pickupOptionsBody")}
          </p>
        </div>
      </div>
    </section>
  );
}
