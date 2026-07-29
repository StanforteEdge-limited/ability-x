"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageGallery } from "@/components/event/image-gallery";
import { VideoCarousel } from "@/components/event/video-carousel";
import type { GalleryImage, SessionItem, SpeakerItem } from "@/data/types";

type EventMediaTabsProps = {
  galleryImages: GalleryImage[];
  sessions: SessionItem[];
  speakers: SpeakerItem[];
  pressRelease: {
    title: string;
    body: string;
    outlets?: ReadonlyArray<string>;
    items: ReadonlyArray<{
      title: string;
      description: string;
      href?: string;
      label?: string;
    }>;
  };
};

const tabs = [
  { id: "watch", label: "Watch All Sessions" },
  { id: "speakers", label: "Speakers" },
  { id: "gallery", label: "Gallery" },
  { id: "press", label: "Press Release" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function EventMediaTabs({
  galleryImages,
  sessions,
  speakers,
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
        {activeTab === "speakers" ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {speakers.map((speaker) => (
              <article key={speaker.id} className="flex h-full flex-col text-center">
                <div className="relative aspect-square overflow-hidden rounded-[8px] border border-brand-border bg-brand-subtle">
                  <Image
                    src={speaker.image.src}
                    alt={speaker.image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-4 text-[14px] font-semibold text-brand-black">
                  {speaker.name}
                </h3>
                <p className="mt-1 text-[12px] text-[#8f8f8f]">{speaker.role}</p>
              </article>
            ))}
          </div>
        ) : null}
        {activeTab === "gallery" ? <ImageGallery images={galleryImages} /> : null}
        {activeTab === "press" ? (
          <article className="rounded-[16px] border border-brand-border bg-white p-8 shadow-card">
            <h3 className="font-display text-[24px] font-black tracking-[-0.03em] text-brand-black">
              {pressRelease.title}
            </h3>
            <p className="mt-4 max-w-3xl text-[16px] leading-8 text-brand-muted">
              {pressRelease.body}
            </p>
            {pressRelease.outlets ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {pressRelease.outlets.map((outlet) => (
                  <span
                    key={outlet}
                    className="rounded-full border border-brand-border bg-brand-subtle px-4 py-2 text-sm font-semibold text-brand-black"
                  >
                    {outlet}
                  </span>
                ))}
              </div>
            ) : null}
            <div className="mt-8 grid gap-4">
              {pressRelease.items.map((item) => (
                <article key={item.title} className="rounded-[12px] bg-brand-subtle p-5">
                  <h4 className="text-[16px] font-semibold text-brand-black">{item.title}</h4>
                  <p className="mt-2 whitespace-pre-line text-[15px] leading-7 text-brand-muted">{item.description}</p>
                  {item.href && item.label ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex text-sm font-semibold text-brand-red"
                    >
                      {item.label}
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          </article>
        ) : null}
      </div>
    </div>
  );
}
