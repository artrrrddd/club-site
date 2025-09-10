import { debugData } from "@/lib/data";

export default function DebugDataPage() {
  // Вызываем функцию отладки на сервере
  debugData();
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Отладка данных</h1>
      <p>Проверьте консоль сервера для вывода данных.</p>
      <p>Данные должны содержать 2 новости и 2 акции по умолчанию.</p>
    </div>
  );
}
