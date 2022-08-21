import { createRouter, createWebHistory, Router } from 'vue-router'

export const route: Router = createRouter({
  history: createWebHistory(),
  routes: [{
    path: '/home',
    name: 'home',
    component: () => import('../pages/Home.vue')
  }]
})
