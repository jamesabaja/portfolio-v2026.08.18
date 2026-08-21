import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";

import { urlFor } from "@/sanity/lib/image";

/**
 * Accepts either a raw Sanity image asset or a `projectImage` object, which
 * wraps the asset one level deeper and carries its own alt text.
 */
export type SanityImageValue =
  | (SanityImageSource & { alt?: string | null })
  | { image?: SanityImageSource | null; alt?: string | null; caption?: string | null };

function unwrap(value: SanityImageValue | null | undefined) {
  if (!value || typeof value !== "object") return null;

  const source = "image" in value && value.image ? value.image : value;
  if (!source || typeof source !== "object" || !("asset" in source) || !source.asset) return null;

  const alt = "alt" in value ? value.alt : undefined;

  return { source: source as SanityImageSource, alt: alt ?? "" };
}

export function SanityImage({
  value,
  width = 1200,
  height,
  className,
  priority,
  sizes,
  alt,
}: {
  value: SanityImageValue | null | undefined;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  alt?: string;
}) {
  const resolved = unwrap(value);
  if (!resolved) return null;

  const resolvedHeight = height ?? Math.round(width / 1.5);

  return (
    <Image
      className={className}
      src={urlFor(resolved.source)
        .width(width)
        .height(resolvedHeight)
        .fit("crop")
        .auto("format")
        .url()}
      alt={alt ?? resolved.alt ?? ""}
      width={width}
      height={resolvedHeight}
      priority={priority}
      sizes={sizes}
    />
  );
}
