const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Начинаем заполнение базы данных...');

  // Очищаем существующие данные
  await prisma.news.deleteMany();
  await prisma.promo.deleteMany();

  // Создаем новости
  const news1 = await prisma.news.create({
    data: {
      title: "Новая акция на летние товары",
      excerpt: "Скидки до 50% на все летние товары",
      coverUrl: "https://sun9-40.userapi.com/impg/example1.jpg",
      publishedAt: new Date("2024-01-15"),
    }
  });

  const news2 = await prisma.news.create({
    data: {
      title: "Открытие нового магазина",
      excerpt: "Приглашаем на открытие нашего нового магазина",
      coverUrl: "https://sun9-40.userapi.com/impg/example2.jpg",
      publishedAt: new Date("2024-01-20"),
    }
  });

  // Создаем акции
  const promo1 = await prisma.promo.create({
    data: {
      title: "Скидка 30% на все товары",
      excerpt: "Ограниченное предложение - скидка 30% на весь ассортимент",
      coverUrl: "https://sun9-40.userapi.com/impg/promo1.jpg",
      publishedAt: new Date("2024-01-10"),
    }
  });

  const promo2 = await prisma.promo.create({
    data: {
      title: "Бесплатная доставка",
      excerpt: "Бесплатная доставка при заказе от 2000 рублей",
      coverUrl: "https://sun9-40.userapi.com/impg/promo2.jpg",
      publishedAt: new Date("2024-01-12"),
    }
  });

  console.log('База данных успешно заполнена!');
  console.log('Создано новостей:', 2);
  console.log('Создано акций:', 2);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
