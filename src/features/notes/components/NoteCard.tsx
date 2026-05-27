import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Note } from "@/features/notes/types";
import { deleteNoteAction } from "@/features/notes/actions/notes.action";

interface NoteCardProps {
  note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{note.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground line-clamp-3">
          {note.content}
        </p>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/notes/${note.id}`}>Lihat</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/notes/${note.id}/edit`}>Edit</Link>
          </Button>
          <form
            action={async () => {
              "use server";
              await deleteNoteAction(note.id);
            }}
          >
            <Button variant="destructive" size="sm" type="submit">
              Hapus
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
