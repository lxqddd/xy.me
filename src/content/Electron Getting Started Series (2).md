---
title: Electron 入门系列（二）
author: 向阳
pubDate: 2022-12-16
tag: 'Electron'
description: electron
---

## 进程之间通信

要了解 Electron 的进程之间如果通信，那必须要明白什么是预加载脚本，因为所有的通信方式都无法离开预加载脚本。

### 什么是预加载脚本

Electron 的主进程是一个拥有完整的操作系统访问权限的 Node.js 环境。除了 `Electron 模组` 之外，你也可以使用 `Node.js` 的内置模块和所有的 npm 包。

出于安全方面的考虑，渲染进程默认是跑在网页页面上，而不是在 `Node.js` 环境里。

而预加载脚本可以理解为是将两种进程连在一起的一个桥接器，他的主要功能就是用来实现主进程和渲染进程之间的通信的。

> 注意：在 Electron 20 之后的版本，预加载脚本默认沙盒化，不再拥有 Node.js 环境的访问权。
>
> 这意味着我们只能使用一个 polyfilled 的 require 函数，这个函数只能访问一组有限的 API。

预加载脚本更像是 Chrome 扩展的内容脚本一样，会在渲染器的网页加载之前注入。如果你想想渲染器加入需要特殊权限的功能，可以通过 `contextBridge` 这个接口定义一个 `全局对象`，这个对象会被挂载到渲染进程的 window 对象上。

### 预加载脚本如何使用

接下来来看一个例子，实战一下。

我们在 preload.ts 中写下如下代码：

```ts
import { contextBridge } from 'electron'

contextBridge.exposeInMainWorld('versions', {
  nodeVersion: () => process.versions.node
})
```

这里的 `versions` 将会被挂载到全局对象 `window` 上，那在主进程中如何使用呢？

既然已经被挂载到 window 上了，那其实可以直接通过属性调用的。

我用的是框架是 vue，所以可以这么来写：

```html
<script setup lang="ts">
  console.log('version', window.versions.nodeVersion())
</script>

<template>
  <div>hello world</div>
</template>
```

如果你在开发的时候没有使用 Typescript，那到这里就可以了。如果你的 vue 项目使用的是 Typescript，那可能还需要多做一步，扩展一下 window 对象的类型，在 src 目录下，创建一个 `electron-api.d.ts` 的文件，然后写下如下内容就可以了。

```ts
interface Window {
  versions: {
    nodeVersion: () => string
  }
}
```

### 进程之间通信

我们之前提到过，Electron 的主进程和渲染进程是相互独立，有着明确的分工且不可互换。这意味着无论是从主进程访问渲染进程还是渲染进程访问主进程的 Node.js 接口还是从主进程访问 HTML 的 DOM 都是不可能的。为了解决该问题，就需要进程间通信（IPC）。

### 渲染进程向主进程通信

要将单向 IPC 消息从渲染器进程发送到主进程，可以使用 `ipcRenderer.send` API 发送消息，然后使用 `ipcMain.on` API 来接收。

接下来我们来通过一段代码展示它的具体用法。

首先，我们在预加载文件 `preload.ts` 中添加一个 `setTitle` 的方法，并通过 `ipcRenderer.send` 方法发送这个方法。

```typescript
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title: string) => ipcRenderer.send('set:title', title)
})
```

接下来在 electron 的 index.ts 中通过 `ipcMain.on` 来监听这个事件。

```typescript
function handleSetTitle() {
  ipcMain.on('set:title', (e: Electron.IpcMainEvent, title: string) => {
    const webContents = e.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title)
  })
}

app.on('ready', () => {
  createWindow()
  handleSetTitle()
})
```

`ipcMain.on` 接收两个参数，第一个是 IPC 通道的名称，也就是我们在预加载文件中定义的哪个 `set:title`，第二个是一个回调函数，回调函数中有两个参数，第一个是默认的事件源对象，第二个是我们从渲染进程发送过来的数据。

做完这一步其实我们就可以在渲染进程中直接调用这个 setTitle 的方法了，但是因为我这里用的是 TS，所以还要加一下类型。在自定义的 `electron-api.d.ts` 中加入如下内容。

```
interface Window {
  electronAPI: {
    setTitle: (title: string) => void
  }
}
```

然后在渲染进程中加入如下代码

```html
<script setup lang="ts">
  const handleSetTitle = () => {
    window.electronAPI.setTitle('this is title')
  }
</script>

<template>
  <div>
    <h1>hello world</h1>
    <button @click="handleSetTitle">setTitle</button>
  </div>
</template>
```

来看一下效果：

![](/images/electron/render-main.gif)

可以看到，当我们点击设置标题的按钮的时候，标题已经被修改，这说明渲染进程和主进程之间的通信已经完成了。

那么问题来了，渲染进程能向主进程通信，主进程能不能向渲染进程通信嘞？当然也是可以的啦！

### 主进程向渲染进程通信

将消息从主进程发送到渲染进程的时候，需要指定哪一个渲染器接收消息。消息需要通过其 `WebContents` 实例发送到渲染器进程。该 WebContents 实例包含一个 `send` 方法，使用方式和 `ipcRenderer.send` 相同。

