import { Container } from "@/components/layout/container";
import { AnimatedStatValue } from "@/components/ui/animated-stat-value";
import { aboutContent } from "@/content/about";

export function AboutStatsSection() {
  return (
    <section className="section-shell bg-brand-subtle">
      <Container>
        <div className="flex flex-wrap justify-center gap-5">
          {aboutContent.stats.map((stat) => (
            <article key={stat.label} className="min-w-[180px] flex-1 rounded-[16px] bg-white p-6 shadow-card md:p-8 xl:max-w-[260px]">
              <p className="font-display text-[36px] font-black tracking-[-0.03em] text-brand-red">
                <AnimatedStatValue value={stat.value} />
              </p>
              <p className="mt-2 text-sm leading-7 text-brand-muted">{stat.label}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
