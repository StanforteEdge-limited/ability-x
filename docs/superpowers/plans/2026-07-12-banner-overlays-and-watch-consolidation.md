# Banner Image Overlays + Watch Page Consolidation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add image backgrounds with dark overlays to all page banners and consolidate the Watch page into a single video carousel + masonry image gallery.

**Architecture:** Extract a reusable `PageBanner` component for consistent banner styling across all pages. Create a masonry gallery component with lightbox support. Consolidate Watch page by flattening all sessions into one carousel and adding an image gallery section.

**Tech Stack:** Next.js App Router, Tailwind CSS, React, TypeScript

---

## File Structure

```
components/
  ui/
    page-banner.tsx          (NEW - shared banner component)
    lightbox.tsx             (NEW - full-screen image viewer)
  event/
    video-carousel.tsx       (NEW - single combined carousel)
    image-gallery.tsx        (NEW - masonry grid)
    session-card.tsx         (EXISTING - reuse for video cards)
  home/
    hero-section.tsx         (MODIFY - use PageBanner)
  event/
    event-header.tsx         (MODIFY - use PageBanner)
  about/
    about-header.tsx         (MODIFY - use PageBanner)
  partner/
    partner-header.tsx       (MODIFY - use PageBanner)
content/
  types.ts                   (MODIFY - add GalleryImage type)
  gallery.ts                 (NEW - gallery image data)
  sessions.ts                (MODIFY - flatten sessions helper)
public/
  images/
    banners/                 (NEW - placeholder banner images)
      watch-hero.jpg
      about-hero.jpg
      partner-hero.jpg
    gallery/                 (NEW - placeholder gallery images)
      photo-1.jpg through photo-8.jpg
app/
  events/1.0/page.tsx        (MODIFY - new layout)
tests/
  lightbox.test.ts           (NEW)
  image-gallery.test.ts      (NEW)
```

---

### Task 1: Add GalleryImage Type and Data

**Files:**
- Modify: `content/types.ts`
- Create: `content/gallery.ts`

- [ ] **Step 1: Add GalleryImage type to types.ts**

```typescript
// Add to content/types.ts after SessionTrack type
export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};
```

- [ ] **Step 2: Create gallery.ts with placeholder data**

```typescript
// content/gallery.ts
import type { GalleryImage } from "@/content/types";

export const galleryImages: GalleryImage[] = [
  { src: "/images/gallery/photo-1.jpg", alt: "AbilityX 1.0 main stage presentation" },
  { src: "/images/gallery/photo-2.jpg", alt: "Panel discussion with industry leaders" },
  { src: "/images/gallery/photo-3.jpg", alt: "Networking session between talks" },
  { src: "/images/gallery/photo-4.jpg", alt: "Audience engagement during keynote" },
  { src: "/images/gallery/photo-5.jpg", alt: "Workshop breakout session" },
  { src: "/images/gallery/photo-6.jpg", alt: "Closing ceremony highlights" },
  { src: "/images/gallery/photo-7.jpg", alt: "Exhibit hall demonstrations" },
  { src: "/images/gallery/photo-8.jpg", alt: "After-party celebration" },
];
```

- [ ] **Step 3: Add flattened sessions helper to sessions.ts**

```typescript
// Add to content/sessions.ts at the end
import type { SessionItem } from "@/content/types";

export const allSessions: SessionItem[] = sessionTracks.flatMap(
  (track) => track.sessions,
);
```

- [ ] **Step 4: Run type check**

Run: `npx tsc --noEmit`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add content/types.ts content/gallery.ts content/sessions.ts
git commit -m "feat: add GalleryImage type and gallery data"
```

---

### Task 2: Create PageBanner Component

**Files:**
- Create: `components/ui/page-banner.tsx`

- [ ] **Step 1: Create PageBanner component**

```tsx
// components/ui/page-banner.tsx
import { Container } from "@/components/layout/container";

type PageBannerProps = {
  imageSrc: string;
  imageAlt: string;
  kicker: string;
  title: string;
  description: string;
};

