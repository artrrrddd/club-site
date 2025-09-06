import { PromoForm } from "../../../components/ui/promo/PromoForm";

export default function Page() {
  return (
    <main className="py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6">
          Создать акцию (демо)
        </h1>
        <PromoForm />
      </div>
    </main>
  );
}
