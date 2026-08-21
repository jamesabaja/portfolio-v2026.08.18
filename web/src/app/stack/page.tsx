import type { Metadata } from "next";

import { ContactCta } from "@/components/contact-cta";
import { StackExplorer } from "@/components/stack/stack-explorer";
import { STACK_SECTIONS } from "@/lib/stack";

export const metadata: Metadata = {
  title: "Stack",
  description:
    "Browse or search the languages, frameworks, platforms, and tools I've worked with across product design, frontend, backend, data, and delivery.",
};

export default function StackPage() {
  return (
    <>
      <main className="flex w-full flex-col items-start gap-12 px-6 py-14 sm:px-10 lg:px-20 lg:py-20">
        <div data-reveal className="flex w-full flex-col items-start gap-3">
          <p className="text-xs leading-4 font-medium tracking-eyebrow text-warm-gray uppercase">
            Tools &amp; technologies
          </p>
          <h1 className="font-serif text-4xl leading-none font-medium text-espresso sm:text-5xl">
            A practical stack, shaped by real products.
          </h1>
          <p className="text-base leading-6 text-espresso">
            Browse or search the languages, frameworks, platforms, and tools I&rsquo;ve worked with
            across product design, frontend, backend, data, and delivery.
          </p>
        </div>

        <StackExplorer sections={STACK_SECTIONS} />
      </main>

      <ContactCta />
    </>
  );
}
