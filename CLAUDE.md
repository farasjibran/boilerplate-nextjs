# Boilerplate Next.js — Claude Code Configuration

> **Status**: Phase 3 in progress (CLI generator). Phase 1 + 2 complete.

## Tech Stack
- **Backend**: Next.js 15 App Router (TypeScript strict)
- **Frontend**: React 19 (Server Components default)
- **Styling**: Tailwind CSS 4 + `clsx` + `tailwind-merge`
- **Validation**: Zod 3
- **Forms**: React Hook Form
- **Auth**: Auth.js v5 (NextAuth beta) + GitHub + Credentials
- **Database**: PostgreSQL + Prisma 6
- **Observability**: Sentry 10
- **Testing**: Vitest 4 + Testing Library (Playwright optional)
- **Lint/Format**: ESLint 9 + Prettier 3 + `eslint-config-next`
- **Package Manager**: npm

## Core Libraries
- **next** 15.2.4 — App Router framework
- **react** 19 + **react-dom** 19 — UI library
- **typescript** 5.7.3 — strict mode
- **tailwindcss** 4.0.9 — utility-first CSS
- **zod** 3.24.2 — runtime type validation & schema
- **react-hook-form** 7.54.2 — form state & validation
- **next-auth** 5.0.0-beta.25 — authentication (Auth.js v5)
- **@prisma/client** 6.5.0 — database ORM
- **@sentry/nextjs** 10 — error tracking + performance
- **clsx** 2.1.1 + **tailwind-merge** 3.0.2 — conditional class helper
- **eslint** 9.20.1 + **prettier** 3.5.2 + **eslint-config-next** 15.2.4
- **vitest** 3.0.5 + **@testing-library/react** 16.2.0 — testing
- **tsx** 4.22.3 — TypeScript execution for seed/scripts

## Perintah Penting
```bash
npm run dev             # Start dev server
npm run build           # Production build
npm run lint            # ESLint check
npm run typecheck       # tsc --noEmit
npm run test            # Vitest run
npm run check           # Aggregate: lint + typecheck + test
npm run prisma:generate # Generate Prisma client
npm run prisma:migrate  # Run migrations (dev)
npm run prisma:seed     # Seed database
npm run prisma:studio   # Open Prisma Studio
npm run generate <name> # Scaffold new feature (CLI)
```

## Struktur Direktori
```
src/
  app/                    # Next.js App Router
    (marketing)/          # Route group: publik
    (dashboard)/          # Route group: auth-required
    api/                  # API routes + Auth.js handler
    notes/                # Notes feature pages
  components/
    ui/                   # Generic: Button, Input, Card, dll
    shared/               # Cross-feature reusable (AuthProvider)
    feature/              # Feature-specific
  features/               # Feature-based modules
    notes/                # Canonical example feature
      types/              # TypeScript types
      schemas/            # Zod validation
      lib/                # Feature utilities (Prisma queries)
      queries/            # Read operations
      actions/            # Server actions (mutations)
      components/         # Feature UI
      __tests__/          # Tests
  lib/                    # Core libraries
    env/                  # Environment validation
    fetchers/             # Fetch wrapper
    utils/                # cn() helper
    errors/               # Custom error classes
    auth/                 # Auth.js config
    db.ts                 # Prisma singleton
    logger.ts             # Structured JSON logger
  middleware.ts           # Route protection (Auth.js)
  styles/                 # Global CSS, Tailwind config
  tests/                  # Test utilities
prisma/
  schema.prisma           # Database schema
  seed.ts                 # Seed data
sentry.*.config.ts        # Sentry client/server/edge configs
```

## Module Map

### `src/lib/` — Core Utilities
- **db.ts** — Prisma singleton dengan dev-mode connection pooling guard
- **auth/index.ts** — Auth.js v5 config (GitHub + Credentials providers)
- **env/index.ts** — Zod schema untuk semua env vars
- **errors/index.ts** — AppError, ValidationError, NotFoundError, dll
- **fetchers/index.ts** — `apiFetch<T>()` dengan error normalization
- **logger.ts** — JSON structured logging (level, timestamp, message, context)
- **utils.ts** — `cn()` helper (clsx + tailwind-merge)

