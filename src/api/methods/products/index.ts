import api from '@/api';
import {
  CreateProductRequest,
  CreateProductResponse,
  ProductsResponse,
  UpdateProductRequest,
  UpdateProductResponse,
} from './types';

export const getProductsByCategory = async (
  category: string,
): Promise<ProductsResponse> => {
  const response = await api.get('/products/category', {
    params: {
      type: category,
    },
  });
  return response.data;
};

export const createProduct = async (
  product: CreateProductRequest,
): Promise<CreateProductResponse> => {
  const response = await api.post('/products', product);
  return response.data;
};

export const updateProduct = async (
  id: number,
  product: UpdateProductRequest,
): Promise<UpdateProductResponse> => {
  const response = await api.put(`/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`);
};
