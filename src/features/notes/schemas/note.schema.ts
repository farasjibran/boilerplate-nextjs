import { z } from "zod";

export const createNoteSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi").max(100, "Judul maksimal 100 karakter"),
  content: z.string().min(1, "Konten wajib diisi").max(5000, "Konten maksimal 5000 karakter"),
});

export const updateNoteSchema = createNoteSchema;

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>;
