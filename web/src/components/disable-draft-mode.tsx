"use client";

import { useVisualEditingEnvironment } from "next-sanity/hooks";

export function DisableDraftMode() {
  const environment = useVisualEditingEnvironment();

  // Inside the Presentation tool the Studio owns draft mode, so only show this
  // when the page is being viewed on its own.
  if (environment !== "standalone") return null;

  return (
    <a
      href="/api/draft-mode/disable"
      className="fixed bottom-4 right-4 z-50 rounded-full bg-espresso px-4 py-2 text-sm font-medium text-cream"
    >
      Disable draft mode
    </a>
  );
}
