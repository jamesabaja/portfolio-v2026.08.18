import { AboutMe } from "@/components/about-me";
import { ContactCallout } from "@/components/contact-callout";
import { ContactCta } from "@/components/contact-cta";
import { Faq } from "@/components/faq";
import { Hero } from "@/components/hero";
import { SelectedWork } from "@/components/selected-work";
import { Services } from "@/components/services";
import { SocialProof } from "@/components/social-proof";
import { WhyMe } from "@/components/why-me";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <SocialProof />
      <SelectedWork />
      <WhyMe />
      <ContactCta />
      <Services />
      <AboutMe />
      <Faq />
      <ContactCallout />
    </main>
  );
}
