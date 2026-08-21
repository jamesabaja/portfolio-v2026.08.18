import { stegaClean } from "next-sanity";

import { stagger } from "@/lib/motion";

type Stat = {
  _key: string;
  value: string | null;
  label: string | null;
  context: string | null;
  resultType: string | null;
};

// Result types are ordered by how strong a claim they represent.
const RESULT_TYPE_LABELS: Record<string, string> = {
  verified: "Verified",
  technical: "Technical",
  qualitative: "Qualitative",
  projected: "Projected",
  target: "Target",
};

export function Stats({ stats }: { stats: Array<Stat> | null | undefined }) {
  if (!stats?.length) return null;

  return (
    <dl className="flex w-full flex-wrap items-start justify-between gap-x-8 gap-y-8">
      {stats.map((stat, index) => {
        const resultType = stegaClean(stat.resultType) ?? undefined;
        const badge = resultType ? RESULT_TYPE_LABELS[resultType] : undefined;

        return (
          <div
            key={stat._key}
            data-reveal
            style={stagger(index)}
            className="flex flex-col items-start gap-1"
          >
            <dt className="font-serif text-4xl leading-10 font-medium text-espresso">
              {stat.value}
            </dt>
            <dd className="text-base leading-6 text-warm-gray">{stat.label}</dd>
            {/* Neither line is drawn in the design; they only appear when an
                editor has something to qualify the number with. */}
            {stat.context ? (
              <dd className="max-w-[240px] text-sm leading-5 text-warm-gray">{stat.context}</dd>
            ) : null}
            {badge ? (
              <dd className="text-xs leading-4 font-medium tracking-eyebrow text-warm-gray uppercase">
                {badge}
              </dd>
            ) : null}
          </div>
        );
      })}
    </dl>
  );
}
