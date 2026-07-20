"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Carousel } from "@/components/ui/carousel";
import { homeContent } from "@/content/home";
import { speakerQuotes } from "@/content/quotes";

function shuffleQuotes() {
  const cloned = [...speakerQuotes];

  for (let index = cloned.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [cloned[index], cloned[swapIndex]] = [cloned[swapIndex], cloned[index]];
  }

  return cloned;
}

export function SpeakersSection() {
  const [quotes, setQuotes] = useState(speakerQuotes);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setQuotes(shuffleQuotes());
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="section-shell bg-white">
      <Container>
        <SectionHeading
          kicker={homeContent.speakers.kicker}
          title={homeContent.speakers.title}
        />
        <div className="mx-auto mt-12 max-w-[1200px]">
          <Carousel
            ariaLabel="Speaker quote carousel"
            slidesPerView={{ base: 1, md: 1, lg: 2 }}
            slideClassName="h-full"
            slides={quotes.map((speaker) => (
              <article key={speaker.id} className="flex h-full flex-col overflow-hidden rounded-[16px] border border-brand-border bg-white shadow-card md:grid md:grid-cols-[220px_minmax(0,1fr)]">
                <div className="relative min-h-[280px] bg-brand-subtle md:min-h-full">
                  <Image
                    src={speaker.image.src}
                    alt={speaker.image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 220px"
                    className="object-cover"
                  />
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
        <p className="mt-8 text-center text-sm text-[#8f8f8f]">{homeContent.speakers.caption}</p>
      </Container>
    </section>
  );
}
