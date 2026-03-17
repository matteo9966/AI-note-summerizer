import { z } from "zod";

export const CreateNoteRequestSchema = z.object({
  title: z.string().min(1),
  file: z.instanceof(File), // This will be the base64-encoded file content
});
