import {defineField, defineType} from 'sanity'
import {SearchIcon} from '@sanity/icons/Search'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  icon: SearchIcon,
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta title',
      description: 'Falls back to the case study title when empty.',
      type: 'string',
      validation: (rule) => rule.max(60).warning('Titles over 60 characters get truncated'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      description: 'Falls back to the summary when empty.',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(160).warning('Descriptions over 160 characters get truncated'),
    }),
    defineField({
      name: 'socialImage',
      title: 'Social share image',
      description: 'Shown when the page is shared. 1200×630 works best.',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
