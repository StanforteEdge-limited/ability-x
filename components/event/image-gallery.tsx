"use client";

import { useState } from "react";
import { Lightbox } from "@/components/ui/lightbox";
import type { GalleryImage } from "@/content/types";

type ImageGalleryProps = {
  images: GalleryImage[];
};

export function ImageGallery({ images }: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => handleImageClick(index)}
            className="mb-4 break-inside-avoid"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt={image.alt}
              className="w-full rounded-lg object-cover transition-transform duration-200 hover:scale-[1.02]"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      <Lightbox
        images={images}
        initialIndex={lightboxIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
