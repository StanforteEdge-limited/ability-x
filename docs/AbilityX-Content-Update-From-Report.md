# AbilityX Content Update — Sourced from Event Report & Concept Notes

This replaces placeholder copy with real content pulled from the AbilityX 1.0 Detailed Report, the 2025 Concept Note, and the 2026 Concept Note. Three deliverables below: (1) homepage speaker + quote carousel, (2) `/events/1.0` page — richer context + Explore tabs, (3) expanded About page.

---

## 1. Homepage — Speaker + Quote Carousel

Replace the current speaker-grid section with a larger carousel: photo + name + title + a real quote from the report, one slide per speaker. These are verified quotes, not paraphrases — pull them verbatim into the quote field.

```ts
// content/quotes.ts
export const speakerQuotes = [
  {
    name: "Temi Dalley",
    title: "Group Executive, Human Capital & Corporate Services, Sterling Financial Holdings",
    quote: "Don't just talk about inclusion, act it.",
    photo: "/speakers/temi-dalley.jpg" // existing asset from 1.0 site
  },
  {
    name: "Temi Dalley",
    title: "Group Executive, Human Capital & Corporate Services, Sterling Financial Holdings",
    quote: "Inclusion is powerful, and so is creativity. Let us not wait for the world to change, let us be the ones who change it.",
    photo: "/speakers/temi-dalley.jpg"
  },
  {
    name: "Dr Kolawole Olugbodi",
    title: "Founder & CEO, Background Check International (BCI)",
    quote: "Inclusion is not a favour; it is a strategic imperative that strengthens institutions, communities, and nations when implemented deliberately and fairly.",
    photo: "/speakers/kola-olugbodi.jpg"
  },
  {
    name: "Mrs Bolaji Alabi",
    title: "Director, Human Resources, Sheraton Hotel, Ikeja",
    quote: "At the heart of hospitality is the responsibility to create spaces where everyone feels welcomed and supported, regardless of ability.",
    photo: null // PLACEHOLDER — no existing photo asset found on 1.0 site for Alabi
  },
  {
    name: "Mrs Bolaji Alabi",
    title: "Director, Human Resources, Sheraton Hotel, Ikeja",
    quote: "Sustainable inclusion can only be achieved through strong partnerships that bring together policy, practice, and lived experience.",
    photo: null
  }
];
```

**Note:** only pulled quotes with a clearly named, attributed speaker — nothing paraphrased from the report's session-summary prose (that would risk misattribution). If more quotes are wanted, the Fireside Chat section (3.10) and Breakout Session 1 (3.4, financial inclusion) have strong material but no verbatim quotes captured in the report, only summarized insights — would need to go back to source (recording/transcript) for direct quotes from those sessions.

---

## 2. `/events/1.0` Page — Context + Explore Tabs

### Context section (replace generic "watch the recap" framing with real substance)

**Theme:** *"The Future of Disability Inclusion in Nigeria"*
**Date/Venue:** December 2, 2025 · Banquet Hall, Sheraton Hotel, Ikeja, Lagos
**Convened by:** Project Enable Africa, in collaboration with Jobberman Nigeria

**Opening context paragraph (from Executive Summary):**
> AbilityX 1.0 provided a high-level, multi-stakeholder platform to assess Nigeria's disability inclusion landscape five years after the passage of the national disability law. Across plenary discussions and ten breakout sessions, government actors, private sector leaders, civil society organisations, media practitioners, development partners, and persons with disabilities examined disability inclusion as central to human rights, economic productivity, and institutional effectiveness — and set out a shared call to move from awareness to implementation.

**Stats block (real numbers to replace/supplement the 450+/6/5 figures already in use):**
- 450+ attendees
- 6 partner organizations
- 5 media partners
- 10 breakout/plenary sessions across the day
- 3 award categories presented

---

### Explore Section — Tabs

#### Tab 1: Speakers

Full verified roster, pulled from session listings in the report (title/organization included where given):

