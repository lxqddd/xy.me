import { siteConfig } from './site.config'

export default defineNuxtConfig({
  srcDir: './src',
  app: {
    rootId: 'nuxt-root',
    head: {
      title: siteConfig.title,
      titleTemplate: '%s | 向阳的博客',
      meta: [
        { name: 'description', content: siteConfig.description },
        { name: 'author', content: siteConfig.author },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'revisit-after', content: '7 days' },
        { name: 'msapplication-TileColor', content: '#ffffff' },
        { charset: 'UTF-8' },
        { name: 'referrer', content: 'no-referrer' },
        { 'http-equiv': 'X-UA-Compatible', 'content': 'IE=edge' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
        { property: 'og:site_name', content: siteConfig.title },
        { property: 'og:image', content: '/logo.svg' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }
      ],
      noscript: [
        { innerHTML: 'JavaScript is required' }
      ],
      htmlAttrs: {
        lang: siteConfig.lang
      },
      bodyAttrs: {
        class: 'font-sans'
      }
    }
  },
  plugins: [],
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap'
  ],
  content: {
    sources: {
      // github: {
      //   prefix: process.env.NUXT_GITHUB_PREFIX, // Prefix for routes used to query contents
      //   driver: 'github', // Driver used to fetch contents (view unstorage documentation)
      //   repo: process.env.NUXT_GITHUB_REPO,
      //   branch: process.env.NUXT_GITHUB_BRANCH,
      //   // dir: 'content', // Directory where contents are located. It could be a subdirectory of the repository.
      // },
    },
    highlight: {
      theme: {
        // Default theme (same as single string)
        default: 'vitesse-light',
        // Theme used if `html.dark`
        dark: 'vitesse-dark',
        // Theme used if `html.sepia`
        sepia: 'monokai'
      },
      preload: [
        'c',
        'cpp',
        'java',
        'json',
        'javascript',
        'astro',
        'bash',
        'shell',
        'sass',
        'vue',
        'jsx',
        'html',
        'css',
        'diff',
        'yaml'
      ]

    }
  },
  css: [
    '@unocss/reset/tailwind.css',
    '@/assets/styles/global.scss',
    '@/assets/styles/theme.scss',
    '@/assets/styles/transition.scss',
    '@/assets/styles/markdown.scss'
  ],
  site: {
    url: 'https://xy.me',
    name: siteConfig.title
  },
  sitemap: {
    autoLastmod: true
  }
})
