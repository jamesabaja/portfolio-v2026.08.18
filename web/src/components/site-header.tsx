"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/** How far down the page the header switches to its condensed, floating state. */
const SCROLLED_THRESHOLD = 24;

/**
 * The header's behaviour, split out from `navbar.tsx` so the nav itself stays a
 * server component.
 *
 * Two things happen here. The bar sticks to the top of the viewport and, once
 * the page has moved at all, blurs whatever passes beneath it and lifts onto a
 * soft shadow — the page reads as sliding under a fixed surface rather than the
 * header scrolling away. And a terracotta rule along its bottom edge tracks
 * reading progress, which is where the section anchors' existing `scroll-mt-24`
 * was already reserving room for a pinned bar.
 */
export function SiteHeader({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame: number | null = null;

    const measure = () => {
      frame = null;

      const scrolled = window.scrollY;
      setIsScrolled(scrolled > SCROLLED_THRESHOLD);

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      // A page shorter than the viewport has no progress to report — leave the
      // rule empty rather than showing it permanently complete.
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, scrolled / scrollable)) : 0;

      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
    };

    // Coalesced into a frame: `smooth-scroll.tsx` drives the page with its own
    // rAF loop, so scroll events arrive at up to one per frame already.
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      data-scrolled={isScrolled || undefined}
      className={cn(
        "sticky top-0 z-30 w-full border-b border-sand",
        "bg-background transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-soft",
        "data-scrolled:bg-background/85 data-scrolled:shadow-[0_8px_24px_-16px_rgba(38,31,26,0.5)]",
        "data-scrolled:backdrop-blur-md data-scrolled:supports-[backdrop-filter]:bg-background/75",
      )}
    >
      <div className="flex w-full items-center justify-between gap-6 px-6 py-6 sm:px-10 lg:px-20">
        {children}
      </div>

      {/* Sits on the border itself, so an unscrolled page shows a plain hairline. */}
      <div
        aria-hidden
        ref={progressRef}
        className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-burnt-terracotta"
      />
    </header>
  );
}
