import {defineField, defineType} from 'sanity'
import {SearchIcon} from '@sanity/icons/Search'

export const projectFinding = defineType({
  name: 'projectFinding',
  title: 'Finding',
  type: 'object',
  icon: SearchIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'portableText',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'projectImage',
    }),
  ],
  preview: {
    select: {title: 'title', media: 'image.image'},
    prepare: ({title, media}) => ({title: title || 'Finding', media}),
  },
})
