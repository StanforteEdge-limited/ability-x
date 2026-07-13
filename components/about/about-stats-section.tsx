import { Container } from "@/components/layout/container";
import { aboutContent } from "@/content/about";

export function AboutStatsSection() {
  return (
    <section className="section-shell bg-brand-subtle">
      <Container>
        <div className="grid gap-5 md:grid-cols-2">
          {aboutContent.stats.map((stat) => (
            <article key={stat.label} className="rounded-[16px] bg-white p-6 shadow-card md:p-8">
              <p className="font-display text-[36px] font-black tracking-[-0.03em] text-brand-red">
                {stat.value}
              </p>
              <p className="mt-2 text-sm leading-7 text-brand-muted">{stat.label}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
