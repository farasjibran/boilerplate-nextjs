# Boilerplate Next.js — Claude Code Configuration

> **Status**: Pre-implementation (PRD approved, belum ada codebase).
> File ini akan auto-update setelah boilerplate di-generate.

## Tech Stack
[dari: PRD.md — Section 11 & 21]
- **Backend**: Next.js App Router (TypeScript strict)
- **Frontend**: React (Server Components default)
- **Styling**: Tailwind CSS + `clsx` + `tailwind-merge`
- **Validation**: Zod
- **Forms**: React Hook Form
- **Testing**: Vitest + Testing Library (Playwright optional)
- **Lint/Format**: ESLint + Prettier + `eslint-config-next`
- **Database**: Belum ada (Prisma/Drizzle optional-ready, v1 tidak wajib)
- **Auth**: Belum ada (Auth.js/Clerk/Supabase Auth optional-ready, v1 tidak wajib)
- **Package Manager**: npm

## Core Libraries
[dari: PRD.md — Section 11]
- **next** (terbaru stabil) — App Router framework
- **react** + **react-dom** — UI library
- **typescript** — strict mode
- **tailwindcss** — utility-first CSS
- **zod** — runtime type validation & schema
- **react-hook-form** — form state & validation
- **clsx** + **tailwind-merge** — conditional class helper
- **eslint** + **prettier** + **eslint-config-next** — code quality
- **vitest** + **@testing-library/react** — unit/component testing
- **@playwright/test** (optional) — E2E testing

## Perintah Penting
[dari: PRD.md — Section 9.17 & 19]
```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # ESLint check
npm run typecheck    # tsc --noEmit
npm run test         # Vitest run
npm run check        # Aggregate: lint + typecheck + test
```

## Struktur Direktori
[dari: PRD.md — Section 9.3]
```
src/
  app/                    # Next.js App Router
    (marketing)/          # Route group: publik
    (dashboard)/          # Route group: auth-required
    api/                  # API routes
  components/
    ui/                   # Generic: Button, Input, Card, EmptyState, ErrorState
    shared/               # Cross-feature reusable
    feature/              # Feature-specific (naik ke shared bila dipakai 2+ fitur)
  features/               # Feature-based modules
    <feature-name>/
      components/         # UI khusus fitur
      actions/            # Server actions / mutations (*.action.ts)
      queries/            # Read operations (*.query.ts)
      schemas/            # Zod validation (*.schema.ts)
      types/              # TypeScript types (*.types.ts)
      utils/              # Helper lokal fitur
      __tests__/          # Test files
  lib/
    env/                  # Environment parsing/validation
    fetchers/             # Fetch wrapper standar
    utils/                # General utility (cn(), format, dll)
    constants/            # App-wide constants
    errors/               # Custom error classes
  services/               # Business logic layer (API integration, external deps)
  hooks/                  # Custom React hooks (use-*.ts)
  styles/                 # Global CSS, Tailwind config
  types/                  # Global TypeScript types
  tests/                  # Test utilities, fixtures
  docs/                   # Arsitektur, konvensi, template
```

## Module Map
**Belum ada modul — project belum di-generate.**
Akan diisi setelah Phase 1 implementasi selesai.

**Hub modules**: Belum ada.
**Feature example**: Akan ada 1 canonical feature (todo/notes/bookmarks) sebagai referensi.

## Database Conventions
Belum ada database di v1. Jika ditambahkan nanti:
- **ID strategy**: TBD (Prisma default atau UUID)
- **Timestamps**: created_at + updated_at
- **Soft delete**: TBD
- **Naming**: snake_case untuk kolom

## API Patterns
Belum ada API layer di v1. Conventions untuk future:
- **Response format**: `{ status, data, message }` wrapper
- **Pagination**: TBD
- **API prefix**: `/api/` (App Router route handlers)
- **Serialization**: Zod schema di input & output
- **Error format**: Aman, tidak bocorkan detail internal

## Template & Layout
[dari: PRD.md — Section 9.5 & 9.9]
- **Root layout**: `src/app/layout.tsx` — metadata, fonts, global providers
- **Route groups**: `(marketing)`, `(dashboard)` untuk domain separation
- **Each route**: `loading.tsx`, `error.tsx`, `not-found.tsx` bila relevan
- **UI convention**: Server Component default, `"use client"` hanya bila perlu interaktivitas

## Base Classes & Utilities
Belum ada custom base classes. Akan ada:
- `src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)
- `src/lib/env/` — environment validation (Zod schema)
- `src/lib/errors/` — custom error classes (AppError, ValidationError)
- `src/lib/fetchers/` — standardized fetch wrapper dengan error handling

## Shared UI Components
Belum ada. Akan ada di `src/components/ui/`:
- Button, Input, Card, EmptyState, ErrorState, Skeleton, LoadingState

## Integration Points
Belum ada. Setelah generate:
- **Sidebar/navigation**: `src/components/shared/`
- **URL registration**: `src/app/` route structure
- **API registration**: `src/app/api/`

## Auth & Session
**Auth belum dikonfigurasi** (masuk v1.1/Phase 2).
- Struktur siap integrasi NextAuth/Clerk/Supabase Auth
- Protected route convention akan didokumentasikan di `docs/conventions.md`

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
[dari: PRD.md — Section 23]
- file util: `kebab-case.ts`
- component: `PascalCase.tsx`
- hooks: `use-*.ts`
- schema: `*.schema.ts`
- types: `*.types.ts`
- server action: `*.action.ts`
- queries: `*.query.ts`

### Coding Rules
[dari: PRD.md — Section 23]
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
Skill global tersedia di `~/.claude/skills/` dan project `.claude/skills/`:
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
- `imp.*` — command suite (dev, bug, test, review, refactor, dll)

### Commands
- `/imp.dev` — Development command
- `/imp.bug` — Bug investigation
- `/imp.test` — Test coverage
- `/imp.review` — Code review
- `/imp.refactor` — Refactoring
- `/imp.hotfix` — Hotfix
- `/imp.security` — Security audit
- `/imp.qa` — Quality assurance
- `/imp.mr` — Generate MR title & description
- `/imp.ticket` — Format requirement ke tiket
- `/imp.update` — Update konfigurasi .claude
- `/imp.setup` — Generate CLAUDE.md
- `/imp.help` — Panduan perintah
- `/imp.proof` — Formal correctness verification
