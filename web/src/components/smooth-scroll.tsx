"use client";

import { useEffect } from "react";

const SCROLL_EASE = 0.12;
// Anchor jumps cover far more ground than a wheel flick, so they ease in more
// gently — at the wheel's rate the whole trip is over before you can follow it.
const ANCHOR_SCROLL_EASE = 0.05;
const STOP_THRESHOLD = 0.5;
const MAX_DELTA = 120;
const LINE_HEIGHT = 16;

function isScrollable(element: Element) {
  const { overflowY } = window.getComputedStyle(element);
  if (overflowY !== "auto" && overflowY !== "scroll") return false;
  return element.scrollHeight > element.clientHeight;
}

// Walks up from the wheel target to <body>, looking for a scroll container that
// should keep its own native scrolling instead of handing it to the animator.
function hasScrollableAncestor(target: EventTarget | null) {
  let node =
    target instanceof Element ? target : target instanceof Node ? target.parentElement : null;

  while (node && node !== document.body) {
    if (isScrollable(node)) return true;
    node = node.parentElement;
  }

  return false;
}

/**
 * How far above the destination to stop, read from its own `scroll-margin-top`.
 *
 * The header is sticky, so an anchor scrolled flush to the viewport top lands
 * underneath it. Native `scrollIntoView` accounts for that automatically; this
 * animator does its own arithmetic, so it has to honour the same property — and
 * honouring the property rather than measuring the header keeps the offset a
 * styling decision (`scroll-mt-24` on the sections that already carry it).
 */
function scrollMarginTop(element: Element) {
  const value = Number.parseFloat(window.getComputedStyle(element).scrollMarginTop);

  return Number.isFinite(value) ? value : 0;
}

function maxScrollY() {
  return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
}

export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Read per-interaction rather than once, so toggling the OS setting takes
    // effect without a reload.
    const prefersReducedMotion = () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let targetY = window.scrollY;
    let currentY = window.scrollY;
    let rafId: number | null = null;
    let ease = SCROLL_EASE;

    const step = () => {
      const distance = targetY - currentY;

      if (Math.abs(distance) <= STOP_THRESHOLD) {
        currentY = targetY;
        window.scrollTo({ top: currentY, behavior: "auto" });
        rafId = null;
        return;
      }

      currentY += distance * ease;
      window.scrollTo({ top: currentY, behavior: "auto" });
      rafId = requestAnimationFrame(step);
    };

    const start = () => {
      // Re-seed from the live position so we ease from where the page actually is.
      currentY = window.scrollY;
      if (rafId === null) rafId = requestAnimationFrame(step);
    };

    // Hands a destination to the same animator the wheel uses, just at a gentler
    // rate. A wheel event mid-flight then retargets the animation, where native
    // `scrollIntoView({ behavior: "smooth" })` would have fought it.
    const scrollTo = (y: number) => {
      const clamped = Math.max(0, Math.min(maxScrollY(), y));

      if (prefersReducedMotion()) {
        targetY = clamped;
        currentY = clamped;
        window.scrollTo({ top: clamped, behavior: "auto" });
        return;
      }

      targetY = clamped;
      ease = ANCHOR_SCROLL_EASE;
      start();
    };

    const onWheel = (event: WheelEvent) => {
      if (prefersReducedMotion()) return;
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (hasScrollableAncestor(event.target)) return;

      let delta = event.deltaY;
      if (event.deltaMode === 1) delta *= LINE_HEIGHT;
      else if (event.deltaMode === 2) delta *= window.innerHeight;
      delta = Math.max(-MAX_DELTA, Math.min(MAX_DELTA, delta));

      if (delta === 0) return;

      event.preventDefault();
      targetY = Math.max(0, Math.min(maxScrollY(), targetY + delta));
      // A wheel flick mid-anchor-jump hands the animation back to the faster
      // rate, so the page keeps up with the gesture.
      ease = SCROLL_EASE;
      start();
    };

    // Keyboard, scrollbar drags and programmatic scrolls own the position
    // whenever we aren't mid-animation.
    const onScroll = () => {
      if (rafId !== null) return;
      targetY = window.scrollY;
      currentY = window.scrollY;
    };

    const onClick = (event: MouseEvent) => {
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target instanceof Element ? event.target : null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href*="#"]');
      if (!anchor || anchor.target === "_blank") return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      if (href === "#") {
        event.preventDefault();
        scrollTo(0);
        history.pushState(null, "", "#");
        return;
      }

      // Links written as `/#contact` are smooth-scrolled only while we're
      // already on that page; from anywhere else they navigate as usual and
      // the router handles landing on the hash.
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname !== window.location.pathname) return;
      if (!url.hash || url.hash === "#") return;

      const id = decodeURIComponent(url.hash.slice(1));
      const escaped = typeof CSS !== "undefined" && CSS.escape ? CSS.escape(id) : id;
      const destination =
        document.getElementById(id) ?? document.querySelector(`[name="${escaped}"]`);
      if (!destination) return;

      event.preventDefault();
      scrollTo(
        window.scrollY + destination.getBoundingClientRect().top - scrollMarginTop(destination),
      );
      history.pushState(null, "", href);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick, true);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick, true);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
