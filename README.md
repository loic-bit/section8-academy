# Cashflow 2.0 Academy

Free Section 8 investing course + investor toolset for Joseph Khateri's Investing Section 8 brand.
Members sign up for a free account and get:

- 🎓 **Free Course** — full Section 8 investing curriculum with progress tracking
- 🧮 **Calculators** — cash flow / cash-on-cash / cap rate analysis (functional)
- 🏚️ **Property Analyzer** — score a property vs Section 8 rents (v1 scaffold)
- 🔎 **Deal Finder** — surface markets/properties that fit the model (v1 scaffold)
- 🤝 **Get Help** — in-app landing page (mentorship / done-for-you / resources) with a booking CTA

## Stack

- **Frontend:** React + Vite + React Router + Tailwind (`/client`, builds to `/dist`)
- **Backend:** Express API (`/server`) — also serves the built frontend in production
- **Database:** Railway Postgres (users, course progress, saved deals)
- **CRM mirror:** every signup is pushed into Joseph's Airtable for the sales team
- **Auth:** JWT (30-day) + bcrypt password hashing, self-serve signup

## Local development

```bash
npm install
cp .env.example .env          # fill in JWT_SECRET + DATABASE_URL (local Postgres)
npm run dev                   # API on :3000, Vite on :5173 (proxies /api → :3000)
```

Open http://localhost:5173.

## Production / Railway

1. Create a new Railway **project** and add a **Postgres** service — Railway sets `DATABASE_URL` automatically.
2. Deploy this repo as a service (uses the included `Dockerfile`).
3. Set env vars on the service: `JWT_SECRET`, and optionally the `AIRTABLE_*` + `VITE_*` vars from `.env.example`.

The Docker image builds the Vite frontend and serves it from Express on `$PORT`.

## API

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| POST | `/api/auth/signup` | – | Create account, returns token |
| POST | `/api/auth/login` | – | Log in, returns token |
| GET | `/api/auth/me` | ✓ | Current user |
| GET/POST | `/api/progress` | ✓ | Course progress |
| GET/POST/DELETE | `/api/deals` | ✓ | Saved deals from calculators |

## Roadmap (post-scaffold)

- Property Analyzer: manual-input scoring → live data API (RentCast/ATTOM)
- Deal Finder: curated market list → auto-sourced feed
- Course: real lesson content (video/embeds) per lesson
- Admin view of signups; richer Airtable field mapping
