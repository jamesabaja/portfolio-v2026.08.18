import { stegaClean } from "next-sanity";

import { Body } from "@/components/portable-text";
import { SanityImage, type SanityImageValue } from "@/components/sanity-image";
import type { PortableTextProps } from "next-sanity";

type Decision = {
  _key: string;
  prefix: string | null;
  title: string | null;
  content: PortableTextProps["value"] | null;
  image: SanityImageValue | null;
  imagePosition: string | null;
};

export function Decisions({ decisions }: { decisions: Array<Decision> | null | undefined }) {
  if (!decisions?.length) return null;

  return (
    <div className="flex w-full flex-col gap-4">
      {decisions.map((decision) => {
        const position = stegaClean(decision.imagePosition) || "right";
        const hasImage = Boolean(decision.image);
        const sideBySide = hasImage && (position === "left" || position === "right");

        const copy = (
          <div className="flex flex-col gap-4">
            {decision.title ? (
              // The prefix is authored per decision, so numbering, "Step 01",
              // or nothing at all are all editorial choices.
              <h3 className="text-xl leading-7 font-semibold text-espresso">
                {decision.prefix ? `${decision.prefix} ` : null}
                {decision.title}
              </h3>
            ) : null}
            {decision.content ? <Body value={decision.content} /> : null}
          </div>
        );

        const image = hasImage ? (
          <SanityImage
            value={decision.image}
            width={sideBySide ? 600 : 1200}
            className="w-full rounded-[4px]"
            sizes={
              sideBySide ? "(max-width: 1024px) 100vw, 544px" : "(max-width: 1024px) 100vw, 1120px"
            }
          />
        ) : null;

        if (!sideBySide) {
          return (
            <div key={decision._key} data-reveal className="flex w-full flex-col gap-4">
              {copy}
              {image}
            </div>
          );
        }

        return (
          <div
            key={decision._key}
            data-reveal
            className="grid w-full items-start gap-8 sm:grid-cols-2"
          >
            {position === "left" ? (
              <>
                <div className="order-1">{image}</div>
                <div className="order-2">{copy}</div>
              </>
            ) : (
              <>
                <div className="order-2 sm:order-1">{copy}</div>
                <div className="order-1 sm:order-2">{image}</div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