| Name | Role/Title |
|---|---|
| Mrs Bolaji Alabi | Director, Human Resources, Sheraton Hotel, Ikeja (delivered welcome address on behalf of Martin Bredenoord, GM) |
| Dr Kolawole Olugbodi | Founder & CEO, Background Checks International (BCI) — Opening Remarks |
| Temi Dalley | Group Executive, Human Capital & Corporate Services, Sterling Financial Holdings — Keynote |
| Alakija Adaeze | Spoken word performer |
| Tobiloba Ajayi | Disability Inclusion Advocate & Development Expert — Plenary Moderator |
| Oluseun Onigbinde | CEO, BudgIT (represented by Joseph Idaosha Aminahon, Acting Country Director) |
| Glory Ayiegbeni | MERL Lead, Jobberman Nigeria |
| Cosmas I. B. Okoli | CEO, Mobility Aid and Appliances Research & Development Centre (MAARDEC); National Honour: OON (Dec 2006) |
| Daniel Isaiah Olamide | Moderator — Financial Inclusion breakout |
| Akporee Idenedo | Divisional Head, Commercial Banking, Sterling Bank |
| Khafil Animashaun | Chief Experience Enabler, The Alternative Bank |
| Chioma Nwaiwu | Research Associate, EFInA |
| Esther Obele | Speaker — Employment breakout, Jobberman Nigeria |
| Oluwajuwonlo Esho | Senior Associate, Engagement and Learning Development, Jobberman Nigeria |
| Amirah Hassan | Co-Founder, Citizens Application for Political Participation (CAPP) & Actizen Centre — Moderator |
| Dare Dairo | Former General Manager, Lagos State Office for Disability Affairs (LASODA) |
| Oluwatosin Iseniyi | Public Policy, Research, and Data Analyst |
| Busola Oladunjoye | Project Lead & Senior Project Officer, Centre for Disability and Inclusion Africa (CDIA) |
| Oluwatosin Ishola | Chief Operating Officer, LAFIAMI — Moderator |
| Kingsley Ezeocha | Head of Sales & Marketing, Hygeia HMO Ltd |
| Olubunmi T. Olugbamila | Founder, Damar Place Learning Foundation |
| Segun Matthew | Director, ADI College of Counselling and Psychotherapy |
| Janet Olaoluwa | Program Officer, Project Enable Africa — Moderator |
| Michael Ojediran | Programs Lead, Project Enable Africa — Presenter, State of Disability Inclusion Report |
| Fabia Ogunmekan | Principal Consultant, Adaba Initiative — Moderator |
| Yehia Elmansoury | General Manager, Radisson Hotel Ikeja |
| Satender Singh | CEO, KFC Nigeria |
| Dolapo Agbede | Diversity, Equity & Inclusion (DEI) Expert, Africa — Moderator (two sessions) |
| Kemi Shonubi | Director, People, Culture, Experience and Operations, TVC Communications |
| Victor Otuya | Presenter and Editor, Max FM |
| Monsuroh Abdulsemiu | Program Officer, Cable Newspaper Journalism Foundation (CNJF) — Moderator |
| Kolapo Olapoju | Editor, TheCable |
| Gbenga Ogundare | Disability Rights Advocate |
| Olusola Adeyefa | Fireside Chat Moderator |
| Dipo Adesina | Chief Operating Officer, Verdant Zeal Group |
| Balogun Ajibola | Delivered goodwill message on behalf of Lagos State Commissioner for Youth and Social Development |
| Olalekan Owonikoko | Executive Director, Project Enable Africa — Closing Remarks |

