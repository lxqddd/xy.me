---
title: Electorn 安装失败解决方案
author: 向阳
pubDate: 2022-10-18
description: electron 安装失败的解决方案
tag: 'Electron'

---

### 问题描述

几乎在大多数情况下，我们安装 `electron` 的时候都会遇到一下问题：

<img class="self-pic" src="/images/electron/electron-install-fail.png" title="electron 安装失败" alt="electron 安装失败" />

### 解决方案

解决方案有很多，我这里写一种我比较喜欢的，直接在 `package.json` 文件的 `script` 中添加一行脚本。

```shell
"postinstall": "node node_modules/electron/install.js"
```

方法二：

在项目目录下新建一个 `.npmrc` 文件，并写入以下内容

```shell
registry=https://registry.npmmirror.com
electron_mirror=https://cdn.npmmirror.com/binaries/electron/
electron_builder_binaries_mirror=https://npmmirror.com/mirrors/electron-builder-binaries/
```

这行脚本的意思是当执行完 `npm install` 之后自动执行一下 `node node_modules/electron/install.js`

网上的其他方案是在执行完 `npm install` 之后手动进入到 `node_modules/electron` 中去执行一下 `node install.js`。这种方案跟上边的方案本质上其实是一样的，都是要执行一下 `install.js`。只是第一种方案是通过 `npm` 自动帮你做了这件事。
