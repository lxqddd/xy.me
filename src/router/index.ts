import { createRouter as createVueRouter, createMemoryHistory, createWebHistory, Router } from 'vue-router'

export const createRouter = (type: 'client' | 'server'): Router => createVueRouter({
  history: type === 'client' ? createWebHistory() : createMemoryHistory(),
  routes: []
})
