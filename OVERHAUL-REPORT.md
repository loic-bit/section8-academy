# Cashflow 2.0 Academy — Overhaul Report

Scope: the Cashflow 2.0 Academy platform (`section8-platform/`) only.
Method: app run locally (Docker Postgres + Express + built Vite SPA), audited and re-audited with a Playwright harness at 1440 / 768 / 390px, every route + interaction exercised, console captured, calculations hand-verified, new API routes tested end-to-end with a live token.
All work is **local**. Nothing has been deployed to Railway (see "Open decisions" #1).

Companion doc: [`AUDIT.md`](AUDIT.md) — full inventory + findings.
Screenshots: `audit/screenshots/before/` vs `audit/screenshots/after/` (`{desktop,tablet,mobile}/<view>.png`).
Originals snapshotted to `backup/20260703-222509/` before any edits.

---

## 1. Bugs found and fixed (by area)

**Shell / layout**
- 🔴 **Mobile completely unusable (< 640px).** Fixed 256px sidebar never collapsed; at 390px content was crushed to ~130px with one-word-per-line wrapping and right-edge clipping. → Rewrote `DashboardLayout` into a responsive shell: static sidebar at `md+`, off-canvas drawer + hamburger top bar below `md`, `min-w-0` so content can shrink. Compare `before/mobile/*` (broken) → `after/mobile/*` (clean).

**Get Help**
- 🟠 **Placeholder cards shipped to real members.** Three "Add a link or embed here." cards rendered on a live lead-gen page. → Resources are now data-driven; the section renders only when real resources exist (no placeholder text). Cards become real links when a `href` is provided.

**Home / nav**
- 🟠 **Vaporware presented as live.** Property Analyzer & Deal Finder (stubs) had equal billing. → "Coming soon" badges on the Home tiles and "Soon" badges in the sidebar; their stub pages now show member-facing copy instead of internal "v1 scaffold / wire RentCast API" jargon.

**Copy**
- 🟡 **Em dashes in UI** (calculator subtitle, all 3 course module titles, analyzer subtitle, deal-finder note, auto-generated saved-deal label). → All replaced with colons / middle dots, per the house no-em-dash rule. (Comment-only em dashes left as-is; not user-facing.)

**Auth / correctness**
- 🟡 **`Login.jsx` called `navigate()` during render** and returned its value as JSX (React side-effect-in-render anti-pattern). → Replaced with declarative `<Navigate>`.
- 🟡 **No global 401 handling.** An expired token threw a generic per-call error. → `api.js` now clears the token and redirects to `/login` on any 401.
- 🟡 **`localStorage` unguarded.** Threw in private/blocked-storage modes. → `getToken/setToken/clearToken` wrapped in try/catch; fetch failures now surface a human "Network error" message.
- 🟡 **`JWT_SECRET` insecure fallback in prod.** → Server now refuses to boot in production if `JWT_SECRET` is unset/default.

**Data**
- 🟡 **`saved_deals` was write-only** (calculator saved to Postgres but nothing read it back). → New "Saved deals" list on the Calculators page (see features).

**Calculations — verified correct, no fix needed.** Hand-recomputed defaults + stress values; all match the UI (down $30,000, P&I $599, opex $565, cash flow $336, cap 9.3%, CoC 13.4%). Big-number input (999,999,999) does not overflow or NaN. Guarded divide-by-zero on cap rate / cash-on-cash while I was in there.

---

## 2. Fields made editable / interactive (added this pass)

Reflecting the **real architecture** (multi-user Postgres SaaS, not a per-user localStorage dashboard — see AUDIT.md "Architecture reality check"):
- **Saved deal label** — click to rename inline, Enter saves, Esc cancels, blur saves (persists via new `PATCH /api/deals/:id`).
- **Saved deals** — Copy (plain-text deal summary to clipboard) and Delete per deal.
- **Calculator inputs** — added a **Reset to defaults** control.
- **Course lessons** — can now be **un-marked** (was complete-only), via new `DELETE /api/progress/:lessonId`.

Content that is *shared across all members* (course outline, Get-Help marketing copy) was deliberately **not** made per-user editable — that would let each visitor edit their own private copy of Joseph's marketing. The correct home for that is an admin content layer (see Open decisions #2).

---

## 3. New organization logic (per view) and why

- **Home** — unchanged primary job (orient + route), but stub tools are now visibly de-ranked with "Coming soon" so the two live tools (Course, Calculators) carry the weight and first-session trust isn't burned on 🚧 pages.
- **Calculators** — primary job (answer "does this deal cash flow?") stays top-right and biggest. Added a secondary **Saved deals** zone below the fold so the calculator remains the focus while giving saved work a home.
- **Get Help** — conversion CTA (game-plan call) stays the loudest element; removed the dead "resources" section so the page ends on the two offer paths instead of trailing off into empty placeholders.
- **Course** — unchanged IA (progress → modules); just cleaned titles and made completion reversible.
- **Shell** — one nav, one brand lockup (`BrandMark`), consistent across sidebar / mobile bar / auth screens.

---

## 4. Features added, and considered-but-skipped

**Added (earned their place):**
1. Responsive mobile nav (drawer + hamburger).
2. Saved-deals list: view, rename (inline, keyboard), copy-to-clipboard, delete.
3. Get-Help resources as data + hide-when-empty.
4. "Coming soon" badges on stub tools + member-facing stub copy.
5. Course lesson un-mark.
6. Global 401 → auto-logout.
7. Shared `lib/format.js` (currency / percent / relative-time) — removes per-file re-implementation.
8. `BrandMark` component — removes the duplicated wordmark in 3 places.
9. Reset-to-defaults on the calculator.
10. New server routes: `PATCH /api/deals/:id`, `DELETE /api/progress/:lessonId` (both tested end-to-end).

**Considered, skipped (with reason):**
- Search/sort on saved deals — list will be tiny; revisit when it grows.
- Admin content CMS for course + get-help — the *correct* answer for "editable content," but a real build (a `content` table + `/admin`); flagged, not faked. See Open decisions #2.
- Real course lesson bodies (video/embeds) — content task needing Joseph's material, not code.
- Property Analyzer / Deal Finder real builds — product scope, needs a data API (RentCast/ATTOM).
- Last-updated stamp / print-to-PDF — this is a member SaaS, not a report; low value.
- CSS-variable design tokens — **already** centralized in `tailwind.config.js` (brand palette / font are one-line edits there); adding parallel CSS vars would duplicate the source of truth.

---

## 5. Open decisions / follow-ups for you

1. **Deploy.** Everything is local and reversible (git + `backup/`). I did **not** push to `loic-bit/section8-academy` or redeploy Railway, because that's a live lead-capturing app. Say the word and I'll commit to a branch and walk the redeploy (note the pinned-commit `serviceInstanceDeployV2` gotcha from your other Railway pages).
2. **Booking URL (important).** All CTAs ("Book your call", "Talk to our team", Home "See options") currently point at `VITE_CONTACT_URL`, which defaults to `https://investingsection8.com` — the generic homepage, **not a calendar**. This is the single most important conversion action in the app. What's the real booking link (Calendly / GHL)? I'll wire it as required config.
3. **Admin content layer.** Do you want members' course content and Get-Help copy editable without a code deploy? If yes, that's a `content` table + a simple `/admin` page — I can scope it. Until then, course/get-help copy is edited in the source files.
4. **Course content.** The 9 lessons are titles only — clicking a lesson shows nothing. Real video/embeds needed before this "delivers."
5. **Dev-env gap (F10).** `npm run dev` doesn't load `.env` (no `dotenv`/`--env-file`; Vite's `envDir` also points at `client/`). I worked around it with `node --env-file`. Worth fixing the script so the README's setup actually works for the next dev.

