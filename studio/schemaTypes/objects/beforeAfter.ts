import {defineField, defineType} from 'sanity'
import {TransferIcon} from '@sanity/icons/Transfer'

export const beforeAfter = defineType({
  name: 'beforeAfter',
  title: 'Before / after comparison',
  type: 'object',
  icon: TransferIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'before',
      title: 'Before',
      type: 'comparisonSide',
      options: {collapsible: true, collapsed: false},
    }),
    defineField({
      name: 'after',
      title: 'After',
      type: 'comparisonSide',
      options: {collapsible: true, collapsed: false},
    }),
  ],
  preview: {
    select: {title: 'title', media: 'after.image.image'},
    prepare: ({title, media}) => ({
      title: title || 'Before / after',
      media,
    }),
  },
})
