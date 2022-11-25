import { defineConfig } from 'astro/config'
import remarkToc from 'remark-toc'
import vue from '@astrojs/vue'
import { isDark } from './src/hooks/toggleTheme'

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkToc],
    extendDefaultPlugins: true,
    shikiConfig: {
      theme: isDark.value ? 'vitesse-light' : 'vitesse-dark',
      langs: ['javascript', 'markdown', 'shell', 'html', 'bash'],
      wrap: true
    }
  },
  integrations: [vue()]
})
