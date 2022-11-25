---
title: 解决css动画抖动问题
author: 向阳
date: 2022-06-07
tag: 'JavaScript'
layout: '../../layouts/PostLayout.astro'
---

今天接到一个需求是这样的，我们有一个表格，表头固定，表格的宽高是可以通过拖拽调整的，当表格内容的高度大于表格设置的高度时，表格中的内容自动向上滚动；

但是之前的实现是当表格中的数据滚动到最后一行的时候就停下来了，现在要重新写动画，让表格中的数据循环滚动。

感觉好像并不复杂，毕竟之前的其他业务逻辑都需要动，只需要把动画重写一下就好了，说干就干！

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div class="content">
      <div class="table-head">
        <table>
          <thead>
            <tr>
              <th>The table header</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="table-body-wrap">
        <table class="table-body">
          <tbody>
            <tr>
              <td class="serial">1</td>
              <td>with two columns</td>
              <td>The table</td>
              <td>with two columns</td>
              <td>The table</td>
              <td>with two columns</td>
            </tr>
            .....
            <tr>
              <td class="serial">9</td>
              <td>with two columns</td>
              <td>The table</td>
              <td>with two columns</td>
              <td>The table</td>
              <td>with two columns</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <script>
      const tableBodyWrapHeight =
        document.getElementsByClassName('table-body-wrap')[0].clientHeight

      const tableBody = document.getElementsByClassName('table-body')[0]
      const tableBodyHeight = tableBody.clientHeight

      let diffHeight = 0
      if (tableBodyHeight > tableBodyWrapHeight) {
        diffHeight = tableBodyHeight - tableBodyWrapHeight
      }

      let timer = null

      function tableBodyScroll() {
        if (timer) {
          clearInterval(timer)
          timer = null
        }
        if (diffHeight === 0) return
        let temp = 0
        timer = setInterval(() => {
          if (temp < -diffHeight) {
            temp = 0
          }
          temp--
          tableBody.style.transform = `translateY(${temp}px)`
        }, 20)
      }

      tableBodyScroll()
    </script>
  </body>
</html>
```

思路大概就是我先获取到表格区内容区 wrapper 的高度和表格内容区的高度，将二者做对比。

如果是 wrapper 的高度大于表格内容区的高度，那我就什么也不做。

如果表格内容区的高度大于 wrapper 的高度，那我会得到一个高度差，这个高度差就是表格内容区要向上滚动的高度。
然后通过 `setInterval` ，不断改变表格内容区 `transoform` 的 `translateY` 来实现滚动的效果。

思路清晰，仿佛一点毛病都没有，写完之后来让我们看看效果！

![](https://files.mdnice.com/user/17954/b3443d18-46e6-4701-bf4f-d4a1d586b399.gif)

嗯~~，perfect！诶！好像又感觉哪里怪怪的……

![](https://files.mdnice.com/user/17954/2688adab-43f6-47d3-a9fd-b59598f351c0.png)

经过一番冷静、深入、仔细入微的观察。

我发现！这个动画咋感觉有点抖呢？

![](https://files.mdnice.com/user/17954/d959a44e-56f2-403b-ba65-a2afc2a31c44.png)

这……

功能已经实现了，要不算了吧，去愉快的摸鱼~

（摸鱼亿分钟后……，问题一直在心里，有点膈应 😭）

最终我还是选择解决它。

![](https://files.mdnice.com/user/17954/7c5ab643-ab87-45df-b070-1df1e7b0cb32.png)

在向谷哥请教的过程中我想到了一个 api，`requestAnimationFrame`，隐约记得这个 api 好像就是专门做动画用的，我现在遇到的问题也是动画的问题，用一下试试呗，以前都是只听别人说起过，自己没用过。

查了一番 MDN，了解了基本用法，开始改造！

```javascript
const tableBodyWrapHeight =
  document.getElementsByClassName('table-body-wrap')[0].clientHeight

const tableBody = document.getElementsByClassName('table-body')[0]
const tableBodyHeight = tableBody.clientHeight

let diffHeight = 0
if (tableBodyHeight > tableBodyWrapHeight) {
  diffHeight = tableBodyHeight - tableBodyWrapHeight
}

let timer = 0

function tableBodyScroll() {
  if (timer) {
    window.cancelAnimationFrame(timer)
    timer = 0
  }
  if (diffHeight === 0) return
  let temp = 0
  function animation() {
    if (temp < -diffHeight) {
      temp = 0
    }
    temp--
    tableBody.style.transform = `translateY(${temp}px)`
    timer = window.requestAnimationFrame(animation)
  }
  timer = window.requestAnimationFrame(animation)
}

tableBodyScroll()
```

这就是修改后的代码，改动的地方并不多，只是把动画部分把 `setInterval` 改成了用 `requestAnimationFrame` 进行递归调用，其他的逻辑都没变，来看看结果~
![](https://files.mdnice.com/user/17954/c63d046d-45f2-4785-bca9-ba85b4a265bc.gif)

不知道做成 gif 后你们能不能看的清啊 😂 ，实现的效果确实是如德芙一般顺滑。

现在觉得平常多看点东西真的是有用的，哪怕记不住这个东西怎么用，但是能大概记住大概能干嘛、有什么作用，这在以后工作的时候遇到对应的坑就能快速的定位问题并快速解决。

预计接下来会出一篇详细介绍 `requestAnimationFrame` 的文章，敬请期待~

感兴趣的话欢迎关注 _「大话前端」_~

![](https://files.mdnice.com/user/17954/4909a416-d551-49d8-bf9a-70c3bdfb78c8.png)

![](https://img.soogif.com/5HkHKKxGJ6ZmhQ7c8nLYOE9jfEXDpqp4.gif?scope=mdnice)
