"use client";

import { useEffect, useRef } from "react";

import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";
import type { SanityImageValue } from "@/components/sanity-image";

/** Reading speed, in px/s. Slow enough to take a screenshot in as it passes. */
const REVEAL_SPEED = 90;
/** Rewinding isn't reading, so it snaps back faster. */
const RETURN_SPEED = 260;
const MIN_DURATION = 600;
const MAX_DURATION = 9000;

/** The viewing window's proportions, straight from the Figma comparison panel. */
const WINDOW_RATIO = 1085 / 750;
const IMAGE_WIDTH = 1200;

/**
 * Pulls the asset out of a bare image or a `projectImage` wrapper. Mirrors
 * `sanity-image.tsx`, but this component builds its own URL: `SanityImage`
 * always applies `fit("crop")`, and Sanity caps rendered output at 8192px, so a
 * full-page screenshot asked for by height comes back with its middle sliced
 * out. Asking by width alone returns the whole image, scaled to fit the cap.
 */
function unwrap(value: SanityImageValue | null | undefined) {
  if (!value || typeof value !== "object") return null;

  const source = "image" in value && value.image ? value.image : value;
  if (!source || typeof source !== "object" || !("asset" in source) || !source.asset) return null;

  return { source, alt: ("alt" in value ? value.alt : undefined) ?? "" };
}

export type ImageDimensions = { width: number | null; height: number | null } | null;

/**
 * A fixed-ratio window onto an image that may be far taller than it — a full
 * page screenshot, typically. Hovering scrolls the rest of the shot into view
 * and leaving rewinds it.
 *
 * The reveal is a transform inside an `overflow-hidden` box rather than a real
 * scroll container on purpose: `smooth-scroll.tsx` hands wheel events to any
 * scrollable ancestor, so a scrolling panel here would swallow the page scroll
 * and trap the reader mid-article.
 */
export function RevealImage({
  value,
  dimensions,
  sizes,
}: {
  value: SanityImageValue | null | undefined;
  dimensions: ImageDimensions;
  sizes?: string;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    // Read per-interaction rather than once, so toggling the OS setting takes
    // effect without a reload.
    const prefersReducedMotion = () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let overflow = 0;
    let offset = 0;
    let from = 0;
    let to = 0;
    let duration = 0;
    let startedAt = 0;
    let rafId: number | null = null;

    const apply = () => {
      track.style.transform = `translate3d(0, ${-offset}px, 0)`;
    };

    const step = (now: number) => {
      const progress = duration <= 0 ? 1 : Math.min(1, (now - startedAt) / duration);
      // easeInOutSine — keeps both ends of the travel from snapping.
      const eased = 0.5 - Math.cos(Math.PI * progress) / 2;

      offset = from + (to - from) * eased;
      apply();

      rafId = progress < 1 ? requestAnimationFrame(step) : null;
    };

    // Duration follows distance, so a 6000px screenshot doesn't fly past at the
    // same pace a 1200px one crawls.
    const animateTo = (target: number, speed: number) => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }

      if (prefersReducedMotion()) {
        offset = target;
        apply();
        return;
      }

      from = offset;
      to = target;
      duration = Math.min(
        MAX_DURATION,
        Math.max(MIN_DURATION, (Math.abs(to - from) / speed) * 1000),
      );
      startedAt = performance.now();
      rafId = requestAnimationFrame(step);
    };

    // Screenshots reflow with the viewport, so the travel distance is re-read
    // rather than captured once.
    const measure = () => {
      overflow = Math.max(0, track.offsetHeight - viewport.clientHeight);

      if (offset > overflow) {
        offset = overflow;
        apply();
      }
    };

    measure();

    const reveal = () => {
      if (overflow > 0) animateTo(overflow, REVEAL_SPEED);
    };
    const rewind = () => {
      if (offset !== 0) animateTo(0, RETURN_SPEED);
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(viewport);
    resizeObserver.observe(track);

    let intersectionObserver: IntersectionObserver | null = null;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (canHover) {
      viewport.addEventListener("pointerenter", reveal);
      viewport.addEventListener("pointerleave", rewind);
    } else {
      // Touch has no hover, so the reveal plays once the panel settles into view.
      intersectionObserver = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? reveal() : rewind()),
        { threshold: 0.6 },
      );
      intersectionObserver.observe(viewport);
    }

    return () => {
      resizeObserver.disconnect();
      intersectionObserver?.disconnect();
      viewport.removeEventListener("pointerenter", reveal);
      viewport.removeEventListener("pointerleave", rewind);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const resolved = unwrap(value);
  if (!resolved) return null;

  /* Without asset metadata there's no way to know the real proportions, so the
     image falls back to filling the window exactly, as a normal crop would.
     These numbers only set the intrinsic ratio — Sanity may return a smaller
     render for very long shots, but at the same ratio. */
  const height =
    dimensions?.width && dimensions?.height
      ? Math.round((IMAGE_WIDTH * dimensions.height) / dimensions.width)
      : Math.round(IMAGE_WIDTH / WINDOW_RATIO);

  /* `cursor-ns-resize` and the warming border advertise the hover reveal
     before the pointer commits to it. */
  return (
    <div
      ref={viewportRef}
      className="relative aspect-[1085/750] w-full overflow-hidden rounded-[4px] border border-sand/60 bg-soft-beige transition-[border-color,box-shadow] duration-300 ease-soft hover:border-warm-gray hover:shadow-[0_18px_36px_-24px_rgba(38,31,26,0.45)] hover:cursor-ns-resize"
    >
      <div ref={trackRef} className="absolute inset-x-0 top-0 will-change-transform">
        <Image
          src={urlFor(resolved.source).width(IMAGE_WIDTH).auto("format").url()}
          alt={resolved.alt}
          width={IMAGE_WIDTH}
          height={height}
          className="w-full"
          sizes={sizes}
        />
      </div>
    </div>
  );
}
