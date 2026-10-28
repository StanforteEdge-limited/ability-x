import { useEffect, useState } from "react";
import { Carousel } from "@/components/react/carousel";
import type { SpeakerQuoteItem } from "@/data/types";

function shuffle<T>(items: T[]) {
  const cloned = [...items];
  for (let index = cloned.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [cloned[index], cloned[swapIndex]] = [cloned[swapIndex], cloned[index]];
  }
  return cloned;
}

export function QuoteCarousel({ quotes: initialQuotes }: { quotes: SpeakerQuoteItem[] }) {
  const [quotes, setQuotes] = useState(initialQuotes);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setQuotes(shuffle(initialQuotes)));
    return () => window.cancelAnimationFrame(frame);
  }, [initialQuotes]);

  return (
    <Carousel
      ariaLabel="Speaker quote carousel"
      slidesPerView={{ base: 1, md: 1, lg: 2 }}
      slideClassName="h-full"
      slides={quotes.map((speaker) => (
        <article
          key={speaker.id}
          className="flex h-full flex-col overflow-hidden rounded-[16px] border border-brand-border bg-white shadow-card md:grid md:grid-cols-[220px_minmax(0,1fr)]"
        >
          <div className="relative min-h-[280px] bg-brand-subtle md:min-h-full">
            <img
              src={speaker.image.src}
              alt={speaker.image.alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
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
  );
}
