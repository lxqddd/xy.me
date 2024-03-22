---
title: 遍历类原型属性和构造函数原型属性的区别
author: 向阳
pubDate: 2024-03-22
tag: 'JavaScript'
description: 遍历类原型属性和构造函数原型属性的区别
---

## 起因
最近在写一个工具的时候需要遍历类内部定义的原型方法，但是遍历的结果跟自己的预期不太一样。

## 问题描述
我们都知道，使用 `for ... in ` 是可以遍历到对象的原型属性的，而事实也确实是这样的。当我们通过给构造函数的 `prototype` 添加属性的时候，通过 `for ... in` 就可以在遍历构造函数实例对象的时候遍历到通过 `prototype` 添加的原型属性。但是在类内部定义的原型属性却不能通过这种方式被遍历，可以访问到，但是就是不能被遍历到。

### 具体现象
我们先来看一下构造函数方式的实现

```javascript
function Person(name) {
  this.name = name
}

Person.prototype.sayHi = function () {
  console.log(`Hi, my name is ${this.name}.`)
}

const p = new Person('xy')
console.log(p)

for (const prop in p) {
  console.log(prop)
}
```
我们可以看到实例对象 `p` 内部有一个属性 `name`，他的原型对象有一个 `sayHi` 的属性。
<img class="self-pic" src="/images/javascript/traversePrototypeProp/constructorFunction.png" title="遍历构造函数属性" alt="遍历构造函数属性" />

接下来再看看类的实现方式。

```javascript
class Person {
  constructor(name) {
    this.name = name
  }

  sayHi() {
    console.log(`Hi, I am ${this.name}`)
  }
}

const p = new Person('xy')
console.log(p)

for (const prop in p) {
  console.log(prop)
}
```
我们再来看看结果，原型对象上是有 `sayHi` 这个属性的，但是遍历的时候就是遍历不到。
<img class="self-pic" src="/images/javascript/traversePrototypeProp/class1.png" title="遍历类属性" alt="遍历类属性" />

后来经过查资料才发现，类创建的构造函数默认是不可枚举的，谁说类只是构造函数的语法糖的，给我站出来！

### 如何解决
我们先获取到实例对象的原型对象，拿到运行原型对象的所有prop，对 props 进行遍历

```javascript
class Person {
  constructor(name) {
    this.name = name
  }

  sayHi() {
    console.log(`Hi, I am ${this.name}`)
  }
}

const p = new Person('xy')
const proto = Object.getPrototypeOf(p)
const protoProps = Object.getOwnPropertyNames(proto)
console.log(p)
protoProps.forEach((prop) => {
  console.log(prop)
})
```
结果是这样的。
<img class="self-pic" src="/images/javascript/traversePrototypeProp/class1.png" title="遍历类属性" alt="遍历类属性" />
但是这样仍然是有问题的，因为我们不需要 `constructor` 这种属性，所以就需要在遍历的时候特殊处理，还有就是对实例对象本身的对象需要单独遍历。

真坑……