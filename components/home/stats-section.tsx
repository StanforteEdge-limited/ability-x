import { Container } from "@/components/layout/container";
import { AnimatedStatValue } from "@/components/ui/animated-stat-value";
import { stats, testimonialPlaceholder } from "@/content/stats";

export function StatsSection() {
  return (
    <section className="section-shell bg-brand-black text-white">
      <Container>
        <div className="mb-14 text-center">
          <p className="kicker">1.0 By The Numbers</p>
          <h2 className="mt-4 font-display text-[32px] font-black tracking-[-0.02em] text-white md:text-[44px]">
            The proof is already in.
          </h2>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {stats.map((item) => (
            <article key={item.label} className="min-w-[160px] flex-1 rounded-[16px] bg-brand-surface p-6 text-center md:p-7 xl:max-w-[220px]">
              <p className="font-display text-4xl font-black tracking-[-0.03em] text-brand-red md:text-[52px]">
                <AnimatedStatValue value={item.value} />
              </p>
              <p className="mt-3 text-sm text-white/65 md:text-base">{item.label}</p>
            </article>
          ))}
        </div>

        <article className="mx-auto mt-16 max-w-[720px] rounded-[16px] border-2 border-dashed border-white/15 bg-brand-surface p-6 text-center md:p-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/40">
            Testimonial - pending client selection
          </p>
          <p className="mt-5 font-display text-[24px] font-bold leading-[1.4] text-white">
            “{testimonialPlaceholder.quote}”
          </p>
          <p className="mt-5 text-sm uppercase tracking-[0.12em] text-white/55">
            {testimonialPlaceholder.attribution}
          </p>
        </article>
      </Container>
    </section>
  );
}
