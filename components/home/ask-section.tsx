import { Container } from "@/components/layout/container";
import { homeContent } from "@/content/home";
import { LeadCaptureCard } from "./lead-capture-card";

export function AskSection() {
  const [featured, ...secondary] = homeContent.leadCards;

  return (
    <section id={homeContent.ask.id} className="section-shell bg-brand-subtle scroll-mt-32">
      <Container>
        <div className="mb-14 text-center">
          <p className="kicker">{homeContent.ask.kicker}</p>
          <h2 className="mt-4 font-display text-[32px] font-black tracking-[-0.02em] text-brand-black md:text-[40px]">
            {homeContent.ask.title}
          </h2>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-[1.3fr_1fr_1fr]">
          <LeadCaptureCard card={featured} />
          {secondary.map((card) => (
            <LeadCaptureCard key={card.id} card={card} />
          ))}
        </div>
      </Container>
    </section>
  );
}
