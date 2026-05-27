#!/usr/bin/env node

/**
 * Feature generator for boilerplate-nextjs
 * Usage: node bin/generate-feature.js <name> [options]
 * Options:
 *   --preset crud|simple|protected   Default: crud
 *   --fields "field1:type1 field2:type2"
 */

const fs = require("fs");
const path = require("path");

// ── Argument parsing ──
const args = process.argv.slice(2);
const name = args.find((a) => !a.startsWith("--"));
if (!name) {
  console.log("Usage: node bin/generate-feature.js <name> [options]");
  console.log("Options:");
  console.log("  --preset crud|simple|protected   Default: crud");
  console.log('  --fields "field1:type1 field2:type2"');
  process.exit(1);
}

const preset = args.includes("--preset")
  ? args[args.indexOf("--preset") + 1]
  : "crud";
const fieldsRaw = args.includes("--fields")
  ? args[args.indexOf("--fields") + 1]
  : "";

// ── Helpers ──
const pascal = (s) => s.replace(/[-_](\w)/g, (_, c) => c.toUpperCase()).replace(/^\w/, (c) => c.toUpperCase());
const camel = (s) => {
  const p = pascal(s);
  return p.replace(/^\w/, (c) => c.toLowerCase());
};
const plural = (s) => s.endsWith("s") ? s : s + "s";

const Entity = pascal(name);
const entity = camel(name);
const entities = plural(camel(name));
const featureDir = path.join("src", "features", name);
const appDir = path.join("src", "app", entities);

function write(filePath, content) {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`  Created: ${filePath}`);
}

// ── Parse fields ──
const defaultFields = {
  crud: ["title:string", "content:text"],
  simple: ["title:string", "content:text"],
  protected: ["title:string", "content:text"],
};

const fields = fieldsRaw
  ? fieldsRaw.split(" ").map((f) => {
      const [n, t] = f.split(":");
      return { name: n, type: t || "string" };
    })
  : (defaultFields[preset] || defaultFields.crud).map((f) => {
      const [n, t] = f.split(":");
      return { name: n, type: t };
    });

// For protected preset, prepend userId
if (preset === "protected") {
  fields.unshift({ name: "userId", type: "string" });
}

// ── Templates ──
const typesTmpl = (Entity, entity) => `export interface ${Entity} {
  id: string;
${fields.map((f) => `  ${f.name}: ${f.type === "string" ? "string" : f.type === "number" ? "number" : f.type === "boolean" ? "boolean" : "string"};`).join("\n")}
  createdAt: Date;
  updatedAt: Date;
}

export interface ${Entity}CreateInput {
${fields.map((f) => `  ${f.name}: ${f.type === "number" ? "number" : f.type === "boolean" ? "boolean" : "string"};`).join("\n")}
}

export interface ${Entity}UpdateInput {
${fields.map((f) => `  ${f.name}: ${f.type === "number" ? "number" : f.type === "boolean" ? "boolean" : "string"};`).join("\n")}
}
`;

const schemaTmpl = (Entity, entity, fields) => {
  const schemaFields = fields
    .map((f) => {
      if (f.name === "createdAt" || f.name === "updatedAt" || f.name === "id") return null;
      const req = `z.string().min(1, "${pascal(f.name)} wajib diisi")`;
      return `  ${f.name}: ${f.type === "number" ? "z.coerce.number()" : f.type === "boolean" ? "z.boolean()" : req},`;
    })
    .filter(Boolean)
    .join("\n");

  return `import { z } from "zod";

export const create${Entity}Schema = z.object({
${schemaFields}
});

export const update${Entity}Schema = create${Entity}Schema;

export type Create${Entity}Input = z.infer<typeof create${Entity}Schema>;
export type Update${Entity}Input = z.infer<typeof update${Entity}Schema>;
`;
};

