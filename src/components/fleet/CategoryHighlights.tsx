import { Compass, IdCard, Scale } from "lucide-react";

type Highlight = {
  label: string;
  body: string;
  icon: "bestFor" | "license" | "compare";
};

const ICONS = {
  bestFor: Compass,
  license: IdCard,
  compare: Scale,
} as const;

/**
 * Editorial decision aids for a fleet category: best-for, licence, compare.
 * Intentionally not cards — numbered columns with a yellow accent rail.
 */
export default function CategoryHighlights({
  items,
  eyebrow = "Before you book",
}: {
  items: Highlight[];
  eyebrow?: string;
}) {
  return (
    <div className="mb-12 sm:mb-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-navy/45">
        {eyebrow}
      </p>

      <ul className="mt-6 grid border-y border-navy/10 sm:grid-cols-3 sm:divide-x sm:divide-navy/10">
        {items.map((item, i) => {
          const Icon = ICONS[item.icon];
          const marker = String(i + 1).padStart(2, "0");
          return (
            <li
              key={item.label}
              className="group relative border-b border-navy/10 last:border-b-0 sm:border-b-0 animate-fade-up"
              style={{ animationDelay: `${Math.min(i, 4) * 70}ms` }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-3 left-0 w-1 origin-center scale-y-0 bg-yellow transition-transform duration-400 ease-out group-hover:scale-y-100"
              />

              <div className="flex items-start gap-4 px-1 py-7 pl-4 transition-[padding] duration-300 group-hover:pl-5 sm:px-6 sm:py-9 sm:group-hover:px-7">
                <span
                  aria-hidden
                  className="font-display text-3xl font-extrabold leading-none tracking-tight text-yellow sm:text-4xl"
                >
                  {marker}
                </span>

                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-navy/12 bg-white text-navy transition-all duration-300 group-hover:border-yellow group-hover:bg-yellow group-hover:shadow-sm">
                      <Icon
                        className="h-4 w-4"
                        strokeWidth={1.75}
                        aria-hidden
                      />
                    </span>
                    <h2 className="font-display text-lg font-extrabold text-navy sm:text-xl">
                      {item.label}
                    </h2>
                  </div>
                  <p className="mt-3 max-w-sm text-base leading-relaxed text-ink/70">
                    {item.body}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
