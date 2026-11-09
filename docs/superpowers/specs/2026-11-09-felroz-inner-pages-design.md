# felroz.com: inner pages (Projets, Parcours, À propos, Contact)

Phase 2 of the felroz redesign. The home bento is done (spec `2026-11-07-felroz-home-bento-design.md`). This document covers the four inner pages, which today render only a ghost title (`src/views/TitlePage.astro`), plus the small home changes those pages imply.

## Intent

felroz.com is Felipe Alarcon's calling card (see `PRODUCT.md`, North Star "The Calling Card" in `DESIGN.md`). The home sums him up in one look. The inner pages are where a recruiter, a tech lead or a peer goes for "tell me more":
- what he built (Projets);
- where he comes from (Parcours);
- who he is and how he works (À propos);
- how to reach him (Contact).

They must feel like the same object as the home: the same materials, symbol geometry and restraint, but each page with its own protagonist and rhythm. Two earlier attempts were rejected. A document-style column read as "not modern, not like the home". A uniform grid of identical square tiles read as monotonous.

## Visual source of truth

Felipe approved two HTML mockups, made by the ui-designer session. They are committed next to this file:

- `2026-11-09-felroz-inner-pages/projets-v6.html`: Projets.
- `2026-11-09-felroz-inner-pages/final-v4.html`: Parcours, À propos and Contact (switcher at the bottom, pages addressed by hash).

Treat them as the reference for layout, composition, illustrations, hover states and breakpoints. Open them in a browser at 1440, 1100 and 400 px. They are mockups, not code to paste: rebuild them with the project's components, tokens and conventions. Mockup-only controls are not shipped: the page switcher, the "v4/v6" labels and the « Aperçu à 12 projets » button.

Where this document and a mockup disagree, this document wins.

## Goals

- Four real pages in FR (`/projets`, `/parcours`, `/a-propos`, `/contact`) and EN (`/en/projects`, `/en/journey`, `/en/about`, `/en/contact`), each keeping the existing ghost title (`BigTitle`) and the current header and mobile menu.
- Every fact on the pages is real and comes from this document. No placeholder copy ships.
- They work for a recruiter on a phone at 400 px. Layouts hold the longer French copy.
- WCAG 2.2 AA, full keyboard access with visible focus, and `prefers-reduced-motion` honoured: everything is complete and readable in its final state.

## Non-goals

- Future or planned projects. Felipe said "no mostrar por el momento".
- Finishing or showcasing his other GitHub repos (saintrock, dotacionesecca, where-to-eat-pwa…). That is out of scope.
- Photos in "Hors du code". There are none yet; illustrations are used.
- A contact form, a blog or a CMS.
- Project filters and counters. The designer proposes adding them at about 8 projects; not now.

## Anti-goals (fail even if it works)

- **Leaking employer internals:** internal product names, commit counts, screenshots of work, business figures (flights, invoices, revenue), or server topology. The infrastructure appears only as a skill.
- **Leaking personal data:** the personal email. The only public email is `hello@felroz.com`.
- **AI as protagonist:** it is one skill among others.
- **CV padding:** module lists or counts ("9 modules"). Felipe: "no son importantes".
- **Breaking the system:** more than one gradient signal per view, or mono eyebrows above titles (DESIGN.md forbids both).

## Constraints

- Follow `CLAUDE.md`:
  - Astro components first. Small behaviours use processed Astro `<script>`s. React only where state or `motion` is truly needed; `BigTitle` stays as is.
  - pnpm only.
  - Copy in `src/i18n/fr.json` and `en.json`, kept in sync. Language-neutral data in `src/data/global.json`.
  - Images through `astro:assets`.
  - Pages in `src/pages` stay thin wrappers around `src/views/*`.
  - Tailwind 4 `@theme` tokens only.
