---
title: 代码规范
author: 向阳
pubDate: 2021-10-08
tag: 'Tools'
description: 前端代码规范
---

聊聊代码风格的问题吧，因为我真的是遇到了！

<div align="center">
   <img src="https://files.mdnice.com/user/17954/683ee850-41c5-48f4-8828-7e8f4a318048.png" class="expression">
</div>

在日常的开发维护过程中，肯定会有接手别人代码的情况，当你打开别人写的代码的时候，第一件事是干吗？

读代码？看逻辑？

我想说 No ！

作为一个对代码有点点洁癖的小码农，当我打开别人写的代码的时候我都要先看看代码的格式。

如果格式跟我的不一样，我对把它格式化成跟我一样的（团队最初的代码规范），可是这样并不能从根本上解决问题。其他一些队友，在开发的时候依旧是用的自己的代码风格，整个项目的代码风格还是乱七八糟的，而团队来了新成员之后，或许就会有新的代码风格。

或许你会说：用 ESLint 约束啊。其实是有 ESLint 的约束的，但是也会有人觉得这玩意儿麻烦，在开发的过程中直接把 ESLint 给关掉了。ESLint：……

<div align="center">
   <img src="https://files.mdnice.com/user/17954/971d0fc3-f3d8-49fa-9c14-abaeae368698.png" class="expression">
</div>

接下来就来讲讲如何根治这个问题叭……

<div align="center">
   <img src="https://files.mdnice.com/user/17954/9baf8e75-0692-44b0-a59e-4b6337287ea6.png" class="expression">
</div>

从 0 开始讲起，以 Vue 项目为例，因为我们的项目是 Vue。

