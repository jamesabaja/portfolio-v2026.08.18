import type { Metadata } from "next";
import { Hanken_Grotesk, Newsreader } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";

import { DisableDraftMode } from "@/components/disable-draft-mode";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { RevealObserver } from "@/components/reveal-observer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SanityLive } from "@/sanity/lib/live";
import "./globals.css";
import { cn } from "@/lib/utils";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: { default: "James Abaja", template: "%s · James Abaja" },
  description: "Selected work.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    /* The inline script below adds a class to this element before React
       hydrates, which React would otherwise report as a className mismatch —
       it compares what it rendered against what is in the DOM. Suppressing is
       the intended escape hatch for exactly this (it applies to this element's
       own attributes only, not to anything nested inside it). */
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full antialiased", hankenGrotesk.variable, newsreader.variable, "font-sans")}
    >
      <head>
        {/* Marks the document as scripted before first paint. The scroll-reveal
            styles hang off this class, so if the bundle never arrives the page
            renders fully visible instead of holding everything at opacity 0.
            It has to run here rather than in an effect: by the time an effect
            fires, the un-revealed content would already have painted. */}
        <script
          dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add("js")` }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <SmoothScroll />
        <RevealObserver />
        <Navbar />
        {children}
        <Footer />
        <SanityLive />
        {isDraftMode && (
          <>
            <DisableDraftMode />
            <VisualEditing />
          </>
        )}
      </body>
    </html>
  );
}