---

## 6. Before / after (screenshots)

| View | Before | After |
|------|--------|-------|
| Mobile Home | `audit/screenshots/before/mobile/home.png` (sidebar crush, clipped) | `audit/screenshots/after/mobile/home.png` (hamburger, full-width) |
| Mobile Calculators | `before/mobile/calculators.png` (one-word-per-line, values clipped) | `after/mobile/calculators.png` (usable, saved-deals list) |
| Desktop Calculators | `before/desktop/calculators.png` (no saved deals) | `after/desktop/calculators-saved.png` (saved-deals + copy/delete + reset) |
| Get Help | `before/desktop/get-help.png` (placeholder cards) | `after/desktop/get-help.png` (placeholders removed) |
| Home | `before/desktop/home.png` (stubs look live) | `after/desktop/home.png` (Coming-soon badges) |
| Course | `before/desktop/course-expanded.png` (em-dash titles) | `after/desktop/course-expanded.png` (colon titles) |

## Verification

- Console/network: **0 errors, 0 warnings, 0 failed requests** across all routes × 3 viewports, both before and after (`audit/console-before.json`, `audit/console-after.json`).
- New API routes tested with a live token: mark → un-mark progress ✓; create → PATCH-rename → delete deal ✓.
- Calculations re-verified by hand: unchanged and correct.
- Build: `npm run build` clean (48 modules).

## Local environment (for re-runs / teardown)

- Postgres: `docker` container `s8-pg` on host port 5433. Teardown: `docker rm -f s8-pg`.
- API: `node --env-file=.env server/index.js` on :3000 (serves built SPA + API).
- Harness: `scratchpad/harness/audit.mjs` — `BASE=http://127.0.0.1:3000 STAMP=<x> node audit.mjs <label>`.
- Local `.env` (gitignored) points at the local DB with `AIRTABLE_TOKEN` blank, so test signups never touched Joseph's live CRM.
