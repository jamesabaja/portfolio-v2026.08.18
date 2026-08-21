import { PortableText, type PortableTextComponents, type PortableTextProps } from "next-sanity";

import { SanityImage } from "./sanity-image";

const components: PortableTextComponents = {
  types: {
    projectImage: ({ value }) => (
      <figure className="my-8">
        <SanityImage
          value={value}
          width={1200}
          className="w-full rounded-lg"
          sizes="(max-width: 768px) 100vw, 768px"
        />
        {value?.caption ? (
          <figcaption className="mt-2 text-sm text-warm-gray">{value.caption}</figcaption>
        ) : null}
      </figure>
    ),
  },
  block: {
    /* Same scale as the finding and decision titles the case study renders from
       its own fields, so authored headings sit level with generated ones. */
    h3: ({ children }) => (
      <h3 className="mt-6 text-xl leading-7 font-semibold text-espresso">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-4 text-base leading-6 font-semibold text-espresso">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-burnt-terracotta pl-4 text-warm-gray italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="ml-5 list-disc space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="ml-5 list-decimal space-y-2">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => {
      const href: string = value?.href ?? "#";
      const external = value?.openInNewTab ?? !href.startsWith("/");

      return (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="text-burnt-terracotta underline"
        >
          {children}
        </a>
      );
    },
  },
};

export function Body({ value }: { value: PortableTextProps["value"] }) {
  if (!value) return null;

  return (
    <div className="max-w-none space-y-4 text-base text-espresso">
      <PortableText value={value} components={components} />
    </div>
  );
}
