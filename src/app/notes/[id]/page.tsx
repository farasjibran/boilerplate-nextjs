import Link from "next/link";
import { notFound } from "next/navigation";
import { getNoteByIdQuery } from "@/features/notes/queries/notes.query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/ui/error-state";
import { Suspense } from "react";

async function NoteDetail({ id }: { id: string }) {
  try {
    const note = await getNoteByIdQuery(id);
    if (!note) notFound();

    return (
      <Card>
        <CardHeader>
          <CardTitle>{note.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap text-sm">{note.content}</p>
          <div className="mt-4 flex gap-2 text-xs text-muted-foreground">
            <span>Dibuat: {note.createdAt.toLocaleDateString("id-ID")}</span>
            <span>&middot;</span>
            <span>Diperbarui: {note.updatedAt.toLocaleDateString("id-ID")}</span>
          </div>
          <div className="mt-6 flex gap-2">
            <Button variant="secondary" asChild>
              <Link href={`/notes/${id}/edit`}>Edit</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/notes">Kembali</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  } catch {
    return (
      <ErrorState
        title="Gagal memuat catatan"
        message="Terjadi kesalahan saat mengambil data."
      />
    );
  }
}

interface Params {
  id: string;
}

export default async function NoteDetailPage({ params }: { params: Promise<Params> }) {
  const resolved = await params;
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Suspense fallback={<p>Memuat...</p>}>
        <NoteDetail id={resolved.id} />
      </Suspense>
    </div>
  );
}
