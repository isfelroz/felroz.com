# felroz.com — Bento home redesign

**Date:** 2026-11-07
**Branch:** `isfelroz/apply-felroz-da`
**Reference mockup:** https://claude.ai/artifact/G2micZZoJDnEuRQUKDCziz (v3, version 13). Source template: `scratchpad/mock/felroz-v3.src.html`. It is a throwaway prototype: copy the look and behaviour, not the code.

## 1. Intent

The site is Felipe's personal *carte de visite*. It shows his brand and what he knows, for the day he looks for a job or for anyone who wants to know about him. Freelance is secondary: there is no sales CTA.

He wants to read as a **developer first**. His path is industrial engineer (Colombia) → web developer (Annecy) → today an AI engineer building the flights CRM at HBG Helicopters. AI is part of the story, not the protagonist.

The current home has too much text and too few graphics. The new home is a **bento of square cards**. Each card sums up one page and links to it, with small purposeful graphics in place of paragraphs.

## 2. Goals, non-goals, anti-goals

**Goals**
- A bento home that tells who he is in one look: avatar, role, current job, path, know-how, stack, personality, contact.
- Keep and extend the felroz art direction (`DESIGN.md`). Every visual follows its rules, and DESIGN.md is updated where this design changes them (§8).
- Rename the CV page to **Parcours**.
- Ship a 3D Memoji that turns toward the pointer.

**Non-goals (later phases)**
- **Phase 2: inner-page content.** Projets case studies, the Parcours timeline and the À propos story need real content from Felipe. In phase 1, inner pages keep their current ghost-title layout.
- **Phase 3: 3D animation.** Idle, wave and breathing need a rigged model (Mixamo or Tripo), probably regenerated in a standing pose. The phase 3 model must stay under ~3 MB, play one animation at a time, and respect reduced motion.
- No blog, CMS or contact form.

**Anti-goals** (failure even if it works)
- AI as the hero of the page: agent diagrams, "AI Engineer" as the loudest element, fake agent logs.
- Fake data presented as real: invented metrics, invented app names, "à compléter" visible in production.
- A freelance sales pitch ("Travaillons ensemble").
- Motion overload: many things moving at once on load.
- Breaking the square-card look.
- Naming internal product names. Naming HBG Helicopters is approved, on the "En ce moment" card only.

## 3. Constraints

- Follow `CLAUDE.md`:
  - Astro 7 static site; `.astro` by default.
  - React only when state or `motion` is needed, with the least eager `client:*` directive.
  - pnpm only.
  - All copy in `src/i18n/fr.json` and `en.json`, kept in sync.
  - Language-neutral data in `src/data/global.json`.
  - Images through `astro:assets`.
  - Tailwind 4 `@theme` tokens.
  - No Co-Authored-By trailer on commits.
- FR at `/`, EN under `/en`.
- Must work at 400px wide with no horizontal scroll, and with `prefers-reduced-motion` (content complete and readable at rest).
- Performance: the 3D model must not block first paint. The poster image renders first.

## 4. Decisions made with Felipe

### 4.1 Layout: square bento
- Desktop (≥1101px): 4 columns. **Every card is square or spans whole squares.**
  - 1×1 cards: `aspect-ratio: 1`.
  - The hero is 2×2 and square.
  - Wide cards (2×1) take exactly one row height.
  - Contact is a full-width band of natural height.
- Grid order on desktop:
  ```
  [ Hero 2×2      ][ En ce moment ][ Parcours ]
  [               ][ Savoir-faire 2×1         ]
  [ Projet phare 2×1 ][ Stack      ][ Moi      ]
  [ Parlons-en (full width band)              ]
  ```
- Tablet (≤1100px): 2 columns. Hero, Savoir-faire and Projet phare span 2. Heights become natural.
- Mobile (≤640px): 1 column in the same order, natural heights.
- Gap 28px desktop, 20px mobile. Radius 24px, card shadow, Split Card hover on every linked card (unchanged DA).

### 4.2 Background
The **pointer-reactive dot field** is kept on every page (Felipe "loves it").
- Full-viewport canvas behind content.
- Dots warm from `#3A3D43` toward Corail near the pointer, radius ~150px.
- Redraws only on pointer move or scroll; it never animates on its own.
- On touch pointers and under reduced motion it is still drawn, but static (call 11).

### 4.3 Cards

