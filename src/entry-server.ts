import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'

import { createRouter } from './router'
import pinia from './store/index'

import App from './App.vue'

import type { ParameterizedContext } from 'koa'

export async function render (
  ctx: ParameterizedContext,
  manifest: Record<string, string[]>
): Promise<[string, string]> {
  const app = createSSRApp(App)
  const router = createRouter('server')

  // create and initialize store

  app.use(router)
  app.use(pinia)

  await router.push(ctx.path)
  await router.isReady()

  const renderCtx: {modules?: string[]} = {}
  let renderedHtml = await renderToString(app, renderCtx)

  const preloadLinks = renderPreloadLinks(renderCtx.modules, manifest)
  return [renderedHtml, preloadLinks]
}

function renderPreloadLinks (modules: undefined | string[], manifest: Record<string, string[]>): string {
  let links = ''
  const seen = new Set()
  if (modules === undefined) throw new Error()
  modules.forEach((id) => {
    const files = manifest[id]
    if (files) {
      files.forEach((file) => {
        if (!seen.has(file)) {
          seen.add(file)
          links += renderPreloadLink(file)
        }
      })
    }
  })
  return links
}

function renderPreloadLink (file: string): string {
  if (file.endsWith('.js')) {
    return `<link rel="modulepreload" crossorigin href="${file}">`
  } else if (file.endsWith('.css')) {
    return `<link rel="stylesheet" href="${file}">`
  } else {
    return ''
  }
}
