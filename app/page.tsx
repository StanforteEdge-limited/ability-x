"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";
import { Container } from "@/components/layout/container";
import { HeroSection } from "@/components/home/hero-section";
import { SpeakersSection } from "@/components/home/speakers-section";
import { AnimatedStatValue } from "@/components/ui/animated-stat-value";
import { PillButton } from "@/components/ui/pill-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Carousel } from "@/components/ui/carousel";
import { speakerQuotes } from "@/content/quotes";

/* ------------------------------------------------------------------ */
/*  Mission data                                                       */
/* ------------------------------------------------------------------ */

const missionGallery = [
  { id: "gallery-1", label: "1.0 Crowd", alt: "AbilityX 1.0 crowd gathered during a conference session.", src: "/gallery/Crowd.jpg" },
  { id: "gallery-2", label: "Stage", alt: "AbilityX 1.0 stage setup and audience view.", src: "/gallery/stage.jpg" },
  { id: "gallery-3", label: "Panel", alt: "Panel conversation during AbilityX 1.0.", src: "/gallery/Panel.jpg" },
  { id: "gallery-4", label: "Networking", alt: "Attendees networking at AbilityX 1.0.", src: "/gallery/Networking.jpg" },
  { id: "gallery-5", label: "Exhibition Floor", alt: "Attendees and exhibits on the AbilityX 1.0 exhibition floor.", src: "/gallery/Exhibition-floor.jpg" },
  { id: "gallery-6", label: "Speaker Moment", alt: "Speaker moment from AbilityX 1.0.", src: "/gallery/Speaker-moment.jpg" },
];

const missionImageHeights = ["h-[320px]", "h-[220px]", "h-[280px]", "h-[240px]", "h-[300px]", "h-[240px]"];

/* ------------------------------------------------------------------ */
/*  Stats data                                                         */
/* ------------------------------------------------------------------ */

const stats = [
  { value: "500+", label: "Stakeholders engaged, in person and virtually" },
  { value: "1M+", label: "Media reach across national outlets" },
  { value: "10", label: "Breakout sessions across seven sectors" },
  { value: "7", label: "Partner organizations" },
];

/* ------------------------------------------------------------------ */
/*  Impact data                                                        */
/* ------------------------------------------------------------------ */

const impactItems = [
  { title: "Access360", description: "Showcased Access360, a digital platform aggregating disability data at national scale.", href: "https://access360.africa" },
  { title: "State of Disability Inclusion Report", description: "Launched the State of Disability Inclusion Report (2024) by Project Enable Africa." },
  { title: "Employability and Entrepreneurship Clinic", description: "Delivered a real-time Employability and Entrepreneurship Clinic, providing CV reviews and career recommendations to participants." },
  { title: "Disability Research Projects", description: "Commissioned three quarterly disability research projects on access to healthcare, financial services, and education." },
];

/* ------------------------------------------------------------------ */
/*  Pillars data                                                       */
/* ------------------------------------------------------------------ */

const pillars = [
  { number: "01", title: "Inclusive Future Dialogue", description: "High-level plenary convening Africa's most influential leaders to explore AI, data-driven policy, and inclusive digital economies." },
  { number: "02", title: "Innovation Labs", description: "Interactive breakout sessions exploring the future of work, assistive technology, the data revolution, and policy innovation." },
  { number: "03", title: "Research & Evidence Showcase", description: "Groundbreaking research on disability inclusion across health, finance, and key sectors in Africa." },
  { number: "04", title: "AbilityX Impact Awards", description: "Celebrating excellence in technology, innovation, and leadership advancing next-generation disability inclusion." },
];

/* ------------------------------------------------------------------ */
/*  Lead cards data                                                    */
/* ------------------------------------------------------------------ */

const leadCards = [
  { id: "partner", title: "Partner With Us", description: "Sponsor, co-convene, or support AbilityX 2.0. Reach 500+ decision-makers, innovators, and changemakers across Africa's disability inclusion ecosystem.", href: "https://forms.gle/PLACEHOLDER-PARTNER", buttonLabel: "Start a Conversation", featured: true },
  { id: "waitlist", title: "Join the Waitlist", description: "Registration for AbilityX 2.0 opens once dates are confirmed. Be first to know.", href: "https://forms.gle/PLACEHOLDER-WAITLIST", buttonLabel: "Join Waitlist" },
  { id: "exhibit", title: "Exhibit Your Innovation", description: "Showcase your solution to Africa's top disability inclusion stakeholders. Applications open closer to the event.", href: "https://forms.gle/PLACEHOLDER-EXHIBIT", buttonLabel: "Register Interest" },
];

