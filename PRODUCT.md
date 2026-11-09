# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

All four audiences matter. The site is written for all of them at once, never for one at the expense of the others.

- **Recruiters and HR** in France and abroad. They scan many profiles quickly, often on a phone or from a LinkedIn link, and need to know in seconds who Felipe is and how to reach him.
- **Tech leads and CTOs** who are about to interview or hire him. They want evidence of how he works and what he can build.
- **Peers and community**: developers who know him or arrive from GitHub and want to know more about him.
- **Freelance clients**: secondary. Someone who might commission a project. The site is not commercial and does not court them.

## Product Purpose

felroz.com is Felipe Alarcon's personal site and calling card (*la carta de presentación*). It shows who he is, his brand and what he knows, for the day he looks for a job or for anyone who wants to know about him. Freelance work is possible but is not the current goal.

Success, for any visitor:
- **understands who he is in seconds**: a full-stack developer who builds web apps from the API to the interface, today an AI engineer at HBG Helicopters, from Bogotá to Annecy;
- **remembers him**: the site has its own personality and does not read like a CV or a generic portfolio;
- **gets in touch**: through LinkedIn, GitHub or by email at hello@felroz.com.

## Positioning

A developer first, with an engineer's path: an industrial engineer trained in Colombia who became a web developer in Annecy and today works as an AI engineer, building the flights CRM of a helicopter operator (HBG Helicopters). He works across the whole stack (APIs, web interfaces, mobile apps, automations, shipping to production) and uses AI agents as one skill among the others. He speaks Spanish, French and English.

## Operating Context

- **Languages:** the site is bilingual. French is at `/` and English is under `/en`. Every string exists in both.
- **Entry points:** visitors often arrive from LinkedIn or GitHub links, on a phone as often as on a desktop.
- **Pages:** Home, Projets / Projects, Parcours / Journey, À propos / About, Contact. Each home card sums up one page and links to it. All five now have real content.

## Capabilities and Constraints

- Static site: no backend, no CMS, no contact form and no blog.
- The home is a summary. Detail lives on the inner pages, which now have their content: two projects on Projets, the Parcours route, the À propos story, toolbox and method, and Contact with the email. Case studies and metrics are still absent.
- A 3D animated avatar (idle, wave) is planned for a later phase. It needs a rigged model.
- Title: « Développeur & ingénieur IA ».
- Contact email: `hello@felroz.com`, the only address ever published.
- Employer naming: employers are named in the Parcours (HBG Helicopters, with a link on the "En ce moment" card). The clients of past employers are not named. Internal product names are never published.
- Not yet decided or provided:
  - confirmation of the HBG URL;
  - his years of experience.

## Brand Commitments

- **Name and mark:** the name is *felroz*. The retired *falroz* name and wordmark must not come back. The symbol is a gradient *f* without a crossbar, a hollow node and an arrival dot. DESIGN.md holds the full visual system.
- **Developer first:** AI is part of the story, never the protagonist.
- **No sales pitch:** the voice is personal and direct. There is no "Travaillons ensemble" or similar freelance call to action.
- **Voice:** short sentences in the first person. It sounds like Felipe introducing himself, with a touch of personality (Colombian in Annecy, photography, street culture, pepperoni pizza).

## Evidence on Hand

- **Avatar:**
  - `src/assets/me.png` is his Memoji (2D).
  - `public/models/memoji.glb` is the optimized 3D Memoji. The ~24 MB source is outside the repo.
- **Social profiles:** GitHub (`isfelroz`) and LinkedIn (`isfelroz`), listed in `src/data/global.json`.
- **Projects:** two, listed on Projets: a flights CRM for a helicopter operator and a company intranet. This site's source is public on GitHub. The home's former featured-project tile is now « Comment je travaille ».
- **Inner pages:** Projets, Parcours, À propos and Contact have their content, in both languages.
- **Absent:**
  - case studies, metrics, testimonials, client logos and years of experience;
  - per-project detail pages.

  Future work must not invent them, and placeholder text must never ship.

## Product Principles

1. **One look, one fact.** Every surface says one thing about Felipe, briefly, and links to where it says more.
2. **Him before his tools.** Name, face and path come before stacks and skills. AI is a skill, not the headline.
3. **Real or nothing.** Only real facts, real projects and real numbers. If something isn't ready, it isn't shown.
4. **Personal, not commercial.** It invites a conversation and never pitches.
5. **Works for a recruiter on a phone.** Every audience is served, starting with the one in the biggest hurry.

## Accessibility & Inclusion

- WCAG 2.2 AA:
  - text contrast;
  - full keyboard access with a visible focus;
  - meaningful names for screen readers.
- `prefers-reduced-motion` is honoured: content is complete and readable at rest.
- Both languages are complete. Layouts must hold the longer French copy.
