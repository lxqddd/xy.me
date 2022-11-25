---
title: JavaScript之继承
author: 向阳
date: 2022-01-05
tag: 'JavaScript'
layout: '../../layouts/PostLayout.astro'
---

# 继承

继承是面向对象编程中讨论最多的话题。那 JavaScript 作为一门非面向对象的语言如何实现继承呢？本文在这里介绍了六种常见的 JavaScript 实现继承的方式，话不多说，开干
![](https://files.mdnice.com/user/17954/8697b2ab-d6b1-4b4a-9965-0b70047c5390.png)

## 原型链继承

在开始讲解原型链继承之前，我们先来回顾一下 `构造函数-原型-实例` 他们三者之间的关系。

每一个构造函数都有一个原型对象，并且可以通过 `prototype`这个属性直接去访问原型对象，原型对象可以通过 `constructor` 指回构造函数；实例对象内部有一个指针 `__proto__`，实例对象通过该指针也可以访问到原型对象。

回顾了他们三者之间的关系之后，来看下边一段代码

```JavaScript
function Parent () {
  this.name = '向阳'
}

Parent.prototype.getName = function () {
  return this.name
}

function Child () {
  this.age = 18
}

Child.prototype = new Parent()

const child = new Child()

console.log(child.name) // 向阳
console.log(child.getName()) // 向阳
console.log(child.age) // 18
```

我们将构造函数 `Child` 的原型更改为指向构造函数 `Parent` 的实例对象，现在再去访问构造函数 `Child` 的原型的时候，访问到的就是 `Parent` 的实例对象。而 `Child` 的实例对象 `child` 访问属性 `name` 的时候，`child` 对象本身并没有这个属性，它就会沿着原型链继续向上一层找，此时就找到了 `Parent` 中的该属性。也正是因为这个原因，才有的原型链继承。

为了方便理解，下边画了一张图出来
![](https://files.mdnice.com/user/17954/781429be-96c4-4545-bb85-f8154ca8111d.png)
有木有感觉这种继承方式很好理解？嘿嘿，好理解归好理解，简单归简单，这种继承方式用的其实并不多，从现在的这种图中或许看起来不明显，那我再给它加点东西。
![](https://files.mdnice.com/user/17954/87c61303-40be-4f5d-b593-98737f05b9ae.png)
来看看这张图，有木有发现问题？
细心的你应该已经发现了，因为构造函数 `Child` 的原型指向的是构造函数 `Parent` 的实例对象，所以现在两个实例对象 `child1` 和 `child2` 的原型原型对象也都是同一个。再简单点理解，也可以理解为两个变量指向的都是同一个对象。那这会造成什么问题呢？

当其中一个实例对象 `child1` 或者 `child2` 去修改原型对象上边的内容的时候，另一个实例对象访问到的也是修改之后的新的结果，这其实并不是我们想要的，我们想要的是自己用自己的，对各自的内容形成隔离。

其实还有另外一个问题，那就是当我们在创建一个 `Child` 实例的时候，没有办法给父类传参。

所以这种实现继承的方法……
![](https://files.mdnice.com/user/17954/dc1419fb-3da1-4b6e-93d5-2948eae86b3e.png)

既然通过原型链实现继承，并不好使，那有木有其他实现继承的方法呢？

来，下一位~

## 盗用构造函数

有时候这种方法也被称为 `对象伪装` 或是 `经典继承`。

这种方法就可以解决 `原型链继承` 的两个缺点。它的基本思路很简单：在子类构造函数中调用父类构造函数。因为函数就是在特定上下文中执行代码的简单对象，所以可以通过使用 `call` 和 `apply` 这两种方法以新创建的对象为上下文执行的构造函数。

emmmm……，是不是有点绕，看不懂？没关系，问题不大，下边看看代码，我们用代码解释一下。

```JavaScript
function Parent (name) {
  this.name = name
}

Parent.prototype.getName = function () {
  return this.name
}

function Child (name) {
  this.age = 18
  Parent.call(this, name)
}

const child = new Child('向阳')
console.log(child)
```

有木有感觉写的有点花哨，参数传来传去，哈哈，其实我是故意这么写的，目的是为了和上边的 `原型链继承` 做一个对比。

接下来分析一下这段代码。

当我们通过 `new` 关键字创建 `child` 实例对象的时候，首先要执行构造函数 `Child`。根据代码的实行循序，接下来给上下文 `this` 上边添加一个属性 `age`，再然后，通过 `call` 调用构造函数 `Parent`，注意，由于我们在调用的时候，使用 `call` 改变了 `Parent` 中的 `this`，所以此时 `Parent` 中的 `this` 指向的其实是 `Child`，所以代码执行到 `this.name = name` 的时候，其实是给 `Child` 的上下文对象中添加了一个属性 `name`。
![](https://files.mdnice.com/user/17954/5aa65076-17a6-4308-b9c7-a3033b8f5906.png)
来打个断点瞅一下，没毛病叭
![](https://files.mdnice.com/user/17954/46b69b4b-dd26-47e2-afed-6b3fa28a9d3f.png)
关于 `new` 关键字的原理这里也简单介绍一下

当我们使用 `new` 关键字通过构造函数创建一个实例对象的时候，该构造函数会返回一个对象，其实也就是当前的上下文对象，然后将实例对象的 `__proto__` 和构造函数的 `prototype` 对应起来，最后改变 `this` 的指向，让返回的对象的 `this` 指向创建出来的实例对象。

有一点需要注意，如果你通过 `return` 显式的给构造函数返回一个对象的话，那当前实例对象就是你所显示返回的哪个对象。

代码验证一下呗
![](https://files.mdnice.com/user/17954/74998488-d939-4ee5-81d6-527abc4d9ca4.png)
从不瞎说……

好了，绕了一圈再绕回来，emmmm……，讲了 `new` 的原理之后好像就不用再绕回来了，其实就是将构造函数 `Child` 执行之后的上下文对象指向实例对象 `child`，这个时候 `child` 上边就有两个属性，一个 `age` 来自构造函数 `Child`，另一个 `name`，也来自构造函数 `Child`，只不过这个 `name` 是从父类继承过来的。

对了，这里还有一个点，跟 `原型链继承` 是不一样的。在 `原型链继承` 中，子类以父类的实例对象作为自己的原型对象，因此，子类不仅可以访问到父类实例对象内部的属性，还可以沿着原型链访问到父类的原型对象内部的属性。

而通过 `盗用构造函数` 实现的继承则是使用的子类自己的原型对象。

相比于 `原型链继承`，`盗用构造函数继承` 这种方法的优点很明显，就是在子类构造函数中向父类构造函数传参，这也是上边说的代码写的有点花里胡哨的原因。

至于缺点呢，也不少！

1. 每次创建子类构造函数实例的时候，父类构造函数都要被执行一次。
2. 子类不能访问父类原型内部的方法，这个问题之前已经说过了。

为啥还是不完美呢？？？？
![](https://files.mdnice.com/user/17954/e4782886-1718-437b-9348-0d27f8f9d25d.png)

别哭别哭，还有其他方法！

## 组合继承

一听名字就感觉高大上啊有木有！
![](https://files.mdnice.com/user/17954/8ba86ae7-9b65-4c3b-bbf1-3d57597985bc.png)
组合继承，它综合了 `原型链` 和 `盗用构造函数`，将两者的优点集中了起来。

基本思路就是通过 `原型链` 继承原型上的属性和方法，通过 `盗用构造函数` 继承实例属性。

这样既可以把方法定义在原型上实现重用，又可以让每个实例都有属于自己的属性，美滋滋~

好了，大致思路清楚了，还是要用代码写一下，看看用代码怎么实现。

```JavaScript
function Parent () {
  this.name = '向阳'
}

Parent.prototype.getName = function () {
  return this.name
}

function Child () {
  this.age = 18
  Parent.call(this)
}

Child.prototype = new Parent()

Child.prototype.getAge = function () {
  return this.age
}

const child = new Child()
```

分析一下

这里在通过构造函数 `Child` 创建 `child` 实例对象的时候，第一步是跟 `盗用构造函数继承` 的目的是一样的。第二步，将父类构造函数 `Parent` 的实例对象赋值给子类构造函数 `Child`，这里跟 `原型链继承` 是一样的，它的目的就是为了让子类构造函数共享父类构造函数的原型属性。

这里有一个点需要注意，在给子类构造函数内部动态添加属性的时候，一定是在 `Child.prototype = new Parent()` 之后，原因是如果你在这块代码之前就给子类构造函数添加属性，那相当于是白给，当这行代码执行过后，子类构造函数的原型会指向父类构造函数的实例对象，与之前的原型断开联系。

组合继承弥补了 `原型链继承` 和 `盗用构造函数继承` 继承两种方法的不足，是 JavaScript 中使用最多的继承模式。并且，`组合继承` 也保留了 `instanceof` 操作符和 `isPrototypeOf` 方法识别合成对象的能力。
![](https://files.mdnice.com/user/17954/4c6f8097-00e7-4e5a-a0a9-46b07065a3b4.png)

说完这三种，还有另外三种！
![](https://files.mdnice.com/user/17954/5bf47435-d1e6-4b92-ade0-bba0f9c542b9.png)
下一个，接着来！

## 原型式继承

前边说完 `原型链继承` 这里又来一个 `原型式继承`，到底是要闹哪般啊！

别慌别慌，这两个是不一样滴~

这种方法是 Douglas Crockford 在 2006 年写的篇文章 《JavaScript 中的原型是继承》中讲到的。这是一种不涉及严格意义上的构造函数的继承方法。出发点是即使不自定义类型，也可以通过原型实现对象之间的信息共享。

简单点说就是仅通过原型实现两个对象之间信息共享，不需要再借助构造函数。

在文章的最后，给出了一个贼拉简洁的函数。

```JavaScript
function object (o) {
  function F() {}
  F.prototype = o
  return new F()
}
```

emmmm……，确实是太简洁了，导致我们不太好理解哈。

在这里先说一下这种继承方式的适用场景，可能会对理解该方法有一点帮助。它使用的场景是：当你有一个对象的时候，你想在它的基础上创建一个新的对象。

好，接下来让我们根据它的适用场景，添加一些辅助理解的代码。
![](https://files.mdnice.com/user/17954/860398c4-21e1-405b-baf6-e0b014aec7ae.png)

```JavaScript
function object (o) {
  function F() {}
  F.prototype = o
  return new F()
}

const parent = {
  name: '向阳',
  friend: ['圣君', '皮皮']
}

const child1 = object(parent)
child1.name = '夜殇'
child1.friend.push('永锋')
console.log(child1)

const child2 = object(parent)
child2.name = '大黑'
child2.friend.push('凯山')
console.log(child2)
```

当我们通过 `object` 函数对 `child` 进行创建的时候，`object` 首先会创建一个临时的构造函数 `F`，然后将父对象 `parent` 赋值给临时构造函数 `F` 的原型，最后返回临时构造函数 `F` 的实例对象，将其赋值给 `child`。

它的原理呢，其实就是在你创建一个新的对象的时候，将另一个对象作为新对象的原型来使用，一次达到继承父对象的目的。也就是前边说的实现对象之间信息共享的目的。

不过它跟 `原型链继承` 有一个相同的弊端，看上边的打印结果：
![](https://files.mdnice.com/user/17954/8cd07b37-24a4-4534-8d86-d386fffba23c.png)
在使用同一个父对象创建多个子对象的时候，某一个子对象改变了原型上的属性值之后，其他子对象原型上的该属性值也会随之变化。

不过话说回来，其实也不能说是人家的弊端，毕竟人家的适用场景只是为了在原对象的基础上边创建一个新的对象。

在 ES5 中，通过增加 `Object.create()` 这个方法，将 `原型式继承` 的概念规范化。

这个方法接收两个参数，第一个参数是一个对象，作为新对象的原型对象；第二个参数(可选)也是一个对象，用来给新对象上添加额外的属性。

在只有一个参数的时候 `Object.create()` 和上边定义的 `object` 函数有相同的效果。

当我们在使用 `Object.create()` 的第二个参数的时候，为了遮蔽原型对象上的同名属性，每一个新增的属性我们都需要通过各自的描述符来描述。

举个例子：

```JavaScript
const parent = {
  name: '向阳'
}

const child = Object.create(parent, {
  name: {
    value: '夜殇'
  }
})

console.log(child)
```

它的执行结果：
![](https://files.mdnice.com/user/17954/ca193cf9-aa2b-4197-b95c-ceabd68c2c74.png)

当前对象中和它的原型中有相同属性名的属性 `name`，但是并没有相互影响。

注意：原型继承非常适合不需要单独创建构造函数，但仍然需要在对象间共享信息的场合。一定要记住，属性中包含的引用值始终会在相关对象间共享，这跟使用 `原型链继承` 是一样的。

接下来来看看 `寄生式继承`

## 寄生式继承

`寄生式继承` 是一种与 `原型式继承` 比较接近的一种继承方式，它也是 Crockford 比较提倡的一种继承模式。

`寄生式继承` 的基本思路是：创建一个实现继承的函数，然后以某种方式增强对象，然后返回对象。

来看代码，有时候总是会觉得代码会比文字能表述的更清楚一些~

```JavaScript
function object (o) {
  function F() {}
  F.prototype = o
  return new F()
}

function createChild (parent) {
  const child = object(parent)
  child.name = '小头'
  child.getName = function () {
    return this.name
  }
  return child
}

const parent = {
  name: '大头'
}

const child = createChild(parent)
console.log(child)
```

在这段代码中，`createChild` 接收一个参数，也就是新对象的基准对象；

这个参数会被传递给 `object` 函数，(当然，这里如果你想用 `Object.create()` 这个方法来实现，我觉得也是 OK 的哈)；

然后将返回的新对象赋值给变量 `child`(这里用这个变量名只是为了方便理解哈，没其他意思)；

接着你可以给这个临时变量上边动态的添加你在新对象内部想要的属性或者是方法，最后返回这个对象。

现在我们通过 `createChild` 这个函数以 `parent` 对象为父级对象创建了一个子对象 `child`，别跟上边哪个整混了哈，这个是新的。

那么这个时候 `child` 这个新对象内部有哪些东西呢？

1. 我们手动给他添加属性 `name` 和 `getName` 这两个肯定是有的。
2. `child` 内部应该还有一个原型对象，从 `object` 这个函数内部可以看出，`child` 中的原型对象其实就是 `parent` 这个基准对象，`寄生式继承` 继承来的对象也就从基准对象中来的。

这里需要注意的点是：通过 `寄生式继承` 给对象添加函数会导致函数难以重用，说的就是我在 `createChild` 这个函数中给 `child` 内部动态添加的两个属性 `name` 和 `getName`。

终于来到了最后一种，`寄生式组合继承`。
![](https://files.mdnice.com/user/17954/51df2fbd-5b37-48c8-9de8-8c257c39c31c.png)

## 寄生式组合继承

然而 `寄生式组合继承` 并不是很好理解。
![](https://files.mdnice.com/user/17954/871886fa-e73a-442f-8c20-782f439b2e42.png)
`寄生式组合继承` 通过盗用构造函数继承父类的属性，但是使用混合式原型链继承方法。它并不是通过调用父类构造函数给子类的原型赋值，而是去一个父类原型的副本，将其赋值给子类的原型，以达到继承父类原型对象中属性的目的。

还是对着代码说叭

```JavaScript
function object (o) {
  function F() {}
  F.prototype = o
  return new F()
}

function inheritPrototype (child, parent) {
  const prototype = object(parent.prototype)
  prototype.constructor = child
  child.prototype = prototype
}

function Parent (name) {
  this.name = name
}

Parent.prototype.getName = function () {
  return this.name
}

function Child (name, age) {
  this.age = age
  Parent.call(this, name)
}

inheritPrototype(Child, Parent)

Child.prototype.getAge = function () {
  return this.age
}

const child = new Child('向阳', 18)

console.log(child)
```

这里的 `object` 函数现在其实只是作为一个辅助函数，它的目的就是对父类构造函数的原型做一个浅克隆。

`inheritPrototype` 这个函数的名字还是树上的名字，我是想换一个更好理解的名字，但是想了半天没想出来，就拿人家的用了。就是这个函数不太好理解，`寄生式组合继承` 的核心点也是在这里。

1. 首先，将父类构造函数的原型传给 `object` 这个函数，将其返回值赋值给一个临时变量 `prototype`，这个时候 `prototype` 实际上是保存了一份父类构造函数的原型对象。
2. 在 `prototype` 内部新增一个属性 `constructor`，并将子类构造函数赋值给它，这一步的目的是为了解决由于重写了原型，导致构造函数的 `constructor` 丢失的问题。如果不做这一步，当我们通过 `constructor` 这个方法去判断当前原型对象或者是实例对象的构造函数的时候，访问到的就是 `Parent` 这个父类构造函数。
3. 将处理之后 `prototype` 赋值给子类构造函数的原型。
4. 到这一步，已经实现了对父类构造函数原型属性的继承。

父类构造函数内部的原型属性已经继承完毕，那父类内部肯定还有实例属性啊，别急~

父类构造函数的实例属性是在子类构造函数中通过实现继承的。至于原理，在上边说 `盗用构造函数继承` 的时候已经说过了，这里就不再重复说明了。

最后灵魂画手上线，来一张 `寄生式组合继承` 的流程图。不知道大伙能不能看的懂，先放上再说，希望能帮助大家理解叭
![](https://files.mdnice.com/user/17954/0c6704e1-67ca-410f-b13a-d059a9747e14.png)

至此要讲的内容已经全部结束，希望能给你带来帮助，如果有看不明白或者讲的不对的地方欢迎指正~
![](https://files.mdnice.com/user/17954/de44b0ae-dfa0-47aa-a965-e8aba9c3688b.png)

如果觉得内容对你有用的话，欢迎关注哦~
![](https://img.soogif.com/5HkHKKxGJ6ZmhQ7c8nLYOE9jfEXDpqp4.gif?scope=mdnice)
