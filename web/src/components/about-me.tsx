import {
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

import { contactEmail, githubUrl, linkedinUrl } from "@/lib/env";
import { stagger } from "@/lib/motion";

import jamesPhoto from "../../public/james.svg";

const SOCIAL_LINKS = [
  { href: githubUrl, label: "GitHub", icon: GithubLogoIcon, external: true },
  { href: linkedinUrl, label: "LinkedIn", icon: LinkedinLogoIcon, external: true },
  {
    href: contactEmail ? `mailto:${contactEmail}` : "",
    label: "Email",
    icon: EnvelopeSimpleIcon,
    external: false,
  },
] as const;

export function AboutMe() {
  // Each link is dropped rather than rendered dead while its env var is blank,
  // matching how the navbar and hero handle the contact address.
  const links = SOCIAL_LINKS.filter(({ href }) => href);

  return (
    <section className="flex w-full flex-col items-start gap-12 px-6 py-14 sm:px-10 lg:px-20 lg:py-16">
      <div data-reveal className="flex w-full max-w-[812px] flex-col items-start gap-3">
        <p className="text-xs leading-4 font-medium tracking-eyebrow text-warm-gray uppercase">
          A little about me
        </p>
        <h2 className="font-serif text-3xl leading-9 text-espresso">
          Designer&rsquo;s eye. Engineer&rsquo;s mindset.
        </h2>
      </div>

      <div className="flex w-full flex-col items-start gap-12 md:flex-row">
        <div
          data-reveal="left"
          className="group/portrait flex size-[280px] shrink-0 items-center justify-center overflow-clip rounded-[4px] border border-soft-beige shadow-[0px_12px_24px_0px_rgba(0,0,0,0.05)] transition-shadow duration-500 ease-soft hover:shadow-[0px_20px_40px_0px_rgba(0,0,0,0.12)] sm:size-[360px]"
        >
          <Image
            src={jamesPhoto}
            alt="James Gabriel Abaja"
            className="size-full object-cover transition-transform duration-700 ease-soft group-hover/portrait:scale-[1.04]"
            priority={false}
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-start gap-8">
          <p data-reveal style={stagger(1)} className="text-lg leading-7 text-espresso">
            I&rsquo;m James, a product engineer and designer based in Manila. I&rsquo;ve spent the
            past seven years designing and building digital products across healthcare, SaaS,
            retail, and e-commerce.
          </p>
          <p data-reveal style={stagger(2)} className="text-lg leading-7 text-warm-gray">
            I&rsquo;m most comfortable working where product decisions, user experience, and
            engineering meet, especially on complex products that need to feel simple.
          </p>

          <div aria-hidden data-reveal="fade" style={stagger(3)} className="h-px w-14 bg-sand" />

          {links.length > 0 ? (
            <ul data-reveal style={stagger(4)} className="flex items-start gap-4">
              {links.map(({ href, label, icon: Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                    className="block rounded-[4px] text-espresso transition-[color,translate,scale] duration-300 ease-soft outline-none hover:-translate-y-0.5 hover:scale-110 hover:text-burnt-terracotta focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                  >
                    <Icon className="size-6" />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