### `src/features/notes/` — Notes Feature (CRUD)
Business flow: Buat catatan → List → Detail → Edit → Hapus. Phase 2: migrate dari in-memory ke Prisma.
- **types/index.ts** — Note, NoteCreateInput, NoteUpdateInput
- **schemas/note.schema.ts** — createNoteSchema, updateNoteSchema (Zod)
- **lib/store.ts** — In-memory store (akan diganti Prisma)
- **queries/notes.query.ts** — getAllNotesQuery, getNoteByIdQuery
- **actions/notes.action.ts** — createNoteAction, updateNoteAction, deleteNoteAction
- **components/** — NoteForm, NoteCard, NoteList

### `src/app/` — Routes
- **`/`** — Landing page
- **`/login`** — Login page (credentials + GitHub)
- **`/notes`** — Notes list
- **`/notes/new`** — Create note
- **`/notes/[id]`** — Note detail
- **`/notes/[id]/edit`** — Edit note
- **`/api/auth/[...nextauth]`** — Auth.js handler
- **`/api/sentry-example-api`** — Sentry test endpoint
- **`/dashboard`** — Protected route (auth required)

## Database Conventions
- **ORM**: Prisma 6
- **Database**: PostgreSQL
- **ID strategy**: `cuid()` default
- **Timestamps**: `createdAt` + `updatedAt` (auto)
- **Soft delete**: Belum ada
- **Naming**: snake_case untuk kolom (`@@map`)
- **Relations**: Cascade delete untuk User → Notes

## API Patterns
- **Response format**: `{ status, data, message }` wrapper
- **API prefix**: `/api/` (App Router route handlers)
- **Serialization**: Zod schema di input & output
- **Error format**: Custom error classes, tidak bocorkan detail internal

## Template & Layout
- **Root layout**: `src/app/layout.tsx` — Inter font, metadata, Indonesian lang
- **Route groups**: `(marketing)`, `(dashboard)` untuk domain separation
- **Each route**: `loading.tsx`, `error.tsx`, `not-found.tsx`
- **UI convention**: Server Component default, `"use client"` hanya bila perlu interaktivitas

## Base Classes & Utilities
- `src/lib/utils.ts` — `cn()` helper
- `src/lib/env/index.ts` — environment validation (Zod schema)
- `src/lib/errors/index.ts` — AppError, ValidationError, NotFoundError, UnauthorizedError, ConflictError
- `src/lib/fetchers/index.ts` — `apiFetch<T>()` with error normalization
- `src/lib/db.ts` — Prisma singleton (dev connection pooling guard)
- `src/lib/logger.ts` — JSON structured logger

## Shared UI Components
- `src/components/ui/button.tsx` — primary/secondary/ghost/destructive variants
- `src/components/ui/input.tsx` — error display, a11y
- `src/components/ui/card.tsx` — Card, CardHeader, CardTitle, CardContent
- `src/components/ui/empty-state.tsx` — title, desc, optional icon/action (href-based)
- `src/components/ui/error-state.tsx` — title, message, retry button
- `src/components/ui/loading-state.tsx` — spinner + message
- `src/components/shared/AuthProvider.tsx` — SessionProvider wrapper

## Integration Points
- **Sidebar/navigation**: `src/components/shared/`
- **Protected routes**: `src/middleware.ts` — `/dashboard` group requires auth
- **Auth flow**: `/login` → callbackUrl redirect
- **URL registration**: `src/app/` route structure
- **API registration**: `src/app/api/`

## Auth & Session
- **Provider**: Auth.js v5 (next-auth@beta)
- **Strategy**: Database sessions (Prisma adapter)
- **Providers**: GitHub OAuth + Credentials (placeholder)
- **Session**: Database-backed (sessions table)
- **Key middleware**: `src/middleware.ts` — protected `/dashboard` routes
- **Login URL**: `/login`
- **Server session**: `auth()` from `@/lib/auth`

## Signals & Events
Tidak ada signals/events.

## Workflow
Gunakan `/imp.dev <task>` untuk mengerjakan fitur. Workflow otomatis:
1. **Persiapan** — Cek branch, pull, jalankan test
2. **Analisis** — Cek Module Map, baca file terkait, analisis dampak
3. **Plan** — Masuk plan mode, buat implementation plan, tunggu approval user
4. **Eksekusi** — Implementasi sesuai plan yang disetujui
5. **Quality Check** — Code review + refactor
6. **Verifikasi** — Test, commit, ringkasan

## Aturan Umum (WAJIB diikuti setiap saat)

### Reuse First
- Sebelum menulis kode baru, **cek Module Map dan Shared UI Components** di atas
- **DILARANG membuat komponen UI atau fungsi baru jika sudah ada yang serupa** — gunakan yang existing
- Jika perlu modifikasi, extend yang existing daripada buat baru

### Plan Before Code (WAJIB — tanpa pengecualian)
- **DILARANG KERAS menulis/mengedit kode implementasi SEBELUM user menyetujui plan**
- **SEMUA perubahan kode WAJIB masuk `EnterPlanMode`** — sekecil apapun perubahannya, termasuk fix 1 file
- Alur WAJIB: analisis → `EnterPlanMode` → tulis plan → tunggu user approve via `ExitPlanMode` → baru implementasi
- Ini berlaku untuk SEMUA prompt: `/imp.*` commands, prompt ad-hoc, maupun instruksi langsung dari user
- **Satu-satunya pengecualian**: prompt yang TIDAK mengubah kode (pertanyaan, review, analisis read-only)

### Development Log (WAJIB — setiap prompt yang mengubah kode)
**PENTING: Aturan ini berlaku untuk SEMUA prompt — termasuk prompt ad-hoc di luar command `/imp.*`.**
Setiap kali selesai mengerjakan prompt yang mengubah kode, WAJIB:
1. Load skill `sop-devlog`
2. Update file `docs/devlogs/<YYYYMMDD>-<nama_branch>.md`
3. Commit devlog bersama kode perubahan

Skip HANYA untuk: fix typo, rename variabel, formatting saja.

### Update CLAUDE.md (WAJIB — setiap prompt yang mengubah kode)
**PENTING: Aturan ini berlaku untuk SEMUA prompt — termasuk prompt ad-hoc di luar command `/imp.*`.**
Setiap kali selesai mengerjakan prompt yang mengubah kode, cek apakah CLAUDE.md perlu di-update.
Update secara incremental (via `Edit`, JANGAN full regenerate):
- Module/model/view/service/URL baru → update **Module Map** (listing + business flow + hub modules jika ada dependensi baru)
- Library/package/utility baru (folder lib/, packages/, utils/, helpers/, atau sejenisnya) → update **Module Map** + **Struktur Direktori**
- Business flow berubah (alur, dependensi antar modul, integrasi baru) → update deskripsi flow dan hub modules di **Module Map**
- Shared component baru → update **Shared UI Components**
- Entry point navigasi baru → update **Integration Points**
- API pattern berubah → update **API Patterns**
- Layout/blocks berubah → update **Template & Layout**
- Konvensi DB berubah → update **Database Conventions**
- Signal/event/observer baru → update **Signals & Events**
- Base class/mixin baru → update **Base Classes & Utilities**
- Dependency baru di-install → update **Tech Stack** dan **Core Libraries**
- Folder/struktur baru dibuat → update **Struktur Direktori**
- Stack berubah atau cara run berubah → update **Tech Stack** dan **Perintah Penting**

Skip HANYA untuk: bug fix tanpa ubah struktur, tambah test, rename variabel, fix typo, formatting.

### Aturan Kode
Lihat skill `coding-standards` untuk aturan lengkap. Highlights:
- Maksimal 88 karakter per baris, 30 baris per function, 400 baris per file
- Type hints WAJIB, docstring WAJIB di public function
- Conventional commits, 1 task = 1 commit
- **DILARANG** menambahkan `Co-Authored-By` pada semua commit — tanpa pengecualian
- Bahasa Indonesia untuk komunikasi, English untuk kode

### Naming Convention
- file util: `kebab-case.ts`
- component: `PascalCase.tsx`
- hooks: `use-*.ts`
- schema: `*.schema.ts`
- types: `*.types.ts`
- server action: `*.action.ts`
- queries: `*.query.ts`

### Coding Rules
- Default ke Server Component
- Tambahkan `"use client"` hanya jika perlu interaktivitas/browser API
- Validation schema dekat dengan feature
- Shared UI generic di `components/ui`
- Feature-specific component jangan naik ke shared terlalu cepat
- Semua perubahan penting harus lolos `npm run check`

## Agent & Skill yang Tersedia

### Agents
Belum ada custom agents — gunakan default agents.

### Skills
- `coding-standards` — standar kualitas kode wajib
- `nextjs-patterns` — pola Next.js 16 App Router
- `typescript-guideline` — konvensi TypeScript strict mode
- `javascript-guideline` — konvensi JavaScript
- `html-standards` — standar semantic HTML & a11y
- `tailwindcss-patterns` — pola Tailwind CSS 3.x
- `testing-patterns` — pola testing
- `security-auth-checklist` — checklist keamanan auth
- `sop-plan` / `sop-plan-lengkap` — template implementation plan
- `sop-devlog` — format devlog
- `imp.*` — command suite

### Commands
- `/imp.dev` — Development
- `/imp.bug` — Bug investigation
- `/imp.test` — Test coverage
- `/imp.review` — Code review
- `/imp.refactor` — Refactoring
- `/imp.hotfix` — Hotfix
- `/imp.security` — Security audit
- `/imp.qa` — Quality assurance
- `/imp.mr` — MR title & description
- `/imp.ticket` — Format requirement ke tiket
- `/imp.update` — Update konfigurasi .claude
- `/imp.setup` — Generate CLAUDE.md
- `/imp.help` — Panduan
- `/imp.proof` — Formal correctness verification
