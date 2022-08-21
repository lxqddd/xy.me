import { createRouter, createWebHistory, Router } from 'vue-router'

const pages = import.meta.glob('../pages/*.vue')

console.log(pages)

export const route: Router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('../pages/Home.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../pages/About.md')
    }
  ]
})
