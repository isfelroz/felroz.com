# felroz inner pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the four title-only inner pages (Projets, Parcours, À propos, Contact, FR and EN) with the approved designs, and make the small home changes they imply.

**Architecture:** Each page gets a view in `src/views/` (Layout + the existing `BigTitle` + page components), and the page components live in a folder per page under `src/components/`. Copy lives in `src/i18n/{fr,en}.json`; language-neutral data lives in `src/data/global.json`. Behaviour is limited to small processed Astro `<script>`s: the Parcours scroll panel and the Contact copy button. No new React.

**Tech Stack:** Astro 7, Tailwind 4 (`@theme` tokens in `src/styles/global.css`), node:test against `dist/`, agent-browser for visual and browser checks.

**Spec:** `docs/superpowers/specs/2026-11-09-felroz-inner-pages-design.md`. The visual reference is in `docs/superpowers/specs/2026-11-09-felroz-inner-pages/` (`projets-v6.html`, `final-v4.html#parcours|#a-propos|#contact`). Every implementer reads the spec, opens the relevant mockup at 1440, 1100 and 400 px, and rebuilds it with project components. Never paste mockup markup or mockup-only controls (page switcher, version labels, « Aperçu à 12 projets »).

## Global Constraints

- pnpm only. Commits are semantic (`feat:`, `fix:`, `docs:`, `test:`…) and **never carry a `Co-Authored-By` trailer or any Claude/Anthropic attribution**. Do not push.
- Copy: the FR copy is verbatim from the spec. The EN copy is written by the implementer: same meaning, short first-person sentences, no pitch. Every string exists in both `fr.json` and `en.json` under the same keys.
- Forbidden anywhere in `dist/`: `INTERNAL_NAME`, any email other than `hello@felroz.com`, commit counts, module counts or lists, business figures, « Annecy » on Contact, felroz.com as a project.
- At most one `text-signal` or `bg-signal` inside `<main>` per page (One Signal Rule). DM Mono metadata goes below titles, never above them (no eyebrows).
- Keep the `BigTitle client:load` ghost title on every inner page, the header and the mobile menu. No new `client:*` islands.
- Tokens only (`prune`, `corail`, `peche`, `carbone`, `carbone-raised`, `carbone-deep`, `dot`, `craie`, `ink-soft`, `label-dark`, `label-light`). Illustrations reuse home geometry: the dotted route, the hollow node, the Pêche arrival dot, `Helicopter.astro` and the dot field.
- `prefers-reduced-motion: reduce` → every animation and transition from this plan is off, and content shows in its final state. With JS disabled, every page is complete and readable.
- WCAG 2.2 AA contrast, including dimmed Parcours chapters. Full keyboard access with visible focus. Decorative SVGs are `aria-hidden="true"` unless the spec gives them a name.
- Done means `pnpm test` is green, plus a visual check of the touched pages at 1440, 1100 and 400 px in FR and EN.

## Review Focus

1. **JS off or script error:** all 9 Parcours chapters are visible and not dimmed, and the Contact « Copier » button stays hidden. Tests in Tasks 3 and 5 assert this on the server HTML.
2. **Long French copy at 400 px:** no horizontal scroll, and no card text clipped. Task 7 adds `tests/browser/overflow.js`, run on all 10 routes at 400, 1100 and 1440 px.
3. **A future project without its own drawing:** it renders the default illustration instead of breaking the build. Task 4 pins this with `illustrationKey()` unit tests.
4. **Clipboard missing or `writeText` rejected:** the button stays hidden, or the live region announces the failure, and the `mailto:` link keeps working. Task 3 pins this.
5. **Reduced motion:** the Parcours panel swaps scenes instantly and the tilted cards rest straight. Tasks 5 and 6 assert that the built CSS carries `prefers-reduced-motion` rules for their selectors.

---

### Task 1: Data foundation and content guards

