# felroz.com Bento Home Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the felroz.com home with a square-card bento: a 3D Memoji badge hero, seven summary cards and a pointer-reactive dot field. Rename CV to Parcours.

**Architecture:**
- Everything is `.astro`, with small inline-processed `<script>`s: the dot field, the greeting and the avatar orbit. No React islands on the home.
- Bento CSS lives in `src/styles/global.css`. Each card is one component under `src/components/home/`.
- All copy is in `src/i18n/{fr,en}.json`; language-neutral data is in `src/data/global.json`.
- `@google/model-viewer` is dynamically imported after first paint.
- Tests are `node:test` files that assert on the built `dist/` HTML. Browser checks are JS snippets run with `agent-browser eval`.

**Tech Stack:** Astro 7, Tailwind 4 (`@theme`), React 19 (server-only `Icon`), `@google/model-viewer@4.4.0`, pnpm, `node --test`, `agent-browser`.

**Spec:** `docs/superpowers/specs/2026-11-07-felroz-home-bento-design.md`, approved. Read it before every task.

**Visual reference:** `/private/tmp/claude-501/-Users-falroz-orca-workspaces-felroz-com-cisco/8ba60b0e-ebdd-4c6c-ba46-056c3037c981/scratchpad/mock/felroz-v3.src.html`, a throwaway prototype.
- Copy its look and behaviour from `#bento` (markup lines ~470–585, CSS lines ~1–445, JS lines ~730–858).
- Everything after `#bento` (`.cases`, `#route`, `.about`, `.contact`) is out of scope.
- Where the spec and the mockup disagree, the spec wins. Spec §6 lists those calls: neutral route labels, rotor spins on hover only, a single Stack tab stop.

## Global Constraints

- pnpm only. Never delete `pnpm-lock.yaml`. Dependencies are pinned exactly: `@google/model-viewer@4.4.0`.
- **No commits and no pushes.** CLAUDE.md says "Do not commit or push unless the user asks". Each task ends with its changes uncommitted; the controller decides. If Felipe later asks for commits, the messages are semantic (`feat:`, `refactor:`…) and **never** carry a `Co-Authored-By` trailer.
- Copy lives only in `src/i18n/fr.json` and `src/i18n/en.json`, and both get the same keys. Brand and tech names live in `src/data/global.json`.
- Tailwind 4 syntax and brand tokens only: `prune`, `corail`, `peche`, `carbone`, `carbone-raised`, `ink-soft`, `label-dark`. Add `--color-carbone-deep: #1f2124` and `--color-dot: #3a3d43` to `@theme`. No raw hex in components, except inside SVG drawings where the mockup uses token values.
- One Signal Rule: `text-signal`/`bg-signal` appears exactly once on the home, on the hero lead's last part.
- Machine voice (`label-mono`) is used only for data (tags, chips, the toolbelt line), never as an eyebrow.
- Images go through `astro:assets`. `public/` holds only `models/memoji.glb`, fonts and favicons.
- Internal product names never appear. "HBG Helicopters" appears only on the En ce moment card.
- Breakpoints: 4 columns ≥1101px, 2 columns 641–1100px, 1 column ≤640px. Gap 28px, or 20px at ≤640px. Radius 24px (`rounded-3xl`). Container max width 1240px.
- Under `prefers-reduced-motion: reduce`: no animation at all, content in its final state, and the poster instead of the 3D model.

## Review Focus

1. **EN copy at 1101px overflowing a square tile.** The row grows and squares break. Expect every 1×1 tile to be square ±1px and no tile to have `scrollHeight > clientHeight`, in FR and EN. Owner: Task 3 (`tests/browser/squares.js`).
2. **Model fails to load, or there is no WebGL.** A 404, a slow network or a WebGL-less browser should leave the poster visible, with no empty box. Owner: Task 5 (missing-src browser check).
3. **Language switch on renamed pages.** `/en/journey` must point to `/parcours` and the reverse, both in the switcher and in hreflang alternates. Owner: Task 1 (build test).
4. **Nested or unreachable links.** There must be no `<a>` inside `<a>` on the home. The Stack card is one tab stop. The HBG link is reachable and opens in a new tab with `rel="noopener"`. Owner: Task 3 (build test) and Task 4.
5. **Reduced motion and touch.** The greeting shows the locale's word immediately, the dot field is drawn but static, there is no stagger and no rotor. Owner: Task 8 (`agent-browser set media reduced-motion`).

