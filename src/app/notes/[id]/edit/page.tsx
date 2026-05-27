import Link from "next/link";
import { notFound } from "next/navigation";
import { getNoteByIdQuery } from "@/features/notes/queries/notes.query";
import { updateNoteAction } from "@/features/notes/actions/notes.action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Suspense } from "react";

interface NotePageParams {
  id: string;
}

interface PageProps {
  params: Promise<NotePageParams>;
}

async function EditForm({ id }: { id: string }) {
  const note = await getNoteByIdQuery(id);
  if (!note) notFound();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Catatan</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          action={async (formData: FormData) => {
            "use server";
            const title = formData.get("title") as string;
            const content = formData.get("content") as string;
            await updateNoteAction(id, { title, content });
          }}
          className="space-y-4"
        >
          <Input
            id="title"
            name="title"
            defaultValue={note.title}
            placeholder="Judul catatan"
          />
          <div>
            <label htmlFor="content" className="mb-1 block text-sm font-medium">
              Konten
            </label>
            <textarea
              id="content"
              name="content"
              rows={6}
              defaultValue={note.content}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit">Simpan</Button>
            <Button variant="ghost" type="button" asChild>
              <Link href={`/notes/${id}`}>Batal</Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default async function EditNotePage({ params }: PageProps) {
  const resolved = await params;
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <Suspense fallback={<p>Memuat...</p>}>
        <EditForm id={resolved.id} />
      </Suspense>
    </div>
  );
}