| Card | Content | Link | Motion |
|---|---|---|---|
| **Hero (badge)** | Styled like a conference badge (inspired by Vercel Ship's badge, not copied). A small slot at the top centre as a lanyard nod. Top: a photo panel (Deep `#1F2124` with a fine 14px dot grid) holding the **3D Memoji**, plus a small Pêche dot in the corner. Bottom: greeting `Hola, → Hello, → Bonjour,` / `je suis Felipe.` and the lead *"Développeur full-stack. Je conçois et livre des apps web, **de l'API à l'interface.**"*. The signal gradient is on the last part only, and it is the page's one signal. | none | Greeting cycles once and rests on the page language's word. Memoji turns toward the pointer. |
| **En ce moment** | Title, a top-down H135-inspired helicopter drawing (fuselage, skids, tail boom, stabiliser, fenestron, 4-blade rotor, Pêche hub, dotted Corail rotor-disc ring), and the line *"Ingénieur IA chez **HBG Helicopters** ↗"*. The company name is an external link (new tab, Corail underline). | external link only | Rotor spins on card hover only (see §5). |
| **Parcours** | Mini dotted route, hollow → hollow → Pêche arrival dot. Labels `Ingénieur · Développeur · AI Engineer`. Title "Parcours" + arrow. Line *"D'ingénieur industriel à AI engineer, de Bogotá à Annecy."* | Parcours page | Arrival dot nudges on hover. |
| **Savoir-faire** (2×1) | 6 items, icon + title, 2 columns × 3 rows: APIs, Interfaces web, Apps mobiles, Automatisations, Mise en prod, Agents IA. One DM Mono line: `Laravel · Nuxt · Vue · TypeScript · Docker`. | none | Icon tile lights on hover. |
| **Projet phare** (2×1) | Phase 1: **this site** as the featured project. Symbol on a Deep panel with the 4 brand swatches. Title "Projet phare" + arrow. Line *"Ce site : direction artistique, design system documenté et build Astro bilingue."* Tags Astro / React / Tailwind 4. No KPI until a real one exists. | Projets page | Symbol node/dot nudge on hover. |
| **Stack** | Constellation: Felipe's symbol at the centre, linked to TS, Nuxt, Laravel, PostgreSQL, Docker and Python logos. One link, no per-node tab stops; the link's accessible name lists the stack. | À propos | Lines and nodes turn Corail on hover/focus. |
| **Moi** | Flat SVG pizza (Pêche crust, Corail pepperoni), `ES FR EN` chips, title *"Colombien à Annecy"*, line *"Photo, culture urbaine et pizza au pepperoni."* | À propos | Pizza rotates on hover. |
| **Parlons-en.** | Big title, then pill links: email (when provided), GitHub, LinkedIn. | external links | none |

The hero has **no meta line** (Annecy / languages): that information lives in the Moi and Parcours cards.

### 4.4 3D Memoji
- **Asset:** Felipe's generated model `~/Downloads/59797f71-…/base_basic_pbr.glb` (24 MB, 500k triangles). It is optimized to `public/models/memoji.glb` (~2.2 MB, ~59k triangles, WebP 1024px textures, quantized, **no Draco or meshopt**, so no external decoder):
  ```sh
  pnpm dlx @gltf-transform/cli@4 optimize base_basic_pbr.glb public/models/memoji.glb \
    --compress quantize --texture-compress webp --texture-size 1024 \
    --simplify true --simplify-ratio 0.1 --simplify-error 0.0005
  ```
- **Viewer:** `@google/model-viewer` (npm dependency, pinned).
  - Settings: no camera controls, no zoom, pan or tap; `interaction-prompt="none"`; neutral environment; exposure ~1.05; `field-of-view` ~28deg; `interpolation-decay` ~120.
  - The camera orbit follows the pointer over the hero card: θ = x·38°, φ = 80° + y·14°. It returns to front on leave.
- **Poster:** the existing `src/assets/me.png` through `astro:assets`, shown until the model loads, and kept as the only image when reduced motion is on or WebGL is unavailable.
- **Loading:** model-viewer and the `.glb` load lazily, after first paint (idle or when visible), never blocking the page.

### 4.5 Pages and navigation
- **CV → Parcours.**
  - Route keys stay internal; the paths change: FR `/cv` → `/parcours`, EN `/en/resume` → `/en/journey` (EN name is my call, see §6).
  - Add redirects `/cv → /parcours` and `/en/resume → /en/journey`, and update the existing `/resume` redirect to `/parcours`.
  - Nav label: `Parcours` / `Journey`. Nav order: Projets · Parcours · À propos.
- **Inner pages** (Projets, Parcours, À propos, Contact): keep the current big translucent ghost title (`BigTitle`). Phase 2 fills their content.
- **Mobile menu:** keep the current `MenuResponsive` exactly as it is.
- **Header and footer:** unchanged apart from the label rename.

## 5. Motion budget
Two protagonists on load: **the dot field** (pointer-driven) and **the greeting** (plays once).

Everything else moves only on interaction:
- Memoji turns toward the pointer.
- Rotor spins on hover.
- Routes and pizza react on hover.
- Split cards offset on hover.

Card entrance is one short CSS stagger (≤ 0.5s per card, ~70ms apart), once, replacing the per-card `motion` spring. Under reduced motion nothing animates and everything is in its final state.

## 6. Calls I made (Felipe can overrule)
1. **EN path and label:** `/en/journey`, "Journey".
2. **Colour of the route labels on Parcours:** all three labels in Label on Dark (no Corail/Pêche on "AI Engineer"), so AI doesn't get the accent; the Pêche arrival dot carries the direction. *(The mockup shows "AI Engineer" in Pêche; the critique recommended neutral.)*
3. **Mini-routes as card content:** allowed, single colour. Corail dotted path with Corail hollow nodes and a Pêche arrival dot, so they don't read as a second gradient. Documented in DESIGN.md as an extension of the Routes motif (§8).
4. **Rotor:** spins on hover only, not continuously (motion budget). The mockup spins continuously.
5. **Savoir-faire icons:** neutral line glyphs (API braces, window, phone, flow, rocket/container, spark), not brand logos. Logos stay in the Stack card.
6. **Card entrance:** CSS stagger instead of `GridItem` + `motion` per card. This removes the `client:load` islands from the home.
7. **Skills percentages and progress rings** leave the home; the Stack card replaces them. `global.json` keeps a plain stack list (no percentages). The `ProgressSkill`/`ProgressCircle` components are deleted if nothing else uses them.
8. **Meta copy:**
   - title `felroz — Développeur full-stack & ingénieur IA` (EN: `felroz — Full-stack developer & AI engineer`);
   - description *"Felipe Alarcon (felroz), développeur full-stack et ingénieur IA à Annecy. Des apps web de l'API à l'interface."* (EN equivalent).
9. **Contact band without an email** until Felipe provides one. Only GitHub and LinkedIn are shown.
10. **HBG link:** `https://www.hbg-helicopteres.aero/`. This is unverified; Felipe confirms before merge.
11. **Dot field on touch screens and under reduced motion:** the field is still drawn, but it does not react. The same canvas renders once, static.
12. **3D model on phones:** loaded lazily like on desktop, when WebGL is available. With no pointer, the model stays facing front.
13. **Container width:** the max content width goes up to ~1240px (as in the mockup), so square cards stay roomy at 1101–1440px. The Savoir-faire card must fit one row height at 1101px. Padding and icon size can be tuned to get there.

## 7. Content still owed by Felipe (blocks nothing in phase 1)
- Email address for the contact band.
- Confirmation of the HBG URL and that "Ingénieur IA" matches his official title. Also the company's OK to be named.
- Phase 2 content:
  - real Parcours roles, years and outcomes;
  - industrial-engineering years;
  - years of experience;
  - Projets case studies and metrics;
  - À propos story.

## 8. DESIGN.md updates (part of this work)
- **Layout:** replace the bento description with the square grid of §4.1, including the breakpoints and the card order.
- **Navigation:** CV → Parcours / Journey, and the new nav order.
- **Background Motifs:**
  - pointer-reactive dot field;
  - routes may appear as **card illustrations** in a single colour (call 3). The "never behind text" rule stays.
- **Components:** add the badge hero, the 3D avatar (poster fallback, pointer orbit) and the "En ce moment" helicopter illustration.
- **Motion:** add the motion budget of §5.
- Mirror the changes in `.impeccable/design.json`.

## 9. Left to the builder
- Component breakdown and file names. Prefer `.astro` with small inline `<script>`s (dot field, greeting, avatar orbit) over React islands.
- Whether `Grid.astro`, `Card.astro`, `LinkCard.astro` and the other cards are adapted or replaced, and removal of unused components.
- Exact SVG drawings, refined from the mockup.
- How model-viewer is loaded lazily (dynamic import on idle or visible).
- EN copy for every new string, natural and not literal.

## 10. Verification
- `pnpm build` with no errors.
- Visual check in `pnpm preview`:
  - at 1440, 1200, 1101, 900 and 400px, FR and EN;
  - all desktop cards square (hero 2×2 square);
  - no horizontal scroll at 400px;
  - no text clipped inside cards.
- Reduced motion: no animation, the poster image instead of the 3D model, everything readable.
- Keyboard: every link reachable with a visible focus; the Stack card is a single tab stop.
- Old URLs `/cv`, `/resume` and `/en/resume` redirect correctly.
- Lighthouse-style sanity: the hero poster paints before the model; the `.glb` is not requested before first paint.
