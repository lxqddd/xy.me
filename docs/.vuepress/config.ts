import { defineUserConfig, defaultTheme } from 'vuepress'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import * as path from 'path'
// import Layouts from './layouts/Layout.vue'

// console.log(import.meta.resolve('../blogs/**/*.md'))

export default defineUserConfig({
  lang: 'zh-CN',
  title: '向阳',
  description: '大话前端，向阳的JavaScript技术博客，向阳的博客，vue，JavaScript',
  head: [
    ['link', {
      rel: 'icon',
      href: '/favicon.svg',
      color: '#000'
    }]
  ],
  theme: defaultTheme({
    logo: '/logo.svg',
    logoDark: '/logo-dark.svg',
    navbar: [
      {
        text: 'home',
        link: '/'
      }, {
        text: 'blog',
        link: '/blogs'
      }
    ],
    sidebar: false
  }),
  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components')
    })
  ]
})