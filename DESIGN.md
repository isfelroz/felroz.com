---
name: felroz
description: Personal site of Felipe Alarcon (isfelroz), AI Engineer. Agentic AI, in production.
colors:
  prune: "#9E4B88"
  corail: "#CA6678"
  peche: "#E98A77"
  carbone: "#26282C"
  carbone-raised: "#2E3035"
  carbone-deep: "#1F2124"
  craie: "#F4F1EE"
  white: "#FFFFFF"
  ink-soft: "#D4D5D9"
  label-on-dark: "#9A9CA3"
  label-on-light: "#5F6168"
  dot: "#3A3D43"
  brand-github: "#6E40C9"
  brand-linkedin: "#0A66C2"
  brand-typescript: "#3178C6"
typography:
  display-ghost:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "12rem"
    fontWeight: 700
    lineHeight: 1
  display:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "3.5rem"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-1.5px"
  headline:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.8px"
  title:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.25
  wordmark:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-1px"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
  body-strong:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.5
  label:
    fontFamily: "DM Mono, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "2px"
rounded:
  swatch: "12px"
  panel: "16px"
  card: "24px"
  pill: "999px"
  symbol: "23.33%"
spacing:
  gutter: "16px"
  grid-gap: "20px"
  grid-gap-lg: "32px"
  card-padding: "28px"
  card-padding-sm: "24px"
  section-y: "40px"
  section-y-lg: "80px"
components:
  button-primary:
    backgroundColor: "{colors.corail}"
    textColor: "{colors.white}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  card:
    backgroundColor: "{colors.carbone}"
    textColor: "{colors.white}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-padding}"
  card-hover-layer:
    backgroundColor: "{colors.corail}"
    rounded: "{rounded.card}"
  nav-link:
    textColor: "{colors.white}"
    typography: "{typography.body-strong}"
  nav-link-active:
    textColor: "{colors.white}"
    typography: "{typography.body-strong}"
  label-eyebrow:
    textColor: "{colors.label-on-dark}"
    typography: "{typography.label}"
  symbol:
    backgroundColor: "{colors.carbone}"
    rounded: "{rounded.symbol}"
    size: "24px"
---

# Design System: felroz

## Overview

**Creative North Star: "The Agent Control Room"**

felroz is a network of agents seen from a control room at night. The dot grid is the infrastructure, every node is an agent, and the Prune → Corail → Pêche gradient is the signal travelling between them toward an arrival point. Nothing moves unsupervised: routes are deliberate, the signal is rare, and the room stays dark and calm so the signal reads instantly. The line on the banner says it: *L'IA agentique, en production.*

The surface is dark by default: Carbone with white text. Color is warm and scarce: one gradient accent per screen, on the word or object that matters. Cards keep a tactile, almost physical presence through soft shadows and an offset hover that splits the card from its colored, dot-patterned underlayer. The result reads as 3D. Type is a single family, DM Sans, set tight and bold for headlines. DM Mono speaks for the machine: labels, code, metadata.

The site is bilingual (French and English). Copy lengths differ between the two, so layouts must hold both.

**Key Characteristics:**
- Dark Carbone ground, white text, warm gradient used as a single signal.
- Symbol: a gradient *f* followed by a hollow node and a Pêche arrival dot.
- Motifs: dot grid plus dotted routes linking nodes, always in the background.
- Cards with soft shadows and an offset hover that reveals a colored dot-grid layer.
- DM Sans for everything human; DM Mono in spaced uppercase for everything machine.

## Colors

A dark, warm palette: three gradient stops from plum to peach over a near-black graphite, with a chalk-white light ground for print and light contexts.

### Primary
- **Prune** (`prune`): start of the gradient, hollow nodes at the start of a route, hover states on links (`a:hover`).
- **Corail** (`corail`): centre of the gradient, intermediate nodes, route strokes, active nav underline, the favicon *f*. Fallback solid when a gradient cannot render.
- **Pêche** (`peche`): end of the gradient and the arrival dot. Also the color of DM Mono accent labels on dark.

### Neutral
- **Carbone** (`carbone`): main background, the symbol's container, card surface, text on light grounds.
- **Carbone Raised** (`carbone-raised`): panels that sit one tonal step above Carbone (brand boards, dot-grid fields).
- **Carbone Deep** (`carbone-deep`, `#1F2124`): one step below Carbone. The hero badge's photo panel and lanyard slot, and the symbol's panel on the Projet phare tile.
- **Craie** (`craie`): light background for print, the brand applications board and any light context.
- **White** (`white`): running text and headlines on Carbone.
- **Ink Soft** (`ink-soft`): secondary body text and inactive links on dark.
- **Label on Dark** (`label-on-dark`): DM Mono labels and metadata on Carbone.
- **Label on Light** (`label-on-light`): DM Mono labels and metadata on Craie or white.
- **Dot** (`dot`, `#3A3D43`): resting color of the background dot field, and of the fine dots inside Carbone Deep panels.

