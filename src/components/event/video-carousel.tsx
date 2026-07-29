"use client";

import { useState } from "react";
import { Carousel } from "@/components/ui/carousel";
import { Modal } from "@/components/ui/modal";
import { SessionCard } from "@/components/event/session-card";
import type { SessionItem } from "@/data/types";

type VideoCarouselProps = {
  sessions: SessionItem[];
};

export function VideoCarousel({ sessions }: VideoCarouselProps) {
  const [selectedSession, setSelectedSession] = useState<SessionItem | null>(
    null,
  );

  const slides = sessions.map((session) => (
    <SessionCard
      key={session.id}
      session={session}
      onOpen={() => setSelectedSession(session)}
    />
  ));

  return (
    <>
      <Carousel
        slides={slides}
        ariaLabel="All event videos"
        slidesPerView={{ base: 1, lg: 3 }}
        slideClassName="px-2"
      />

      <Modal
        open={selectedSession !== null}
        onClose={() => setSelectedSession(null)}
        title={selectedSession?.title ?? ""}
      >
        {selectedSession && (
          <div className="aspect-video w-full">
            <iframe
              src={`https://www.youtube.com/embed/${selectedSession.youtubeId}`}
              title={selectedSession.title}
              className="h-full w-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </Modal>
    </>
  );
}
