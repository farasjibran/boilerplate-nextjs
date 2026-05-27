import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Note } from "@/features/notes/types";

interface NoteListProps {
  notes: Note[];
  emptyAction?: { label: string; href: string };
}

export function NoteList({ notes, emptyAction }: NoteListProps) {
  if (notes.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">Belum ada catatan.</p>
        {emptyAction && (
          <Button variant="secondary" className="mt-4" asChild>
            <Link href={emptyAction.href}>{emptyAction.label}</Link>
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <Card key={note.id}>
          <CardHeader>
            <CardTitle className="text-lg">{note.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-3 text-sm text-muted-foreground line-clamp-3">
              {note.content}
            </p>
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/notes/${note.id}`}>Lihat Detail</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
