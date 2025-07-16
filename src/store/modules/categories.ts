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
}

const categoriesModule: Module<CategoriesState, unknown> = {
  namespaced: true,
  state: {
    categories: [
      { id: 1, name: 'Custom Name', count: 2 },
      { id: 2, name: 'Name', count: 33 },
      { id: 3, name: 'Name', count: 23 },
    ],
    activeCategory: 1,
    searchQuery: '',
  },
  getters: {
    filteredCategories: (state): Category[] => {
      if (!state.searchQuery.trim()) {
        return state.categories;
      }

      return state.categories.filter((category: Category) => {
        return category.name
          .toLowerCase()
          .includes(state.searchQuery.toLowerCase());
      });
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
    updateSearchQuery({ commit }, query: string) {
      commit('SET_SEARCH_QUERY', query);
    },
    selectCategory({ commit }, categoryId: number) {
      commit('SET_ACTIVE_CATEGORY', categoryId);
    },
    addCategory({ commit, state }) {
      const newId = Math.max(...state.categories.map((cat) => cat.id)) + 1;
      const newCategory: Category = {
        id: newId,
        name: `New Category ${newId}`,
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
