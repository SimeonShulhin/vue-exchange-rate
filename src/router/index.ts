import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router';
import EditView from '../views/EditView.vue';
import ChangedCurrenciesView from '../views/ChangedView.vue';
import SearchView from '../views/SearchView.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
  {
    path: '/edit',
    name: 'edit',
    component: ChangedCurrenciesView,
  },
  {
    path: '/edit-currency',
    name: 'edit-currency',
    component: EditView,
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
