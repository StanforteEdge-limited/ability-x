import { Container } from "@/components/layout/container";
import { PillButton } from "@/components/ui/pill-button";
import { homeContent } from "@/content/home";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-brand-black pt-[96px] text-white md:pt-[112px]">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(255,255,255,0.14),transparent_28%),linear-gradient(180deg,rgba(31,31,31,0.78),rgba(13,13,13,0.92))]"
        role="img"
        aria-label="Hero visual placeholder for full-bleed AbilityX 1.0 crowd or stage photography."
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(31,31,31,0.6) 0%, rgba(13,13,13,0.85) 100%)",
        }}
      />
      <Container className="relative min-h-[760px] lg:min-h-[760px]">
        <div className="flex min-h-[760px] items-end px-5 pb-[72px] pt-16 md:px-8 lg:px-20">
          <div className="max-w-[920px]">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-brand-red" aria-hidden="true" />
              <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-brand-red">
                {homeContent.hero.kicker}
              </p>
            </div>
            <div>
              <h1 className="display-heading max-w-[10ch] text-[38px] leading-none md:text-[64px] lg:text-[80px]">
                {homeContent.hero.title}
              </h1>
              <p className="mt-5 max-w-[520px] text-base leading-7 text-white/70 md:text-[19px]">
                {homeContent.hero.subhead}
              </p>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-white/60">
                {homeContent.hero.tag}
              </p>
              {homeContent.hero.actions.map((action) => (
                <PillButton
                  key={action.label}
                  href={action.href}
                  variant={action.variant}
                  className="px-6 py-3.5"
                >
                  {action.label}
                </PillButton>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
