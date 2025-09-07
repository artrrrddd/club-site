import s from "./Home.module.css";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PromoCard } from "@/components/ui/promo/PromoCard";
import { NewsCard } from "@/components/ui/news/NewsCard";
import type { News } from "../types/contents";
import LeftVectorBg from "../../public/designComponents/LeftVector.svg";
import Image from "next/image";
import topVector from '../../public/designComponents/topVector.svg';
import RightVectorBg from '../../public/designComponents/RightVector.svg';
import { TracingBeamDemo } from "@/components/TracingBeamDemo";



export const dynamic = "force-dynamic";

type PromoFromApi = {
  id: string;
  title: string;
  excerpt: string | null;
  coverUrl: string | null;
  publishedAt?: string;
};

export default async function Home() {
  // Получаем акции с API
  let promos: PromoFromApi[] = [];
  try {
    const res = await fetch("/api/promos", { cache: "no-store" });
    if (res.ok) {
      promos = await res.json();
    }
  } catch {
    promos = [];
  }

  // Получаем новости с API
  let news: News[] = [];
  try {
    const newsRes = await fetch("/api/news", { cache: "no-store" });
    if (newsRes.ok) {
      news = await newsRes.json();
    }
  } catch {
    news = [];
  }

  return (
    <div className="relative isolate min-h-dvh">
      {/* Фон – отдельный слой с отрицательным z-index. Добавляем оба SVG. */}
      <div className={`${s.bg} absolute inset-0 -z-10 pointer-events-none`}>
        <div>
          <Image src={topVector} className={s.firstVector} alt="" />
          <Image src={RightVectorBg} alt="" className={s.rightVector} />
        </div>
        <Image src={LeftVectorBg} alt="" className={s.leftSvg} />
      </div>

      {/* Основной контент – положительный z-index */}
      <div className={`${s.wrapper} relative z-10`}>
        <header className={s.Header}>
          <div className="flex space-x-4">
            
          </div>
        </header>

        {/* Hero-секция */}
        <section className="py-12 md:py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Добро пожаловать в наш клуб
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Откройте для себя мир возможностей и станьте частью нашего сообщества
          </p>
          <Button size="lg" className="bg-red-600 hover:bg-red-700">
            Присоединиться
          </Button>
        </section>

        {/* TracingBeam Demo секция */}
        <section className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">Наши достижения</h2>
            <TracingBeamDemo />
          </div>
        </section>

        {/* Новости */}
        <section className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">Новости</h2>
            {news.length === 0 ? (
              <p className="text-muted-foreground italic">Пока нет новостей</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map(n => (
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

        {/* Акции */}
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
                    excerpt={p.excerpt ?? undefined}
                    coverUrl={p.coverUrl ?? undefined}
                    highlight={i === 0}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Тарифы */}
        <section className={s.cardwrap}>
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
        </section>

        {/* Подвал */}
        <footer className="py-8 text-center">footer</footer>
      </div>
    </div>
  );
}
