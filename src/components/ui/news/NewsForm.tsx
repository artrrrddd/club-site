"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsSchema, type NewsFormValues } from "@/validation/news";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/ImageUpload";

export function NewsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<NewsFormValues>({
    resolver: zodResolver(newsSchema),
    defaultValues: { title: "", excerpt: "", coverUrl: "" },
    mode: "onBlur",
  });

  const coverUrl = watch("coverUrl");

  const onSubmit = async (values: NewsFormValues) => {
    const res = await fetch("/api/news", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert("Ошибка сохранения: " + (err?.error || res.status));
      return;
    }

    const created = await res.json();
    alert("Сохранено: " + created.title);
    reset();
    // Редирект на страницу управления новостями
    window.location.href = "/admin/news";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 max-w-xl">
      <div>
        <label htmlFor="title" className="block text-sm font-medium">Заголовок *</label>
        <input
          id="title"
          className="mt-1 w-full rounded-md border px-3 py-2"
          placeholder="Мы открылись!"
          aria-invalid={!!errors.title || undefined}
          {...register("title")}
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium">Краткое описание (до 200)</label>
        <textarea
          id="excerpt"
          className="mt-1 w-full rounded-md border px-3 py-2"
          rows={3}
          placeholder="Новый зал и 20 мощных ПК"
          aria-invalid={!!errors.excerpt || undefined}
          {...register("excerpt")}
        />
        {errors.excerpt && <p className="mt-1 text-sm text-red-600">{errors.excerpt.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Изображение</label>
        <ImageUpload
          value={coverUrl}
          onChange={(url) => setValue("coverUrl", url)}
        />
        {errors.coverUrl && <p className="mt-1 text-sm text-red-600">{errors.coverUrl.message}</p>}
        <p className="mt-1 text-xs text-muted-foreground">Можно оставить пустым.</p>
      </div>

      <div className="pt-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Сохраняю..." : "Сохранить"}
        </Button>
      </div>
    </form>
  );
}
