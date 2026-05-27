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
| Testing | Vitest + Testing Library |
| Lint/Format | ESLint 9 + Prettier 3 |

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
cp .env.example .env.local

# 3. Run dev server
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

## Project Structure

```
src/
  app/                    — Routing & pages
    (marketing)/          — Route group: publik
    (dashboard)/          — Route group: auth-required
    notes/                — Contoh fitur: Catatan (CRUD)
  features/               — Feature modules
    notes/                — Canonical example feature
  components/
    ui/                   — Generic: Button, Input, Card, dll
    shared/               — Cross-feature reusable
  lib/                    — Core: env, errors, fetchers, utils
  services/               — Business logic (future)
  hooks/                  — Custom React hooks
  tests/                  — Test utilities
  styles/                 — Global CSS
```

## How to Work with AI Agents

Repo ini dilengkapi dengan `AGENTS.md` dan `CLAUDE.md` yang berisi:
- Aturan penempatan file
- Konvensi server vs client component
- Validasi dan testing requirements
- Verification checklist

## Deployment

```bash
npm run build
npm run start
```

Output production-ready di `.next/standalone` untuk Docker deployment.

## License

MIT
