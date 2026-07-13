# AbilityX Design System

**Brand:** AbilityX by ProjectEnable Africa  
**Type:** Event brand / Movement brand  
**Region:** Nigeria / Africa

---

## About AbilityX

AbilityX is not just an event — it's a movement. It is Nigeria's leading annual convening focused on the future of disability inclusion. AbilityX brings together innovators, policymakers, startups, technologists, donors, civil society, and persons with disabilities to reimagine what inclusive development looks like in Africa.

Organized by **ProjectEnable Africa (PEA)**, AbilityX operates at the intersection of advocacy, technology, and lived experience.

---

## Source Materials

| Asset | Location |
|---|---|
| Primary logo (black + red, transparent) | `assets/logo-primary.png` |
| White logo (white + red, transparent) | `assets/logo-white.png` |
| White logo alt | `assets/logo-white-alt.png` |
| Original uploads | `uploads/` |

*No Figma links, GitHub repos, or codebases were provided. Design system derived from logo assets and brand description only.*

---

## CONTENT FUNDAMENTALS

### Tone & Voice
- **Bold, declarative, movement-oriented.** AbilityX speaks like a manifesto, not a press release.
- **Inclusive and empowering** — language centers persons with disabilities as protagonists, not recipients.
- **African-rooted, globally ambitious.** Speaks to Nigeria and the continent, with an eye on global relevance.
- **Action-forward.** Uses strong active verbs: *reimagine*, *convene*, *build*, *lead*, *transform*.

### Casing
- **Title Case** for event names, session titles, speaker names.
- **Sentence case** for body copy and descriptions.
- **ALL CAPS** used sparingly — for section labels, category tags, or short accent lines only.

### Pronouns & Perspective
- Uses **"we" and "you"** — collective movement language. Not corporate third-person.
- "We" = the movement (AbilityX + community). "You" = the attendee/partner/innovator.

### Emoji
- **Not used** in formal brand communication. The brand speaks with visual weight and typographic power, not emoji.

### Messaging Examples
- *"AbilityX is not just an event. It's a movement."*
- *"Reimagining what inclusive development looks like in Africa."*
- *"Innovators. Policymakers. Startups. Technologists. Persons with disabilities. Together."*
- *"The future of disability inclusion starts here."*

---

## VISUAL FOUNDATIONS

### Color
- **Primary Red** `#CC0000` — the signature accent; used in the human-figure icon, CTAs, highlights
- **Black** `#0D0D0D` — dominant text and wordmark color; commands authority
- **White** `#FFFFFF` — clean ground; plenty of space is used
- **Light Gray** `#F5F5F5` — subtle section backgrounds
- **Mid Gray** `#6B6B6B` — secondary/body text
- **Dark Gray** `#1F1F1F` — near-black for layered surfaces

### Typography
- **Display / Wordmark:** Heavy rounded sans-serif (custom or close to Nunito Black 900). Tight tracking, very large scale.
- **Headings:** Nunito ExtraBold / Black — rounded, authoritative, warm
- **Body:** DM Sans Regular / Medium — clean, highly legible, inclusive (accessible at all sizes)
- **Labels / Tags:** DM Sans Medium, ALL CAPS, 0.1em letter-spacing
- *Note: Exact wordmark font is custom or unlicensed; Nunito Black is used as a close Google Fonts substitute.*

### Backgrounds
- **White** is the dominant background — clean, bright, accessible
- **Black** backgrounds used for high-contrast hero moments (white logo on black)
- **Red** accent backgrounds used sparingly for CTAs or section callouts
- **No gradients** in the core brand — solid, confident color blocks
- **No textures or patterns** from available evidence

### Imagery
- Should feature **real people** — persons with disabilities, attendees, speakers — in action
- **Warm, vibrant** color treatment preferred — not desaturated or clinical
- Full-bleed hero photography is appropriate for event contexts
- Avoid stock-photo feel; documentary/candid preferred

### Layout
- **Generous whitespace** — content breathes
- Strong typographic hierarchy: very large display heads, modest body
- **Grid-based** — structured, not freeform
- Section-based flow common in event sites

### The Logo Icon (Human Figure in X)
- The "X" letterform contains a stylized person: **red dot = head**, **red arc = arms raised / body in motion**
- This figure represents joy, freedom, movement, ability — a person in celebration
- The figure should never be cropped or obscured in logo usage

### Animation
- **Subtle, purposeful** — entrance fades and slides, not bounces or loops
- Transitions: ease-in-out, ~300ms
- Reduced-motion respect required (accessibility-first brand)

### Hover / Press States
- Hover: slight darkening on red CTAs; opacity 0.85 on image overlays
- Press: scale(0.97) on buttons
- No heavy shadow lifts; flat-to-slight-elevation transitions

### Borders & Radius
- **4px** small (tags, inputs)
- **8px** medium (cards)
- **999px** pill (badges, CTA buttons)
- Minimal border usage — prefers clean whitespace separation

### Cards
- White background, subtle shadow (`0 2px 12px rgba(0,0,0,0.08)`)
- 8px or 16px radius
- No colored left-border accent style

### Shadows / Elevation
- Soft, diffuse shadows — not material-design hard drops
- `box-shadow: 0 2px 12px rgba(0,0,0,0.08)` — resting state
- `box-shadow: 0 6px 24px rgba(0,0,0,0.14)` — hover/raised state

### Iconography
- **No icon font or SVG set provided.** See ICONOGRAPHY section below.
- Clean, outlined or filled geometric icons preferred (Phosphor or Lucide style)

---

## ICONOGRAPHY

No icon system was provided in the source materials. Based on brand character:

- **Recommended system:** [Phosphor Icons](https://phosphoricons.com/) or [Lucide Icons](https://lucide.dev/) — clean, geometric, modern
- **Style:** Regular weight, outlined — never decorative or illustrative
- **Size:** 20px (UI), 24px (feature), 32px+ (hero callouts)
- **Color:** Inherits brand colors — black for neutral, red for accent
- No emoji used as iconography
- No unicode character substitutes in formal contexts

In the event context, icons may be used for:
- Session category tags (accessibility, tech, policy, etc.)
- Navigation items
- Speaker/partner section identifiers

---

## File Index

| File | Description |
|---|---|
| `README.md` | This file — brand overview and design principles |
| `colors_and_type.css` | CSS custom properties for all color and type tokens |
| `assets/logo-primary.png` | Full color logo (black + red, transparent bg) |
| `assets/logo-white.png` | White logo (white + red, transparent bg) |
| `assets/logo-white-alt.png` | White logo alternate crop |
| `preview/` | Design System tab preview cards |
| `ui_kits/website/` | Event website UI kit |
| `SKILL.md` | Agent skill descriptor |
