---
title: 设计模式之单例模式
author: 向阳
pubDate: 2023-07-25
tag: 'JavaScript'
description: JavaScript 单例模式 typescript
draft: true
---

单例模式是一种常见的设计模式，有一些对象我们往往只需要一个，比如线程池、全局缓存、浏览器中的 window 对象等。

在前端开发中，单例模式也有非常广泛的用途。比如，当我们点击一个按钮的时候，页面中会展示一个弹窗类型的提示信息，而且无论点击多少次，都展示同样的提示信息，这样的场景就适合用单例模式。

> 单例模式的定义是：保证一个类仅有一个实例，并提供一个访问他的全局访问点。

一个类仅有一个实例这个实例，这里的意思其实就是这个类只能被实例化一次，或者说是它只能有一个实例对象。全局的访问点对前端来说就是在文件中把这个类导出出去，让他在全局都能导入使用。

### JavaScript 中的单例模式

根据定义来看，在 JavaScript 中使用单例模式其实很简单。

首先，一个类仅有一个实例。在其它语言中，要创建一个对象，必须要先声明一个类，然后通过实例化这个类来得到一个对象，比如 Java。但是在 JavaScript 中，通过对象字面量可以直接声明一个对象。像这样：

```javascript
const obj = {
  name: '向阳'
}
```
第二点，为该对象提供一个全局访问点；这一点在 javaScript 中也很容易，直接把该对象声明在全局就好了。但是这样也会造成一些问题，比如变量命名污染。因此大多数时候会给这些全局对象加一个命名空间。像这样：

```javascript
const namespace = {
  obj1: {
    name: '向阳'
  },
  obj2: {
    age: '18'
  }
}
```

这样看来，在 JavaScript 中，使用单例，好像并没有必要去刻意的使用单例……

<!-- TODO 先写个草稿吧，或许以后对单例有更深的理解的时候再来继续写 -->

### 实现单例模式

要实现一个单例模式并不复杂，无非就是用一个变量，标记当前类是否已经被实例化过，如果没有，就进行实例化，并返回实例化对象，如果已经被实例化过，那就直接返回之前已经实例化过的实例对象。

接下来来看一个简单的实现：

```typescript
class Singleton {
  private static instance: Singleton | null = null

  private constructor(private _name: string) {
    this._name = _name
  }

  public static getInstance(name: string = ''): Singleton {
    if (!this.instance) {
      this.instance = new Singleton(name)
    }
    return this.instance
  }

  get name() {
    return this._name
  }
}
```
这就是一个简单的单例模式的模型，为了保证该类只能被实例化一次，我们把该类的构造器私有化，这样就不能在外部通过 `new` 的方式去实例化该对象了。在类的内部通过一个变量 `instance` 保存该类的实例对象。在外部通过 `getInstance` 访问该类的实例。

具体使用方法如下：

```typescript
// 访问 Singleton 的实例对象
Singleton.getInstance('xy')

// 访问 Singleton 的实例属性或方法
Singleton.getInstance('xy').name
```

第二次访问的时候，`getInstance` 的参数其实可传可不传，因为传了也没用……

我们来对比一下看看

```typescript
console.log(Singleton.getInstance('xy').name === Singleton.getInstance().name)
```

这是执行的结果
![design mode](/images/design-mode/design-mode1.png)

这种实现方式相对简单，但是有一个问题，就是增加了类的 `不透明性`。