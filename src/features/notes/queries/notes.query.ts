import { getAllNotes, getNoteById } from "@/features/notes/lib/store";
import type { Note } from "@/features/notes/types";

export async function getAllNotesQuery(): Promise<Note[]> {
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 50));
  return getAllNotes();
}

export async function getNoteByIdQuery(id: string): Promise<Note | undefined> {
  await new Promise((r) => setTimeout(r, 50));
  return getNoteById(id);
}
