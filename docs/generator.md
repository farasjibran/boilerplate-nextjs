# Feature Generator

CLI tool untuk scaffold fitur baru mengikuti pola boilerplate.

## Usage

```bash
node bin/generate-feature.js <name> [options]
# atau
npm run generate <name> [options]
```

## Options

| Option | Value | Default | Deskripsi |
|--------|-------|---------|-----------|
| `--preset` | `crud`, `simple`, `protected` | `crud` | Template preset |
| `--fields` | `"name:type name2:type2"` | `title:string content:text` | Field kustom |

## Presets

### crud (default)
Full CRUD: types, schema, store, queries, actions, components, routes (list/new/detail/edit), tests.

```bash
node bin/generate-feature.js tasks
```

### simple
CRUD tanpa auth — cocok untuk halaman statis atau data publik.

```bash
node bin/generate-feature.js faqs --preset simple
```

### protected
CRUD dengan auth — setiap item punya `userId`, action cek session.

```bash
node bin/generate-feature.js bookmarks --preset protected
```

## Fields

Format: `nama:tipe`

Tipe yang didukung: `string`, `number`, `boolean`

```bash
node bin/generate-feature.js projects --fields "name:string budget:number active:boolean"
```

## Generated Structure

```
src/features/<name>/
  types/index.ts              # TypeScript types
  schemas/<name>.schema.ts    # Zod validation
  lib/store.ts                # In-memory store (ganti Prisma di production)
  queries/<name>.query.ts     # Read operations
  actions/<name>.action.ts    # Server actions (mutations)
  components/                 # Feature UI components
  __tests__/                  # Test files

src/app/<name>/               # Route pages
  page.tsx                    # List
  new/page.tsx                # Create form
  [id]/page.tsx               # Detail
  [id]/edit/page.tsx          # Edit form
```

## Setelah Generate

1. `npm run typecheck` — pastikan tidak ada error
2. `npm run lint` — pastikan tidak ada warning
3. `npm run test` — pastikan test pass
4. Tambah link navigasi di layout/sidebar
5. Ganti in-memory store dengan Prisma queries (Phase 2+)
