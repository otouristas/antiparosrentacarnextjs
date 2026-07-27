import JsonLd from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/schema";

export type FaqItem = { q: string; a: string };

export default function FaqAccordion({
  title,
  faqs,
  withSchema = true,
}: {
  title: string;
  faqs: FaqItem[];
  withSchema?: boolean;
}) {
  if (!faqs.length) return null;

  return (
    <section className="section-band border-t border-navy/8 bg-white">
      {withSchema && <JsonLd data={faqSchema(faqs)} />}
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-2xl font-extrabold text-navy sm:text-3xl">
          {title}
        </h2>
        <div className="mt-8 space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-xl border border-navy/8 bg-brand-light px-4 py-3 open:bg-white open:shadow-sm"
            >
              <summary className="cursor-pointer list-none font-bold text-navy marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-3">
                  {f.q}
                  <span className="text-navy/40 transition group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink/75">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
