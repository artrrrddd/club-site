"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/ImageUpload";
import Link from "next/link";

interface News {
  id: string;
  title: string;
  excerpt?: string | null;
  coverUrl?: string | null;
  publishedAt: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export default function EditNewsPage() {
  const params = useParams();
  const router = useRouter();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    coverUrl: "",
  });

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`/api/news/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setNews(data);
          setFormData({
            title: data.title || "",
            excerpt: data.excerpt || "",
            coverUrl: data.coverUrl || "",
          });
        } else {
          setError("Новость не найдена");
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setError("Ошибка загрузки новости");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchNews();
    }
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch(`/api/news/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/admin/news");
        }, 1500);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Ошибка при сохранении");
      }
    } catch (error) {
      console.error("Error saving news:", error);
      setError("Ошибка при сохранении");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-medium text-gray-900">Загрузка новости...</h3>
            <p className="text-sm text-gray-500 mt-2">Пожалуйста, подождите</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error && !news) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-12">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h3 className="text-lg font-medium text-red-600 mb-2">Ошибка загрузки</h3>
            <p className="text-sm text-gray-600 mb-6">{error}</p>
            <div className="space-y-2">
              <Link href="/admin/news">
                <Button className="w-full">← Назад к новостям</Button>
              </Link>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => window.location.reload()}
              >
                🔄 Попробовать снова
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/admin/news">
                <Button variant="outline">← Назад</Button>
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Редактировать новость</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>Редактирование новости</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Заголовок *
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="excerpt" className="block text-sm font-medium mb-1">
                  Краткое описание
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Изображение
                </label>
                <ImageUpload
                  value={formData.coverUrl}
                  onChange={(url) => setFormData(prev => ({ ...prev, coverUrl: url }))}
                />
              </div>

              {success && (
                <div className="bg-green-50 border border-green-200 rounded-md p-4">
                  <div className="flex">
                    <div className="text-green-400 mr-3">✅</div>
                    <div>
                      <h4 className="text-sm font-medium text-green-800">Сохранено успешно!</h4>
                      <p className="text-sm text-green-600 mt-1">Перенаправление на страницу новостей...</p>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <div className="flex">
                    <div className="text-red-400 mr-3">⚠️</div>
                    <div>
                      <h4 className="text-sm font-medium text-red-800">Ошибка сохранения</h4>
                      <p className="text-sm text-red-600 mt-1">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex space-x-4">
                <Button type="submit" disabled={saving}>
                  {saving ? "Сохранение..." : "Сохранить"}
                </Button>
                <Link href="/admin/news">
                  <Button type="button" variant="outline">Отмена</Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
