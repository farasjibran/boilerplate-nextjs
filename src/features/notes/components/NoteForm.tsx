"use client";

import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createNoteSchema, type CreateNoteInput } from "@/features/notes/schemas/note.schema";
import { createNoteAction } from "@/features/notes/actions/notes.action";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ActionResult {
  success: boolean;
  message: string;
  id?: string;
}

const initialState: ActionResult = { success: false, message: "", id: undefined };

export function NoteForm() {
  const [state, formAction, isPending] = useActionState(
    async (_state: ActionResult, formData: FormData) => {
      const title = formData.get("title") as string;
      const content = formData.get("content") as string;
      return createNoteAction({ title, content });
    },
    initialState,
  );

  const {
    register,
    formState: { errors },
  } = useForm<CreateNoteInput>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: { title: "", content: "" },
  });

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium">
          Judul
        </label>
        <Input id="title" {...register("title")} error={errors.title?.message} />
      </div>
      <div>
        <label htmlFor="content" className="mb-1 block text-sm font-medium">
          Konten
        </label>
        <textarea
          id="content"
          rows={6}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          {...register("content")}
        />
        {errors.content && (
          <p className="mt-1 text-xs text-destructive" role="alert">
            {errors.content.message}
          </p>
        )}
      </div>
      {state?.message && (
        <p className={`text-sm ${state.success ? "text-green-600" : "text-destructive"}`}>
          {state.message}
        </p>
      )}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Menyimpan..." : "Simpan"}
      </Button>
    </form>
  );
}
