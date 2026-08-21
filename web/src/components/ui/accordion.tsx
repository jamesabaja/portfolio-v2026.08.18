"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr";

import { cn } from "@/lib/utils";

/**
 * The Figma FAQ accordion (node 8223:1978) is a plain stack: each row is a
 * 24px-padded band separated by a hairline rule, with a 20px plus glyph on the
 * right that rotates 45 degrees into a close mark while its panel is open.
 * The rule is dropped from the last item so the stack ends flush.
 *
 * The design draws 24px above the question and 12px between it and its answer,
 * so the trigger trades half its bottom padding away while the panel is open
 * rather than the panel carrying a top offset that would show through the
 * height transition.
 */

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      className={cn("flex w-full flex-col items-start", className)}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      className={cn("w-full border-b border-soft-beige last:border-b-0", className)}
      {...props}
    />
  );
}

function AccordionTrigger({ className, children, ...props }: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="w-full">
      <AccordionPrimitive.Trigger
        className={cn(
          "group/accordion-trigger flex w-full cursor-pointer items-center justify-between gap-6",
          "pt-6 pb-6 text-left data-[panel-open]:pb-3",
          "text-base leading-6 font-semibold text-espresso",
          "transition-[color,padding] duration-200 ease-out outline-none hover:text-burnt-terracotta",
          "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          className,
        )}
        {...props}
      >
        {children}
        {/* `rotate` and `scale` are separate properties, so the open-state
            rotation and the hover swell compose instead of overwriting. */}
        <PlusIcon
          aria-hidden
          className="size-5 shrink-0 transition-[rotate,scale] duration-200 ease-out group-hover/accordion-trigger:scale-110 group-data-[panel-open]/accordion-trigger:rotate-45"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionPanel({ className, children, ...props }: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      className={cn(
        "h-[var(--accordion-panel-height)] overflow-hidden transition-[height,opacity] duration-200 ease-out",
        // The answer fades with the height so it doesn't scroll past as a solid block.
        "data-[ending-style]:h-0 data-[ending-style]:opacity-0",
        "data-[starting-style]:h-0 data-[starting-style]:opacity-0",
        className,
      )}
      {...props}
    >
      <div className="pb-6 text-base leading-6 text-espresso">{children}</div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionPanel, AccordionTrigger };
