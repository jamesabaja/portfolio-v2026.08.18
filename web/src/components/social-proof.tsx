import { Fragment } from "react";

import { stagger } from "@/lib/motion";

const STATS = [
  { label: "7+ years", detail: "Designing and building digital products" },
  { label: "20+", detail: "Products and experiences shipped" },
  { label: "End to end", detail: "From product thinking to production code" },
] as const;

export function SocialProof() {
  return (
    <section className="flex w-full flex-col items-stretch justify-between gap-6 bg-muted-olive px-6 py-10 sm:px-10 md:flex-row md:items-center md:gap-10 lg:px-20">
      {STATS.map((stat, index) => (
        <Fragment key={stat.label}>
          {/* Hairline separators only exist once the stats sit side by side. */}
          {index > 0 ? (
            <div
              aria-hidden
              data-reveal="fade"
              style={stagger(index)}
              className="hidden w-px self-stretch bg-sand md:block"
            />
          ) : null}

          <div
            data-reveal
            style={stagger(index)}
            className="flex shrink-0 flex-col items-start gap-1"
          >
            <p className="text-xl leading-7 font-semibold text-cream">{stat.label}</p>
            <p className="text-base leading-6 text-soft-beige">{stat.detail}</p>
          </div>
        </Fragment>
      ))}
    </section>
  );
}
