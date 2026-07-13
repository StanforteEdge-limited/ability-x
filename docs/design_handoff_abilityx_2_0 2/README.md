# Handoff: AbilityX 2.0 Website (Home, Watch/Recap, About, Partner)

## Overview
Marketing site for **AbilityX 2.0**, Nigeria's disability inclusion conference (Project Enable Africa × Jobberman Nigeria), running this November in Lagos. This bundle covers four pages — **Home**, **Watch/Recap** (each with desktop + mobile), **About**, and **Partner/Sponsor Inquiry** (desktop only so far). The site's job: announce 2.0 as a continuation of a proven event (not a first-timer's pitch), build credibility off 1.0's numbers, and drive two asks — partnership/sponsorship (priority, time-sensitive) and waitlist signup (secondary, dates aren't locked yet).

## About the Design Files
The `.dc.html` files in this bundle are **design references** built in this tool's own component format (template + a small logic class) — they will not run as-is in a normal browser or codebase; they need this tool's runtime. Treat them as **annotated visual + interaction specs**, not source to copy/paste. The task is to **recreate these designs in the target codebase's existing environment** (React, Vue, plain HTML/CSS, whatever the project already uses) — or choose the most appropriate stack if there isn't one yet — following the target codebase's own conventions for components, state, and routing.

## Fidelity
**High-fidelity.** Colors, type, spacing, and copy are final/near-final per the brief. The only intentionally unfinished pieces are content placeholders explicitly called out below (photos, video, testimonial, exact date/venue) — everything else should be built pixel-for-pixel.

## Pages

### 1. Home (`Home.dc.html`, desktop 1440px canvas; `Home Mobile.dc.html`, 390px canvas)
Sections top to bottom:

1. **Nav** — fixed-position bar, 80px tall (64px mobile), white bg, 1px `#e8e8e8` bottom border. Left: `assets/logo-primary.png` (32px tall, 26px mobile). Center (desktop only): "Home" pill (active state: red text `#CC0000` on `#fde8e8` bg, 999px radius) + "Watch 1.0" text link. Right: "Partner With Us" pill button (bg `#CC0000`, white text, 999px radius, links to `#ask` anchor on the same page). Mobile: nav simplifies to logo + "Partner" pill button, with a secondary slim row below (Home / Watch 1.0 links, 13px).
2. **Hero** — full-bleed image section, dark scrim overlay `rgba(13,13,13,0.55)` over placeholder photography, content bottom-left aligned. Kicker "AbilityX 2.0" (red, 12px, uppercase, 0.14em tracking, with a 32×2px red rule). Headline "The Movement Returns This November" (Nunito Black 900, 80px desktop / 38px mobile, line-height ~1.0, tracking -0.03em, white). Subhead "Lagos, this November — details to follow" (DM Sans, 19px, `rgba(255,255,255,0.7)`). Date tag "This November · Lagos" (13px uppercase, semi-transparent white). Two CTAs: "Partner With Us" (solid red pill) and "Watch the 1.0 Recap" (outline pill, 1.5px `rgba(255,255,255,0.3)` border) → links to Watch page.
3. **Mission/About** — centered text block, red "The Movement" kicker, two paragraphs of body copy (see brief for exact text), followed by an 8-tile photo gallery grid (4×2 desktop, 2-col mobile) of placeholder tiles.
4. **Proof ("1.0 by the numbers")** — full-width black `#0d0d0d` section. Red kicker "1.0 By The Numbers", white Nunito headline. 4-column stat card grid (2-col mobile): `#1F1F1F` cards, 16px/14px radius, giant red Nunito Black number (52px/36px) + gray label. Stats: **450+ Attendees, 6 Partner Organizations, 5 Media Partners, 24 Speakers**. Below: one dashed-border testimonial placeholder card (quote + name/title, currently placeholder copy).
5. **Recap video moment** — light gray `#f5f5f5` section, 2-column (text left / video placeholder right on desktop, stacked on mobile). Heading "See AbilityX 1.0 for Yourself", body copy, "Watch Full Sessions" CTA → Watch page.
6. **What to expect (4 pillars)** — red kicker "What To Expect", headline "Built on four pillars that work.", intro line, then a 4-column (1-column mobile) card grid: white cards, 1px `#e8e8e8` border, 8px radius, soft shadow `0 2px 12px rgba(0,0,0,0.08)`. Each card: numbered label (01–04, red) + Nunito ExtraBold title + DM Sans description. Titles: **Inclusive Future Dialogue, Innovation Labs, Research & Evidence Showcase, AbilityX Impact Awards** (full copy in brief).
7. **Three-part CTA ("ask")** — anchor id `ask`. Light gray section, 3-column grid, **hierarchy favors Partner**: Partner card is wider (1.3fr vs 1fr), dark `#0d0d0d` bg, larger heading; Waitlist and Exhibit cards are white, standard weight. Each card has an inline capture form (email input + submit pill button) that **swaps to a success message on click** — no real submission, client-side only (see Interactions below).
8. **Speakers** — red kicker "1.0 Speakers", heading "AbilityX 2.0 speaker lineup coming soon.", 4-column (2-col mobile) grid of 8 placeholder speaker cards (square photo placeholder + "Speaker Name" / "Title, Organization" placeholder text), caption "24 speakers from AbilityX 1.0 — full roster available on request."
9. **Footer** — black bg, white logo, tagline "It's not just an event. It's a movement. — By ProjectEnable Africa", link row (Watch 1.0, Partner With Us), copyright line.

### 2. Watch/Recap (`Watch.dc.html`, desktop; `Watch Mobile.dc.html`, mobile)
1. **Nav** — same pattern as Home, with "Watch 1.0" as the active pill instead of "Home".
2. **Header** — black bg, red kicker "AbilityX 1.0", Nunito Black headline "Full Sessions" (56px/34px), subhead "Relive the conversations that shaped the movement."
3. **Recap reel placeholder** — centered dashed-border block above the session library (per brief, this is the entry point).
4. **Three session tracks** — **Main Stage, Breakout A, Breakout B**, each rendered as a heading row (track name + session count) followed by a 3-column (1-col mobile) card grid. Each session card: 150px/120px placeholder video thumbnail (dashed border) + title + short description. All session titles/descriptions are currently **structural placeholders** — real footage exists on YouTube from the 1.0 livestream and needs to be sourced and captioned.
5. **Footer** — same as Home, simplified (no link row).

### 3. About (`About.dc.html`, desktop 1440px canvas)
1. **Nav** — same pattern as Home/Watch, with "About" as the active pill.
2. **Header** — black bg, red kicker "About", Nunito Black headline "A Decade of Advocacy. Now Building the Future." (56px), subhead "Who's behind AbilityX, and why it exists."
3. **Org story** — 2-column section (text left, photo placeholder right, 4:5 aspect ratio, dashed border). Red kicker "Project Enable Africa", two paragraphs of body copy (Project Enable Africa's decade of advocacy; the Jobberman Nigeria partnership and 1.0 launch — exact copy per brief).
4. **Credibility stats** — light gray `#f5f5f5` section, 2-column card grid: "10+" years advocating, "2" organizations behind AbilityX. White cards, 16px radius, soft shadow.
5. **Get involved CTA** — centered, red kicker "Get Involved", headline "Ready to be part of what's next?", two CTAs: "Partner With Us" (solid red pill, → Partner page) and "Join the Waitlist" (outline pill, → Home `#ask` anchor).
6. **Footer** — same as Home/Watch.

### 4. Partner / Sponsor Inquiry (`Partner.dc.html`, desktop 1440px canvas)
The most business-critical page — converts credibility into commitment.
1. **Nav** — same pattern, but "Partner With Us" nav CTA renders as a static (non-link) pill since it's the current page.
2. **Header** — black bg, red kicker "Partnership", Nunito Black headline "Back AbilityX 2.0" (64px), subhead "450+ attendees. 6 partner organizations. 5 media partners. One movement — and it's growing. Join us as a partner for AbilityX 2.0."
3. **Two-column body**: left column is the pitch — red kicker "Why Partner", headline "A proven platform, not a first-time bet.", then 4 numbered benefit rows (each a circular red-on-pink numeral badge + one line of copy):
   1. Direct visibility with Africa's disability inclusion decision-makers.
   2. Association with a proven, credible platform — not a first-time bet.
   3. Flexible partnership tiers (pending — detail to follow).
   4. Early access to speaking, exhibition, and branding opportunities.
   Below the benefit list: a 4-column stat strip (450+ Attendees / 6 Partners / 5 Media Partners / 24 Speakers), light gray cards.
   Right column: the **inquiry form**, in a light gray bordered card. Fields: Full name, Organization, Work email, Interest area (select: Sponsorship / Co-convening / Media partnership / Speaking opportunity / Other), submit button "Send Inquiry" (solid red pill). Caption below: "Partnership tiers to follow — this starts the conversation." On submit, the form is replaced with a success message: "Thanks — inquiry sent." + "Our partnerships team will follow up shortly to discuss how you can be part of AbilityX 2.0."
4. **Footer** — same as Home/Watch/About.

### Exploration file (not for build)
`Home Options (exploration).dc.html` shows the two hero-layout directions considered (1a split-panel, 1b full-bleed editorial). **1b (full-bleed editorial) is the one that was picked and built out** — included only for context on why the hero looks the way it does.

## Interactions & Behavior
- **Nav links**: "Watch 1.0", "About", and "Home" navigate between pages. "Partner With Us" in the nav (on Home/Watch/About) now navigates to the standalone **Partner** page rather than anchoring to `#ask` on Home — both the partnership pitch and the waitlist/exhibit capture still live on Home under `#ask` for visitors who land there first.
- **Partner page inquiry form**: 4 fields (name, organization, email, interest-area select) + "Send Inquiry" button. Clicking submit replaces the form with an inline success message, no network call. In production, wire to a real CRM/lead-capture endpoint.
- **Hero secondary CTA** ("Watch the 1.0 Recap") links to the Watch page.
- **Recap section CTA** ("Watch Full Sessions") links to the Watch page.
- **Three-part CTA forms** (Partner / Waitlist / Exhibit): each has one text input and one submit button. Clicking submit replaces the form with an inline success message (no page navigation, no network call):
  - Partner → "Thanks — our partnerships team will follow up shortly."
  - Waitlist → "You're on the list — we'll email you the moment registration opens."
  - Exhibit → "Noted — we'll notify you when exhibitor applications open."
  In production these should POST to real capture endpoints (partner inquiry, waitlist, exhibitor interest) instead of just flipping local state.
- **Animation**: none currently implemented in the mocks. Per brand guide, entrance transitions should be subtle fades/slides, ~300ms ease-in-out, respecting `prefers-reduced-motion`.
- **Responsive behavior**: built as two fixed breakpoints (1440px desktop canvas, 390px mobile canvas) rather than fluid CSS — the developer should implement this as genuinely responsive (fluid breakpoints, not two hard-coded widths).

## State Management
- Minimal: each of the 3 CTA forms needs a submitted/not-submitted boolean (3 booleans total per page, e.g. `{ partner: false, waitlist: false, exhibit: false }`).
- No other client state; no data fetching in the current mocks. Real build will need form submission handlers wired to whatever backend/CRM captures partner, waitlist, and exhibitor leads.

## About & Partner — additional notes
- **About** introduces two new stat-style numbers ("10+" years, "2" organizations) — treat these as illustrative/approximate, not verified figures; confirm with the client before shipping.
- **Partner** is flagged in the brief as the single most business-critical page right now — prioritize correctness of the benefits copy and form fields over polish elsewhere.
- Both pages reuse all existing design tokens, typography, and card/button patterns from Home/Watch — no new tokens were introduced.

## Design Tokens

**Colors**
- Brand red: `#CC0000` (hover/darker: `#990000` / `#7a0000`)
- Black: `#0D0D0D` (near-black surface: `#1F1F1F`)
- White: `#FFFFFF`
- Light gray (section bg): `#F5F5F5`
- Mid gray (secondary text): `#6B6B6B`
- Borders: `#E8E8E8` / `#D4D4D4`
- Success state: text `#1a7a4a` on bg `#eefaf3`, border `#cfeee0`

**Typography**
- Display/headings: **Nunito**, weights 700/800/900 (ExtraBold/Black), tight tracking (-0.02em to -0.03em) on large sizes
- Body/UI: **DM Sans**, weights 400–700
- Labels/kickers: DM Sans Medium/Bold, uppercase, 0.1–0.14em letter-spacing
- Scale used: 12–13px labels, 14–17px body, 22–28px sub-headings, 34–56px section headings, 80px hero headline (desktop)

**Spacing / Radius / Shadow**
- Section padding: 96px vertical / 80px horizontal desktop; 56px / 20px mobile
- Card radius: 8px (standard), 14–16px (stat/CTA cards)
- Pill radius: 999px (all buttons/tags)
- Card shadow: `0 2px 12px rgba(0,0,0,0.08)` resting

## Assets
- `assets/logo-primary.png` — black + red logo, for light backgrounds
- `assets/logo-white.png` — white + red logo, for dark backgrounds (nav is always on white bg currently, so only used in footers)
- No other imagery exists yet — every photo/video slot in the mocks is a labelled dashed-border placeholder. See the Content Brief below for what's pending.

## Pending Content (from the design brief — do not treat as final)
- Hero visual, photo gallery (8–12 images), testimonial quote — 1.0 event photography available, needs curation
- Recap reel — currently an Instagram reel, needs re-hosting for embedding
- Session videos (3 tracks) — exist on YouTube from the 1.0 livestream, need to be linked/captioned
- Speaker photos (~24) — 1.0 roster available on request
- Exact event date, venue, and theme — currently reads "This November · Lagos"
- Partner/waitlist/exhibit form backends — currently client-side-only success states

## Files
- `Home.dc.html` — Home page, desktop
- `Home Mobile.dc.html` — Home page, mobile
- `Watch.dc.html` — Watch/Recap page, desktop
- `Watch Mobile.dc.html` — Watch/Recap page, mobile
- `About.dc.html` — About page, desktop (no mobile version yet)
- `Partner.dc.html` — Partner/Sponsor Inquiry page, desktop (no mobile version yet)
- `Home Options (exploration).dc.html` — hero layout exploration (context only, not a build target)
- `AbilityX-2.0-Claude-Design-Brief.md` — original content/intent brief this design was built from
- `assets/` — logo files