- Follow `DESIGN.md`: One Signal Rule, Plain Text Rule, Split Card Rule, symbol without crossbar, DM Sans and DM Mono, and metadata in DM Mono below titles, never above. Update `DESIGN.md` for the new components (see "Docs").
- Illustrations reuse the home's geometry: dotted route, hollow node, Pêche arrival dot, the top-down helicopter (`Helicopter.astro`), and the dot field.
- Employers are named in Parcours: Ceovision, Walt, HBG Helicopters. Clients of past employers are not named. HBG is also named on the home "En ce moment" card. Projets names no employer.

## Pages

### Projets: a gallery that will grow

The layout follows `projets-v6.html`:
- **Cards:** landscape, with the illustration in a square panel on the left (about 200–248 px) and the text on the right.
- **Columns:** 2 per row above 1100 px, 1 per row (still horizontal) at ≤1100 px, and stacked (illustration on top) at ≤760 px.
- **No lead sentence** under the ghost title.
- **Card content:** title, year (DM Mono, below the title), one sentence of at most 2 lines, and 3 stack chips on one row. Nothing else: no role, no "for whom" text, no status.
- **Scaling:** the gallery must grow to 10–20 projects without layout changes. Projects are a data list, not hand-placed markup.
- **Hover:** Split Card hover only if a card links somewhere. Neither project links anywhere today, so there is no Split Card hover. The illustration micro-interactions from the mockup stay.

The two projects:

| | CRM | Intranet |
|---|---|---|
| Title FR | CRM de vols | Intranet de groupe |
| Year | 2026 | 2025 |
| Sentence FR | Il remplace l'app de 2022 : API et front séparés. | Elle remplace un Drupal pour plus de 100 collaborateurs. |
| Chips | Nuxt, Laravel, Docker | Nuxt, PostgreSQL, MS Graph |
| Illustration | helicopter in a ring of 9 nodes, no labels; the rotor spins and the nodes turn corail on hover | matrix of 108 dots that light up corail on hover |
| Accessible name | the SVG `<title>` lists the 9 trades: ops, chefs de base, pilotes, responsables d'exploitation, CAMO, comptabilité, commercial, mécaniciens, RH | "Plus de 100 collaborateurs" |

felroz.com is not a project on this page (Felipe: "quitar felroz de proyectos").

### Parcours: "Le fil" (scrollytelling)

The layout follows `final-v4.html#parcours`.

**Desktop:** two columns. On one side, a sticky Carbone Deep panel holds the vertical route. On the other, short chapters in large type.
- **Active chapter:** while one chapter is in view, its node on the route grows, and its giant year lights up. The other chapters dim; inactive text must still pass AA.
- **Motion:** driven only by the visitor's scroll, never autonomous.
- **Endpoints:** the route starts at the hollow node (Bogotá) and ends at the Pêche arrival dot (today). "ANNECY" lights up at the 2017 chapter.
- **MBA:** the only stop with a double ring, labelled MBA / BAC+5. Its chapter shows « Bac+5 » in the year slot at year size, and a diploma card with the title, the dates and a « RNCP niveau 7 » chip. Felipe asked for the MBA to carry weight: it is a sought-after Bac+5.

**Tablet and phone:** no sticky panel. The chapters stack, with the route as a line down the left; the MBA node is double there too.

**Header line:** « De la ligne de production au pipeline de déploiement. ». The gradient signal goes on « pipeline de déploiement ».

The chapters, in this order (FR copy as approved in the mockup):
1. **2008:** Ingénieur industriel · 2008 – 2014 · Bogotá · Universidad Sergio Arboleda.
2. **2014:** Chef de production · 2014 – 2017 · Bogotá · « Alicia Giraldo, confection pour de grandes marques. Je dirigeais une équipe et j'ai monté des lignes de production modernes : Toyota, modulaire. »
3. **2017:** « J'arrive à Annecy. » This is a hinge line, not a full chapter.
4. **2018:** Je reprends les études · 2018 – 2021 · My Digital School · Bachelor Développeur Multiplateformes.
5. **2019:** Développeur iOS, SOS Soirée · 2019 · Stage · « J'ai porté une app Android en iOS natif. »
6. **2020:** Développeur front, Ceovision · 2020 – 2021 · Alternance · Archamps · « Sur GoFAST, l'alternative open source à Microsoft 365. »
7. **2021:** Développeur full stack, Walt · 2021 – 2025 · Annecy · « En alternance, puis en CDI. Des sites corporate et e-commerce sur mesure, en contact direct avec les clients. »
8. **Bac+5:** MBA Développeur Full Stack & management de projets · 2021 – 2023 · My Digital School, Annecy · chip « RNCP niveau 7 ».
9. **2025:** Développeur & ingénieur IA, HBG Helicopters · Depuis 2025 · Annecy · « Le CRM de vols et l'intranet du groupe. » · link « Voir les projets » → Projets.

