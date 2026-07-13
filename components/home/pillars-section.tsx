import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { homeContent } from "@/content/home";

export function PillarsSection() {
  return (
    <section className="section-shell bg-white">
      <Container>
        <SectionHeading
          kicker={homeContent.pillarsIntro.kicker}
          title={homeContent.pillarsIntro.title}
          body={homeContent.pillarsIntro.body}
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          {homeContent.pillars.map((pillar) => (
            <article
              key={pillar.number}
              className="rounded-[8px] border border-brand-border bg-white p-6 shadow-card transition-shadow duration-300 ease-in-out hover:shadow-raised"
            >
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-brand-red">
                {pillar.number}
              </p>
              <h3 className="mt-4 font-display text-[24px] font-extrabold leading-tight text-brand-black">
                {pillar.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-brand-muted md:text-base">
                {pillar.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
