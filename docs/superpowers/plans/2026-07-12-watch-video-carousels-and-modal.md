# Watch Video Carousels And Modal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert each Watch page track into a carousel of YouTube-style video cards and add a reusable modal player component with placeholder YouTube data.

**Architecture:** Keep the existing reusable carousel and extend the session data shape with YouTube placeholder metadata. Add a reusable modal dialog and a small Watch-page client wrapper that coordinates the selected video state while preserving the current track structure.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Vitest

---

## File Structure

### Create
- `components/ui/modal.tsx` - reusable accessible modal dialog
- `components/event/watch-track-carousel.tsx` - client wrapper that renders a track carousel and opens modal on card click

### Modify
- `content/types.ts` - extend session item type for YouTube metadata
- `content/sessions.ts` - add placeholder YouTube ids and thumbnail labels
- `components/event/session-card.tsx` - render YouTube-style card and expose click action
- `components/event/session-track-section.tsx` - switch from static grid to carousel wrapper
- `app/events/1.0/page.tsx` - keep page composition but use new client wrapper per track
- `tests/carousel-state.test.ts` - add one more helper behavior test only if needed

### Test
- `tests/carousel-state.test.ts`

## Self-Review

- Spec coverage: reusable modal, placeholder YouTube data, track-level carousels, and click-to-open playback are covered.
- Placeholder scan: no implementation placeholders beyond the user-approved placeholder YouTube ids.
- Type consistency: `SessionItem` remains the source of truth for video metadata across cards, carousels, and modal.
