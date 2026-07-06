# Cashflow 2.0 Academy — Design System

The token system every surface derives from. Defined in `client/src/index.css` (`:root` CSS variables + component classes) and `tailwind.config.js` (theme extensions). No one-off hardcoded values after this pass.

## Typography

- **Display face: Space Grotesk** (500/600/700). Used with restraint for page titles, section headings, hero numbers, and stat values. Gives the product a distinct, custom voice instead of the default Inter-everywhere template look. Class: `font-display` (adds `letter-spacing: -0.02em`).
- **Body / UI face: Inter** (400 to 800). All prose, labels, inputs, nav.
- **Data figures:** `.num` applies `font-variant-numeric: tabular-nums` + `-0.01em` tracking so columns of money and percentages align and never jitter. Applied to every calculator result, stat, and count.
- **Type roles:** display (page/section titles, 26 to 30px, tight tracking), heading (card titles, display bold), body (15px, line-height ~1.6), label (11px uppercase, 0.06em tracking, muted), data (tabular).

## Color

- **Layers:** base `#f6f8f9` (with a faint teal radial in the top-right), raised `#ffffff`, border `#e6ebef`.
- **Text:** primary `#0f172a`, secondary `#475569`, muted `#8a97a6`.
- **Brand accent `#0f766e` (teal), used with restraint:** primary buttons, active nav, key metrics, eyebrows, and focus rings only. Neutrals carry the layout.
- **Semantic, tuned to the teal brand** (not default green/yellow/red): success `#047857` on `#ecfdf5`, warning `#b45309` on `#fffbeb`, danger `#be123c` on `#fff1f2`. Used for cash-flow positive/negative and status only.

## Depth & shape

- **Shadows (three levels, subtle and layered):** `sm` for resting cards, `md` for hover/raised, `lg` for overlays. Defined in `tailwind.config.js`.
- **Radius (two values, universal):** `lg` = 10px (buttons, inputs, chips, small elements), `2xl` = 16px (cards, surfaces, media frames).
- **Borders:** 1px, single border color (`slate-200/80`).

## Motion

- **Tokens:** `--dur-fast: 160ms` (micro-interactions), `--dur-slow: 280ms` (larger transitions), easing `cubic-bezier(0.2, 0.6, 0.2, 1)` (`ease-premium`).
- Hovers, accordion expands, chip switches, and button presses all use these. Buttons nudge down 1px on `:active`.
- **`prefers-reduced-motion: reduce`** collapses all transitions/animations to ~0ms globally.

## Interaction

- Every interactive element has a hover state (background shift, border emphasis, or 0.5px lift) and an active/press state.
- **Focus:** one elegant `focus-visible` treatment (2px brand outline, 2px offset) for keyboard users; mouse clicks do not show it.
- Inputs focus with a soft 4px brand ring. Saves confirm inline (button label flips to a check), never a browser alert.
- Scrollbars are styled (thin, neutral, rounded) on overflow areas.

## Signature element

**The progress ring.** A crisp SVG ring with a tabular display-font percentage at its center, used as the hero of both the dashboard and the course, and again per-module. It is the one recurring custom-drawn moment: it visualizes momentum (the thing that keeps a learner going) in a way a plain bar cannot, and it ties the whole product together. Everything around it is kept quiet so it reads as the signature. Justification: for a course platform, "how far am I" is the primary question, so the signature earns its place by answering it beautifully.

Secondary custom moment: **hero metrics in Space Grotesk tabular figures** (calculator cash flow, BRRRR cash-left-in), so the single most important number on a tool screen is unmistakably dominant and reads as bespoke.

## Course lesson format (video-ready)

Each lesson now renders as: a 16:9 **video frame** (embeds a YouTube/Vimeo URL from `lessonMeta.video`, or a branded "coming soon" placeholder until recorded), a one-line **description**, the written **body**, and a **Resources** list linking to the matching Vault assets and tools. Metadata lives in `client/src/content/lessonMeta.js`, keyed by lesson id, so videos and resources are added without touching lesson content.