const storeTmpl = (Entity, entity, fields) => `import type { ${Entity} } from "@/features/${entity}/types";

/**
 * In-memory store for demonstration.
 * Replace with Prisma queries in production.
 */
const items = new Map<string, ${Entity}>();

export function create${Entity}(item: Omit<${Entity}, "id" | "createdAt" | "updatedAt">): ${Entity} {
  const now = new Date();
  const entry: ${Entity} = {
    ...item,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };
  items.set(entry.id, entry);
  return entry;
}

export function getAll${Entity}s(): ${Entity}[] {
  return Array.from(items.values()).sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  );
}

export function get${Entity}ById(id: string): ${Entity} | undefined {
  return items.get(id);
}

export function update${Entity}(id: string, data: Partial<${Entity}>): ${Entity} | undefined {
  const existing = items.get(id);
  if (!existing) return undefined;
  const updated = { ...existing, ...data, updatedAt: new Date() };
  items.set(id, updated);
  return updated;
}

export function delete${Entity}(id: string): boolean {
  return items.delete(id);
}
`;

const queryTmpl = (Entity, entity) => `import { getAll${Entity}s, get${Entity}ById } from "@/features/${entity}/lib/store";
import type { ${Entity} } from "@/features/${entity}/types";

export async function getAll${Entity}sQuery(): Promise<${Entity}[]> {
  await new Promise((r) => setTimeout(r, 50));
  return getAll${Entity}s();
}

export async function get${Entity}ByIdQuery(id: string): Promise<${Entity} | undefined> {
  await new Promise((r) => setTimeout(r, 50));
  return get${Entity}ById(id);
}
`;

const actionTmpl = (Entity, entity, preset) => {
  const authCheck = preset === "protected"
    ? `\n  const session = await auth();\n  if (!session) throw new UnauthorizedError();\n`
    : "";

  return `"use server";

import { revalidatePath } from "next/cache";${preset === "protected" ? `\nimport { auth } from "@/lib/auth";` : ""}
import { create${Entity}Schema, update${Entity}Schema, type Create${Entity}Input, type Update${Entity}Input } from "@/features/${entity}/schemas/${entity}.schema";
import { create${Entity}, update${Entity}, delete${Entity} } from "@/features/${entity}/lib/store";
import { NotFoundError, ValidationError${preset === "protected" ? ", UnauthorizedError" : ""} } from "@/lib/errors";${authCheck}
interface ActionResult {
  success: boolean;
  message: string;
  id?: string;
}

export async function create${Entity}Action(input: Create${Entity}Input): Promise<ActionResult> {
  const result = create${Entity}Schema.safeParse(input);
  if (!result.success) {
    throw new ValidationError(result.error.errors[0].message);
  }
  const item = create${Entity}({ ...result.data, createdAt: new Date(), updatedAt: new Date() } as any);
  revalidatePath("/${entities}");
  return { success: true, message: "${Entity} berhasil dibuat", id: item.id };
}

export async function update${Entity}Action(id: string, input: Update${Entity}Input): Promise<ActionResult> {
  const result = update${Entity}Schema.safeParse(input);
  if (!result.success) {
    throw new ValidationError(result.error.errors[0].message);
  }
  const updated = update${Entity}(id, result.data);
  if (!updated) throw new NotFoundError("${Entity} tidak ditemukan");
  revalidatePath("/${entities}/\${id}");
  revalidatePath("/${entities}");
  return { success: true, message: "${Entity} berhasil diperbarui" };
}

export async function delete${Entity}Action(id: string): Promise<ActionResult> {
  const deleted = delete${Entity}(id);
  if (!deleted) throw new NotFoundError("${Entity} tidak ditemukan");
  revalidatePath("/${entities}");
  return { success: true, message: "${Entity} berhasil dihapus" };
}
`;
};