/* ------------------------------------------------------------------ */
/* Speakers Quote                                                     */
function shuffleQuotes() {
  const cloned = [...speakerQuotes];
  for (let index = cloned.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [cloned[index], cloned[swapIndex]] = [cloned[swapIndex], cloned[index]];
  }
  return cloned;
}

/* ================================================================== */
/*  Page                                                               */
/* ================================================================== */

export default function HomePage() {
  const [featured, ...secondary] = leadCards;
  const [quotes, setQuotes] = useState(speakerQuotes);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setQuotes(shuffleQuotes());
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <main>
      <SiteNav active="home" />

      {/* ---- Hero ---- */}
      <HeroSection />

      {/* ---- Mission ---- */}
      <section className="section-shell bg-white">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="kicker">The Movement</p>
            <div className="mt-4 space-y-4 text-left text-[18px] leading-[1.65] text-brand-surface md:text-center md:text-[20px]">
              <p>AbilityX is not just an event. It&apos;s a movement. It&apos;s Nigeria&apos;s leading annual convening focused on the future of disability inclusion - bringing together innovators, policymakers, startups, technologists, donors, civil society, and persons with disabilities to reimagine what inclusive development looks like in Africa.</p>
              <p>AbilityX 1.0 brought that vision to life for the first time in December 2025. This November, we&apos;re back - bigger, and building on everything 1.0 proved was possible.</p>
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-6xl columns-2 gap-4 xl:columns-3">
            {missionGallery.map((item, index) => (
              <article key={item.id} className={`group relative mb-4 break-inside-avoid overflow-hidden rounded-[14px] bg-brand-subtle ${missionImageHeights[index % missionImageHeights.length]}`}>
                <Image src={item.src} alt={item.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end p-4">
                  <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-brand-black">{item.label}</span>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ---- Stats ---- */}
      <section className="relative overflow-hidden py-20 text-white md:py-28">
        <Image src="/abilityx/Extra Pictures/AbilityX-4.jpg" alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-brand-black/85" />
        <Container className="relative">
          <div className="mb-14 text-center">
            <p className="kicker">1.0 By The Numbers</p>
            <h2 className="mt-4 font-display text-[32px] font-black tracking-[-0.02em] text-white md:text-[44px]">
              The proof is already in.
            </h2>
          </div>

          <div className="mx-auto mt-10 grid max-w-[1020px] grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((item) => (
              <article key={item.label} className="rounded-[16px] bg-white/10 p-6 text-center backdrop-blur-sm md:p-7">
                <p className="font-display text-4xl font-black tracking-[-0.03em] text-brand-red md:text-[52px]">
                  <AnimatedStatValue value={item.value} />
                </p>
                <p className="mt-3 text-sm text-white/70 md:text-base">{item.label}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ---- Impact ---- */}
      <section className="section-shell bg-white">
        <Container>
          <div className="mb-12 text-center">
            <p className="kicker">Impact Beyond the Room</p>
            <h2 className="mt-4 font-display text-[28px] font-black tracking-[-0.02em] text-brand-black md:text-[40px]">
              Real deliverables, not just a conference day.
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {impactItems.map((item) => {
              const Card = item.href ? "a" : "article";
              return (
                <Card key={item.title} {...item.href ? { href: item.href, target: "_blank", rel: "noreferrer" } : {}} className={`rounded-[16px] border bg-brand-subtle p-6 shadow-card transition-shadow duration-200 hover:shadow-raised ${item.href ? "border-brand-border cursor-pointer hover:border-brand-red/40" : "border-brand-border"}`}>
                  <h3 className="font-display text-[18px] font-bold tracking-[-0.02em] text-brand-black">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-brand-muted">{item.description}</p>
                  {item.href && <p className="mt-4 text-sm font-semibold text-brand-red">Visit site &rarr;</p>}
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ---- Recap ---- */}
      <section className="section-shell bg-brand-subtle">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-12">
            <div>
              <p className="kicker">Relive 1.0</p>
              <h2 className="mt-4 font-display text-[28px] font-black tracking-[-0.02em] text-brand-black md:text-[40px]">
                The Day That Started It All
              </h2>
              <p className="mt-4 max-w-[440px] text-[17px] leading-[1.65] text-brand-muted">
                AbilityX 1.0 brought together Nigeria&apos;s disability inclusion ecosystem for the first time. Explore the sessions, speakers, and moments that made it happen.
              </p>
              <div className="mt-6">
                <PillButton href="/events/1.0">Explore the Full Event</PillButton>
              </div>
            </div>
            <a href="/events/1.0" className="group block overflow-hidden rounded-[16px] border border-brand-border shadow-card">
              <div className="relative min-h-[280px] md:min-h-[380px]">
                <Image src="/abilityx/Team Photo.jpg" alt="AbilityX 1.0 team photo" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
            </a>
          </div>
        </Container>
      </section>

      {/* ---- Pillars ---- */}
      <section className="section-shell bg-white">
        <Container>
          <SectionHeading kicker="What To Expect" title="Built on four pillars that work." body="AbilityX 2.0 builds on the four pillars that made 1.0 work - now with a full year of momentum behind them." />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => (
              <article key={pillar.number} className="rounded-[8px] border border-brand-border bg-white p-6 shadow-card transition-shadow duration-300 ease-in-out hover:shadow-raised">
                <p className="text-sm font-bold uppercase tracking-[0.12em] text-brand-red">{pillar.number}</p>
                <h3 className="mt-4 font-display text-[24px] font-extrabold leading-tight text-brand-black">{pillar.title}</h3>
                <p className="mt-4 text-sm leading-7 text-brand-muted md:text-base">{pillar.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ---- Ask ---- */}
      <section id="ask" className="section-shell bg-brand-subtle scroll-mt-32">
        <Container>
          <div className="mb-14 text-center">
            <p className="kicker">Join Us</p>
            <h2 className="mt-4 font-display text-[32px] font-black tracking-[-0.02em] text-brand-black md:text-[40px]">
              Three ways to be part of 2.0.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-[1.3fr_1fr_1fr]">
            <article className="rounded-[16px] bg-brand-black p-6 text-white shadow-card md:p-8">
              <h3 className="font-display text-2xl font-black tracking-[-0.03em] text-white">{featured.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/70 md:text-base">{featured.description}</p>
              <div className="mt-6 space-y-3">
                <a href={featured.href} target="_blank" rel="noreferrer" className="inline-flex rounded-full bg-brand-red px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 ease-in-out hover:bg-brand-red-dark">{featured.buttonLabel}</a>
                <p className="text-xs text-white/60">Opens a Google Form in a new tab.</p>
              </div>
            </article>
            {secondary.map((card) => (
              <article key={card.id} className="rounded-[16px] border border-brand-border bg-white p-6 shadow-card md:p-8">
                <h3 className="font-display text-2xl font-black tracking-[-0.03em] text-brand-black">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-brand-muted md:text-base">{card.description}</p>
                <div className="mt-6 space-y-3">
                  <a href={card.href} target="_blank" rel="noreferrer" className="inline-flex rounded-full bg-brand-black px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 ease-in-out hover:bg-brand-surface">{card.buttonLabel}</a>
                  <p className="text-xs text-brand-muted">Opens a Google Form in a new tab.</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ---- Speakers ---- */}
          <section className="section-shell bg-white">
            <Container>
              <SectionHeading kicker="1.0 Speakers" title="Voices that shaped the first edition." />
              <div className="mx-auto mt-12 max-w-[1200px]">
                <Carousel
                  ariaLabel="Speaker quote carousel"
                  slidesPerView={{ base: 1, md: 1, lg: 2 }}
                  slideClassName="h-full"
                  slides={quotes.map((speaker) => (
                    <article key={speaker.id} className="flex h-full flex-col overflow-hidden rounded-[16px] border border-brand-border bg-white shadow-card md:grid md:grid-cols-[220px_minmax(0,1fr)]">
                      <div className="relative min-h-[280px] bg-brand-subtle md:min-h-full">
                        <Image src={speaker.image.src} alt={speaker.image.alt} fill sizes="(max-width: 1024px) 100vw, 220px" className="object-cover" />
                      </div>
                      <div className="flex flex-col justify-between p-6 text-left md:p-8">
                        <p className="font-display text-[22px] font-bold leading-[1.45] text-brand-black md:text-[26px]">
                          &ldquo;{speaker.quote}&rdquo;
                        </p>
                        <div className="mt-6 border-t border-brand-border pt-5">
                          <h3 className="text-[16px] font-semibold text-brand-black">{speaker.name}</h3>
                          <p className="mt-1 text-[13px] leading-6 text-brand-muted">{speaker.title}</p>
                        </div>
                      </div>
                    </article>
                  ))}
                />
              </div>
              <p className="mt-8 text-center text-sm text-[#8f8f8f]">
                Verified quotes from AbilityX 1.0 speakers, pulled directly from the conference report.
              </p>
            </Container>
          </section>

      {/* ---- Footer ---- */}
      <SiteFooter links={[{ href: "/events/1.0", label: "AbilityX 1.0" }, { href: "#ask", label: "Partner With Us" }]} />
    </main>
  );
}