![](https://files.mdnice.com/user/17954/57170e85-1cc2-4bf7-81ee-e5b3516f9ca5.png)

做的绝一点，在创建项目的时候把这一项取消勾选。

这样就创建出来一个对代码风格没有任何约束的 Vue 项目。

开始上枷锁！

<div align="center">
   <img src="https://files.mdnice.com/user/17954/b28030db-17a5-448b-bece-244d7847ac40.png" class="expression">
</div>

### ESLint

首先要配置的肯定是 ESLint

> ESLint 是一个开源的 JavaScript 代码检查工具。常用于寻找有问题的模式或者代码，并且不依赖于具体的编码风格。

好了，现在知道他是干嘛的了，开始搞吧，把他整到我们的项目里。

先安装

```shell
npm i eslint -D
```

执行如下的命令

```shell
npx eslint --init
```

对 ESLint 做初始化

![](https://files.mdnice.com/user/17954/441a9789-75dd-4b8d-a9fb-e7721e4c929e.png)

在初始化的过程中，会提示我们做一下初始化的配置，这里我们先第三个（检查语法，发现问题并强制执行代码风格）

下一步
![](https://files.mdnice.com/user/17954/7888c1a7-a508-4b25-8598-40e584827e5d.png)
他又问题你，你使用的是那种模块类型，我们使用的就是 `import/export`

接下来问你使用的是那种框架
![](https://files.mdnice.com/user/17954/92e3e2ed-7d3e-44a6-9442-39f9af01cc60.png)
根据实际情况，我这里使用的是 Vue，那我就选择 Vue。

项目里有没有使用 TypeScript ？
![](https://files.mdnice.com/user/17954/1249ea3c-031a-44c2-a16d-6933e2be5e54.png)
我这里没有，就选 No

你的项目运行在哪里？
![](https://files.mdnice.com/user/17954/280ae050-18e0-4914-9409-f9a2d8c30c24.png)
我这里是都给选上了。

你想为你的项目怎样定义风格？
![](https://files.mdnice.com/user/17954/ecc807b5-190f-4167-b76e-6af304d2ede1.png)
个人建议，直接选择一种流行的风格，毕竟能流行起来，肯定是有他的原因的，自己就别搁那瞎折腾了。

![](https://files.mdnice.com/user/17954/fa538049-07d4-4580-ba25-4a571fefe4eb.png)
我这里选择第一种，Airbnb 的代码风格，emmmm，用了都说好！

另外两种：

- standard：注意，他只是名字是 standard，而他本身并不是 standard，他的校验相对于 Airbnb 来说会宽松一些，个人开发的话可以选择这一种，团队的话还是更严格一点比较好。
- Google：谷歌的出的一份代码风格。

你希望你的配置文件是什么格式？
![](https://files.mdnice.com/user/17954/b8f1c9bb-b629-40ba-8ab9-2d590ec3e970.png)
选 JavaScript 就可以，初始化的配置会保存在这个文件里。

是否现在用 npm 安装这些依赖？
![](https://files.mdnice.com/user/17954/515ad923-5687-4ab1-ac15-0ad2e156cb33.png)

肯定的啊，给我安装！
![](https://files.mdnice.com/user/17954/03ff12eb-6ccc-4be0-b582-a1cebbb8f8c7.png)
这就是初始化之后生成的配置文件。

我们要添加的规则，都在 rules 这个配置项中。

PS：在拓展工具里边安装以下 ESLint 的插件，不然不会有错误提示。
![](https://files.mdnice.com/user/17954/5116b337-20f4-4c0f-82fd-875e0fb51ef4.png)
就是这个玩意儿。

ESLint 更关注的是代码的质量，对于代码的美观程度的要求就没有那么的严格，所以这里我们要借助另一个工具，Prettier 来做这件事。

### Prettier

Prettier 声称自己是一个有主见的代码格式化工具，他认为代码格式很重要，但又很麻烦，所以，他帮我们制定了一套规则。让我们不再纠结用单引号还是用双引号、用 tab 还是用 space。Prettier 已经帮我们搞好了。Prettier 大部分规则是不可配置的，因为他是一种 opinionated code formatter 工具，但是他还是暴露出来了一部分选项，可以通过 `.prettierrc` 这个文件来配置。

在使用之前还是要先在你的 ide 里边安装以下 Prettier 的插件
![](https://files.mdnice.com/user/17954/75375307-b69e-467f-9387-e6670e7d2e8e.png)
VSCode 里边是这一个，WebStorm 则不需要额外的配置安装。

接下来开始将 Prettier 集成到我们项目中

第一步，肯定还是要安装

```shell
npm i prettier -D
```

接着，在你的项目根目录下创建一个名为 `.prettierrc` 的文件。在这个里边对你想要的样式做一些配置，通常做的都是一些代码结尾要不要分号啊、单引号还是双引号啊这些。下边这个是我常用的配置，供大家参考。

```json
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "none",
  "bracketSpacing": true,
  "semi": false
}
```

在写代码的时候我不喜欢写分号，喜欢用单引号，所以就将 semi 设置为 false，singleQuote 设置为 true。

在这里再教给大家一个小技巧，当我们装完 ESLint 这个插件之后，打开 VSCode 的 settings 文件，在里边加上这个配置：

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

加上之后，你再保存代码的时候他就会按照当前项目中的配置文件，自动帮你格式化代码。（不生效的话，重启一下你的 VSCode）

但是在实际使用的时候你会发现可能会有一些小问题，保存之后，他可能会先按照 Prettier 的规则格式化一遍，又按照 ESLint 的规则格式化一遍，大部分情况下，直接配置 ESLint 和 Prettier，他们的部分规则是有冲突的。那咋整？解决冲突呗……

我们要用到两个插件：

- `eslint-plugin-prettier`: 这个插件是将 Prettier 的规则设置到 ESLint 中。
- `eslint-config-prettier`: 这个插件是关闭 ESLint 中于 Prettier 发生冲突的规则。

好了，开始安装

```javascript
npm i eslint-plugin-prettier eslint-config-prettier -D
```

安装完成之后，在 ESLint 的配置文件中加入 Prettier 的插件。
![](https://files.mdnice.com/user/17954/b26d3780-9f19-48cd-ada8-8ff777693304.png)
这样即可。

配上 Prettier 官网的链接：

> https://prettier.io/

为了适配团队中不同队友不同的 ide，我们还需要引入另一个东西。

### EditorConfig

什么是 EditConfig？

下边是官方给出的解释

> EditorConfig 可以帮助在不同的编辑器和 ide 中为同一个项目工作的多个开发人员维护一致的编码风格。EditorConfig 项目包括一个用于定义编码样式的文件格式和一组文本编辑器插件，这些插件使编辑器能够读取文件格式并遵循定义的样式。EditorConfig 文件易于阅读，并且可以很好地与版本控制系统协同工作。

说白了，其实就是有助于维护不同开发人员不同 ide 代码风格的统一。

这里给出一个常规的配置

```.prettierrc
# 表示是最顶层的 EditorConfig 配置文件
root = true

[*] # 所有文件适用以下配置
charset = utf-8 # 将文件编码字符集为 utf-8
indent_style = space # 设置缩进风格为space（tab | space）
indent_size = 2 # 设置缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行首的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false
```

这里给出 EditorConfig 的官网地址

> http://editorconfig.org

对了，配置 EditConfig 之后，如果你是 VSCode 用户，需要在 EditorConfig 中装以下这个插件，戴眼镜的小老鼠

![](https://files.mdnice.com/user/17954/235d7744-862f-47c1-bedd-685258f1e53b.png)

如果你是 WebStorm 用户，则可以直接使用。

### lint-staged 和 husky

基本的配置已经完成，我们团队中的配置差不多也是这样的。可是这并没有什么约束力。在开发的时候觉得规则太多，烦的慌。完全可以把这些规则都给关掉，这并不影响开发。

接下来就要解决如何对这些规则做出一些强约束，至少保证提交到代码仓库中的代码风格都是统一的。

- lint-staged：在 git 暂存的文件上运行 linters
- husky: 一个 Git Hook 工具，可以设置在 git 的各个阶段，比如 `pre-commit`, `commit-msg`, `pre-push`等。我们可以在各个生命周期做一些操作。

接下来，我们开始配置 husky

```shell
npx husky-init && npm install
```

这个命令做了这么几件事

1. 将 husky 作为开发依赖进行安装
   ![](https://files.mdnice.com/user/17954/7069997e-6960-43da-acea-2fb20a93ad52.png)

2. 在项目的根目录下创建一个名为 `.husky` 的目录。
   ![](https://files.mdnice.com/user/17954/d22d7d6c-021c-4c1b-b6c9-b9753bd515de.png)

3. 在 `.husky` 目录下初始化一个 `pre-commit` 的 git hook，并将内容初始化为 `npm test`。
   ![](https://files.mdnice.com/user/17954/d674ce1f-23ec-46f0-9380-f92fb5dbe770.png)

4. 在 `package.json` 的脚本中新增一个 `prepare` 的脚本。
   ![](https://files.mdnice.com/user/17954/30ada8e5-3385-405e-b8f5-d2a7ce590d2a.png)

接下来，我们需要在 `package.json` 的脚本中新增一个自定义脚本，用于校验并且自动修复项目中的 ESLint 错误。
![](https://files.mdnice.com/user/17954/e627b68c-8b55-43db-b7d7-005eaeecd343.png)
这句命令的意思是通过 ESLint 修复 src 目录下的 拓展名为 vue 和 js 的文件。

你可以现在终端通过 `npm run lint-fix` 执行以下这条命令看一下效果。
![](https://files.mdnice.com/user/17954/d2e9126d-a05a-419a-9bce-1a1369038b0a.png)

注意：ESLint 的自动修复并不是万能的，他只能修复一些低级的格式问题，比如：函数名后的空格、语句结尾的分号、单双引号等问题。超出他能力的问题他会报出来，我们还是需要去手动修复。

接下来强硬的手段开始了

修改 `pre-commit` 这个 git hook 中的内容
![](https://files.mdnice.com/user/17954/b9fa9bde-fb4b-4182-ad5a-506c4c762667.png)

修改后我们可以试一下提交代码
![](https://files.mdnice.com/user/17954/fa9dea32-172b-4f77-a0f7-aef5daa2ea73.png)

我们可以看到，在 commit 的时候，首先会去去执行以下我们配置的脚本，校验以下 代码风格，如果成功，代码才能被 commit，如果失败……我们还是来演示以下叭！
![](https://files.mdnice.com/user/17954/66f7d422-2b45-4c37-8ca2-859729061cf6.png)

在 main.ts 中创建一个变量 a，保存，然后重新提交代码。
![](https://files.mdnice.com/user/17954/bd82fba5-f606-49d6-9e44-2bd63d292a02.png)

这是执行后的结果，因为变量 a 在声明之后，并没有修改，所以 ESLint 在修复的时候将其改为 const 声明。另一个问题是变量 a 声明了，但是并没有被使用。这种问题就是超出 ESLint 自动修复能力范围的问题。他能怎么办，他总不能自动删代码叭！

<div align="center">
   <img src="https://files.mdnice.com/user/17954/66c0ba2b-dc4d-4f9d-a882-00060b3fe042.png" class="expression">
</div>

说了还有 `lint-staged`，但是到现在已经快全剧终了都还没有用到，那就说明现在的实现肯定还是有些不足的。

那具体是什么问题呢？分析一下看看

当我们在提交代码的时候，执行 `lint-fix` 这个脚本，他会去 lint 整个工程中的代码，不管是不是咱自己写的，一股脑都给来一遍，先不说耗时的问题，其他未修改的历史文件中检测数来的 ESLint 问题可咋办呐。

<div align="center">
   <img src="https://files.mdnice.com/user/17954/eb033851-0232-4741-8b44-da1cac59131a.png" class="expression">
</div>

这个时候就可以使用 `lint-staged`，它可以让 husky 的 hook 触发的命令只作用于添加到暂存区的代码。

将 `lint-staged` 作为开发依赖进行安装

```shell
npm i lint-staged -D
```

在 `package.json` 中添加如下配置
![](https://files.mdnice.com/user/17954/e69a307c-2966-4eea-87d1-d7674def0375.png)

为了方便 CP，嘿嘿

```json
{
  "lint-staged": {
    "*.{vue,js}": "eslint --fix"
  }
}
```

接下来重新将 `pre-commit` 中的内容修改一下
![](https://files.mdnice.com/user/17954/1fd58e63-8c9d-4feb-9836-6a4888391f91.png)

再试一下提交代码
![](https://files.mdnice.com/user/17954/b3ddac3b-cd89-4e0c-a23d-70f6a5c85560.png)
还是刚刚 `main.ts` 中的代码，当代码有问题的时候，commit 就会失败。

将 a 的声明删掉之后，提交成功。

至此，所有的配置全部完成。

<div align="center">
   <img src="https://files.mdnice.com/user/17954/e38b5493-153d-4282-89a4-8b7df156a85a.png" class="expression">
</div>

其实上边所有的配置都可以在 Vue 项目创建的时候进行选择配置，但是我们的项目在一开始并没有做这些配置，所以只能手动来一遍了。

<div align="center">
   <img src="https://files.mdnice.com/user/17954/51ed15ab-07dd-49f2-ac06-2aa49567df41.png" class="expression">
</div>

如果觉得内容对你有用的话，欢迎关注哦~
![](https://img.soogif.com/5HkHKKxGJ6ZmhQ7c8nLYOE9jfEXDpqp4.gif?scope=mdnice)
