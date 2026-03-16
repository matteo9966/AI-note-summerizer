import { z } from "zod";

// Schema for a full Note (as stored in DB / returned)
export const NoteSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  content: z.string(),
  createdAt: z.string().or(z.instanceof(Date))
});

// Schema for note creation payload (received from client)
export const NoteCreateSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1)
});

export type Note = z.infer<typeof NoteSchema>;
export type NoteCreate = z.infer<typeof NoteCreateSchema>;

export { z };
