/**
 * The `/stack` page's content, grouped exactly as the design lays it out.
 *
 * Hard-coded rather than modelled in Sanity: this is a stable list about the
 * tools themselves, not editorial content the case studies draw on.
 */
export type StackSection = {
  /** Eyebrow above the tag row. Rendered uppercase by the section header. */
  title: string;
  items: Array<string>;
};

export const STACK_SECTIONS: Array<StackSection> = [
  {
    title: "Frontend",
    items: [
      "React",
      "Next.js",
      "Gatsby",
      "Expo",
      "React Native",
      "shadcn",
      "Tailwind",
      "Storybook",
      "Vitest",
      "JavaScript",
      "TypeScript",
      "HTML",
      "CSS",
    ],
  },
  {
    title: "Backend / Data / Auth",
    items: [
      "Python",
      "Node.js",
      "Django",
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "SQLite",
      "Firebase",
      "Prisma",
      "Supabase",
      "GROQ",
      "Google Apps Script",
      "Clerk",
    ],
  },
  {
    title: "DevOps / Cloud",
    items: ["GCP", "Vercel", "AWS", "GitHub Actions", "Docker", "Sentry"],
  },
  {
    title: "AI tools & integrations",
    items: ["Cursor", "Claude Code", "Codex", "ChatGPT", "OpenAI"],
  },
  {
    title: "CMS / Automation / No-code",
    items: ["Sanity", "Airtable", "Make", "Zapier", "Prismic"],
  },
  {
    title: "Design, development & collaboration",
    items: [
      "Figma",
      "Git",
      "GitHub",
      "Bitbucket",
      "GitLab",
      "Linear",
      "Jira",
      "ClickUp",
      "Asana",
      "Slack",
      "MS Teams",
      "Google Workspace",
    ],
  },
];
