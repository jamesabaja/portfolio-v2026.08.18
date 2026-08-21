import { CaretDoubleRightIcon } from "@phosphor-icons/react/dist/ssr";

import { RevealImage, type ImageDimensions } from "@/components/case-study/reveal-image";
import type { SanityImageValue } from "@/components/sanity-image";

type Side = {
  image: (SanityImageValue & { dimensions?: ImageDimensions }) | null;
  caption: string | null;
} | null;

type Comparison = {
  _key: string;
  title: string | null;
  before: Side;
  after: Side;
};

function Panel({ side, label }: { side: Side; label: string }) {
  if (!side?.image) return null;

  return (
    <figure className="flex min-w-0 flex-1 flex-col items-start gap-2.5">
      {/* A figure takes a single figcaption, and the editor's own words earn it
          over the fixed Before/After label. */}
      <p className="text-xs leading-4 font-medium tracking-eyebrow text-warm-gray uppercase">
        {label}
      </p>
      <RevealImage
        value={side.image}
        dimensions={side.image.dimensions ?? null}
        sizes="(max-width: 1024px) 100vw, 520px"
      />
      {side.caption ? (
        <figcaption className="text-sm leading-5 text-warm-gray">{side.caption}</figcaption>
      ) : null}
    </figure>
  );
}

export function Comparisons({
  comparisons,
}: {
  comparisons: Array<Comparison> | null | undefined;
}) {
  if (!comparisons?.length) return null;

  return (
    <div className="flex w-full flex-col gap-12">
      {comparisons.map((comparison) => (
        <div key={comparison._key} data-reveal className="flex w-full flex-col gap-4">
          {comparison.title ? (
            <h3 className="text-xl leading-7 font-semibold text-espresso">{comparison.title}</h3>
          ) : null}

          <div className="flex w-full flex-col items-center gap-6 lg:flex-row">
            <Panel side={comparison.before} label="Before" />
            {/* Points from the old state toward the new one — the axis it points
                along flips with the layout, so the nudge follows it. */}
            <CaretDoubleRightIcon
              aria-hidden
              className="size-8 shrink-0 rotate-90 text-warm-gray transition-transform duration-300 ease-soft lg:rotate-0"
            />
            <Panel side={comparison.after} label="After" />
          </div>

          <p className="text-sm leading-5 text-warm-gray">
            &mdash; Hover panels to scroll through full content
          </p>
        </div>
      ))}
    </div>
  );
}
