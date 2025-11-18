---
title: 将浏览器中console日志输出到终端的插件
author: 向阳
pubDate: 2025-11-18
tag: 'Vue'
description: 将浏览器中console日志输出到终端的插件
---

## Vite plugin terminal


```typescript
import type { Plugin, ViteDevServer } from 'vite'
import { lightCyan } from 'kolorist'
/**
 * 最简版 vite-plugin-terminal
 * 功能：将浏览器中的 console.log 内容发送到开发服务器终端显示
 */
export default function vitePluginTerminal(): Plugin {
  return {
    name: 'vite-plugin-terminal',
    apply: 'serve', // 仅在开发模式应用

    // 注入客户端代码到 HTML
    transformIndexHtml(html: string) {
      const injectCode = `
        <script>
          const originalLog = console.log;
          console.log = function(...args) {
            originalLog.apply(console, args);
            fetch('/__terminal_log', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ args: args.map(arg =>
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
              )})
            }).catch(() => {});
          };
        </script>
      `
      return html.replace('</head>', `${injectCode}</head>`)
    },

    // 配置自定义中间件处理终端日志请求
    configureServer(server: ViteDevServer) {
      server.middlewares.use('/__terminal_log', (req, res) => {
        if (req.method === 'POST') {
          let body = ''
          req.on('data', (chunk) => {
            body += chunk.toString()
          })
          req.on('end', () => {
            try {
              const data = JSON.parse(body)
              data.args = data.args.map((args: string) => {
                try {
                  return JSON.parse(args)
                }
                catch (e) {
                  return args as string
                }
              })
              // 输出到终端，带有青色标记
              console.log(lightCyan('[Info]'), ...data.args)
            }
            catch (e: any) {
              console.error('Failed to parse terminal log:', e)
            }
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ ok: true }))
          })
        }
        else {
          res.writeHead(404)
          res.end()
        }
      })
    },
  }
}

```