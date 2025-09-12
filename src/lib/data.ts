import { PrismaClient } from '@prisma/client';

// Типы для работы с данными
export interface News {
  id: string;
  title: string;
  excerpt?: string | null;
  coverUrl?: string | null;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Promo {
  id: string;
  title: string;
  excerpt?: string | null;
  coverUrl?: string | null;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Синглтон для Prisma клиента
class PrismaService {
  private static instance: PrismaService;
  private prisma: PrismaClient;

  private constructor() {
    this.prisma = new PrismaClient();
  }

  public static getInstance(): PrismaService {
    if (!PrismaService.instance) {
      PrismaService.instance = new PrismaService();
    }
    return PrismaService.instance;
  }

  public getClient() {
    return this.prisma;
  }
}

const prisma = PrismaService.getInstance().getClient();

// Функция для отладки
export const debugData = async () => {
  const news = await prisma.news.findMany();
  const promos = await prisma.promo.findMany();
  console.log("Current news data:", news);
  console.log("Current promos data:", promos);
};

// Функции для работы с новостями
export const newsApi = {
  getAll: async () => {
    const news = await prisma.news.findMany({
      orderBy: { publishedAt: 'desc' }
    });
    return news;
  },
  getById: async (id: string) => {
    const news = await prisma.news.findUnique({
      where: { id }
    });
    return news;
  },
  create: async (data: Omit<News, 'id' | 'createdAt' | 'updatedAt'>) => {
    const news = await prisma.news.create({
      data: {
        title: data.title,
        excerpt: data.excerpt,
        coverUrl: data.coverUrl,
        publishedAt: data.publishedAt,
      }
    });
    return news;
  },
  update: async (id: string, data: Partial<News>) => {
    const news = await prisma.news.update({
      where: { id },
      data: {
        title: data.title,
        excerpt: data.excerpt,
        coverUrl: data.coverUrl,
        publishedAt: data.publishedAt,
      }
    });
    return news;
  },
  delete: async (id: string) => {
    try {
      await prisma.news.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      console.error('Error deleting news:', error);
      return false;
    }
  }
};

// Функции для работы с акциями
export const promosApi = {
  getAll: async () => {
    const promos = await prisma.promo.findMany({
      orderBy: { publishedAt: 'desc' }
    });
    console.log("Getting all promos:", promos);
    return promos;
  },
  getById: async (id: string) => {
    const promo = await prisma.promo.findUnique({
      where: { id }
    });
    return promo;
  },
  create: async (data: Omit<Promo, 'id' | 'createdAt' | 'updatedAt'>) => {
    const promo = await prisma.promo.create({
      data: {
        title: data.title,
        excerpt: data.excerpt,
        coverUrl: data.coverUrl,
        publishedAt: data.publishedAt,
      }
    });
    return promo;
  },
  update: async (id: string, data: Partial<Promo>) => {
    console.log("Updating promo with ID:", id, "Data:", data);
    
    const promo = await prisma.promo.update({
      where: { id },
      data: {
        title: data.title,
        excerpt: data.excerpt,
        coverUrl: data.coverUrl,
        publishedAt: data.publishedAt,
      }
    });
    console.log("After update:", promo);
    return promo;
  },
  delete: async (id: string) => {
    try {
      await prisma.promo.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      console.error('Error deleting promo:', error);
      return false;
    }
  }
};
