import { PageBanner } from "@/components/ui/page-banner";
import { partnerContent } from "@/content/partner";

export function PartnerHeader() {
  return (
    <PageBanner
      imageAlt="AbilityX partnership opportunities"
      kicker={partnerContent.header.kicker}
      title={partnerContent.header.title}
      description={partnerContent.header.body}
    />
  );
}
