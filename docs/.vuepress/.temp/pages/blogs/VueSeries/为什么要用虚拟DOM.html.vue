<template><div><h1 id="为什么要用虚拟-dom" tabindex="-1"><a class="header-anchor" href="#为什么要用虚拟-dom" aria-hidden="true">#</a> 为什么要用虚拟 DOM ？</h1>
<h2 id="什么是虚拟-dom" tabindex="-1"><a class="header-anchor" href="#什么是虚拟-dom" aria-hidden="true">#</a> 什么是虚拟 DOM？</h2>
<p>说得简单一点，它就是一个对象，包含 <code v-pre>tag</code>、<code v-pre>props</code>、<code v-pre>children</code> 三个属性。</p>
<p>接下来大家思考两个问题：</p>
<ol>
<li>相比于通过原生 js 去操作 DOM，通过虚拟 DOM 来实现 DOM 的增删改查，它的性能真的更好吗？</li>
<li>如果通过通过虚拟 DOM 操作 DOM 的性能并不比原生 js 操作 DOM 性能好，那么为什么 Vue 还要选择使用虚拟 DOM 呢？</li>
</ol>
<h2 id="操作-dom-的几种方式" tabindex="-1"><a class="header-anchor" href="#操作-dom-的几种方式" aria-hidden="true">#</a> 操作 DOM 的几种方式</h2>
<p>通常，我们在操作一个 DOM 结构的时候会有哪几种方式？</p>
<ol>
<li>通过原生 js，精确地选中我们要操作的 DOM 节点，然后对其进行相应的操作。</li>
</ol>
<p>比如我们要修改一个 div 节点的内容，就需要这样做</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> div <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'div'</span><span class="token punctuation">)</span>
div<span class="token punctuation">.</span>innerText <span class="token operator">=</span> <span class="token string">'hello world'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这样我们就把 div 这个元素中的内容修改为 <code v-pre>hello world</code>。</p>
<ol start="2">
<li>第二种方式是通过一个 html 模板字符串去创建一个节点，替换当前节点，这种方式在 jQuery 时代是非常常用的。</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> htmlTemplate <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">&lt;div>hello world&lt;/div></span><span class="token template-punctuation string">`</span></span>
wrap<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> htmlTemplate
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这样也能达到同样的目的。</p>
<ol start="3">
<li>第三种就是通过虚拟 DOM 的方式进行修改了</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> virtualDOM <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">'div'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span> <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token string">'hello world'</span> <span class="token punctuation">}</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token comment">// render 函数将虚拟 DOM 创建为真实 DOM ，并将其插入到文档中</span>
<span class="token function">render</span><span class="token punctuation">(</span>virtualDOM<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对比以上三种方法，你觉得哪种方法的性能最好呢？</p>
<p>很显然是第一种，选中要修改的元素，直接修改其内容。</p>
<p>其次应该是第三种方法，为什么不是第二种呢？因为在通过虚拟 DOM 修改 div 的内容的时候，可以通过 diff 算法，来最小化的修改变更的内容。对于上边的案例来说，只是 div 的内容发生了变化，而 div 元素本身并没有修改任何东西，所以对于通过虚拟 DOM 修改 div 内容的时候，div 标签不会被重新创建。而使用 html 模板字符串的方法，则会对模板中的所有节点进行重新创建。</p>
<p>我们都知道，对于浏览器来说，创建 DOM 的过程是非常耗时的。所以，相比之下第三种方式的性能要更优于第二种，并且，html 模板字符创越大，这种性能上的差别就会越明显。</p>
<p>那第一种方法和第三种方法的比较呢？</p>
<p>理论上，第一种方法的性能已经是最好的了，因为没有任何其他额外的操作去消耗性能了。相比于第一种方法，虚拟 DOM 多做的一件事是虚拟 DOM 对象的创建以及修改目标的查找。但是呢，这个过程是纯 javascript 层面的计算，所以虽然两种方式有的性能上会有差异，但是并不会差别很大。毕竟相较于 DOM 层面的计算，JavaScript 层面计算带来的性能差异几乎可以忽略不计了。</p>
<p>到这里，我们已经明白了，很显然，虚拟 DOM 的性能并不比通过原生 js 操作 DOM 的性能更好。</p>
<p>那么问题来了，既然如此，Vue 为什么还要选择使用虚拟 DOM 呢？</p>
<h2 id="心智负担" tabindex="-1"><a class="header-anchor" href="#心智负担" aria-hidden="true">#</a> 心智负担</h2>
<p>这就不得不说这几种方式带来的心智负担了。</p>
<p>我就问一个问题，现在让你去用原生 js 去实现页面 DOM 的增删改查操作，你愿意吗？</p>
<p>我相信，如果你的 leader 真的让你这么做，你绝对会吐他一脸，然后撂挑子不干了。明明已经有了飞机大炮，你却还让我去跟敌人拼刺刀？</p>
<p>所以，选用虚拟 DOM 的原因几乎已经明确了。</p>
<ol>
<li>还不错的性能，虽然比不上通过原生 js 操作 DOM 的性能，但是也没差太多，能保证性能的下限。</li>
<li>心智负担小，毕竟操作虚拟 DOM 其实操作的只是一个对象。而操作对象对我们来说比一个一个选中 DOM ，修改 DOM 简单太多了，因为只需要关心数据嘛。</li>
</ol>
<p>希望讲解的内容能对大家有所帮助~</p>
<p>如果有更多其他想了解的内容欢迎关注 <strong>大话前端</strong>，给我留言，我们一起交流讨论~</p>
<div style="text-align: center;">
  <img src="https://img.soogif.com/5HkHKKxGJ6ZmhQ7c8nLYOE9jfEXDpqp4.gif?scope=mdnice">
</div>
<Plum /></div></template>


