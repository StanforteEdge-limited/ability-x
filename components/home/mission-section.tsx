import Image from "next/image";
import { Container } from "@/components/layout/container";
import { homeContent } from "@/content/home";

export function MissionSection() {
  // Grid span classes for each image
  const gridClasses = [
    "md:col-span-2 md:row-span-2", // Image 1 (Featured)
    "",                            // Image 2
    "",                            // Image 3
    "",                            // Image 4
    "",                            // Image 5
    "md:col-span-2",               // Image 6 (Wide)
  ];

  return (
    <section className="section-shell bg-white">
      <Container>
        {/* Section Heading */}
        <div className="mx-auto max-w-4xl text-center">
          <p className="kicker">{homeContent.mission.kicker}</p>

          <div className="mt-4 space-y-4 text-left text-[18px] leading-[1.65] text-brand-surface md:text-center md:text-[20px]">
            {homeContent.mission.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div className="mx-auto mt-14 grid max-w-6xl auto-rows-[220px] grid-cols-1 gap-4 md:grid-cols-4">
          {homeContent.gallery
            .filter((item) => item.src)
            .map((item, index) => (
              <div
                key={item.id}
                className={`group relative overflow-hidden rounded-xl ${gridClasses[index]}`}
              >
                <Image
                  src={item.src!}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw,
                         (max-width: 1024px) 50vw,
                         25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Optional Dark Overlay */}
                <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-black/20" />

                {/* Optional Caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4">
                  <p className="text-sm font-medium text-white">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </Container>
    </section>
  );
}