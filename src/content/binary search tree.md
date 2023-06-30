---
title: 二叉搜索树
author: 向阳
pubDate: 2021-09-07
tag: 'JavaScript'
description: 二叉搜索树
---


二叉搜索树是二叉树中最常用的一种类型之一，也被叫做二叉查找树；看到它的名字相信你也想到了，它诞生的原因就是为了实现快速查找，不过它不仅支持快速查找，也支持快速的插入或者删除。

下面就来一起了解一下吧……

![](https://files.mdnice.com/user/17954/17749d27-ee63-44d0-af3a-4fbb6ea3c6db.png)

## 了解了解定义先

二叉搜索树（BST）是二叉树的一种，但是只允许你在左侧节点存储比父节点小的值，在右侧节点存储比父节点大的值。

上边是书上说的，看不明白没关系，咱来解释一下。

其实就是一下三点

1. 二叉搜索树是二叉树的一种
2. 左子树节点的值小于父节点的值
3. 右子树节点的值大于父节点的值

定义也了解了，开始下一步……

![](https://files.mdnice.com/user/17954/af75dc1a-6997-43df-a2e8-a56d7f97f7e2.png)

## 从简单的开始

操作二叉搜索树的前提，你得有一个二叉搜索树，所以我们这里先讲二叉搜索树的 `插入` 操作。

不管是二叉树的根还是叶子，都是一个个节点，所以在在创建一个二叉搜索树之前还得先创建节点；节点都由三部分组成，节点的值、节点的左子树和节点的右子树。

```javascript
class Node {
  constructor(key) {
    // 节点的值
    this.key = key
    // 左节点
    this.left = null
    // 右节点
    this.right = null
  }
}
```

万事俱备，接下来开始实现二叉树的插入操作，毕竟所有的操作都要从新增开始。

### `insert`

实现插入的时候要考虑的一个点是当前插入的节点是否是第一个节点，也就是所说的根节点，如果是第一个节点，那就直接创建一个 Node 类的实例，并把它赋值给 root 属性即可；如果不是，则需要对节点进行判断，然后找到它该在的位置。先看看代码实现，然后再解释，嘿嘿

```javascript
class BinarySearchTree {
  constructor() {
    this.root = null
  }
  insert(key) {
    // 向树中插入一个新的键
    if (this.root === null) {
      // 当前树上啥也没有
      this.root = new Node(key)
    } else {
      // 已经有了根节点
      this.#insertNode(this.root, key)
    }
  }
}
```

首先创建一个二叉搜索树的类 `BinarySearchTree`, 只有一个属性，也就是 BST 的跟 root（后边的二叉搜索树都用 BST 代替，打字累人啊！）。

创建一个`insert`方法，通过该方法实现 BST 的插入操作，`#insertNode`方法作为一个节点插入操作的辅助方法，来看一下他的实现

```javascript
#insertNode(node, key) {
  // 如果要插入的节点值小于当前节点，则作为左子树
  if (node.key > key) {
    if (node.left === null) {
      node.left = new Node(key)
    } else {
      this.#insertNode(node.left, key)
    }
  } else {
    // 否则作为右子树
    if (node.right === null) {
      node.right = new Node(key)
    } else {
      this.#insertNode(node.right, key)
    }
  }
}
```

首先判断一下要插入节点的值的大小，如果它比当前节点小，那它就应该被插再当前节点的左子树上，接下来判断当前节点的左子树是否为空，如果当前节点的左子树是有值的，那就需要去做更深层次的判断，用当前要插入的节点再去和当前节点的左子树进行比较，重复之前的操作，所以这里用递归来写。

举个栗子 🌰 吧，比如你按 `8, 3, 2, 6, 9, 7` 的顺序通过 `insert` 挨个插入到 BST 中，那创建那最后的 BST 应该是一个什么样的呢？

![](https://files.mdnice.com/user/17954/f90fc36d-f45a-40b7-ba0e-658eb59c200e.png)

这就是创建出来的的 BST(画的有点丑，凑合着看哈……)

好了，接下来来讲一下这棵树是怎么生成的

1. 插入 8 的时候，根节点 root 的值是 null，所以直接创建了一个值为 8 的节点作为根节点

![](https://files.mdnice.com/user/17954/4af1b52c-c8e5-40d8-aee8-fa350cf864e6.png)

2. 插入 3 的时候，当前根节点已经有值，比较 2 与根节点 root 的值，2 明显比 8 小，所以创建一个值为 3 的节点作为 8 的左子树

![](https://files.mdnice.com/user/17954/bd985d56-03fd-4ccf-a989-e6146bd3691d.png)

3. 插入节点 2 的时候，先与节点 8 的值比较，比 8 小，所以节点 2 应该是左子树上边的节点，但是现在节点 8 的左子树已经有一个节点 3 了，所以节点 2 还要与节点 3 的值比较，2 比三小，并且节点三的左子树并没有值，节点 2 应该插入到节点三的左子树上

![](https://files.mdnice.com/user/17954/b134dea7-69e8-4086-9102-4b4a8a4786d9.png)

4. 同样的，插入节点 6 的时候，先要与节点 8 的值比较，然后与节点 3 的值比较，6 比 3 大，所以应该插入再节点 3 的右子树上

![](https://files.mdnice.com/user/17954/60f072c8-29c4-4a13-ad0b-6dd8b7ba2aa9.png)

5. 插入节点 9 的时候，与节点 8 的值比较，9 比 8 大，并且节点 8 的右子树为空，所以节点 9 就做为节点 8 的右子树

![](https://files.mdnice.com/user/17954/b47fd6ed-585f-49f1-9d81-579c2a204743.png)

剩下的节点不想画了，因为都是在重复 🐶

插入的操作讲到这里已经 over 了

接下来开始讲 BST 的遍历，先从中序遍历开始

### 中序遍历

先说定义：
中序遍历是一种以上行方式顺序访问 BST 所有节点的遍历方式，也就是以从最小到最大的顺序访问所有的节点。

其实根据 BST 和中序遍历的定义，我们也能够想到，中序遍历的时候应该是先遍历 BST 的左子树，然后是根节点，最后是右子树。因为 BST 的根节点的值总是大于左子树节点的值而小于右子树节点的值。

来看看具体代码实现

```javascript
inOrderTraverse(callback) {
  // 通过中序遍历所有节点
  this.#inOrderTraverseNode(this.root, callback)
}

#inOrderTraverseNode(node, callback) {
  if (node !== null) {
    this.#inOrderTraverseNode(node.left, callback)
    callback(node.key)
    this.#inOrderTraverseNode(node.right, callback)
  }
}
```

`inOrderTraverse`中序遍历的时候接收一个 `callback` 回调函数，用于对遍历到的节点进行一些处理。

`#inOrderTraverseNode`函数是一个遍历的辅助方法，接收两个参数，一个当前遍历到的节点 `node`，一个是用于处理遍历到的节点的回调函数 `callback` 。有些同学可能对这里的递归调用不太理解，我这里来通过观察调用栈的方式稍微解释一下。

这是`#inOrderTraverseNode`函数的第一次执行，`#inOrderTraverseNode` 被压入调用栈中，当前节点是 `root` 节点，条件判断成立，执行条件语句内的程序，继续调用 `#inOrderTraverseNode`

![](https://files.mdnice.com/user/17954/a949a867-0940-4ddf-b4bf-47df44b6c78a.png)

此时 `#inOrderTraverseNode` 中传入的 node 节点是 root 节点的左子树，执行条件语句，发现当前节点的值不为空，执行条件语句内的代码，继续调用 `#inOrderTraverseNode`

![](https://files.mdnice.com/user/17954/ee45ae8f-ce68-4499-933d-8c0cf15e8f0d.png)

此时 `#inOrderTraverseNode` 中传入的 node 节点是值为 3 的节点的左子树，执行条件语句，发现当前节点的值不为空，执行条件语句内的代码，继续调用 `#inOrderTraverseNode`

![](https://files.mdnice.com/user/17954/db51b64a-fe67-4a4f-9780-3de690424cf2.png)

继续执行 `#inOrderTraverseNode` ，一次传入的是节点值为 2 的节点的左子树，但是此时该节点的左子树的值为空，所以条件判断不成立。

此时，调用栈栈顶的函数内部可以写成这样的

```javascript
// node.key = 2
callback(node.key)
this.#inOrderTraverseNode(node.right, callback)
```

把节点的值传入回调函数中，在回调函数中做你想要做的操作，接着又是调用 `#inOrderTraverseNode`, 此时 node 节点的右节点是 null，条件语句不成立，所以跳过条件语句内的内容。到这里对节点值为 2 的节点操作完成，从调用栈中弹出此次调用。

![](https://files.mdnice.com/user/17954/59a5cb77-7b8a-4570-b682-7dca2b90497d.png)

对于其他节点的遍历其实都是类似的，由于本文的重点不是递归，在这里只是大致讲一下，后边有时间再单独出一篇针对递归的。

其实递归就是一个套娃的过程，关于递归，还有一句名言来着

> 要理解递归，首先要理解递归。

这句话可谓是直击递归的本质。

好了，从递归的懵逼中转回来，接着讲 BST 的遍历。

中序遍历上边已经讲的差不多了，接着来讲讲 BST 的先序遍历

### 先序遍历

还是先看看官方是怎么定义他的

> 先序遍历是以优先与后代节点的顺序访问每个节点的。

官方的话就是够官方，看都看不懂。咱翻译一下，其实就是在遍历的时候首先去访问根节点，然后是左子树，最后时右子树。

弄明白了它的定义，那就开始实现呗

```javascript
preOrderTraverse(callback) {
  // 通过先序遍历所有节点
  this.#preOrderTraverseNode(this.root, callback)
}

#preOrderTraverseNode(node, callback) {
  if (node !== null) {
    callback(node.key)
    this.#preOrderTraverseNode(node.left, callback)
    this.#preOrderTraverseNode(node.right, callback)
  }
}
```

跟中序遍历类似，只不过在每次调用 `#preOrderTraverseNode` 的时候首先执行的是 `callback` 这个回调函数。

思路跟中序遍历都是类似的。

接下来是后序遍历

### 后序遍历

上定义

> 后续遍历时先访问根节点的后代节点，在访问节点本身。

其实就是先访问左子树，再访问右子树，最后访问根节点

好了，上代码吧，看看实现

```javascript
postOrderTraverse(callback) {
  // 通过后序遍历所有节点
  this.#postOrderTraverseNode(this.root, callback)
}

#postOrderTraverseNode(node, callback) {
  if (node !== null) {
    this.#postOrderTraverseNode(node.left, callback)
    this.#postOrderTraverseNode(node.right, callback)
    callback(node.key)
  }
}
```

思路跟中序遍历和先序遍历也是一样一样滴

BST 的三种遍历讲完了，不知道你有没有从递归的圈中跳出来。

接下来来说两个简单的，获取 BST 中有最小值和最大值的节点。

### 搜索最小值

咱先回顾一下 BST 的定义，再来看下边的一张图

![](https://files.mdnice.com/user/17954/a7302ac9-599b-4031-8287-2c64fbbc2b86.png)

有没有发现什么？

没错，BST 最左端的节点就是最小的值，最右端的节点就是最大值。

你说这么小一棵树，得出来的结论会不会不准确？那我这里建议你再回去看看 BST 的定义！

好了，看图虽然一眼就能看出来，那具体怎么查找，还是要看看具体的代码逻辑

```javascript
min() {
  if (this.root === null) {
    return false
  }
  // 返回树中最小的键值
  return this.#minNode(this.root)
}

#minNode(node) {
  let current = node
  while (current !== null && current.left !== null) {
    current = current.left
  }
  return current
}
```

其实就是从根节点开始，顺着左子树的节点一直遍历，直到当前节点的左子树的值为空，也就是遍历到头了，这就是最后一个左节点了，那这个节点就是时我们要找的节点值最小的节点。

### 搜索最大值

看上边的图，最大值就是最右边的子节点，我也甭解释了，直接上代码吧

```javascript
max() {
  // 返回树中最大的键值
  if (this.root === null) {
    return false
  }
  return this.#maxNode(this.root)
}

#maxNode(node) {
  let current = node
  while (current !== null && current.right !== null) {
    current = current.right
  }
  return current
}
```

到这里，BST 最大值最小值的查找就结束了

接下来是搜索 BST 中某一个特定的值

### 搜索一个特定的值

搜索其实相对是比较肉容易理解的，搜索的过程其实就是一个对 BST 节点遍历比较的过程，找到与目标节点相等的节点。

拿当前节点与目标节点进行比较，如果当前节点的值比目标节点大，则拿目标节点与当前节点的左节点比较，否则拿目标节点与当前节点的右节点比较。

来看看代码具体如何实现

```javascript
constructor() {
  this.root = null
  this.searchResult = null
}

search(key) {
  // 在树中查找一个键，如果节点存在，返回true；否则，返回false
  return this.#searchNode(this.root, key)
}

#searchNode(node, key) {
  if (node === null) {
    return false
  }

  if (node.key === key) {
    this.searchResult = node
  }
  if (node !== null && node.key > key) {
    return this.#searchNode(node.left, key)
  } else if (node !== null && node.key < key) {
    return this.#searchNode(node.right, key)
  }
  return this.searchResult
}
```

在 BST 的类中新增一个 `searchResult` 属性，用于保存搜索到的结果。

在搜索的时候，从根节点开始，如果当前节点为空，那就说明该 BST 为空，或者说已经遍历到当前 BST 某一子树的顶点，没有查询到想要的节点，直接返回 false。

如果当前节点与目标节点的值相等，那说明该节点就是我们想要的节点，把该节点赋值给 `searchResult` ，作为查询到的结果返回。

在条件语句中，如果当前节点为空，则不执行条件语句内的内容，如果不为空，并且当前节点的值大于目标节点的值，则去当前节点的左节点上继续查找。

如果当前节点不为空，并且当前节点的值小于目标节点的值，则去当前节点的右节点上继续查找。

最后再来看看 BST 的删除操作

### 移除一个节点

先来说所思路，在删除的时候要分这么三种情况：

1. 没有找到要删除的目标节点，这种情况我们直接返回 null

2. 找到目标节点，并且目标节点没有左子树和右子树，那直接将该节点赋值为 null，表示删除

3. 找到目标节点，但是目标节点有左子树或者右子树，这个时候我们要跳过该节点，将该节点的父节点指向该节点的指针指向该节点的子节点。当然，这个子节点其实是有要求的。

如果目标节点没有子节点，那好办，直接将目标节点赋值为 null 就可以了

如果说目标节点只有一个左节点或者右节点，那么直接将该节点的用当前节点的左节点或者有节点来继承当前节点的位置。

最麻烦的是，目标节点有两个子节点，也就是有左侧节点和右侧节点。找到要删除的目标节点后，需要跳过目标节点，去查找目标节点右子树上边最小的值，来继承目标节点的位置。此时 BST 中会有两个节点值相同的节点，这样显然是不行的，我们需要把用来继承的节点原本位置上的节点删除掉。

解释了这么多，还是觉得不如看代码来的直观，那还是直接上代码叭

```javascript
remove(key) {
  // 从树中移除某个键
  return this.#removeNode(this.root, key)
}

#removeNode(node, key) {
  if (node === null) {
    return null
  }
  if (node.key > key) {
    // 要删除的节点在左子树
    node.left = this.#removeNode(node.left, key)
    return node
  } else if (node.key < key) {
    // 要删除的节点在右子树
    node.right = this.#removeNode(node.right, key)
    return node
  } else {
    // 当前节点就是要删除的节点
    if (!node.left && !node.right) {
      node = null
      return node
    }
    if (!node.left) {
      node = node.right
      return node
    } else if (!node.right) {
      node = node.left
      return node
    }
    const aux = this.#minNode(node.right)
    // 将目标节点右子树节点值最小的节点的值赋值给当前目标节点，用来继承当前目标节点的位置
    node.key = aux.key
    // 删除目标节点右子树上最小的节点
    node.right = this.#removeNode(node.right, aux.key)
    return node
  }
}
```

讲了这么多不知道你学废了吗？

![](https://files.mdnice.com/user/17954/c2a7db2f-4093-4db3-b24b-01b1c9c1a948.png)

最后再唠叨两句，BST 的用来能用来干什么。在正常情况下，BST 是用来进行快速查找的，在进行搜索的时候其实是一个二分法查找的过程。

但是为什么又说是正常情况呢，因为有不正常的情况，比如一棵树，只有一根树枝的那种，这样的树其实更像是一个链表，再用二分法去查找，意义就不大了。

下一篇讲如何解决这个缺陷，另一种树——自平衡树(AVL 树)

参考文献：《学习 JavaScript 数据结构与算法》
