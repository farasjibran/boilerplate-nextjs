"use server";

import { revalidatePath } from "next/cache";
import { createNoteSchema, updateNoteSchema, type CreateNoteInput, type UpdateNoteInput } from "@/features/notes/schemas/note.schema";
import { createNote, updateNote, deleteNote } from "@/features/notes/lib/store";
import { NotFoundError, ValidationError } from "@/lib/errors";

interface ActionResult {
  success: boolean;
  message: string;
  id?: string;
}

export async function createNoteAction(input: CreateNoteInput): Promise<ActionResult> {
  const result = createNoteSchema.safeParse(input);
  if (!result.success) {
    throw new ValidationError(result.error.errors[0].message);
  }

  const note = createNote({ title: result.data.title, content: result.data.content });
  revalidatePath("/notes");
  return { success: true, message: "Catatan berhasil dibuat", id: note.id };
}

export async function updateNoteAction(id: string, input: UpdateNoteInput): Promise<ActionResult> {
  const result = updateNoteSchema.safeParse(input);
  if (!result.success) {
    throw new ValidationError(result.error.errors[0].message);
  }

  const updated = updateNote(id, { title: result.data.title, content: result.data.content });
  if (!updated) {
    throw new NotFoundError("Catatan tidak ditemukan");
  }

  revalidatePath(`/notes/${id}`);
  revalidatePath("/notes");
  return { success: true, message: "Catatan berhasil diperbarui" };
}

export async function deleteNoteAction(id: string): Promise<ActionResult> {
  const deleted = deleteNote(id);
  if (!deleted) {
    throw new NotFoundError("Catatan tidak ditemukan");
  }

  revalidatePath("/notes");
  return { success: true, message: "Catatan berhasil dihapus" };
}
