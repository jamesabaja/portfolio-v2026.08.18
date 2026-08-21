export function CaseStudySection({
  id,
  eyebrow,
  title,
  children,
}: {
  id?: string;
  eyebrow: string;
  title?: string | null;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="flex w-full scroll-mt-24 flex-col items-start gap-4 px-6 sm:px-10 lg:px-20"
    >
      <div data-reveal className="flex w-full flex-col items-start gap-4">
        <p className="text-xs leading-4 font-medium tracking-eyebrow text-warm-gray uppercase">
          {eyebrow}
        </p>
        {title ? <h2 className="font-serif text-3xl leading-9 text-espresso">{title}</h2> : null}
      </div>

      <div data-reveal="fade" className="w-full">
        {children}
      </div>
    </section>
  );
}
