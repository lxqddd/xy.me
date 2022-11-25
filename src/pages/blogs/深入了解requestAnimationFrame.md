---
title: 深入了解requestAnimationFrame
author: 向阳
date: 2022-06-12
tag: 'JavaScript'
layout: '../../layouts/PostLayout.astro'
---

前段时间在使用 JavaScript 做动画的时候发现做出来的动画会出现卡顿的现象，今天我们主要就来聊一下卡顿的原因以及如何解决这个问题。

### 使用定时器实现动画出现卡顿的原因

1. 主要原因是浏览器无法确定定时器的回调函数的执行时机。以 `setInterval` 为例，当一个 `setInterval` 定时器被创建后，它的回调任务会被放到异步队列，只有当同步任务执行完成后，浏览器才会检查异步队列中是否有需要执行的异步任务，如果有，就取出执行，这样会使任务的实际执行时机比所设定的延迟时间要晚一些。

这个问题跟浏览器的事件循环机制有关，JavaScript 引擎在解析执行我们的代码的时候，遇到定时器，会调用浏览器 API，让定时器去进行倒计时，此时并不阻塞同步代码的执行，当定时器倒计时完毕，定时器回调会被放入宏任务队列等待执行。

在这个过程中问题就来了，如果说同步代码的执行需要 50ms，而定时器设置的定时只有 20ms，那么由于事件循环的机制，还是要等待同步任务执行完整之后再来执行微任务队列中的定时器回调，而这中间，又相隔了 30ms，在这 30ms 的过程中，定时器的回调一直处于 pendding 的状态。如果定时器中是动画相关的操作，那也需要在预期的时间上多等待 50ms。

