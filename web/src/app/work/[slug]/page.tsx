import Link from 'next/link'
import {notFound} from 'next/navigation'
import type {Metadata} from 'next'

import {Body} from '@/components/portable-text'
import {SanityImage} from '@/components/sanity-image'
import {client} from '@/sanity/lib/client'
import {sanityFetch} from '@/sanity/lib/live'
import {PROJECT_QUERY, PROJECT_SEO_QUERY, PROJECT_SLUGS_QUERY} from '@/sanity/lib/queries'

type Props = {params: Promise<{slug: string}>}

export async function generateStaticParams() {
  // Published content only, straight from the API (no CDN, no stega).
  const slugs = await client
    .withConfig({useCdn: false, stega: false, perspective: 'published'})
    .fetch(PROJECT_SLUGS_QUERY)

  return slugs.map(({slug}) => ({slug: slug as string}))
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {data: project} = await sanityFetch({
    query: PROJECT_SEO_QUERY,
    params: await params,
    // Stega characters must never reach <head>.
    stega: false,
  })

  if (!project) return {}

  return {
    title: project.title ?? undefined,
    description: project.summary ?? undefined,
  }
}

export default async function ProjectPage({params}: Props) {
  const {data: project} = await sanityFetch({query: PROJECT_QUERY, params: await params})

  if (!project) notFound()

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-24">
      <Link href="/work" className="text-sm text-zinc-500 hover:underline">
        ← Back to work
      </Link>

      <h1 className="mt-8 text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
        {project.title}
      </h1>

      <p className="mt-2 text-sm text-zinc-500">
        {[project.client, project.year].filter(Boolean).join(' · ')}
      </p>

      {project.roles?.length ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.roles.map((role, i) => (
            <li
              key={`${role}-${i}`}
              className="rounded-full bg-black/[.06] px-3 py-1 text-sm text-zinc-700 dark:bg-white/[.08] dark:text-zinc-300"
            >
              {role}
            </li>
          ))}
        </ul>
      ) : null}

      <SanityImage
        value={project.coverImage}
        width={768}
        height={432}
        className="mt-8 w-full rounded-lg"
        priority
        sizes="(max-width: 768px) 100vw, 768px"
      />

      {project.summary ? (
        <p className="mt-8 text-lg leading-8 text-zinc-700 dark:text-zinc-300">{project.summary}</p>
      ) : null}

      {project.body ? (
        <div className="mt-8">
          <Body value={project.body} />
        </div>
      ) : null}

      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 inline-flex h-12 items-center rounded-full bg-black px-5 font-medium text-white dark:bg-white dark:text-black"
        >
          Visit site
        </a>
      ) : null}
    </main>
  )
}
