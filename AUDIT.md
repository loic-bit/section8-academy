# Cashflow 2.0 Academy — Dashboard Audit

Master record for the overhaul. Scope: the Cashflow 2.0 Academy platform (`section8-platform/`) only.
Audit method: app run locally (Docker Postgres + Express + built Vite SPA), driven with Playwright, screenshotted at 1440 / 768 / 390px, every route + interaction exercised, console captured, calculations hand-verified.

Baseline screenshots: `audit/screenshots/before/{desktop,tablet,mobile}/`
Console/network log: `audit/console-before.json` (0 console errors / page errors on the happy path)

---

## Phase 1 — Inventory & map

This is **not** a set of single-file HTML dashboards. It is one multi-user React SaaS with a shared Postgres backend. That distinction drives the whole overhaul (see "Architecture reality check" below).

| View | Route | File | Data source | User can interact | Intended job |
|------|-------|------|-------------|-------------------|--------------|
| Login | `/login` | `client/src/routes/Login.jsx` | API `/auth/login` → Postgres `users` | email/password form | Return visitor signs in |
| Signup | `/signup` | `client/src/routes/Signup.jsx` | API `/auth/signup` → Postgres + Airtable mirror | name/email/password form | Free account creation (top of funnel) |
| Home | `/` | `routes/Home.jsx` | Hardcoded tiles + `user.name` | Nav tiles, "See options" CTA | Orient the member, route to tools |
| Free Course | `/course` | `routes/Course.jsx` | `MODULES` hardcoded in file; progress from API `/progress` → `course_progress` | Expand modules, "Mark done" | Deliver the curriculum + track progress |
| Calculators | `/calculators` | `routes/Calculators.jsx` | Pure client compute; save → API `/deals` → `saved_deals` | 11 numeric inputs, Save deal | Analyze a Section 8 deal |
| Property Analyzer | `/analyzer` | `routes/PropertyAnalyzer.jsx` | None (static "Coming soon") | Nothing | (stub) Score a property |
| Deal Finder | `/finder` | `routes/DealFinder.jsx` | None (static "Coming soon") | Nothing | (stub) Surface markets |
| Get Help | `/get-help` | `routes/GetHelp.jsx` | Hardcoded `PATHS`/`RESOURCES`; `VITE_CONTACT_URL` | Booking CTAs (external link) | Convert member → sales call |
| Shell | (layout) | `components/DashboardLayout.jsx` | `user` from auth context | Sidebar nav, logout | App frame |

Supporting: `lib/auth.jsx` (auth context), `lib/api.js` (fetch wrapper), `components/PageHeader.jsx` (+ `ComingSoon`), `index.css` (Tailwind component classes), `tailwind.config.js` (brand palette).

**Shared patterns / consolidation candidates**
- `AuthShell` (brand lockup) duplicated conceptually with the sidebar brand lockup — one `<BrandMark>` component.
- Every route hand-rolls its own layout spacing; `PageHeader` exists but content cards repeat the same `card` grid patterns.
- No shared number/currency/percent formatter — `Calculators.jsx` defines `money()`/`pct()` locally; nothing else formats numbers, but any future table will re-implement them. Extract to `lib/format.js`.
- No shared "editable content" source — course outline, get-help copy, and resource cards are all hardcoded in components, so Joseph can't change them without a code deploy.

**Data-source note:** `saved_deals` is written by the calculator but **never read anywhere in the UI** — there is no "My deals" view. Dead-end feature.

---

## Architecture reality check (read before Phases 3–5)

The overhaul brief was written for **single-file, localStorage, per-user-editable** dashboards. This app is the opposite on three counts, and applying the brief literally would break it:

1. **Multi-user shared content.** Course modules and Get-Help copy are the *same for every signed-up member*. "Make every text inline-editable + persist to localStorage" would let each visitor edit *their own private copy* of Joseph's marketing — nonsense. Editable content here means an **admin-controlled content layer in Postgres**, not per-visitor localStorage.
2. **Postgres is the source of truth**, not localStorage. Persistence rules in the brief map to API + DB, not `localStorage.setItem`.
3. **React SPA, not one HTML file.** The "keep it one self-contained HTML file" rule does not apply; the project structure stays React/Vite.

**Decision (documented, see Phase 8):** I implement the *spirit* of the editability/feature phases against the real architecture, and I do **not** bolt per-user localStorage editing onto shared marketing content. Where an admin-editable content layer is the correct answer but is a larger build than this pass, I flag it as a follow-up rather than fake it.

---

## Phase 2 — Visual & functional findings

Severity: 🔴 critical (broken/again-facing) · 🟠 major · 🟡 minor/polish