画了张图，希望能帮助大家理解（如果不能帮助大家理解，那么请忽略这张图……）
![](https://files.mdnice.com/user/17954/7d1064cd-0d66-4663-bc2d-5943c8f44d53.png)

2. 屏幕分辨率和尺寸也会影响刷新频率，不同设备的屏幕绘制频率可能会有所不同，而 `setInterval` 只能设置一个固定的时间间隔，这个间隔时间不一定与屏幕的刷新时间同步，所以就可能会导致动画出现随机丢帧的问题。

这里有两个点，一个是显示器的刷新频率，另一个是定时器的时间间隔。

一般显示器刷新频率都是 60Hz，这基本上意味着每秒需要重绘 60 次。大多数浏览器都会限制重绘的频率，使其不超过显示器的刷新频率。因为超过刷新频率，用户也感知不到，白白浪费性能。

因此，实现平滑动画最佳的重绘间隔为 1000ms/60，大约 17 毫秒。以这个速度重绘，可以实现最平滑的动画效果。因为这已经是浏览器的重绘频率的极限了。

知道何时绘制下一帧，是创造平滑动画的关键。直到几年前，都没有确切保证让浏览器在何时把下一帧绘制出来的方法。随着 `<canvas>` 和 `HTML5` 游戏的兴起，开发者发现 `setInterval` 和 `setTimeout` 的不精确是个大问题，而浏览器自身的计时器也存在着精度不足毫秒的问题。

以下是几个浏览器计时器的精度情况：

- IE8 以及之前的版本计时器精度为 15.625ms；
- IE9 及之后的版计时器精度为 4ms；
- FireFox 和 Safari 的计时器精度约为 10ms；
- Chrome 的计时器精度为 4ms。

以 Chrome 为例，它的计时器精度为 4ms，这意味着 0~4 之间的任何值最终要么是 0，要么是 4；不可能是别的值。因此，即使将浏览器的时间间隔设置为最优，也免不了只能得到相近似的结果。

对于 JavaScript 来说，它不知道浏览器会在何时发生重绘。因此，我们通过定时器做动画的时候，在定时器中控制动画的代码已经执行完成的情况下，动画效果并不一定会立马生效，因为此时浏览器可能还处在等待下一次重绘的过程中，当下一次重绘完成，动画效果才能在浏览器窗口中显示出来。

而由于浏览器计时器时间差的问题，会导致定时器的计时并不一定是我们设置的 17 ms，而是在多个时间点内反复横跳，也因此才出现使用定时器做动画的时候动画抖动的问题，在复杂的动画中，这种问题尤为明显。

在这样的环境下，今天的主角 `requestAnimationFrame` 应运而生！

### `requestAnimationFrame` 的前世今生

Mozilla 的 Robert O'Callahan 一直在思考这个问题，并且提出了一个独特的解决方案。他指出，浏览器知道 CSS 过渡和动画应该什么时候开始，并且能够计算出正确的时间间隔，到时间就去刷新用户界面。

但是对于 JavaScript 而言，浏览器并不知道动画什么时候开始。他给出的方案是创造一个名为 `MozRequestAnimationFrame` 的新方法，以此来通知浏览器某些 JavaScript 代码要执行动画了。这样浏览器就可以在运行某些代码后进行适当的优化。

目前，所有的浏览器都支持这个方法不带前缀的版本，也就是现在用到的 `requestAnimationFrame`。

### `requestAnimationFrame VS setInterval`

这里就不再过多的介绍 `requestAnimationFrame` 的详细用法了，它的用法并不复杂。

与定时器不同的是，`requestAnimationFrame` 只会在被调用的时候执行一次动画，而不会连续执行。如果想做连续的动画，则可以通过递归来实现对 `requestAnimationFrame` 的连续调用。

接下来通过一个 demo 来对比一下使用 `requestAnimationFrame` 和 `setInterval` 两者做出来的动画效果之间的差异。

![](https://files.mdnice.com/user/17954/55dd05fe-af53-4426-983c-b4fb4a014af9.png)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <style>
    .square1,
    .square2 {
      position: absolute;
      width: 100px;
      height: 100px;
    }
    .square1 {
      top: 40px;
      background: red;
    }
    .square2 {
      top: 150px;
      background: blue;
    }
  </style>
  <body>
    <div class="container">
      <div class="square1"></div>
      <div class="square2"></div>
      <button class="btn">开始！</button>
    </div>
    <script>
      const square1El = document.querySelector('.square1')
      const square2El = document.querySelector('.square2')
      // 定时器版
      function squareMove() {
        let timer = null
        square1El.style.left = '0px'
        timer = setInterval(() => {
          const squareLeft = parseInt(square1El.style.left)
          if (squareLeft >= 500) return clearInterval(timer)
          square1El.style.left = squareLeft + 1 + 'px'
        }, 17)
      }

      // requestAnimationFrame 版
      function squareMove2() {
        let timer = null
        square2El.style.left = '0px'

        function updateAnimation() {
          const squareLeft = parseInt(square2El.style.left)
          if (squareLeft >= 500) return cancelAnimationFrame(timer)
          square2El.style.left = squareLeft + 1 + 'px'
          window.requestAnimationFrame(updateAnimation)
        }

        window.requestAnimationFrame(updateAnimation)
      }

      document.querySelector('.btn').addEventListener('click', () => {
        squareMove()
        squareMove2()
      })
    </script>
  </body>
</html>
```

在页面中画了两个正方形，当点击按钮的时候方块开始运动，红色方块是使用 `setInterval` 实现的动画，蓝色方块使用的是 `requestAnimationFrame`。

接下来看一下实现的效果。
![](https://files.mdnice.com/user/17954/bee9a34b-c93f-4ca3-bea2-1cf1e151536e.gif)

在生成 gif 的时候视频被压缩了，但是还是能看到红色的方块在开始运动的时候有明显的抖动，而蓝色的方块则比较丝滑。

实际上，`requestAnimationFrame` 的回调函数可以接收一个参数，这个参数是一个 `DOMHightResTimeStamp` 的实例（比如：performance.now()的返回值），用来表示下一次重绘的时间。这一点非常重要，`requestAnimationFrame` 实际上是把重绘任务安排在了未来的一个已知的时间点上，而且通过这个参数来告诉开发者。

类似于 `setInterval` 的清除方法 `clearInterval`，`requestAnimationFrame` 也有对应的取消重绘的方法 `cancelAnimationFrame`，用法也跟 `clearInterval` 非常类似，在每次调用 `requestAnimationFrame` 的时候，都会返回一个 id，`cancelAnimationFrame` 就是通过这个 id 去取消对应的 `requestAnimationFrame`。

看到这里，大家应该对 `setInterval` 和 `requestAnimationFrame` 都有了更深的了解，以后使用 JavaScript 做动画还是以 `requestAnimationFrame` 为主。

希望讲解的内容能对大家有所帮助~

如果有更多其他想了解的内容欢迎关注 **大话前端**，给我留言，我们一起交流讨论~
![](https://img.soogif.com/5HkHKKxGJ6ZmhQ7c8nLYOE9jfEXDpqp4.gif?scope=mdnice)

### 参考资料

[1]《JavaScript 高级程序设计(第四版)》第 18 章第 1 节。
