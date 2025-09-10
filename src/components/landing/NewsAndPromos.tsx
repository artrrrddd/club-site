"use client";

import React from "react";
import { NewsCard } from "@/components/ui/news/NewsCard";
import { PromoCard } from "@/components/ui/promo/PromoCard";
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
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">Новости и акции</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allContent.map((item) => {
            if (item.type === 'news') {
              return (
                <NewsCard
                  key={item.key}
                  id={item.data.id}
                  title={item.data.title}
                  excerpt={item.data.excerpt ?? undefined}
                  coverUrl={item.data.coverUrl ?? undefined}
                  publishedAt={item.data.publishedAt}
                />
              );
            } else {
              return (
                <PromoCard
                  key={item.key}
                  id={item.data.id}
                  title={item.data.title}
                  excerpt={item.data.excerpt ?? undefined}
                  coverUrl={item.data.coverUrl ?? undefined}
                />
              );
            }
          })}
        </div>
      </div>
    </section>
  );
}
