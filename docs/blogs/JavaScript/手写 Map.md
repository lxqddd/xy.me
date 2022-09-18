---
title: 手写 Map
author: 向阳
date: 2021-08-15
---

## Map 是什么

我们先来看看 MDN 官方的解释

> Map 对象保存键值对,并且能够记住键的原始插入顺序. 任何值都可以作为一个键或一个值.
>
> 一个 Map 对象在迭代时会根据对象中元素的插入顺序来进行 — 一个 for...of 循环在每次迭代后会返回一个形式为[key，value]的数组.

下边让我来翻译一下上边说的是什么意思,其实其核心就是以下几点:

1. Map 其实是一个二维数组
2. 内部的数组必须包含两个元素,一个作为键,一个组位置,这两个元素可以是任何数据类型
3. Map 内部的元素都是唯一的,不可重复的.
   (你说在官方的解释中看不出来要元素唯一,笨啊,这得自己悟,如果能重复的话,当我们使用 get 去获取对应键值的时候给我们返回的是哪一个呢?)

emmmm, 其实今天的主要目的是手动实现一个 Map,所以话还是不多说了,先看看它有那些 Api 吧

## Map 有哪些 Api 方法

1. `clear()`: 移除 Map 中的所有元素,也就是清空当前的 Map
2. `delete(key)`: 通过给定的键值,移除对应的元素
3. `forEach(callback)`: 遍历并执行回调函数中的操作,这跟我们遍历普通的数组的时候是类似的
4. `get(key)`: 通过给定的 key 值,返回对应的 value 值
5. `has(key)`: 判断当前 Map 中是否存在指定的键值,返回一个 boolean 值
6. `keys()`: 将所有元素的 key 值放在一个数组中返回,有点类似 `Object.keys()`
7. `values()`: 将所有元素的 value 值放在一个数组中返回,跟 `Object.values()`是一样的
8. `set(key, value)`: 向 Map 中添加新元素
9. `size()`: 返回当前 Map 的长度
10. `entries()`: 返回 Map 的一个可迭代对象

接下来让我们一个一个来实现,当然了,为了一些 Api 的复用,所以我不会按着上边的顺序来,上边顺序是我从 MDN 上边抄下来的.

### 先把架子搭起来

我这里用数组实现,当然也可以使用对象去实现

```javascript
class MyMap {
  constructor(items) {
    this.items = items
    this.allKeys = []
    this.allValues = []
    this.items && this.init()
  }
  init() {
    this.items.forEach((item) => {
      this.allKeys.push(item[0])
      this.allValues.push(item[1])
    })
  }
}
```

有时候会有需要传入初始值的情况,所以这里做一下初始化;当然,这里的实现其实是有些问题的,不够严谨,后边再补充.

### 1. `has(key)`

为什么先实现它呢? 我喜欢它!其实不是哈,主要是因为在实现其他 Api 的时候会先判断当前 Map 中时候存在指定的元素,所以咱在这里先实现这个玩意儿.

```javascript
has(key) {
  return this.allKeys.includes(key)
}
```

这个太简单了,没啥可说的,就是去查一下当前要找的 key 是否在 Map 的 key 的集合中.

### 2. `set(key, value)`

向 Map 中添加一项,添加的时候需要先判断一下当当前 Map 中是否已经存在当前元素的 key,如果有的话就将其 value 值覆盖,如果不存在,则创建该元素.

```javascript
#getKeyIndex(key) {
    return this.allKeys.indexOf(key)
  }

set(key, value) {
  if (this.has(key)) {
    this.allValues[this.#getKeyIndex(key)] = value
    return
  }
  this.allKeys.push(key)
  this.allValues.push(value)
}
```

这里写了多写了一个工具函数,如果当前的 Map 中有要查找的元素,就返回该元素的索引值.

另外,写到这里,我们初期的搭的哪个有问题的架子也可以完善了

其实变动不大,把 init 方法改成这个样子就行了

```javascript
init() {
  this.items.forEach(item => {
    this.set(item[0], item[1])
  })
}
```

按照之前的写法,将所有初始化的值直接 push 到对应的 `key-value` 中,如果用户传入的初始化键值对没有重复的还好,如果有重复的,Map 中就会存在重复项,这其实并不是我们想要的,所以这里要使用 `set` 方法重新处理一下.

### 3. `get(key)`

获取给定 key 值的 value 值

```javascript
get(key) {
  if (!this.has(key)) {
    throw new Error(`can't find ${key} in Map`)
  }
  return this.allValues[this.#getKeyIndex(key)]
}
```

这里要注意的一个点就是当前 Map 中不包含要找的值的情况,需要给用户一个提示.

### 4. `delete(key)`

删除指定的元素

```JavaScript
delete(key) {
  if (!this.has(key)) {
    throw new Error(`can't find ${key} in Map, because of I can't find it!`)
  }
  this.allKeys.splice(this.#getKeyIndex(key), 1)
  this.allValues.splice(this.#getKeyIndex(key), 1)
  return true
}
```

### 5. `clear()`

清空当前 Map

```JavaScript
clear() {
  this.allKeys = []
  this.allValues = []
  return true
}
```

这个贼简单,直接把保存键值的数组直接清空就行了

### 6. `keys(), values()`

返回当前 Map 的所有 key 值和 value 值

```JavaScript
keys() {
  return this.allKeys
}

values() {
  return this.allValues
}
```

### 7. `forEach(callback)`

遍历当前 Map,通过 callback 对遍历项做一下操作,这个相对来说有一丢丢麻烦,主要是要思考 `callback` 的使用问题

```JavaScript
forEach(callback) {
  this.allKeys.forEach((item, index) => {
    callback([item, this.allValues[index]], index)
  })
}
```

这里我们要做的就是对 Map 作遍历,然后把每一项作为回调函数的参会传进入,至于用户相对他们做什么,他都可以在回调函数中去处理.

### 8. `size()`

返回当前 Map 的长度

```JavaScript
size() {
  return this.allKeys.length
}
```

这里我们只需要把 `keys` 的长度返回就可以了

### 9. `entries()`

返回当前 Map 的可迭代对象

```JavaScript
entries() {
  const ret = []
  this.allKeys.forEach((item, index) => {
    ret.push([item, this.allValues[index]])
  })
  return ret
}
```

这里的实现方式就是将 key 和 value 组合在一起,直接返回

所有的方法在这里基本都实现完成了,这里只是写了实现方式的一种,其他的 emmm...以后再补充喽.

### 总结

在我看来,Map 和 Object 其实很像,都是用来存放键值对的,区别在于 Object 所存放给的键值对是很明确的,而且 Object 也不能使用 `null`, `undefined`等这些作为键.关于这一点 Map 就很牛逼了,存放的键值对可以是任意类型,啥都可以,什么函数啊,对象啊, `null`, `undefined`这些都可以作为键值.

### 参考文献

1. https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map

<Plum />
