import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { MobileNav } from "@/components/mobile-nav";
import { SiteHeader } from "@/components/site-header";
import { Button, buttonVariants } from "@/components/ui/button";
import { contactEmail } from "@/lib/env";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/stack", label: "Stack" },
] as const;

export function Navbar() {
  return (
    <SiteHeader>
      <Link
        href="/"
        className="group/wordmark flex flex-col items-start rounded-[4px] outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        <span className="font-serif text-2xl leading-8 text-espresso transition-colors duration-300 ease-soft group-hover/wordmark:text-burnt-terracotta">
          james gabriel
        </span>
        <span className="text-xs leading-4 font-medium tracking-eyebrow text-warm-gray uppercase transition-colors duration-300 ease-soft group-hover/wordmark:text-espresso">
          Product designer &amp; engineer
        </span>
      </Link>

      <nav className="hidden items-center gap-2 sm:flex sm:gap-6">
        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(buttonVariants({ variant: "ghost" }), "px-3 sm:px-5")}
          >
            {label}
          </Link>
        ))}

        {/* Falls back to a non-interactive button until NEXT_PUBLIC_CONTACT_EMAIL
            is set, so the nav never ships a broken `mailto:` link. */}
        {contactEmail ? (
          <a
            href={`mailto:${contactEmail}`}
            className={cn(
              buttonVariants({ variant: "primary" }),
              "nudge-diagonal px-3 uppercase sm:px-5",
            )}
          >
            Contact me
            <ArrowUpRightIcon />
          </a>
        ) : (
          <Button rightIcon={<ArrowUpRightIcon />} disabled className="px-3 uppercase sm:px-5">
            Contact me
          </Button>
        )}
      </nav>

      <MobileNav links={NAV_LINKS} contactEmail={contactEmail} />
    </SiteHeader>
  );
}