---

### Task 1: Test harness, Parcours route, nav order, meta copy

**Files:**
- Create: `tests/helpers.mjs`, `tests/routes.test.mjs`, `src/pages/parcours.astro`, `src/pages/en/journey.astro`
- Delete: `src/pages/cv.astro`, `src/pages/en/resume.astro`
- Modify: `package.json` (scripts), `astro.config.mjs` (redirects), `src/i18n/index.js:11`, `src/i18n/fr.json`, `src/i18n/en.json` (meta, nav, pages), `src/components/Header.astro:12`, `src/components/Footer.astro:11`

**Interfaces:**
- Produces:
  - `tests/helpers.mjs` exports `page(route: string): string`. It returns the contents of `dist/<route>/index.html`; route `'/'` maps to `dist/index.html`. It throws if the file is missing.
  - `package.json` script `"test": "astro build && node --test tests/"`.
  - Route key `resume` stays and now maps to `{ fr: '/parcours', en: '/en/journey' }`.

- [ ] **Step 1: Write the failing tests in `tests/routes.test.mjs`**

```js
test('parcours pages exist', () => {
  assert.match(page('/parcours'), /<title>Parcours · felroz<\/title>/)
  assert.match(page('/en/journey'), /<title>Journey · felroz<\/title>/)
})
test('old resume URLs redirect', () => {
  assert.match(page('/cv'), /url=\/parcours/)
  assert.match(page('/resume'), /url=\/parcours/)
  assert.match(page('/en/resume'), /url=\/en\/journey/)
})
test('language switch and hreflang on journey', () => {
  const en = page('/en/journey')
  assert.match(en, /href="\/parcours"[^>]*hreflang="fr"|hreflang="fr"[^>]*href="\/parcours"/)
  assert.match(page('/parcours'), /hreflang="en"[^>]*href="https:\/\/felroz\.com\/en\/journey"/)
})
test('nav order is Projets · Parcours · À propos', () => {
  const nav = page('/').match(/<nav[\s\S]*?<\/nav>/)[0]
  assert.ok(nav.indexOf('Projets') < nav.indexOf('Parcours') && nav.indexOf('Parcours') < nav.indexOf('À propos'))
})
test('home meta copy', () => {
  assert.match(page('/'), /<title>felroz — Développeur full-stack &amp; ingénieur IA<\/title>/)
  assert.match(page('/en'), /<title>felroz — Full-stack developer &amp; AI engineer<\/title>/)
})
```

- [ ] **Step 2: Run `pnpm test`.** Expected: FAIL, because `dist/parcours/index.html` is missing.

- [ ] **Step 3: Implement the route and copy changes.**
  - Redirects: `'/resume': '/parcours'`, `'/cv': '/parcours'`, `'/en/resume': '/en/journey'`.
  - Header link order: `['projects', 'resume', 'about']`. Footer link order: `['projects', 'resume', 'about', 'contact']`.
  - `nav.resume` and `pages.resume`: `Parcours` / `Journey`.
  - `meta.titles.resume`: `Parcours · felroz` / `Journey · felroz`.
  - `meta.titles.home`: spec call 8.
  - `meta.description`: FR exactly as in spec call 8. EN: `Felipe Alarcon (felroz), full-stack developer and AI engineer in Annecy. Web apps from the API to the interface.`

- [ ] **Step 4: Run `pnpm test`.** Expected: all 5 tests PASS.

---

### Task 2: Pointer-reactive dot field on every page

**Files:**
- Create: `src/components/DotField.astro`, `tests/layout.test.mjs`
- Modify: `src/layouts/Layout.astro` (render `<DotField />` first in `<body>`), `src/styles/global.css` (remove the unused `.dot-field` class)

**Interfaces:**
- Produces: `<canvas data-dot-field aria-hidden="true">`. It is fixed and full-viewport, behind content, with `pointer-events: none`.

- [ ] **Step 1: Write the failing test.**

