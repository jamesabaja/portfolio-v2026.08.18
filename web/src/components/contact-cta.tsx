import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { CONTACT_CALLOUT_ID } from "@/components/contact-callout";
import { buttonVariants } from "@/components/ui/button";
import { stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function ContactCta() {
  return (
    <section className="flex w-full flex-col items-start justify-between gap-8 bg-muted-olive px-6 py-14 sm:px-10 lg:flex-row lg:items-center lg:gap-12 lg:px-20 lg:py-15">
      <div data-reveal className="flex w-full max-w-[720px] min-w-0 flex-col items-start gap-3">
        <p className="text-xs leading-4 font-medium tracking-eyebrow text-sand uppercase">
          Let&rsquo;s work together
        </p>
        <h2 className="font-serif text-3xl leading-9 text-cream">
          Have a role, product, or idea in mind?
        </h2>
        <p className="text-base leading-6 text-cream">
          Whether you&rsquo;re building a product team or looking for someone to help bring an idea
          to life, I&rsquo;d love to hear what you&rsquo;re working on.
        </p>
      </div>

      {/* Absolute path so the link also works from `/work` and friends: those
          land on the home page first, then settle on the contact callout. */}
      <Link
        href={`/#${CONTACT_CALLOUT_ID}`}
        data-reveal
        style={stagger(1)}
        className={cn(buttonVariants({ variant: "secondary" }), "nudge-right shrink-0 uppercase")}
      >
        Let&rsquo;s talk
        <ArrowRightIcon />
      </Link>
    </section>
  );
}
