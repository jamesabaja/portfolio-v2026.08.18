"use client";

import {
  CheckIcon,
  CopyIcon,
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useEffect, useRef, useState } from "react";

import { contactEmail, contactPhone, githubUrl, linkedinUrl, siteUrl } from "@/lib/env";
import { cn } from "@/lib/utils";

const COPIED_RESET_MS = 2000;

const PROFILE_LINKS = [
  { href: githubUrl, label: "GitHub", icon: GithubLogoIcon },
  { href: linkedinUrl, label: "LinkedIn", icon: LinkedinLogoIcon },
] as const;

const actionClassName =
  "inline-flex cursor-pointer items-center gap-2 rounded-[4px] text-sm leading-5 font-medium text-warm-gray transition-colors outline-none hover:text-espresso focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/** Strips the scheme so the card shows "jamesabaja.com", not the full href. */
function displayUrl(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function BusinessCard({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const copyEmail = async () => {
    if (!contactEmail) return;

    try {
      await navigator.clipboard.writeText(contactEmail);
    } catch {
      // Clipboard access can be denied (insecure origin, permissions) — the
      // `mailto:` link beside this button still gets the visitor there.
      return;
    }

    setCopied(true);
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopied(false), COPIED_RESET_MS);
  };

  const profiles = PROFILE_LINKS.filter(({ href }) => href);

  return (
    <div
      data-reveal="scale"
      className={cn(
        "lift flex w-full max-w-[569px] flex-col items-start gap-12 rounded-lg border border-sand p-8",
        "shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-[0px_16px_32px_-8px_rgba(0,0,0,0.28)]",
        className,
      )}
    >
      <div className="flex w-full items-center gap-12">
        <p className="min-w-0 flex-1 text-lg leading-7 font-semibold text-espresso uppercase">
          James Abaja
        </p>

        {profiles.length > 0 ? (
          <ul className="flex shrink-0 items-start gap-3">
            {profiles.map(({ href, label, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="block rounded-[4px] text-espresso transition-[color,translate,scale] duration-300 ease-soft outline-none hover:-translate-y-0.5 hover:scale-110 hover:text-burnt-terracotta focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <Icon className="size-5" />
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="flex w-full flex-col items-start gap-2">
        {siteUrl ? (
          <a
            href={siteUrl}
            className="link-sweep inline-block rounded-[4px] text-lg leading-7 break-all text-espresso transition-colors outline-none hover:text-burnt-terracotta focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {displayUrl(siteUrl)}
          </a>
        ) : null}

        {contactPhone ? (
          <a
            href={`tel:${contactPhone.replace(/[^+\d]/g, "")}`}
            className="link-sweep inline-block rounded-[4px] text-lg leading-7 text-espresso transition-colors outline-none hover:text-burnt-terracotta focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {contactPhone}
          </a>
        ) : null}

        {contactEmail ? (
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p className="text-lg leading-7 font-semibold break-all text-espresso">
              {contactEmail}
            </p>

            <button type="button" onClick={copyEmail} className={actionClassName}>
              {/* Keyed so the tick replays its pop on every copy, not just the first. */}
              {copied ? (
                <CheckIcon
                  key="copied"
                  className="animate-pop-in size-4 text-muted-olive"
                  weight="bold"
                />
              ) : (
                <CopyIcon className="size-4" />
              )}
              {copied ? "Copied" : "Copy email"}
            </button>

            {/* Outside the button so the announcement doesn't end up in its
                accessible name. */}
            <span aria-live="polite" className="sr-only">
              {copied ? "Email address copied to clipboard" : ""}
            </span>

            <a href={`mailto:${contactEmail}`} className={actionClassName}>
              <EnvelopeSimpleIcon className="size-4" />
              Send message
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}
