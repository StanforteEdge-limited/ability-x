import { AskSection } from "@/components/home/ask-section";
import { HeroSection } from "@/components/home/hero-section";
import { MissionSection } from "@/components/home/mission-section";
import { PillarsSection } from "@/components/home/pillars-section";
import { RecapSection } from "@/components/home/recap-section";
import { SpeakersSection } from "@/components/home/speakers-section";
import { StatsSection } from "@/components/home/stats-section";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";

export default function HomePage() {
  return (
    <main>
      <SiteNav active="home" />
      <HeroSection />
      <MissionSection />
      <StatsSection />
      <RecapSection />
      <PillarsSection />
      <AskSection />
      <SpeakersSection />
      <SiteFooter links={[{ href: "/events/1.0", label: "Watch 1.0" }, { href: "#ask", label: "Partner With Us" }]} />
    </main>
  );
}
