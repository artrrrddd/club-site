import s from "./Home.module.css";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import LeftVectorBg from "../../public/designComponents/LeftVector.svg";
import Image from "next/image";
import topVector from '../../public/designComponents/topVector.svg';
import RightVectorBg from '../../public/designComponents/RightVector.svg';
import CardsGrid from "../components/landing/CardsGrid";
import { TracingBeam } from "@/components/ui/tracing-beam";
import Elipse from '../../public/designComponents/Ellipse.svg';
import { TitilliumWebSemiBold } from "@/fonts/TitilliumSemiBold";
import { SparklesPreview } from "@/components/SparklesPreview";
import { NewsAndPromos } from "@/components/landing/NewsAndPromos";
import { newsApi, promosApi } from "@/lib/data";
import { TypewriterEffectSmoothDemo } from "@/components/TypewriterEffectSmoothDemo";

export const dynamic = "force-dynamic";


export default async function Home() {
  // Получаем данные напрямую из data.ts (как в админке)
  const news = await newsApi.getAll();
  const promos = await promosApi.getAll();
  
  console.log("Home page - News data:", news);
  console.log("Home page - Promos data:", promos);

  return (
    <div className="relative isolate min-h-dvh overflow-x-hidden">
      {/* Фон – отдельный слой с отрицательным z-index. Добавляем оба SVG. */}
      <div className={s.firstVectorContainer}>
        <Image src={topVector} className={s.firstVector} alt="" />
      </div>
    
    <div className={s.okBG}>
    {/* <ResponsivePlasmaBackground 
        color="#ff6b35"
        speed={1.2}
        direction="forward"
        scale={1.5}
        opacity={0.8}
        mouseInteractive={true}
        /> */}
<div className={s.okBGinner}>
<SparklesPreview />
        <TypewriterEffectSmoothDemo />
</div>
  
    </div>
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
            <h1 className={`${TitilliumWebSemiBold.className} ${s.logotype} text-2x1 md:text-3xl font-bold text-white`}>
              комп.здесь
            </h1>
          </div>
        </header>

        {/* Hero-секция */}
        <div className={s.heroWrapper}>

        </div>

        {/* CardsGrid секция с TracingBeam */}
        <section className="py-12 md:py-16">
          <TracingBeam className="px-6">
            <div className="max-w-6xl mx-auto antialiased pt-4 relative">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">Наши достижения</h2>
              <CardsGrid />
            </div>
          </TracingBeam>
        </section>



        {/* Новости и акции */}
        <NewsAndPromos 
          news={news.map(newsItem => ({
            id: newsItem.id,
            title: newsItem.title,
            excerpt: newsItem.excerpt ?? undefined,
            coverUrl: newsItem.coverUrl ?? undefined,
            publishedAt: newsItem.publishedAt?.toISOString()
          }))} 
          promos={promos.map(promo => ({
            id: promo.id,
            title: promo.title,
            excerpt: promo.excerpt ?? null,
            coverUrl: promo.coverUrl ?? null,
            publishedAt: promo.publishedAt?.toISOString()
          }))} 
        />

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
