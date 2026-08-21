import {defineArrayMember, defineField, defineType} from 'sanity'
import {BulbOutlineIcon} from '@sanity/icons/BulbOutline'

export const keyDecisions = defineType({
  name: 'keyDecisions',
  title: 'Key decisions',
  type: 'object',
  icon: BulbOutlineIcon,
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'introduction', title: 'Introduction', type: 'portableText'}),
    defineField({
      name: 'decisions',
      title: 'Decisions',
      type: 'array',
      of: [defineArrayMember({type: 'designDecision'})],
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({title: title || 'Key decisions'}),
  },
})
