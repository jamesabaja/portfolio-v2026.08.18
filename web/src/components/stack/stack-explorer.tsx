"use client";

import { ArrowRightIcon, MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useId, useMemo, useState } from "react";

import { CONTACT_CALLOUT_ID } from "@/components/contact-callout";
import { buttonVariants } from "@/components/ui/button";
import { pillActive, pillClassName, pillGhost, pillInactive } from "@/components/ui/pill";
import { stagger } from "@/lib/motion";
import { type StackSection } from "@/lib/stack";
import { useDebouncedValue } from "@/lib/use-debounced-value";
import { cn } from "@/lib/utils";

/** Long enough to skip the intermediate keystrokes, short enough to feel live. */
const SEARCH_DEBOUNCE_MS = 250;

type SearchResult = {
  /**
   * Sections holding at least one match — the only ones the page lists, each
   * with its matching items hoisted to the front of the tag row.
   */
  sections: Array<StackSection>;
  /** Lowercased names of the matching items, for per-tag highlighting. */
  matched: Set<string>;
  /** Total matching items across every section. */
  total: number;
};

function filter(sections: Array<StackSection>, isMatch: (item: string) => boolean): SearchResult {
  const matched = new Set<string>();
  const sectionsWithMatches: Array<StackSection> = [];

  for (const section of sections) {
    const hits: Array<string> = [];
    const rest: Array<string> = [];

    for (const item of section.items) {
      (isMatch(item) ? hits : rest).push(item);
    }

    if (hits.length === 0) continue;

    for (const hit of hits) matched.add(hit.toLowerCase());
    /* Matches lead the row so they read together; both groups otherwise keep
       their authored order. */
    sectionsWithMatches.push({ ...section, items: [...hits, ...rest] });
  }

  return { sections: sectionsWithMatches, matched, total: matched.size };
}

