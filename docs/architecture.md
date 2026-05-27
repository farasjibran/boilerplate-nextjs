# Arsitektur Boilerplate Next.js

## Layer Overview

```
┌─────────────────────────────────────────────────────┐
│  src/app/          — Routing & Pages (Next.js App)  │
│  src/features/     — Feature Modules                │
│    actions/        │ Server Actions (mutations)     │
│    queries/        │ Data Fetching (read ops)        │
│    schemas/        │ Zod Validation                  │
│    components/     │ Feature-specific UI             │
│    types/          │ TypeScript types                │
│    lib/            │ Feature-specific utilities      │
│  src/components/   — Shared UI Components           │
│    ui/             │ Generic primitives              │
│    shared/         │ Cross-feature reusable          │
│  src/lib/          — Core Libraries                 │
│    env/            │ Environment validation          │
│    errors/         │ Custom error classes            │
│    fetchers/       │ API request wrapper             │
│  src/services/     — Business Logic (future DB/API) │
└─────────────────────────────────────────────────────┘
```

## Request Flow

```
Browser → Next.js Route (src/app/)
  ├── Server Component (default)
  │   ├── Query (src/features/*/queries/)
  │   │   └── Store/Service → Data
  │   └── Render UI (components)
  └── Server Action (use server)
      ├── Validate (Zod schema)
      ├── Mutate (Store/Service)
      └── Revalidate → Redirect
```

## Feature Boundaries

Setiap fitur di `src/features/<name>/` harus mandiri:
- **Queries** hanya baca data (read-only)
- **Actions** hanya mutasi data (write)
- **Schemas** validasi Zod untuk input
- **Types** TypeScript types lokal fitur
- **Components** UI spesifik fitur
- **lib** utilitas internal fitur (tidak di-import dari luar)

## Placement Rules

| Tipe Kode | Lokasi | Contoh |
|-----------|--------|--------|
| Route/page | `src/app/<route>/page.tsx` | `src/app/notes/page.tsx` |
| Server action | `src/features/<name>/actions/` | `features/notes/actions/notes.action.ts` |
| Data query | `src/features/<name>/queries/` | `features/notes/queries/notes.query.ts` |
| Validation schema | `src/features/<name>/schemas/` | `features/notes/schemas/note.schema.ts` |
| UI component | `src/features/<name>/components/` | `features/notes/components/NoteForm.tsx` |
| Generic UI | `src/components/ui/` | `components/ui/button.tsx` |
| Shared cross-feature | `src/components/shared/` | `components/shared/UserAvatar.tsx` |
| Core utility | `src/lib/` | `lib/utils.ts`, `lib/env/index.ts` |
| Business logic | `src/services/` | `services/email.service.ts` |
