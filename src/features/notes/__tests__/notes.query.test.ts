import { describe, it, expect, beforeEach } from "vitest";
import { getAllNotesQuery, getNoteByIdQuery } from "@/features/notes/queries/notes.query";
import { createNote, getAllNotes, deleteNote } from "@/features/notes/lib/store";
import type { Note } from "@/features/notes/types";

describe("notes.query", () => {
  beforeEach(() => {
    // Clear the store by deleting all existing notes
    const existing = getAllNotes();
    existing.forEach((note: Note) => deleteNote(note.id));
  });

  it("returns all notes sorted by createdAt desc", async () => {
    createNote({ title: "First", content: "A" });
    // Small delay to ensure different timestamps
    await new Promise((r) => setTimeout(r, 10));
    createNote({ title: "Second", content: "B" });

    const result = await getAllNotesQuery();

    expect(result).toHaveLength(2);
    expect(result[0].title).toBe("Second");
  });

  it("returns note by id", async () => {
    const note = createNote({ title: "Test", content: "Content" });
    const result = await getNoteByIdQuery(note.id);

    expect(result).toBeDefined();
    expect(result?.title).toBe("Test");
  });

  it("returns undefined for non-existent id", async () => {
    const result = await getNoteByIdQuery("non-existent");
    expect(result).toBeUndefined();
  });
});
