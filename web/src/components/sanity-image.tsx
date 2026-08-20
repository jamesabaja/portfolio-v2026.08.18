import Image from 'next/image'
import type {SanityImageSource} from '@sanity/image-url'

import {urlFor} from '@/sanity/lib/image'

type SanityImageValue = SanityImageSource & {alt?: string}

export function SanityImage({
  value,
  width = 1200,
  height,
  className,
  priority,
  sizes,
}: {
  value: SanityImageValue | null | undefined
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
}) {
  if (!value || typeof value !== 'object' || !('asset' in value) || !value.asset) return null

  const resolvedHeight = height ?? Math.round(width / 1.5)

  return (
    <Image
      className={className}
      src={urlFor(value).width(width).height(resolvedHeight).fit('crop').auto('format').url()}
      alt={value.alt || ''}
      width={width}
      height={resolvedHeight}
      priority={priority}
      sizes={sizes}
    />
  )
}
