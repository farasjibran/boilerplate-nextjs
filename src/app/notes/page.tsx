import Link from "next/link";
import { getAllNotesQuery } from "@/features/notes/queries/notes.query";
import { NoteList } from "@/features/notes/components/NoteList";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { Suspense } from "react";

async function NotesContent() {
  try {
    const notes = await getAllNotesQuery();

    if (notes.length === 0) {
      return (
        <EmptyState
          title="Belum ada catatan"
          description="Buat catatan pertama Anda."
          action={{ label: "Buat Catatan", href: "/notes/new" }}
        />
      );
    }

    return <NoteList notes={notes} />;
  } catch {
    return (
      <ErrorState
        title="Gagal memuat catatan"
        message="Terjadi kesalahan saat mengambil data."
      />
    );
  }
}

export default function NotesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Catatan</h1>
        <Button asChild>
          <Link href="/notes/new">Buat Baru</Link>
        </Button>
      </div>
      <Suspense fallback={<LoadingState message="Memuat catatan..." />}>
        <NotesContent />
      </Suspense>
    </div>
  );
}
