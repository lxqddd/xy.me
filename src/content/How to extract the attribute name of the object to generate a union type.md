---
title: 如何将对象的属性名提取出来生成一个联合类型
author: 向阳
pubDate: 2023-06-09
description: 如何将对象的属性名提取出来生成一个联合类型
tag: 'TypeScript'
---

今天在一个技术群里听到有人在问如何把 json 的第一层属性名提取出来，生成一个联合类型，我想了一下，写了个 demo，在这里记录一下

先定义一个简单的对象，作为我们要转换的目标对象

```typescript
const obj = {
  name: 'xy',
  age: 18,
  favo: ['run']
}
```

接着我们获取这个对象的类型

```typescript
type Ojb = typeof obj

// 这里我们已经拿到obj这个对象的类型了

// type Ojb = {
//   name: string;
//   age: number;
//   favo: string[];
// }
```

然后我们再通过 keyof 关键字，拿到类型 Obj 的所有属性名

```typescript
type ObjKey = keyof Ojb
```

到这里已经完成属性名的提取，提取结果是这样的

```typescript
type ObjKey = 'name' | 'age' | 'favo'
```
