import { getCategories } from '@/api/methods/categories';
import { getProductsByCategory } from '@/api/methods/products';
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
}

const categoriesModule: Module<CategoriesState, unknown> = {
  namespaced: true,
  state: {
    categories: [],
    activeCategory: null,
    searchQuery: '',
    loading: false,
    error: null,
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
  },
  actions: {
    async loadCategories({ commit }) {
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
              );
              const count = productsResponse.products
                ? productsResponse.products.length
                : 0;
              commit('UPDATE_CATEGORY_COUNT', { categoryName, count });
            } catch (error) {
              console.error(
                `Failed to load products for category ${categoryName}:`,
                error,
              );
            }
          }),
        );
      } catch (error) {
        console.error('Failed to load categories:', error);
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
  },
};

export default categoriesModule;
