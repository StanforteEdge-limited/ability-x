import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";
import { PartnerBodySection } from "@/components/partner/partner-body-section";
import { PartnerHeader } from "@/components/partner/partner-header";

export default function PartnerPage() {
  return (
    <main className="bg-white">
      <SiteNav active="partner" />
      <PartnerHeader />
      <PartnerBodySection />
      <SiteFooter />
    </main>
  );
}
