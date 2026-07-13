import { Container } from "@/components/layout/container";
import { PillButton } from "@/components/ui/pill-button";
import { PlaceholderMedia } from "@/components/ui/placeholder-media";
import { Carousel } from "@/components/ui/carousel";
import { homeContent } from "@/content/home";
import { recapVideos } from "@/content/recap-videos";

export function RecapSection() {
  return (
    <section className="section-shell bg-brand-subtle">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-12">
          <div>
            <p className="kicker">{homeContent.recap.kicker}</p>
            <h2 className="mt-4 font-display text-[28px] font-black tracking-[-0.02em] text-brand-black md:text-[40px]">
              {homeContent.recap.title}
            </h2>
            <p className="mt-4 max-w-[440px] text-[17px] leading-[1.65] text-brand-muted">
              {homeContent.recap.body}
            </p>
            <div className="mt-6">
              <PillButton href={homeContent.recap.cta.href}>{homeContent.recap.cta.label}</PillButton>
            </div>
          </div>
          <Carousel
            ariaLabel="Recap videos carousel"
            slidesPerView={{ base: 1 }}
            slides={recapVideos.map((video) => (
              <PlaceholderMedia
                key={video.id}
                label={video.label}
                description={video.description}
                className="min-h-[280px] md:min-h-[360px]"
              />
            ))}
          />
        </div>
      </Container>
    </section>
  );
}
