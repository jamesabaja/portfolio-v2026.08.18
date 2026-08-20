import {defineLocations, type PresentationPluginOptions} from 'sanity/presentation'

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    project: defineLocations({
      select: {title: 'title', slug: 'slug.current'},
      resolve: (doc) => ({
        locations: [
          {title: doc?.title || 'Untitled', href: `/work/${doc?.slug}`},
          {title: 'Work index', href: '/work'},
        ],
      }),
    }),
  },
}
