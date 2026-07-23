import Image from "next/image";
import { Container } from "@/components/layout/container";
import { PageBanner } from "@/components/ui/page-banner";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";

const benefits = [
  { number: "01", text: "Visibility: Partners gain prominent, contextualised brand placement across every AbilityX 2026 touchpoint - from stage to media to digital." },
  { number: "02", text: "Influence: Lead Partners and Innovation Partners have a genuine seat at the programme design table, shaping the agenda itself." },
  { number: "03", text: "Innovation: Partners align their brand with cutting-edge assistive technology and inclusive design showcased throughout the forum." },
  { number: "04", text: "Talent Access: The Employment Accelerator session builds a direct, facilitated pipeline between employers and qualified PWD candidates." },
  { number: "05", text: "Measurable Impact: The AbilityX partnership provides documented, credible evidence of a meaningful DEI commitment - backed by data, not just a logo." },
  { number: "06", text: "Media Integration: Partners are woven into the media programme itself - senior representatives are positioned as interview subjects and thought leaders, not background logos." },
];

const experienceItems = [
  { title: "High-Level Plenary", description: "Sets the tone with bold keynotes and a live Partnership Compact ceremony, where organisations sign binding inclusion commitments on stage." },
  { title: "Masterclass Clinics", description: "Three intimate 45-minute deep-dives led by world-class practitioners on Inclusive UX Design, Disability-Confident Leadership, and Data Storytelling for Advocacy." },
  { title: "Breakout Labs", description: "Four parallel tracks built on co-design methodology - not just panels, but live collaboration sessions producing tangible outputs." },
  { title: "AI & Tech Experience Room", description: "A fully immersive, hands-on showcase of cutting-edge assistive and inclusive innovation. Not a vendor floor - a curated, facilitated experience designed to shift mindsets and inspire replication." },
  { title: "Impact Awards", description: "Recognising excellence in disability-inclusive innovation, leadership, and partnership across five categories." },
  { title: "Exhibition & Networking", description: "An open exhibition floor showcasing organisations, social enterprises, and innovators with proven, scalable solutions for disability inclusion." },
];

export default function PartnerPage() {
  return (
    <main className="bg-white">
      <SiteNav active="partner" />

      <PageBanner
        imageSrc="/abilityx/Team Photo.jpg"
        imageAlt="AbilityX partnership opportunities"
        kicker="Partnership"
        title="Back AbilityX 2.0"
        description="500+ stakeholders. 7 partner organizations. 1M+ media reach. One movement - and it's growing. Join us as a partner for AbilityX 2.0."
      />

      <section className="section-shell bg-white">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
            <div>
              <p className="kicker">Why Partner With AbilityX 2026</p>
              <h2 className="mt-4 font-display text-[24px] font-black tracking-[-0.03em] text-brand-black md:text-[44px]">
                A single platform delivering brand visibility, policy influence, innovation access, and a direct talent pipeline - with credible, documented DEI impact.
              </h2>
            </div>

            <article className="rounded-[16px] border border-brand-border bg-brand-subtle p-6 md:p-8">
              <h3 className="font-display text-[28px] font-black tracking-[-0.03em] text-brand-black">Get in touch</h3>
              <p className="mt-4 text-[16px] leading-7 text-brand-muted">
                We welcome a conversation on how a partnership can be tailored to your organisation&apos;s DEI, brand, and business development goals.
              </p>
              <div className="mt-6 rounded-[14px] border border-brand-border bg-white p-5">
                <a href="mailto:damilare@projectenable.africa" className="text-[17px] font-semibold text-brand-red underline decoration-brand-red/30 underline-offset-4 hover:decoration-brand-red">
                  damilare@projectenable.africa
                </a>
                <p className="mt-2 text-sm leading-6 text-brand-muted">Business Development and Partnerships Lead, Project Enable Africa</p>
              </div>
            </article>
          </div>
        </Container>
      </section>

      <section className="section-shell bg-brand-subtle">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
            <div>
              <p className="kicker">Benefits</p>
              <h2 className="mt-4 font-display text-[30px] font-black tracking-[-0.03em] text-brand-black md:text-[38px]">
                Why AbilityX works for partners
              </h2>
              <div className="mt-8 space-y-5">
                {benefits.map((benefit) => (
                  <div key={benefit.number} className="flex items-start gap-4 border-b border-brand-border py-[22px] first:pt-0 last:border-b-0 last:pb-0">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-red-soft font-display text-[15px] font-extrabold text-brand-red">
                      {benefit.number}
                    </div>
                    <p className="pt-1.5 text-[16px] leading-[1.6] text-brand-surface">{benefit.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="kicker">The AbilityX 2026 Experience</p>
              <h2 className="mt-4 font-display text-[30px] font-black tracking-[-0.03em] text-brand-black md:text-[38px]">
                A redesigned, higher-impact format - built for co-creation, not just attendance.
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {experienceItems.map((item) => (
                  <article key={item.title} className="rounded-[16px] border border-brand-border bg-white p-5 shadow-card">
                    <h3 className="font-display text-[18px] font-bold tracking-[-0.02em] text-brand-black">{item.title}</h3>
                    <p className="mt-2 text-[15px] leading-7 text-brand-muted">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-shell bg-white">
        <Container>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { src: "/abilityx/Stage.jpg", alt: "Main stage at AbilityX" },
              { src: "/abilityx/Panel.jpg", alt: "Panel discussion at AbilityX" },
              { src: "/abilityx/Exhibition Floor.jpg", alt: "Exhibition floor at AbilityX" },
              { src: "/abilityx/Speaker Moment.jpg", alt: "Speaker moment at AbilityX" },
            ].map((image) => (
              <div key={image.src} className="relative min-h-[180px] overflow-hidden rounded-[12px] border border-brand-border md:min-h-[240px]">
                <Image src={image.src} alt={image.alt} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}
