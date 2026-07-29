"use client";

import { useState } from "react";
import { Carousel } from "@/components/ui/carousel";
import { Modal } from "@/components/ui/modal";
import { SessionCard } from "@/components/event/session-card";
import { getYouTubeEmbedUrl, isPlaceholderYouTubeId } from "@/lib/youtube";
import type { SessionItem, SessionTrack } from "@/data/types";

export function WatchTrackCarousel({ track }: { track: SessionTrack }) {
  const [selectedSession, setSelectedSession] = useState<SessionItem | null>(null);

  return (
    <>
      <Carousel
        ariaLabel={`${track.title} session carousel`}
        slidesPerView={{ base: 1, lg: 3 }}
        slides={track.sessions.map((session) => (
          <SessionCard
            key={session.id}
            session={session}
            onOpen={() => setSelectedSession(session)}
          />
        ))}
      />

      <Modal
        open={selectedSession !== null}
        title={selectedSession?.title ?? "Session video"}
        onClose={() => setSelectedSession(null)}
      >
        {selectedSession ? (
          <div>
            {isPlaceholderYouTubeId(selectedSession.youtubeId) ? (
              <div className="flex aspect-video items-center justify-center rounded-[12px] border-2 border-dashed border-black/15 bg-brand-subtle text-center">
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#8f8f8f]">
                    YouTube Video Placeholder
                  </p>
                  <p className="mt-2 text-sm text-brand-muted">
                    Replace this placeholder with the real YouTube video ID when the final session links are available.
                  </p>
                </div>
              </div>
            ) : (
              <div className="aspect-video overflow-hidden rounded-[12px] bg-brand-black">
                <iframe
                  src={getYouTubeEmbedUrl(selectedSession.youtubeId)}
                  title={selectedSession.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            )}
            <p className="mt-4 text-sm leading-7 text-brand-muted md:text-base">
              {selectedSession.description}
            </p>
          </div>
        ) : null}
      </Modal>
    </>
  );
}
