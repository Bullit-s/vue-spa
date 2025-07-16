import Vue from 'vue';
import Vuex from 'vuex';
import categoriesModule, { CategoriesState } from './modules/categories';

Vue.use(Vuex);

export interface RootState {
  categories: CategoriesState;
}

export default new Vuex.Store<RootState>({
  state: {} as RootState,
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    categories: categoriesModule,
  },
});
