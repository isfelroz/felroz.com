# Felipe Alarcon Portfolio

Personal portfolio built with [Astro](https://astro.build), inspired by [gridfolio](https://gridfolio.framer.website/).

🔗 [felroz.com](https://felroz.com)

## Stack

- **Astro 7** — static site (`output: "static"`)
- **React 19** — only for interactive/animated islands
- **motion** — animations (formerly framer-motion)
- **Tailwind CSS 4** — via `@tailwindcss/vite`, theme defined in CSS with `@theme`
- **react-icons** — icons
- **pnpm 12** — package manager

## Requirements

- Node `>= 22.23.4`
- pnpm 12 (`corepack enable` picks up the version pinned in `packageManager`)

## Scripts

```sh
pnpm install   # install dependencies
pnpm dev       # dev server at http://localhost:4321
pnpm build     # static build into dist/
pnpm preview   # preview the build
```

In Astro 7 `pnpm dev` runs in the background: use `pnpm astro dev stop`, `pnpm astro dev status` and `pnpm astro dev logs`.

## Structure

```
public/              # static files served as-is (fonts, favicon)
src/
├── assets/          # images optimized by astro:assets
├── components/      # .astro components (no client-side JS)
│   ├── brand/       # felroz symbol and lockup
│   ├── cards/       # grid card contents
│   └── react/       # React islands (animations / state)
├── data/            # language-neutral data (socials, skills)
├── i18n/            # routes + FR/EN copy (fr.json, en.json)
├── layouts/         # Layout.astro (head, metadata, GTM, header, footer)
├── lib/             # utilities
├── pages/           # FR routes at /, EN routes under /en
├── styles/          # global.css (Tailwind + @theme + fonts)
└── views/           # page views shared by both languages
```

## Content

The site is bilingual: French at `/` (`/a-propos`, `/projets`, `/cv`, `/contact`) and English under `/en` (`/en/about`, `/en/projects`, `/en/resume`, `/en/contact`). All copy lives in `src/i18n/fr.json` and `src/i18n/en.json`; socials and skills in `src/data/global.json`.

## Design

The visual system follows the felroz art direction documented in [`DESIGN.md`](DESIGN.md).

## Deploy

Static build, so any host works. On Vercel, use the **Astro** framework preset (output in `dist/`).
