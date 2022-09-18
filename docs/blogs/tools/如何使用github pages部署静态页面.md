---
title: 如何使用github pages部署静态页面
author: 向阳
date: 2021-08-22
---

## 为什么写这篇文章

- 相信很多小伙伴都有过这样的经历，自己写了一个项目，想要展示给别人，炫一下，但是苦于没有自己的服务器而一直没有部署的机会。而 GitHub Pages 就给我们提供了这么一个平台。

今天我就以 Vue 项目为例，介绍一下如何使用 GitHub Pages 去部署一个静态项目。

话不多说，直接上干货

## 提交代码到 github

- 这里我默认大家都是有自己的项目的

1. 代码提交之后，我们进入到 settings 下边来
   ![](https://files.mdnice.com/user/17954/c9c28798-b103-4c74-b5a3-8d88285b4c97.png)

2. 选中 pages
   ![](https://files.mdnice.com/user/17954/3b19b0d8-99ac-4c87-8f88-ab37cf346da7.png)

3. 选中我们的代码提交的分支，通常都是在 `master` 分支
   ![](https://files.mdnice.com/user/17954/d663b2ef-c8be-4322-9fd4-b55b3d7f5c7f.png)
   选中之后，我们的代码会被部署到一个静态的 web 服务器下边来，至于是什么样的 web 服务器，这俺也不知道……
   ![](https://files.mdnice.com/user/17954/b1695daf-49ca-468a-9e7e-bd1eed8f4ed0.png)
   这里他会把网站的根目录放在服务器的 `www`目录下，也可以选择将 `docs` 这个目录放在 `www` 目录下，通常如果部署的是一个个人博客网站的话会选择使用 `docs`，但我们这里显然不是，所以就用默认的就好。

4. 点击 save
   ![](https://files.mdnice.com/user/17954/23d8ebdd-d846-4534-83f8-734669801d8f.png)
   这里给我们返回了一个链接，我们可以通过这个链接访问到我们刚刚部署的项目。
   ![](https://files.mdnice.com/user/17954/66ab04a6-2b33-4d6e-964b-62cf148e509a.png)
   点开一看，发现好像不对劲儿，这好像并不是我部署的项目啊，但是又有点似曾相识的赶脚，没错他是我们项目里 readme.md 里边的内容。（别打我，我是故意写一个错的给你们看的，狗头保命）

那这到底是问什么呢？

如果你去看 GitHub pages 的文档的话，他里边是有说的，你的项目里边需要有一个 `index.html` 文件，它会把这个文件当作你网站默认的首页。如果没有的话，就会把 `readme.md` 转化成网页的形式，作为首页展示给我们。

那如何解决这个问题呢？且看下文继续讲解

之前提交代码的时候我们的代码是没有打包的，对吧。这会儿咱先回去给他打个包。

打包之后，重新提交。这会儿你又会想了，通常打包之后产生的 `dist` 目录不是不要提交的吗？

都坐下，听我讲！

打完包之后先检查一下你的 `.gitignore` 这个文件里边是否有 `dist` 这个目录，有的话，给他删掉先。

然后把打包之后的代码提交上去。

通过这条命令，创建一个 `gh-pages` 分支，作为当前分支的子分支，也就是 `master` 分支的子分支，并将 `dist` 推送进去。

```shell
git subtree push --prefix dist origin gh-pages
```

这样就多了一个分支出来，并且里边的内容都是打包之后的内容。
![](https://files.mdnice.com/user/17954/4a0e333d-0369-4045-a5e0-636755167683.png)

现在重新进入到 `settings` 的 `pages` 里边，将分支切换成我们刚刚创建的新分支。
![](https://files.mdnice.com/user/17954/6073d976-9d80-47fb-8f6a-940b09805542.png)

再保存瞅瞅！还是老的，清空缓存强制刷新一下。
![](https://files.mdnice.com/user/17954/1a52b314-83e2-41c5-8b7a-24f7686337c6.png)

啥也没有了，东西哪去了！！！

打开控制台，what！！！

为什么会报一堆 404！！！

打开 network 瞅瞅
![](https://files.mdnice.com/user/17954/8e13cc4c-9b54-43fd-9bed-28fa114ef056.png)
好家伙，引用资源一个都没有加载进来。

一番摸索之后终于发现了问题所在
![](https://files.mdnice.com/user/17954/eb6ad930-18eb-43ab-b00c-465b31263df3.png)
在加载资源的时候路径不对。发现问题--> 解决问题！

![](https://files.mdnice.com/user/17954/6313aaca-71a8-4dd2-bda0-5a2647e08db3.png)
在 `vue.config.js` 这个配置文件中添加这个配置，然后重新打包。
![](https://files.mdnice.com/user/17954/c65369a1-9ce3-49c3-8e0f-a0bbe9c39839.png)
这个时候打包出来的文件引用资源的时候就加上了项目根目录的绝对路径。

按之前的流程，重新提交一下代码，记得要把打包后的代码提交到 `gh-pages` 这个分支上！

提交之后重新刷新之前的链接，记得清空缓存刷新！！
![](https://files.mdnice.com/user/17954/27f501c6-78bd-49f9-93b1-0b14fd6b18d0.png)
经过九九八十一难，终于成功部署！！！
![](https://files.mdnice.com/user/17954/0d3e7dd6-6de2-4198-900d-780ae072494d.png)

不说了。

![](https://files.mdnice.com/user/17954/76e27350-3eb1-45f7-bc0e-42940457eaec.png)

<Plum />
