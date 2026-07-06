# Cashflow 2.0 Academy — Premium Polish Report

A visual + interaction pass on the whole platform, plus the requested course restructure for recorded video modules with per-section descriptions and resources. All functionality, data, and information architecture preserved.

Method: run locally (Docker Postgres + Express + built SPA), driven with Playwright at 1440 / 768 / 390px. Baseline captured before any change; every surface re-shot after.
Backups: `backup/<timestamp>/`. Before/after screenshots: `audit/screenshots/prepolish/` vs `audit/screenshots/polished/`.
Token system: `DESIGN-SYSTEM.md`.

## Course restructure (explicit request, done alongside the polish)

Each lesson (section) now renders in a video-ready format:
- **Video frame** (16:9): embeds a YouTube/Vimeo URL when present, or a branded "Video lesson coming soon" placeholder until you record it.
- **Description**: a one-line summary above the written notes.
- **Body**: the existing written lesson content.
- **Resources**: a list linking to the matching Vault assets and calculators.

Video URLs, descriptions, and resources live in one file, `client/src/content/lessonMeta.js`, keyed by lesson id. To publish a recorded module, set its `video` URL there. All 35 lessons already have a description and curated resources; videos are `null` until recorded. The lesson affordance changed from "Read" to "Watch."

## Token system (new)

Defined once, everything derives from it (full detail in DESIGN-SYSTEM.md):
- **Type:** added **Space Grotesk** as a restrained display face (titles, headings, hero numbers) over **Inter** body; `.num` gives every metric tabular figures.
- **Color:** teal accent pulled back to primary actions / active nav / key metrics only; neutrals carry the layout; semantic success/warning/danger tuned to the teal palette (no default green/red).
- **Depth:** three subtle layered shadows; two radii (10px elements, 16px surfaces) applied universally.
- **Motion:** 160ms / 280ms with one easing curve; `prefers-reduced-motion` fully respected.

## Changes by category

**Typography** — page titles, section headings, module titles, the welcome header, and all hero numbers now use the display face; body prose set to 15px with comfortable line-height; field labels normalized to a single uppercase micro-label role; tabular figures on every calculator result, stat tile, and count.

**Color restraint** — replaced ad-hoc `green-700`/`red-600` on calculator results with tuned `success`/`danger` tokens; stripped incidental accent use; brand teal now marks only primary actions, active state, key numbers, and eyebrows.

**Depth & shape** — unified card radius to 16px and small elements to 10px; swapped heavy/default shadows for the three-level subtle set; single 1px border color throughout.

**Interaction** — every card, nav item, chip, resource row, and accordion header has a hover state and token-timed transition; buttons press down 1px on `:active`; a single elegant `focus-visible` ring for keyboard users (hidden on mouse); inputs focus with a soft brand ring; styled scrollbars.

**States** — the empty "Saved deals" state and the search "no results" state read in the product's voice; the video placeholder is a designed state, not a blank void; saves confirm inline (button flips to a check).

**Signature element** — the **progress ring** (dashboard hero, course hero, and per module): a custom SVG ring with a tabular display-font percentage, the one recurring bespoke moment, chosen because "how far am I" is the course's primary question. Secondary: hero metrics in Space Grotesk tabular figures so the key number dominates each tool.

**Copy** — lesson action reads "Watch"; buttons name their action ("Save this deal", "Mark lesson complete", "Reset to defaults"); consistent vocabulary across surfaces.

## Verification

- Playwright at all three widths, before and after: **0 console errors, 0 page errors, 0 failed requests** across every route.
- Layout holds at 1440 / 768 / 390 (mobile lesson video frame stays 16:9 and legible).
- Zero functional regressions: progress tracking, saved deals (create/rename/copy/delete), both calculators, course completion, and Vault search/filter all work exactly as before.
- No em dashes or hype words in any user-facing copy; content agents' output QA'd clean.

## Open for you

- **Booking URL** (still): every "Book a call" CTA falls back to the `investingsection8.com` homepage, not a calendar. Send the real Calendly/GHL link and I will wire it.
- **Fonts** load from Google Fonts (consistent with the existing Inter setup). If you want guaranteed zero font-swap, I can self-host Space Grotesk + Inter as a follow-up.
- **Record the videos**: drop each module's URL into `lessonMeta.js` and it goes live on the next deploy.
