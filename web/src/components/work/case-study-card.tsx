import { ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { SanityImage } from "@/components/sanity-image";
import { Pill } from "@/components/ui/pill";
import type { CASE_STUDIES_QUERY_RESULT } from "@/sanity/types";

/**
 * Only the fields the card actually renders. Picking rather than taking the
 * whole row keeps stega-branded literal unions (e.g. `projectStatus`) out of
 * the prop type, which otherwise fail to match the plain generated types.
 */
export type CaseStudyCardData = Pick<
  CASE_STUDIES_QUERY_RESULT[number],
  | "_id"
  | "title"
  | "slug"
  | "summary"
  | "industry"
  | "hasNoCaseStudyPage"
  | "projectUrl"
  | "projectUrlLabel"
  | "coverImage"
  | "cardImage"
  | "portfolioSettings"
>;

export function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudyCardData }) {
  const { portfolioSettings } = caseStudy;

  const image = portfolioSettings?.cardImage ?? caseStudy.cardImage ?? caseStudy.coverImage;
  const blurb = portfolioSettings?.cardSummary ?? caseStudy.summary;

  // Entries flagged `hasNoCaseStudyPage` have no page of their own to link to.
  const caseStudyHref =
    !caseStudy.hasNoCaseStudyPage && caseStudy.slug ? `/work/${caseStudy.slug}` : null;

  return (
    <article className="group/card flex w-full flex-col items-start gap-6 md:flex-row md:items-stretch">
      <div className="w-full shrink-0 overflow-clip rounded-[4px] md:h-[305px] md:w-[442px]">
        {/* The crop holds still while the image drifts in behind it. */}
        <SanityImage
          value={image}
          width={442}
          height={305}
          className="aspect-[442/305] w-full object-cover transition-transform duration-700 ease-soft group-hover/card:scale-[1.04] md:h-full"
          sizes="(max-width: 768px) 100vw, 442px"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col items-start justify-between gap-6 md:py-4">
        <div className="flex w-full flex-col items-start gap-3">
          <h3 className="text-xl leading-7 font-medium text-espresso transition-colors duration-300 ease-soft group-hover/card:text-burnt-terracotta">
            {caseStudy.title}
          </h3>

          {blurb ? <p className="text-base leading-6 text-warm-gray">{blurb}</p> : null}

          {caseStudy.industry ? (
            <div className="flex flex-wrap items-start gap-2">
              <Pill>{caseStudy.industry}</Pill>
            </div>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-6">
          {caseStudyHref ? (
            <Link
              href={caseStudyHref}
              className="link-sweep nudge-right flex items-center gap-1 text-sm leading-5 text-warm-gray transition-colors hover:text-espresso"
            >
              View case study
              <ArrowRightIcon aria-hidden className="size-4" />
            </Link>
          ) : null}

          {caseStudy.projectUrl ? (
            <a
              href={caseStudy.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-sweep nudge-diagonal flex items-center gap-1 text-sm leading-5 text-burnt-terracotta transition-colors hover:text-deep-terracotta"
            >
              {caseStudy.projectUrlLabel || "Visit site"}
              <ArrowUpRightIcon aria-hidden className="size-4" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