**Files:**
- Modify: `src/data/global.json`
- Create: `tests/content.test.mjs`
- Create: `tests/i18n.test.mjs`
- Modify: `tests/helpers.mjs` (add `pages()` and `main()`)

**Interfaces:**
- Produces:
  - `globalData.email === "hello@felroz.com"`;
  - `globalData.projects: Array<{ id: string, year: number, stack: string[], illustration?: string }>`, set to `[{id:"crm",year:2026,stack:["Nuxt","Laravel","Docker"],illustration:"crm"},{id:"intranet",year:2025,stack:["Nuxt","PostgreSQL","MS Graph"],illustration:"intranet"}]`;
  - `globalData.journey: Array<{ id: string, label: string, kind: "start"|"stop"|"hinge"|"diploma"|"now" }>`, set to `start, factory, annecy(hinge), bachelor, ios, ceovision, walt, mba(diploma), hbg(now)`, in that order. The labels are `2008, 2014, 2017, 2018, 2019, 2020, 2021, Bac+5, 2025`.
- Produces in `tests/helpers.mjs`:
  - `pages(): string[]`: every built route that has an `index.html` (walk `dist/`);
  - `main(html): string`: the slice from `<main` to `</main>`.

- [ ] **Step 1: Write the failing tests**

  `tests/i18n.test.mjs`:
  - `fr and en have the same keys`: a recursive list of key paths in `fr.json` deep-equals the one for `en.json`; arrays are compared by length, then item by item.

  `tests/content.test.mjs`:
  - `global.json email` → `assert.equal(data.email, 'hello@felroz.com')`.
  - `projects data` → `data.projects.map(p => p.id)` deep-equals `['crm','intranet']`, and every item has exactly 3 `stack` entries.
  - `journey data` → the ids deep-equal `['start','factory','annecy','bachelor','ios','ceovision','walt','mba','hbg']`, and exactly one item has `kind === 'diploma'` (id `mba`, label `Bac+5`).
  - `no forbidden strings in dist` → for every route in `pages()`, the HTML contains none of `INTERNAL_NAME`, `@gmail`. Every match of `/[\w.+-]+@[\w-]+\.[a-z]{2,}/gi` in the visible text (scripts and styles stripped) equals `hello@felroz.com`.
  - `no commit counts` → for every route, `main(html)` does not match `/\bcommits?\b/i`.

- [ ] **Step 2: Run them to make sure they fail**

  Run: `pnpm test`
  Expected: FAIL on `global.json email`, `projects data` and `journey data`.

- [ ] **Step 3: Add `email`, `projects` and `journey` to `src/data/global.json`, and add `pages()` and `main()` to `tests/helpers.mjs`**

  Use the values from Interfaces above. Do not remove `featuredTags` yet; Task 2 does that.

- [ ] **Step 4: Run the tests to make sure they pass**

  Run: `pnpm test`
  Expected: PASS (all existing tests plus the new ones).

- [ ] **Step 5: Commit**

  ```bash
  git add src/data/global.json tests/
  git commit -m "test: add content guards and inner-page data"
  ```

### Task 2: Home changes

**Files:**
- Create: `src/components/home/MethodCard.astro` (replaces `FeaturedCard.astro`)
- Delete: `src/components/home/FeaturedCard.astro`
- Modify: `src/views/HomePage.astro`
- Modify: `src/components/home/ContactBand.astro`
- Modify: `src/data/global.json` (remove `featuredTags`)
- Modify: `src/i18n/fr.json`, `src/i18n/en.json`: `home.featured` becomes `home.method { title, text, stations[4] }`, and `home.now.role` changes.
- Modify: `tests/home.test.mjs`

**Interfaces:**
- Consumes: `globalData.email` (Task 1).
- Produces: home links to `localizePath('about', locale) + '#method'`. Task 6 must give the À propos "Comment je travaille" section `id="method"`.

