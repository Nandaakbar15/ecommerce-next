import type { Category } from "./Category";

export type Product = {
  id_produk?: number; // optional kalau masih auto increment
  name: string;
  id_kategori: number; // FK ke Category
  description: string;
  stock: number;
  image?: string; // nullable di Prisma
  createdAt?: Date;
  updatedAt?: Date;
  category?: Category; // relasi (opsional kalau mau include)
};

