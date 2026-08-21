import {defineLocations, type PresentationPluginOptions} from 'sanity/presentation'

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    caseStudy: defineLocations({
      select: {title: 'title', slug: 'slug.current', hasNoCaseStudyPage: 'hasNoCaseStudyPage'},
      resolve: (doc) => ({
        locations: [
          // Card-only entries have no page of their own.
          ...(doc?.slug && !doc?.hasNoCaseStudyPage
            ? [{title: doc?.title || 'Untitled', href: `/work/${doc.slug}`}]
            : []),
          {title: 'Work index', href: '/work'},
        ],
      }),
    }),
  },
}
