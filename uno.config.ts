import { defineConfig, presetAttributify, presetIcons, presetUno, presetWebFonts, transformerVariantGroup } from 'unocss'
import { navLinks } from './site.config'

const compoundLinks = [...navLinks]
const safeNavIcon = compoundLinks.map(link => link.icon)

export default defineConfig({
  // ...UnoCSS options
  shortcuts: {
    'flex-center': 'flex items-center justify-center',
    'text-title': 'text-xl sm:text-3xl',
    'hover': 'op-70 hover:op-100 cursor-pointer transition-opacity',
    'deep-hover': 'op-20 hover:op-70 cursor-pointer transition-opacity',
    'bd': 'border-gray-500 border-1',
    'text-deep': 'c-black dark:c-white'
  },
  theme: {
    colors: {
      primary: 'var(--primary)',
      container: 'var(--c-bg)'
    },
    extend: {
      borderRadius: {
        common: 'var(--common-rd)'
      }
    }
  },
  presets: [
    presetUno({
      dark: 'class'
    }),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: ['Inter', 'Noto Sans Simplified Chinese'],
        mono: ['Fira Mono:400,700'],
        hand: ['Dancing Script']
      }
    }),
    presetAttributify (),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
        'width': '1.2em',
        'height': '1.2em'
      },
      collections: {
        'icon-park-outline': () => import('@iconify-json/icon-park-outline/icons.json').then(i => i.default),
        'simple-icons': () => import('@iconify-json/simple-icons/icons.json').then(i => i.default),
        'line-md': () => import('@iconify-json/line-md/icons.json').then(i => i.default),
        'logos': () => import('@iconify-json/logos/icons.json').then(i => i.default)
      }
    })
  ],
  safelist: [...safeNavIcon],
  transformers: [
    transformerVariantGroup()
  ]
})
