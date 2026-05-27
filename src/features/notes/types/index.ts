export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NoteCreateInput {
  title: string;
  content: string;
}

export interface NoteUpdateInput {
  title: string;
  content: string;
}