- [ ] **Step 1: Update the tests in `tests/home.test.mjs`**
  - `linked tiles point to their pages`: `href('featured')` equals `p.about + '#method'`.
  - New, `no home tile links to Projets`: `main` contains no `href="${p.projects}"`.
  - New, `method tile copy` (FR): the featured tile contains `Comment je travaille`, `Comme à l'usine : des processus clairs, la qualité sur la ligne.` (after `decode`), and the four labels `Spec`, `Issues`, `Revue`, `Prod` in that order.
  - `contact band…` becomes `contact band has social pills and the email`: the band contains `<a[^>]*href="mailto:hello@felroz.com"`.
  - New, `now role` → FR main contains `Développeur &amp; ingénieur IA chez` (or its decoded form), and EN contains `Developer &amp; AI engineer at`.
  - `global.json…` test: also assert `!('featuredTags' in data)`.
  - Keep `one signal on the home`: MethodCard uses no signal.

- [ ] **Step 2: Run them to make sure they fail**

  Run: `pnpm test`
  Expected: FAIL on the featured href, method copy, email, now role and featuredTags.

- [ ] **Step 3: Implement**
  - **`MethodCard.astro` (`{ title, text, stations }`):** keeps the featured tile's two-part layout. On the Deep panel, a miniature U line with 4 stations: hollow Prune node first, Pêche dot last, dotted route in the gaps. Then the h2, the arrow icon and the line of text. The panel is `aria-hidden`, and the station labels appear as text in DM Mono.
  - **Stations EN copy:** `Spec`, `Issues`, `Review`, `Ship`.
  - **HomePage:** the featured `Tile` gets `href={localizePath('about', locale) + '#method'}` and `label={home.method.title}`.
  - **ContactBand:** adds a pill with `href="mailto:${globalData.email}"` showing the address, styled like the social pills. Update the component's doc comment.
  - **`home.now.role`:** FR `Développeur & ingénieur IA chez`, EN `Developer & AI engineer at`.

- [ ] **Step 4: Run the tests and check visually**

  Run: `pnpm test`
  Expected: PASS.

  Then run `agent-browser eval "$(cat tests/browser/squares.js)"` on `/` at 1440, 1150 and 400 px.
  Expected: `{"ok":true}`.

- [ ] **Step 5: Commit**

  ```bash
  git add -A src/components/home src/views/HomePage.astro src/data/global.json src/i18n tests/home.test.mjs
  git commit -m "feat: turn the featured tile into Comment je travaille and add the email to the home"
  ```

### Task 3: Contact page

**Files:**
- Create: `src/views/ContactPage.astro`
- Create: `src/components/contact/BadgeReverse.astro`
- Create: `src/components/contact/CopyEmail.astro` (button + live region + `<script>`)
- Modify: `src/pages/contact.astro`, `src/pages/en/contact.astro`
- Modify: i18n `contact { lead, copy, copied, copyFailed, languages }`
- Create: `tests/inner-pages.test.mjs`

**Interfaces:**
- Consumes: `globalData.email`, `globalData.socials`.
- Produces: the view pattern later tasks copy, `<Layout locale routeKey><BigTitle client:load>{t.pages[routeKey]}</BigTitle>…</Layout>`. Also the `tests/inner-pages.test.mjs` file, which later tasks extend with one `describe` block per page.

- [ ] **Step 1: Write the failing tests** (for `/contact` and `/en/contact`)
  - `ghost title`: `<h1` contains `Contact`.
  - `email is the one signal`: `main` has exactly one `text-signal|bg-signal`, on an `<a href="mailto:hello@felroz.com"`.
  - `socials`: links to `https://www.linkedin.com/in/isfelroz` and `https://github.com/isfelroz`.
  - `no Annecy`: `main` does not include `Annecy`.
  - `copy button hidden without JS`: the main HTML has `<button[^>]*data-copy="hello@felroz.com"[^>]*hidden`, and an element with `aria-live="polite"`.
  - FR copy: `Une question, une idée, un projet ? Écrivez-moi.` and `Je réponds en espagnol, en français ou en anglais.`

