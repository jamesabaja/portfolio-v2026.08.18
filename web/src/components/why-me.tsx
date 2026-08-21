import { stagger } from "@/lib/motion";

const PILLARS = [
  {
    number: "01",
    title: "Product thinking",
    detail:
      "I translate business requirements and user needs into clear flows, priorities, and product decisions.",
  },
  {
    number: "02",
    title: "UX and interface design",
    detail:
      "I create intuitive, responsive interfaces supported by reusable components and scalable design systems.",
  },
  {
    number: "03",
    title: "Product engineering",
    detail:
      "I build production-ready applications across the frontend and backend using modern, maintainable technologies.",
  },
] as const;

export function WhyMe() {
  return (
    <section className="flex w-full flex-col items-start gap-12 px-6 py-14 sm:px-10 lg:gap-15 lg:px-20 lg:py-16">
      <div data-reveal className="flex w-full max-w-[720px] flex-col items-start gap-3">
        <p className="text-xs leading-4 font-medium tracking-eyebrow text-warm-gray uppercase">
          What I bring to the table
        </p>
        <h2 className="font-serif text-3xl leading-9 text-espresso">
          One perspective across product, design, and engineering.
        </h2>
        <p className="text-base leading-6 text-espresso">
          I work across disciplines without treating them as separate handoffs. I can help define
          the right experience, turn it into a thoughtful interface, and build it into a reliable
          product.
        </p>
      </div>

      <div className="flex w-full flex-col gap-10 md:flex-row md:items-start md:gap-12">
        {PILLARS.map(({ number, title, detail }, index) => (
          <div
            key={number}
            data-reveal
            style={stagger(index)}
            className="group/pillar flex min-w-0 flex-1 flex-col items-start gap-1"
          >
            <h3 className="flex w-full items-center gap-4 font-serif text-2xl leading-8 font-medium">
              {/* The numeral is the only decorative element here, so it is the
                  one that warms up when the pillar is pointed at. */}
              <span
                aria-hidden
                className="shrink-0 text-sand transition-colors duration-300 ease-soft group-hover/pillar:text-burnt-terracotta"
              >
                {number}
              </span>
              <span className="text-espresso">{title}</span>
            </h3>
            <p className="text-base leading-6 text-warm-gray">{detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
