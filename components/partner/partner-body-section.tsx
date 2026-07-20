import { Container } from "@/components/layout/container";
import { AnimatedStatValue } from "@/components/ui/animated-stat-value";
import { stats } from "@/content/stats";
import { partnerContent } from "@/content/partner";
import { PartnerInquiryForm } from "./partner-inquiry-form";

export function PartnerBodySection() {
  return (
    <section className="section-shell bg-white">
      <Container>
        <div className="grid gap-10 xl:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] xl:gap-12">
          <div>
            <p className="kicker">{partnerContent.pitch.kicker}</p>
            <h2 className="mt-4 font-display text-[34px] font-black tracking-[-0.03em] text-brand-black md:text-[48px]">
              {partnerContent.pitch.title}
            </h2>
            <div className="mt-8 space-y-5">
              {partnerContent.pitch.benefits.map((benefit) => (
                <div key={benefit.number} className="flex items-start gap-4 border-b border-brand-border py-[22px] first:pt-0 last:border-b-0 last:pb-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-red-soft font-display text-[15px] font-extrabold text-brand-red">
                    {benefit.number}
                  </div>
                  <p className="pt-1.5 text-[16px] leading-[1.6] text-brand-surface">{benefit.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              {stats.map((stat) => (
                <article key={stat.label} className="min-w-[140px] flex-1 rounded-[12px] bg-brand-subtle p-4 text-center xl:max-w-[180px]">
                  <p className="font-display text-[28px] font-black tracking-[-0.03em] text-brand-black">
                    <AnimatedStatValue value={stat.value} />
                  </p>
                  <p className="mt-1.5 text-[12px] text-brand-muted">
                    {stat.label}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <PartnerInquiryForm />
        </div>
      </Container>
    </section>
  );
}
