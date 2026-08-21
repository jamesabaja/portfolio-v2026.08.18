import { BusinessCard } from "@/components/business-card";

/** Anchor the "Let's talk" CTA scrolls to — also linkable as `/#contact`. */
export const CONTACT_CALLOUT_ID = "contact";

export function ContactCallout() {
  return (
    <section
      id={CONTACT_CALLOUT_ID}
      className="flex w-full scroll-mt-24 flex-col items-start gap-12 px-6 py-14 sm:px-10 lg:flex-row lg:px-20 lg:py-20"
    >
      <div
        data-reveal
        className="flex w-full max-w-[720px] min-w-0 flex-1 flex-col items-start gap-3"
      >
        <p className="text-xs leading-4 font-medium tracking-eyebrow text-warm-gray uppercase">
          Ready?
        </p>
        <h2 className="font-serif text-4xl leading-10 text-espresso">
          Let&rsquo;s build something people actually use.
        </h2>
        <p className="text-base leading-6 text-espresso">
          Whether it&rsquo;s a bug to squash or a product to scale, I&rsquo;m ready to help. No
          matter your timezone, I&rsquo;m just a message away.
        </p>
      </div>

      <BusinessCard className="lg:shrink-0" />
    </section>
  );
}
