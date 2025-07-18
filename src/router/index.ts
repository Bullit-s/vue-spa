import ButtonsView from '@/views/ButtonsView.vue';
import HomeView from '@/views/HomeView.vue';
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },

  {
    path: '/buttons',
    name: 'Buttons',
    component: ButtonsView,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
