// src/app/page.tsx

import s from "./Home.module.css";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PromoCard } from "@/components/ui/promo/PromoCard";
import { NewsCard } from "@/components/ui/news/NewsCard";
import type { News } from "../types/contents";

export const dynamic = "force-dynamic"; // чтобы всегда видеть свежие данные

type PromoFromApi = {
  id: string;
  title: string;
  excerpt: string | null;
  coverUrl: string | null;
  publishedAt?: string;
};


export default async function Home() {
  // Берём акции с API
  let promos: PromoFromApi[] = [];
  try {
    const res = await fetch("/api/promos", {
      cache: "no-store",
    });
    if (res.ok) {
      promos = await res.json();
    }
  } catch {
    promos = [];
  }

  // Берём новости с API
  let news: News[] = [];
  try {
    const newsRes = await fetch("/api/news", {
      cache: "no-store",
    });
    if (newsRes.ok) {
      news = await newsRes.json();
    }
  } catch {
    news = [];
  }

  return (
    <div className={s.wrapper}>
      <header className={s.Header}>
        <div className="flex space-x-4">
          <Button variant="default" className={s.Button}>Check</Button>
          <Button variant="outline" asChild>
            <a href="/test-upload">Тест загрузки</a>
          </Button>
        </div>
      </header>

      <div>
        main content

        {/* Новости */}
        <section className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">Новости</h2>

            {news.length === 0 ? (
              <p className="text-muted-foreground italic">Пока нет новостей</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((n) => (
                  <NewsCard
                    key={n.id}
                    title={n.title}
                    excerpt={n.excerpt ?? undefined}
                    coverUrl={n.coverUrl ?? undefined}
                    publishedAt={n.publishedAt}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Акции из API */}
        <section className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">Акции</h2>

            {promos.length === 0 ? (
              <p className="text-muted-foreground italic">Пока нет активных акций</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {promos.map((p, i) => (
                  <PromoCard
                    key={p.id}
                    id={p.id}
                    title={p.title}
                    excerpt={p.excerpt ?? undefined}     // null -> undefined для пропсов
                    coverUrl={p.coverUrl ?? undefined}   // null -> undefined
                    highlight={i === 0}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      <footer>footer</footer>

      {/* Пример тарифов через Card */}
      <div className={s.cardwrap}>
        <Card className={s.Card}>
          <CardHeader><CardTitle>Час</CardTitle></CardHeader>
          <CardContent><p>200₽</p></CardContent>
        </Card>

        <Card className={s.Card}>
          <CardHeader><CardTitle>Ночь</CardTitle></CardHeader>
          <CardContent><p>500₽</p></CardContent>
        </Card>

        <Card className={s.Card}>
          <CardHeader><CardTitle>VIP</CardTitle></CardHeader>
          <CardContent><p>300₽</p></CardContent>
        </Card>
      </div>
    </div>
  );
}
