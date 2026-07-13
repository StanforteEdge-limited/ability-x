## AbilityX Website Design Spec

### Scope

Build only the two pages defined in `docs/design_handoff_abilityx_2_0`:

1. Home page for AbilityX 2.0 at `/`
2. AbilityX 1.0 recap page at `/events/1.0`

Do not implement About, Partner, or holding-state pages in this pass.

### Source Of Truth

Use both documentation bundles, with clear precedence:

1. `docs/design_handoff_abilityx_2_0/` is the source of truth for page scope, section order, copy, route targets, and page-specific behavior for this build.
2. `docs/abilityx_design_system/` is the source of truth for brand tokens, visual language, spacing scale, motion guidance, radius, shadows, logo usage, and component styling patterns.

If the two differ slightly, prefer the handoff for page-specific structure and content, and prefer the design system for reusable styling/token decisions.

### Stack

- Next.js with App Router
- Tailwind CSS
- Local typed content data objects

The content layer should be structured so it can later be swapped to Payload with minimal page/component changes.

### Architecture

Suggested app structure:

- `app/layout.tsx`
- `app/page.tsx`
- `app/events/1.0/page.tsx`
- `app/globals.css`
- `components/`
- `content/`
- `public/`

`app/layout.tsx` will set metadata and global font classes.

`app/page.tsx` will render the AbilityX 2.0 home page.

`app/events/1.0/page.tsx` will render the recap page described in the handoff as the Watch page, while using the user-approved route structure under `/events`.

### Content Model

Use typed local content objects and arrays instead of repeating hardcoded JSX items.

Recommended files:

- `content/home.ts`
- `content/event-1-0.ts`
- `content/stats.ts`
- `content/speakers.ts`
- `content/sessions.ts`

These files should hold:

- Home hero copy
- mission/about copy
- stats data
- pillar cards
- CTA cards and success messages
- speaker placeholders
- recap page header content
- session track and session placeholder data

This preserves a low-friction migration path to Payload later by keeping page composition dependent on stable data shapes instead of inline JSX content.

### Components

Shared components:

- `SiteNav`
- `SiteFooter`
- `Container`
- `SectionHeading`
- `PillButton`
- `PlaceholderMedia`

Home page sections:

- `HeroSection`
- `MissionSection`
- `StatsSection`
- `RecapSection`
- `PillarsSection`
- `AskSection`
- `SpeakersSection`

Event page sections:

- `EventHeader`
- `RecapHeroBlock`
- `SessionTrackSection`
- `SessionCard`

Interactive component:

- a small client component for the three CTA cards on the home page, with local submitted state per card

Most sections should remain server-rendered. Only the CTA submission-state UI needs client interactivity.

### Routing And Navigation

Routes:

- `/` for the current AbilityX 2.0 homepage
- `/events/1.0` for the AbilityX 1.0 recap page

Navigation labels:

- `Home`
- `AbilityX 1.0`
- `Partner With Us` on home

Behavior:

- On home, `AbilityX 1.0` navigates to `/events/1.0`
- On home, `Partner With Us` scrolls to `#ask`
- On `/events/1.0`, the active pill becomes `AbilityX 1.0`
- On `/events/1.0`, the `Home` link navigates back to `/`

This keeps the handoff behavior while making the information architecture sustainable for future event pages such as `/events/2.0` and `/events/3.0`.

### Design System Translation

Translate the AbilityX design-system tokens into Tailwind theme values and a small semantic layer, then apply them to the page layouts defined in the handoff.

Theme foundations:

- colors for the red ramp (`50-900`), neutral ramp, semantic foreground/background/border tokens, and status colors
- typography using Nunito for display/headings, DM Sans for body/UI, and preserving room for DM Mono as a future utility font
- border radius values for small, medium, large, extra-large, and pill surfaces
- the documented shadow scale from `xs` through `xl`
- the documented spacing scale from `space-1` through `space-32`
- motion timing tokens for fast/base/slow transitions

Semantic utility patterns in `globals.css` may be added for repeated styles such as:

- section vertical padding
- kicker styling
- pill button variants
- dashed placeholder surfaces

The goal is an AbilityX-specific Tailwind configuration without building a broader design-token framework prematurely.

Additional brand constraints from the design system:

- preserve the bold, declarative, movement-oriented tone in UI copy treatment
- keep backgrounds mostly solid and confident; do not introduce decorative textures or gradients as core branding
- use subtle, purposeful motion only
- prefer clean geometric iconography only if icons are needed; do not add emoji or decorative icon styles

### Page Details

#### Home

Implement the handoff sections in this order:

1. fixed nav
2. hero
3. mission/about with gallery placeholders
4. proof/stats with testimonial placeholder
5. recap video moment
6. four pillars
7. three-part CTA at `#ask`
8. speakers placeholder grid
9. footer

Important details to preserve:

- high-fidelity copy and layout hierarchy from the handoff
- partner CTA emphasis in the three-part ask section
- dashed placeholder treatment for unfinished imagery/video content
- responsive layouts derived from the desktop/mobile mocks, but implemented as fluid CSS

#### AbilityX 1.0 Page

Implement the handoff Watch page under `/events/1.0` with these sections:

1. fixed nav
2. header
3. recap reel placeholder
4. three session tracks with session card grids
5. footer

Use `AbilityX 1.0` as the page/nav framing while preserving the recap/session-library structure from the handoff.

### State And Behavior

Home CTA cards should use local client state only.

Expected success messages:

- Partner: `Thanks — our partnerships team will follow up shortly.`
- Waitlist: `You're on the list — we'll email you the moment registration opens.`
- Exhibit: `Noted — we'll notify you when exhibitor applications open.`

No network submission is required in this pass.

Animation should remain subtle and minimal, using fades/slides around 300ms and respecting `prefers-reduced-motion`.

### Accessibility

Because the site is for a disability inclusion conference, accessibility needs explicit verification rather than being treated as incidental.

Include at minimum:

- meaningful alt text strategy for logos and placeholder media
- sufficient color contrast for text, pills, cards, and overlays
- keyboard-reachable navigation and form controls
- visible focus states
- reduced-motion support for transitions and scroll behavior where applicable
- semantic headings and landmark structure
- accessible placeholder labeling so unfinished media blocks are understandable to screen-reader users

### Verification

Before considering the implementation complete, verify:

- app runs locally
- both pages render correctly
- desktop and mobile layouts match the handoff intent
- nav links work correctly
- `#ask` anchor behavior works on home
- CTA cards flip to the correct success messages
- typography, colors, spacing, border radii, and shadows match the handoff closely
- placeholder components remain visually distinct and labeled
- lint passes
- accessibility pass is completed for alt text, contrast, keyboard navigation, focus states, semantic structure, and reduced-motion behavior

### Non-Goals

- Payload CMS integration
- real form backends
- real recap/session embeds
- finalized event photography, testimonial, speaker roster, or date/venue content
- any pages beyond the two in the handoff