### 🔴 F1 — Mobile is completely unusable (< ~640px)
`DashboardLayout` renders a fixed `w-64` (256px) sidebar in a flex row with no responsive collapse and no mobile nav. At 390px the sidebar eats 256px, leaving ~130px for content: every heading wraps one word per line, the calculator inputs and result values are clipped off the right edge, "Deal Calculator" and "$336" are cut. See `before/mobile/home.png`, `before/mobile/calculators.png`.
- Root cause: `components/DashboardLayout.jsx` — `<aside className="... w-64 ...">` never hidden; `<main>` has no min-width guard.
- Tablet (768px) is fine; the break is purely small screens.
- Fix: off-canvas drawer + hamburger topbar under `md`, static sidebar at `md+`.

### 🟠 F2 — Empty placeholder cards ship to real users (Get Help)
The three "Helpful resources" cards read literally **"Add a link or embed here."** and are visible to every signed-up member (`before/desktop/get-help.png`). This is unfinished scaffolding on a live lead-gen page.
- Fix: drive resources from a content source; render the section only when resources exist (empty state, not placeholder text).

### 🟠 F3 — Booking CTAs point at the homepage, not a booking link
`VITE_CONTACT_URL` defaults to `https://investingsection8.com`. All four CTAs ("Book your call", two "Talk to our team", Home "See options") send members to the generic site homepage, not a calendar. The single most important conversion action in the app is mis-wired.
- Fix: needs the real booking URL from Loic (flagged Phase 8). Code should treat it as required config, not silently fall back to the homepage.

### 🟠 F4 — Two of four tools are dead ends
Property Analyzer and Deal Finder are "Coming soon" stubs but are given equal top-level nav billing and equal-weight tiles on Home. A member clicks two of the four headline tools and hits a 🚧. Erodes trust on first session.
- Fix: mark them "Coming soon" in the nav + tiles (badge), or de-emphasize until real. Don't present vaporware as live.

### 🟡 F5 — Em dashes in UI copy
Calculator subtitle "Section 8 rental analysis — cash flow…", all three course module titles ("Module 1 — Section 8 Foundations", etc.). Violates the house no-em-dash rule (CLAUDE.md, all output).
- Fix: replace with colon/period phrasing.

### 🟡 F6 — Course lessons have no content
Clicking a lesson does nothing — there is only "Mark done." Members can mark lessons complete without any lesson to consume. The course "delivers" nothing yet.
- Noted as a content follow-up (real video/embeds), larger than this pass.

### 🟡 F7 — `saved_deals` write-only
Calculator can Save a deal (writes to Postgres) but there is no view to see saved deals. Data goes into a black hole.
- Fix: add a "Saved deals" list on the Calculators page (read `/deals`, delete supported by API already).

### 🟡 F8 — No app-wide feedback/edge states
No global 401 handling (see F11), no toast/confirmation system, "Save this deal" gives only a button-label change. Calculator "saved" state resets on any input change silently.

### Calculation verification (Phase 2.7) — ✅ PASS
Hand-recomputed the default deal and two stress values; all match the UI exactly:
- Defaults (120k / 25% / 7% / 30y / $1500): down $30,000 ✓, loan $90,000 ✓, P&I $598.8→**$599** ✓, opex **$565** ✓, cash flow **$336** ✓, cap 9.35%→**9.3%** ✓, CoC 13.45%→**13.4%** ✓.
- Big-number stress (999,999,999): no overflow/NaN, numbers reformat and stay in their boxes at desktop (`before/desktop/calculators-bignum.png`); result correctly goes deep negative.
- Documented simplification (not a bug): cash-on-cash uses down payment as cash invested (ignores closing costs) — code comments say so. Consider adding a closing-costs input later.
- Edge case (latent): at 0% interest the code path `loan / n` is handled; at 100% down, `cashInvested` guard prevents divide-by-zero (returns 0% CoC). OK.

### Console / network
0 console errors, 0 page errors, 0 failed requests across all routes/viewports on the happy path (`console-before.json`). Clean.

---

## Phase 3 — Editability audit

Classifying every visible content item. "Editable target" reflects the **admin content-layer** model, not per-user localStorage (see reality check).

