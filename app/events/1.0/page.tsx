import { EventMediaTabs } from "@/components/event/event-media-tabs";
import { Container } from "@/components/layout/container";
import { PageBanner } from "@/components/ui/page-banner";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";
import { AnimatedStatValue } from "@/components/ui/animated-stat-value";
import { awards } from "@/content/awards";
import { galleryImages } from "@/content/gallery";
import { allSessions } from "@/content/sessions";
import { speakers } from "@/content/speakers";

const stats = [
  { value: "500+", label: "Stakeholders engaged, in person and virtually" },
  { value: "1M+", label: "Media reach across national outlets" },
  { value: "10", label: "Breakout sessions across seven sectors" },
  { value: "7", label: "Partner organizations" },
];

const pressRelease = {
  title: "Press and media references",
  body: "AbilityX 2025 generated pre- and post-event coverage across Nigeria's leading media outlets, with a combined traditional and digital media reach of over 1 million.",
  outlets: ["TVC News", "The Guardian", "The Cable", "Vanguard", "The Sun", "BusinessDay", "New Telegraph", "Independent.ng"],
  items: [
    {
      title: "TheCable citation",
      description: "The report cites TheCable's August 11, 2025 coverage: 'The state of disability inclusion report 2024: Nigeria's reality check.'",
      href: "https://www.thecable.ng/the-state-of-disability-inclusion-report-2024-nigerias-reality-check/",
      label: "Read on TheCable",
    },
    {
      title: "PDF 1 - AbilityX 2025 Press Statement",
      description: "AbilityX 2025 concluded in Lagos on December 2, 2025, bringing together over 300 leaders, policymakers, private-sector executives, innovators, and disability advocates for Nigeria's premier disability leadership conference organised by Project Enable Africa in partnership with Jobberman Nigeria and other strategic partners.\n\nHeld at the Sheraton Hotel, Ikeja, under the theme 'The Future of Disability Inclusion in Nigeria,' the conference explored how technology, data, policy, and innovation can drive sustainable inclusion for persons with disabilities. In his opening remark, Dr. Kolawole Olugbodi emphasized that Nigeria's estimated 30 million persons with disabilities represent a significant, underutilised talent pool and called for deliberate policy reforms, empowerment, and representation.\n\nThe conference featured plenary sessions, breakout discussions, and fireside chats on inclusive data and budgeting, healthcare, finance, media, hospitality, employability, and workplace inclusion. Esther Obele and Oluwajuwonlo Esho highlighted inclusive employment and customer experience as action areas, while Temi Dalley argued in her keynote that inclusion is not optional but a strategic advantage.\n\nA highlight of the conference was the AbilityX Impact Awards, recognising Access Tech Innovation & Research Centre, MTN Nigeria, and Adejobi Adewoye. Closing the event, Olalekan Owonikoko reaffirmed Project Enable Africa's commitment to sustained action, accountability, and collaboration.",
      href: "/media/AbilityX Press Statement (POST).pdf",
      label: "Open PDF 1",
    },
  ],
};

const highlightedStat = stats.find((s) => s.label === "Breakout sessions across seven sectors");
const secondaryStats = stats.filter((s) => s.label !== "Breakout sessions across seven sectors");

