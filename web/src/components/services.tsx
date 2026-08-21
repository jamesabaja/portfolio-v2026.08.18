import type { Icon } from "@phosphor-icons/react";
import {
  AppWindowIcon,
  CompassIcon,
  MonitorIcon,
  WrenchIcon,
} from "@phosphor-icons/react/dist/ssr";

import { stagger } from "@/lib/motion";

const SERVICES = [
  {
    icon: CompassIcon,
    title: "Product Strategy & UX Design",
    detail:
      "Clear product direction, intuitive user flows, and thoughtful interfaces grounded in real user and business needs.",
  },
  {
    icon: MonitorIcon,
    title: "Web Design & Development",
    detail:
      "Responsive, high-performing websites designed to build trust, communicate value, and convert.",
  },
  {
    icon: AppWindowIcon,
    title: "Web Application Development",
    detail:
      "Reliable SaaS products, platforms, dashboards, and internal tools built to support real workflows and scale.",
  },
  {
    icon: WrenchIcon,
    title: "Product Audits & Improvements",
    detail:
      "Focused reviews that uncover usability, accessibility, and performance issues, followed by practical fixes that make the product better.",
  },
] satisfies ReadonlyArray<{ icon: Icon; title: string; detail: string }>;

export function Services() {
  return (
    <section className="flex w-full flex-col items-start gap-12 px-6 py-14 sm:px-10 lg:gap-15 lg:px-20 lg:py-16">
      <div data-reveal className="flex w-full max-w-[720px] flex-col items-start gap-3">
        <p className="text-xs leading-4 font-medium tracking-eyebrow text-warm-gray uppercase">
          What I do
        </p>
        <h2 className="font-serif text-3xl leading-9 text-espresso">
          From early ideas to better digital products.
        </h2>
        <p className="text-base leading-6 text-espresso">
          I work across disciplines without treating them as separate handoffs. I can help define
          the right experience, turn it into a thoughtful interface, and build it into a reliable
          product.
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        {SERVICES.map(({ icon: ServiceIcon, title, detail }, index) => (
          <div
            key={title}
            data-reveal="scale"
            style={stagger(index)}
            className="lift group/service flex flex-col items-start gap-8 rounded-[4px] border border-sand p-8 hover:border-warm-gray hover:shadow-[0_18px_36px_-24px_rgba(38,31,26,0.45)]"
          >
            <div className="flex items-start overflow-clip rounded-[4px] bg-muted-olive p-2 transition-transform duration-300 ease-spring group-hover/service:scale-105 group-hover/service:-rotate-3">
              <ServiceIcon aria-hidden className="size-8 text-cream" />
            </div>

            <div className="flex w-full flex-col items-start gap-1">
              <h3 className="font-serif text-2xl leading-8 font-medium text-espresso transition-colors duration-300 ease-soft group-hover/service:text-burnt-terracotta">
                {title}
              </h3>
              <p className="text-base leading-6 text-warm-gray">{detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
