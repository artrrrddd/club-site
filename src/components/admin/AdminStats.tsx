"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface AdminStatsProps {
  initialNewsCount: number;
  initialPromosCount: number;
}

export function AdminStats({ initialNewsCount, initialPromosCount }: AdminStatsProps) {
  const [newsCount, setNewsCount] = useState(initialNewsCount);
  const [promosCount, setPromosCount] = useState(initialPromosCount);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      console.log("Fetching stats...");
      
      const [newsResponse, promosResponse] = await Promise.all([
        fetch('/api/news'),
        fetch('/api/promos')
      ]);
      
      console.log("News response status:", newsResponse.status);
      console.log("Promos response status:", promosResponse.status);
      
      const news = await newsResponse.json();
      const promos = await promosResponse.json();
      
      console.log("News data:", news);
      console.log("Promos data:", promos);
      
      setNewsCount(news.length);
      setPromosCount(promos.length);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
      if (isRefresh) setRefreshing(false);
    }
  };

  // Данные уже переданы как пропсы, поэтому не нужно загружать их при монтировании

  // Обновляем статистику при возвращении на страницу
  useEffect(() => {
    const handleFocus = () => {
      fetchStats(true);
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  if (loading) {
    return <div>Загрузка статистики...</div>;
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Статистика</h2>
        <Button 
          onClick={() => fetchStats(true)} 
          disabled={refreshing}
          variant="outline"
        >
          {refreshing ? "Обновление..." : "Обновить"}
        </Button>
      </div>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Управление новостями</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Просматривайте, редактируйте и удаляйте новости
            </p>
            <Link href="/admin/news">
              <Button>Управлять новостями</Button>
            </Link>
          </CardContent>
        </Card>

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
              <Link href="/admin/news/create" className="block">
                <Button variant="outline" className="w-full">Создать новость</Button>
              </Link>
              <Link href="/admin/promos/create" className="block">
                <Button variant="outline" className="w-full">Создать акцию</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

