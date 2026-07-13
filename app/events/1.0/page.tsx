import { EventHeader } from "@/components/event/event-header";
import { EventMediaTabs } from "@/components/event/event-media-tabs";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";
import { Container } from "@/components/layout/container";
import { eventOneContent } from "@/content/event-1-0";
import { allSessions } from "@/content/sessions";
import { speakers } from "@/content/speakers";
import { galleryImages } from "@/content/gallery";
import { stats } from "@/content/stats";

export default function EventOnePage() {
  return (
    <main className="bg-white">
      <SiteNav active="event-1-0" />
      <EventHeader />

      <section className="bg-white px-5 py-16 md:px-8 lg:px-20 lg:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)] lg:items-start">
            <div>
              <p className="kicker">{eventOneContent.overview.kicker}</p>
              <h2 className="mt-4 font-display text-[30px] font-black tracking-[-0.03em] text-brand-black md:text-[42px]">
                {eventOneContent.overview.title}
              </h2>
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

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
              {stats.map((stat) => (
                <article key={stat.label} className="rounded-[16px] border border-brand-border bg-brand-subtle p-5 shadow-card">
                  <p className="font-display text-[28px] font-black tracking-[-0.03em] text-brand-black">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-brand-muted">{stat.label}</p>
                </article>
              ))}
            </div>
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
              Switch between the full replay archive, gallery moments, and press-ready content.
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
