import api from '@/api';
import { CategoriesResponse } from './types';

export const getCategories = async (): Promise<CategoriesResponse> => {
  const response = await api.get('/products/category');
  return response.data;
};
