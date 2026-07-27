import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ReactNode } from "react";

/** Strip common WP chrome leftovers from Firecrawl markdown */
export function cleanScrapedMarkdown(md: string): string {
  if (!md) return "";
  let text = md;

  // Cookie / CMPL banners (multi-locale)
  const cookieMarkers = [
    "We use cookies",
    "Χρησιμοποιούμε cookies",
    "Nous utilisons des cookies",
    "Utilizamos cookies",
    "Wir verwenden Cookies",
    "Utilizziamo i cookie",
    "We gebruiken cookies",
    "Vi använder cookies",
    "Usamos cookies",
    "Мы используем файлы cookie",
    "Çerezleri",
    "Accept all",
    "Cookie settings",
    "cmplz-",
  ];
  if (cookieMarkers.some((m) => text.slice(0, 1200).includes(m))) {
    const h1 = text.search(/^#\s+/m);
    const h2 = text.search(/^##\s+/m);
    const cut = h1 >= 0 ? h1 : h2;
    if (cut >= 0) text = text.slice(cut);
  }

  // WP / TranslatePress archive chrome
  text = text
    .replace(/<trp-post-container[^>]*>/gi, "")
    .replace(/<\/trp-post-container>/gi, "")
    .replace(/data-trp-post-id='[^']*'/gi, "");

  // Drop leading H1 — page hero already shows the title
  text = text.replace(/^#\s+[^\n]+\n+/, "");

  // Phone / address chrome often prepended after cookie strip
  const junkLead = text.match(
    /^(\[+?\d[\d\s]+\]\(tel:[^)]+\)\s*)+(\[[^\]]+\]\(https?:\/\/g\.co[^)]+\)\s*)?/m,
  );
  if (junkLead && junkLead.index !== undefined && junkLead.index < 80) {
    text = text.slice(junkLead.index + junkLead[0].length);
  }

  const h1 = text.search(/^#\s+/m);
  if (h1 > 800) text = text.slice(h1);

  return text.trim();
}

function isCtaBlockquote(children: ReactNode): boolean {
  const flat = flattenText(children).toLowerCase();
  return (
    flat.includes("book") ||
    flat.includes("rent") ||
    flat.includes("check availability") ||
    flat.includes("whatsapp") ||
    flat.includes("cta") ||
    flat.includes("reserve") ||
    flat.includes("ready to")
  );
}

function flattenText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(flattenText).join("");
  if (typeof node === "object" && "props" in node) {
    const props = (node as { props?: { children?: ReactNode } }).props;
    return flattenText(props?.children);
  }
  return "";
}

function isCtaLinkLabel(label: string): boolean {
  const t = label.toLowerCase();
  return (
    t.includes("book") ||
    t.includes("check availability") ||
    t.includes("whatsapp") ||
    t.includes("call") ||
    t.includes("→") ||
    t.includes("rent a") ||
    t.includes("browse fleet")
  );
}

export default function MarkdownBody({
  markdown,
  className = "",
  dropLeadingH1 = true,
}: {
  markdown: string;
  className?: string;
  dropLeadingH1?: boolean;
}) {
  let content = cleanScrapedMarkdown(markdown);
  if (!dropLeadingH1) {
    // restore not needed — clean always drops; bodies shouldn't rely on H1
  }
  if (!content) {
    return (
      <p className="text-ink/70">Content is being prepared for this page.</p>
    );
  }

  return (
    <div className={`prose-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => {
            const isInternal =
              href?.startsWith("/") ||
              href?.includes("antiparosrentacar.com") ||
              href?.startsWith("#");
            let finalHref = href || "#";
            if (href?.includes("antiparosrentacar.com")) {
              try {
                const u = new URL(href);
                finalHref = u.pathname.endsWith("/")
                  ? u.pathname
                  : `${u.pathname}/`;
              } catch {
                /* keep */
              }
            }
            const label = flattenText(children);
            if (isCtaLinkLabel(label) && isInternal) {
              return (
                <a
                  href={finalHref}
                  className="btn-yellow mr-2 mb-2 inline-flex text-sm no-underline"
                >
                  {children}
                </a>
              );
            }
            return (
              <a
                href={finalHref}
                className="font-semibold text-navy underline decoration-yellow decoration-2 underline-offset-2 hover:text-navy-panel"
                {...(isInternal || href?.startsWith("tel:")
                  ? {}
                  : { target: "_blank", rel: "noopener noreferrer" })}
              >
                {children}
              </a>
            );
          },
          img: ({ src, alt }) => (
            <figure className="my-8 -mx-1 overflow-hidden sm:mx-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={typeof src === "string" ? src : ""}
                alt={alt || ""}
                className="h-auto w-full object-cover sm:max-h-[28rem]"
                loading="lazy"
              />
              {alt ? (
                <figcaption className="mt-2 text-center text-sm text-ink/55">
                  {alt}
                </figcaption>
              ) : null}
            </figure>
          ),
          h1: ({ children }) => (
            <h1 className="mb-6 font-display text-3xl font-extrabold text-navy sm:text-4xl">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mt-12 mb-4 border-b border-navy/10 pb-3 font-display text-2xl font-bold text-navy">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-8 mb-3 text-xl font-bold text-navy">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="mb-4 text-base leading-relaxed text-ink/80">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="mb-4 list-disc space-y-2 pl-5 text-ink/80">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-4 list-decimal space-y-2 pl-5 text-ink/80">
              {children}
            </ol>
          ),
          blockquote: ({ children }) => {
            if (isCtaBlockquote(children)) {
              return (
                <aside className="my-8 border border-navy/10 bg-navy px-6 py-6 text-foam not-italic sm:px-8">
                  <div className="[&_a]:!text-navy [&_a.btn-yellow]:!no-underline [&_p]:mb-3 [&_p]:text-foam/85 [&_p:last-child]:mb-0 [&_strong]:text-yellow">
                    {children}
                  </div>
                </aside>
              );
            }
            return (
              <blockquote className="my-6 border-l-4 border-yellow pl-4 text-ink/75 italic">
                {children}
              </blockquote>
            );
          },
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto">
              <table className="min-w-full border-collapse text-sm">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-navy/15 bg-navy px-3 py-2 text-left text-white">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-navy/10 px-3 py-2">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
