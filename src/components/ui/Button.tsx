import type { ComponentPropsWithoutRef, ReactNode } from "react";

/**
 * The CTA primitive.
 *
 * Replaces the `.btn-yellow` / `.btn-navy` / `.btn-ghost-light` CSS classes.
 * Those hardcoded padding and radius while nearly every call site immediately
 * overrode them (`btn-yellow w-full`, `btn-yellow flex-1 py-3 text-sm`), which
 * is the signal the class was the wrong abstraction. A component is also the
 * only way to guarantee the focus ring and the 44px minimum tap target that
 * were missing everywhere — every btn-* was an <a>, and preflight strips the
 * UA outline.
 *
 * No hooks, so it is importable from both server and client components.
 */

export type ButtonVariant =
  "yellow" | "navy" | "ghost" | "outline" | "whatsapp";
export type ButtonSize = "sm" | "md" | "lg";

const VARIANT: Record<ButtonVariant, string> = {
  yellow:
    "bg-yellow text-navy hover:bg-yellow-hover shadow-sm hover:shadow-md hover:-translate-y-0.5",
  navy: "bg-navy text-white hover:bg-navy-panel shadow-sm hover:shadow-md hover:-translate-y-0.5",
  // For dark/photographic backgrounds.
  ghost:
    "border border-white/45 text-white backdrop-blur-sm hover:bg-white/12 hover:border-white/70",
  outline:
    "border border-navy/20 text-navy bg-white hover:border-navy/50 hover:bg-navy/[0.03]",
  whatsapp:
    "bg-[#25D366] text-white hover:brightness-95 shadow-sm hover:shadow-md",
};

const SIZE: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 py-2 text-sm gap-1.5",
  md: "min-h-11 px-6 py-3 text-base gap-2",
  lg: "min-h-13 px-8 py-4 text-lg gap-2.5",
};

const BASE =
  "inline-flex items-center justify-center rounded-sm font-bold tracking-tight " +
  "transition-[background,transform,box-shadow,border-color] duration-200 " +
  "disabled:pointer-events-none disabled:opacity-55 " +
  // Layout-neutral so `w-full`, `flex-1` etc. from the call site still win.
  "select-none";

type Common = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  full?: boolean;
  children: ReactNode;
  className?: string;
};

type AnchorProps = Common & ComponentPropsWithoutRef<"a"> & { href: string };
type NativeProps = Common &
  ComponentPropsWithoutRef<"button"> & { href?: never };

function classes({
  variant = "yellow",
  size = "md",
  full,
  className = "",
}: Common) {
  return [BASE, VARIANT[variant], SIZE[size], full ? "w-full" : "", className]
    .filter(Boolean)
    .join(" ");
}

export default function Button(props: AnchorProps | NativeProps) {
  const { variant, size, full, className, children, ...rest } =
    props as Common & Record<string, unknown>;
  const cls = classes({ variant, size, full, className, children });

  if (typeof (props as AnchorProps).href === "string") {
    const { href, ...anchorRest } = rest as ComponentPropsWithoutRef<"a"> & {
      href: string;
    };
    const external =
      /^https?:\/\//.test(href) ||
      href.startsWith("tel:") ||
      href.startsWith("mailto:");
    return (
      <a
        href={href}
        className={cls}
        {...(external && /^https?:\/\//.test(href)
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...anchorRest}
      >
        {children}
      </a>
    );
  }

  const buttonRest = rest as ComponentPropsWithoutRef<"button">;
  return (
    <button type={buttonRest.type ?? "button"} className={cls} {...buttonRest}>
      {children}
    </button>
  );
}
