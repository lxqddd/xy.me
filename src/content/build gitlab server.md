---
title: 如何搭建一个gitLab服务器
author: 向阳
pubDate: 2023-02-02
description: 如何搭建一个gitLab服务器
tag: 'CI/CD'
layout: '../../layouts/PostLayout.astro'
---

> 前端不只是前端

## 准备工作

你需要先准备一台服务器，云服务器或者是虚拟机都可以。但是 gitlab 比较吃内存，1 核 2
G 的服务器根本不够用，至少要 2 核 4G。因此，如果只是学习的话，我推荐使用虚拟机。

下载 VMware，下载地址 `https://www.vmware.com/products/workstation-pro/workstation-pro-evaluation.html`

安装很简单，无脑下一步就行。

安装完成之后需要在准备一个 CentOs 系统的镜像，我用的是 CentOs7，这是系统镜像的下载地址(`https://mirrors.aliyun.com/centos/7.9.2009/isos/x86_64/CentOS-7-x86_64-DVD-2009.iso`)。

有了 VMware 和 CentOs 的系统镜像之后，就可以安装虚拟机了。

打开 VMare，点击菜单栏中的选择，菜单中会有一个新建虚拟机的选项，选中之后会出现如下页面。
<img class="self-pic" src="https://files.mdnice.com/user/17954/6f5cca7a-0402-4404-833a-afe3becab116.png" />

<!-- ![](https://files.mdnice.com/user/17954/6f5cca7a-0402-4404-833a-afe3becab116.png) -->

直接选择下一步，会让我们选择虚拟机硬件兼容性，直接下一步就行。
<img class="self-pic" src="https://files.mdnice.com/user/17954/fd045928-6c62-4d7a-85ce-b1f7bb80b093.png" />
在这里我们选择安装程序光盘映像文件，文件地址就是刚刚下载的 CentOs 镜像的地址。

再下一步会让我们输入用户名和密码，这里自己填一个自己记得住的就可以。
<img class="self-pic" src="https://files.mdnice.com/user/17954/abde9be1-1849-4269-9d2c-8cc093d7724f.png" />
继续下一步，修改一下虚拟机名称，这个名称会显示在目录中。

<img class="self-pic" src="https://files.mdnice.com/user/17954/d24a27eb-1aa3-453d-813c-e1a9a325d0a4.png" />

选择处理内核数量

<img class="self-pic" src="https://files.mdnice.com/user/17954/a432ea08-7d7b-4f97-b7c5-10bbf0743dc0.png" />

接下来选择内存，我选的 4G，稍微大一点，如果电脑内存比较小的话设置成 2G 也可以。

<img class="self-pic" src="https://files.mdnice.com/user/17954/d1b3f61e-2421-4b64-bba4-62ce0fadf596.png" />

一直下一步倒修改磁盘大小这里，我给的是 40G，默认大小也可以。

<img class="self-pic" src="https://files.mdnice.com/user/17954/6c72f16b-2c7a-4415-842a-3321af2d1da0.png" />

然后一直下一步，直到完成，然后自动安装镜像。

系统安装完成之后我们需要修改一下 yum 源，yum 源本身的站点在国外，在国内使用的时候会很慢，所以我们要将其修改为阿里云源。

首先备份一下原来的 yum 文件

```bash
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo_bak
```

然后下载阿里云源

```bash
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
# 或
curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
```

下载完成之后清空原本的 yum 缓存

```bash
yum clean all
```

最后生成新的阿里云的 yum 缓存

```bash
yum makecache
```

到这里，我们的准备工作就完成了。

## 安装并配置 gitLab

1. 安装基础依赖

```bash
sudo yum install -y curl policycoreutils-python openssh-server
```

启动 ssh 服务，并设置为开机启动

```bash
systemctl enable sshd
systemctl start sshd
```

2. 安装 Postfix

Postfix 是一个邮件服务器

```bash
yum install postfix
```

启动 Postfix，并设置为开机启动

```bash
systemctl enable postfix
systemctl start postfix
```

3. 放开 80 端口

放开 ssh 和 http 服务

```bash
firewall-cmd --add-service=ssh --permanent
firewall-cmd --add-service=http --permanent
```

放开之后需要重载防火墙规则，不然不生效

```bash
firewall-cmd --reload
```

4. 安装 gitLab

yum 中是没有 gitLab，因此，我们首先要添加一个 gitLab 社区版的 Package。

```bash
curl https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.rpm.sh | sudo bash
```

添加完成之后直接使用 yum 进行安装。

```bash
yum install -y gitlab-ce
```

成功安装完成之后，我们会看到一个 gitLab 的 logo 图案。

完成之后我们需要配置一下 gitLab 站点的 url，默认的路径是 `http://gitlab.example.com`

打开配置文件

```bash
vim /etc/gitlab/gitlab.rb
```

修改这个地址为你自己的服务器 ip 地址或者自己有域名的话解析一下改成域名也可以。

<img class="self-pic" src="https://files.mdnice.com/user/17954/3a63baf8-cb2d-46a9-b799-3cdfd10b82b8.png" />

修改完成之后按 `:wq` 退出。

然后重新配置并启动 gitLab。

```bash
gitlab-ctl reconfigure
```

这个过程可能要稍微等待一会儿，完成之后会在终端输出如下内容。

```txt
Running handlers complete
Chef Client finished, 432/613 resources updated in 03 minutes 43 seconds
gitlab Reconfigured!
```

到这一步我们的 gitLab 就可以访问啦！

在浏览器中输入一下刚刚在配置文件中设置的地址，打开之后发现会让我们先登录，懵逼了，账号密码不是没设置吗？也没注册啊，咋就让登录哪？

别急~

gitLab 会自动给我们初始化一个随机密码，这个密码被放在 `/etc/gitlab/initial_root_password` 中，我们可以通过 `cat /etc/gitlab/initial_root_password` 进行查看。

<img class="self-pic" src="https://files.mdnice.com/user/17954/727e649c-28b7-4507-afa3-b4311b67c378.png" />

红框中的内容就是 gitLab 给我们的初始化密码，这个密码在我们登录进去之后是可以修改的，登录的用户名则默认是 root。

通常 gitLab 都会作为公司内部的私域服务，所以我们要把 gitLab 注册的功能给关掉。

进入到 `Admin Area`，选中 Settings 下的 General，找到 Sign-up restrictrions。

<img class="self-pic" src="https://files.mdnice.com/user/17954/7825bd64-1d00-4f4c-a24f-6828b216d40a.png" />

把注册的入口关掉就可以了。

到这里，一个基础的 gitLab 服务器就基本搭建完成了。

如果文中有说的不对或者模糊的地方，欢迎留言斧正~

### 参考文献

[1] `https://developer.aliyun.com/article/906053`