- [ ] **Step 2: Run them to make sure they fail**

  Run: `pnpm test`
  Expected: FAIL (the page only has a title).

- [ ] **Step 3: Implement following `final-v4.html#contact`**
  - **Badge reverse:** large, with the front (monochrome Corail *f* + felroz, not gradient) peeking out underneath, tilted.
  - **Email:** a large `mailto:` link with `text-signal`.
  - **Socials:** LinkedIn and GitHub as rows (`target="_blank" rel="me noopener"`, `aria-label`).
  - **Copy button script:** if `navigator.clipboard?.writeText` exists, remove `hidden`. On click, write the email and set the live region to `copied` for about 2 s. On rejection, set it to `copyFailed`.
  - **Footer line:** the languages line at the foot.
  - **Reduced motion:** the tilt has no transition.

- [ ] **Step 4: Run the tests and check visually**

  Run: `pnpm test`
  Expected: PASS.

  Check `/contact` and `/en/contact` at 1440, 1100 and 400 px. Click « Copier » in agent-browser, then read the live region.
  Expected: it shows the `copied` text.

- [ ] **Step 5: Commit**

  ```bash
  git add src/views/ContactPage.astro src/components/contact src/pages/contact.astro src/pages/en/contact.astro src/i18n tests/inner-pages.test.mjs
  git commit -m "feat: build the Contact page"
  ```

### Task 4: Projets page

**Files:**
- Create: `src/lib/projects.js`
- Create: `src/views/ProjectsPage.astro`
- Create: `src/components/projects/ProjectCard.astro`
- Create: `src/components/projects/illustrations/{Crm,Intranet,Default}.astro`
- Modify: `src/pages/projets.astro`, `src/pages/en/projects.astro`
- Modify: i18n `projects.items.{crm,intranet}.{title,text,illustrationLabel}`
- Test: `tests/projects.test.mjs` (unit), plus a block in `tests/inner-pages.test.mjs`

**Interfaces:**
- Consumes: `globalData.projects` (Task 1), the view pattern (Task 3), `Helicopter.astro`.
- Produces: `illustrationKey(project: { illustration?: string }): 'crm' | 'intranet' | 'default'` in `src/lib/projects.js`, and `ILLUSTRATIONS = ['crm', 'intranet']`.

- [ ] **Step 1: Write the failing tests**

  `tests/projects.test.mjs`:
  - `illustrationKey({illustration:'crm'}) === 'crm'`;
  - `illustrationKey({}) === 'default'`;
  - `illustrationKey({illustration:'nope'}) === 'default'`.

  `inner-pages` block for `/projets` and `/en/projects`:
  - `cards follow the data`: `[...main.matchAll(/<article[^>]*data-project="(\w+)"/g)]` ids deep-equal `['crm','intranet']`.
  - `no links in cards`: no `<a` inside any `article`.
  - `three chips each`: each article holds 3 chip items with the stack values in order.
  - `crm drawing is named`: the crm article's SVG has a `<title>` that includes `CAMO` and `mécaniciens` (FR).
  - FR copy: `CRM de vols`, `Intranet de groupe`, `Il remplace l'app de 2022 : API et front séparés.`, `Elle remplace un Drupal pour plus de 100 collaborateurs.`, `2026`, `2025`.
  - `no lead, no felroz project`: `main` contains no `felroz.com`, and nothing between the h1 and the first article except whitespace and markup.
  - `signal`: at most 1 in `main`.

- [ ] **Step 2: Run them to make sure they fail**

  Run: `pnpm test`
  Expected: FAIL.

