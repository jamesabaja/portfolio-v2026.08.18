import Link from "next/link";
import { connection } from "next/server";

import { buttonVariants } from "@/components/ui/button";
import { stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { randomMusicalQuote } from "@/lib/musical-quotes";

export default async function NotFound() {
  // Opt out of prerendering so the quote is drawn per request rather than
  // baked in at build time — otherwise every visitor sees the same line.
  await connection();
  const quote = randomMusicalQuote();

  return (
    <main className="flex w-full flex-1 flex-col items-center justify-center gap-8 overflow-hidden px-6 py-24 text-center sm:px-10 lg:px-20 lg:py-40">
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <p
          data-reveal
          style={stagger(0)}
          className="text-xs leading-4 font-medium tracking-eyebrow text-warm-gray uppercase"
        >
          404
        </p>
        <h1
          data-reveal
          style={stagger(1)}
          className="font-serif text-4xl leading-none font-medium text-espresso sm:text-5xl"
        >
          This page could not be found.
        </h1>
        <div
          data-reveal
          style={stagger(2)}
          className="flex flex-col items-center gap-1 text-base leading-6 italic text-espresso"
        >
          <p>&ldquo;{quote.line}&rdquo;</p>
          <p>{quote.source}</p>
        </div>
      </div>

      <Link
        href="/"
        data-reveal
        style={stagger(3)}
        className={cn(buttonVariants({ variant: "primary" }), "nudge-left uppercase")}
      >
        Back to home
      </Link>
    </main>
  );
}
