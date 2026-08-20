import {PortableText, type PortableTextComponents, type PortableTextProps} from 'next-sanity'

import {SanityImage} from './sanity-image'

const components: PortableTextComponents = {
  types: {
    image: ({value}) => (
      <figure className="my-8">
        <SanityImage value={value} width={1200} className="w-full rounded-lg" sizes="(max-width: 768px) 100vw, 768px" />
        {value?.caption ? (
          <figcaption className="mt-2 text-sm text-zinc-500">{value.caption}</figcaption>
        ) : null}
      </figure>
    ),
  },
}

export function Body({value}: {value: PortableTextProps['value']}) {
  return (
    <div className="prose-neutral max-w-none space-y-4 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
      <PortableText value={value} components={components} />
    </div>
  )
}
