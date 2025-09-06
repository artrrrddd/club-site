export type Status = "DRAFT" | "PUBLISHED";

export type Promo = {
    id: string;
    title: string;
    excerpt?: string;
    coverUrl?: string;
    status?: Status;
    publishedAt?: Date | string;
};

export type News = {
    id: string;
    title: string;
    excerpt?: string;
    coverUrl?: string;
    status?: Status;
    publishedAt?: Date | string;
}