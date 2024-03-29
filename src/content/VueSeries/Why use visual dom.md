---
title: 为什么要用虚拟 DOM ?
author: 向阳
pubDate: 2022-08-14
tag: 'Vue'
description: 为什么要用虚拟 DOM ?
---

## 什么是虚拟 DOM？

说得简单一点，它就是一个对象，包含 `tag`、`props`、`children` 三个属性。

接下来大家思考两个问题：

1. 相比于通过原生 js 去操作 DOM，通过虚拟 DOM 来实现 DOM 的增删改查，它的性能真的更好吗？
2. 如果通过通过虚拟 DOM 操作 DOM 的性能并不比原生 js 操作 DOM 性能好，那么为什么 Vue 还要选择使用虚拟 DOM 呢？

## 操作 DOM 的几种方式

通常，我们在操作一个 DOM 结构的时候会有哪几种方式？

1. 通过原生 js，精确地选中我们要操作的 DOM 节点，然后对其进行相应的操作。

比如我们要修改一个 div 节点的内容，就需要这样做

```javascript
const div = document.getElementById('div')
div.innerText = 'hello world'
```

这样我们就把 div 这个元素中的内容修改为 `hello world`。

2. 第二种方式是通过一个 html 模板字符串去创建一个节点，替换当前节点，这种方式在 jQuery 时代是非常常用的。

```javascript
const htmlTemplate = `<div>hello world</div>`
wrap.innerHTML = htmlTemplate
```

这样也能达到同样的目的。

3. 第三种就是通过虚拟 DOM 的方式进行修改了

```javascript
const virtualDOM = {
  tag: 'div',
  children: [{ children: 'hello world' }]
}

// render 函数将虚拟 DOM 创建为真实 DOM ，并将其插入到文档中
render(virtualDOM)
```

对比以上三种方法，你觉得哪种方法的性能最好呢？

很显然是第一种，选中要修改的元素，直接修改其内容。

其次应该是第三种方法，为什么不是第二种呢？因为在通过虚拟 DOM 修改 div 的内容的时候，可以通过 diff 算法，来最小化的修改变更的内容。对于上边的案例来说，只是 div 的内容发生了变化，而 div 元素本身并没有修改任何东西，所以对于通过虚拟 DOM 修改 div 内容的时候，div 标签不会被重新创建。而使用 html 模板字符串的方法，则会对模板中的所有节点进行重新创建。

我们都知道，对于浏览器来说，创建 DOM 的过程是非常耗时的。所以，相比之下第三种方式的性能要更优于第二种，并且，html 模板字符创越大，这种性能上的差别就会越明显。

那第一种方法和第三种方法的比较呢？

理论上，第一种方法的性能已经是最好的了，因为没有任何其他额外的操作去消耗性能了。相比于第一种方法，虚拟 DOM 多做的一件事是虚拟 DOM 对象的创建以及修改目标的查找。但是呢，这个过程是纯 javascript 层面的计算，所以虽然两种方式有的性能上会有差异，但是并不会差别很大。毕竟相较于 DOM 层面的计算，JavaScript 层面计算带来的性能差异几乎可以忽略不计了。

到这里，我们已经明白了，很显然，虚拟 DOM 的性能并不比通过原生 js 操作 DOM 的性能更好。

那么问题来了，既然如此，Vue 为什么还要选择使用虚拟 DOM 呢？

## 心智负担

这就不得不说这几种方式带来的心智负担了。

我就问一个问题，现在让你去用原生 js 去实现页面 DOM 的增删改查操作，你愿意吗？

我相信，如果你的 leader 真的让你这么做，你绝对会吐他一脸，然后撂挑子不干了。明明已经有了飞机大炮，你却还让我去跟敌人拼刺刀？

所以，选用虚拟 DOM 的原因几乎已经明确了。

1. 还不错的性能，虽然比不上通过原生 js 操作 DOM 的性能，但是也没差太多，能保证性能的下限。
2. 心智负担小，毕竟操作虚拟 DOM 其实操作的只是一个对象。而操作对象对我们来说比一个一个选中 DOM ，修改 DOM 简单太多了，因为只需要关心数据嘛。

希望讲解的内容能对大家有所帮助~

如果有更多其他想了解的内容欢迎关注 **大话前端**，给我留言，我们一起交流讨论~

<div style="text-align: center;">
  <img src="https://img.soogif.com/5HkHKKxGJ6ZmhQ7c8nLYOE9jfEXDpqp4.gif?scope=mdnice">
</div>
