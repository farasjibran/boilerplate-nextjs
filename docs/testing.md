# Testing Strategy

## Test Types

| Tipe | Tools | Scope | Contoh |
|------|-------|-------|--------|
| Unit Test | Vitest | Fungsi murni, utilitas | `lib/utils.test.ts` |
| Component Test | Vitest + Testing Library | UI component | `components/ui/__tests__/button.test.tsx` |
| Integration Test | Vitest | Query + Store | `features/notes/__tests__/notes.query.test.ts` |
| E2E Test | Playwright (optional) | User flow | `e2e/notes.spec.ts` |

## Test Priority

1. **Wajib**: Fungsi bisnis (queries, actions, services)
2. **Wajib**: Shared UI component (button, input, card)
3. **Disarankan**: Feature component
4. **Optional**: Page rendering, layout

## Naming Convention

- Test file: `*.test.ts` atau `*.test.tsx`
- Test location: `__tests__/` di dalam folder feature, atau `src/tests/`
- Describe block: nama modul/fungsi, contoh: `describe("notes.query")`
- Test case: `it("should ...")` atau `it("returns ...")`

## Commands

```bash
npm run test          # Vitest run (CI)
npm run test:watch    # Vitest watch mode
npm run test -- --coverage  # Coverage report
```

## Test Utilities

```typescript
import { render, screen } from "@/tests/utils";

// Custom render wrapper ada di src/tests/utils.tsx
// Sudah include Testing Library exports + custom render
```

## Server Actions Testing

Server actions (`"use server"`) tidak bisa di-test langsung di JSDOM.
Test logic validasi dan store-nya terpisah:

```typescript
// Test schema validation
import { createNoteSchema } from "@/features/notes/schemas/note.schema";

it("rejects empty title", () => {
  const result = createNoteSchema.safeParse({ title: "", content: "test" });
  expect(result.success).toBe(false);
});

// Test store operations
import { createNote, getNoteById } from "@/features/notes/lib/store";

it("creates and retrieves note", () => {
  const note = createNote({ title: "Test", content: "Content", createdAt: new Date(), updatedAt: new Date() });
  const found = getNoteById(note.id);
  expect(found).toBeDefined();
});
```
