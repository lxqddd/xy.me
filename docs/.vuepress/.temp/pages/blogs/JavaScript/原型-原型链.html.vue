<template><div><h1 id="原型-原型链" tabindex="-1"><a class="header-anchor" href="#原型-原型链" aria-hidden="true">#</a> 原型-原型链</h1>
<p>原型链的问题似乎一直都是一个老生常谈的问题，今天让我们一起来重新捋一下。</p>
<p>![](https://files.mdnice.com/user/17954/4ac88712-1e56-4ec2-b62f-970e5042fd3c.png =60%x)</p>
<h2 id="对象的原型" tabindex="-1"><a class="header-anchor" href="#对象的原型" aria-hidden="true">#</a> 对象的原型</h2>
<p>先来说说什么是对象的原型。</p>
<p>这个问题可能很多人都是知道的，但是对这个概念可能又不是特别的清楚。现在我们来重新认识一下它。</p>
<p>每一个函数都会创建一个 <code v-pre>prototype</code> 属性，这个属性是一个对象，包含了应该由特定引用类型的实例共享的属性和方法。这个对象就是我们通过调用构造函数创建的对象的原型。</p>
<p>用代码再来描述一下</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token class-name">Person</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">"向阳"</span><span class="token punctuation">;</span>
<span class="token class-name">Person</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">18</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先我们创建一个构造函数 <code v-pre>Person</code></p>
<p><code v-pre>Person</code> 函数内部会有个 <code v-pre>prototype</code> 属性，这个属性是一个对象，也就是我们说的原型对象，我现在给它里边添加了两个属性 <code v-pre>name</code> 和 <code v-pre>age</code>。</p>
<p>现在我们创建两个 <code v-pre>Person</code> 的实例</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> person1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person1<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// {}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person1<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// '向阳'</span>

<span class="token keyword">const</span> person2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// {}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person2<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// '向阳'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从打印结果中发现，两个实例对象本身并没有 <code v-pre>name</code> 这个属性，但是打印的时候却能打印出来，这个时候实例对象上边的 <code v-pre>name</code> 取值其实取的是构造函数 <code v-pre>Person</code> 上边的值。而两个实例打印出来的值是一样的，正是因为构造函数的原型对象是给所有实例所共享的。</p>
<p>诶，话说能不能直接通过实例对象直接看一下构造函数的原型对象上有啥东西呢？</p>
<p>of course，当然阔以，每一个 <code v-pre>JavaScript</code> 对象(除了 null) 都具有一个叫 <code v-pre>__proto__</code> 的属性，这个属性就指向该对象的原型。</p>
<p>我们来试一下呗。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> person1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person1<span class="token punctuation">.</span>__proto__<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>打印出来的东西正式我们之前在构造删除原型对象上边添加的两个属性。
<img src="https://files.mdnice.com/user/17954/3dc2e45a-99fd-439e-8441-eef9724466b4.png" alt=""></p>
<p>盗用一下冴羽大佬的图，整个构造函数，实例，和原型对象之间的关系就是这样的。
<img src="https://files.mdnice.com/user/17954/681a8d3d-e682-42ef-b638-b160e4969e13.png" alt=""></p>
<p>到这里原型大概已经讲完了。</p>
<h2 id="原型链" tabindex="-1"><a class="header-anchor" href="#原型链" aria-hidden="true">#</a> 原型链</h2>
<p>原型讲清楚了，接下来再来聊聊原型链。
(我自己觉得清楚了，你们实际清不清楚我不管！)</p>
<p>前边我们说过，对象都可以通过 <code v-pre>__proto__</code> 这个属性去访问自己的原型，那问题出来了，对象的原型也是一个对象，这是不是意味着构造函数的原型对象也可以通过 <code v-pre>__proto__</code> 这个属性去访问自己的原型呢？</p>
<p>试一下呗</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token class-name">Person</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">"向阳"</span><span class="token punctuation">;</span>
<span class="token class-name">Person</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">18</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> person1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person1<span class="token punctuation">.</span>__proto__<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person1<span class="token punctuation">.</span>__proto__<span class="token punctuation">.</span>__proto__<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>来看看打印的结果
<img src="https://files.mdnice.com/user/17954/afbb3688-615e-4b72-8268-18cbf0856d77.png" alt=""></p>
<p>打印出来的结果还真有。</p>
<p>那这个对象的构造函数是谁呢？通过 <code v-pre>constructor</code> 我们可以看到这个对象的构造函数其实是 <code v-pre>Object</code>。</p>
<p>前边没说，这里补充一下：对象的 <code v-pre>constructor</code> 指向的就是这个对象的构造函数。</p>
<p>现在我们已经找到了 <code v-pre>Object</code> 的构造函数，那再往上找一级呢？
<img src="https://files.mdnice.com/user/17954/6aebfcd7-be7e-4e5d-8dd8-b3a9e6c83571.png" alt=""></p>
<p>这么一对比，看的更清晰一些，<code v-pre>Object</code> 的原型对象就是 <code v-pre>null</code>。找到 <code v-pre>null</code> 就不用再往上找了，因为 <code v-pre>null</code> 是空，啥也没有，原型也是没有的。</p>
<p>这么一级一级往上找的一个过程形成的链路其实就是原型链。</p>
<p>那你说这玩意儿有啥用呢？</p>
<p>我们再来思考一下对象调用属性的时候返回属性值的一个过程，当该对象自身没有这个属性的时候，会去看看当前对象的原型上边有没有，如果有，就返回原型对象里边的属性值。那如果没有呢？没有的话我原型对象也是有自己的原型对象的啊，我在向上级帮你找找，同样的，如果找到的话，就返回找到的属性值，没找到的话，就再往上边找，直到找到 <code v-pre>Object.prototype</code> 为止，如果还找到，那就是真没有了。</p>
<p>这么啰啰嗦嗦一大堆，说的有点多，烦死了</p>
<p>![](https://files.mdnice.com/user/17954/5c795063-4148-4617-97af-dcabd67c0fb2.png =60%x)</p>
<p>讲个小故事吧</p>
<p>儿子(实例对象)：爸爸给我 1 毛钱零花钱</p>
<p>爸爸(构造函数的原型对象)：等着，我找找，自己兜里摸了一番，发现自己也没有。于是去找孩儿他妈。</p>
<p>爸爸(构造函数的原型对象)：老婆，孩子想要 1 毛钱零花钱，我这边没有，你看看能不能给点。</p>
<p>妈妈(Object 的原型对象)：妈妈从钱包的一堆百元大钞中找出一枚一角的硬币，给爸爸，并说了句 <code v-pre>告诉他省着点花</code></p>
<p>爸爸(构造函数的原型对象)：诶，好嘞。找到儿子，这是我辛辛苦苦攒的私房钱，省着点花。</p>
<p>儿子(实例对象)：……</p>
<p>最后再盗用一下冴羽大佬的图
<img src="https://files.mdnice.com/user/17954/7cad688a-fa8a-4c46-a951-81def5c54044.png" alt=""></p>
<p>好了，到这里原型和原型链大概就讲完了。
<img src="https://files.mdnice.com/user/17954/de44b0ae-dfa0-47aa-a965-e8aba9c3688b.png" alt=""></p>
<p>如果觉得内容对你有用的话，欢迎关注哦~
<img src="https://img.soogif.com/5HkHKKxGJ6ZmhQ7c8nLYOE9jfEXDpqp4.gif?scope=mdnice" alt=""></p>
</div></template>


