import { Body } from "@/components/portable-text";
import { SanityImage, type SanityImageValue } from "@/components/sanity-image";
import { stagger } from "@/lib/motion";
import type { PortableTextProps } from "next-sanity";

type Finding = {
  _key: string;
  title: string | null;
  content: PortableTextProps["value"] | null;
  image: SanityImageValue | null;
};

export function Findings({ findings }: { findings: Array<Finding> | null | undefined }) {
  if (!findings?.length) return null;

  return (
    <div className="flex w-full flex-col gap-4">
      {findings.map((finding, index) => (
        <div
          key={finding._key}
          data-reveal
          style={stagger(index)}
          className="flex w-full flex-col gap-4"
        >
          {finding.title ? (
            <h3 className="text-xl leading-7 font-semibold text-espresso">{finding.title}</h3>
          ) : null}
          {finding.content ? <Body value={finding.content} /> : null}
          {finding.image ? (
            <SanityImage
              value={finding.image}
              width={1200}
              className="w-full rounded-[4px]"
              sizes="(max-width: 1024px) 100vw, 1120px"
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}
