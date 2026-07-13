import { Container } from "@/components/layout/container";
import { PlaceholderMedia } from "@/components/ui/placeholder-media";
import { aboutContent } from "@/content/about";

export function OrgStorySection() {
  return (
    <section className="section-shell bg-white">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] lg:items-start lg:gap-12">
          <div>
            <p className="kicker">{aboutContent.story.kicker}</p>
            <div className="space-y-5 text-base leading-8 text-brand-muted md:text-[17px]">
              {aboutContent.story.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <PlaceholderMedia
            label={aboutContent.story.image.label}
            description={aboutContent.story.image.description}
            className="min-h-[420px]"
          />
        </div>
      </Container>
    </section>
  );
}
