import {defineField, defineType} from 'sanity'
import {BulbOutlineIcon} from '@sanity/icons/BulbOutline'

export const designDecision = defineType({
  name: 'designDecision',
  title: 'Decision',
  type: 'object',
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: 'prefix',
      title: 'Prefix',
      description:
        'Optional label shown before the title, e.g. "1 –" or "Step 01". Leave blank for no prefix.',
      type: 'string',
    }),
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
    defineField({
      name: 'imagePosition',
      title: 'Image position',
      description: 'Where the image sits relative to the copy.',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Right', value: 'right'},
          {title: 'Full width', value: 'full'},
        ],
        layout: 'radio',
      },
      initialValue: 'right',
      hidden: ({parent}) => !parent?.image,
    }),
  ],
  preview: {
    select: {prefix: 'prefix', title: 'title', media: 'image.image'},
    prepare: ({prefix, title, media}) => ({
      title: [prefix, title].filter(Boolean).join(' ') || 'Decision',
      media,
    }),
  },
})