export function PageBanner({
  imageSrc,
  imageAlt,
  kicker,
  title,
  description,
}: PageBannerProps) {
  return (
    <section className="relative overflow-hidden bg-brand-black pt-[108px] text-white md:pt-[128px]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageSrc})` }}
        role="img"
        aria-label={imageAlt}
      />
      
      {/* Dark Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(31,31,31,0.6) 0%, rgba(13,13,13,0.85) 100%)",
        }}
      />

      {/* Content */}
      <Container className="relative px-5 pb-16 pt-20 md:px-8 md:pb-16 lg:px-20 lg:pb-16 lg:pt-20">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-brand-red" aria-hidden="true" />
            <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-brand-red">
              {kicker}
            </p>
          </div>
          <h1 className="mt-4 font-display text-[34px] font-black tracking-[-0.03em] md:text-[56px]">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/70 md:text-xl">
            {description}
          </p>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Run lint check**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add components/ui/page-banner.tsx
git commit -m "feat: add reusable PageBanner component"
```

---

### Task 3: Create Placeholder Banner Images

**Files:**
- Create: `public/images/banners/watch-hero.jpg`
- Create: `public/images/banners/about-hero.jpg`
- Create: `public/images/banners/partner-hero.jpg`

- [ ] **Step 1: Create banners directory**

Run: `mkdir -p public/images/banners`

- [ ] **Step 2: Create placeholder images**

Since we need actual image files, create simple colored placeholder images using a base64-encoded 1x1 pixel PNG that can be swapped later. For now, we'll use a different approach - reference a placeholder service or create solid color divs.

Actually, for placeholders, let's modify PageBanner to support a fallback gradient when no image is provided:

```tsx
// Update PageBanner to support optional image
type PageBannerProps = {
  imageSrc?: string;
  imageAlt: string;
  kicker: string;
  title: string;
  description: string;
};

// In the component, if no imageSrc, use a gradient fallback
<div
  className="absolute inset-0 bg-cover bg-center"
  style={imageSrc ? { backgroundImage: `url(${imageSrc})` } : undefined}
/>
{!imageSrc && (
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(255,255,255,0.14),transparent_28%),linear-gradient(180deg,rgba(31,31,31,0.78),rgba(13,13,13,0.92))]" />
)}
```

- [ ] **Step 3: Update PageBanner with fallback support**

```tsx
// components/ui/page-banner.tsx (updated)
import { Container } from "@/components/layout/container";

type PageBannerProps = {
  imageSrc?: string;
  imageAlt: string;
  kicker: string;
  title: string;
  description: string;
};

