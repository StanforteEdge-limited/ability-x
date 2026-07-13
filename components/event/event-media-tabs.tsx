"use client";

import { useState } from "react";
import { ImageGallery } from "@/components/event/image-gallery";
import { VideoCarousel } from "@/components/event/video-carousel";
import type { GalleryImage, SessionItem } from "@/content/types";

type EventMediaTabsProps = {
  galleryImages: GalleryImage[];
  sessions: SessionItem[];
  pressRelease: {
    title: string;
    body: string;
  };
};

const tabs = [
  { id: "watch", label: "Watch All Sessions" },
  { id: "gallery", label: "Gallery" },
  { id: "press", label: "Press Release" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function EventMediaTabs({
  galleryImages,
  sessions,
  pressRelease,
}: EventMediaTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("watch");

  return (
    <div>
      <div className="flex flex-wrap gap-3 border-b border-brand-border pb-4">
        {tabs.map((tab) => {
          const active = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={active
                ? "rounded-full bg-brand-black px-5 py-2.5 text-sm font-semibold text-white"
                : "rounded-full border border-brand-border bg-white px-5 py-2.5 text-sm font-semibold text-brand-muted transition-colors hover:text-brand-black"}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        {activeTab === "watch" ? <VideoCarousel sessions={sessions} /> : null}
        {activeTab === "gallery" ? <ImageGallery images={galleryImages} /> : null}
        {activeTab === "press" ? (
          <article className="rounded-[16px] border border-brand-border bg-white p-8 shadow-card">
            <h3 className="font-display text-[24px] font-black tracking-[-0.03em] text-brand-black">
              {pressRelease.title}
            </h3>
            <p className="mt-4 max-w-3xl text-[16px] leading-8 text-brand-muted">
              {pressRelease.body}
            </p>
          </article>
        ) : null}
      </div>
    </div>
  );
}
