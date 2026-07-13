import { Container } from "@/components/layout/container";
import { PillButton } from "@/components/ui/pill-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { aboutContent } from "@/content/about";

export function AboutCtaSection() {
  return (
    <section className="section-shell bg-white">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading kicker={aboutContent.cta.kicker} title={aboutContent.cta.title} />
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {aboutContent.cta.actions.map((action) => (
              <PillButton
                key={action.label}
                href={action.href}
                variant={action.variant}
                className="px-8 py-4"
              >
                {action.label}
              </PillButton>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
