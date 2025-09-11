import s from "./Home.module.css";
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
import Pricing from '@/components/landing/Pricing'
import Footer from '@/components/landing/Footer'

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
        <a href="tel:+7(950)113-20-15" className={`${s.bttn} absolute w-32 sm:w-60 h-10 sm:h-10 rounded-xl bg-crimson text-white border border-black text-base sm:text-lg font-titillium flex items-center justify-center z-50 pointer-events-auto cursor-pointer hover:bg-red-600 transition-colors`}>
          Забронировать
        </a>
      <div className={`${s.bg} absolute inset-0 -z-10 pointer-events-none`}>
        <div>
          <Image src={RightVectorBg} alt="" className={s.rightVector} />
          <Image src={Elipse} alt="" className={s.elipseRight} />
          <Image src={Elipse} alt="" className={s.elipseLeft} />
          {/*<Image src={Elipse} alt="" className={s.elipseRight} /> */}
        <Image src={LeftVectorBg} alt="" className={s.leftSvg} />
        <Image src={RightVectorBg} alt="" className={s.rightVector1} />
        <Image src={Elipse} alt="" className={s.elipseRight1} />
        <Image src={Elipse} alt="" className={s.elipseLeft1} />
        <Image src={LeftVectorBg} alt="" className={s.leftSvg1} />
        <Image src={RightVectorBg} alt="" className={s.rightVector2} />
        <Image src={Elipse} alt="" className={s.elipseRight2} />



        </div>
      </div>

      {/* Основной контент – положительный z-index */}
      <div className={`${s.wrapper} relative z-999`}>
        <header className={s.Header}>
          <div className="flex space-x-4">
            <h1 className={`${TitilliumWebSemiBold.className} ${s.logotype} text-2x1 md:text-3xl font-bold text-white`}>
              комп.<span className="text-crimson">здесь</span>
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
            <h2 className="text-4xl font-bold text-white text-center mb-16">
          НАШ АРСЕНАЛ
        </h2>
              <CardsGrid />
            </div>
          </TracingBeam>
        </section>

        <Pricing />



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

        

        {/* Подвал */}
        <Footer />
      </div>
    </div>
    
  );
}
