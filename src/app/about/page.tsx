import Image from "next/image";
import { Container } from "@/components/layout/container";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";
import { PageBanner } from "@/components/ui/page-banner";
import { AnimatedStatValue } from "@/components/ui/animated-stat-value";
import { PillButton } from "@/components/ui/pill-button";
import { SectionHeading } from "@/components/ui/section-heading";

const storyParagraphs = [
  "Globally, more than 1 billion people - approximately 15% of the world's population - live with some form of disability. In Nigeria, an estimated 35 million persons with disabilities face compounding barriers: inaccessible infrastructure, limited access to education and healthcare, social stigma, and high unemployment. Despite the 2018 enactment of Nigeria's Discrimination Against Persons with Disabilities (Prohibition) Act, implementation remains slow and inconsistent.",
  "AbilityX was born from the transformation of the Disability Inclusion and Leadership (DIAL) Forum - now in its sixth year - into a bolder, next-generation platform for disability inclusion discourse and leadership in Africa. Convened by Project Enable Africa, AbilityX is Nigeria's premier annual conference on the future of disability inclusion: a community-owned, partnership-driven ecosystem that positions persons with disabilities at the center of innovation and leadership, rather than as subjects of charity.",
  "AbilityX 1.0 launched in December 2025 in Lagos, in partnership with Jobberman Nigeria, convening 500+ stakeholders across government, private sector, civil society, and the disability community. AbilityX 2.0 continues that work this November - deepening the partnership ecosystem and raising the bar on measurable outcomes.",
];

const stats = [
  { value: "1B+", label: "People globally living with disability" },
  { value: "35M", label: "Estimated persons with disabilities in Nigeria" },
  { value: "15%", label: "Share of the world's population living with disability" },
  { value: "500+", label: "Stakeholders convened at AbilityX 1.0" },
];

const objectives = [
  {
    title: "Catalyze Innovation",
    description:
      "Surface practical ideas, tools, and collaborations that advance disability-inclusive innovation in Nigeria and beyond.",
  },
  {
    title: "Drive Policy Transformation",
    description:
      "Turn inclusion commitments into implementation-focused action across institutions, policy conversations, and public systems.",
  },
  {
    title: "Empower Digital Leadership",
    description:
      "Position persons with disabilities as leaders shaping Africa's digital future, not passive beneficiaries of it.",
  },
  {
    title: "Build Strategic Partnerships",
    description:
      "Bring government, private sector, civil society, and the disability community into durable partnership around shared outcomes.",
  },
  {
    title: "Generate Actionable Intelligence",
    description:
      "Translate research, lived experience, and sector evidence into decisions that improve inclusive development practice.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white">
      <SiteNav active="about" />

      <PageBanner
        imageSrc="/Team Photo.jpg"
        imageAlt="AbilityX team and community"
        kicker="About"
        title="A Decade of Advocacy. Now Building the Future."
        description="Who's behind AbilityX, why it exists, and what it is building next."
      />

      <section className="section-shell bg-white">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] lg:items-start lg:gap-12">
            <div>
              <p className="kicker">Project Enable Africa</p>
              <div className="space-y-5 text-base leading-8 text-brand-muted md:text-[17px]">
                {storyParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="relative min-h-[420px] overflow-hidden rounded-[16px] bg-brand-subtle shadow-card">
              <Image
                src="/Team Photo.jpg"
                alt="Project Enable Africa team and community photo."
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <article className="rounded-[16px] border border-brand-border bg-brand-subtle p-6 shadow-card md:p-8">
              <p className="kicker">Vision</p>
              <p className="mt-4 text-[17px] leading-8 text-brand-surface">
                To position Nigeria as a regional leader in disability-inclusive innovation and technology-driven empowerment.
              </p>
            </article>
            <article className="rounded-[16px] border border-brand-border bg-brand-subtle p-6 shadow-card md:p-8">
              <p className="kicker">Mission</p>
              <p className="mt-4 text-[17px] leading-8 text-brand-surface">
                To create a dynamic, youth-focused, community-owned platform that drives cutting-edge solutions, fosters cross-sectoral partnerships, and empowers persons with disabilities as leaders in Africa&apos;s digital transformation.
              </p>
            </article>
          </div>

          <div className="mt-12 rounded-[16px] border border-brand-border bg-white p-6 shadow-card md:p-8">
            <p className="kicker">Core Objectives</p>
            <div className="mt-6 flex flex-wrap gap-4">
              {objectives.map((objective) => (
                <article key={objective.title} className="min-w-[220px] flex-1 rounded-[12px] bg-brand-subtle p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-red-soft text-brand-red">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 4.5 14.7 9 5 .73-3.6 3.5.85 4.95L12 15.8l-4.95 2.38.85-4.95-3.6-3.5 5-.73L12 4.5Z" fill="currentColor" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-brand-black">{objective.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-brand-muted">{objective.description}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="section-shell bg-brand-subtle">
        <Container>
          <div className="flex flex-wrap justify-center gap-5">
            {stats.map((stat) => (
              <article key={stat.label} className="min-w-[180px] flex-1 rounded-[16px] bg-white p-6 shadow-card md:p-8 xl:max-w-[260px]">
                <p className="font-display text-[36px] font-black tracking-[-0.03em] text-brand-red">
                  <AnimatedStatValue value={stat.value} />
                </p>
                <p className="mt-2 text-sm leading-7 text-brand-muted">{stat.label}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-shell bg-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading kicker="Get Involved" title="Ready to be part of what's next?" />
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <PillButton href="/partner" variant="primary" className="px-8 py-4">
                Partner With Us
              </PillButton>
              <PillButton href="/#ask" variant="ghost" className="px-8 py-4">
                Join the Waitlist
              </PillButton>
            </div>
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}
