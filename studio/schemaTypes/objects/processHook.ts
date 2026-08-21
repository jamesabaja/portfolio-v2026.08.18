import {defineField, defineType} from 'sanity'
import {RocketIcon} from '@sanity/icons/Rocket'

export const processHook = defineType({
  name: 'processHook',
  title: 'Process hook',
  type: 'object',
  icon: RocketIcon,
  fields: [
    defineField({
      name: 'enabled',
      title: 'Show this section',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      hidden: ({parent}) => !parent?.enabled,
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      hidden: ({parent}) => !parent?.enabled,
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA label',
      type: 'string',
      hidden: ({parent}) => !parent?.enabled,
    }),
  ],
  preview: {
    select: {title: 'title', enabled: 'enabled'},
    prepare: ({title, enabled}) => ({
      title: title || 'Process hook',
      subtitle: enabled ? 'Enabled' : 'Hidden',
    }),
  },
})
