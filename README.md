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
│   ├── cards/       # grid card contents
│   └── react/       # React islands (animations / state)
├── data/            # JSON content (global.json, home.json)
├── layouts/         # Layout.astro (head, GTM, header, footer)
├── lib/             # utilities
├── pages/           # routes: /, /about, /contact, /resume, /works
└── styles/          # global.css (Tailwind + @theme + fonts)
```

## Content

Home copy, socials and skills live in `src/data/home.json`; navigation and footer socials in `src/data/global.json`.

## Deploy

Static build, so any host works. On Vercel, use the **Astro** framework preset (output in `dist/`).
