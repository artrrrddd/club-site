"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { DeleteNewsButton } from "@/components/ui/news/DeleteNewsButton";

interface News {
  id: string;
  title: string;
  excerpt?: string;
  coverUrl?: string;
  publishedAt: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export function NewsList() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news');
      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Обновляем список при возвращении на страницу
  useEffect(() => {
    const handleFocus = () => {
      fetchNews();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const handleDelete = () => {
    // Обновляем список после удаления
    fetchNews();
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      {news.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Новостей пока нет
            </h3>
            <p className="text-gray-600 mb-4">
              Создайте первую новость для вашего сайта
            </p>
            <Link href="/demo/news-form">
              <Button>Создать новость</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((newsItem) => (
            <Card key={newsItem.id} className="overflow-hidden">
              {newsItem.coverUrl && (
                <Image
                  src={newsItem.coverUrl}
                  alt={newsItem.title}
                  width={400}
                  height={225}
                  className="w-full aspect-video object-cover"
                />
              )}
              <CardHeader>
                <CardTitle className="text-lg">{newsItem.title}</CardTitle>
                {newsItem.excerpt && (
                  <p className="text-sm text-gray-600">{newsItem.excerpt}</p>
                )}
                <p className="text-xs text-gray-500">
                  Создано: {new Date(newsItem.createdAt).toLocaleDateString()}
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Link href={`/admin/news/edit/${newsItem.id}`}>
                    <Button variant="outline" size="sm">
                      Редактировать
                    </Button>
                  </Link>
                  <DeleteNewsButton newsId={newsItem.id} onDelete={handleDelete} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

