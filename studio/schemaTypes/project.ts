import {defineArrayMember, defineField, defineType} from 'sanity'
import {CaseIcon} from '@sanity/icons/Case'
import {ImageIcon} from '@sanity/icons/Image'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      description: 'One or two sentences. Used on the index and as the meta description.',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(200).warning('Keep summaries under 200 characters'),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => rule.required().warning('Alt text is important for SEO'),
        }),
      ],
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
    }),
    defineField({
      name: 'roles',
      title: 'Roles',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (rule) => rule.integer().min(1990).max(2100),
    }),
    defineField({
      name: 'url',
      title: 'Live URL',
      type: 'url',
    }),
    defineField({
      name: 'body',
      title: 'Case study',
      type: 'array',
      of: [
        defineArrayMember({type: 'block'}),
        defineArrayMember({
          type: 'image',
          icon: ImageIcon,
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative text',
              type: 'string',
              validation: (rule) => rule.required().warning('Alt text is important for SEO'),
            }),
            defineField({name: 'caption', title: 'Caption', type: 'string'}),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'client', media: 'coverImage'},
  },
  orderings: [
    {
      title: 'Year, newest first',
      name: 'yearDesc',
      by: [
        {field: 'year', direction: 'desc'},
        {field: 'title', direction: 'asc'},
      ],
    },
  ],
})
