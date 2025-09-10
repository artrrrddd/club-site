"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { DeletePromoButton } from "@/components/ui/promo/DeletePromoButton";

interface Promo {
  id: string;
  title: string;
  excerpt?: string;
  coverUrl?: string;
  publishedAt: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface PromosListProps {
  initialPromos: Promo[];
}

export function PromosList({ initialPromos }: PromosListProps) {
  const [promos, setPromos] = useState<Promo[]>(initialPromos);
  const [loading, setLoading] = useState(false);

  const fetchPromos = async () => {
    try {
      const response = await fetch('/api/promos');
      const data = await response.json();
      setPromos(data);
    } catch (error) {
      console.error("Error fetching promos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Данные уже переданы как пропсы, поэтому не нужно загружать их при монтировании

  // Обновляем список при возвращении на страницу
  useEffect(() => {
    const handleFocus = () => {
      fetchPromos();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const handleDelete = () => {
    // Обновляем список после удаления
    fetchPromos();
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      {promos.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Акций пока нет
            </h3>
            <p className="text-gray-600 mb-4">
              Создайте первую акцию для вашего сайта
            </p>
            <Link href="/demo/promo-form">
              <Button>Создать акцию</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promos.map((promo) => (
            <Card key={promo.id} className="overflow-hidden">
              {promo.coverUrl && (
                <Image
                  src={promo.coverUrl}
                  alt={promo.title}
                  width={400}
                  height={225}
                  className="w-full aspect-video object-cover"
                />
              )}
              <CardHeader>
                <CardTitle className="text-lg">{promo.title}</CardTitle>
                {promo.excerpt && (
                  <p className="text-sm text-gray-600">{promo.excerpt}</p>
                )}
                <p className="text-xs text-gray-500">
                  Создано: {new Date(promo.createdAt).toLocaleDateString()}
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Link href={`/admin/promos/edit/${promo.id}`}>
                    <Button variant="outline" size="sm">
                      Редактировать
                    </Button>
                  </Link>
                  <DeletePromoButton promoId={promo.id} onDelete={handleDelete} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

