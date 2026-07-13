# Design Spec: Banner Image Overlays + Watch Page Consolidation

**Date:** 2026-07-12  
**Status:** Approved  
**Author:** opencode

---

## Overview

Two related changes to improve visual consistency across the AbilityX 2.0 marketing site:

1. Add image backgrounds with dark overlays to all page banners (Watch, About, Partner)
2. Consolidate the Watch page into a single video carousel + masonry image gallery

---

## 1. Page Banner Image Backgrounds

### Current State
- **Home hero**: Has a gradient overlay simulating a background image (`bg-[radial-gradient(...)]`)
- **Watch, About, Partner headers**: Plain `bg-brand-black` with no image

### Target State
All page headers will have:
- Full-width background image (placeholder, easily swappable)
- Dark gradient overlay ensuring text readability
- Consistent text hierarchy: kicker, title, description
- Consistent height/padding across all pages

### Implementation

**Reusable Banner Component:**
Create a shared `PageBanner` component that accepts:
- `imageSrc` — background image path (placeholder for now)
- `imageAlt` — alt text for accessibility
- `kicker` — small red label text
- `title` — main heading
- `description` — subtext

**Overlay Style:**
```css
/* Dark gradient overlay - darker at bottom where text sits */
background: linear-gradient(
  180deg,
  rgba(31, 31, 31, 0.6) 0%,
  rgba(13, 13, 13, 0.85) 100%
);
```

**Placeholder Images:**
Use `/public/images/banners/` directory with placeholder images:
- `home-hero.jpg` (already conceptualized)
- `watch-hero.jpg`
- `about-hero.jpg`
- `partner-hero.jpg`

All placeholder images will be swappable by changing the `imageSrc` prop.

**Files to Modify:**
- `components/home/hero-section.tsx` — refactor to use shared banner pattern
- `components/event/event-header.tsx` — add image background + overlay
- `components/about/about-header.tsx` — add image background + overlay
- `components/partner/partner-header.tsx` — add image background + overlay
- New: `components/ui/page-banner.tsx` — shared banner component

---

## 2. Watch Page Consolidation

### Current State
- Per-track breakdown with separate `SessionTrackSection` components
- Each track has its own carousel
- A/B breakout sections between tracks

### Target State
- **Single Video Carousel**: All sessions from all tracks combined
- **Masonry Image Gallery**: Responsive grid of event photos
- No per-track separation

### Implementation

**Single Video Carousel:**
- Combine all sessions from `content/sessions.ts` into one flat array
- Use existing `Carousel` component with YouTube-style video cards
- Each card: thumbnail, title, speaker name
- Click opens existing modal with YouTube embed
- Carousel settings: scrollable, shows 1 card mobile / 3-4 cards desktop

**Masonry Image Gallery:**
- Responsive grid layout using CSS columns
- Breakpoints: 1 column mobile, 2 columns tablet, 3-4 columns desktop
- Placeholder images with:
  - Rounded corners (`rounded-lg`)
  - Subtle hover effect (scale 1.02, transition)
  - Click opens lightbox modal for full-size view
- Placeholder images in `/public/images/gallery/`

**Lightbox Component:**
- New `components/ui/lightbox.tsx`
- Full-screen overlay with image
- Close on click outside, escape key, or close button
- Left/right navigation arrows for browsing

**Files to Modify:**
- `app/events/1.0/page.tsx` — restructure layout
- `components/event/session-track-section.tsx` — remove (or repurpose)
- `components/event/watch-track-carousel.tsx` — remove (consolidated)
- New: `components/event/video-carousel.tsx` — single combined carousel
- New: `components/event/image-gallery.tsx` — masonry grid
- New: `components/ui/lightbox.tsx` — full-screen image viewer
- `content/sessions.ts` — may need to add gallery image data

---

## Data Structure Additions

### Gallery Images
Add to `content/types.ts`:
```typescript
export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}
```

Add to `content/sessions.ts` (or new `content/gallery.ts`):
```typescript
export const galleryImages: GalleryImage[] = [
  { src: "/images/gallery/photo-1.jpg", alt: "AbilityX 1.0 main stage" },
  { src: "/images/gallery/photo-2.jpg", alt: "Panel discussion" },
  // ... more placeholder images
];
```

---

## Accessibility

- All background images have `role="img"` and `aria-label`
- Lightbox has proper focus management and escape key handling
- Carousel maintains keyboard navigation
- Gallery images have descriptive alt text

---

## Testing

- Visual regression: all pages render with image backgrounds
- Carousel: single carousel works across all breakpoints
- Lightbox: opens, closes, navigates correctly
- Responsive: gallery grid adapts to screen sizes
- Build: production build passes
- Lint: no new warnings

---

## Out of Scope

- Interactive mouse-follow animation (deferred to future work)
- Actual image content (using placeholders)
- CMS integration for images (future Payload migration)
