import { EventHeader } from "@/components/event/event-header";
import { EventMediaTabs } from "@/components/event/event-media-tabs";
import { Container } from "@/components/layout/container";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";
import { AnimatedStatValue } from "@/components/ui/animated-stat-value";
import { awards } from "@/content/awards";
import { eventOneContent } from "@/content/event-1-0";
import { galleryImages } from "@/content/gallery";
import { allSessions } from "@/content/sessions";
import { speakers } from "@/content/speakers";
import { stats } from "@/content/stats";

export default function EventOnePage() {
  const highlightedStat = stats.find(
    (stat) => stat.label === "Breakout and Plenary Sessions",
  );
  const secondaryStats = stats.filter(
    (stat) => stat.label !== "Breakout and Plenary Sessions",
  );

  return (
    <main className="bg-white">
      <SiteNav active="event-1-0" />
      <EventHeader />

      <section className="bg-white px-5 py-16 md:px-8 lg:px-20 lg:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)] lg:items-center">
            <div>
              <p className="kicker">{eventOneContent.overview.kicker}</p>
              <h2 className="mt-4 font-display text-[30px] font-black tracking-[-0.03em] text-brand-black md:text-[42px]">
                {eventOneContent.overview.title}
              </h2>
              <div className="mt-5 space-y-2 text-sm font-semibold uppercase tracking-[0.08em] text-brand-muted">
                <p>{eventOneContent.overview.theme}</p>
                <p>{eventOneContent.overview.dateVenue}</p>
                <p>{eventOneContent.overview.convenedBy}</p>
              </div>
              <p className="mt-5 max-w-3xl text-[17px] leading-8 text-brand-muted">
                {eventOneContent.overview.body}
              </p>
              <div className="mt-8 space-y-4">
                {eventOneContent.overview.bullets.map((bullet) => (
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
                    <p className="mt-2 text-sm leading-6 text-brand-muted">
                      {highlightedStat.label}
                    </p>
                  </article>
                </div>
              ) : null}

              <div className="flex flex-wrap justify-center gap-4">
                {secondaryStats.slice(0, 2).map((stat) => (
                  <article
                    key={stat.label}
                    className="min-w-[150px] flex-1 rounded-[16px] border border-brand-border bg-brand-subtle p-5 text-center shadow-card xl:max-w-[220px]"
                  >
                    <p className="font-display text-[28px] font-black tracking-[-0.03em] text-brand-black">
                      <AnimatedStatValue value={stat.value} />
                    </p>
                    <p className="mt-2 text-sm leading-6 text-brand-muted">
                      {stat.label}
                    </p>
                  </article>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                {secondaryStats.slice(2).map((stat) => (
                  <article
                    key={stat.label}
                    className="min-w-[150px] flex-1 rounded-[16px] border border-brand-border bg-brand-subtle p-5 text-center shadow-card xl:max-w-[220px]"
                  >
                    <p className="font-display text-[28px] font-black tracking-[-0.03em] text-brand-black">
                      <AnimatedStatValue value={stat.value} />
                    </p>
                    <p className="mt-2 text-sm leading-6 text-brand-muted">
                      {stat.label}
                    </p>
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
              <article
                key={award.category}
                className="overflow-hidden rounded-[16px] border border-brand-border bg-white shadow-card"
              >
                <div className="relative flex min-h-[180px] items-center justify-center bg-brand-subtle">
                  <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-brand-red text-white">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M12 3l2.1 4.26 4.7.69-3.4 3.3.8 4.67L12 13.8 7.8 15.92l.8-4.67-3.4-3.3 4.7-.69L12 3Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-muted">
                    Winner image placeholder
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-brand-red">
                    {award.category}
                  </p>
                  <h3 className="mt-4 font-display text-[22px] font-bold tracking-[-0.02em] text-brand-black">
                    {award.recipient}
                  </h3>
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
              <p className="kicker">{eventOneContent.highlight.kicker}</p>
              <h2 className="mt-4 font-display text-[30px] font-black tracking-[-0.03em] text-brand-black md:text-[42px]">
                {eventOneContent.highlight.title}
              </h2>
              <p className="mt-5 max-w-[520px] text-[17px] leading-8 text-brand-muted">
                {eventOneContent.highlight.body}
              </p>
              <a
                href={eventOneContent.highlight.channelHref}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex rounded-full bg-brand-red px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark"
              >
                {eventOneContent.highlight.channelLabel}
              </a>
            </div>

            <div className="overflow-hidden rounded-[20px] border border-brand-border bg-black shadow-card">
              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${eventOneContent.highlight.youtubeId}`}
                  title={eventOneContent.highlight.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
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
              Switch between the recording archive, verified speaker roster,
              photo gallery, and press references.
            </p>
          </div>
          <EventMediaTabs
            sessions={allSessions}
            speakers={speakers}
            galleryImages={galleryImages}
            pressRelease={eventOneContent.pressRelease}
          />
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}
