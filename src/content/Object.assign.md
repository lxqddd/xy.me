---
title: 你真的了解Object.assign()吗？
author: 向阳
pubDate: 2022-01-23
tag: 'JavaScript'
 
---

# 你真的了解 Object.assign()吗？

`Object.assign()` 这个方法在开发的时候算是用的比较多的一个方法了，使用他的场景大概也就是合并两个或多个对象。但是最近在看红宝书的时候发现在使用这个方法的时候可能会出现一些意料之外的结果，这是我之前不了解的，所以今天也拿出来分享给大家。

## 红宝书官方定义

ECMAScript6 专门为合并对象提供了一个 `Object.assign()` 方法。这个方法接收一个目标对象和一个或多个源对象作为参数，然后将每个源对象中**可枚举**(`Object.propertyIsEnumerable()` 返回值为 `true`)和 **自有** (`Object.hasOwnProperty()` 返回 `true`) 属性复制到目标对象。以字符串和符号为键的属性会被复制。对每个符合条件的属性，这个方法会使用源对象上的 `[[Get]]` 取得属性值，然后使用目标对象的 `[[Set]]` 方法设置属性值。

emmmm，以上的定义是我照着红宝书一个字一个字敲出来的 😅。

## 自己的一点理解

1. `Object.assign()` 是 ES6 提供的一个用来合并对象的方法。
2. 这个方法可以接收一个或多个对象作为参数，第一个参数作为返回的目标对象，剩余的参数作为源对象。
3. 在从源对象向目标对象复制属性的过程中，只会复制源对象中属性描述符 `enumerable` 值为 `true` 并且是源对象本身而非原型上的属性。
4. 复制的时候以 `getter` 获取源对象的属性值，以 `setter` 在目标对象上存入该值。

## 上代码

密集的文字，在阅读的时候总是会让人觉得乏味，我更喜欢看代码！

首先， `Object.assign()` 这个方法是用来合并对象的，这应该没啥疑问的。

```javascript
const obj1 = {
  name: '向阳'
}

const obj2 = {
  age: '18'
}

const dest = Object.assign({}, obj1, obj2)
console.log(dest)
```

