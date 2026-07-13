import { EventHeader } from "@/components/event/event-header";
import { ImageGallery } from "@/components/event/image-gallery";
import { VideoCarousel } from "@/components/event/video-carousel";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";
import { Container } from "@/components/layout/container";
import { allSessions } from "@/content/sessions";
import { galleryImages } from "@/content/gallery";

export default function EventOnePage() {
  return (
    <main className="bg-white">
      <SiteNav active="event-1-0" />
      <EventHeader />

      <section className="bg-white px-5 py-16 md:px-8 lg:px-20 lg:py-16">
        <Container>
          <div className="mb-8">
            <h2 className="font-display text-[28px] font-bold tracking-[-0.02em] md:text-[36px]">
              Watch All Sessions
            </h2>
            <p className="mt-2 text-base text-black/60">
              Relive the best moments from AbilityX 1.0
            </p>
          </div>
          <VideoCarousel sessions={allSessions} />
        </Container>
      </section>

      <section className="bg-brand-subtle px-5 py-16 md:px-8 lg:px-20 lg:py-16">
        <Container>
          <div className="mb-8">
            <h2 className="font-display text-[28px] font-bold tracking-[-0.02em] md:text-[36px]">
              Event Gallery
            </h2>
            <p className="mt-2 text-base text-black/60">
              Moments captured at AbilityX 1.0
            </p>
          </div>
          <ImageGallery images={galleryImages} />
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}
