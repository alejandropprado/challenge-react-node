import { z } from "zod";

export const createPostSchema = z.object({
  name: z.string().min(1, "El nombre es requerido").max(255),
  description: z.string().min(1, "La descripción es requerida"),
});

export type CreatePostForm = z.infer<typeof createPostSchema>;
