/**
 * Public site configuration read from the environment.
 *
 * Unlike `@/sanity/env`, nothing here throws when unset — these values are
 * cosmetic, and the UI degrades gracefully while they're still blank.
 */
export const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "";
export const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL?.trim() || "";
export const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim() || "";
export const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() || "";
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "";