const pageListTmpl = (Entity, entity, entities) => `import Link from "next/link";
import { getAll${Entity}sQuery } from "@/features/${entity}/queries/${entity}.query";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { Suspense } from "react";

async function Content() {
  try {
    const items = await getAll${Entity}sQuery();
    if (items.length === 0) {
      return (
        <EmptyState
          title="Belum ada ${entity}"
          description="Buat ${entity} pertama Anda."
          action={{ label: "Buat Baru", href: "/${entities}/new" }}
        />
      );
    }
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-lg border p-4">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{item.content || ""}</p>
            <Button variant="ghost" size="sm" className="mt-3" asChild>
              <Link href="/${entities}/{item.id}">Lihat Detail</Link>
            </Button>
          </div>
        ))}
      </div>
    );
  } catch {
    return <ErrorState title="Gagal memuat" message="Terjadi kesalahan." />;
  }
}

export default function ${Entity}Page() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">${Entity}</h1>
        <Button asChild>
          <Link href="/${entities}/new">Buat Baru</Link>
        </Button>
      </div>
      <Suspense fallback={<LoadingState message="Memuat..." />}>
        <Content />
      </Suspense>
    </div>
  );
}
`;

const pageNewTmpl = (Entity, entity, entities) => `"use client";

import Link from "next/link";
import { useActionState } from "react";
import { create${Entity}Action } from "@/features/${entity}/actions/${entity}.action";
import { create${Entity}Schema, type Create${Entity}Input } from "@/features/${entity}/schemas/${entity}.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function New${Entity}Page() {
  const [state, formAction, isPending] = useActionState(create${Entity}Action, { success: false, message: "" });
  const { register, formState: { errors } } = useForm<Create${Entity}Input>({
    resolver: zodResolver(create${Entity}Schema),
    defaultValues: { title: "", content: "" },
  });

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/${entities}" className="text-sm text-muted-foreground hover:text-foreground">&larr; Kembali</Link>
      <h1 className="mt-2 text-2xl font-bold">Buat ${Entity} Baru</h1>
      <form action={formAction} className="mt-6 space-y-4">
        <div>
          <label htmlFor="title" className="mb-1 block text-sm font-medium">Judul</label>
          <Input id="title" {...register("title")} error={errors.title?.message} />
        </div>
        <div>
          <label htmlFor="content" className="mb-1 block text-sm font-medium">Konten</label>
          <textarea id="content" rows={6} className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm" {...register("content")} />
          {errors.content && <p className="mt-1 text-xs text-destructive">{errors.content.message}</p>}
        </div>
        {state?.message && <p className={\`text-sm \${state.success ? "text-green-600" : "text-destructive"}\`}>{state.message}</p>}
        <Button type="submit" disabled={isPending}>{isPending ? "Menyimpan..." : "Simpan"}</Button>
      </form>
    </div>
  );
}
`;

const pageDetailTmpl = (Entity, entity, entities) => `import Link from "next/link";
import { notFound } from "next/navigation";
import { get${Entity}ByIdQuery } from "@/features/${entity}/queries/${entity}.query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

async function Detail({ id }: { id: string }) {
  const item = await get${Entity}ByIdQuery(id);
  if (!item) notFound();
  return (
    <Card>
      <CardHeader><CardTitle>{item.title}</CardTitle></CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap text-sm">{item.content || ""}</p>
        <div className="mt-4 flex gap-2">
          <Button variant="secondary" asChild><Link href="/${entities}/{id}/edit">Edit</Link></Button>
          <Button variant="ghost" asChild><Link href="/${entities}">Kembali</Link></Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default async function ${Entity}DetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Suspense fallback={<p>Memuat...</p>}>
        <Detail id={id} />
      </Suspense>
    </div>
  );
}
`;

