# Template Fitur Baru

## Struktur Folder

Saat menambah fitur baru, copy struktur ini ke `src/features/<nama-fitur>/`:

```
src/features/<nama-fitur>/
  types/index.ts          # TypeScript types
  schemas/<name>.schema.ts  # Zod validation schemas
  lib/store.ts            # Data store / service layer
  queries/<name>.query.ts  # Read operations
  actions/<name>.action.ts # Server actions (mutations)
  components/             # Feature-specific UI components
  __tests__/              # Test files
```

Route pages di `src/app/<route>/`:

```
src/app/<route>/
  page.tsx                # List/index page
  new/page.tsx            # Create form
  [id]/
    page.tsx              # Detail page
    edit/page.tsx         # Edit form
```

## Required Files

| File | Wajib? | Keterangan |
|------|--------|------------|
| `types/index.ts` | Ya | Definisi types fitur |
| `schemas/*.schema.ts` | Ya | Zod validation untuk semua input |
| `lib/store.ts` | Ya | Data access layer (ganti dengan DB di Phase 2) |
| `queries/*.query.ts` | Ya | Read operations |
| `actions/*.action.ts` | Ya | Server actions untuk mutations |
| `components/` | Ya | UI components |
| `__tests__/` | Ya | Minimal 1 test file |

## Pola Server Action

```typescript
"use server";

import { revalidatePath } from "next/cache";
import { mySchema } from "@/features/my-feature/schemas/my.schema";
import { ValidationError } from "@/lib/errors";

export async function myAction(input: MyInput): Promise<ActionResult> {
  const result = mySchema.safeParse(input);
  if (!result.success) {
    throw new ValidationError(result.error.errors[0].message);
  }

  // ... operasi bisnis

  revalidatePath("/my-route");
  return { success: true, message: "Berhasil" };
}
```

## Pola Page (Server Component)

```typescript
import { Suspense } from "react";
import { myQuery } from "@/features/my-feature/queries/my.query";
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorState } from "@/components/ui/error-state";

async function Content() {
  const data = await myQuery();
  // render data
}

export default function MyPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <Content />
    </Suspense>
  );
}
```

## Langkah Implementasi

1. **Definisikan types** → `types/index.ts`
2. **Definisikan schema** → `schemas/*.schema.ts`
3. **Buat store/service** → `lib/store.ts`
4. **Buat queries** → `queries/*.query.ts`
5. **Buat actions** → `actions/*.action.ts`
6. **Buat components** → `components/`
7. **Buat routes** → `src/app/<route>/`
8. **Buat tests** → `__tests__/`
9. **Jalankan `npm run check`** → pastikan semua lolos
