# Cashflow 2.0 Academy — Learning Design (v4)

The redesign brief from Loic: the toolkit overwhelms, the course reads like information regurgitation, the existing 50 Door Plan and Turnkey vs BRRRR calculators are not in the platform, and the whole thing should be organized around how people actually learn: stages of awareness, beginner → intermediate → advanced, each section leading into the next, fun and interactive, nurturing members toward being ready to invest in Section 8. Advanced members get upsold AI Deal Finder (30-day free trial, then $25/mo).

## 1. The core insight: teach by stage of awareness, not by topic

A topic taxonomy (Markets, Financing, Legal...) is how experts file information. It is not how beginners learn. A beginner does not need the HQS checklist; they need to believe real estate is for them and pick a vehicle. An intermediate does not need mindset talk; they need to close a first deal. An advanced investor skims everything and wants speed, tools, and deal flow.

So the platform reorganizes around **three levels that mirror stages of awareness**:

| Level | Rank name | Stage of awareness | Job of this level | Emotional job |
|---|---|---|---|---|
| 1 · Foundation | **Scout** | Problem-aware → solution-aware | Why cash flow, what vehicle, why Section 8 wins | Belief and permission to start |
| 2 · First Deal | **Operator** | Solution-aware → doing it | Market, find, analyze, fund, close | Confidence through competence |
| 3 · Scale | **Portfolio Builder** | Most-aware, ready to act | Operate, protect, recycle capital to 50 | Identity: "I am an investor" |

Each level ends at a **checkpoint**, and the level you are in is the only one fully expanded. That is the anti-overwhelm mechanism: you always see one clear next step, never 47 lessons.

## 2. Progression mechanics (fun without being childish)

The audience is 28-55 with real money. Gamification must feel like status, not stickers.