const pageEditTmpl = (Entity, entity, entities) => `import Link from "next/link";
import { notFound } from "next/navigation";
import { get${Entity}ByIdQuery } from "@/features/${entity}/queries/${entity}.query";
import { update${Entity}Action } from "@/features/${entity}/actions/${entity}.action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Suspense } from "react";

async function EditForm({ id }: { id: string }) {
  const item = await get${Entity}ByIdQuery(id);
  if (!item) notFound();
  return (
    <Card>
      <CardHeader><CardTitle>Edit ${Entity}</CardTitle></CardHeader>
      <CardContent>
        <form action={async (fd: FormData) => {
          "use server";
          await update${Entity}Action(id, { title: fd.get("title") as string, content: fd.get("content") as string });
        }} className="space-y-4">
          <Input id="title" name="title" defaultValue={item.title} />
          <div>
            <label htmlFor="content" className="mb-1 block text-sm font-medium">Konten</label>
            <textarea id="content" name="content" rows={6} defaultValue={item.content || ""} className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          </div>
          <div className="flex gap-2">
            <Button type="submit">Simpan</Button>
            <Button variant="ghost" asChild><Link href="/${entities}/{id}">Batal</Link></Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default async function Edit${Entity}Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <Suspense fallback={<p>Memuat...</p>}>
        <EditForm id={id} />
      </Suspense>
    </div>
  );
}
`;

// ── Generate files ──
console.log(`\nGenerating feature: ${Entity} (preset: ${preset})\n`);

write(path.join(featureDir, "types", "index.ts"), typesTmpl(Entity, entity));
write(path.join(featureDir, "schemas", `${entity}.schema.ts`), schemaTmpl(Entity, entity, fields));
write(path.join(featureDir, "lib", "store.ts"), storeTmpl(Entity, entity, fields));
write(path.join(featureDir, "queries", `${entity}.query.ts`), queryTmpl(Entity, entity));
write(path.join(featureDir, "actions", `${entity}.action.ts`), actionTmpl(Entity, entity, preset));
write(path.join(featureDir, "components", ".gitkeep"), "");
write(path.join(featureDir, "__tests__", `${entity}.query.test.ts`), `import { describe, it, expect, beforeEach } from "vitest";
import { getAll${Entity}sQuery, get${Entity}ByIdQuery } from "@/features/${entity}/queries/${entity}.query";
import { create${Entity}, getAll${Entity}s, delete${Entity} } from "@/features/${entity}/lib/store";
import type { ${Entity} } from "@/features/${entity}/types";

describe("${entity}.query", () => {
  beforeEach(() => {
    getAll${Entity}s().forEach((item: ${Entity}) => delete${Entity}(item.id));
  });

  it("returns all items sorted by createdAt desc", async () => {
    create${Entity}({ title: "First", content: "A", createdAt: new Date(), updatedAt: new Date() } as any);
    create${Entity}({ title: "Second", content: "B", createdAt: new Date(), updatedAt: new Date() } as any);
    const result = await getAll${Entity}sQuery();
    expect(result).toHaveLength(2);
    expect(result[0].title).toBe("Second");
  });

  it("returns item by id", async () => {
    const item = create${Entity}({ title: "Test", content: "Content", createdAt: new Date(), updatedAt: new Date() } as any);
    const result = await get${Entity}ByIdQuery(item.id);
    expect(result).toBeDefined();
    expect(result?.title).toBe("Test");
  });
});
`);

write(path.join(appDir, "page.tsx"), pageListTmpl(Entity, entity, entities));
write(path.join(appDir, "new", "page.tsx"), pageNewTmpl(Entity, entity, entities));
write(path.join(appDir, "[id]", "page.tsx"), pageDetailTmpl(Entity, entity, entities));
write(path.join(appDir, "[id]", "edit", "page.tsx"), pageEditTmpl(Entity, entity, entities));

console.log(`\n✅ Feature "${Entity}" generated successfully!`);
console.log(`\nNext steps:`);
console.log(`  1. Run: npm run typecheck`);
console.log(`  2. Run: npm run lint`);
console.log(`  3. Run: npm run test`);
console.log(`  4. Add navigation link to /${entities}`);
