---
title: 如何使用 Node.js 打开本地应用
author: 向阳
pubDate: 2023-10-13
tag: 'JavaScript'
description: 如何使用 Node.js 打开本地应用
---

最近在开发的过程中接到这样一个需求，需要通过代码，帮助用户启动本地的 Docker Desktop。

## 需求背景

我们做的是一个 electron 应用，在用户使用的过程中会依赖到 docker 。为了减少用户操作，我们需要在检测到 docker 没有启动的情况下，帮助用户唤起docker Desktop。

## 实现过程

不同的操作系统，唤起 Dcoker Desktop 的方式都不一样，Linux 用户通常不会安装 Docker Desktop ，所以，Linux 用户启动docker 的方式很简单，直接通过命令行 `sudo systemctl start docker
`，Mac 系统也有自己专门启动应用的指令 `open -a Docker`，最难搞的就是 Windows 系统……

![](https://files.mdnice.com/user/17954/2fa9b59c-fa83-4ec9-be32-23b029e00933.png){width=50%}


不同的用户在安装 Docker 的时候会选择不同的安装位置，所以找到 Docker 的安装位置就很关键。

Docker 在安装的时候，会在系统的注册表中写入安装位置的相关信息，所以我们要获取到 Docker 安装地址，可以从查询系统注册表入手。

```javascript
import { execSync } from 'child_process'
import path from 'path'

function findDockerDesktop() {
  try {
    // 应用名称
    const applicationName = 'Docker'
    // 查询注册表
    const command = `reg query "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall" /s /f "${applicationName}"`;

    // 执行查询命令
    const res = execSync(command);
    const stdout = res.toString()
    const match = stdout.match(/InstallLocation\s+REG_SZ\s+(.*)/)

    if (match && match[1]) {
      const dockerInstallerPath = path.resolve(match[1].trim(), 'Docker Desktop.exe')
      return dockerInstallerPath
    } else {
      throw new Error('未找到应用程序的安装位置');
    }
  } catch (error) {
    console.error(`查询应用程序安装位置时出错: ${(error as Error).message}`);
  }
}
```

这里通过 `reg query` 命令直接查询系统系统的注册表，查询的应用名称是 `Docker`。

由于 `execSync` 返回的结果是一个 `Buffer`，所以我这里通过 `toString` 把他转成 `utf8` 字符串。查询结果如下：

![](/images/nodejs/openLocationApplication/queryStdout.png)

列表中的 `InstallLocation` 对应的地址就是 `Docker` 的安装位置。我们通过正则将其查出来。

![](/images/nodejs/openLocationApplication/dockerPath.png)

这一条就是我们想要的，但是这个只是 Docker 的安装目录，要启动 Docker 还要找到他的可执行文件，所以要在安装目录的地址上再拼上 `Docker Desktop.exe`。

找到这个 Docker 的可执行文件之后，接下来就简单多了。

直接启动！

```javascript
function setupDocker() {
  try {
    execSync(findDockerDesktop())
    console.log('Windows Docker Desktop started successfully!')
  } catch (error) {
    console.error((error as Error).toString())
  }
}
```

执行之后发现会报错……

```bash
'C:\Program' is not recognized as an internal or external command,
operable program or batch file.
Error: Command failed: C:\Program Files\Docker\Docker\Docker Desktop.exe
'C:\Program' is not recognized as an internal or external command,      
operable program or batch file.
```

这个错误的原因是路径中的 `C:\Program Files`，在执行这条命令的时候，终端把 `File` 及其之后的部分当成 `C:\Program` 参数了，要解决这个问题也很简单，把这个命令用字符串再包一层就可以了。

```javascript
function setupDocker() {
  try {
    execSync(`"${findDockerDesktop()}"`)
    console.log('Windows Docker Desktop started successfully!')
  } catch (error) {
    console.error(error.message)
  }
}
```

写到这里，基本就完成了整个功能的实现。如果要兼容 Mac 系统的话，可以再把最后的代码再小改一下。

```javascript
function setupDocker() {
  try {
    if (process.platform === 'darwin') {
      execSync('open -a Docker')
      console.log('Mac Docker Desktop started successfully!')
    } else {
      execSync(`"${findDockerDesktop()}"`)
      console.log('Windows Docker Desktop started successfully!')
    }
  } catch (error) {
    console.error(error.message)
  }
}
```

这次真的写完了，哦对了，我是个前端er……