```js
for (const r of ['/', '/en', '/projets', '/parcours', '/a-propos', '/contact'])
  test(`dot field on ${r}`, () => assert.match(page(r), /<canvas[^>]*data-dot-field[^>]*aria-hidden="true"/))
```

- [ ] **Step 2: Run `pnpm test`.** Expected: FAIL on `/`.

- [ ] **Step 3: Implement `DotField.astro`.**
  - Port the mockup's dot field (lines ~736–753): GAP 22, R 150, base `rgb(58,61,67)` → Corail `rgb(202,102,120)`, falloff `(1-d/R)²`, radius `1.3 + t·1.4`, DPR capped at 2.
  - Redraw on `resize` and `scroll`, and on `pointermove` only when `e.pointerType !== 'touch'` and reduced motion is off, always through one `requestAnimationFrame`.
  - It never animates on its own.
  - Header, main and footer content must stack above it.

- [ ] **Step 4: Run `pnpm test` (PASS), then check in the browser.** Run `pnpm build && pnpm preview`, open `/` with `agent-browser`, move the pointer and screenshot. Dots near the pointer must turn Corail. On `/projets` the ghost title must stay above the field.

---

### Task 3: Square bento grid, tile shell and the content cards

**Files:**
- Create:
  - `src/components/home/Bento.astro`, `src/components/home/Tile.astro`
  - `src/components/home/NowCard.astro`, `src/components/home/Helicopter.astro`
  - `src/components/home/JourneyCard.astro`, `src/components/home/FeaturedCard.astro`, `src/components/home/MeCard.astro`, `src/components/home/ContactBand.astro`
  - `tests/home.test.mjs`, `tests/browser/squares.js`
- Modify:
  - `src/views/HomePage.astro` (full rewrite)
  - `src/components/Card.astro`: `h-full`, and `p-8` becomes `p-7 max-[640px]:p-6`
  - `src/components/Container.astro`: `mx-auto w-full max-w-[1240px] px-4`
  - `src/styles/global.css` (bento rules, tile stagger, `@theme` additions from Global Constraints)
  - `src/data/global.json`
  - `src/i18n/fr.json`, `src/i18n/en.json` (replace the whole `home` object; schema below)

