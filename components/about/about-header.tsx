import { PageBanner } from "@/components/ui/page-banner";
import { aboutContent } from "@/content/about";

export function AboutHeader() {
  return (
    <PageBanner
      imageAlt="AbilityX team and community"
      kicker={aboutContent.header.kicker}
      title={aboutContent.header.title}
      description={aboutContent.header.body}
    />
  );
}
