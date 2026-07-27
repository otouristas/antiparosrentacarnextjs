import { formatReviewDate, type SiteReview } from "@/data/reviews";
import { GoogleGMark, StarRow } from "./ReviewMarks";

const AVATAR_COLORS = [
  "#EA4335",
  "#4285F4",
  "#FBBC05",
  "#34A853",
  "#FF6D01",
  "#46BDC6",
  "#7B61FF",
];

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("") || "G";
}

function avatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = (hash + name.charCodeAt(i) * (i + 1)) % 997;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

export default function ReviewCard({
  review,
  locale = "en",
  caption,
}: {
  review: SiteReview;
  locale?: string;
  caption?: string;
}) {
  const color = avatarColor(review.author);

  return (
    <article className="flex h-full flex-col rounded-2xl border border-[#dadce0] bg-white p-5 shadow-[0_1px_2px_rgba(60,64,67,0.08),0_1px_3px_1px_rgba(60,64,67,0.06)] transition-shadow hover:shadow-[0_1px_3px_rgba(60,64,67,0.12),0_4px_8px_3px_rgba(60,64,67,0.08)] sm:p-6">
      <header className="flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-medium text-white"
          style={{ backgroundColor: color }}
          aria-hidden
        >
          {initials(review.author)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-medium leading-snug text-[#202124]">
            {review.author}
          </p>
          <div className="mt-0.5 flex items-center gap-1.5 text-xs text-[#70757a]">
            <GoogleGMark className="h-3 w-3" />
            <time dateTime={review.date}>
              {formatReviewDate(review.date, locale)}
            </time>
          </div>
        </div>
      </header>

      <div className="mt-3 flex items-center gap-2">
        <StarRow rating={review.rating} size="sm" />
        {caption ? (
          <span className="truncate text-xs font-medium text-[#70757a]">
            {caption}
          </span>
        ) : null}
      </div>

      {review.text ? (
        <p className="mt-3 flex-1 text-[14px] leading-[1.55] text-[#3c4043] whitespace-pre-line">
          {review.text}
        </p>
      ) : null}
    </article>
  );
}
