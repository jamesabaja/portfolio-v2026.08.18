import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * The Figma component (node 8227:2470) draws only the `default` appearance:
 * warm-ivory field, 8px sand rail, 32/24 padding, espresso text at
 * text-base/leading-6 with a bold title over a regular description.
 * The remaining variants recolour the rail from the same palette — accent and
 * destructive take the terracottas, success takes muted-olive — so an alert
 * can carry tone without leaving the design system.
 *
 * The optional leading icon is opt-in: pass a Phosphor icon as a direct child
 * and the grid opens a column for it, otherwise the text spans the full width
 * exactly as the design shows.
 */
const alertVariants = cva(
  [
    "grid w-full grid-cols-[0_1fr] items-start gap-y-2",
    "border-l-8 border-solid px-8 py-6",
    "text-base leading-6 text-espresso",
    "has-[>svg]:grid-cols-[1.25rem_1fr] has-[>svg]:gap-x-3",
    "[&>svg]:pointer-events-none [&>svg]:size-5 [&>svg]:translate-y-0.5",
  ],
  {
    variants: {
      variant: {
        default: "bg-warm-ivory border-sand [&>svg]:text-warm-gray",
        accent: "bg-warm-ivory border-burnt-terracotta [&>svg]:text-burnt-terracotta",
        destructive: "bg-warm-ivory border-deep-terracotta [&>svg]:text-deep-terracotta",
        success: "bg-warm-ivory border-muted-olive [&>svg]:text-muted-olive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type AlertProps = React.ComponentProps<"div"> & VariantProps<typeof alertVariants>;

function Alert({ className, variant = "default", ...props }: AlertProps) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant, className }))}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="alert-title"
      className={cn("col-start-2 font-bold [word-break:break-word]", className)}
      {...props}
    />
  );
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn("col-start-2 font-normal [word-break:break-word] [&_p]:leading-6", className)}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription, alertVariants };
export type { AlertProps };
