import { z } from "zod";

// Schema for a full Note (as stored in DB / returned)
export const NoteSchema = z.object({
  id: z.number().int(),
  s3Key: z.string(),
  title: z.string(),
  summary: z.string(),
  createdAt: z.string().or(z.instanceof(Date)),
  updatedAt: z.string().or(z.instanceof(Date))
});

// Schema for note creation payload (received from client)
export const NoteCreateSchema = z.object({
  title: z.string().min(1),
  s3Key: z.string().min(1),
  // summary is optional on create; defaults to empty string in DB
  summary: z.string().optional()
});

export type Note = z.infer<typeof NoteSchema>;
export type NoteCreate = z.infer<typeof NoteCreateSchema>;

export { z };
