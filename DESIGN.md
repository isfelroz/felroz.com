---
name: felroz
description: Personal site of Felipe Alarcon (isfelroz), AI Engineer. Agentic AI, in production.
colors:
  prune: "#9E4B88"
  corail: "#CA6678"
  peche: "#E98A77"
  carbone: "#26282C"
  carbone-raised: "#2E3035"
  craie: "#F4F1EE"
  white: "#FFFFFF"
  ink-soft: "#D4D5D9"
  label-on-dark: "#9A9CA3"
  label-on-light: "#5F6168"
  brand-github: "#6E40C9"
  brand-npm: "#CB0000"
  brand-linkedin: "#0A66C2"
  brand-twitter: "#1D9BF0"
  brand-javascript: "#FFF208"
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
  card-padding: "32px"
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
- **Craie** (`craie`): light background for print, the brand applications board and any light context.
- **White** (`white`): running text and headlines on Carbone.
- **Ink Soft** (`ink-soft`): secondary body text and inactive links on dark.
- **Label on Dark** (`label-on-dark`): DM Mono labels and metadata on Carbone.
- **Label on Light** (`label-on-light`): DM Mono labels and metadata on Craie or white.

### Third-party brand colors
`brand-github`, `brand-npm`, `brand-linkedin`, `brand-twitter`, `brand-javascript` exist only to fill the hover layer of the matching social or skill card. They never appear elsewhere.

### Named Rules
**The One Signal Rule.** The gradient (left → right: Prune, Corail, Pêche) appears once per screen: on the symbol, one keyword, or one accent such as the primary button. If two things on a screen are gradient, one of them is wrong.

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
- **Label** (DM Mono 400, 0.8125rem, 2px tracking, uppercase): section numbers (`01 · SYMBOLE`), eyebrows, metadata, domain (`FELROZ.COM`).

### Named Rules
**The One Family Rule.** DM Sans and DM Mono only. No display or decorative faces.

**The Machine Voice Rule.** DM Mono is always uppercase with 2px tracking, and only for labels, code and metadata. Never for sentences.

## Layout

- **Container:** centered, 16px side gutter (`spacing.gutter`).
- **Bento grid:** 2 columns on mobile, 4 on `lg`; gaps 20px, 32px on `lg`. Small tiles are 300px tall; medium tiles span 2 columns. Nested 2×2 sub-grids hold social and skill tiles.
- **Section rhythm:** 40px vertical padding, 80px on `lg`.
- **Header:** sticky, translucent Carbone (50%) with backdrop blur. Symbol and wordmark on the left, links in the centre on `lg`, primary button on the right. Below `lg`, links move to a full-height slide-in panel.
- **Footer:** centered stack of symbol and wordmark, nav, social icons and credits.
- **Bilingual copy:** French runs ~15–25% longer than English. Size buttons and nav to the French string.

## Elevation & Depth

Depth is physical. Cards sit on Carbone with a soft dual shadow, a dark drop to the bottom-right and a faint light lift to the top-left, so they read as slightly raised tiles. On hover a linked card splits in two: the face moves up-right while a colored, dot-patterned underlayer moves down-left, which creates a 3D parallax.

### Shadow Vocabulary
- **Card lift** (`box-shadow: rgba(0,0,0,0.25) 4px 4px 4px, rgba(247,244,244,0.02) -4px -4px 10px`; CSS var `--shadow1`): every card at rest.

### Named Rules
**The Split Card Rule.** Linked cards keep the offset hover: face `translate(8px, -8px)`, underlayer `translate(-8px, 8px)`, both with `transition-all`. Do not flatten it.

## Shapes

- **Cards:** generously rounded (24px).
- **Buttons:** pill (fully rounded).
- **Symbol container:** rounded square, radius 28/120 of its side (~23%). Circular on avatars.
- **Panels and swatches:** 16px and 12px.
- **Strokes:** round caps and joins everywhere: the *f*, the routes, the progress rings.
- **Dashed lines** exist only in the route motif (`stroke-dasharray: 1 12`, round caps), which renders as dotted.

## Components

### Symbol
The mark. A gradient *f* without a crossbar, followed by a hollow Corail node and a Pêche arrival dot, on a Carbone rounded square.
- **Gradient:** Prune → Pêche, bottom-left to top-right.
- **Clear space:** the height of the arrival dot on every side.
- **Minimum size:** 24px. Below that, use the *f* alone in Corail (favicon).
- **Lockup:** symbol + *felroz* in the Wordmark style.

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
- **Primary:** gradient background (Prune → Corail → Pêche, left to right), white Body Strong text, 8px 16px padding. It counts as the screen's one gradient signal. Used for *Contact*.
- **Hover / Focus:** visible focus ring in Pêche; no color shift needed.

### Cards
- **Corner Style:** 24px.
- **Background:** Carbone face.
- **Shadow Strategy:** Card lift at rest (see Elevation & Depth).
- **Hover (linked cards):** the Split Card Rule. The underlayer takes the card's accent (Corail by default, or the third-party brand color for social and skill cards) overlaid with the dot grid (`radial-gradient(#26282C 3px, transparent 4px)`, 10px cell).
- **Internal Padding:** 32px.
- **Footer row:** title on the left, arrow-circle icon on the right (gray-400, rotates 45° → 0° and turns Corail on hover).
- **Entrance:** spring scale 0.8 → 1 with opacity 0 → 1.

### Navigation
- **Style:** Body Strong, white.
- **Hover:** Corail text with a 2px Corail underline.
- **Active:** 2px Corail underline.
- **Mobile:** full-height slide-in panel (90% width) over a blurred Carbone at 95% with the inverse dot grid; links in uppercase 2.25rem bold, centred.

### Label / Eyebrow
DM Mono uppercase with 2px tracking, Label on Dark (or Label on Light on Craie). Section numbering uses the pattern `01 · NAME`.

### Skill Progress Ring
Circular gauge: a 15%-opacity track and a vertical Prune → Corail → Pêche gradient arc with round caps. It animates on scroll into view (spring, stiffness 50, 0.5s delay). The skill icon sits centred.

### Background Motifs
- **Dot grid:** small dots on Carbone (`#3A3D43`, ~1.4px, 22–24px cell) for large fields; the tight 10px grid is reserved for card underlayers.
- **Routes:** dotted Corail paths linking hollow nodes (Prune for the first, Corail for the rest) to a solid Pêche arrival dot. Decoration only, placed at edges and corners.

## Do's and Don'ts

### Do:
- **Do** keep the gradient to one signal per screen (the One Signal Rule).
- **Do** set running text white on Carbone, or Carbone on Craie.
- **Do** use DM Mono, uppercase with 2px tracking, for labels, metadata and code.
- **Do** keep the card shadow and the split offset hover on every linked card.
- **Do** use the symbol from 24px up and the lone Corail *f* below 24px.
- **Do** size UI to the longer French copy.

### Don't:
- **Don't** draw the *f* with a crossbar. The decided mark has none.
- **Don't** use the retired *falroz* wordmark or name.
- **Don't** place routes or dotted lines behind text, or use dashed lines anywhere outside the route motif.
- **Don't** add a second type family (Aclonica is retired).
- **Don't** set body copy, paragraphs or long labels in gradient.
- **Don't** use the third-party brand colors outside their own cards.
- **Don't** replace the 3D card treatment with flat cards.
