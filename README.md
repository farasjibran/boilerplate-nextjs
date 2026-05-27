# Boilerplate Next.js

Boilerplate Next.js yang dirancang agar ramah, konsisten, dan efektif untuk **AI coding agent** dan developer manusia.

## Tech Stack

| Kategori | Teknologi |
|----------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5.7 (strict) |
| UI Library | React 19 |
| Styling | Tailwind CSS 4 (CSS-first) |
| Validation | Zod 3 |
| Forms | React Hook Form |
| Auth | Auth.js v5 (JWT, GitHub + Credentials) |
| Database | PostgreSQL + Prisma 6 |
| Observability | Sentry 10 (client + server) |
| Testing | Vitest 4 + Testing Library |
| Lint/Format | ESLint 9 + Prettier 3 |

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
cp .env.example .env.local
# Edit .env.local sesuai kebutuhan

# 3. Setup database (optional, butuh PostgreSQL)
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed

# 4. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Deskripsi |
|---------|-----------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint check |
| `npm run typecheck` | TypeScript type check |
| `npm run test` | Run Vitest tests |
| `npm run check` | Aggregate: lint + typecheck + test |
| `npm run prisma:generate` | Generate Prisma client |
| `npm run prisma:migrate` | Run migrations (dev) |
| `npm run prisma:seed` | Seed database |
| `npm run prisma:studio` | Open Prisma Studio |

## Project Structure

```
src/
  app/                    — Routing & pages
    (marketing)/          — Route group: publik (landing, login)
    (dashboard)/          — Route group: auth-required
    api/                  — API routes + Auth.js handler
    notes/                — Contoh fitur: Catatan (CRUD)
  features/               — Feature modules
    notes/                — Canonical example feature
  components/
    ui/                   — Generic: Button, Input, Card, dll
    shared/               — Cross-feature reusable (AuthProvider)
  lib/                    — Core: env, errors, fetchers, utils, auth, db, logger
  middleware.ts           — Route protection (Auth.js)
  styles/                 — Global CSS
  tests/                  — Test utilities
  docs/                   — Dokumentasi
prisma/
  schema.prisma           — Database schema
  seed.ts                 — Seed data
instrumentation.ts        — Sentry server/edge init
instrumentation-client.ts — Sentry client init
```

## Authentication

Auth.js v5 dengan JWT session strategy. Provider:
- **GitHub OAuth** — set `AUTH_GITHUB_ID` dan `AUTH_GITHUB_SECRET`
- **Credentials** — placeholder (ganti dengan actual auth logic)

Protected routes di `/dashboard` via middleware.

## Database

Prisma 6 dengan PostgreSQL. Model: User, Account, Session, Note.
Migration + seed tersedia. Database optional — Notes masih bisa jalan tanpa DB (in-memory mode).

## Observability

Sentry 10 untuk error tracking dan performance monitoring:
- Client-side: `instrumentation-client.ts`
- Server-side: `instrumentation.ts` (`register()`)
- Global error handler: `src/app/global-error.tsx`
- JSON structured logging: `src/lib/logger.ts`

## How to Work with AI Agents

Repo ini dilengkapi dengan `AGENTS.md` dan `CLAUDE.md` yang berisi:
- Aturan penempatan file
- Konvensi server vs client component
- Validation dan testing requirements
- Verification checklist

## Deployment

```bash
npm run build
npm run start
```

Output production-ready di `.next/standalone` untuk Docker deployment.

## License

MIT