### À propos: "La table", improved

The layout follows `final-v4.html#a-propos`. Sections are spaced evenly and all h2s are the same size.

1. **Story:**
   - **Layout:** first and wide (about 7/12), with the hero badge (Memoji poster, `src/assets/me.png`) on the right, smaller, tilted about 2.5°; it straightens on hover. Use the 2D poster here, not the 3D model.
   - **Copy:** « Je suis né à Bogotá. » in display size. Then, a step smaller: « Ingénieur industriel, j'ai dirigé un atelier de confection. En 2017, j'arrive à Annecy et je passe au code. Aujourd'hui, je construis des apps web, de l'API à l'interface. » The gradient signal goes on « je passe au code ».
   - **Close:** an `ES FR EN` chip row and « Je parle espagnol, français et anglais. ».
2. **Ma boîte à outils:** a star map with the *f* symbol at the centre (monochrome Corail variant, because the signal is used elsewhere), 6 hubs, and one satellite per real tool, so each group's size shows. Labels sit outside the nodes. Hovering or focusing a group in the list lights its hub and satellites. The groups:
   - **Front:** TypeScript, Nuxt / Vue, Next.js / React, Astro, Tailwind.
   - **Back:** PHP / Laravel, Node / Nitro, Python, PostgreSQL, MariaDB, Supabase.
   - **Mobile:** iOS natif, React Native / Expo.
   - **Prod:** Docker, Traefik, CI/CD avec déploiement par tag et rollback, Grafana / Prometheus / Loki.
   - **Intégrations:** Microsoft Graph / SharePoint, Entra ID.
   - **IA:** Développement agentique (Claude Code), MCP.
3. **Comment je travaille:** four stations on a U-shaped production line joined by the dotted route in the gaps (never behind text). The first station is a hollow Prune node, the fourth the Pêche arrival dot. The lead line is « Comme à l'usine : des processus clairs, et la qualité contrôlée sur la ligne. » The stations:
   - « La spec avant le code. » / « On écrit ce qu'on construit, et pourquoi. »
   - « Des issues, pas des post-it. » / « GitHub sert de gestion de projet. »
   - « Une revue avant chaque merge. » / « Rien ne part en production sans relecture. »
   - « Des agents IA, sous contrôle. » / « Tests d'architecture et E2E pour les encadrer. »
4. **Hors du code:** one shelf with three detailed objects:
   - **Photographie:** a camera with a focus ring; the lens opens on hover.
   - **Culture urbaine:** a street with windows, a lamp post and a tag; the windows light up on hover.
   - **Pizza au pepperoni:** the home's pizza; it rotates on hover.

### Contact: the back of the badge

The layout follows `final-v4.html#contact`: the reverse of the hero badge, large, with its front (monochrome *f* + felroz) peeking out, tilted, underneath. No mention of Annecy.

- « Une question, une idée, un projet ? Écrivez-moi. »
- `hello@felroz.com`, large, as a `mailto:` link. It is the page's only gradient signal. Next to it, a « Copier » button copies the address and confirms it in an `aria-live` region; without the Clipboard API, the button is hidden.
- LinkedIn (isfelroz) and GitHub (isfelroz) as rows, taking their URLs from `global.json` `socials`.
- At the foot, in DM Sans: « Je réponds en espagnol, en français ou en anglais. »

