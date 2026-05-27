# Konvensi Boilerplate Next.js

## Naming Convention

| Tipe File | Format | Contoh |
|-----------|--------|--------|
| Utility | `kebab-case.ts` | `format-date.ts` |
| Component | `PascalCase.tsx` | `NoteCard.tsx` |
| Hook | `use-kebab-case.ts` | `use-auth.ts` |
| Schema | `kebab-case.schema.ts` | `note.schema.ts` |
| Types | `kebab-case.types.ts` | `note.types.ts` |
| Server action | `kebab-case.action.ts` | `notes.action.ts` |
| Query | `kebab-case.query.ts` | `notes.query.ts` |

## Server vs Client Component

**Default**: Server Component (tanpa `"use client"`).

**Tambahkan `"use client"`** hanya jika:
- Perlu interaktivitas (onClick, onChange, useState, useEffect)
- Gunakan browser API (localStorage, window, navigator)
- Gunakan React hooks (useState, useEffect, useContext)

**JANGAN pakai `"use client"`** jika:
- Hanya render data dari server
- Hanya akses database/file system
- Hanya compute data untuk render

## Error Handling

```typescript
// 1. Server actions: throw custom error
import { ValidationError, NotFoundError } from "@/lib/errors";

throw new ValidationError("Input tidak valid");
throw new NotFoundError("Data tidak ditemukan");

// 2. Pages: catch dan tampilkan ErrorState
try {
  const data = await query();
} catch (error) {
  return <ErrorState title="Gagal memuat" />;
}

// 3. Client: error boundary
"use client";
// error.tsx akan otomatis dipakai Next.js
```

## State Strategy

| Scope | Approach |
|-------|----------|
| Local UI | React `useState` |
| Form | React Hook Form + Zod |
| Server data | Server Component + `revalidatePath`/`revalidateTag` |
| Cross-component | Context (jika benar-benar perlu) |
| Global | Hindari di v1, evaluasi Zustand/TanStack Query di Phase 2 |

## Environment Rules

- Server-only env: akses langsung via `process.env` di server code
- Public env: prefix `NEXT_PUBLIC_` — aman untuk client
- Semua env divalidasi di `src/lib/env/index.ts`
- Invalid env → fail fast saat startup

## Import Rules

- Gunakan alias `@/` → `src/`
- Import urutan: external → internal (`@/`) → relative (`./`, `../`)
- Feature code TIDAK boleh import dari feature lain secara langsung
- Shared code (`@/components/ui`, `@/lib`) boleh di-import dari mana saja

## File Size Limits

- Max 400 baris per file
- Max 30 baris per function
- Max 88 karakter per baris
- Jika melebihi → pecah ke file terpisah
