import {defineArrayMember, defineField, defineType} from 'sanity'
import type {CustomValidator} from 'sanity'
import {CaseIcon} from '@sanity/icons/Case'

/**
 * Case studies that opt out of a dedicated page (`hasNoCaseStudyPage`) only ever
 * render as a card on the portfolio index, so everything except title and
 * summary becomes optional for them.
 */
const requiredForPage =
  (message: string): CustomValidator<unknown> =>
  (value, context) => {
    if (context.document?.hasNoCaseStudyPage) return true

    const isEmpty =
      value === undefined ||
      value === null ||
      value === '' ||
      (typeof value === 'object' && 'current' in value && !value.current)

    return isEmpty ? message : true
  }

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case study',
  type: 'document',
  icon: CaseIcon,
  groups: [
    {name: 'overview', title: 'Overview', default: true},
    {name: 'context', title: 'Context'},
    {name: 'process', title: 'Process'},
    {name: 'solution', title: 'Solution'},
    {name: 'discovery', title: 'Discovery'},
    {name: 'decisions', title: 'Decisions'},
    {name: 'portfolio', title: 'Portfolio'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // — Overview —————————————————————————————————————————————
    defineField({
      name: 'hasNoCaseStudyPage',
      title: 'No case study page',
      description:
        'Turn on for a portfolio entry that only appears as a card. Only the title and summary stay required.',
      type: 'boolean',
      initialValue: false,
      group: 'overview',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'overview',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      description: 'One or two sentences. Used on the index and as the fallback meta description.',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(200).warning('Keep summaries under 200 characters'),
      group: 'overview',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) =>
        rule.custom(requiredForPage('A slug is required for a case study page')),
      hidden: ({document}) => Boolean(document?.hasNoCaseStudyPage),
      group: 'overview',
    }),
    defineField({
      name: 'projectType',
      title: 'Project type',
      type: 'string',
      group: 'overview',
    }),
    defineField({
      name: 'projectStatus',
      title: 'Project status',
      type: 'string',
      options: {
        list: [
          {title: 'Concept', value: 'concept'},
          {title: 'Designed', value: 'designed'},
          {title: 'Built', value: 'built'},
          {title: 'Launched', value: 'launched'},
        ],
      },
      group: 'overview',
    }),
    defineField({
      name: 'conceptDisclosure',
      title: 'Show concept disclosure',
      description: 'Displays a note making clear this work was not shipped for a real client.',
      type: 'boolean',
      initialValue: false,
      group: 'overview',
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      group: 'overview',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
      group: 'overview',
    }),
    defineField({
      name: 'responsibilities',
      title: 'Responsibilities',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      group: 'overview',
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
      group: 'overview',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (rule) => rule.integer().min(1990).max(2100),
      group: 'overview',
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline',
      description: 'e.g. "6 weeks" or "Jan – Mar 2026".',
      type: 'string',
      group: 'overview',
    }),
    defineField({
      name: 'projectUrl',
      title: 'Project URL',
      type: 'url',
      group: 'overview',
    }),
    defineField({
      name: 'projectUrlLabel',
      title: 'Project URL label',
      description: 'Button text for the link. Defaults to "Visit site".',
      type: 'string',
      hidden: ({document}) => !document?.projectUrl,
      group: 'overview',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'projectImage',
      validation: (rule) =>
        rule.custom(requiredForPage('A cover image is required for a case study page')),
      group: 'overview',
    }),
    defineField({
      name: 'cardImage',
      title: 'Card image',
      description: 'Optional override for the index card. Falls back to the cover image.',
      type: 'projectImage',
      group: 'overview',
    }),

    // — Sections ——————————————————————————————————————————————
    defineField({
      name: 'projectContext',
      title: 'Project context',
      type: 'projectContext',
      group: 'context',
    }),
    defineField({
      name: 'processHook',
      title: 'Process hook',
      type: 'processHook',
      group: 'process',
    }),
    defineField({
      name: 'solution',
      title: 'Solution',
      type: 'solution',
      group: 'solution',
    }),
    defineField({
      name: 'discovery',
      title: 'Discovery',
      type: 'discovery',
      group: 'discovery',
    }),
    defineField({
      name: 'keyDecisions',
      title: 'Key decisions',
      type: 'keyDecisions',
      group: 'decisions',
    }),
    defineField({
      name: 'portfolioSettings',
      title: 'Portfolio settings',
      type: 'portfolioSettings',
      group: 'portfolio',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      industry: 'industry',
      projectType: 'projectType',
      year: 'year',
      media: 'coverImage.image',
    },
    prepare: ({title, industry, projectType, year, media}) => ({
      title,
      subtitle: [industry || projectType, year].filter(Boolean).join(' · '),
      media,
    }),
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
    {
      title: 'Featured order',
      name: 'featuredOrder',
      by: [
        {field: 'portfolioSettings.featuredOrder', direction: 'asc'},
        {field: 'year', direction: 'desc'},
      ],
    },
  ],
})