- [ ] **Step 3: Implement following `projets-v6.html`**
  - **`illustrationKey`:** returns `project.illustration` when it is in `ILLUSTRATIONS`, otherwise `'default'`.
  - **Card layout:** `ProjectCard` takes `{ id, year, stack, title, text, illustrationLabel }`. It renders an `<article data-project={id}>` with a square illustration panel on the left (200–248 px), then the h2 title, the year in DM Mono below it, the sentence and the chips.
  - **Grid:** 2 columns above 1100 px, 1 horizontal column at ≤1100 px, stacked at ≤760 px.
  - **No hover underlayer:** no Card link and no Split Card hover.
  - **Illustrations:**
    - **Crm:** `Helicopter.astro` in a ring of 9 heavier nodes, without labels. On card hover the rotor spins and the nodes turn corail.
    - **Intranet:** 108 dots that turn corail on hover.
    - **Default:** the dotted route between a hollow node and a Pêche dot over a dot-field patch.
  - **Accessible names:** each SVG uses `role="img"` and `<title>{illustrationLabel}</title>`.
  - **Reduced motion:** no spin and no transitions.

- [ ] **Step 4: Run the tests and check visually**

  Run: `pnpm test`
  Expected: PASS.

  Check `/projets` and `/en/projects` at 1440, 1100 and 400 px against the mockup.

- [ ] **Step 5: Commit**

  ```bash
  git add src/lib/projects.js src/views/ProjectsPage.astro src/components/projects src/pages/projets.astro src/pages/en/projects.astro src/i18n tests
  git commit -m "feat: build the Projets gallery"
  ```

### Task 5: Parcours page (scrollytelling)

**Files:**
- Create: `src/views/JourneyPage.astro`
- Create: `src/components/journey/RoutePanel.astro` (sticky SVG route)
- Create: `src/components/journey/Chapter.astro`
- Create: `src/components/journey/DiplomaCard.astro`
- Create: `src/components/journey/journey.js` (client script, imported from a `<script>` in JourneyPage)
- Modify: `src/pages/parcours.astro`, `src/pages/en/journey.astro`
- Modify: i18n `journey { lead, signal, stages.<id>.{title,meta,text?}, mba.{chip}, seeProjects }`
- Test: a block in `tests/inner-pages.test.mjs`

**Interfaces:**
- Consumes: `globalData.journey` (Task 1), the view pattern (Task 3).
- Produces in the DOM:
  - each chapter is `<section data-stage={id} data-kind={kind}>`;
  - the route panel has one node `[data-node={id}]` per stage;
  - the script sets `data-active` on the chapter in view and on its node.

- [ ] **Step 1: Write the failing tests** (for `/parcours` and `/en/journey`)
  - `stages in order`: the `data-stage` ids deep-equal the journey ids from Task 1. Every one also has a `data-node` in the panel.
  - `readable without JS`: no chapter carries `hidden`, `aria-hidden="true"` or an inline `opacity:0`, and the server HTML has no `data-active`.
  - `MBA weight`: the `mba` chapter has `data-kind="diploma"`, the label `Bac+5`, and `RNCP niveau 7` (FR) / the same chip text in EN. Its node has a double ring (`data-ring="double"`).
  - `one signal on pipeline`: `main` has exactly one signal, wrapping `pipeline de déploiement` (FR).
  - `HBG links to projects`: the `hbg` chapter contains `<a href="/projets"` (FR) / `/en/projects` (EN).
  - FR copy spot checks: `Alicia Giraldo, confection pour de grandes marques.`, `J'arrive à Annecy.`, `Sur GoFAST, l'alternative open source à Microsoft 365.`, `MBA Développeur Full Stack &amp; management de projets` (or its decoded form).
  - `reduced motion CSS`: some CSS file under `dist/_astro` contains `prefers-reduced-motion` together with a `[data-stage]` or `.route-panel` selector.

- [ ] **Step 2: Run them to make sure they fail**

  Run: `pnpm test`
  Expected: FAIL.

