"use client";

import { Dialog } from "@base-ui/react/dialog";
import { ArrowUpRightIcon, ListIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  links: readonly { href: string; label: string }[];
  /** Empty when NEXT_PUBLIC_CONTACT_EMAIL is unset — see `Navbar`. */
  contactEmail: string;
};

/**
 * The burger half of the header. Below `sm` the link row would wrap under the
 * wordmark, so it collapses into this trigger and a right-hand overlay panel
 * carrying the same links and contact CTA.
 */
export function MobileNav({ links, contactEmail }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  // The panel is `sm:hidden`, so widening past the breakpoint would otherwise
  // leave an invisible open dialog holding focus.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 40rem)");
    const close = () => desktop.matches && setOpen(false);
    desktop.addEventListener("change", close);
    return () => desktop.removeEventListener("change", close);
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        render={
          <Button variant="ghost" size="sm" aria-label="Open menu" className="px-2 sm:hidden" />
        }
      >
        <ListIcon className="size-6 transition-transform duration-200 ease-soft" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop
          className={cn(
            "fixed inset-0 z-40 bg-espresso/40 transition-opacity duration-200 sm:hidden",
            "data-starting-style:opacity-0 data-ending-style:opacity-0",
          )}
        />
        <Dialog.Popup
          className={cn(
            "fixed inset-y-0 right-0 z-50 flex w-[min(20rem,85vw)] flex-col gap-8",
            "border-l border-sand bg-cream px-6 py-6 outline-none",
            "transition-transform duration-300 ease-soft sm:hidden",
            "data-starting-style:translate-x-full data-ending-style:translate-x-full",
          )}
        >
          <div className="flex items-start justify-end">
            {/* Kept for the dialog's accessible name; the panel shows only the close mark. */}
            <Dialog.Title className="sr-only">Menu</Dialog.Title>
            <Dialog.Close
              render={<Button variant="ghost" size="sm" aria-label="Close menu" className="px-2" />}
            >
              <XIcon className="size-5" />
            </Dialog.Close>
          </div>

          {/* The panel slides as one surface; its rows then arrive in sequence,
              which is what makes the open read as deliberate rather than abrupt. */}
          <nav className="flex flex-col items-stretch gap-2">
            {links.map(({ href, label }, index) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                style={{ animationDelay: `${120 + index * 60}ms` }}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "animate-fade-up justify-start px-3",
                )}
              >
                {label}
              </Link>
            ))}

            {contactEmail ? (
              <a
                href={`mailto:${contactEmail}`}
                onClick={() => setOpen(false)}
                style={{ animationDelay: `${120 + links.length * 60}ms` }}
                className={cn(
                  buttonVariants({ variant: "primary" }),
                  "animate-fade-up nudge-diagonal mt-2 uppercase",
                )}
              >
                Contact me
                <ArrowUpRightIcon />
              </a>
            ) : (
              <Button rightIcon={<ArrowUpRightIcon />} disabled className="mt-2 uppercase">
                Contact me
              </Button>
            )}
          </nav>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
