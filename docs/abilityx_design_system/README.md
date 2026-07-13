# Handoff: AbilityX Design System

## Overview
This package documents the **AbilityX** brand and design system (AbilityX by ProjectEnable Africa — Nigeria's leading disability-inclusion convening). It covers color, typography, spacing, and component tokens, plus a full click-through **Event Website UI kit** (Home, Speakers, Agenda, Register).

## About the Design Files
The files in this bundle — `colors_and_type.css`, everything under `preview/`, and everything under `ui_kits/website/` — are **design references built in HTML/CSS/JSX**, not production code to copy verbatim. They demonstrate the intended visual language, component states, and interaction flow.

**Your task:** recreate these designs in the target codebase's existing environment (React, Vue, SwiftUI, native, etc.) using its established component patterns, state management, and build tooling. If no environment exists yet, choose the framework best suited to the project (a React + Vite marketing/event site is a reasonable default given the source files are React-flavored JSX) and implement fresh there — do not ship the prototype JSX as-is; it uses inline style objects and CDN-loaded React/Babel for zero-build previewing, which is not a production pattern.

## Fidelity
**High-fidelity.** Colors, type, spacing, radii, and shadow values below are final tokens, not placeholders. Recreate pixel-perfectly using your codebase's styling system (CSS variables, Tailwind config, styled-components theme, etc.) — just don't copy the inline-style JSX mechanism directly.

Two flagged exceptions to treat as **approximate, not final**:
- **Wordmark font** — the source logo's display font is custom/unlicensed. `Nunito` (Black 900 / ExtraBold 800 / Bold 700) is used throughout as the nearest Google Fonts substitute. If the real brand font becomes available, swap it in — layout/tracking may need minor rebalancing.
- **Brand red hex** (`#CC0000`) — derived visually from the provided logo PNGs, not from a written brand guideline. Confirm against any official brand book before shipping.

---

## Screens / Views (Website UI Kit)

### 1. Home
- **Purpose:** Primary landing page — hero pitch, featured speakers, agenda teaser.
- **Layout:** Single column, full-width sections stacked vertically. Fixed top nav (72px tall, white bg, 1px `#e8e8e8` bottom border) overlays a full-height (`min-height: 100vh`) dark hero.
- **Hero section** (`#0d0d0d` background, `80px` side padding, `120px` top / `80px` bottom padding):
  - Two soft radial-gradient red glow accents (top-right, bottom-left), `pointer-events: none`, purely decorative.
  - Overline: 12px, weight 700, uppercase, `0.14em` tracking, color `#CC0000`, preceded by a 32×2px red rule — "Nigeria's #1 Disability Inclusion Event"
  - H1: Nunito Black 900, `clamp(52px, 7vw, 88px)`, line-height 1.0, tracking `-0.03em`, white, with the "X" in `#CC0000` — "AbilityX 2025"
  - Subhead: Nunito ExtraBold 800, `clamp(24px, 3vw, 40px)`, `rgba(255,255,255,0.55)` — "It's not just an event. It's a movement."
  - Body paragraph: DM Sans 400, 18px, line-height 1.65, `rgba(255,255,255,0.65)`, max-width 560px
  - Two CTAs: primary pill (`#CC0000` bg, white text, 16/36px padding, radius 999px) + ghost pill (transparent, 1.5px `rgba(255,255,255,0.25)` border)
  - Stat row (4 stats: 500+ Attendees / 40+ Speakers / 3 Days / 12+ Countries): Nunito Black 900 36px numbers in `#CC0000`, DM Sans 13px labels in `rgba(255,255,255,0.5)`, separated from body by a `1px rgba(255,255,255,0.1)` top border, `64px` margin-top / `40px` padding-top, `48px` gap between stats
  - Faint white logo bottom-right, 12% opacity, 48px tall
- **Speakers section** (`#f5f5f5` bg, `96px 80px` padding): overline + H2 header, then a 3-column CSS grid (20px gap) of speaker cards.
- **Agenda section** (white bg, `96px 80px` padding): header row with day-tab toggle (pill buttons, active = black bg/white text), session list below.

### 2. Speakers (full listing)
- **Layout:** Dark header band (`#0d0d0d`, `80px 80px 60px` padding) with overline + Nunito Black 56px H1 "Our Speakers" + supporting paragraph, followed by the same `SpeakersSection` grid used on Home.

### 3. Agenda (full listing)
- **Layout:** Red header band (`#CC0000`, same padding pattern) with H1 "Programme", followed by the day-tab `AgendaSection`.
- **Session row:** flex row, `16px 20px` padding, `8px` radius, left border 3px colored by session type; time (12px tabular DM Sans), type tag (pill, 9px uppercase, color-coded), title (Nunito Bold 700 15px), speaker name (12px gray), room (11px right-aligned, light gray). Type colors: Keynote = black bg/white text, Panel = red-tinted, Workshop = blue-tinted, Demo = green-tinted, Break = neutral gray.

### 4. Register
- **Purpose:** 2-step registration flow ending in a success state.
- **Layout:** Centered card (max-width 560px) on `#f5f5f5` background, `120px` top padding to clear the nav.
  - Card header: `#0d0d0d` band, event name + dates, faint white logo right-aligned.
  - Body (`36px 40px` padding): 2-segment progress bar (4px tall pills, active/done = `#CC0000`), step label (11px uppercase red), step title (Nunito ExtraBold 800 22px).
  - **Step 1 — Your Details:** Full Name, Email, Organization, Country (DM Sans 14px inputs, 1.5px `#d4d4d4` border, 8px radius, 11/14px padding).
  - **Step 2 — Your Interests:** Role select (6 options: Policymaker/Government, NGO/Civil Society, Technologist/Startup, Person with Disability, Donor/Funder, Media/Researcher), Track select (Policy & Advocacy, Technology & Innovation, Funding & Partnerships, Lived Experience).
  - Footer actions: Back (outlined pill) + Continue/Complete (solid red pill), right-aligned.
  - **Success state:** red-tinted circular checkmark icon, Nunito Black 26px "You're registered!", confirmation copy referencing the entered name, single "Back to Home" CTA.

### Nav (persistent)
- Fixed, 72px tall, white bg, `1px #e8e8e8` bottom border, `48px` side padding.
- Logo left (36px tall). Center-right nav links (Home/Speakers/Agenda/Register) as pill buttons — active state = light red bg (`#fde8e8`) + red text (`#CC0000`) + weight 600; inactive = transparent + `#404040` + weight 500.
- Far right: solid red "Register Now" pill CTA.

### Footer (persistent, all pages except Register)
- `#0d0d0d` background, `64px 80px 40px` padding.
- Top row: logo + tagline (left) vs. 3-column link grid (Event / Attend / Organization), separated by a `1px rgba(255,255,255,0.1)` border.
- Footer links: DM Sans 13px, `rgba(255,255,255,0.65)`, hover → `#CC0000`.
- Bottom row: copyright (12px, `rgba(255,255,255,0.25)`) left, red "AbilityX 2025" pill badge right.

---

## Interactions & Behavior
- **Navigation:** client-side page switch (no full reload) via a `page` state string (`Home` / `Speakers` / `Agenda` / `Register`); switching scrolls to top.
- **Speaker cards:** hover → shadow deepens (`0 2px 12px` → `0 8px 28px` rgba(0,0,0,...)) and card lifts `translateY(-3px)`, ~200ms ease.
- **Agenda day tabs:** click swaps the active day's session list; active tab = black pill, inactive = light gray pill.
- **Register flow:** Step 1 → "Continue →" advances to Step 2; Step 2 → "Complete Registration" shows the success state; "Back" steps backward; success state's "Back to Home" returns to the Home page.
- **Buttons general:** primary red pill darkens to `#b30000` on hover; all transitions ~150ms ease-in-out; no bounce/scale-pop, consistent with the brand's restrained motion language (see Design Tokens → Motion).
- No loading or error states are modeled in this prototype (registration submit is instant/local); if the real form needs async submission, add a pending/error state following the same visual language (red for error, consistent with `status-error` token).

## State Management
- `page`: current route/page name (string enum).
- `activeDay`: index into the agenda's day array (Agenda section).
- `step`: registration wizard step (1 or 2).
- `form`: registration form fields — `name`, `email`, `org`, `role`, `track`, `country`.
- `submitted`: boolean, gates the Register success view.
- Per-card `hovered` boolean for speaker card hover state (can instead be pure CSS `:hover` in production).

## Design Tokens

### Colors
- Brand Red: `#CC0000` (scale from `#7a0000` (900) to `#fff5f5` (50) — see `colors_and_type.css` for the full 10-step ramp)
- Black: `#0D0D0D`; Gray scale `#1f1f1f` → `#f5f5f5` (see CSS file for full 900→50 ramp)
- White: `#FFFFFF`
- Semantic: `fg-primary` (black), `fg-secondary` (`#6b6b6b`), `fg-accent` (red), `bg-base` (white), `bg-subtle` (`#f5f5f5`), `bg-inverse` (black), `bg-accent` (red)
- Status: success `#1a7a4a`, warning `#b56a00`, error `#CC0000`, info `#0060b0`

### Typography
- Display/Headings: **Nunito** — weights 400/500/600/700/800/900 (Black 900 for hero display, ExtraBold 800 for H1, Bold 700 for H2/H3)
- Body/UI: **DM Sans** — weights 400/500/600/700
- Mono: **DM Mono** (self-hosted, see `fonts/`) — weights Light/Regular/Medium + italics
- Type scale (Major Third, 1.25 ratio): `--text-xs` 0.64rem → `--text-5xl` 4.768rem (full scale in `colors_and_type.css`)
- Letter spacing: tight `-0.03em` (display), normal `0`, wide `0.06em`, wider `0.12em` (labels/overlines)

### Spacing
4px base grid: `--space-1` (4px) through `--space-32` (128px) — see `colors_and_type.css` for the full 11-step scale.

### Radius
- `sm` 4px (tags, inputs) · `md` 8px (cards) · `lg` 16px · `xl` 24px · `pill` 999px (buttons, badges)

### Shadow / Elevation
- `xs`: `0 1px 4px rgba(0,0,0,0.06)`
- `sm`: `0 2px 12px rgba(0,0,0,0.08)` (default card resting state)
- `md`: `0 6px 24px rgba(0,0,0,0.12)` (hover/raised)
- `lg`: `0 12px 40px rgba(0,0,0,0.16)` (dropdown/modal)
- `xl`: `0 20px 60px rgba(0,0,0,0.20)`

### Motion
- Transitions: fast 150ms, base 300ms, slow 500ms — all `ease-in-out`
- Subtle, purposeful only — no bounce, no infinite decorative loops; respect `prefers-reduced-motion`

---

## Assets
- `assets/logo-primary.png` — full-color wordmark (black + red), transparent background, for light surfaces
- `assets/logo-white.png` — white + red wordmark, transparent background, for dark/red surfaces
- `assets/logo-white-alt.png` — alternate crop of the white lockup
- `fonts/DMMono-*.ttf` — self-hosted DM Mono family (Regular, Light, Medium + italics) — user-supplied brand font files
- No icon set was supplied with the brand. The design system README recommends **Phosphor** or **Lucide** (outlined, geometric) as the nearest fit — pick one and use it consistently; do not hand-draw icons.
- No photography was supplied. Speaker "avatars" in the prototype are placeholder initials-on-black-circle; swap in real photography before shipping (warm, candid, documentary style per brand guidance — see README `VISUAL FOUNDATIONS`).

## Files
- `colors_and_type.css` — full CSS custom-property token set (colors, type, spacing, radius, shadow, transitions) + semantic type classes
- `README.md` (this project's root one, included here as `BRAND_README.md`) — full brand voice, tone, and visual-foundations documentation
- `ui_kits/website/index.html` — the assembled prototype (loads React/ReactDOM/Babel from CDN + the JSX files below)
- `ui_kits/website/navbar.jsx`, `hero-section.jsx`, `speakers-section.jsx`, `agenda-section.jsx`, `register-section.jsx` — the individual section components referenced above
- `preview/*.html` — isolated design-system specimen cards (colors, type, spacing, shadows, buttons, badges, cards, inputs, logo lockups) — useful as a quick visual index of every token in context