- [ ] **Step 3: Implement following `final-v4.html#parcours`**
  - **Desktop (≥1101 px):** two columns, with a sticky Carbone Deep `RoutePanel` and chapters in large type. Each chapter shows its giant label (year, or `Bac+5`), the h2 title, the DM Mono meta below it and the text.
  - **Scroll script (`journey.js`):** an `IntersectionObserver` sets `data-active` on the chapter crossing the middle of the viewport and on its node. Active node: grows. Active label: lights up. Inactive chapters: dimmed, still AA. « ANNECY » lights up for the `annecy` chapter. The script runs only at ≥1101 px and does nothing under reduced motion (all chapters stay full).
  - **Smaller screens (≤1100 px):** no panel. A dotted route line runs down the left with the nodes; `mba` is double there too.
  - **Hinge:** `annecy` is a hinge line, not a full chapter.
  - **Endpoints:** the hollow node for `start`, the Pêche dot for `hbg`.
  - **MBA:** `DiplomaCard` holds the title, the dates/school meta and the « RNCP niveau 7 » chip.
  - **Copy:** the FR copy for every stage comes verbatim from the spec, in its "Parcours" section.

- [ ] **Step 4: Run the tests and check visually**

  Run: `pnpm test`
  Expected: PASS.

  Scroll `/parcours` at 1440 px in agent-browser and screenshot at 3 scroll positions; the active chapter changes. Check 1100 and 400 px. Check with JS disabled (`agent-browser` with JavaScript off) that every chapter is fully visible.

- [ ] **Step 5: Commit**

  ```bash
  git add src/views/JourneyPage.astro src/components/journey src/pages/parcours.astro src/pages/en/journey.astro src/i18n tests/inner-pages.test.mjs
  git commit -m "feat: build the Parcours scrollytelling route"
  ```

### Task 6: À propos page

**Files:**
- Create: `src/views/AboutPage.astro`
- Create: `src/components/about/{Story,Toolbox,StarMap,Method,OffCode}.astro`
- Modify: `src/pages/a-propos.astro`, `src/pages/en/about.astro`
- Delete: `src/views/TitlePage.astro` (no page uses it any more)
- Modify: i18n `about { story.{lead,body,signal,languages}, toolbox.{title,groups[{id,label,tools[]}]}, method.{title,lead,stations[{title,text}]}, offcode.{title,items[3]} }`
- Test: a block in `tests/inner-pages.test.mjs`

