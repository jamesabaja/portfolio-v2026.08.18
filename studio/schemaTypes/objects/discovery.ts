import {defineArrayMember, defineField, defineType} from 'sanity'
import {SearchIcon} from '@sanity/icons/Search'

export const discovery = defineType({
  name: 'discovery',
  title: 'Discovery',
  type: 'object',
  icon: SearchIcon,
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'introduction', title: 'Introduction', type: 'portableText'}),
    defineField({
      name: 'methods',
      title: 'Methods',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'findings',
      title: 'Findings',
      type: 'array',
      of: [defineArrayMember({type: 'projectFinding'})],
    }),
    defineField({name: 'conclusion', title: 'Conclusion', type: 'portableText'}),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({title: title || 'Discovery'}),
  },
})
