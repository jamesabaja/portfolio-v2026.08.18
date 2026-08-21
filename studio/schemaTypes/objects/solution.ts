import {defineArrayMember, defineField, defineType} from 'sanity'
import {ComponentIcon} from '@sanity/icons/Component'

export const solution = defineType({
  name: 'solution',
  title: 'Solution',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'content', title: 'Content', type: 'portableText'}),
    defineField({
      name: 'comparisons',
      title: 'Before / after comparisons',
      type: 'array',
      of: [defineArrayMember({type: 'beforeAfter'})],
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [defineArrayMember({type: 'projectStat'})],
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({title: title || 'Solution'}),
  },
})
