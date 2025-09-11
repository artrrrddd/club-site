"use client";

import React from "react";
import { NewsCard } from "@/components/ui/news/NewsCard";
import { PromoCard } from "@/components/ui/promo/PromoCard";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { useIsMobile } from "@/hooks/useIsMobile";
import type { News } from "../../types/contents";

type PromoFromApi = {
  id: string;
  title: string;
  excerpt: string | null;
  coverUrl: string | null;
  publishedAt?: string;
};

type NewsAndPromosProps = {
  news: News[];
  promos: PromoFromApi[];
};

export function NewsAndPromos({ news, promos }: NewsAndPromosProps) {
  const isMobile = useIsMobile();
  
  // Объединяем новости и акции в один массив для отображения
  const allContent = [
    ...news.map((item) => ({
      type: 'news' as const,
      data: item,
      key: `news-${item.id}`,
    })),
    ...promos.map((item) => ({
      type: 'promo' as const,
      data: item,
      key: `promo-${item.id}`,
    })),
  ];

  // Если нет контента, показываем заглушку
  if (allContent.length === 0) {
    return (
      <div className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">Новости и акции</h2>
          <p className="text-muted-foreground italic text-center">Пока нет новостей и акций</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          НОВОСТИ И АКЦИИ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allContent.map((item) => {
            if (item.type === 'news') {
              return (
                <NewsCardWrapper key={item.key} isMobile={isMobile}>
                  <NewsCard
                    id={item.data.id}
                    title={item.data.title}
                    excerpt={item.data.excerpt ?? undefined}
                    coverUrl={item.data.coverUrl ?? undefined}
                    publishedAt={item.data.publishedAt}
                  />
                </NewsCardWrapper>
              );
            } else {
              return (
                <NewsCardWrapper key={item.key} isMobile={isMobile}>
                  <PromoCard
                    id={item.data.id}
                    title={item.data.title}
                    excerpt={item.data.excerpt ?? undefined}
                    coverUrl={item.data.coverUrl ?? undefined}
                  />
                </NewsCardWrapper>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
}

// Обертка для карточек с GlowingEffect
const NewsCardWrapper = ({ children, isMobile }: { children: React.ReactNode; isMobile: boolean }) => {
  return (
    <div className="relative h-full rounded-2xl border border-white/20 p-2 md:rounded-3xl md:p-3">
      <GlowingEffect
        blur={0}
        borderWidth={2}
        spread={64}
        glow
        disabled={isMobile}
        proximity={72}
        inactiveZone={0.08}
      />

      {/* Темно-серая кайма по всему периметру */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl">
        <div className="absolute inset-0 rounded-2xl opacity-60 blur-[4px] bg-[radial-gradient(ellipse_at_center,transparent_60%,#2a2a2a_80%,#1a1a1a_100%)]" />
      </div>

      {/* Содержимое карточки */}
      <div className="relative h-full overflow-hidden rounded-xl bg-black/80 shadow-[0_0_27px_0_rgba(45,45,45,0.35)]">
        {children}
      </div>
    </div>
  );
};