| Content | Where | Today | Should be | Right pattern |
|---------|-------|-------|-----------|---------------|
| Course module titles | Course | hardcoded | admin-editable | content layer (follow-up) |
| Course lessons (titles + bodies) | Course | hardcoded, no body | admin-editable + real content | content layer (follow-up) |
| Get-Help hero / paths copy | GetHelp | hardcoded | admin-editable | content layer (follow-up) |
| Get-Help resource cards | GetHelp | placeholder text, hardcoded | admin-editable, hide-when-empty | content layer (this pass: empty-state + config seam) |
| Booking / contact URL | GetHelp, Home | env fallback to homepage | operator-set config | env (this pass: required, no homepage fallback) |
| Calculator default assumptions | Calculators | hardcoded `DEFAULTS` | user-adjustable (already are — they're inputs) | already correct |
| Saved deal label | Calculators | auto-generated | user-editable name | this pass: editable label on save |
| Member name/email | Layout | from account | out of scope (profile edit) | follow-up |

**Verdict:** Genuine per-visitor "editability" that makes sense in this app: (a) name a saved deal, (b) manage saved deals. Everything else labelled "editable" is really *admin content management*, which is a proper feature (a `content` table + `/admin`), correctly scoped as a **follow-up build**, not faked with localStorage. This is the single biggest place the brief's assumptions don't fit the app; calling it out rather than mis-building it.

---

## Phase 5 — Feature gap analysis (verdicts)

| # | Feature | Verdict | Reason |
|---|---------|---------|--------|
| 1 | Mobile nav / responsive shell | **implement now** | F1, app unusable on phones |
| 2 | Saved-deals list + editable label + delete | **implement now** | closes F7; API already exists (`GET`/`DELETE /deals`) |
| 3 | Get-Help resources as data + empty state | **implement now** | closes F2 |
| 4 | "Coming soon" badges on stub tools | **implement now** | closes F4, sets expectations |
| 5 | Course progress: un-mark a lesson | **implement now** | small, obvious; today complete-only |
| 6 | Global 401 → auto-logout in `api.js` | **implement now** | correctness (F11) |
| 7 | Copy-to-clipboard on a saved deal summary | **implement now** | cheap, useful for sharing a deal |
| 8 | Shared `lib/format.js` (currency/percent) | **implement now** | consolidation, used by saved deals |
| 9 | Keyboard: Enter saves deal-label edit, Esc cancels | **implement now** | brief Phase 5.8, trivial |
| 10 | Search/sort on saved deals | **skip (for now)** | list will be tiny; revisit when tables exist |
| 11 | Admin content CMS for course + get-help | **skip → follow-up** | correct home for "editable content" but a real build; flag to Loic |
| 12 | Real course lesson content (video/embeds) | **skip → follow-up (content)** | needs Joseph's material, not a code task |
| 13 | Property Analyzer / Deal Finder real builds | **skip → follow-up** | product scope, needs data API (RentCast/ATTOM) |
| 14 | Last-updated / print-to-PDF | **skip** | member SaaS, not a report; low value here |

---

## Bugs found in code review (feed Phase 6)

- **F9** `Login.jsx`: `if (user) return navigate('/', { replace: true });` — calls `navigate()` (a side effect) during render and returns its value as JSX. React anti-pattern; can warn/misbehave. Use `<Navigate>` or `useEffect`.
- **F10** Local dev can't load env: `npm run dev` runs `node --watch server/index.js` with no `dotenv`/`--env-file`, and Vite's `envDir` defaults to `client/` so root `.env` `VITE_*` vars aren't read. README's `cp .env.example .env && npm run dev` doesn't actually load `.env`. (I booted with `node --env-file` to work around.)
- **F11** `api.js`: no 401 handling — an expired/invalid token throws a generic error per call instead of clearing the token and bouncing to login. Add global 401 → `clearToken()` + redirect.
- **F12** `Calculators.jsx`: `parseFloat(e.target.value) || 0` turns an empty field into 0 silently and a partially-typed value can coerce oddly; acceptable but pair with min guards.
- **F13** No `try/catch` around `localStorage` access in `api.js` (`getToken`) — throws in privacy-mode/blocked storage. Wrap defensively.
- **F14** `server/index.js`: `JWT_SECRET` falls back to a hardcoded `'dev-insecure-secret-change-me'` if unset — fine for dev, but should refuse to boot in production without a real secret. (Prod has it set; harden anyway.)

---

## Implementation plan (this pass)

1. `DashboardLayout` → responsive shell (mobile drawer + hamburger, static sidebar ≥ md).
2. `lib/format.js` + `lib/useToast` (tiny) for shared formatting + feedback.
3. `Calculators` → saved-deals list (read/delete/edit label/copy), keyboard save/cancel, use shared format.
4. `GetHelp` → resources from data, hide-when-empty, required contact URL, de-em-dashed copy.
5. `Course` → de-em-dashed titles, toggle-off support, unchanged progress API.
6. `Home` + nav → "Coming soon" badges on stubs.
7. `Login` render-bug fix; `api.js` 401 + storage try/catch; `server` JWT hardening.
8. `index.css`/tailwind → CSS-variable brand tokens, spacing scale; remove any dead styles.
9. Rebuild, re-run harness → `after/` screenshots, compare, iterate to zero new findings.

Everything is done **locally**. No Railway deploy without explicit approval (live lead-capturing app).
