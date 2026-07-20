import { PageBanner } from "@/components/ui/page-banner";
import { eventOneContent } from "@/content/event-1-0";

export function EventHeader() {
  return (
    <PageBanner
      imageSrc={eventOneContent.header.imageSrc}
      imageAlt="AbilityX 1.0 event venue"
      kicker={eventOneContent.header.kicker}
      title={eventOneContent.header.title}
      description={eventOneContent.header.body}
    />
  );
}
