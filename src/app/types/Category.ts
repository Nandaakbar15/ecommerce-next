import type {Product} from './Product';

export type Category = {
  id_kategori?: number;
  name: string;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
  products?: Product[]; // relasi balik
};
