import { cn } from "@/lib/utils";

/**
 * Shared pill shape. The case study card's industry tag, `/work`'s filter
 * buttons, and `/stack`'s technology tags are the same object in the design,
 * so they share one class set.
 */
export const pillClassName =
  "rounded-full border px-3 py-1.5 text-sm leading-5 whitespace-nowrap transition-[color,background-color,border-color,scale] duration-200 ease-soft";

export const pillInactive = "border-warm-gray bg-cream text-warm-gray";
export const pillActive = "border-cream bg-warm-gray text-cream";
/** Filtered-out state: still on the page, but receded behind the matches. */
export const pillGhost = "border-soft-beige bg-cream text-soft-beige";

export function Pill({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn(pillClassName, pillInactive, className)}>{children}</span>;
}