**Interfaces:**
- Produces:
  - `Tile.astro` props: `{ size: '1x1' | '2x1' | '2x2' | 'band', area: string, index: number, href?: string, label?: string, labelledby?: string }`.
    - It renders `<div class="tile" data-size={size} style="grid-area:{area};--i:{index}">`.
    - It wraps `<Card href label>` (Split Card hover) when `href` is set, and a plain card face otherwise.
    - Linked tiles never contain other links.
  - `Bento.astro` renders `<div class="bento">` with the slot.
  - Grid areas: `hero now journey skills featured stack me contact`. Desktop template:
    `"hero hero now journey" "hero hero skills skills" "featured featured stack me" "contact contact contact contact"`.
  - 1×1 tiles get `aspect-ratio: 1` only at ≥1101px. The hero gets `aspect-ratio: 1` at ≥1101px. 2×1 tiles stretch to the row. Below 1101px every height is natural.
  - Order at 2 columns: hero, now, journey, skills, featured, stack, me, contact. Hero, skills, featured and contact span 2. Same order at 1 column.
  - Stagger: `.tile { animation: tile-in .45s ease-out both; animation-delay: calc(var(--i) * 70ms) }`, a fade plus 12px rise, disabled under reduced motion.
  - `global.json` (replaces `skills`):
    ```json
    "employer": { "name": "HBG Helicopters", "href": "https://www.hbg-helicopteres.aero/" },
    "toolbelt": ["Laravel", "Nuxt", "Vue", "TypeScript", "Docker"],
    "featuredTags": ["Astro", "React", "Tailwind 4"],
    "languages": ["ES", "FR", "EN"],
    "stack": [{ "type": "typescript", "name": "TypeScript" }, { "type": "nuxt", "name": "Nuxt" }, { "type": "laravel", "name": "Laravel" }, { "type": "postgresql", "name": "PostgreSQL" }, { "type": "docker", "name": "Docker" }, { "type": "python", "name": "Python" }]
    ```
  - `home` i18n schema (FR values exact; write natural EN):
    ```json
    "hero":    { "greetings": ["Hola,", "Hello,", "Bonjour,"], "name": "je suis Felipe.", "lead": "Développeur full-stack. Je conçois et livre des apps web, ", "signal": "de l'API à l'interface.", "avatarAlt": "Avatar 3D de Felipe, assis en méditation" },
    "now":     { "title": "En ce moment", "role": "Ingénieur IA chez", "newTab": "(nouvel onglet)" },
    "journey": { "title": "Parcours", "roles": ["Ingénieur", "Développeur", "AI Engineer"], "text": "D'ingénieur industriel à AI engineer, de Bogotá à Annecy." },
    "skills":  { "title": "Savoir-faire", "items": [{ "icon": "api", "label": "APIs" }, { "icon": "web", "label": "Interfaces web" }, { "icon": "mobile", "label": "Apps mobiles" }, { "icon": "automation", "label": "Automatisations" }, { "icon": "deploy", "label": "Mise en prod" }, { "icon": "agents", "label": "Agents IA" }] },
    "featured":{ "title": "Projet phare", "text": "Ce site : direction artistique, design system documenté et build Astro bilingue." },
    "stack":   { "title": "Stack", "label": "Stack : {list}. En savoir plus sur moi" },
    "me":      { "title": "Colombien à Annecy", "text": "Photo, culture urbaine et pizza au pepperoni." },
    "contact": { "title": "Parlons-en." },
    "socialLabel": "{name} de Felipe Alarcon"
    ```
    The last greeting is the page language's word: EN greetings are `["Hola,", "Bonjour,", "Hello,"]` and the EN name is `I'm Felipe.`.
- Tile links: journey → `localizePath('resume')`, featured → `projects`, stack → `about`, me → `about`. Hero, now, skills and contact are not linked tiles.
- This task renders the **hero, skills and stack tiles as empty placeholders**: `<Tile>` with its title only. Tasks 4 and 5 fill them.

- [ ] **Step 1: Write the failing tests in `tests/home.test.mjs`.** Run them for `/` and `/en`.

```js
test('eight tiles in order', () => {
  const areas = [...html.matchAll(/class="tile"[^>]*grid-area:\s*(\w+)/g)].map((m) => m[1])
  assert.deepEqual(areas, ['hero', 'now', 'journey', 'skills', 'featured', 'stack', 'me', 'contact'])
})
test('no nested links', () => { /* walk <a / </a> tokens; depth never exceeds 1 */ })
test('HBG link only on now tile, new tab', () => {
  assert.equal(html.match(/HBG Helicopters/g).length >= 1, true)
  assert.match(html, /<a[^>]*href="https:\/\/www\.hbg-helicopteres\.aero\/"[^>]*target="_blank"[^>]*rel="[^"]*noopener/)
})
test('no placeholder or forbidden copy', () => {
  for (const s of ['à compléter', 'TODO', 'Travaillons ensemble', 'INTERNAL_NAME', '%</']) assert.ok(!html.includes(s), s)
})
test('no client:load islands on home', () => assert.ok(!/<astro-island[^>]*GridItem/.test(html)))
```

`tests/browser/squares.js` is an IIFE that returns JSON `{ ok, bad: [...] }`. A tile is bad when:
- at ≥1101px, it is 1×1 with `|w-h| > 1`;
- at ≥1101px, it is the hero with `|w-h| > 1`;
- at any width, it has `scrollHeight > clientHeight + 1` (the check runs on each card face);
- `document.documentElement.scrollWidth > innerWidth`.

- [ ] **Step 2: Run `pnpm test`.** Expected: FAIL in `home.test.mjs`.

- [ ] **Step 3: Implement the grid, the tiles and the five content cards** (ported from the mockup's `.t-now`, `.t-route`, `.t-case`, `.t-me` and `.t-contact`).
  - `Helicopter.astro`: the mockup's H135 SVG, `aria-hidden`. Its `.rotor` spins (`transform-origin: 80px 66px`, 1.2s linear infinite) **only while `.tile:hover`**, and never under reduced motion.
  - `JourneyCard`:
    - a single Corail dotted path, with hollow Corail nodes and a Pêche arrival dot that nudges on hover;
    - the three role labels in an HTML row, `label-dark`, DM Sans .8125rem, nowrap;
    - title + `Icon type="arrow"`.
  - `FeaturedCard`: `Symbol.astro` on a `bg-carbone-deep` panel, plus the 4 swatches (prune, corail, peche, carbone-raised). Tags are `label-mono` pills from `featuredTags`. On hover, the symbol's node nudges.
  - `MeCard`: the mockup's flat pizza SVG (rotates on hover), `languages` chips, and the title + text.
  - `ContactBand`: a big title and pill links for each `socials` entry, `target="_blank" rel="me noopener"` with the `socialLabel` aria-label. No email.

- [ ] **Step 4: Run `pnpm test`.** Expected: PASS.

- [ ] **Step 5: Run the square check.**
  - Run `pnpm build && pnpm preview`.
  - For each width in 1440, 1200, 1101, 900, 400 and each locale in `/` and `/en`, run `agent-browser set viewport <w> 900 && agent-browser open <url> && agent-browser eval "$(cat tests/browser/squares.js)"`.
  - Expected: `{"ok":true}` everywhere.
  - Tune padding or type size until it passes, as spec call 13 allows.

---

### Task 4: Savoir-faire and Stack cards

**Files:**
- Create: `src/components/home/SkillsCard.astro`, `src/components/home/StackCard.astro`
- Modify:
  - `src/components/react/Icon.jsx`: add `postgresql: SiPostgresql`, and the neutral glyphs `api: LuBraces`, `web: LuAppWindow`, `mobile: LuSmartphone`, `automation: LuWorkflow`, `deploy: LuRocket`, `agents: LuSparkles` from `react-icons/lu`.
  - `src/views/HomePage.astro`: replace the two placeholders.
  - `tests/home.test.mjs`

**Interfaces:**
- Consumes:
  - `Tile` (Task 3);
  - `home.skills`, `home.stack` and `global.json` `toolbelt` / `stack` (Task 3);
  - `Icon` rendered server-side with no `client:*`.

- [ ] **Step 1: Add the failing tests.**

```js
test('skills card lists six items and the toolbelt', () => {
  const tile = html.match(/grid-area:\s*skills[\s\S]*?(?=class="tile")/)[0]
  assert.equal((tile.match(/<li/g) || []).length, 6)
  assert.match(tile, /Laravel · Nuxt · Vue · TypeScript · Docker/)
})
test('stack card is one link whose name lists the stack', () => {
  const tile = html.match(/grid-area:\s*stack[\s\S]*?(?=class="tile")/)[0]
  assert.equal((tile.match(/<a\b/g) || []).length, 1)
  assert.match(tile, /aria-label="Stack : TypeScript, Nuxt, Laravel, PostgreSQL, Docker, Python\. En savoir plus sur moi"/)
  assert.ok(!/tabindex="0"/.test(tile))
})
```

- [ ] **Step 2: Run `pnpm test`.** Expected: FAIL.

- [ ] **Step 3: Implement both cards.**
  - **SkillsCard** (not linked): 2 columns × 3 rows of icon tile + label. On hover, the icon tile's border and icon turn Corail. The `toolbelt` joins with ` · ` in `label-mono`. At 1101px it must fit one row height.
  - **StackCard** (linked to À propos):
    - Build a static SVG constellation at build time: the `Symbol` at the centre and the 6 logos on an ellipse, with straight lines from the centre. All of it is `aria-hidden`, with no per-node focus and no JS.
    - On `group-hover` / `group-focus-visible`, lines and node strokes turn Corail.
    - `{list}` in the label is `stack.map(s => s.name).join(', ')`.

- [ ] **Step 4: Run `pnpm test` (PASS) and `tests/browser/squares.js` at 1101 and 400.** Expected: ok.

---

### Task 5: Hero badge with greeting and lazy 3D Memoji

**Files:**
- Create: `src/components/home/HeroBadge.astro`, `src/components/home/Avatar3D.astro`, `public/models/memoji.glb`, `tests/browser/avatar.js`
- Modify: `package.json` (via `pnpm add @google/model-viewer@4.4.0 --save-exact`), `src/views/HomePage.astro`, `tests/home.test.mjs`

**Interfaces:**
- Consumes: `Tile size="2x2" area="hero"` (Task 3) and `home.hero` (Task 3).
- Produces:
  - Markup: `<model-viewer data-avatar data-src="/models/memoji.glb" …>` containing `<img slot="poster">` from `astro:assets` (`src/assets/me.png`, eager, with width and height).
  - The model-viewer attributes are the spec §4.4 settings, copied from the mockup line 484. There is **no `src` attribute in the HTML**.

- [ ] **Step 1: Copy the optimized model.**

```sh
cp /private/tmp/claude-501/-Users-falroz-orca-workspaces-felroz-com-cisco/8ba60b0e-ebdd-4c6c-ba46-056c3037c981/scratchpad/glb/memoji.glb public/models/memoji.glb
```

If that file is missing, regenerate it with the spec §4.4 command from `/Users/falroz/Downloads/59797f71-46e8-4db3-b6ae-600898bc0765/base_basic_pbr.glb`.

- [ ] **Step 2: Add the failing tests.**

```js
test('hero h1 reads the final greeting', () => {
  assert.match(page('/'), /<h1[^>]*>[\s\S]*Bonjour, je suis Felipe\.[\s\S]*<\/h1>/)
  assert.match(page('/en'), /<h1[^>]*>[\s\S]*Hello, I'm Felipe\.[\s\S]*<\/h1>/)
})
test('one signal on the home, on the hero lead', () => {
  assert.equal((html.match(/text-signal|bg-signal/g) || []).length, 1)
  assert.match(html, /class="[^"]*text-signal[^"]*">de l'API à l'interface\./)
})
test('model is not requested by the HTML', () => {
  assert.match(html, /<model-viewer[^>]*data-src="\/models\/memoji\.glb"/)
  assert.ok(!/<model-viewer[^>]*\ssrc=/.test(html))
  assert.match(html, /<img[^>]*slot="poster"/)
})
test('glb under 3 MB', () => assert.ok(statSync('public/models/memoji.glb').size < 3 * 1024 ** 2))
```

- [ ] **Step 3: Run `pnpm test`.** Expected: FAIL.

- [ ] **Step 4: Implement `HeroBadge`.** Port the mockup's badge CSS: `.t-hero`, `.stage`, the `::before` slot 52×6px at top 9px, the Deep 14px dot grid and the Pêche dot; at ≤1100px the stage is full width with `aspect-ratio: 4/3`.
  - The `h1` holds an sr-only `{last greeting} {name}`.
  - The visible greeting is an `aria-hidden` span stack showing the last word in the static HTML.
  - Inline script: unless reduced motion is on, show greetings[0], swap every 1300ms, and stop on the last word. It plays once.
  - The lead is `{lead}<span class="text-signal">{signal}</span>`.

- [ ] **Step 5: Implement `Avatar3D`.**
  - Stop if reduced motion is on, or if `!document.createElement('canvas').getContext('webgl2') && !…('webgl')`.
  - Otherwise, on `requestIdleCallback` (falling back to `setTimeout` 1500ms) **and** once the hero is intersecting: `await import('@google/model-viewer')`, then set `mv.src = mv.dataset.src`.
  - On the `error` event, remove `src` so the poster stays.
  - Orbit: on `pointermove` over the hero tile (ignore `pointerType === 'touch'`), clamp x and y to [-1, 1] relative to the stage centre, with y up positive. Set `cameraOrbit = `${x*38}deg ${80 - y*14}deg auto``. On `pointerleave`, set `0deg 80deg auto`.
  - Size: `model-viewer { width: 100%; height: auto; aspect-ratio: 1 }`.

- [ ] **Step 6: Run `pnpm test`.** Expected: PASS.

- [ ] **Step 7: Run the browser checks with `pnpm preview` at 1440.** `tests/browser/avatar.js` returns JSON with:
  - `loaded`: the model's `loaded` property after waiting up to 8s;
  - `glbBeforePaint`: `performance.getEntriesByName(location.origin + '/models/memoji.glb')[0]?.startTime < performance.getEntriesByType('paint').find(p => p.name === 'first-contentful-paint').startTime`;
  - `posterAfterError`: set `src = '/models/missing.glb'`, wait for `error`, and check that the poster `img` is visible with `offsetHeight > 0`.

  Expected: `{"loaded":true,"glbBeforePaint":false,"posterAfterError":true}`.
  Then move the pointer to the hero's right edge and screenshot: the Memoji must turn toward it.
  Finally run `squares.js` at 1101 and 400.

---

### Task 6: Remove dead components and skill percentages

**Files:**
- Delete:
  - `src/components/react/GridItem.jsx`, `src/components/react/ProgressCircle.jsx`, `src/components/ProgressSkill.astro`
  - `src/components/Grid.astro`
  - `src/components/cards/HeroCard.astro`, `LinkCard.astro`, `NowCard.astro`, `IconCard.astro`
  - Delete each only if `grep -rn` finds no remaining import.
- Modify: `src/i18n/*.json` (drop now-unused keys such as `home.projects`, `home.agentic`, `home.resume`, `stack.skillLabel`), `package.json` (remove `motion` only if `BigTitle.jsx`/`MenuResponsive.jsx` no longer import it; they still do, so expect to keep it)

- [ ] **Step 1: Add a failing test.** In `tests/home.test.mjs`, assert that `global.json` has no `skills` key and that no `"value":` number remains under `stack`.

- [ ] **Step 2: Delete the files and drop the keys.** Then run `grep -rn "GridItem\|ProgressSkill\|ProgressCircle\|cards/" src`. Expected: no output.

- [ ] **Step 3: Run `pnpm test`.** Expected: PASS, with a clean build.

---

### Task 7: DESIGN.md and design.json

**Files:**
- Modify: `DESIGN.md` (sections Layout ~176, Cards ~233, Navigation ~242, Skill Progress Ring ~252 (remove), Background Motifs ~255, Do's and Don'ts ~259, plus a new Motion section), `.impeccable/design.json` (`components` and `narrative`)

- [ ] **Step 1: Write the DESIGN.md changes listed in spec §8.**
  - Layout: §4.1 grid, breakpoints and order.
  - Navigation: Projets · Parcours · À propos, and Journey.
  - Background Motifs: the dot field values from Task 2; routes allowed as single-colour card illustrations, never behind text.
  - Components: badge hero, 3D avatar (poster fallback, pointer orbit θ = x·38°, φ = 80° ± 14°), helicopter illustration (rotor spins on hover only).
  - Motion: the spec §5 budget.
  - Delete Skill Progress Ring.

- [ ] **Step 2: Mirror the changes in `.impeccable/design.json`.** Add the new components and remove the progress ring. Check with `node -e "JSON.parse(require('fs').readFileSync('.impeccable/design.json'))"`. Expected: no error.

- [ ] **Step 3: Check that DESIGN.md has no leftovers.** Run `grep -n "300px\|ProgressSkill\|Progress Ring\|CV" DESIGN.md`. Expected: no stale references.

---

### Task 8: Full verification pass

**Files:** none. If a fix is needed, it is a small edit inside the files owned by the earlier tasks.

- [ ] **Step 1: Build and run the tests.** Run `pnpm test`. Expected: the build finishes with 0 errors and every test passes.
- [ ] **Step 2: Check squares at every width.** In `pnpm preview`, run `squares.js` at 1440, 1200, 1101, 900 and 400 for `/` and `/en`. Expected: ok in all 10 runs. Save screenshots to the scratchpad `crit/impl-<w>-<locale>.png` and view the 1440 and 400 ones.
- [ ] **Step 3: Check reduced motion.**
  - Run `agent-browser set media dark reduced-motion`, then open `/`.
  - Expected: `getComputedStyle(tile).animationName` is `none` (or the tiles are already at their final opacity); the greeting reads Bonjour at t=0; `model-viewer` has no `src`; the poster is visible.
- [ ] **Step 4: Check the keyboard.** Tab from the top of `/` and record the `document.activeElement` sequence. Expected:
  - skip link, header links, HBG link, Parcours tile, Projet phare tile, Stack tile (once), Moi tile, GitHub, LinkedIn, footer;
  - each one has a visible Pêche outline (screenshot one).
- [ ] **Step 5: Check the redirects.** In preview, `/cv` and `/resume` must land on `/parcours`, and `/en/resume` on `/en/journey`.
- [ ] **Step 6: Report the results** to the controller, as test output plus a pass/fail list. Do not commit.
