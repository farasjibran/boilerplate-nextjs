import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Suspense } from "react";
import { readdir } from "fs/promises";
import path from "path";

interface DocFile {
  name: string;
  title: string;
  slug: string;
  description: string;
}

const docMetadata: Record<string, { title: string; description: string }> = {
  architecture: { title: "Arsitektur", description: "Layer diagram, request flow, data flow, feature boundaries" },
  conventions: { title: "Konvensi", description: "Naming, server/client rules, error patterns, state strategy, auth" },
  testing: { title: "Testing", description: "Test strategy, priority, naming, commands, utilities" },
  "feature-template": { title: "Template Fitur", description: "Folder structure, required files, implementation patterns" },
  generator: { title: "Generator CLI", description: "Scaffold fitur baru, presets, fields, usage examples" },
};

async function getDocFiles(): Promise<DocFile[]> {
  try {
    const docsDir = path.join(process.cwd(), "docs");
    const files = await readdir(docsDir);
    const mdFiles = files.filter((f: string) => f.endsWith(".md"));

    return mdFiles
      .map((file: string) => {
        const slug = file.replace(".md", "");
        const meta = docMetadata[slug] || {
          title: slug.replace(/[-_]/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()),
          description: "",
        };
        return { name: file, title: meta.title, slug, description: meta.description };
      })
      .sort((a: DocFile, b: DocFile) => a.title.localeCompare(b.title));
  } catch {
    return [];
  }
}

function DocList({ docs }: { docs: DocFile[] }) {
  if (docs.length === 0) {
    return <EmptyState title="Belum ada dokumentasi" description="Dokumentasi akan ditambahkan nanti." />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {docs.map((doc) => (
        <Card key={doc.slug}>
          <CardHeader>
            <CardTitle className="text-lg">{doc.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {doc.description && (
              <p className="mb-3 text-sm text-muted-foreground">{doc.description}</p>
            )}
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/docs/${doc.slug}`}>Baca</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

async function DocsContent() {
  const docs = await getDocFiles();
  return <DocList docs={docs} />;
}

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
          &larr; Kembali ke Beranda
        </Link>
        <h1 className="mt-2 text-3xl font-bold">Dokumentasi</h1>
        <p className="mt-2 text-muted-foreground">
          Panduan arsitektur, konvensi, testing, dan penggunaan generator.
        </p>
      </div>
      <Suspense fallback={<p className="text-muted-foreground">Memuat dokumentasi...</p>}>
        <DocsContent />
      </Suspense>
    </div>
  );
}