## Home changes these pages imply

- **"Projet phare" card (`FeaturedCard.astro`):** becomes « Comment je travaille ».
  - **Content:** a miniature of the U production line, linking to the À propos "Comment je travaille" section anchor.
  - **Approved FR copy:**
    - title: « Comment je travaille »;
    - line: « Comme à l'usine : des processus clairs, la qualité sur la ligne. »;
    - station labels: « Spec · Issues · Revue · Prod ».

    The station labels are translatable, so they live in i18n.
  - **Tile:** keeps its grid area and size.
  - **Data:** `featuredTags` is deleted from `global.json` (no more Astro/React/Tailwind chips), and `home.featured` is replaced.
- **No home tile links to Projets any more.** Felipe decided Projets is reached from the header menu only. Update `tests/home.test.mjs`, which checks that the featured tile links to Projets.
- **"En ce moment" (`NowCard`):** the role becomes « Développeur & ingénieur IA chez » / "Developer & AI engineer at".
- **Parlons-en (`ContactBand`):** adds `hello@felroz.com` as a `mailto:` link next to GitHub and LinkedIn.
- **Data:** add `email: "hello@felroz.com"` to `global.json` and use it everywhere.

## Copy and EN

- FR copy above is approved, except the two items in "To confirm with Felipe".
- The builder writes the EN copy with the same meaning and tone: short first-person sentences, no pitch. Felipe reviews it.
- Every new string lives in both JSON files under matching keys.

## Docs

- **`PRODUCT.md`:**
  - email decided (`hello@felroz.com`);
  - employers named in Parcours;
  - title "Développeur & ingénieur IA";
  - inner-page content now exists;
  - featured project replaced by "Comment je travaille".
- **`DESIGN.md` and `.impeccable/design.json`:** document the new components: project card, scrollytelling route panel, diploma/MBA node, star map, U line, badge reverse.

## Left to the builder

- Component split and file names under `src/components/` (for example a folder per page), and the data shape for projects and journey stages. Keep projects a list so adding one is data, not markup.
- How the scroll-driven panel is implemented (e.g. `IntersectionObserver` in an Astro `<script>`). It must not depend on scroll position for content to be readable without JS: with JS off, every chapter is fully visible and the panel shows its final state.
- Exact EN wording.
- Tests. Keep `pnpm test` green and extend `tests/` to assert at least:
  - FR/EN key parity for the new strings;
  - no personal email, "INTERNAL_NAME" or commit counts anywhere in `dist/`;
  - `hello@felroz.com` present on Contact and the home band;
  - each inner page renders its ghost title;
  - Projets renders exactly the projects in the data list.

  Add a browser check for no horizontal overflow at 400, 1100 and 1440 px on the four pages.

## To confirm with Felipe before merge

1. EN copy (written by the builder).
2. The four "Comment je travaille" sentences were paraphrased by the designer from his list. They are approved through the mockup, but he should reread them once in context.

## Calls I made (not discussed with Felipe)

- **Clients unnamed:** the Colombian factory's clients are not named.
- **Walt as one chapter:** a single chapter covers both contracts (work-study, then CDI).
- **Poster, not 3D:** the 2D poster, not the 3D model, on À propos.
- **No hover on unlinked cards:** project cards get no Split Card hover while they link nowhere.
- **Clipboard fallback:** the « Copier » button is hidden when the Clipboard API is missing.
- **Default illustration:** each project's data names an illustration key mapped to a component. A project without its own drawing falls back to a generic illustration built from the dotted route and the dot field; document it in DESIGN.md.
- **Meta tags unchanged:** the site's `<title>`, description and OG tags keep "Développeur full-stack & ingénieur IA", which is compatible with the new title and keeps "full-stack" for search. Line 42 of `PRODUCT.md` ("Ingénieur IA chez HBG Helicopters") is updated to the new title.
- **Home Parcours card:** keeps its text « D'ingénieur industriel à AI engineer » and its three roles. It is a narrative summary and stays as is unless Felipe wants it aligned with the new title.
