"use client";

import { stegaClean } from "next-sanity";
import { useMemo, useState } from "react";

import { CaseStudyCard, type CaseStudyCardData } from "@/components/work/case-study-card";
import { pillActive, pillClassName, pillInactive } from "@/components/ui/pill";
import { stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ALL = "All";

export function CaseStudyList({
  caseStudies,
  industries,
}: {
  caseStudies: Array<CaseStudyCardData>;
  /** Unique, alphabetised industry names, already stega-cleaned on the server. */
  industries: Array<string>;
}) {
  const [activeIndustry, setActiveIndustry] = useState(ALL);

  const filtered = useMemo(
    () =>
      activeIndustry === ALL
        ? caseStudies
        : // Draft mode embeds stega characters in every string, so the raw value
          // never matches the cleaned option the button was built from.
          caseStudies.filter((caseStudy) => stegaClean(caseStudy.industry) === activeIndustry),
    [caseStudies, activeIndustry],
  );

  return (
    <div className="flex w-full flex-col items-start gap-6">
      <div className="flex w-full flex-wrap items-start gap-2">
        {[ALL, ...industries].map((industry) => {
          const isActive = industry === activeIndustry;

          return (
            <button
              key={industry}
              type="button"
              onClick={() => setActiveIndustry(industry)}
              aria-pressed={isActive}
              className={cn(
                pillClassName,
                isActive ? pillActive : pillInactive,
                "cursor-pointer focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
                "active:scale-95 motion-reduce:active:scale-100",
                !isActive && "hover:bg-soft-beige hover:text-espresso",
              )}
            >
              {industry}
            </button>
          );
        })}
      </div>

      {/* Keyed on the filter so switching industries remounts the list: the
          incoming cards are fresh nodes, which `reveal-observer` picks up and
          animates in exactly as it would on first load. */}
      <div key={activeIndustry} className="flex w-full flex-col items-start gap-6">
        {filtered.map((caseStudy, index) => (
          <div key={caseStudy._id} data-reveal style={stagger(index)} className="w-full">
            <CaseStudyCard caseStudy={caseStudy} />
          </div>
        ))}
      </div>
    </div>
  );
}