/** Typed search stays forgiving: any substring of the item name counts. */
function search(sections: Array<StackSection>, query: string): SearchResult {
  return filter(sections, (item) => item.toLowerCase().includes(query));
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Plain keyword matching against a pasted job posting: an item counts if its
 * name appears anywhere in the text, whole-word.
 *
 * No weighting, and no attempt to read the posting's structure — a mention in
 * the "nice to have" list scores the same as one in the requirements. The word
 * boundaries are the one concession: without them "Git" would match every
 * "GitHub" in the text and every stack would look like a perfect fit.
 */
function searchPosting(sections: Array<StackSection>, posting: string): SearchResult {
  const haystack = posting.toLowerCase();

  return filter(sections, (item) => {
    const pattern = new RegExp(`(?<![a-z0-9])${escapeRegExp(item.toLowerCase())}(?![a-z0-9])`);

    return pattern.test(haystack);
  });
}

const fieldClassName = [
  "flex w-full items-start gap-4 rounded-[4px] border border-warm-gray bg-warm-ivory px-5 py-4",
  "transition-[border-color,box-shadow] duration-200 ease-soft",
  "hover:border-espresso focus-within:border-burnt-terracotta focus-within:ring-2 focus-within:ring-ring/50",
].join(" ");

export function StackExplorer({ sections }: { sections: Array<StackSection> }) {
  const inputId = useId();
  const [isPostingMode, setIsPostingMode] = useState(false);
  const [query, setQuery] = useState("");
  const [posting, setPosting] = useState("");

  /* Filtering waits for typing to settle: every keystroke re-renders the field,
     but the tag list only churns once the input stops changing. */
  const value = isPostingMode ? posting : query;
  const debouncedValue = useDebouncedValue(value, SEARCH_DEBOUNCE_MS);
  /* Guards the frame between a mode switch and the debounce catching up, where
     the old mode's text would otherwise be run through the new matcher. */
  const trimmedValue = (debouncedValue === value ? debouncedValue : value).trim();

  const result = useMemo(() => {
    if (!trimmedValue) return null;

    return isPostingMode
      ? searchPosting(sections, trimmedValue)
      : search(sections, trimmedValue.toLowerCase());
  }, [sections, trimmedValue, isPostingMode]);

  /* On a hit, only the sections carrying one are listed. On a miss the whole
     stack stays put, greyed out — the visitor can still browse what is there. */
  const visibleSections = result && result.total > 0 ? result.sections : sections;

  return (
    <>
      <div className="flex w-full flex-col items-start gap-2">
        <label htmlFor={inputId} className="w-full text-base leading-6 text-espresso">
          {isPostingMode ? "Paste a job description" : "Search my tech stack"}
        </label>

        <div className={cn("group/field", fieldClassName)}>
          {isPostingMode ? (
            <textarea
              id={inputId}
              value={posting}
              onChange={(event) => setPosting(event.target.value)}
              rows={8}
              placeholder="Paste the full job description here to see which technologies and tools match my current stack..."
              className="min-w-0 flex-1 resize-y bg-transparent text-base leading-6 text-espresso outline-none placeholder:text-warm-gray"
            />
          ) : (
            <>
              {/* Warms up with the field so the whole control responds as one. */}
              <MagnifyingGlassIcon
                className="size-6 shrink-0 text-warm-gray transition-colors duration-200 ease-soft group-focus-within/field:text-burnt-terracotta"
                aria-hidden
              />
              <input
                id={inputId}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try React, Figma, PostgreSQL..."
                className="min-w-0 flex-1 bg-transparent text-base leading-6 text-espresso outline-none placeholder:text-warm-gray [&::-webkit-search-cancel-button]:hidden"
              />
            </>
          )}
        </div>

        <div className="flex w-full flex-wrap items-center justify-between gap-x-6 gap-y-1">
          <button
            type="button"
            onClick={() => setIsPostingMode((previous) => !previous)}
            className="cursor-pointer text-sm leading-5 text-warm-gray underline underline-offset-4 transition-colors hover:text-espresso focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            {isPostingMode
              ? "Prefer to search manually? Search my stack"
              : "Have a job description? Compare it with my stack"}
          </button>

          {/* Reassurance where the worry actually lands: the moment there is a
              textarea asking for someone else's job description. */}
          {isPostingMode ? (
            <p className="text-sm leading-5 text-warm-gray">
              Processed in your browser. Nothing you paste is stored.
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex w-full flex-col items-start gap-6">
        {/* Announced as well as shown, so the debounced result reaches screen
            readers without pulling focus off the field. Hidden while idle so
            the empty region doesn't open a gap above the first section. */}
        <div role="status" aria-live="polite" className={cn("w-full", !result && "hidden")}>
          {result && result.total > 0 ? (
            <p className="text-base leading-6 font-bold text-espresso">
              {result.total} {result.total === 1 ? "match" : "matches"}{" "}
              {isPostingMode ? "in this job description" : <>for &ldquo;{trimmedValue}&rdquo;</>}
            </p>
          ) : null}

          {result && result.total === 0 ? (
            <div className="animate-fade-up flex w-full flex-col items-start justify-between gap-6 rounded-[4px] bg-soft-beige p-6 sm:flex-row sm:items-center">
              <div className="flex min-w-0 flex-1 flex-col items-start gap-1 text-base leading-6 text-espresso">
                <p className="font-bold [word-break:break-word]">
                  {isPostingMode ? (
                    "Nothing in this job description matched my stack by name"
                  ) : (
                    <>No exact match for &ldquo;{trimmedValue}&rdquo;</>
                  )}
                </p>
                <p>
                  I may use a different tool for the same job. Tell me what you need, and I&rsquo;ll
                  help identify the right approach.
                </p>
              </div>

              <Link
                href={`/#${CONTACT_CALLOUT_ID}`}
                className={cn(
                  buttonVariants({ variant: "primary", size: "sm" }),
                  "nudge-right uppercase",
                )}
              >
                Let&rsquo;s talk tech
                <ArrowRightIcon />
              </Link>
            </div>
          ) : null}
        </div>

        <div className="flex w-full flex-col items-start gap-8">
          {visibleSections.map((section, sectionIndex) => (
            <section
              key={section.title}
              data-reveal
              style={stagger(sectionIndex)}
              className="flex w-full flex-col items-start gap-4"
            >
              <h2 className="text-xs leading-4 font-medium tracking-eyebrow text-warm-gray uppercase">
                {section.title}
              </h2>

              <ul className="flex w-full flex-wrap items-start gap-2">
                {section.items.map((item) => {
                  const isMatch = result?.matched.has(item.toLowerCase()) ?? false;

                  return (
                    <li
                      key={item}
                      className={cn(
                        pillClassName,
                        isMatch ? pillActive : result ? pillGhost : pillInactive,
                        // Matches step forward out of the greyed-out field.
                        isMatch && "scale-105",
                      )}
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
