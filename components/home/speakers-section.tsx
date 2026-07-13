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
                <div
                  role="img"
                  aria-label={`Placeholder image for ${speaker.name}.`}
                  className="aspect-square rounded-[8px] border-2 border-dashed border-black/15 bg-brand-subtle"
                />
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
