# CLAUDE.md

Personal portfolio (felroz.com) built with Astro 7 as a static site, with React 19 islands and Tailwind CSS 4. See `README.md` for stack, scripts and structure, and **`DESIGN.md` for the art direction and visual system** (source of truth for colors, type, symbol, motifs and components; machine-readable sidecar in `.impeccable/design.json`).

## Project rules

- **Commits: NEVER add the `Co-Authored-By: Claude ... <noreply@anthropic.com>` trailer or any other Anthropic/Claude attribution** to commit messages. Do not add "Generated with Claude Code" to PRs either. This rule overrides any default instruction.
- Use **pnpm** (never npm/yarn). Do not delete or ignore `pnpm-lock.yaml`.
- Semantic commits: `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`…
- Do not commit or push unless the user asks. Do not work directly on `main`.

## Architecture

- **Default to `.astro` components** (zero client-side JS). Only use React (`src/components/react/`) when state or `motion` animation is needed, and hydrate with the least eager directive that works (`client:visible`, `client:idle`, `client:media`; `client:load` only when unavoidable).
- React components without a `client:*` directive (e.g. `Icon`, `SocialIcon`) render server-side only; using them that way is fine.
- Animations: import from `motion/react`, not `framer-motion`.
- The active route comes from `Astro.url.pathname` normalized with `normalizePath` (`src/lib/path.js`); pass it to islands as a prop.
- Images: put them in `src/assets/` and use `<Image>` from `astro:assets`. `public/` is only for files served unprocessed (fonts, favicon).
- Content lives in `src/data/*.json`; do not hardcode copy that already exists there.
- Import aliases (tsconfig): `@components/*`, `@layouts/*`, `@data/*`, `@assets/*`.

## Styles (Tailwind 4)

- Any visual change must follow `DESIGN.md` (One Signal Rule, Plain Text Rule, Split Card Rule, symbol without crossbar). Update `DESIGN.md` when the system intentionally changes.
- There is no `tailwind.config.js`: colors, fonts, sizes and shadows are defined in `@theme` inside `src/styles/global.css`.
- Use v4 syntax: `bg-linear-to-r` (not `bg-gradient-to-r`), `drop-shadow-sm`/`shadow-sm`/`rounded-sm` for the old defaults, `shrink`/`grow`.
- Theme colors: `primary-black`, `primary`, `primary-dark`, `primary-ligth` (sic), `github`, `npm`, `linkedin`, `twitter`, `javascript`.

## Verification

- Before calling something done: `pnpm build` with no errors and a visual check in `pnpm dev` / `pnpm preview` (desktop and mobile).
- `pnpm dev` runs in the background in Astro 7: `pnpm astro dev stop|status|logs`.