*(Most already have photo assets from the 1.0 WordPress site's speaker grid — reuse those files where names match.)*

#### Tab 2: Videos

Real session recordings already exist and are currently sitting on the old `/live` page (now repurposed as Watch/Recap per earlier plan). Pull these directly into this tab:

```ts
export const sessionVideos = [
  {
    room: "Main Stage",
    youtubeUrl: "https://www.youtube.com/watch?v=ECkUf2QPkzQ",
    thumbnail: "/video-thumbnails/main-stage.png" // reuse from old /live page assets
  },
  {
    room: "Breakout A",
    youtubeUrl: "https://www.youtube.com/watch?v=Nt_28-5t6A8",
    thumbnail: "/video-thumbnails/breakout-a.png"
  },
  {
    room: "Breakout B",
    youtubeUrl: "https://www.youtube.com/watch?v=_DwvL6wEUsg",
    thumbnail: "/video-thumbnails/breakout-b.png"
  }
];
```

> **[PLACEHOLDER: recap reel]** — still needs sourcing from Instagram as previously discussed; the three session recordings above are separate from the highlights reel.

#### Tab 3: Images

> **[PLACEHOLDER]** — no specific image inventory found in the three source documents. Reuse the existing 10-image event photo carousel already on the old WordPress homepage (`DSC08417`–`IMG_9971` series) as the starting set for this tab until the new 2.0-era photo batch is organized.

#### Tab 4: Press

Real, citable press material found in the source docs:

- **TheCable** — *"The state of disability inclusion report 2024: Nigeria's reality check,"* published August 11, 2025. Direct source citation from the report's own footnote: `https://www.thecable.ng/the-state-of-disability-inclusion-report-2024-nigerias-reality-check/`
- **Media partners on record:** TVC Communications and TheCable — both credited by name in the closing remarks as facilitating "public dissemination of key discussions."
- **Session 3.9**, *"Beyond Visibility: Reframing Disability Narratives in the Nigerian Media,"* was convened by TheCable specifically — worth surfacing as its own press-angle highlight, moderated by Monsuroh Abdulsemiu (CNJF) with Kolapo Olapoju (Editor, TheCable) and Gbenga Ogundare as panelists.
- **Session 3.8**, *"From Awareness to Action: How Nigerian Media Can Drive Disability-Inclusive Development,"* convened by TVC Nigeria, moderated by Dolapo Agbede with Kemi Shonubi (TVC Communications) and Victor Otuya (Max FM).

> **[PLACEHOLDER]** — if there's a dedicated press release or media kit document beyond what's in these three files, that would strengthen this tab further; not present in what's been reviewed so far.

---

### Awards presented at 1.0 (worth its own small section, either on this page or folded into the Explore tabs)

| Category | Recipient |
|---|---|
| Digital Innovation Champion | Access Tech Innovation & Research Center |
| Corporate Inclusion Transformer | MTN Nigeria |
| Inclusive Future Leader | Adejobi Adewoye |

---

## 3. About Page — Expanded Copy

Replace the shorter About draft with this fuller version, pulled from the concept notes' "Background" and "About ABILITYX" sections:

> Globally, more than 1 billion people — approximately 15% of the world's population — live with some form of disability. In Nigeria, an estimated 35 million persons with disabilities face compounding barriers: inaccessible infrastructure, limited access to education and healthcare, social stigma, and high unemployment. Despite the 2018 enactment of Nigeria's Discrimination Against Persons with Disabilities (Prohibition) Act, implementation remains slow and inconsistent.
>
> AbilityX was born from the transformation of the Disability Inclusion and Leadership (DIAL) Forum — now in its sixth year — into a bolder, next-generation platform for disability inclusion discourse and leadership in Africa. Convened by Project Enable Africa, AbilityX is Nigeria's premier annual conference on the future of disability inclusion: a community-owned, partnership-driven ecosystem that positions persons with disabilities at the center of innovation and leadership, rather than as subjects of charity.
>
> AbilityX 1.0 launched in December 2025 in Lagos, in partnership with Jobberman Nigeria, convening 450+ stakeholders across government, private sector, civil society, and the disability community. AbilityX 2.0 continues that work this November — deepening the partnership ecosystem and raising the bar on measurable outcomes.

**Vision:** To position Nigeria as a regional leader in disability-inclusive innovation and technology-driven empowerment.

**Mission:** To create a dynamic, youth-focused, community-owned platform that drives cutting-edge solutions, fosters cross-sectoral partnerships, and empowers persons with disabilities as leaders in Africa's digital transformation.

**Core objectives** *(unchanged from earlier brief — already accurate)*:
- Catalyze Innovation
- Drive Policy Transformation
- Empower Digital Leadership
- Build Strategic Partnerships
- Generate Actionable Intelligence

> **[PLACEHOLDER: team/founder photo]** — still needed.

---

## Summary of what changed vs. earlier placeholders

| Item | Before | Now |
|---|---|---|
| Speaker carousel quotes | Not specified / generic placeholder | 5 real, attributed quotes from named speakers |
| `/events/1.0` context | Generic recap framing | Real theme, date, venue, executive summary |
| Explore → Speakers tab | Not specified | 35-person verified roster with titles |
| Explore → Videos tab | Not specified | 3 real YouTube links (Main Stage, Breakout A, Breakout B) |
| Explore → Press tab | Not specified | Real TheCable citation + named media partners + 2 press-relevant sessions |
| Explore → Images tab | Not specified | Points to existing 10-image WP carousel as interim source; flagged as needing a real inventory |
| About page | Short version | Full version with WHO stats, DIAL Forum origin story, vision/mission |
