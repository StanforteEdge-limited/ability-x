import Image from "next/image";
import { Container } from "@/components/layout/container";
import { homeContent } from "@/content/home";

export function MissionSection() {
  const imageHeights = [
    "h-[320px]",
    "h-[220px]",
    "h-[280px]",
    "h-[240px]",
    "h-[300px]",
    "h-[240px]",
  ];

  return (
    <section className="section-shell bg-white">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <p className="kicker">{homeContent.mission.kicker}</p>

          <div className="mt-4 space-y-4 text-left text-[18px] leading-[1.65] text-brand-surface md:text-center md:text-[20px]">
            {homeContent.mission.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-6xl columns-1 gap-4 sm:columns-2 xl:columns-3">
          {homeContent.gallery.map((item, index) => (
            <article
              key={item.id}
              className={`group relative mb-4 break-inside-avoid overflow-hidden rounded-[14px] bg-brand-subtle ${imageHeights[index % imageHeights.length]}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end p-4">
                <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-brand-black">
                  {item.label}
                </span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
