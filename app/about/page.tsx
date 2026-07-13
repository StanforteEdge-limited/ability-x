import { AboutCtaSection } from "@/components/about/about-cta-section";
import { AboutHeader } from "@/components/about/about-header";
import { AboutStatsSection } from "@/components/about/about-stats-section";
import { OrgStorySection } from "@/components/about/org-story-section";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";

export default function AboutPage() {
  return (
    <main className="bg-white">
      <SiteNav active="about" />
      <AboutHeader />
      <OrgStorySection />
      <AboutStatsSection />
      <AboutCtaSection />
      <SiteFooter />
    </main>
  );
}
