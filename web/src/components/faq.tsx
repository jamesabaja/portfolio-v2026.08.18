import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    question: "Are you a designer or a developer?",
    answer:
      "Both. I work where product design and engineering overlap, so I can help define the experience, design the interface, and build it into a working product. Keeping those disciplines connected means fewer handoffs, clearer decisions, and an end result that stays true to its original intent.",
  },
  {
    question: "What kinds of projects do you work on?",
    answer:
      "I design and build landing pages, business websites, web applications, internal tools, and focused iOS apps. I’m especially interested in products that simplify a complex process, improve an existing experience, or help a business work more effectively.",
  },
  {
    question: "Can you improve an existing website or application?",
    answer:
      "Yes. Not every project needs to start over. I can work within an existing product to refine the interface, improve usability, fix frontend issues, add functionality, optimize performance, or modernize specific parts of the experience.",
  },
  {
    question: "Will I be working with you directly?",
    answer:
      "Yes. I lead every engagement personally, from initial discovery through design, development, and delivery. If a project requires expertise outside my scope, I may bring in a trusted collaborator, but I remain your main point of contact and accountable for the work.",
  },
  {
    question: "Can you work with our existing technology stack?",
    answer:
      "Usually, yes. You can browse my Stack page for the technologies I currently use, but I’m not tied to one fixed setup. I can work within an established stack when it makes sense or recommend an approach based on the product’s users, workflows, data, and long-term needs.",
  },
  {
    question: "What does your process look like?",
    answer:
      "I work through five flexible phases: discovery, design, development, deployment, and post-launch support. Each phase has a clear purpose and deliverable, so you always know what is being worked on, what comes next, and where decisions need your input.",
  },
  {
    question: "What happens after the product launches?",
    answer:
      "I stay involved through launch to handle final testing, deployment, performance checks, documentation, and handover. The first month of post-launch support is included for new Flyt projects, with flexible ongoing support available for monitoring, fixes, and smaller improvements afterward.",
  },
  {
    question: "Are you open to full-time opportunities as well as independent projects?",
    answer:
      "Yes. I’m currently open to fully remote product engineering, frontend, full-stack, and design-focused roles. I also take on selected independent projects when the problem, scope, and working arrangement are a good fit.",
  },
  {
    question: "Do you work with clients outside the Philippines?",
    answer:
      "Yes. I’m based in Manila, but I work comfortably with clients and teams across different countries and time zones. I’m used to remote collaboration, clear documentation, asynchronous communication, and scheduling important conversations around shared availability.",
  },
  {
    question: "Can I hire you for design, development, or both?",
    answer:
      "Yes. I can handle product or website design on its own, develop an existing design, or take the entire project from early direction through design, development, and deployment. I also provide maintenance, targeted updates, and ongoing improvements for existing websites and applications.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "A focused landing page typically takes 2–3 weeks, while a multi-page business website usually takes 4–8 weeks. Custom web and mobile applications vary depending on their features, integrations, and overall complexity. Once the scope is clear, I’ll provide a realistic timeline with defined milestones.",
  },
  {
    question: "How much does a project cost?",
    answer:
      "Every project is scoped individually because the requirements, complexity, and level of support can vary significantly. After an initial conversation, I’ll provide a clear proposal outlining the recommended approach, deliverables, timeline, and total cost before any work begins.",
  },
] as const;

export function Faq() {
  return (
    <section className="flex w-full flex-col items-start gap-12 px-6 py-14 sm:px-10 lg:px-20 lg:py-16">
      <div data-reveal className="flex w-full max-w-[720px] flex-col items-start gap-3">
        <p className="text-xs leading-4 font-medium tracking-eyebrow text-warm-gray uppercase">
          Frequently asked questions
        </p>
        <h2 className="font-serif text-3xl leading-9 text-espresso">Your questions? Answered.</h2>
        <p className="text-base leading-6 text-espresso">
          Everything you need to know about my experience, process, availability, and ways of
          working.
        </p>
      </div>

      <Accordion data-reveal>
        {FAQS.map(({ question, answer }) => (
          <AccordionItem key={question} value={question}>
            <AccordionTrigger>{question}</AccordionTrigger>
            <AccordionPanel>{answer}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