- **Ranks**: Scout → Operator → Portfolio Builder, shown on the dashboard next to the progress ring. Advancing rank is the milestone moment (celebration screen, reduced-motion safe).
- **Checkpoints between levels**: a 6-question quiz drawn from the level's content. Two ways through, so nobody is hostage:
  1. Complete the level's lessons → checkpoint unlocks → pass it to rank up.
  2. **Fast-track**: already experienced? Take the checkpoint cold at any time. Pass = skip ahead. This respects intermediate/advanced arrivals (Loic's "maybe gating is too much" concern is solved by the fast-track).
- Pass mark 5/6, retake freely, instant feedback with the correct answer taught back (a failed question is a teaching moment, not a punishment).
- Unlocks persist server-side via the existing `course_progress` table (pseudo-lesson ids `unlock-operator`, `unlock-portfolio`), so no schema change and it survives devices.

## 3. The journey, level by level

### Level 1 · Foundation (Scout) — 3 modules, 14 lessons
- **M-A Money & Mindset (new, 4 lessons)** — the investor mindset shift (assets buy freedom), cash flow vs appreciation (why chasing equity keeps you poor), your risk tolerance and starting position (embeds the **Readiness Quiz**), the wealth math (how doors compound: cash flow + paydown + appreciation).
- **M-B Pick Your Vehicle (new, 5 lessons)** — the 5 filters to judge any strategy (cash in, monthly cash flow, time, risk, scalability), then honest cost breakdowns: **Airbnb/STR**, **Flips**, **ADUs**, and **traditional rentals vs Section 8** (embeds the **Strategy Comparison** tool). This is where the platform *sells* Section 8 as the best cash-flow strategy by showing the math side by side instead of claiming it.
- **M-C Section 8 Foundations (existing m1, 5 lessons)** — how the program works, FMR, myths, the PHA.
- **Checkpoint 1 → rank up to Operator.**

### Level 2 · First Deal (Operator) — 5 modules, 25 lessons (existing m2-m6)
Markets → Finding deals → Analyzing (Deal Calculator) → Funding (BRRRR Calculator + **Goal Planner: Turnkey vs BRRRR**) → the Section 8 process A to Z. Sequenced exactly like a real first deal.
- **Checkpoint 2 → rank up to Portfolio Builder.**

### Level 3 · Scale (Portfolio Builder) — 2 modules, 7 lessons
- **M-7 Own & Operate (3 lessons, from existing m7)** — self-manage vs PM, problem tenants, entity structure.
- **M-8 Scale to 50 Doors (4 lessons: 2 reworked + 2 new)** — capital recycling, **build your 50 door plan** (embeds the ported **Path to 50 Doors** calculator), tax strategy, and **deal flow at scale** (introduces AI Deal Finder naturally: at this stage the bottleneck is finding enough good deals, which is exactly what the product solves).

## 4. The calculators (now first-class citizens of the course)

Ported from Joseph's existing pages, restyled to the platform design system, and embedded in the lessons where they teach:

| Tool | Source | Level | What it teaches |
|---|---|---|---|
| Deal Calculator | already live | 2 | one deal's numbers |
| BRRRR Calculator | already live | 2 | recycling one deal |
| **Goal Planner (Turnkey vs BRRRR)** | ported from section8-onepager | 2 | pick a goal (income / doors / net worth), compare both strategies' timelines |
| **Path to 50 Doors** | ported from path-to-50-doors | 3 | deal quality (cash stuck) sets your timeline, not your salary |
| **Readiness Quiz** | new | 1 | risk tolerance + starting position → recommended path |
| **Strategy Comparison** | new | 1 | Section 8 vs Airbnb vs flip vs ADU vs traditional, cost breakdowns |

Compliance: all simulators keep Joseph's guardrails: educational estimates, no promised returns, honest 15-25% cash-on-cash framing, "our average BRRRR leaves $10-17K in the deal" style numbers already published in the Financing Blueprint.

## 5. Toolkit cleanup: 25 cards → 12

The Vault stops being a wall of 23 documents. New IA:

- **Row 1 — Interactive tools (6)**: the four calculators + two quizzes above. Tools first because doing beats reading.
- **Row 2 — Kits (6)**: the 23 written assets grouped into stage-aligned kits, each kit one card:
  1. **Market & Buy Box Kit** (scorecard, FMR research, landlord-friendly states, buy box worksheet)
  2. **Deal Analysis Kit** (checklist, rehab estimator, 1%/50% rules)
  3. **Financing Kit** (options matrix, DSCR guide, creative financing, lender questions)
  4. **Section 8 Paperwork Kit** (HQS checklist, RFTA/HAP, screening, rent reasonableness)
  5. **Landlord Kit** (management SOP, lease guide, eviction map, entity structure)
  6. **Scale & Wealth Kit** (50 doors roadmap, capital recycling, tax strategy, net worth projection)
- A kit page = a one-paragraph "when you need this" intro + its assets. Individual asset pages stay (lesson resource links keep working); they gain a "part of X Kit" breadcrumb.
- Search stays. Category chips are replaced by the kit structure.

## 6. AI Deal Finder (the advanced upsell)

The dead "Deal Finder — coming soon" stub becomes the **AI Deal Finder** product page:
- Positioning: at Scale level the bottleneck is deal flow. AI Deal Finder scans listings against Section 8 rents (FMR) and your buy box and surfaces cash-flowing candidates, daily.
- Offer: **30-day free trial, then $25/month, cancel anytime**.
- CTA works today with zero billing infra: "Start my free trial" → in-app request (`POST /api/dealfinder/trial`) → stored in Postgres + mirrored to Joseph's Airtable (source label "AI Deal Finder Trial") → member sees "Trial requested, we activate it within 24 hours." When a real checkout link exists, `VITE_DEALFINDER_URL` flips the button to it, no redesign.
- Surfaced: nav item (with TRIAL badge), dashboard band, M-8 lesson, Scale rank-up celebration screen.

## 7. Navigation cleanup (5 items, was 8)

Home · The Course · Toolkit · AI Deal Finder · Get Help.
Calculators move under Toolkit (and are linked contextually from lessons); Property Analyzer leaves the nav until it exists (route stays).

## 8. What was deliberately NOT done

- No hard paywall/lock on content beyond checkpoint ranks with fast-track: friction should create momentum, not resentment.
- No points/streaks/leaderboards: wrong register for this audience.
- No trimming of the written lesson library: the depth is the value. It is *presentation* (one level at a time) that kills the overwhelm, not deletion.
- Property Analyzer stays unbuilt rather than shipping another stub.
