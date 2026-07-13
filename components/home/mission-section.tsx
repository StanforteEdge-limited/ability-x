import { Container } from "@/components/layout/container";
import { homeContent } from "@/content/home";

export function MissionSection() {
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

        <div className="mx-auto mt-14 grid max-w-[960px] gap-4 md:grid-cols-4 md:grid-rows-2">
          {homeContent.gallery.map((item, index) => {
            const spanClass = index === 0 || index === 5 ? "md:col-span-2" : "";

            return (
              <div
                key={item.id}
                role="img"
                aria-label={item.alt}
                className={`flex min-h-[140px] items-center justify-center rounded-[8px] border-2 border-dashed border-black/15 bg-brand-subtle px-4 ${spanClass}`}
              >
                <span className="text-center text-[11px] font-semibold text-[#8f8f8f]">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
