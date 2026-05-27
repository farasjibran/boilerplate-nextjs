import type { Note } from "@/features/notes/types";

/**
 * In-memory store for demonstration purposes.
 * Replace with database in Phase 2.
 */
const notes = new Map<string, Note>();

export function createNote(note: Omit<Note, "id" | "createdAt" | "updatedAt">): Note {
  const now = new Date();
  const entry: Note = {
    ...note,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };
  notes.set(entry.id, entry);
  return entry;
}

export function getAllNotes(): Note[] {
  return Array.from(notes.values()).sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  );
}

export function getNoteById(id: string): Note | undefined {
  return notes.get(id);
}

export function updateNote(id: string, data: { title: string; content: string }): Note | undefined {
  const existing = notes.get(id);
  if (!existing) return undefined;
  const updated = { ...existing, ...data, updatedAt: new Date() };
  notes.set(id, updated);
  return updated;
}

export function deleteNote(id: string): boolean {
  return notes.delete(id);
}
