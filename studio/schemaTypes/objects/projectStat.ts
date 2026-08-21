import {defineField, defineType} from 'sanity'
import {TrendUpwardIcon} from '@sanity/icons/TrendUpward'

export const projectStat = defineType({
  name: 'projectStat',
  title: 'Stat',
  type: 'object',
  icon: TrendUpwardIcon,
  fields: [
    defineField({
      name: 'value',
      title: 'Value',
      description: 'The headline figure, e.g. "42%" or "3.2s".',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      description: 'What the figure measures.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'context',
      title: 'Context',
      description: 'Optional qualifier — baseline, sample size, or measurement method.',
      type: 'string',
    }),
    defineField({
      name: 'resultType',
      title: 'Result type',
      description: 'How much weight this number carries. Keeps claims honest.',
      type: 'string',
      options: {
        list: [
          {title: 'Verified', value: 'verified'},
          {title: 'Technical', value: 'technical'},
          {title: 'Qualitative', value: 'qualitative'},
          {title: 'Projected', value: 'projected'},
          {title: 'Target', value: 'target'},
        ],
      },
    }),
  ],
  preview: {
    select: {title: 'value', subtitle: 'label', resultType: 'resultType'},
    prepare: ({title, subtitle, resultType}) => ({
      title: [title, subtitle].filter(Boolean).join(' — '),
      subtitle: resultType,
    }),
  },
})
