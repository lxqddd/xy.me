import { createRouter, createWebHistory, Router } from 'vue-router'

const pages = import.meta.glob('../pages/**/*.(vue|md)')
const pageResolve = []

for (const page in pages) {
  if (Object.prototype.hasOwnProperty.call(pages, page)) {
    const first = page.indexOf('/')
    const last = page.lastIndexOf('.')
    const compName = page.split('/')[page.split('/').length - 1] as string
    const extIndex = compName.lastIndexOf('.')
    const name = compName.slice(0, extIndex)
    let path: string
    if (name === 'Blog') {
      path = '/blog'
    } else if (name === 'Home') {
      path = '/'
    } else {
      path = page.slice(first, last).slice(6)
    }
    pageResolve.push({
      path,
      name,
      component: pages[page]
    })
  }
}

console.log(pageResolve)

export const route: Router = createRouter({
  history: createWebHistory(),
  routes: [...pageResolve]
})
