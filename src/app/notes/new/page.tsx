import Link from "next/link";
import { NoteForm } from "@/features/notes/components/NoteForm";

export default function NewNotePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link href="/notes" className="text-sm text-muted-foreground hover:text-foreground">
          &larr; Kembali
        </Link>
        <h1 className="mt-2 text-2xl font-bold">Buat Catatan Baru</h1>
      </div>
      <NoteForm />
    </div>
  );
}