export function PageBanner({
  imageSrc,
  imageAlt,
  kicker,
  title,
  description,
}: PageBannerProps) {
  return (
    <section className="relative overflow-hidden bg-brand-black pt-[108px] text-white md:pt-[128px]">
      {/* Background Image or Fallback Gradient */}
      {imageSrc ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageSrc})` }}
          role="img"
          aria-label={imageAlt}
        />
      ) : (
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(255,255,255,0.14),transparent_28%),linear-gradient(180deg,rgba(31,31,31,0.78),rgba(13,13,13,0.92))]"
          role="img"
          aria-label={imageAlt}
        />
      )}
      
      {/* Dark Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(31,31,31,0.6) 0%, rgba(13,13,13,0.85) 100%)",
        }}
      />

      {/* Content */}
      <Container className="relative px-5 pb-16 pt-20 md:px-8 md:pb-16 lg:px-20 lg:pb-16 lg:pt-20">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-brand-red" aria-hidden="true" />
            <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-brand-red">
              {kicker}
            </p>
          </div>
          <h1 className="mt-4 font-display text-[34px] font-black tracking-[-0.03em] md:text-[56px]">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/70 md:text-xl">
            {description}
          </p>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Run lint check**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/ui/page-banner.tsx
git commit -m "feat: add fallback gradient to PageBanner"
```

---

### Task 4: Update Event Header to Use PageBanner

**Files:**
- Modify: `components/event/event-header.tsx`

- [ ] **Step 1: Update event-header.tsx**

```tsx
// components/event/event-header.tsx
import { PageBanner } from "@/components/ui/page-banner";
import { eventOneContent } from "@/content/event-1-0";

export function EventHeader() {
  return (
    <PageBanner
      imageAlt="AbilityX 1.0 event venue"
      kicker={eventOneContent.header.kicker}
      title={eventOneContent.header.title}
      description={eventOneContent.header.body}
    />
  );
}
```

- [ ] **Step 2: Run lint check**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 3: Verify page renders**

Run: `npm run dev`
Expected: Watch page shows banner with gradient overlay (same as before, but using new component)

- [ ] **Step 4: Commit**

```bash
git add components/event/event-header.tsx
git commit -m "refactor: update EventHeader to use PageBanner"
```

---

### Task 5: Update About Header to Use PageBanner

**Files:**
- Modify: `components/about/about-header.tsx`

- [ ] **Step 1: Update about-header.tsx**

```tsx
// components/about/about-header.tsx
import { PageBanner } from "@/components/ui/page-banner";
import { aboutContent } from "@/content/about";

export function AboutHeader() {
  return (
    <PageBanner
      imageAlt="AbilityX team and community"
      kicker={aboutContent.header.kicker}
      title={aboutContent.header.title}
      description={aboutContent.header.body}
    />
  );
}
```

- [ ] **Step 2: Run lint check**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add components/about/about-header.tsx
git commit -m "refactor: update AboutHeader to use PageBanner"
```

---

### Task 6: Update Partner Header to Use PageBanner

**Files:**
- Modify: `components/partner/partner-header.tsx`

- [ ] **Step 1: Update partner-header.tsx**

```tsx
// components/partner/partner-header.tsx
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
```

- [ ] **Step 2: Run lint check**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add components/partner/partner-header.tsx
git commit -m "refactor: update PartnerHeader to use PageBanner"
```

---

### Task 7: Update Home Hero to Use PageBanner

**Files:**
- Modify: `components/home/hero-section.tsx`

- [ ] **Step 1: Update hero-section.tsx**

```tsx
// components/home/hero-section.tsx
import { Container } from "@/components/layout/container";
import { PageBanner } from "@/components/ui/page-banner";
import { PillButton } from "@/components/ui/pill-button";
import { homeContent } from "@/content/home";

export function HeroSection() {
  return (
    <PageBanner
      imageAlt="Hero visual for AbilityX 1.0 crowd or stage photography"
      kicker={homeContent.hero.kicker}
      title={homeContent.hero.title}
      description={homeContent.hero.subhead}
    >
      <div className="mt-7 flex flex-wrap items-center gap-5">
        <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-white/60">
          {homeContent.hero.tag}
        </p>
        {homeContent.hero.actions.map((action) => (
          <PillButton
            key={action.label}
            href={action.href}
            variant={action.variant}
            className="px-6 py-3.5"
          >
            {action.label}
          </PillButton>
        ))}
      </div>
    </PageBanner>
  );
}
```

Wait, PageBanner doesn't accept children. Let me adjust the approach - keep HeroSection as-is but just update the overlay pattern to match PageBanner.

Actually, the Home hero has a different layout (content at bottom, different padding). Let me keep it separate but extract the overlay pattern:

- [ ] **Step 1: Update hero-section.tsx to use consistent overlay**

```tsx
// components/home/hero-section.tsx
import { Container } from "@/components/layout/container";
import { PillButton } from "@/components/ui/pill-button";
import { homeContent } from "@/content/home";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-brand-black pt-[96px] text-white md:pt-[112px]">
      {/* Background Image or Fallback Gradient */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(255,255,255,0.14),transparent_28%),linear-gradient(180deg,rgba(31,31,31,0.78),rgba(13,13,13,0.92))]"
        role="img"
        aria-label="Hero visual placeholder for full-bleed AbilityX 1.0 crowd or stage photography."
      />
      
      {/* Dark Gradient Overlay - consistent with PageBanner */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(31,31,31,0.6) 0%, rgba(13,13,13,0.85) 100%)",
        }}
      />

      <Container className="relative min-h-[760px] lg:min-h-[760px]">
        <div className="flex min-h-[760px] items-end px-5 pb-[72px] pt-16 md:px-8 lg:px-20">
          <div className="max-w-[920px]">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-brand-red" aria-hidden="true" />
              <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-brand-red">
                {homeContent.hero.kicker}
              </p>
            </div>
            <div>
              <h1 className="display-heading max-w-[10ch] text-[38px] leading-none md:text-[64px] lg:text-[80px]">
                {homeContent.hero.title}
              </h1>
              <p className="mt-5 max-w-[520px] text-base leading-7 text-white/70 md:text-[19px]">
                {homeContent.hero.subhead}
              </p>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-white/60">
                {homeContent.hero.tag}
              </p>
              {homeContent.hero.actions.map((action) => (
                <PillButton
                  key={action.label}
                  href={action.href}
                  variant={action.variant}
                  className="px-6 py-3.5"
                >
                  {action.label}
                </PillButton>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Run lint check**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add components/home/hero-section.tsx
git commit -m "refactor: update Home hero overlay to match PageBanner style"
```

---

### Task 8: Create Lightbox Component

**Files:**
- Create: `components/ui/lightbox.tsx`
- Create: `tests/lightbox.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// tests/lightbox.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Lightbox } from "@/components/ui/lightbox";

describe("Lightbox", () => {
  const mockImages = [
    { src: "/images/photo-1.jpg", alt: "Photo 1" },
    { src: "/images/photo-2.jpg", alt: "Photo 2" },
  ];

  it("renders nothing when isOpen is false", () => {
    render(
      <Lightbox
        images={mockImages}
        initialIndex={0}
        isOpen={false}
        onClose={vi.fn()}
      />,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders dialog when isOpen is true", () => {
    render(
      <Lightbox
        images={mockImages}
        initialIndex={0}
        isOpen={true}
        onClose={vi.fn()}
      />,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("calls onClose when escape key is pressed", () => {
    const onClose = vi.fn();
    render(
      <Lightbox
        images={mockImages}
        initialIndex={0}
        isOpen={true}
        onClose={onClose}
      />,
    );
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("navigates to next image when right arrow is pressed", () => {
    render(
      <Lightbox
        images={mockImages}
        initialIndex={0}
        isOpen={true}
        onClose={vi.fn()}
      />,
    );
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "ArrowRight" });
    expect(screen.getByAltText("Photo 2")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/lightbox.test.tsx`
Expected: FAIL with "Cannot find module '@/components/ui/lightbox'"

- [ ] **Step 3: Write Lightbox implementation**

```tsx
// components/ui/lightbox.tsx
"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type LightboxImage = {
  src: string;
  alt: string;
};

type LightboxProps = {
  images: LightboxImage[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
};

export function Lightbox({
  images,
  initialIndex,
  isOpen,
  onClose,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && currentIndex < images.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      }
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose]);

  if (!isOpen) return null;

  const currentImage = images[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  return (
    <div
      role="dialog"
      aria-label="Image lightbox"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="max-h-[85vh] rounded-lg object-contain"
        />

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute -right-4 -top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-colors hover:bg-gray-200"
          aria-label="Close lightbox"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Navigation arrows */}
        {hasPrev && (
          <button
            type="button"
            onClick={() => setCurrentIndex((prev) => prev - 1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/40"
            aria-label="Previous image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        {hasNext && (
          <button
            type="button"
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/40"
            aria-label="Next image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}

        {/* Image counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 text-sm text-white">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/lightbox.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/ui/lightbox.tsx tests/lightbox.test.tsx
git commit -m "feat: add Lightbox component with keyboard navigation"
```

---

### Task 9: Create Image Gallery Component

**Files:**
- Create: `components/event/image-gallery.tsx`
- Create: `tests/image-gallery.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// tests/image-gallery.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ImageGallery } from "@/components/event/image-gallery";

describe("ImageGallery", () => {
  const mockImages = [
    { src: "/images/photo-1.jpg", alt: "Photo 1" },
    { src: "/images/photo-2.jpg", alt: "Photo 2" },
  ];

  it("renders all images", () => {
    render(<ImageGallery images={mockImages} />);
    expect(screen.getByAltText("Photo 1")).toBeInTheDocument();
    expect(screen.getByAltText("Photo 2")).toBeInTheDocument();
  });

  it("opens lightbox when image is clicked", () => {
    render(<ImageGallery images={mockImages} />);
    fireEvent.click(screen.getByAltText("Photo 1"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/image-gallery.test.tsx`
Expected: FAIL with "Cannot find module '@/components/event/image-gallery'"

- [ ] **Step 3: Write ImageGallery implementation**

```tsx
// components/event/image-gallery.tsx
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
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/image-gallery.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/event/image-gallery.tsx tests/image-gallery.test.tsx
git commit -m "feat: add ImageGallery component with masonry layout"
```

---

### Task 10: Create Video Carousel Component

**Files:**
- Create: `components/event/video-carousel.tsx`

- [ ] **Step 1: Create VideoCarousel component**

```tsx
// components/event/video-carousel.tsx
"use client";

import { useState } from "react";
import { Carousel } from "@/components/ui/carousel";
import { Modal } from "@/components/ui/modal";
import { SessionCard } from "@/components/event/session-card";
import type { SessionItem } from "@/content/types";

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
      onClick={() => setSelectedSession(session)}
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
        isOpen={selectedSession !== null}
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
```

- [ ] **Step 2: Run lint check**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add components/event/video-carousel.tsx
git commit -m "feat: add VideoCarousel component for consolidated videos"
```

---

### Task 11: Update Watch Page Layout

**Files:**
- Modify: `app/events/1.0/page.tsx`

- [ ] **Step 1: Update Watch page**

```tsx
// app/events/1.0/page.tsx
import { EventHeader } from "@/components/event/event-header";
import { ImageGallery } from "@/components/event/image-gallery";
import { VideoCarousel } from "@/components/event/video-carousel";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";
import { Container } from "@/components/layout/container";
import { allSessions } from "@/content/sessions";
import { galleryImages } from "@/content/gallery";

export default function EventOnePage() {
  return (
    <main className="bg-white">
      <SiteNav active="event-1-0" />
      <EventHeader />

      {/* Video Section */}
      <section className="bg-white px-5 py-16 md:px-8 lg:px-20 lg:py-16">
        <Container>
          <div className="mb-8">
            <h2 className="font-display text-[28px] font-bold tracking-[-0.02em] md:text-[36px]">
              Watch All Sessions
            </h2>
            <p className="mt-2 text-base text-black/60">
              Relive the best moments from AbilityX 1.0
            </p>
          </div>
          <VideoCarousel sessions={allSessions} />
        </Container>
      </section>

      {/* Gallery Section */}
      <section className="bg-brand-subtle px-5 py-16 md:px-8 lg:px-20 lg:py-16">
        <Container>
          <div className="mb-8">
            <h2 className="font-display text-[28px] font-bold tracking-[-0.02em] md:text-[36px]">
              Event Gallery
            </h2>
            <p className="mt-2 text-base text-black/60">
              Moments captured at AbilityX 1.0
            </p>
          </div>
          <ImageGallery images={galleryImages} />
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}
```

- [ ] **Step 2: Run lint check**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 3: Verify page renders**

Run: `npm run dev`
Expected: Watch page shows single video carousel + masonry image gallery

- [ ] **Step 4: Commit**

```bash
git add app/events/1.0/page.tsx
git commit -m "feat: consolidate Watch page into single carousel + gallery"
```

---

### Task 12: Run Full Test Suite and Build

**Files:**
- None (verification only)

- [ ] **Step 1: Run all tests**

Run: `npx vitest run`
Expected: All tests PASS

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 3: Run build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Final commit if any fixes needed**

```bash
git add -A
git commit -m "chore: fix lint and type issues"
```

---

## Summary

After completing all tasks:
- All page banners use consistent `PageBanner` component with gradient overlay
- Home hero maintains its unique layout but uses matching overlay style
- Watch page consolidated into single video carousel + masonry image gallery
- Lightbox component for full-size image viewing
- All placeholder images can be swapped by updating `imageSrc` props and gallery data
- Full test coverage for new components
