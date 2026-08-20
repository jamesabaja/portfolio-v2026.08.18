import Link from 'next/link'
import type {Metadata} from 'next'

import {SanityImage} from '@/components/sanity-image'
import {sanityFetch} from '@/sanity/lib/live'
import {PROJECTS_QUERY} from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected projects.',
}

export default async function WorkPage() {
  const {data: projects} = await sanityFetch({query: PROJECTS_QUERY})

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">Work</h1>

      {projects.length === 0 ? (
        <p className="mt-8 text-zinc-600 dark:text-zinc-400">
          No projects published yet. Add one in the Studio at{' '}
          <code className="rounded bg-black/[.06] px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-white/[.08]">
            localhost:3333
          </code>
          .
        </p>
      ) : (
        <ul className="mt-12 space-y-12">
          {projects.map((project) => (
            <li key={project._id}>
              <Link href={`/work/${project.slug}`} className="group block">
                <SanityImage
                  value={project.coverImage}
                  width={768}
                  height={432}
                  className="w-full rounded-lg"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
                <h2 className="mt-4 text-xl font-medium text-black group-hover:underline dark:text-zinc-50">
                  {project.title}
                </h2>
                <p className="mt-1 text-sm text-zinc-500">
                  {[project.client, project.year].filter(Boolean).join(' · ')}
                </p>
                {project.summary ? (
                  <p className="mt-2 text-zinc-600 dark:text-zinc-400">{project.summary}</p>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
