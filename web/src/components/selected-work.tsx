import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { CaseStudyCard } from "@/components/work/case-study-card";
import { byFeaturedOrder } from "@/lib/case-studies";
import { stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { sanityFetch } from "@/sanity/lib/live";
import { FEATURED_CASE_STUDIES_QUERY } from "@/sanity/lib/queries";

/** How many featured case studies the home page shows. */
const LIMIT = 3;

export async function SelectedWork() {
  const { data: featured } = await sanityFetch({
    query: FEATURED_CASE_STUDIES_QUERY,
    // Custom cache tag the Sanity webhook revalidates on publish.
    tags: ["caseStudy"],
  });

  const caseStudies = [...featured].sort(byFeaturedOrder).slice(0, LIMIT);

  // Nothing marked featured yet — skip the section rather than render a
  // heading over an empty list.
  if (caseStudies.length === 0) return null;

  return (
    <section className="flex w-full flex-col items-start gap-12 px-6 py-14 sm:px-10 lg:px-20 lg:py-16">
      <div
        data-reveal
        className="flex w-full flex-col items-start justify-between gap-6 lg:flex-row lg:items-center lg:gap-12"
      >
        <div className="flex w-full max-w-[720px] min-w-0 flex-col items-start gap-3">
          <p className="text-xs leading-4 font-medium tracking-eyebrow text-warm-gray uppercase">
            Selected work &amp; case studies
          </p>
          <h2 className="font-serif text-3xl leading-9 text-espresso">
            Projects I&rsquo;ve helped shape and ship.
          </h2>
          <p className="text-base leading-6 text-espresso">
            A selection of product design, frontend, and full-stack work focused on making complex
            experiences clearer, faster, and easier to use.
          </p>
        </div>

        <Link
          href="/work"
          className={cn(buttonVariants({ variant: "outline" }), "nudge-right shrink-0 uppercase")}
        >
          View all projects
          <ArrowRightIcon />
        </Link>
      </div>

      <div className="flex w-full flex-col items-start gap-12">
        {caseStudies.map((caseStudy, index) => (
          <div key={caseStudy._id} data-reveal style={stagger(index)} className="w-full">
            <CaseStudyCard caseStudy={caseStudy} />
          </div>
        ))}
      </div>
    </section>
  );
}
