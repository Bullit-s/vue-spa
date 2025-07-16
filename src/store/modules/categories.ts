import { getCategories } from '@/api/methods/categories';
import {
  deleteProduct,
  getProductsByCategory,
  updateProduct,
} from '@/api/methods/products';
import { ProductType } from '@/api/methods/products/types';
import { Module } from 'vuex';

export interface Category {
  id: number;
  name: string;
  count: number;
}

export interface CategoriesState {
  categories: Category[];
  activeCategory: number | null;
  searchQuery: string;
  loading: boolean;
  error: string | null;
  filters: {
    sort: string;
    limit: number;
  };
  products: ProductType[];
  productsLoading: boolean;
  productsError: string | null;
}

const categoriesModule: Module<CategoriesState, unknown> = {
  namespaced: true,
  state: {
    categories: [],
    activeCategory: null,
    searchQuery: '',
    loading: false,
    error: null,
    filters: {
      sort: 'title_desc',
      limit: 25,
    },
    products: [],
    productsLoading: false,
    productsError: null,
  },
  getters: {
    filteredCategories: (state): Category[] => {
      if (!state.searchQuery.trim()) {
        return state.categories;
      }
      return state.categories.filter((category) =>
        category.name.toLowerCase().includes(state.searchQuery.toLowerCase()),
      );
    },
    activeCategoryId: (state): number | null => {
      return state.activeCategory;
    },
  },
  mutations: {
    SET_SEARCH_QUERY(state, query: string) {
      state.searchQuery = query;
    },
    SET_ACTIVE_CATEGORY(state, categoryId: number) {
      state.activeCategory = categoryId;
    },
    SET_CATEGORIES(state, categories: Category[]) {
      state.categories = categories;
    },
    SET_LOADING(state, loading: boolean) {
      state.loading = loading;
    },
    SET_ERROR(state, error: string | null) {
      state.error = error;
    },
    UPDATE_CATEGORY_COUNT(
      state,
      { categoryName, count }: { categoryName: string; count: number },
    ) {
      const category = state.categories.find(
        (cat) => cat.name === categoryName,
      );
      if (category) {
        category.count = count;
      }
    },
    ADD_CATEGORY(state, category: Category) {
      state.categories.push(category);
    },
    UPDATE_CATEGORY(
      state,
      { id, updates }: { id: number; updates: Partial<Category> },
    ) {
      const categoryIndex = state.categories.findIndex((cat) => cat.id === id);
      if (categoryIndex !== -1) {
        state.categories[categoryIndex] = {
          ...state.categories[categoryIndex],
          ...updates,
        };
      }
    },
    DELETE_CATEGORY(state, categoryId: number) {
      state.categories = state.categories.filter(
        (cat) => cat.id !== categoryId,
      );
    },
    SET_SORT_FILTER(state, sort: string) {
      state.filters.sort = sort;
    },
    SET_LIMIT_FILTER(state, limit: number) {
      state.filters.limit = limit;
    },
    SET_PRODUCTS(state, products: ProductType[]) {
      state.products = products;
    },
    SET_PRODUCTS_LOADING(state, loading: boolean) {
      state.productsLoading = loading;
    },
    SET_PRODUCTS_ERROR(state, error: string | null) {
      state.productsError = error;
    },
    DELETE_PRODUCT(state, productId: number) {
      state.products = state.products.filter(
        (product) => product.id !== productId,
      );
    },
    UPDATE_PRODUCT(state, updatedProduct: ProductType) {
      const index = state.products.findIndex(
        (product) => product.id === updatedProduct.id,
      );

      if (index !== -1) {
        Object.assign(state.products[index], updatedProduct);
      }
    },
  },
  actions: {
    async loadCategories({ commit, state }) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);

      try {
        const categoriesResponse = await getCategories();
        const categoryNames: string[] = categoriesResponse.categories;

        const categories: Category[] = categoryNames.map(
          (name: string, index: number) => ({
            id: index + 1,
            name,
            count: 0,
          }),
        );

        commit('SET_CATEGORIES', categories);

        if (categories.length > 0) {
          commit('SET_ACTIVE_CATEGORY', categories[0].id);
        }

        await Promise.all(
          categoryNames.map(async (categoryName: string) => {
            try {
              const productsResponse = await getProductsByCategory(
                categoryName,
                { limit: state.filters.limit },
              );
              const count = productsResponse.products
                ? productsResponse.products.length
                : 0;
              commit('UPDATE_CATEGORY_COUNT', { categoryName, count });
            } catch (error) {
              console.error(
                `Ошибка при загрузке продуктов для категории ${categoryName}:`,
                error,
              );
            }
          }),
        );
      } catch (error) {
        commit('SET_ERROR', 'Ошибка при загрузке категорий');
      } finally {
        commit('SET_LOADING', false);
      }
    },
    updateSearchQuery({ commit }, query: string) {
      commit('SET_SEARCH_QUERY', query);
    },
    selectCategory({ commit }, categoryId: number) {
      commit('SET_ACTIVE_CATEGORY', categoryId);
    },
    addCategory({ commit, state }, categoryName: string) {
      const newId = Math.max(...state.categories.map((cat) => cat.id), 0) + 1;
      const newCategory: Category = {
        id: newId,
        name: categoryName,
        count: 0,
      };
      commit('ADD_CATEGORY', newCategory);
    },
    updateCategory(
      { commit },
      payload: { id: number; updates: Partial<Category> },
    ) {
      commit('UPDATE_CATEGORY', payload);
    },
    deleteCategory({ commit }, categoryId: number) {
      commit('DELETE_CATEGORY', categoryId);
    },
    updateSortFilter({ commit }, sort: string) {
      commit('SET_SORT_FILTER', sort);
    },
    updateLimitFilter({ commit }, limit: number) {
      commit('SET_LIMIT_FILTER', limit);
    },
    async loadProducts({ commit, state }) {
      if (!state.activeCategory) return;

      commit('SET_PRODUCTS_LOADING', true);
      commit('SET_PRODUCTS_ERROR', null);

      try {
        const activeCategory = state.categories.find(
          (cat) => cat.id === state.activeCategory,
        );

        if (activeCategory) {
          const response = await getProductsByCategory(activeCategory.name, {
            limit: state.filters.limit,
          });

          commit('SET_PRODUCTS', response.products || []);
        }
      } catch (error) {
        commit('SET_PRODUCTS_ERROR', 'Ошибка при загрузке продуктов');
      } finally {
        commit('SET_PRODUCTS_LOADING', false);
      }
    },
    async deleteProduct({ commit, state }, productId: number) {
      try {
        await deleteProduct(productId);
        commit('DELETE_PRODUCT', productId);

        const activeCategory = state.categories.find(
          (cat) => cat.id === state.activeCategory,
        );
        if (activeCategory) {
          const newCount = Math.max(0, activeCategory.count - 1);
          commit('UPDATE_CATEGORY_COUNT', {
            categoryName: activeCategory.name,
            count: newCount,
          });
        }
      } catch (error) {
        console.error('Ошибка при удалении продукта:', error);
        throw error;
      }
    },
    async updateProduct({ commit }, updatedProduct: ProductType) {
      try {
        const response = await updateProduct(updatedProduct.id, {
          model: updatedProduct.model,
          color: updatedProduct.color,
          discount: updatedProduct.discount?.toString(),
        });

        const updatedProductData = {
          ...updatedProduct,
          model: response.model || updatedProduct.model,
          color: response.color || updatedProduct.color,
          discount: response.discount || updatedProduct.discount,
        };

        commit('UPDATE_PRODUCT', updatedProductData);
        return response;
      } catch (error) {
        console.error('Ошибка при обновлении продукта:', error);
        throw error;
      }
    },
  },
};

export default categoriesModule;
