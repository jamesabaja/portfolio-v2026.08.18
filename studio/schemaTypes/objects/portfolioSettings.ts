import {defineField, defineType} from 'sanity'
import {StarIcon} from '@sanity/icons/Star'

export const portfolioSettings = defineType({
  name: 'portfolioSettings',
  title: 'Portfolio settings',
  type: 'object',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'featured',
      title: 'Featured',
      description: 'Surface this case study on the portfolio index.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'featuredOrder',
      title: 'Featured order',
      description: 'Lower numbers sort first.',
      type: 'number',
      validation: (rule) => rule.integer().min(0),
      hidden: ({parent}) => !parent?.featured,
    }),
    defineField({
      name: 'cardSummary',
      title: 'Card summary',
      description: 'Short blurb for the index card. Falls back to the summary when empty.',
      type: 'string',
    }),
    defineField({
      name: 'cardImage',
      title: 'Card image',
      description: 'Falls back to the cover image when empty.',
      type: 'projectImage',
    }),
  ],
})
