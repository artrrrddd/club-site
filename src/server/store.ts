// src/server/store.ts
import "server-only";

// Тип записи акции
export type PromoRecord = {
  id: string;
  title: string;
  excerpt?: string;
  coverUrl?: string;
  publishedAt?: string; // ISO
};

// Память процесса (сбросится при перезапуске dev-сервера)
const db: { promos: PromoRecord[] } = { promos: [] };

// ←←← ВАЖНО: именно named exports (export function ...)
export function listPromos(): PromoRecord[] {
  return [...db.promos].sort((a, b) =>
    (b.publishedAt || "").localeCompare(a.publishedAt || "")
  );
}

export function createPromo(input: { title: string; excerpt?: string; coverUrl?: string }): PromoRecord {
  const rec: PromoRecord = {
    id: crypto.randomUUID(),
    title: input.title,
    excerpt: input.excerpt || "",
    coverUrl: input.coverUrl || "",
    publishedAt: new Date().toISOString(),
  };
  db.promos.push(rec);
  return rec;
}
