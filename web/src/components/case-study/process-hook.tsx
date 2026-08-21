import { ArrowDownIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Hook = {
  enabled: boolean | null;
  title: string | null;
  subtitle: string | null;
  ctaLabel: string | null;
} | null;

/* Enabling the hook is the only required editorial act; the copy falls back to
   the wording from the design when a field is left blank. */
const DEFAULT_TITLE = "Want to see the thinking behind the outcome?";
const DEFAULT_SUBTITLE =
  "Jump ahead to the research and product decisions that shaped the final experience.";
const DEFAULT_CTA_LABEL = "Skip to discovery & decisions";

/**
 * Mid-page invitation to jump past the outcome and into the reasoning. The
 * `href` is an in-page anchor, so the site's SmoothScroll eases down to it.
 */
export function ProcessHook({ hook, href }: { hook: Hook | undefined; href: string | null }) {
  // A hook with nowhere to jump to is just a dead end.
  if (!hook?.enabled || !href) return null;

  return (
    <section className="flex w-full flex-col items-start px-6 sm:px-10 lg:px-20">
      <div
        data-reveal="scale"
        className="flex w-full flex-col items-center justify-center gap-4 rounded-[4px] bg-soft-beige px-6 py-8 text-center"
      >
        <div className="flex w-full flex-col items-center gap-2">
          <h2 className="font-serif text-3xl leading-9 text-espresso">
            {hook.title || DEFAULT_TITLE}
          </h2>
          <p className="text-base leading-6 text-espresso">{hook.subtitle || DEFAULT_SUBTITLE}</p>
        </div>

        <Link href={href} className={cn(buttonVariants({ variant: "link" }), "uppercase")}>
          {hook.ctaLabel || DEFAULT_CTA_LABEL}
          {/* Nods downward on its own — this is the one element on the page
              asking to be clicked rather than read. */}
          <ArrowDownIcon aria-hidden className="animate-bob" />
        </Link>
      </div>
    </section>
  );
}
