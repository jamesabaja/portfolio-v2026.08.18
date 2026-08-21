import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";

import { Button, buttonVariants } from "@/components/ui/button";
import { contactEmail } from "@/lib/env";
import { stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="flex w-full items-center px-6 py-20 sm:px-10 lg:px-20">
      <div className="flex flex-1 flex-col items-start gap-12">
        <div className="flex w-full max-w-[720px] flex-col items-start gap-3">
          <p
            data-reveal
            style={stagger(0)}
            className="text-xs leading-4 font-medium tracking-eyebrow text-warm-gray uppercase"
          >
            Product engineer &amp; designer · Based in Manila
          </p>
          <h1
            data-reveal
            style={stagger(1)}
            className="font-serif text-4xl leading-none text-espresso sm:text-5xl lg:text-6xl"
          >
            I design and build digital products that <em className="italic">people actually use</em>
            .
          </h1>
          <p data-reveal style={stagger(2)} className="text-base leading-6 text-espresso">
            I help teams and businesses turn complex ideas into intuitive, production-ready
            experiences, from early product thinking and interface design to full-stack development.
          </p>
        </div>

        <div data-reveal style={stagger(3)} className="flex flex-wrap items-center gap-6">
          {/* Mirrors the navbar: falls back to a disabled button until
              NEXT_PUBLIC_CONTACT_EMAIL is set, so we never ship a dead mailto. */}
          {contactEmail ? (
            <a
              href={`mailto:${contactEmail}`}
              className={cn(buttonVariants({ variant: "primary" }), "nudge-right uppercase")}
            >
              Let&rsquo;s work together
              <ArrowRightIcon />
            </a>
          ) : (
            <Button rightIcon={<ArrowRightIcon />} disabled className="uppercase">
              Let&rsquo;s work together
            </Button>
          )}

          <p className="flex items-center gap-2 text-base leading-6 font-medium text-signal-green">
            <span
              aria-hidden
              className="signal-pulse size-2 shrink-0 rounded-full bg-signal-green"
            />
            Open for work
          </p>
        </div>
      </div>
    </section>
  );
}
