import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { CaseStudyHero } from "@/components/case-study/case-study-hero";
import { CaseStudySection } from "@/components/case-study/case-study-section";
import { Comparisons } from "@/components/case-study/comparison";
import { Decisions } from "@/components/case-study/decision";
import { Findings } from "@/components/case-study/findings";
import { ProcessHook } from "@/components/case-study/process-hook";
import { Stats } from "@/components/case-study/stats";
import { TagList } from "@/components/case-study/tag-list";
import { ContactCta } from "@/components/contact-cta";
import { Body } from "@/components/portable-text";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import {
  CASE_STUDY_QUERY,
  CASE_STUDY_SEO_QUERY,
  CASE_STUDY_SLUGS_QUERY,
} from "@/sanity/lib/queries";

type Props = { params: Promise<{ slug: string }> };

/* Section eyebrows aren't authored in Sanity — every case study tells the same
   story in the same order, so the labels live with the layout. */
const EYEBROWS = {
  context: "The opportunity",
  discovery: "Discovery",
  decisions: "Designing the experience",
} as const;

const DISCOVERY_ID = "discovery";
const DECISIONS_ID = "decisions";

export async function generateStaticParams() {
  // Published content only, straight from the API (no CDN, no stega).
  const slugs = await client
    .withConfig({ useCdn: false, stega: false, perspective: "published" })
    .fetch(CASE_STUDY_SLUGS_QUERY);

  return slugs.map(({ slug }) => ({ slug: slug as string }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const { data: seo } = await sanityFetch({
    query: CASE_STUDY_SEO_QUERY,
    params: { slug },
    // Stega characters must never reach <head>.
    stega: false,
    tags: ["caseStudy", `caseStudy:${slug}`],
  });

  if (!seo) return {};

  const socialImage = seo.socialImage
    ? urlFor(seo.socialImage).width(1200).height(630).fit("crop").auto("format").url()
    : undefined;

  return {
    title: seo.metaTitle ?? undefined,
    description: seo.metaDescription ?? undefined,
    robots: seo.noIndex ? { index: false, follow: false } : undefined,
    openGraph: socialImage
      ? { images: [{ url: socialImage, width: 1200, height: 630 }] }
      : undefined,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;

  const { data: caseStudy } = await sanityFetch({
    query: CASE_STUDY_QUERY,
    params: { slug },
    // Custom cache tags the Sanity webhook revalidates on publish.
    tags: ["caseStudy", `caseStudy:${slug}`],
  });

  if (!caseStudy) notFound();

  const { projectContext, processHook, solution, discovery, keyDecisions } = caseStudy;

  const hasSolution = Boolean(
    solution?.content || solution?.comparisons?.length || solution?.stats?.length,
  );
  const hasDiscovery = Boolean(discovery?.introduction || discovery?.findings?.length);
  const hasDecisions = Boolean(keyDecisions?.introduction || keyDecisions?.decisions?.length);

  /* The hook offers to skip ahead to the thinking, so it points at whichever of
     those two sections actually exists. */
  const hookHref = hasDiscovery ? `#${DISCOVERY_ID}` : hasDecisions ? `#${DECISIONS_ID}` : null;

  // Concept redesigns present the work as a proposal, not a shipped result.
  const solutionEyebrow = caseStudy.conceptDisclosure
    ? "Proposed solution & expected impact"
    : "Solution & results";

  return (
    <>
      <main className="flex w-full flex-col items-start">
        <CaseStudyHero caseStudy={caseStudy} />

        <div className="flex w-full flex-col gap-20 pb-14 lg:pb-16">
          {projectContext?.content ? (
            <CaseStudySection eyebrow={EYEBROWS.context} title={projectContext.title}>
              <Body value={projectContext.content} />
            </CaseStudySection>
          ) : null}

          <ProcessHook hook={processHook} href={hookHref} />

          {hasSolution ? (
            <CaseStudySection eyebrow={solutionEyebrow} title={solution?.title}>
              <Body value={solution?.content} />
              {solution?.comparisons?.length || solution?.stats?.length ? (
                <div className="mt-8 flex w-full flex-col gap-12">
                  <Comparisons comparisons={solution.comparisons} />
                  <Stats stats={solution.stats} />
                </div>
              ) : null}
            </CaseStudySection>
          ) : null}

          {hasDiscovery ? (
            <CaseStudySection
              id={DISCOVERY_ID}
              eyebrow={EYEBROWS.discovery}
              title={discovery?.title}
            >
              {/* Intro, methods and findings are three distinct beats — the
                  section's own gap runs them together. */}
              <div className="flex w-full flex-col gap-10">
                <Body value={discovery?.introduction} />
                <TagList label="Methods" items={discovery?.methods} />
                <Findings findings={discovery?.findings} />
                <Body value={discovery?.conclusion} />
              </div>
            </CaseStudySection>
          ) : null}

          {hasDecisions ? (
            <CaseStudySection
              id={DECISIONS_ID}
              eyebrow={EYEBROWS.decisions}
              title={keyDecisions?.title}
            >
              <Body value={keyDecisions?.introduction} />
              <Decisions decisions={keyDecisions?.decisions} />
            </CaseStudySection>
          ) : null}
        </div>
      </main>

      <ContactCta />
    </>
  );
}
