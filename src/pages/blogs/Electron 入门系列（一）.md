---
title: Electron 入门系列（一）
author: 向阳
pubDate: 2022-12-12
tag: 'Electron'
layout: '../../layouts/PostLayout.astro'
draft: false
---

## `Electron` 入门

### 创建项目

现在日常的开发基本都用 `typescript`，所以我这里也创建一个 `typescript` 的项目。

官方给我们提供了快捷创建项目的命令：

```bash
npm init electron-app@latest my-new-app -- --template=webpack-typescript
```

命令执行完成之后，会在执行命令的位置创建一个名称为 `my-new-app` 的项目。

在项目中执行 `yarn start` 这个命令， `electron` 项目就会被启动，并且打开一个如下的窗口。

![electron 初始化](/assets/images/electron/electron_init.png)

页面中展示的内容是项目中 `index.html` 中的内容。但是这样的话对于开发并不是很有好，因为我们在日常的开发中基本都是用的框架，比如说 `Vue` 或者是 `React`。

所幸的是，`Electron` 对于框架并没有什么要求，他相当于是一个页面容器，有点 `iframe` 的意思，但是更加强大。你只需要给它一个 `html` 页面，或者给它一个网络地址，它就能把对应的页面渲染出来。

所以，我们在创建一个 `Vue` 的项目，`React` 当然是可以的，我不用是因为不会 `React`……

为了方便开发，我新建了一个项目目录 electron-proj，把之前的 `electron` 项目改名为 `main`，并放在 electron-proj 下边。

在 electron-proj 下边执行 `yarn create vite render --template vue-ts`。这样就在 electron-proj 下边创建了一个基于 `vite` 的 `vue` 项目。把 `vue` 的项目启动起来

![electron 初始化](/assets/images/electron/vue_setup.png)

拿到项目启动之后的地址，将 main 项目 `index.ts` 中的 `mainWindow.loadUrl` 中的参数修改为 `http://127.0.0.1:5174/`。

重启一下 main 项目，已经能够看到 `vue` 项目的页面已经渲染到 `electron` 中了。

![electron-vite](/assets/images/electron/electron-vite.png)

现在已经通过加载 url 的形式展示页面了，那能不能直接加载 html 文件呢？既然前边已经说了可以，那必然就是可以的。

修改 `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: '../main/render_dist'
  }
})
```

将打包后的产物放在 main 项目中的 render_dist 目录下。然后在 main 项目中引入打包后的产物。

```ts
const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  })

  // 通过 loadFile 的形式加载视图文件
  mainWindow.loadFile('./render_dist/index.html')
  mainWindow.webContents.openDevTools()
}
```

我们在运行 electron 项目，发现打开的是一个空白页面，并且控制台有报错。

![启动失败](/assets/images/electron/electron-setup-error.png)

他提示我们加载本地文件失败，刷新一下页面，会看到更详细的报错信息。找不到的就是我们打包后的 vue 项目中的 css 和 js。

我们找到打包后的 vue 项目，发现大包后的 html 在引用资源的时候使用的是一个绝对路径。这肯定是不行的。

![资源引用错误](/assets/images/electron/source-error.png)

这肯定是不行的，所以我们要修改一下 vite 的配置文件，把它改成相对路径。

```ts
/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [vue()],
  // 开发或生产环境服务的公共基础路径
  base: './',
  build: {
    outDir: '../main/render_dist'
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```

加上之后我们重新打包并启动 electron 项目，发现这个时候项目页面已经可以正常加载了。

为了方便我们开发，在不同的环境加载不同的视图内容。我们要安装一下 `cross-env` 这个包。然后再命令行中配置一下当前的环境。

```ts
"scripts": {
  "start": "cross-env NODE_ENV=development electron-forge start",
  "package": "electron-forge package",
  "make": "cross-env NODE_ENV=production electron-forge make",
  "publish": "electron-forge publish",
  "lint": "eslint --ext .ts,.tsx .",
  "lint:fix": "eslint --fix"
}
```

然后在 `index.ts` 中判断一下当前程序的执行环境，根据不同的环境加载不同的资源。

```ts
const isDev = process.env.NODE_ENV === 'development'
const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  })

  if (isDev) {
    mainWindow.loadURL('http://127.0.0.1:10086/')
  } else {
    // 通过 loadFile 的形式加载视图文件
    mainWindow.loadFile('./render_dist/index.html')
  }

  mainWindow.webContents.openDevTools()
}
```

开发环境的话，就加载项目启动时的链接；生产环境就加载打包之后的资源。
