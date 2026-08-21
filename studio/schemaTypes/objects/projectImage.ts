import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons/Image'

export const projectImage = defineType({
  name: 'projectImage',
  title: 'Image',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alternative text',
      description: 'Describe the image for screen readers and search engines.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
  ],
  preview: {
    select: {title: 'alt', subtitle: 'caption', media: 'image'},
    prepare: ({title, subtitle, media}) => ({
      title: title || 'Image',
      subtitle,
      media,
    }),
  },
})
