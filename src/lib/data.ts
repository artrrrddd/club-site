// Простое хранилище данных в памяти
export interface News {
  id: string;
  title: string;
  excerpt?: string;
  coverUrl?: string;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Promo {
  id: string;
  title: string;
  excerpt?: string;
  coverUrl?: string;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Синглтон для глобального хранилища данных
class DataStore {
  private static instance: DataStore;
  private data: {
    news: News[];
    promos: Promo[];
  };

  private constructor() {
    this.data = {
      news: [
        {
          id: "1",
          title: "Новая акция на летние товары",
          excerpt: "Скидки до 50% на все летние товары",
          coverUrl: "https://sun9-40.userapi.com/impg/example1.jpg",
          publishedAt: new Date("2024-01-15"),
          createdAt: new Date("2024-01-15"),
          updatedAt: new Date("2024-01-15"),
        },
        {
          id: "2",
          title: "Открытие нового магазина",
          excerpt: "Приглашаем на открытие нашего нового магазина",
          coverUrl: "https://sun9-40.userapi.com/impg/example2.jpg",
          publishedAt: new Date("2024-01-20"),
          createdAt: new Date("2024-01-20"),
          updatedAt: new Date("2024-01-20"),
        }
      ],
      promos: [
        {
          id: "1",
          title: "Скидка 30% на все товары",
          excerpt: "Ограниченное предложение - скидка 30% на весь ассортимент",
          coverUrl: "https://sun9-40.userapi.com/impg/promo1.jpg",
          publishedAt: new Date("2024-01-10"),
          createdAt: new Date("2024-01-10"),
          updatedAt: new Date("2024-01-10"),
        },
        {
          id: "2",
          title: "Бесплатная доставка",
          excerpt: "Бесплатная доставка при заказе от 2000 рублей",
          coverUrl: "https://sun9-40.userapi.com/impg/promo2.jpg",
          publishedAt: new Date("2024-01-12"),
          createdAt: new Date("2024-01-12"),
          updatedAt: new Date("2024-01-12"),
        }
      ]
    };
  }

  public static getInstance(): DataStore {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore();
    }
    return DataStore.instance;
  }

  public getData() {
    return this.data;
  }
}

const globalData = DataStore.getInstance().getData();

// Функция для отладки
export const debugData = () => {
  console.log("Current news data:", globalData.news);
  console.log("Current promos data:", globalData.promos);
};

// Функции для работы с новостями
export const newsApi = {
  getAll: () => globalData.news.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()),
  getById: (id: string) => globalData.news.find(item => item.id === id),
  create: (data: Omit<News, 'id' | 'createdAt' | 'updatedAt'>) => {
    const news: News = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    globalData.news.push(news);
    return news;
  },
  update: (id: string, data: Partial<News>) => {
    const index = globalData.news.findIndex(item => item.id === id);
    if (index !== -1) {
      globalData.news[index] = { ...globalData.news[index], ...data, updatedAt: new Date() };
      return globalData.news[index];
    }
    return null;
  },
  delete: (id: string) => {
    const index = globalData.news.findIndex(item => item.id === id);
    if (index !== -1) {
      globalData.news.splice(index, 1);
      return true;
    }
    return false;
  }
};

// Функции для работы с акциями
export const promosApi = {
  getAll: () => {
    console.log("Getting all promos:", globalData.promos);
    return globalData.promos.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  },
  getById: (id: string) => globalData.promos.find(item => item.id === id),
  create: (data: Omit<Promo, 'id' | 'createdAt' | 'updatedAt'>) => {
    const promo: Promo = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    globalData.promos.push(promo);
    return promo;
  },
  update: (id: string, data: Partial<Promo>) => {
    console.log("Updating promo with ID:", id, "Data:", data);
    console.log("Before update:", globalData.promos);
    
    const index = globalData.promos.findIndex(item => item.id === id);
    if (index !== -1) {
      globalData.promos[index] = { ...globalData.promos[index], ...data, updatedAt: new Date() };
      console.log("After update:", globalData.promos);
      return globalData.promos[index];
    }
    console.log("Promo not found for update");
    return null;
  },
  delete: (id: string) => {
    const index = globalData.promos.findIndex(item => item.id === id);
    if (index !== -1) {
      globalData.promos.splice(index, 1);
      return true;
    }
    return false;
  }
};
