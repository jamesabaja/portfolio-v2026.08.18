import {defineField, defineType} from 'sanity'
import {InfoOutlineIcon} from '@sanity/icons/InfoOutline'

export const projectContext = defineType({
  name: 'projectContext',
  title: 'Project context',
  type: 'object',
  icon: InfoOutlineIcon,
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'content', title: 'Content', type: 'portableText'}),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({title: title || 'Project context'}),
  },
})
