import { ApiResponse } from '@/api/types';

export type ProductType = {
  id: number;
  title: string;
  model: string;
  brand: string;
  color: string;
  category: string;
  discount: number;
  image: string;
  price: number;
  description: string;
  onSale: boolean;
};

export type ProductsResponse = ApiResponse<{ products: ProductType[] }>;

export type CreateProductRequest = {
  title: string;
  brand: string;
  model: string;
  color: string;
  category: string;
  discount: number;
};

export type CreateProductResponse = ApiResponse<
  Pick<
    ProductType,
    'id' | 'title' | 'model' | 'brand' | 'color' | 'category' | 'discount'
  >
>;

export type UpdateProductRequest = {
  model: string;
  color: string;
  discount: string;
};

export type UpdateProductResponse = ApiResponse<
  Pick<
    ProductType,
    'id' | 'title' | 'model' | 'brand' | 'color' | 'category' | 'discount'
  >
>;
