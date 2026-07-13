import Image from "next/image";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Carousel } from "@/components/ui/carousel";
import { homeContent } from "@/content/home";
import { speakers } from "@/content/speakers";

export function SpeakersSection() {
  return (
    <section className="section-shell bg-white">
      <Container>
        <SectionHeading
          kicker={homeContent.speakers.kicker}
          title={homeContent.speakers.title}
        />
        <div className="mx-auto mt-12 max-w-[1200px]">
          <Carousel
            ariaLabel="Speaker lineup carousel"
            slidesPerView={{ base: 1, lg: 4 }}
            slides={speakers.map((speaker) => (
              <article key={speaker.id} className="text-center">
                <div className="relative aspect-square overflow-hidden rounded-[8px] border border-brand-border bg-brand-subtle">
                  <Image
                    src={speaker.image.src}
                    alt={speaker.image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-4 text-[14px] font-semibold text-brand-black">
                  {speaker.name}
                </h3>
                <p className="mt-1 text-[12px] text-[#8f8f8f]">{speaker.role}</p>
              </article>
            ))}
          />
        </div>
        <p className="mt-8 text-center text-sm text-[#8f8f8f]">{homeContent.speakers.caption}</p>
      </Container>
    </section>
  );
}
