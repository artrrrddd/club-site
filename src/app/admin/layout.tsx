"use client";

import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-6">
          <b>Админка</b>
          <nav className="flex gap-4 text-sm">
            <Link href="/admin">Дашборд</Link>
            <Link href="/admin/promos">Акции</Link>
            <Link href="/admin/news">Новости</Link>
          </nav>
          <div className="ml-auto text-sm opacity-70">
            <Link href="/api/auth/signout">Выйти</Link>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-6">{children}</main>
    </div>
  );
}
