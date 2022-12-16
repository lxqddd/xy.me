---
title: Electron 入门系列（二）
author: 向阳
pubDate: 2022-12-16
tag: 'Electron'
layout: '../../layouts/PostLayout.astro'
draft: true
---

## 预加载脚本 `preload`

### 什么是预加载脚本

Electron 的主进程是一个拥有完整的操作系统访问权限的 Node.js 环境。除了 `Electron 模组` 之外，你也可以使用 `Node.js` 的内置模块和所有的 npm 包。

出于安全方面的考虑，渲染进程默认是跑在网页页面上，而不是在 `Node.js` 环境里。

而预加载脚本可以理解为是将两种进程连在一起的一个桥接器，他的主要功能就是用来实现主进程和渲染进程之间的通信的。

> 注意：在 Electron 20 之后的版本，预加载脚本默认沙盒化，不再拥有 Node.js 环境的访问权。
>
> 这意味着我们只能使用一个 polyfilled 的 require 函数，这个函数只能访问一组有限的 API。

预加载脚本更像是 Chrome 扩展的内容脚本一样，会在渲染器的网页加载之前注入。如果你想想渲染器加入需要特殊权限的功能，可以通过 `contextBridge` 这个接口定义一个 `全局对象`，这个对象会被挂载到渲染进程的 window 对象上。
