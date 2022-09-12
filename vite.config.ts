import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-vue-markdown'
import Shiki from 'markdown-it-shiki'
import LinkAttributes from 'markdown-it-link-attributes'
import Page from 'vite-plugin-pages'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/]
    }),
    Page({
      extensions: ['vue', 'md'],
      pagesDir: 'pages',
      extendRoute (route) {
        const path = resolve(__dirname, route.component.slice(1))

        console.log(path, 'path')
      }
    }),
    Markdown({
      wrapperComponent: 'post',
      headEnabled: true,
      markdownItOptions: {
        quotes: '""\'\''
      },
      markdownItSetup (md) {
        md.use(Shiki, {
          theme: {
            light: 'vitesse-light',
            dark: 'vitesse-dark'
          }
        })
        md.use(LinkAttributes, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: '_blank',
            rel: 'noopener'
          }
        })
      }
    })
  ]
})
