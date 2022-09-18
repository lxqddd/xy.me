---
title: fzip 压缩工具
author: 向阳
date: 2022-05-30
---

hello，最近写了一个压缩文件的命令行工具，今天分享给大家。

## 起因

1. 由于前公司一些不可抗的情况，最近换了工作，吃饭的家伙也从 Mac 转成了 Win，之前用 Mac 的时候，习惯了终端操作，现在用 Win，感觉不是很适应，尽管 Win 自带的 `powershell` 也很强大。
2. 工作中开发的项目在测试的时候需要先压缩成压缩包，再上传到对应的桌面应用测试。
3. 在网上下载的压缩软件大都捆绑的有广告，hen~烦
4. `powershell` 的压缩命令太长了，用起来不方便，并且桌面应用 ide 升级之后，通过 `Compress-Archive` 压缩的文件不能被正确的解析。
5. 最后一个原因，我不想再去学 `powershell` 的指令了！！！

![](https://files.mdnice.com/user/17954/fc376ad8-2daf-435e-aaaa-babbbca93c9a.png)

综合上述的原因，我用 node 写了一个压缩工具 **`fzip`**

## 对比

来跟 `Compress-Archive` 做一下对比

- 使用 `fzip` 压缩

```shell
fzip -f ./test
```

- 使用 `Compress-Archive` 进行压缩

```shell
Compress-Archive -Path ./test -DestinationPath ./test.zip
# 解释一下参数
# -Path 来源
# -DestinationPath 输出位置
```

上边两条指令都会将当前目录下的 test 目录压缩成一个 zip 包，但是使用 `powershell` 的指令真的很长啊有木有！

当然了，`fzip` 也是支持指定输出位置和命名压缩包的，不仅如此，还支持设置压缩等级！下边会有详细的文档供您食用！

## 使用方法

- 使用 `npm` 安装

```shell
npm install @lxqddd/fzip -g
```

- 使用 `yarn` 安装

```shell
yarn install @lxqddd/fzip -g
```

- 使用 `pnpm` 安装

```shell
pnpm install @lxqddd/fzip -g
```

## 参数说明

| 参数 | 参数来源 | 参数注解                                         |
| ---- | -------- | ------------------------------------------------ |
| -f   | From     | 压缩目标来源（必选）                             |
| -o   | Output   | 压缩产物输出位置（可选，不传则为来源同级目录）   |
| -l   | Level    | 压缩级别 0~9（可选，不传则默认为 6）             |
| -n   | Name     | 压缩包名称（可选，不传则默认为文件或目录的名字） |

## 使用示例

```tree
.
├── LICENSE
├── README.md
├── gulpfile.js
├── package.json
├── src
│   ├── cli.ts
│   ├── core
│   │   └── index.ts
│   ├── types
│   │   └── index.ts
│   └── utils
│       └── index.ts
├── tsconfig.json
└── yarn.lock

```

- 基础用法

```shell
# 指令执行之后会在 `src` 的同级目录输出一个 `src.zip` 的压缩包
fzip -f ./src
```

- 指定输出位置

```shell
# 指令执行之后会在桌面上输出一个 `src.zip` 的压缩包
fzip -f ./src -o ~/Desktop
```

- 指定压缩等级

```shell
# 压缩产物的压缩级别为 9
fzip -f ./src -o ~/Desktop -l 9
```

- 重命名

```shell
# 指令执行之后会在 `src` 的通级目录下输出一个名为 `test.zip` 的压缩包
fzip -f ./src -n test
```

上边说的都是压缩目录的，也可以压缩单个文件，使用方法类似，只需要将输入路径指向被压缩的目标文件即可

- 压缩单个文件

```shell
# 指令执行之后会在桌面输出一个名为 `test.zip` 的压缩包
fzip -f ./src/cli.ts -o ~/Desktop -n test -l 9
```

项目地址：https://github.com/lxqddd/FZip

欢迎 issues！

![](https://files.mdnice.com/user/17954/3464ccf7-2e2b-4506-970f-326a88a8c245.png =60%x)
如果你觉得写的不错的话，欢迎三连~
![](https://img.soogif.com/5HkHKKxGJ6ZmhQ7c8nLYOE9jfEXDpqp4.gif?scope=mdnice)

<Plum />
