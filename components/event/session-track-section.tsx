import type { SessionTrack } from "@/content/types";
import { WatchTrackCarousel } from "@/components/event/watch-track-carousel";

export function SessionTrackSection({ track }: { track: SessionTrack }) {
  return (
    <section>
      <div className="flex flex-col gap-2 border-b-2 border-brand-black pb-4 md:flex-row md:items-baseline md:justify-start md:gap-4">
        <h2 className="font-display text-[28px] font-black tracking-[-0.03em] text-brand-black md:text-[34px]">
          {track.title}
        </h2>
        <p className="text-[13px] text-brand-muted">
          {track.sessionCountLabel}
        </p>
      </div>
      <div className="mt-7">
        <WatchTrackCarousel track={track} />
      </div>
      <p className="mt-5 text-[13px] text-[#8f8f8f]">
        Sourced from the AbilityX 1.0 live stream - full {track.title} library to be published here.
      </p>
    </section>
  );
}
