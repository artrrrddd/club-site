"use client";

import React from "react";
import { InfiniteContentCards as InfiniteContentCardsComponent } from "../ui/infinite-content-cards";
import type { News } from "../../types/contents";

type PromoFromApi = {
  id: string;
  title: string;
  excerpt: string | null;
  coverUrl: string | null;
  publishedAt?: string;
};

type InfiniteContentCardsProps = {
  news: News[];
  promos: PromoFromApi[];
};

export function InfiniteContentCards({ news, promos }: InfiniteContentCardsProps) {
  // Добавляем тестовые данные, если нет реальных
  const testNews = news.length === 0 ? [
    {
      id: 'test-news-1',
      title: 'Тестовая новость 1',
      excerpt: 'Это тестовая новость для проверки работы компонента',
      coverUrl: null,
      publishedAt: new Date().toISOString(),
    },
    {
      id: 'test-news-2', 
      title: 'Тестовая новость 2',
      excerpt: 'Еще одна тестовая новость',
      coverUrl: null,
      publishedAt: new Date().toISOString(),
    }
  ] : news;

  const testPromos = promos.length === 0 ? [
    {
      id: 'test-promo-1',
      title: 'Тестовая акция 1',
      excerpt: 'Это тестовая акция для проверки работы компонента',
      coverUrl: null,
    },
    {
      id: 'test-promo-2',
      title: 'Тестовая акция 2', 
      excerpt: 'Еще одна тестовая акция',
      coverUrl: null,
    }
  ] : promos;

  // Объединяем новости и акции в один массив для плывущих карточек
  const allContent = [
    ...testNews.map((item) => ({
      type: 'news' as const,
      data: item,
      key: `news-${item.id}`,
    })),
    ...testPromos.map((item) => ({
      type: 'promo' as const,
      data: item,
      key: `promo-${item.id}`,
    })),
  ];

  // Отладочная информация
  console.log('InfiniteContentCards - news:', news.length, 'promos:', promos.length, 'allContent:', allContent.length);

  // Если нет контента, показываем заглушку
  if (allContent.length === 0) {
    return (
      <div className="h-[40rem] w-full flex flex-col antialiased items-center justify-center relative overflow-hidden">
        <p className="text-white/60 text-center">Пока нет новостей и акций</p>
        <p className="text-white/40 text-center text-sm mt-2">News: {news.length}, Promos: {promos.length}</p>
      </div>
    );
  }

  return (
    <div className="h-[40rem] w-full flex flex-col antialiased items-center justify-center relative overflow-hidden">
      <InfiniteContentCardsComponent
        items={allContent}
        direction="right"
        speed="slow"
        className="w-full"
      />
    </div>
  );
}
