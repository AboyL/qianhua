import { createRouter, createWebHistory } from 'vue-router';
const routes = [
  {
    path: '/',
    component: () => import('../App.vue'),
  },
];

const router = (basename = '') => createRouter({
  history: createWebHistory(basename),
  routes,
});

export default router;