首先，我们还是要使用预加载脚本中的 `contextBridge` 和 `ipcRenderer` 模块向渲染进程暴露 IPC 功能：

```typescript
import { contextBridge, ipcRenderer } from 'electron'
import type { IpcRendererEvent } from 'electron'

type UpdateCounter = (e: IpcRendererEvent, type: 'add' | 'decr') => void

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title: string) => ipcRenderer.send('set:title', title),
  updateCounter: (callback: UpdateCounter) =>
    ipcRenderer.on('update:counter', callback)
})
```

我们在之前的基础上添加了一个 `updateCounter` 的方法，管道名称为 `update:counter`。

然后我们在主进程中给 electron 窗口添加两个菜单。

```typescript
const createWindow = (): void => {
  // ...
  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          click: () => mainWindow.webContents.send('update:counter', 'add'),
          label: 'Increment'
        }, {
          label: 'decrement',
          click: () => mainWindow.webContents.send('update:counter', 'decr')
        }
      ]
    }
  ])

  Menu.setApplicationMenu(menu)
  // ...
```

这样我们就添加了两个菜单项，一个加法的菜单，一个减法的菜单。

在渲染进程中的时候根监听事件很类似，都是通过回调函数实现的。

```typescript
<script setup lang="ts">
import { ref } from 'vue'
const handleSetTitle = () => {
  window.electronAPI.setTitle('this is title')
}
const counter = ref<number>(0)

window.electronAPI.updateCounter((e, type) => {
  if (type === 'add')
    counter.value += 1
  else if (type === 'decr')
    counter.value -= 1
})
</script>

<template>
  <div>
    <h1>hello world</h1>
    <button @click="handleSetTitle">
      setTitle
    </button>
    <div>
      {{ counter }}
    </div>
  </div>
</template>
```

来看一下实现的效果~

![](/images/electron/main-render.gif)

这样就实现了主进程向渲染进程的通信。

那么问题来了，既然能从渲染进程到主进程进行通信，也能从主进程到渲染进程进行通信，那能不能直接进行双向通信呢？

当然也是可以的~

### 双向通信

双向 IPC 的要给常见应用是从渲染器进程代码调用主进程模块并等待结果。这可以通过将 `ipcRenderer.invoke` 与 `ipcMain.handle` 搭配使用来完成。

来看下边的实例。

首先，我们还是要在预加载脚本中定义一下这个 IPC 管道。

```typescript
import { contextBridge, ipcRenderer } from 'electron'
import type { IpcRendererEvent } from 'electron'

type UpdateCounter = (e: IpcRendererEvent, type: 'add' | 'decr') => void

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title: string) => ipcRenderer.send('set:title', title),
  updateCounter: (callback: UpdateCounter) =>
    ipcRenderer.on('update:counter', callback),
  openFile: () => ipcRenderer.invoke('dialog:openFile')
})
```

我们在最下边又新增了一个 `openFile` 的方法。

然后去主进程的 `index.ts` 中写主进程要处理的逻辑。要实现的功能其实就是打开一个原生的选择文件的弹框。

```typescriipt
async function handleOpenFile(mainWindow: BrowserWindow) {
  ipcMain.handle('dialog:openFile', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow)
    if (canceled)
      return canceled

    else
      return filePaths
  })
}
```

`dialog.showOpenDialog` 要接收一个参数，这个参数是你当前选中的窗口。返回值是一个对象，如果在弹框弹出之后点击了取消，`canceled` 就是 `true`。如果选择了某个或者默写文件，会把这些文件的 `path` 放在一个数组中返回。

主进程中处理完了，渲染进程在用的时候是很简单的，调用一下这个方法就行了。

```
<script setup lang="ts">
import { ref } from 'vue'
// ...
const handOpenFile = async () => {
  const res = await window.electronAPI.openFile()
  console.log(res)
}
</script>

<template>
  <div>

    <button @click="handOpenFile">
      openFile
    </button>
  </div>
</template>

```

来看一下实现之后的效果
![](/images/electron/invoke.gif)

我们可以看到控制台的打印信息，第一次，我们点击了取消按钮，在控制台中打印了 true；第二次我们选中了一个图片，控制台中打印出了图片的绝对路径。

### 渲染进程到渲染进程通信

这种通信的场景不多，一般是打开多个窗口的时候可能会有这样的需求。

electron 没有直接的方法可以使用 `ipcMain` 和 `ipcRender` 模块在 `Electron` 中的渲染器进程之间发送消息。

通常我们有两种做法：

1. 将主进程作为渲染器之间的消息代理。这需要将消息从一个渲染器发送到主进程，然后主进程推送到另一个渲染进程。
2. 从主进程将一个 `MessagePort` 传递到两个渲染器。这将允许在初始值设置后渲染器之间直接进行通信。

`Electron` 进程之间的通信就先讲这么多，其实了解了这些东西之后，我们已经可以完成日常的一些开发工作了，下一篇也不准备再讲 `Electron` 的基础知识，后续我会结合一个案例，来帮助大家学习和理解。
