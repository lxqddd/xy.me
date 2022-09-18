<template><div><p>前段时间在使用 JavaScript 做动画的时候发现做出来的动画会出现卡顿的现象，今天我们主要就来聊一下卡顿的原因以及如何解决这个问题。</p>
<h3 id="使用定时器实现动画出现卡顿的原因" tabindex="-1"><a class="header-anchor" href="#使用定时器实现动画出现卡顿的原因" aria-hidden="true">#</a> 使用定时器实现动画出现卡顿的原因</h3>
<ol>
<li>主要原因是浏览器无法确定定时器的回调函数的执行时机。以 <code v-pre>setInterval</code> 为例，当一个 <code v-pre>setInterval</code> 定时器被创建后，它的回调任务会被放到异步队列，只有当同步任务执行完成后，浏览器才会检查异步队列中是否有需要执行的异步任务，如果有，就取出执行，这样会使任务的实际执行时机比所设定的延迟时间要晚一些。</li>
</ol>
<p>这个问题跟浏览器的事件循环机制有关，JavaScript 引擎在解析执行我们的代码的时候，遇到定时器，会调用浏览器 API，让定时器去进行倒计时，此时并不阻塞同步代码的执行，当定时器倒计时完毕，定时器回调会被放入宏任务队列等待执行。</p>
<p>在这个过程中问题就来了，如果说同步代码的执行需要 50ms，而定时器设置的定时只有 20ms，那么由于事件循环的机制，还是要等待同步任务执行完整之后再来执行微任务队列中的定时器回调，而这中间，又相隔了 30ms，在这 30ms 的过程中，定时器的回调一直处于 pendding 的状态。如果定时器中是动画相关的操作，那也需要在预期的时间上多等待 50ms。</p>
<p>画了张图，希望能帮助大家理解（如果不能帮助大家理解，那么请忽略这张图……）
<img src="https://files.mdnice.com/user/17954/7d1064cd-0d66-4663-bc2d-5943c8f44d53.png" alt=""></p>
<ol start="2">
<li>屏幕分辨率和尺寸也会影响刷新频率，不同设备的屏幕绘制频率可能会有所不同，而 <code v-pre>setInterval</code> 只能设置一个固定的时间间隔，这个间隔时间不一定与屏幕的刷新时间同步，所以就可能会导致动画出现随机丢帧的问题。</li>
</ol>
<p>这里有两个点，一个是显示器的刷新频率，另一个是定时器的时间间隔。</p>
<p>一般显示器刷新频率都是 60Hz，这基本上意味着每秒需要重绘 60 次。大多数浏览器都会限制重绘的频率，使其不超过显示器的刷新频率。因为超过刷新频率，用户也感知不到，白白浪费性能。</p>
<p>因此，实现平滑动画最佳的重绘间隔为 1000ms/60，大约 17 毫秒。以这个速度重绘，可以实现最平滑的动画效果。因为这已经是浏览器的重绘频率的极限了。</p>
<p>知道何时绘制下一帧，是创造平滑动画的关键。直到几年前，都没有确切保证让浏览器在何时把下一帧绘制出来的方法。随着 <code v-pre>&lt;canvas&gt;</code> 和 <code v-pre>HTML5</code> 游戏的兴起，开发者发现 <code v-pre>setInterval</code> 和 <code v-pre>setTimeout</code> 的不精确是个大问题，而浏览器自身的计时器也存在着精度不足毫秒的问题。</p>
<p>以下是几个浏览器计时器的精度情况：</p>
<ul>
<li>IE8 以及之前的版本计时器精度为 15.625ms；</li>
<li>IE9 及之后的版计时器精度为 4ms；</li>
<li>FireFox 和 Safari 的计时器精度约为 10ms；</li>
<li>Chrome 的计时器精度为 4ms。</li>
</ul>
<p>以 Chrome 为例，它的计时器精度为 4ms，这意味着 0~4 之间的任何值最终要么是 0，要么是 4；不可能是别的值。因此，即使将浏览器的时间间隔设置为最优，也免不了只能得到相近似的结果。</p>
<p>对于 JavaScript 来说，它不知道浏览器会在何时发生重绘。因此，我们通过定时器做动画的时候，在定时器中控制动画的代码已经执行完成的情况下，动画效果并不一定会立马生效，因为此时浏览器可能还处在等待下一次重绘的过程中，当下一次重绘完成，动画效果才能在浏览器窗口中显示出来。</p>
<p>而由于浏览器计时器时间差的问题，会导致定时器的计时并不一定是我们设置的 17 ms，而是在多个时间点内反复横跳，也因此才出现使用定时器做动画的时候动画抖动的问题，在复杂的动画中，这种问题尤为明显。</p>
<p>在这样的环境下，今天的主角 <code v-pre>requestAnimationFrame</code> 应运而生！</p>
<h3 id="requestanimationframe-的前世今生" tabindex="-1"><a class="header-anchor" href="#requestanimationframe-的前世今生" aria-hidden="true">#</a> <code v-pre>requestAnimationFrame</code> 的前世今生</h3>
<p>Mozilla 的 Robert O'Callahan 一直在思考这个问题，并且提出了一个独特的解决方案。他指出，浏览器知道 CSS 过渡和动画应该什么时候开始，并且能够计算出正确的时间间隔，到时间就去刷新用户界面。</p>
<p>但是对于 JavaScript 而言，浏览器并不知道动画什么时候开始。他给出的方案是创造一个名为 <code v-pre>MozRequestAnimationFrame</code> 的新方法，以此来通知浏览器某些 JavaScript 代码要执行动画了。这样浏览器就可以在运行某些代码后进行适当的优化。</p>
<p>目前，所有的浏览器都支持这个方法不带前缀的版本，也就是现在用到的 <code v-pre>requestAnimationFrame</code>。</p>
<h3 id="requestanimationframe-vs-setinterval" tabindex="-1"><a class="header-anchor" href="#requestanimationframe-vs-setinterval" aria-hidden="true">#</a> <code v-pre>requestAnimationFrame VS setInterval</code></h3>
<p>这里就不再过多的介绍 <code v-pre>requestAnimationFrame</code> 的详细用法了，它的用法并不复杂。</p>
<p>与定时器不同的是，<code v-pre>requestAnimationFrame</code> 只会在被调用的时候执行一次动画，而不会连续执行。如果想做连续的动画，则可以通过递归来实现对 <code v-pre>requestAnimationFrame</code> 的连续调用。</p>
<p>接下来通过一个 demo 来对比一下使用 <code v-pre>requestAnimationFrame</code> 和 <code v-pre>setInterval</code> 两者做出来的动画效果之间的差异。</p>
<p><img src="https://files.mdnice.com/user/17954/55dd05fe-af53-4426-983c-b4fb4a014af9.png" alt=""></p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>X-UA-Compatible<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>IE=edge<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1.0<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
    <span class="token selector">.square1,
    .square2</span> <span class="token punctuation">{</span>
      <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
      <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
      <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.square1</span> <span class="token punctuation">{</span>
      <span class="token property">top</span><span class="token punctuation">:</span> 40px<span class="token punctuation">;</span>
      <span class="token property">background</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.square2</span> <span class="token punctuation">{</span>
      <span class="token property">top</span><span class="token punctuation">:</span> 150px<span class="token punctuation">;</span>
      <span class="token property">background</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>container<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>square1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>square2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>btn<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>开始！<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
      <span class="token keyword">const</span> square1El <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'.square1'</span><span class="token punctuation">)</span>
      <span class="token keyword">const</span> square2El <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'.square2'</span><span class="token punctuation">)</span>
      <span class="token comment">// 定时器版</span>
      <span class="token keyword">function</span> <span class="token function">squareMove</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> timer <span class="token operator">=</span> <span class="token keyword">null</span>
        square1El<span class="token punctuation">.</span>style<span class="token punctuation">.</span>left <span class="token operator">=</span> <span class="token string">'0px'</span>
        timer <span class="token operator">=</span> <span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token keyword">const</span> squareLeft <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>square1El<span class="token punctuation">.</span>style<span class="token punctuation">.</span>left<span class="token punctuation">)</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>squareLeft <span class="token operator">>=</span> <span class="token number">500</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token function">clearInterval</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span>
          square1El<span class="token punctuation">.</span>style<span class="token punctuation">.</span>left <span class="token operator">=</span> squareLeft <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">+</span> <span class="token string">'px'</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">17</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>

      <span class="token comment">// requestAnimationFrame 版</span>
      <span class="token keyword">function</span> <span class="token function">squareMove2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> timer <span class="token operator">=</span> <span class="token keyword">null</span>
        square2El<span class="token punctuation">.</span>style<span class="token punctuation">.</span>left <span class="token operator">=</span> <span class="token string">'0px'</span>

        <span class="token keyword">function</span> <span class="token function">updateAnimation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">const</span> squareLeft <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>square2El<span class="token punctuation">.</span>style<span class="token punctuation">.</span>left<span class="token punctuation">)</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>squareLeft <span class="token operator">>=</span> <span class="token number">500</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token function">cancelAnimationFrame</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span>
          square2El<span class="token punctuation">.</span>style<span class="token punctuation">.</span>left <span class="token operator">=</span> squareLeft <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">+</span> <span class="token string">'px'</span>
          window<span class="token punctuation">.</span><span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span>updateAnimation<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        window<span class="token punctuation">.</span><span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span>updateAnimation<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>

      document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'.btn'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">squareMove</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token function">squareMove2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在页面中画了两个正方形，当点击按钮的时候方块开始运动，红色方块是使用 <code v-pre>setInterval</code> 实现的动画，蓝色方块使用的是 <code v-pre>requestAnimationFrame</code>。</p>
<p>接下来看一下实现的效果。
<img src="https://files.mdnice.com/user/17954/bee9a34b-c93f-4ca3-bea2-1cf1e151536e.gif" alt=""></p>
<p>在生成 gif 的时候视频被压缩了，但是还是能看到红色的方块在开始运动的时候有明显的抖动，而蓝色的方块则比较丝滑。</p>
<p>实际上，<code v-pre>requestAnimationFrame</code> 的回调函数可以接收一个参数，这个参数是一个 <code v-pre>DOMHightResTimeStamp</code> 的实例（比如：performance.now()的返回值），用来表示下一次重绘的时间。这一点非常重要，<code v-pre>requestAnimationFrame</code> 实际上是把重绘任务安排在了未来的一个已知的时间点上，而且通过这个参数来告诉开发者。</p>
<p>类似于 <code v-pre>setInterval</code> 的清除方法 <code v-pre>clearInterval</code>，<code v-pre>requestAnimationFrame</code> 也有对应的取消重绘的方法 <code v-pre>cancelAnimationFrame</code>，用法也跟 <code v-pre>clearInterval</code> 非常类似，在每次调用 <code v-pre>requestAnimationFrame</code> 的时候，都会返回一个 id，<code v-pre>cancelAnimationFrame</code> 就是通过这个 id 去取消对应的 <code v-pre>requestAnimationFrame</code>。</p>
<p>看到这里，大家应该对 <code v-pre>setInterval</code> 和 <code v-pre>requestAnimationFrame</code> 都有了更深的了解，以后使用 JavaScript 做动画还是以 <code v-pre>requestAnimationFrame</code> 为主。</p>
<p>希望讲解的内容能对大家有所帮助~</p>
<p>如果有更多其他想了解的内容欢迎关注 <strong>大话前端</strong>，给我留言，我们一起交流讨论~
<img src="https://img.soogif.com/5HkHKKxGJ6ZmhQ7c8nLYOE9jfEXDpqp4.gif?scope=mdnice" alt=""></p>
<h3 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h3>
<p>[1]《JavaScript 高级程序设计(第四版)》第 18 章第 1 节。</p>
<Plum /></div></template>