![](https://files.mdnice.com/user/17954/4f097e11-3955-4386-bd9a-d70734b895d3.png)

重点不在这里，在后边的内容~

再来看一段代码

```javascript
const person = {}

Object.defineProperty(person, 'name', {
  value: '向阳'
})

const dest = Object.assign({}, person)
console.log(dest)
```

首先创建一个空对象 `person`，然后通过 `Object.defineProperty()` 这个方法给 `person` 对象上边添加一个属性 `name`，属性值为 `向阳`。

接着使用 `Ojbect.assign()` 将 `person` 作为源对象和一个空的目标对象进行合并。
![](https://files.mdnice.com/user/17954/0c762212-8271-41f4-8f38-7de40687a054.png)

咋是个空对象？
![](https://files.mdnice.com/user/17954/48bdc69c-fa23-4cd2-81ff-f1d399d59c96.png)
是的，你没看错，这就是合并后的结果，通过 `Object.definedProperty()` 定义出来的属性，如果不设置的话，属性描述符 `enumerable` 默认为 `false`，而根据定义，不可枚举的属性是不能被复制滴~。

也可以通过 `Object.getOwnPropertyDescriptors()` 打印一下看看现在 `person` 各个属性描述符对应的值。
![](https://files.mdnice.com/user/17954/36586cdf-c52e-44c0-8155-58fc7f3e54a7.png)
全是 `false`。

```javascript
const person = {}

Object.defineProperty(person, 'name', {
  value: '向阳',
  enumerable: true // 将属性设置为可枚举
})

const dest = Object.assign({}, person)
console.log(dest)
```

现在将该属性的 `enumerable` 设置为 `true`，再来看看结果
![](https://files.mdnice.com/user/17954/76fcfcc3-892d-4a48-b732-fe7ae620d2b4.png)
✌🏻，已经能够正常合并了。

因为合并的过程是通过 `getter` 获取的源对象的属性值，通过 `setter` 对目标对象的值进行设置，结合这两个特性，咱再来看看另一种情况。

```javascript
const src = {}

Object.defineProperty(src, 'name', {
  enumerable: true, // 将属性设置为可枚举
  get() {
    return '向阳'
  }
})

const target = {}
Object.defineProperty(target, 'name', {
  enumerable: true,
  get() {
    return this.store_name
  },
  set(val) {
    console.log(val)
    this.store_name = val
  }
})

target.name = '夜殇'

const dest = Object.assign(target, src)
console.log(dest)
```

通过 `getter` 函数和 `setter` 函数来访问和设置对象的属性值，现在再来看一下结果。
![](https://files.mdnice.com/user/17954/0ebf35a0-cc4d-4d30-a5dd-e0f3325edc9d.png)
也是没有问题的，能正常合并；现在再来修改一下两个对象中 `getter` 函数和 `setter` 函数的内容。

```javascript
const src = {}

Object.defineProperty(src, 'name', {
  enumerable: true, // 将属性设置为可枚举
  get() {
    return '向阳'
  }
})

const target = {}
Object.defineProperty(target, 'name', {
  enumerable: true,
  get() {
    return this.store_name
  },
  set(val) {
    console.log(val)
    this.store_name = '夜殇'
  }
})

const dest = Object.assign(target, src)
console.log(dest)
```

将目标对象 `target` 中 `name` 属性的 `setter` 函数做一下修改，不管后边对 `name` 属性如何赋值，我们都将其设置为 `夜殇`。现在再来看看输出的结果。
![](https://files.mdnice.com/user/17954/3074fdf4-0d6d-4cf1-8181-17e39bb95533.png)
我们可以看到，目标对象中 `setter` 函数中的 `val` 值仍然是 `向阳`，但是合并后的结果却是 `夜殇`。

当然，这种情况应该是比较少的，或者应该说不应该会有这种代码出现在我们的代码中，万一真的有这种代码，这里也算是提供了一种调试的思路 😄。

说起来这种还算是正常的，如果对象的 name 属性的 `getter` 函数或是 `setter` 函数中抛出了一个异常，那 😱……合并就会报错。

来试一下呗……

```javascript
const src = {}

Object.defineProperty(src, 'name', {
  enumerable: true, // 将属性设置为可枚举
  get() {
    throw new Error('merge error')
  }
})

const target = {}
Object.defineProperty(target, 'name', {
  enumerable: true,
  get() {
    return this.store_name
  },
  set(val) {
    console.log(val)
    this.store_name = '夜殇'
  }
})

const dest = Object.assign(target, src)
console.log(dest)
```

来看看结果
![](https://files.mdnice.com/user/17954/da7c9dfb-e257-4f85-910f-d67340d80eac.png)
在合并的时候会直接抛出这个异常。相比较而言，这种情况发生的概率会更大一些，当我们使用 `getter` 函数或者 `setter` 函数对属性代理做一些处理的时候，有可能就会出错，再去拿当前对象跟别的对象合并，就会报错。

至此要讲的内容已经全部结束，希望能给你带来帮助，如果有看不明白或者讲的不对的地方欢迎指正~
![](https://files.mdnice.com/user/17954/914985e9-373e-4755-bc9a-0b5969a13c52.png)

最后补一句，作为一个前端的 developer，现在才开始精读红宝书，我很惭愧……
![](https://files.mdnice.com/user/17954/de44b0ae-dfa0-47aa-a965-e8aba9c3688b.png)
如果觉得内容对你有用的话，欢迎关注哦~
![](https://img.soogif.com/5HkHKKxGJ6ZmhQ7c8nLYOE9jfEXDpqp4.gif?scope=mdnice)
