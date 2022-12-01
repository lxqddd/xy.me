---
title: Electorn 安装失败解决方案
author: 向阳
pubDate: 2022-10-18
desc: electron 安装失败的解决方案
tag: 'Electron'
layout: '../../layouts/PostLayout.astro'
---

## Electron 安装失败解决方案

### 问题描述

几乎在大多数情况下，我们安装 `electron` 的时候都会遇到一下问题：

![electron 安装失败](/assets/images/electron/electron-install-fail.png)

### 解决方案

解决方案有很多，我这里写一种我比较喜欢的，直接在 `package.json` 文件的 `script` 中添加一行脚本。

```shell
"postinstall": "node node_modules/electron/install.js"
```

这行脚本的意思是当执行完 `npm install` 之后自动执行一下 `node node_modules/electron/install.js`

网上的其他方案是在执行完 `npm install` 之后手动进入到 `node_modules/electron` 中去执行一下 `node install.js`。这种方案跟上边的方案本质上其实是一样的，都是要执行一下 `install.js`。只是第一种方案是通过 `npm` 自动帮你做了这件事。
