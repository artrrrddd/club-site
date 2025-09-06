"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AdminStats() {
  const [newsCount, setNewsCount] = useState(0);
  const [promosCount, setPromosCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const [newsResponse, promosResponse] = await Promise.all([
        fetch('/api/news'),
        fetch('/api/promos')
      ]);
      
      const news = await newsResponse.json();
      const promos = await promosResponse.json();
      
      setNewsCount(news.length);
      setPromosCount(promos.length);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return <div>Загрузка статистики...</div>;
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Новости</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{newsCount}</div>
            <p className="text-gray-600">Всего новостей</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Акции</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{promosCount}</div>
            <p className="text-gray-600">Всего акций</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Контент</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{newsCount + promosCount}</div>
            <p className="text-gray-600">Всего материалов</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Управление акциями</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Просматривайте, редактируйте и удаляйте акции
            </p>
            <Link href="/admin/promos">
              <Button>Управлять акциями</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Создать контент</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Link href="/demo/news-form" className="block">
                <Button variant="outline" className="w-full">Создать новость</Button>
              </Link>
              <Link href="/demo/promo-form" className="block">
                <Button variant="outline" className="w-full">Создать акцию</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

