import Link from "next/link";
import { notFound } from "next/navigation";
import { readFile, readdir } from "fs/promises";
import path from "path";
import ReactMarkdown from "react-markdown";
import { Suspense } from "react";

const docMetadata: Record<string, { title: string; description: string }> = {
  architecture: { title: "Arsitektur", description: "Layer diagram, request flow, data flow, feature boundaries" },
  conventions: { title: "Konvensi", description: "Naming, server/client rules, error patterns, state strategy, auth" },
  testing: { title: "Testing", description: "Test strategy, priority, naming, commands, utilities" },
  "feature-template": { title: "Template Fitur", description: "Folder structure, required files, implementation patterns" },
  generator: { title: "Generator CLI", description: "Scaffold fitur baru, presets, fields, usage examples" },
};

async function getDocFiles(): Promise<string[]> {
  const docsDir = path.join(process.cwd(), "docs");
  const files = await readdir(docsDir);
  return files.filter((f: string) => f.endsWith(".md")).map((f: string) => f.replace(".md", ""));
}

async function getDocContent(slug: string): Promise<string | null> {
  try {
    const filePath = path.join(process.cwd(), "docs", `${slug}.md`);
    return await readFile(filePath, "utf8");
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const slugs = await getDocFiles();
  return slugs.map((slug: string) => ({ slug }));
}

async function DocContent({ slug }: { slug: string }) {
  const content = await getDocContent(slug);
  if (!content) notFound();

  const meta = docMetadata[slug] || {
    title: slug.replace(/[-_]/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()),
    description: "",
  };

  return (
    <article className="prose prose-sm max-w-none dark:prose-invert">
      <h1>{meta.title}</h1>
      {meta.description && <p className="text-muted-foreground">{meta.description}</p>}
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground">
        &larr; Kembali ke Dokumentasi
      </Link>
      <Suspense fallback={<p className="mt-4 text-muted-foreground">Memuat...</p>}>
        <DocContent slug={slug} />
      </Suspense>
    </div>
  );
}
