import Image from "next/image";
import { Container } from "@/components/layout/container";
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
          <div className="relative min-h-[420px] overflow-hidden rounded-[16px] bg-brand-subtle shadow-card">
            <Image
              src={aboutContent.story.image.src}
              alt={aboutContent.story.image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 420px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className="rounded-[16px] border border-brand-border bg-brand-subtle p-6 shadow-card md:p-8">
            <p className="kicker">Vision</p>
            <p className="mt-4 text-[17px] leading-8 text-brand-surface">{aboutContent.vision}</p>
          </article>
          <article className="rounded-[16px] border border-brand-border bg-brand-subtle p-6 shadow-card md:p-8">
            <p className="kicker">Mission</p>
            <p className="mt-4 text-[17px] leading-8 text-brand-surface">{aboutContent.mission}</p>
          </article>
        </div>

        <div className="mt-12 rounded-[16px] border border-brand-border bg-white p-6 shadow-card md:p-8">
          <p className="kicker">Core Objectives</p>
          <div className="mt-6 flex flex-wrap gap-4">
            {aboutContent.objectives.map((objective) => (
              <article key={objective.title} className="min-w-[220px] flex-1 rounded-[12px] bg-brand-subtle p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-red-soft text-brand-red">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 4.5 14.7 9l5 .73-3.6 3.5.85 4.95L12 15.8l-4.95 2.38.85-4.95-3.6-3.5 5-.73L12 4.5Z" fill="currentColor" />
                  </svg>
                </div>
                <h3 className="mt-4 text-base font-semibold text-brand-black">{objective.title}</h3>
                <p className="mt-2 text-sm leading-7 text-brand-muted">{objective.description}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
