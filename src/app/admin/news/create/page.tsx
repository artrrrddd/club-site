import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NewsForm } from "@/components/ui/news/NewsForm";

export default async function CreateNewsPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/admin/news">
                <Button variant="outline">← Назад к новостям</Button>
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Создать новость</h1>
            </div>
            <div className="flex space-x-4">
              <Link href="/admin">
                <Button variant="outline">Админ-панель</Button>
              </Link>
              <Link href="/">
                <Button variant="outline">На сайт</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <NewsForm />
        </div>
      </main>
    </div>
  );
}
