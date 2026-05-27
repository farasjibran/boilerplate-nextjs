# AGENTS.md — Rules untuk AI Coding Agent

## Repository Structure

```
src/
  app/                    — Next.js App Router (routing & pages)
  features/               — Feature modules (self-contained)
  components/             — Shared UI components
  lib/                    — Core libraries
  services/               — Business logic layer
  hooks/                  — Custom React hooks
  tests/                  — Test utilities
  styles/                 — Global CSS, Tailwind
  types/                  — Global TypeScript types
  docs/                   — Dokumentasi
```

## File Placement Rules

| Kode | Lokasi |
|------|--------|
| Route/page | `src/app/<route>/page.tsx` |
| Server action | `src/features/<name>/actions/` |
| Query | `src/features/<name>/queries/` |
| Validation schema | `src/features/<name>/schemas/` |
| Feature component | `src/features/<name>/components/` |
| Generic UI | `src/components/ui/` |
| Cross-feature shared | `src/components/shared/` |
| Core utility | `src/lib/` |

## Server vs Client Component

**Default**: Server Component (tanpa directive).
**Client Component**: Tambah `"use client"` di baris pertama HANYA jika perlu:
- React hooks (`useState`, `useEffect`, `useContext`)
- Browser API (`window`, `localStorage`)
- Event handlers (`onClick`, `onChange`)

## Validation

- Semua input user HARUS divalidasi dengan Zod schema
- Schema di `src/features/<name>/schemas/`
- Validasi di server action sebelum operasi bisnis

## Testing

- Test file: `__tests__/*.test.ts` atau `__tests__/*.test.tsx`
- Test di dalam folder feature atau `src/components/ui/__tests__/`
- Minimal 1 test per fungsi bisnis
- Minimal 1 test per shared UI component

## Forbidden Patterns

- **JANGAN** gunakan `any` — gunakan type yang spesifik
- **JANGAN** hardcode secrets atau API keys — gunakan `process.env`
- **JANGAN** import feature dari feature lain secara langsung
- **JANGAN** bypass Zod validation di server action
- **JANGAN** tulis kode tanpa test (kecuali UI layout sederhana)
- **JANGAN** tambah dependency tanpa alasan tertulis

## Verification Checklist

Sebelum menyelesaikan task, pastikan:
- [ ] `npm run lint` — lolos tanpa error
- [ ] `npm run typecheck` — lolos tanpa error
- [ ] `npm run test` — semua test pass
- [ ] `npm run build` — build berhasil
- [ ] Tidak ada `TODO`, `FIXME`, `pass`, placeholder
- [ ] File placement sesuai aturan di atas
- [ ] Server/client boundary benar
- [ ] Validation schema ada untuk semua input

## Commands

```bash
npm run dev          # Dev server
npm run build        # Production build
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm run test         # Vitest run
npm run check        # lint + typecheck + test
```
