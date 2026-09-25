import { stegaClean } from "next-sanity";
import type { Metadata } from "next";

import { ContactCta } from "@/components/contact-cta";
// Featured section temporarily hidden; it duplicated the first entry in the list below.
// import { CaseStudyCard } from "@/components/work/case-study-card";
import { CaseStudyList } from "@/components/work/case-study-list";
// import { byFeaturedOrder } from "@/lib/case-studies";
import { sanityFetch } from "@/sanity/lib/live";
import { CASE_STUDIES_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Work",
  description:
    "A selection of product design, frontend, and full-stack work focused on making complex experiences clearer, faster, and easier to use.",
};

export default async function WorkPage() {
  const { data: caseStudies } = await sanityFetch({
    query: CASE_STUDIES_QUERY,
    // Custom cache tag the Sanity webhook revalidates on publish.
    tags: ["caseStudy"],
  });

  /* One featured entry only: the lowest `featuredOrder` among those explicitly
     marked featured. Unordered entries sort last rather than winning by accident. */
  // const featured = caseStudies
  //   .filter((caseStudy) => caseStudy.portfolioSettings?.featured)
  //   .sort(byFeaturedOrder)[0];

  const industries = [
    ...new Set(
      caseStudies
        .map((caseStudy) => stegaClean(caseStudy.industry))
        .filter((industry): industry is string => Boolean(industry)),
    ),
  ].sort((a, b) => a.localeCompare(b));

  return (
    <>
      <main className="flex w-full flex-col items-start gap-12 px-6 py-14 sm:px-10 lg:gap-15 lg:px-20 lg:py-16">
        <div data-reveal className="flex w-full max-w-[720px] flex-col items-start gap-3">
          <p className="text-xs leading-4 font-medium tracking-eyebrow text-warm-gray uppercase">
            Selected work
          </p>
          <h1 className="font-serif text-4xl leading-none font-medium text-espresso sm:text-5xl">
            Projects I&rsquo;ve helped shape and ship.
          </h1>
          <p className="text-base leading-6 text-espresso">
            A selection of product design, frontend, and full-stack work focused on making complex
            experiences clearer, faster, and easier to use.
          </p>
        </div>

        {/* Featured section temporarily hidden.
        {featured ? (
          <section data-reveal className="flex w-full flex-col items-start gap-6">
            <p className="text-xs leading-4 font-medium tracking-eyebrow text-warm-gray uppercase">
              Featured
            </p>
            <CaseStudyCard caseStudy={featured} />
          </section>
        ) : null}
        */}

        <section data-reveal className="flex w-full flex-col items-start gap-6">
          <p className="text-xs leading-4 font-medium tracking-eyebrow text-warm-gray uppercase">
            Explore by industry
          </p>
          <CaseStudyList caseStudies={caseStudies} industries={industries} />
        </section>
      </main>

      <ContactCta />
    </>
  );
}
