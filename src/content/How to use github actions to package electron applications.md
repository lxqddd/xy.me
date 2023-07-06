---
title: 如何使用github actions 打包electron应用
author: 向阳
pubDate: 2023-07-04
tag: Electron
description: 如何使用github actions 打包electron应用
draft: true
---

在项目根目录下创建 .github/workflows

```yaml
name: Build and Release

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ${{ matrix.os }}

    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macOS-latest]
        node: [16]

    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Setup Node.js ${{ matrix.node }}
        uses: actions/setup-node@v2
        with:
          node-version: ${{ matrix.node }}

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Package
        env:
          GH_TOKEN: ${{ secrets.GH_TOKEN }}
        run: |
          npm install electron-builder@latest -g
          electron-builder --publish always
```

需要在 GitHub 仓库的 "Settings" 选项卡下的 "Secrets" 部分添加一个名为 GH_TOKEN 的 secret，其中包含一个用于访问你的仓库的 GitHub Personal Access Token。这将允许 electron-builder 将生成的构建结果发布到 GitHub Releases。