import { z } from "zod";

export const CreatePostSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1),
});
