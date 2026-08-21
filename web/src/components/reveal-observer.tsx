"use client";

import { useEffect } from "react";

/**
 * Reveals `[data-reveal]` elements as they scroll into view, for the whole site.
 *
 * Mounted once in the root layout so that marking something up for a reveal
 * stays a pure styling decision — a server component adds the attribute and
 * nothing about it becomes a client component. Elements are watched through a
 * `MutationObserver` as well as an initial sweep, so nodes that arrive later
 * (a route change, `/work`'s industry filter re-rendering its list) animate in
 * on the same terms as the first paint.
 */
export function RevealObserver() {
  useEffect(() => {
    const reveal = (element: Element) => element.setAttribute("data-revealed", "");

    // The hidden resting state is disabled in CSS under `prefers-reduced-motion`,
    // so here we only need to skip the observation work entirely.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll("[data-reveal]").forEach(reveal);
      return;
    }

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          // One-shot: nothing re-hides on the way back up.
          intersectionObserver.unobserve(entry.target);
        }
      },
      /* No bottom inset, and a zero threshold.
     
         Holding the root back from the bottom edge makes elements animate as
         they clear the fold rather than the instant their first pixel appears,
         which looks better — but anything sitting inside that excluded band
         when the page is scrolled all the way down can never satisfy it. The
         footer lives there permanently, so it stayed at opacity 0 forever.
     
         A fractional threshold has the same failure mode from the other end:
         an element taller than the root can never expose that fraction of
         itself. Both are traded away for content that always arrives. */
      { rootMargin: "0px", threshold: 0 },
    );

    const observe = (root: ParentNode) => {
      for (const element of root.querySelectorAll("[data-reveal]:not([data-revealed])")) {
        intersectionObserver.observe(element);
      }
    };

    observe(document);

    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (!(node instanceof Element)) continue;
          if (node.matches("[data-reveal]:not([data-revealed])"))
            intersectionObserver.observe(node);
          observe(node);
        }
      }
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
