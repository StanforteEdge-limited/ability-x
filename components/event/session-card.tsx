import Image from "next/image";
import type { SessionItem } from "@/content/types";
import { getYouTubeThumbnailUrl, isPlaceholderYouTubeId } from "@/lib/youtube";

export function SessionCard({
  session,
  onOpen,
}: {
  session: SessionItem;
  onOpen: () => void;
}) {
  return (
    <article className="overflow-hidden rounded-[8px] border border-brand-border bg-white shadow-card">
      <button type="button" onClick={onOpen} className="block w-full text-left">
        <div className="relative h-[120px] overflow-hidden border-b border-brand-border bg-brand-subtle md:h-[150px]">
          {isPlaceholderYouTubeId(session.youtubeId) ? (
            <div className="flex h-full w-full items-center justify-center bg-brand-subtle">
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#8f8f8f]">
                {session.thumbnailLabel}
              </span>
            </div>
          ) : (
            <Image
              src={getYouTubeThumbnailUrl(session.youtubeId)}
              alt={session.thumbnailLabel}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-brand-black">
              Play Video
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-display text-[16px] font-bold text-brand-black">
            {session.title}
          </h3>
          <p className="mt-2 text-[13px] leading-[1.5] text-brand-muted">{session.description}</p>
          <p className="mt-3 text-[12px] font-semibold text-brand-red">Watch on YouTube</p>
        </div>
      </button>
    </article>
  );
}
