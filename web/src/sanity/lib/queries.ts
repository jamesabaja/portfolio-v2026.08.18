import {defineQuery} from 'next-sanity'

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)]
  | order(year desc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    client,
    year,
    roles,
    coverImage
  }
`)

export const PROJECT_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    summary,
    client,
    year,
    roles,
    url,
    coverImage,
    body
  }
`)

export const PROJECT_SLUGS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)]{"slug": slug.current}
`)

export const PROJECT_SEO_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0]{title, summary}
`)
