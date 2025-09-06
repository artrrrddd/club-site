import { z } from "zod";

export const newsSchema = z.object({
  title: z.string().min(3, "Минимум 3 символа"),
  excerpt: z.string().max(200).optional(),
  coverUrl: z.string().url("Должен быть URL").optional().or(z.literal("")),
});

export type NewsFormValues = z.infer<typeof newsSchema>;