export default function EventOnePage() {
  return (
    <main className="bg-white">
      <SiteNav active="event-1-0" />

      <PageBanner
        imageSrc="/gallery/Crowd.jpg"
        imageAlt="AbilityX 1.0 event venue"
        kicker="AbilityX 1.0"
        title="The Conference That Started the Movement"
        description="Revisit the conversations, community moments, and official recordings from AbilityX 1.0."
      />

      <section className="bg-white px-5 py-16 md:px-8 lg:px-20 lg:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)] lg:items-center">
            <div>
              <p className="kicker">Overview</p>
              <h2 className="mt-4 font-display text-[30px] font-black tracking-[-0.03em] text-brand-black md:text-[42px]">
                A landmark first edition for disability inclusion in Nigeria.
              </h2>
              <div className="mt-5 space-y-2 text-sm font-semibold uppercase tracking-[0.08em] text-brand-muted">
                <p>The Future of Disability Inclusion in Nigeria</p>
                <p>December 2, 2025 · Banquet Hall, Sheraton Hotel, Ikeja, Lagos</p>
                <p>Project Enable Africa, in collaboration with Jobberman Nigeria</p>
              </div>
              <p className="mt-5 max-w-3xl text-[17px] leading-8 text-brand-muted">
                AbilityX 1.0 provided a high-level, multi-stakeholder platform to assess Nigeria&apos;s disability inclusion landscape five years after the passage of the national disability law. Across plenary discussions and ten breakout sessions, government actors, private sector leaders, civil society organisations, media practitioners, development partners, and persons with disabilities examined disability inclusion as central to human rights, economic productivity, and institutional effectiveness - and set out a shared call to move from awareness to implementation.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  "500+ stakeholders engaged in person and virtually",
                  "10 breakout sessions across seven sectors",
                  "7 partner organizations across private sector, media, and civil society",
                  "Media reach of 1M+ across Nigeria's leading outlets",
                ].map((bullet) => (
                  <div key={bullet} className="flex items-start gap-3">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-brand-red" />
                    <p className="text-[16px] leading-7 text-brand-surface">{bullet}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex h-full flex-col justify-center gap-4 self-stretch">
              {highlightedStat ? (
                <div className="flex justify-center">
                  <article className="w-full max-w-[320px] rounded-[16px] border border-brand-border bg-brand-subtle p-5 text-center shadow-card">
                    <p className="font-display text-[28px] font-black tracking-[-0.03em] text-brand-black">
                      <AnimatedStatValue value={highlightedStat.value} />
                    </p>
                    <p className="mt-2 text-sm leading-6 text-brand-muted">{highlightedStat.label}</p>
                  </article>
                </div>
              ) : null}
              <div className="flex flex-wrap justify-center gap-4">
                {secondaryStats.slice(0, 2).map((stat) => (
                  <article key={stat.label} className="min-w-[150px] flex-1 rounded-[16px] border border-brand-border bg-brand-subtle p-5 text-center shadow-card xl:max-w-[220px]">
                    <p className="font-display text-[28px] font-black tracking-[-0.03em] text-brand-black">
                      <AnimatedStatValue value={stat.value} />
                    </p>
                    <p className="mt-2 text-sm leading-6 text-brand-muted">{stat.label}</p>
                  </article>
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                {secondaryStats.slice(2).map((stat) => (
                  <article key={stat.label} className="min-w-[150px] flex-1 rounded-[16px] border border-brand-border bg-brand-subtle p-5 text-center shadow-card xl:max-w-[220px]">
                    <p className="font-display text-[28px] font-black tracking-[-0.03em] text-brand-black">
                      <AnimatedStatValue value={stat.value} />
                    </p>
                    <p className="mt-2 text-sm leading-6 text-brand-muted">{stat.label}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white px-5 py-16 md:px-8 lg:px-20 lg:py-16">
        <Container>
          <div className="mb-8">
            <h2 className="font-display text-[28px] font-bold tracking-[-0.02em] md:text-[36px]">
              Awards Presented at AbilityX 1.0
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {awards.map((award) => (
              <article key={award.category} className="overflow-hidden rounded-[16px] border border-brand-border bg-white shadow-card">
                <div className="relative flex min-h-[180px] items-center justify-center bg-brand-subtle">
                  <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-brand-red text-white">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 3l2.1 4.26 4.7.69-3.4 3.3.8 4.67L12 13.8 7.8 15.92l.8-4.67-3.4-3.3 4.7-.69L12 3Z" fill="currentColor" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-muted">Winner image placeholder</span>
                </div>
                <div className="p-6">
                  <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-brand-red">{award.category}</p>
                  <h3 className="mt-4 font-display text-[22px] font-bold tracking-[-0.02em] text-brand-black">{award.recipient}</h3>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brand-subtle px-5 py-16 md:px-8 lg:px-20 lg:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
            <div>
              <p className="kicker">Video Highlight</p>
              <h2 className="mt-4 font-display text-[30px] font-black tracking-[-0.03em] text-brand-black md:text-[42px]">
                Watch the main stage recording.
              </h2>
              <p className="mt-5 max-w-[520px] text-[17px] leading-8 text-brand-muted">
                Start with the flagship main stage session, then explore the full recording archive, gallery, speaker roster, and press references below.
              </p>
              <a href="https://www.youtube.com/@AbilityXconference" target="_blank" rel="noreferrer" className="mt-6 inline-flex rounded-full bg-brand-red px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark">
                Visit the AbilityX channel
              </a>
            </div>
            <div className="overflow-hidden rounded-[20px] border border-brand-border bg-black shadow-card">
              <div className="aspect-video w-full">
                <iframe src="https://www.youtube.com/embed/ECkUf2QPkzQ" title="Watch the main stage recording." className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white px-5 py-16 md:px-8 lg:px-20 lg:py-16">
        <Container>
          <div className="mb-8">
            <h2 className="font-display text-[28px] font-bold tracking-[-0.02em] md:text-[36px]">
              Explore AbilityX 1.0
            </h2>
            <p className="mt-2 text-base text-black/60">
              Switch between the recording archive, verified speaker roster, photo gallery, and press references.
            </p>
          </div>
          <EventMediaTabs sessions={allSessions} speakers={speakers} galleryImages={galleryImages} pressRelease={pressRelease} />
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}
