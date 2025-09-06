import { z } from "zod";

export const promoSchema = z.object({
  title: z.string().min(3, "Минимум 3 символа"),
  excerpt: z.string().max(200, "До 200 символов").optional(),
  coverUrl: z.string().url("Должен быть URL").optional().or(z.literal("")),
});

export type PromoFormValues = z.infer<typeof promoSchema>;
// Отдельная схема именно для POST /api/promos
export const promoCreateSchema = promoSchema;
export type PromoCreate = z.infer<typeof promoCreateSchema>;