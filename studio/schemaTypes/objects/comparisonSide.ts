import {defineField, defineType} from 'sanity'

/**
 * One half of a `beforeAfter` comparison. Named rather than inlined so schema
 * extraction doesn't hoist anonymous `before` / `after` types.
 */
export const comparisonSide = defineType({
  name: 'comparisonSide',
  title: 'Comparison side',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'projectImage',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
  ],
  preview: {
    select: {title: 'caption', media: 'image.image'},
  },
})
