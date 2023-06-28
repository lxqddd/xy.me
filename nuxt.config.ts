import { siteConfig } from './site.config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: './src',
  app: {
    rootId: 'nuxt-root',
    head: {
      meta: [
        { name: 'description', content: siteConfig.description },
        { name: 'author', content: siteConfig.author },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'revisit-after', content: '7 days' },
        { name: 'msapplication-TileColor', content: '#ffffff' },
        { charset: 'UTF-8' },
        { name: 'referrer', content: 'no-referrer' },
        { 'http-equiv': 'X-UA-Compatible', 'content': 'IE=edge' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }
      ],
      noscript: [
        { children: 'JavaScript is required' }
      ],
      htmlAttrs: {
        lang: siteConfig.lang
      },
      bodyAttrs: {
        class: 'font-sans'
      }
    }
  },
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@unocss/nuxt',
    '@vueuse/nuxt'
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
        'diff'
      ]

    }
  },
  css: [
    '@unocss/reset/tailwind.css',
    '@/assets/styles/global.scss',
    '@/assets/styles/theme.scss',
    '@/assets/styles/transition.scss',
    '@/assets/styles/markdown.scss'
  ]
})
