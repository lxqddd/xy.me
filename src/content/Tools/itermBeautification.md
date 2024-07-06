---
title: iterm2 美化教程
author: 向阳
pubDate: 2024-07-06
tag: 'Tools'
description: iterm2 美化教程
---

## 安装 oh-my-zsh

1. 使用curl安装
```sh
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```
2. 使用wget安装

```sh
sh -c "$(wget https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
```
安装之后的效果如图

<!-- ![](https://files.mdnice.com/user/17954/3a3f78ec-fee8-443b-a66e-9b0b432ed958.png) -->
![](/images/tools/iterm/zsh-install.webp)

## 下载powerlevel10k主题

```sh
cd ./.oh-my-zsh/themes
git clone  https://github.com/romkatv/powerlevel10k.git
```

使用p10k主题

```sh
vi ~/.zshrc
# 修改ZSH_THEME
ZSH_THEME="powerlevel10k/powerlevel10k"
```

## 安装语法高亮和自动补全插件
```sh
cd ~/.oh-my-zsh/custom/plugins/
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git
git clone https://github.com/zsh-users/zsh-autosuggestions
```

修改.zshrc文件

```sh
vi ~/.zshrc 
plugins=(
     git
     zsh-syntax-highlighting
     zsh-autosuggestions
)
```

## 使用默认主题
关闭p10k配置向导
```sh
POWERLEVEL9K_DISABLE_CONFIGURATION_WIZARD=true
```

## 配置效果

![](/images/tools/iterm/result.webp)