### Third-party brand colors
`brand-github`, `brand-linkedin` and `brand-typescript` exist only to fill the hover layer of the matching social card. They never appear elsewhere.

### Named Rules
**The One Signal Rule.** The gradient (left → right: Prune, Corail, Pêche) appears once per screen's content: one keyword or one accent. The persistent chrome (the symbol and the header's Contact button) does not count, as in the DA's own header. If two things in the page content are gradient, one of them is wrong.

**The Plain Text Rule.** Running text is white on Carbone or Carbone on Craie. Never gradient, never Corail.

## Typography

**Display Font:** DM Sans (with sans-serif)
**Body Font:** DM Sans (with sans-serif)
**Label/Mono Font:** DM Mono (with monospace)

**Character:** One geometric, friendly sans set tight and heavy for statements, relaxed and regular for reading; a mono voice reserved for the machine layer.

### Hierarchy
- **Display Ghost** (700, 12rem; 9xl on lg, 7xl on mobile; line-height 1; 10% opacity): giant section titles on inner pages, revealed by a slide-up.
- **Display** (700, 3.5rem, 1.05, -1.5px): hero statements, e.g. *L'IA agentique, en production.*
- **Headline** (700, 1.875rem, 1.15, -0.8px): page and section leads, e.g. *Je fais travailler des agents IA, avec des garde-fous.*
- **Title** (700, 1.5rem): card titles.
- **Wordmark** (700, -1px tracking): *felroz* next to the symbol. Scale with the symbol; tracking stays tight.
- **Body** (400, 1.125rem, 1.55): reading text, max 65–75ch.
- **Body Strong** (500, 1rem): nav links, buttons.
- **Label** (DM Mono 400, 0.8125rem, 2px tracking, uppercase): metadata such as place (`ANNECY · HAUTE-SAVOIE`), domain (`FELROZ.COM`), language switch (`EN` / `FR`). Section numbers (`01 · SYMBOLE`) only on brand boards, never on the site.

### Named Rules
**The One Family Rule.** DM Sans and DM Mono only. No display or decorative faces.

**The Machine Voice Rule.** DM Mono is always uppercase with 2px tracking, and only for labels, code and metadata. Never for sentences, never as an eyebrow.

## Layout

- **Container:** centered, max content width 1240px with a 16px side gutter (`spacing.gutter`), so square tiles stay roomy between 1101px and 1440px.
- **Bento grid (home):** every tile is square or spans whole squares. Tiles place themselves with `grid-area`.
  - **Desktop (≥1101px):** 4 columns, gap 28px. 1×1 tiles use `aspect-ratio: 1`; the Hero is 2×2 and square; wide tiles (2×1) take exactly one row height; Contact is a full-width band of natural height.
  - **Order:** `Hero Hero En-ce-moment Parcours` / `Hero Hero Savoir-faire Savoir-faire` / `Projet-phare Projet-phare Stack Moi` / `Contact ×4`.
  - **Tablet (≤1100px):** 2 columns; Hero, Savoir-faire and Projet phare span 2; natural heights. Order: Hero, En ce moment + Parcours, Savoir-faire, Projet phare, Stack + Moi, Contact.
  - **Mobile (≤640px):** 1 column in the same order, gap 20px, natural heights.
- **Section rhythm:** 40px vertical padding, 80px on `lg`.
- **Header:** sticky, translucent Carbone (50%) with backdrop blur. Symbol and wordmark on the left, links in the centre on `lg`, primary button on the right. Below `lg`, links move to a full-height slide-in panel.
- **Footer:** centered stack of symbol and wordmark, nav, social icons and credits.
- **Bilingual copy:** French runs ~15–25% longer than English. Size buttons and nav to the French string.

## Elevation & Depth

Depth is physical. Cards sit on Carbone with a soft dual shadow, a dark drop to the bottom-right and a faint light lift to the top-left, so they read as slightly raised tiles. On hover a linked card splits in two: the face moves up-right while a colored, dot-patterned underlayer moves down-left, which creates a 3D parallax.

### Shadow Vocabulary
- **Card lift** (`box-shadow: rgba(0,0,0,0.25) 4px 4px 4px, rgba(247,244,244,0.02) -4px -4px 10px`; Tailwind `shadow-card`): every card at rest.

### Named Rules
**The Split Card Rule.** Linked cards keep the offset hover: face `translate(8px, -8px)`, underlayer `translate(-8px, 8px)`, both with `transition-all`. Do not flatten it.

