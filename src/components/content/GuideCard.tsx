import Image from "next/image";
import { Clock } from "lucide-react";

export type GuideCategory = "getting-around" | "islands" | "tips" | "seasonal";

const CATEGORY_LABEL: Record<GuideCategory, string> = {
  "getting-around": "Getting around",
  islands: "Islands",
  tips: "Travel tips",
  seasonal: "Seasonal",
};

export default function GuideCard({
  href,
  title,
  description,
  image,
  category,
  typeLabel,
  minutes,
  featured = false,
  className = "",
}: {
  href: string;
  title: string;
  description: string;
  image: string;
  category: GuideCategory;
  typeLabel: string;
  minutes?: number;
  featured?: boolean;
  className?: string;
}) {
  const img = image.startsWith("http")
    ? "/media/2026/06/paros-naoussa-village.png.webp"
    : image;

  return (
    <a
      href={href}
      className={`group relative flex h-full flex-col overflow-hidden bg-navy text-foam transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
        featured ? "min-h-[22rem] sm:min-h-[26rem]" : "min-h-[18rem]"
      } ${className}`}
    >
      <div className="absolute inset-0">
        <Image
          src={img}
          alt=""
          fill
          sizes={
            featured
              ? "(max-width: 768px) 100vw, 50vw"
              : "(max-width: 768px) 100vw, 33vw"
          }
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/15"
        />
      </div>

      <div className="relative z-10 mt-auto flex flex-col p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em]">
          <span className="rounded-sm bg-yellow px-2 py-0.5 text-navy">
            {CATEGORY_LABEL[category]}
          </span>
          <span className="text-foam/70">{typeLabel}</span>
          {minutes ? (
            <span className="inline-flex items-center gap-1 text-foam/55">
              <Clock className="h-3 w-3" aria-hidden />
              {minutes} min
            </span>
          ) : null}
        </div>
        <h2
          className={`font-display font-extrabold leading-tight text-foam ${
            featured ? "text-2xl sm:text-3xl" : "text-xl"
          }`}
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-2 line-clamp-2 text-sm text-foam/75 sm:line-clamp-3">
            {description}
          </p>
        ) : null}
        <span className="mt-4 text-sm font-bold text-yellow transition group-hover:translate-x-1">
          Read guide →
        </span>
      </div>
    </a>
  );
}
