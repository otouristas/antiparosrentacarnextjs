"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";

type MegaPanelProps = {
  id: string;
  open: boolean;
  label: string;
  onClose: () => void;
  /** Keep open while pointer is over the panel (hover bridge from trigger). */
  onPointerEnter: () => void;
  onPointerLeave: () => void;
  children: ReactNode;
  /** Optional footer strip (Book CTA). */
  footer?: ReactNode;
};

/**
 * Full-bleed mega panel under the sticky header.
 * Escape / backdrop click close; focus moves in on open when triggered by keyboard.
 */
export default function MegaPanel({
  id,
  open,
  label,
  onClose,
  onPointerEnter,
  onPointerLeave,
  children,
  footer,
}: MegaPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        previouslyFocused.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open || !panelRef.current) return;
    const first = panelRef.current.querySelector<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    // Only steal focus when the open came from keyboard (activeElement is the trigger button)
    if (
      document.activeElement instanceof HTMLButtonElement &&
      document.activeElement.getAttribute("aria-controls") === id
    ) {
      first?.focus();
    }
  }, [open, id]);

  if (!open) return null;

  return (
    <>
      <div
        className="absolute inset-x-0 top-full z-40 h-[100dvh] bg-navy-deep/30 backdrop-blur-[2px] motion-safe:animate-[fade-in_0.18s_var(--ease-out-soft)]"
        aria-hidden
        onClick={onClose}
      />
      <div
        ref={panelRef}
        id={id}
        role="region"
        aria-label={label}
        onMouseEnter={onPointerEnter}
        onMouseLeave={onPointerLeave}
        className="absolute left-0 right-0 top-full z-50 max-h-[min(80dvh,44rem)] overflow-y-auto border-b border-line bg-sand shadow-lg motion-safe:animate-[mega-panel-in_0.2s_var(--ease-out-soft)] motion-reduce:animate-none"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_12%_0%,rgb(249_229_39/0.14),transparent_42%),radial-gradient(ellipse_at_100%_80%,rgb(17_37_83/0.05),transparent_50%)]"
        />
        <div className="relative mx-auto max-w-page px-4 py-5 sm:px-6 sm:py-6">
          {children}
        </div>
        {footer ? (
          <div className="relative sticky bottom-0 z-10 border-t border-line bg-white/95 backdrop-blur-sm">
            <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
              {footer}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

/** Hover-intent helpers for navbar triggers + panel bridge. */
export function useMegaHoverBridge(
  setOpen: (open: boolean) => void,
  openDelay = 80,
  closeDelay = 160,
) {
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    openTimer.current = null;
    closeTimer.current = null;
  }, []);

  const scheduleOpen = useCallback(() => {
    clearTimers();
    openTimer.current = setTimeout(() => setOpen(true), openDelay);
  }, [clearTimers, openDelay, setOpen]);

  const scheduleClose = useCallback(() => {
    clearTimers();
    closeTimer.current = setTimeout(() => setOpen(false), closeDelay);
  }, [clearTimers, closeDelay, setOpen]);

  const openNow = useCallback(() => {
    clearTimers();
    setOpen(true);
  }, [clearTimers, setOpen]);

  const closeNow = useCallback(() => {
    clearTimers();
    setOpen(false);
  }, [clearTimers, setOpen]);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  return {
    scheduleOpen,
    scheduleClose,
    openNow,
    closeNow,
    cancelClose,
    clearTimers,
  };
}