## Shapes

- **Cards:** generously rounded (24px).
- **Buttons:** pill (fully rounded).
- **Symbol container:** rounded square, radius 28/120 of its side (~23%). Circular on avatars.
- **Panels and swatches:** 16px and 12px.
- **Strokes:** round caps and joins everywhere: the *f*, the routes, the illustrations.
- **Dashed lines** exist only in the route motif and the helicopter's rotor ring: `stroke-dasharray: 1 N` with N from 8 to 12 (rotor ring `1 8`, Parcours mini-route `1 9`), always with round caps, so they render as dotted.

## Components

### Symbol
The mark. A gradient *f* without a crossbar, followed by a hollow Corail node and a Pêche arrival dot, on a Carbone rounded square.
- **Gradient:** Prune → Pêche, bottom-left to top-right.
- **Clear space:** the height of the arrival dot on every side.
- **Minimum size:** 24px. Below that, use the *f* alone in Corail (favicon).
- **Lockup:** symbol + *felroz* in the Wordmark style.
- **Hover:** when the lockup is a link, the node and the arrival dot drift up-right (2px and 4px, 300ms ease-out). No motion with reduced-motion.

```svg
<svg viewBox="0 0 120 120" role="img" aria-label="felroz">
  <defs><linearGradient id="felroz-g" x1="0" y1="1" x2="1" y2="0">
    <stop offset="0" stop-color="#9E4B88"/><stop offset="1" stop-color="#E98A77"/>
  </linearGradient></defs>
  <rect width="120" height="120" rx="28" fill="#26282C"/>
  <path d="M40 98 V50 Q40 28 62 28 H66" fill="none" stroke="url(#felroz-g)" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="76" cy="52" r="6" fill="#26282C" stroke="#CA6678" stroke-width="4"/>
  <circle cx="96" cy="36" r="9" fill="#E98A77"/>
</svg>
```

Favicon (*f* alone): same container, `<path d="M46 100 V50 Q46 28 70 28" stroke="#CA6678" stroke-width="22" stroke-linecap="round" fill="none"/>`.

### Buttons
- **Shape:** pill.
- **Primary:** gradient background (Prune → Corail → Pêche, left to right), white Body Strong text, 8px 16px padding. Used only for *Contact* in the header and the mobile menu (persistent chrome).
- **Hover / Focus:** visible focus ring in Pêche; no color shift needed.

### Cards
- **Corner Style:** 24px.
- **Background:** Carbone face.
- **Shadow Strategy:** Card lift at rest (see Elevation & Depth).
- **Hover (linked cards):** the Split Card Rule. The underlayer takes the card's accent (Corail by default, or the third-party brand color for social cards) overlaid with the dot grid (`radial-gradient(#26282C 3px, transparent 4px)`, 10px cell).
- **Internal Padding:** 28px (`p-7`), 24px at ≤640px (`p-6`).
- **Content:** title row with the arrow-circle icon on the right (Label on Dark, rotates 45° → 0° and turns Corail on hover or focus), then the text in Ink Soft at full card width. No label above the title.
- **Entrance:** the CSS stagger described in Motion.
- **Square tiles:** on the home, tiles stay square (see Layout).

### Navigation
- **Header:** lockup on the left, links centred on `lg` (Projets / Parcours / À propos, or Projects / Journey / About), language switch (Label style, `EN` / `FR`) and the Contact button on the right.
- **Pages:** the CV page is now *Parcours* (FR `/parcours`, EN `/en/journey`, label *Journey*). Old `/cv`, `/resume` and `/en/resume` redirect.
- **Style:** Body Strong, white.
- **Hover:** Corail text with a 2px Corail underline.
- **Active:** 2px Corail underline and `aria-current="page"`.
- **Mobile:** full-height slide-in panel (90% width) over a blurred Carbone at 95% with the inverse dot grid; links in uppercase 2.25rem bold, centred; language switch and Contact at the bottom. Closes with Escape.

### Metadata Label
DM Mono uppercase with 2px tracking, Label on Dark (or Label on Light on Craie). For metadata next to content (place, domain, language), never as an eyebrow above a heading.

### Hero Badge
The home's 2×2 tile, styled like a conference badge (a nod, not a copy). A small lanyard slot (52×6px, Carbone Deep, inset shadow) hangs at the top centre of the card face. Below it, a photo panel (Carbone Deep, 18px radius, fine 14px dot grid in Dot at 70%) holds the 3D avatar, with a small Pêche dot in its top-right corner. Bottom: the greeting and name, then the lead; the lead's last part (*de l'API à l'interface.*) carries the page's one signal. No meta line and no link on this tile.
- **Greeting:** `Hola, → Hello, → Bonjour,` over *je suis Felipe.*. The h1 exposes only the final greeting to assistive tech; the cycling words are decorative. It plays once (1.3s per word, slide-up) and rests on the page language's word. Under reduced motion it shows the final word at once.

