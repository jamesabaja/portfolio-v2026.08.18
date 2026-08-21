import { ArrowLeftIcon, ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { ConceptNotice } from "@/components/case-study/concept-notice";
import { SanityImage } from "@/components/sanity-image";
import { stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { CASE_STUDY_QUERY_RESULT } from "@/sanity/types";

type CaseStudy = NonNullable<CASE_STUDY_QUERY_RESULT>;

export type CaseStudyHeroData = Pick<
  CaseStudy,
  | "title"
  | "summary"
  | "conceptDisclosure"
  | "role"
  | "responsibilities"
  | "technologies"
  | "year"
  | "timeline"
  | "projectUrl"
  | "projectUrlLabel"
  | "coverImage"
>;

/** Tag-style arrays read as one sentence in the meta table. */
function joined(items: Array<string> | null) {
  const values = items?.filter(Boolean) ?? [];
  return values.length > 0 ? values.join(", ") : null;
}

function MetaCell({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col items-start gap-1 border-b border-soft-beige p-4",
        // Each row picks up a faint wash as the eye passes over it.
        "transition-colors duration-300 ease-soft hover:bg-warm-ivory",
        className,
      )}
    >
      <p className="text-xs leading-4 font-medium tracking-eyebrow text-warm-gray uppercase">
        {label}
      </p>
      <div className="text-base leading-6 text-espresso">{children}</div>
    </div>
  );
}

export function CaseStudyHero({ caseStudy }: { caseStudy: CaseStudyHeroData }) {
  const role = joined(caseStudy.role);
  const responsibilities = joined(caseStudy.responsibilities);
  const technologies = joined(caseStudy.technologies);

  return (
    <div className="flex w-full flex-col items-start gap-12 px-6 py-12 sm:px-10 lg:px-20 lg:py-20">
      <Link
        href="/work"
        data-reveal="fade"
        className="nudge-left flex w-fit items-center gap-3 text-base leading-6 text-warm-gray transition-colors hover:text-espresso"
      >
        <ArrowLeftIcon aria-hidden className="size-4" />
        Back to Work
      </Link>

      <div data-reveal className="flex w-full flex-col items-start gap-3">
        <p className="text-xs leading-4 font-medium tracking-eyebrow text-warm-gray uppercase">
          Case study
        </p>
        <h1 className="font-serif text-4xl leading-none font-medium text-espresso sm:text-5xl">
          {caseStudy.title}
        </h1>
        {caseStudy.summary ? (
          <p className="text-base leading-6 text-espresso">{caseStudy.summary}</p>
        ) : null}
      </div>

      {caseStudy.conceptDisclosure ? <ConceptNotice /> : null}

      <div className="flex w-full flex-col items-stretch gap-8 lg:flex-row lg:items-center">
        <div data-reveal="scale" className="w-full lg:flex-1">
          <SanityImage
            value={caseStudy.coverImage}
            width={1085}
            height={750}
            className="aspect-[1085/750] w-full rounded-[4px] object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 544px"
          />
        </div>

        <div
          data-reveal
          style={stagger(1)}
          className="flex w-full flex-col items-stretch lg:flex-1"
        >
          {role ? <MetaCell label="My role">{role}</MetaCell> : null}
          {responsibilities ? (
            <MetaCell label="Responsibilities">{responsibilities}</MetaCell>
          ) : null}
          {technologies ? <MetaCell label="Stack">{technologies}</MetaCell> : null}
          {caseStudy.year ? <MetaCell label="Year">{caseStudy.year}</MetaCell> : null}

          {/* Timeline and site share the last row; either one alone fills it. */}
          {caseStudy.timeline || caseStudy.projectUrl ? (
            <div className="flex w-full items-stretch">
              {caseStudy.timeline ? (
                <MetaCell label="Timeline" className="flex-1">
                  {caseStudy.timeline}
                </MetaCell>
              ) : null}
              {caseStudy.projectUrl ? (
                <MetaCell label="Site" className="flex-1">
                  <a
                    href={caseStudy.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-sweep nudge-diagonal inline-flex items-center gap-1 text-burnt-terracotta transition-colors hover:text-deep-terracotta"
                  >
                    {caseStudy.projectUrlLabel || "Visit site"}
                    <ArrowUpRightIcon aria-hidden className="size-5" />
                  </a>
                </MetaCell>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
