import { Pill } from "@/components/ui/pill";

export function TagList({
  label,
  items,
}: {
  label?: string;
  items: Array<string | null> | null | undefined;
}) {
  const tags = items?.filter((item): item is string => Boolean(item)) ?? [];
  if (tags.length === 0) return null;

  return (
    <div className="flex w-full flex-col items-start gap-2">
      {label ? (
        <p className="text-xs leading-4 font-medium tracking-eyebrow text-warm-gray uppercase">
          {label}
        </p>
      ) : null}
      <ul className="flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <li key={`${tag}-${i}`}>
            <Pill>{tag}</Pill>
          </li>
        ))}
      </ul>
    </div>
  );
}
