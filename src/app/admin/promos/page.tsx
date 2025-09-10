import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PromosList } from "@/components/admin/PromosList";
import { promosApi } from "@/lib/data";

export default async function AdminPromosPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  // Получаем данные на серверной стороне
  const promos = await promosApi.getAll();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/admin">
                <Button variant="outline">← Назад</Button>
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Управление акциями</h1>
            </div>
            <div className="flex space-x-4">
              <Link href="/admin/promos/create">
                <Button>Создать акцию</Button>
              </Link>
              <Link href="/">
                <Button variant="outline">На сайт</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <PromosList initialPromos={promos} />
      </main>
    </div>
  );
}