### 3D Avatar
A Memoji model in the hero's photo panel (`@google/model-viewer`, `public/models/memoji.glb`, ~2.2 MB, no external decoder).
- **Poster first:** `me.png` through `astro:assets` is the only thing in the HTML. model-viewer and the `.glb` load after first paint (browser idle, no later than 4s, and once the hero is visible).
- **Fallback:** under reduced motion, without WebGL, or if the model fails, the poster stays as the only image and keeps its alt text.
- **Pointer orbit:** the camera follows the pointer over the hero tile: θ = x·38°, φ = 80° ± 14° (y·14°), x and y normalised to the photo panel, clamped to ±1. It returns to front on leave. Touch pointers never orbit; the model stays facing front.
- No camera controls, zoom, pan or tap; neutral environment, exposure 1.05, field of view 28°.

### Helicopter Illustration
Top-down, H135-inspired drawing for the *En ce moment* tile: fuselage, skids, tail boom, stabiliser, fenestron, four-blade rotor, Pêche hub and a dotted Corail rotor-disc ring. Single-colour card illustration (see Routes). The rotor spins only while the tile is hovered (1.2s linear loop), never at rest, and not at all under reduced motion.

### Parcours Mini-Route
Card illustration on the *Parcours* tile: a dotted Corail path, a hollow Corail node, a second hollow node and a solid Pêche arrival dot. The three role labels (`Ingénieur · Développeur · AI Engineer`) are all Label on Dark: no accent on any role, the arrival dot carries the direction. On hover or focus the arrival dot nudges up-right (4px, 0.4s).

### Background Motifs
- **Dot field:** a full-viewport canvas behind every page's content (fixed, `pointer-events: none`). Dots on a 22px grid, `#3A3D43`, radius 1.3px. Near the pointer they warm toward Corail (`#CA6678`) within 150px, easing quadratically, and grow up to +1.4px. It redraws only on pointer move, scroll or resize and never animates on its own. On touch pointers and under reduced motion it is drawn once, static. The tight 10px grid is reserved for card underlayers, and a fine 14px grid for Carbone Deep panels.
- **Routes:** dotted Corail paths linking hollow nodes (Prune for the first, Corail for the rest) to a solid Pêche arrival dot. Decoration only, placed at edges and corners.
- **Routes as card illustrations:** a route may also be the illustration of a card (the Parcours mini-route), in a single colour: Corail dotted path, Corail hollow nodes, Pêche arrival dot, so it never reads as a second gradient. The rule below still holds: never behind text.

## Motion

Two protagonists on load: the dot field (pointer-driven) and the hero greeting (plays once). Everything else moves only on interaction.
- **On interaction only:** the Memoji turns toward the pointer; the rotor spins on hover; the Parcours arrival dot, the Projet phare symbol node and dot, and the Moi pizza react on hover; the Stack lines and nodes turn Corail on hover or focus; Split cards offset on hover.
- **Card entrance:** one short CSS stagger (`tile-in`: opacity 0 → 1, 12px rise, 0.45s ease-out, 70ms between tiles), played once. It replaces the per-card spring.
- **Reduced motion:** nothing animates and everything is in its final state; the poster replaces the 3D model.
- **Ghost titles** on inner pages keep their slide-up (y 100% → 0, 0.5s).

## Do's and Don'ts

### Do:
- **Do** keep the gradient to one signal per screen (the One Signal Rule).
- **Do** set running text white on Carbone, or Carbone on Craie.
- **Do** use DM Mono, uppercase with 2px tracking, for labels, metadata and code.
- **Do** keep the card shadow and the split offset hover on every linked card.
- **Do** use the symbol from 24px up and the lone Corail *f* below 24px.
- **Do** size UI to the longer French copy.
- **Do** let headings stand alone: no eyebrow label above them.
- **Do** keep home tiles square or whole-square, and keep the poster as the 3D avatar's fallback.

### Don't:
- **Don't** draw the *f* with a crossbar. The decided mark has none.
- **Don't** use the retired *falroz* wordmark or name.
- **Don't** make an animation run at rest on the home (besides the dot field's pointer response and the greeting, once).
- **Don't** place routes or dotted lines behind text, or use dashed lines anywhere outside the route motif.
- **Don't** add a second type family (Aclonica is retired).
- **Don't** set body copy, paragraphs or long labels in gradient.
- **Don't** use the third-party brand colors outside their own cards.
- **Don't** replace the 3D card treatment with flat cards.
