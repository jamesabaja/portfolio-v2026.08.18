/**
 * The one thing that separates an independent concept redesign from real client
 * work on this page. Shown when a case study sets `conceptDisclosure`.
 */
export function ConceptNotice() {
  return (
    <div className="flex w-full items-center border-l-8 border-sand bg-warm-ivory px-6 py-6 sm:px-8">
      <div className="flex flex-col items-start gap-2 text-base leading-6 text-espresso">
        <p className="font-bold">Independent Concept Redesign</p>
        <p>
          This case study was created independently to demonstrate my design and development
          process. It is not affiliated with or commissioned by the business.
        </p>
      </div>
    </div>
  );
}