**Interfaces:**
- Consumes: the view pattern (Task 3), `src/assets/me.png`, the home pizza geometry from `MeCard.astro`, the monochrome symbol (Task 3's `BadgeReverse` approach).
- Produces: section ids `story`, `toolbox`, `method`, `offcode`. Task 2's home link targets `#method`.

- [ ] **Step 1: Write the failing tests** (for `/a-propos` and `/en/about`)
  - `sections`: `main` contains `id="story"`, `id="toolbox"`, `id="method"` and `id="offcode"`, in that order.
  - `one signal on je passe au code`: exactly one signal in `main`, wrapping `je passe au code` (FR).
  - `toolbox groups`: 6 groups with ids `front, back, mobile, prod, integrations, ia`. The FR text includes `Microsoft Graph / SharePoint, Entra ID` and `Développement agentique (Claude Code), MCP`. The star map SVG is `aria-hidden="true"`.
  - `method stations`: 4 stations; the FR titles are `La spec avant le code.`, `Des issues, pas des post-it.`, `Une revue avant chaque merge.` and `Des agents IA, sous contrôle.`
  - `badge`: an `<img` built from `me.png` (an `/_astro/me` path) with non-empty `alt`.
  - `off code`: `Photographie`, `Culture urbaine` and `Pizza au pepperoni` (FR).
  - `reduced motion CSS`: the built CSS has a `prefers-reduced-motion` rule covering the badge tilt or the `.offcode` hovers.
  - `TitlePage gone`: `existsSync('src/views/TitlePage.astro') === false`.

- [ ] **Step 2: Run them to make sure they fail**

  Run: `pnpm test`
  Expected: FAIL.

- [ ] **Step 3: Implement following `final-v4.html#a-propos`**
  - **Story:** about 7/12 wide, with « Je suis né à Bogotá. » in display size and the body a step smaller. The signal is on « je passe au code ». The badge (`<Image>` of `me.png`) sits on the right, smaller, tilted 2.5°, and straightens on hover. The `ES FR EN` chips (with `lang` attributes) and the languages line close the section.
  - **Toolbox:** the list of 6 groups carries the content. `StarMap` is decorative: monochrome Corail *f* at the centre, 6 hubs, one satellite per tool, labels outside the nodes. Hovering a list group lights its hub and satellites. The map is `aria-hidden`, so there are no extra focus stops; that is the implementer's call per the spec's intent, because the list already gives keyboard and screen-reader users the full content.
  - **Method:** the lead line, then 4 stations on a U line joined by the dotted route in the gaps. The first station is a hollow Prune node, the last the Pêche dot.
  - **OffCode:** one shelf with 3 objects (camera, street, pizza) and their hover micro-interactions.
  - **TitlePage:** delete it.

- [ ] **Step 4: Run the tests and check visually**

  Run: `pnpm test`
  Expected: PASS.

  Check `/a-propos` and `/en/about` at 1440, 1100 and 400 px. Follow the home's « Comment je travaille » tile; it lands on `#method`.

- [ ] **Step 5: Commit**

  ```bash
  git add -A src/views src/components/about src/pages/a-propos.astro src/pages/en/about.astro src/i18n tests/inner-pages.test.mjs
  git commit -m "feat: build the À propos page"
  ```

### Task 7: Docs, overflow check, final verification

**Files:**
- Create: `tests/browser/overflow.js`
- Modify: `PRODUCT.md`, `DESIGN.md`, `.impeccable/design.json`, `README.md` (if it describes the pages)

**Interfaces:**
- Consumes: everything above.

- [ ] **Step 1: Write `tests/browser/overflow.js`**

  It runs in the page via `agent-browser eval` and returns JSON `{ ok, bad: [...] }`. It flags:
  - `document.documentElement.scrollWidth > innerWidth`;
  - any element inside `<main>` whose `getBoundingClientRect().right` exceeds `innerWidth + 1`;
  - any `[data-project]` or `[data-stage]` element whose `scrollWidth > clientWidth + 1`.

- [ ] **Step 2: Run it on every route at 400, 1100 and 1440 px**

  Routes: `/`, `/en`, `/projets`, `/en/projects`, `/parcours`, `/en/journey`, `/a-propos`, `/en/about`, `/contact`, `/en/contact`. Use `pnpm build && pnpm preview`, or the running dev server.
  Expected: `{"ok":true}` everywhere. Fix any finding in the owning component.

- [ ] **Step 3: Update the docs**
  - **`PRODUCT.md`:**
    - email `hello@felroz.com` decided;
    - employers named in Parcours;
    - title « Développeur & ingénieur IA » (replace line 42's « Ingénieur IA chez HBG Helicopters »);
    - inner-page content exists;
    - the featured project became « Comment je travaille »;
    - "Evidence on Hand" lists the two projects;
    - remove the decided items from "Not yet decided".
  - **`DESIGN.md` and `.impeccable/design.json`:** add components for the project card, default illustration, scrollytelling route panel and chapter, diploma node and card, star map, U production line, and badge reverse. Update the "featured" component entry.

- [ ] **Step 4: Final verification**

  Run: `pnpm test`
  Expected: PASS with 0 failures.

  Run `tests/browser/squares.js` on `/` at 1440, 1150 and 400 px; it returns `{"ok":true}`. Then do a keyboard pass on the four inner pages: every interactive element shows a visible focus, and there are no hidden focus stops.

- [ ] **Step 5: Commit**

  ```bash
  git add tests/browser/overflow.js PRODUCT.md DESIGN.md .impeccable/design.json README.md
  git commit -m "docs: document the inner pages and add an overflow check"
  ```
