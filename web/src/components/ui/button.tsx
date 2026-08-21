import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * States that the Figma component doesn't draw explicitly (hover, active,
 * focus, disabled) are derived from the palette it does specify:
 * primary falls to its own border colour on hover, the neutral variants pick
 * up soft-beige/sand washes, and secondary blends espresso toward warm-gray.
 */
const buttonVariants = cva(
  [
    "group/button inline-flex shrink-0 items-center justify-center rounded-[4px]",
    "border border-transparent bg-clip-padding whitespace-nowrap select-none",
    "transition-[color,background-color,border-color,box-shadow,translate,scale] duration-200 ease-soft outline-none",
    // Presses register in the button itself rather than only in the colour swap.
    "active:scale-[0.97] motion-reduce:active:scale-100",
    "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-burnt-terracotta border-deep-terracotta text-cream",
          "hover:bg-deep-terracotta active:bg-deep-terracotta",
          // Solid buttons carry the most weight, so they get the lift too.
          "hover:-translate-y-px hover:shadow-[0_8px_18px_-10px_var(--color-deep-terracotta)]",
        ],
        secondary: [
          "bg-espresso border-warm-gray text-cream",
          "hover:bg-[color-mix(in_oklab,var(--color-espresso)_82%,var(--color-warm-gray))]",
          "active:bg-[color-mix(in_oklab,var(--color-espresso)_70%,var(--color-warm-gray))]",
          "hover:-translate-y-px hover:shadow-[0_8px_18px_-10px_var(--color-espresso)]",
        ],
        outline: "border-sand text-espresso hover:bg-soft-beige active:bg-sand",
        ghost: "text-espresso hover:bg-soft-beige active:bg-sand",
        link: "text-burnt-terracotta underline-offset-4 hover:text-deep-terracotta hover:underline active:text-deep-terracotta",
      },
      size: {
        sm: "h-9 gap-1.5 px-3.5 text-sm leading-5 font-normal [&_svg:not([class*='size-'])]:size-4",
        default:
          "h-11 gap-2 px-5 text-base leading-6 font-medium [&_svg:not([class*='size-'])]:size-[18px]",
        lg: "h-13 gap-2.5 px-6.5 text-lg leading-7 font-medium [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    /** Rendered before the label — pass a Phosphor icon, e.g. `<ArrowLeftIcon />`. */
    leftIcon?: React.ReactNode;
    /** Rendered after the label — pass a Phosphor icon, e.g. `<ArrowRightIcon />`. */
    rightIcon?: React.ReactNode;
  };

function Button({
  className,
  variant = "primary",
  size = "default",
  leftIcon,
  rightIcon,
  children,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
