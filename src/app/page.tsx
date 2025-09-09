import s from "./Home.module.css";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PromoCard } from "@/components/ui/promo/PromoCard";
import { NewsCard } from "@/components/ui/news/NewsCard";
import type { News } from "../types/contents";
import LeftVectorBg from "../../public/designComponents/LeftVector.svg";
import Image from "next/image";
import topVector from '../../public/designComponents/topVector.svg';
import RightVectorBg from '../../public/designComponents/RightVector.svg';
import { TracingBeamDemo } from "@/components/TracingBeamDemo";
import Elipse from '../../public/designComponents/Ellipse.svg';
import { TitilliumWebSemiBold } from "@/fonts/TitilliumSemiBold";
import PlasmaBackground from "@/components/ui/shadcn-io/plasma-background"



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
    
    <div className={s.okBG}>
    <PlasmaBackground 
        color="#ff6b35"
        speed={1.2}
        direction="forward"
        scale={1.5}
        opacity={0.8}
        mouseInteractive={true}
      />
    </div>
      {/* Фон – отдельный слой с отрицательным z-index. Добавляем оба SVG. */}
          <Image src={topVector} className={s.firstVector} alt="" />
      <div className={`${s.bg} absolute inset-0 -z-10 pointer-events-none`}>
        <div>
          <Image src={RightVectorBg} alt="" className={s.rightVector} />
          <Image src={Elipse} alt="" className={s.elipseRight} />
          <Image src={Elipse} alt="" className={s.elipseLeft} />
          {/*<Image src={Elipse} alt="" className={s.elipseRight} /> */}
        <Image src={LeftVectorBg} alt="" className={s.leftSvg} />
        </div>
      </div>

      {/* Основной контент – положительный z-index */}
      <div className={`${s.wrapper} relative z-999`}>
        <header className={s.Header}>
          <div className="flex space-x-4">
            <h1 className={`${TitilliumWebSemiBold.className} ${s.logotype} text-2xl md:text-3xl font-bold text-white`}>
              комп.здесь
            </h1>
          </div>
        </header>

        {/* Hero-секция */}
        <div className={s.heroWrapper}>
        <h1 className={`${TitilliumWebSemiBold.className} ${s.komp} text-2xl md:text-8xl font-bold text-white`}>
              комп.<span className={`${TitilliumWebSemiBold.className} ${s.zdes} text-2x1 md:text-8xl font-bold`}>
              здесь
            </span>
            </h1>
            <h1 className="font-titillium-regular text-2xl md:text-3xl text-white">
              Принципиально новое киберпространство, созданное для <span className="text-crimson font-bold underline">твоих</span> побед.
            </h1>
        </div>

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
        <footer className="py-8 text-center"><Image src='/designComponents/bgft.png' alt="footer" width={300} height={300} className={s.footBgF}/></footer>
      </div>
    </div>
    
  );
}
