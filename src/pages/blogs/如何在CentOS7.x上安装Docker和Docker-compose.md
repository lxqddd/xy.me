---
title: 如何在 CentOS 7.x 上安装 Docker 和 Docker-compose
author: 向阳
pubDate: 2023-04-27
desc: 如何在 CentOS 7.x 上安装 Docker 和 Docker-compose
tag: 'CI/CD'
layout: '../../layouts/PostLayout.astro'
---

## 如何在 CentOS 7.x 上安装 Docker 和 Docker-compose

### 卸载旧版本的 Docker

```bash
yum remove docker docker-common docker-selinux
```

### 安装 yum-utils 包

```bash
yum -y update
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
```

### 安装 Docker

```bash
yum install docker-ce
```

### 验证是否安装成功

```bash
docker --version
```

### 设置开机启动

```bash
systemctl start docker		## 启动

systemctl status docker		## 查看状态

systemctl enable docker		## 开机自启动
```

### 设置 Docker 国内镜像

创建或修改 `/ect/docker/daemon.json` 文件

```json
{
  "registry-mirrors": [
    "https://hub-mirror.c.163.com", // 网易
    "https://mirror.baidubce.com" // 百度
  ]
}
// 镜像可能会失效
```

### 重启 Docker 服务

```bash
systemctl restart docker
```

### 查看配置是否成功

```bash
docker info

# 查看 Registry Mirrors 字段
```

### 安装 Docker-compose

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

### 赋予执行权限

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

### 创建软连接

```bash
ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

### 验证 Docker-compose 是否安装成功

```bash
docker-compose -version
```
