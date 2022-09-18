<template><div><p>手写什么什么的实现，一般是我比较怂的。今天来写一个简单点的，手动实现一次 <code v-pre>instanceof</code> 运算符。</p>
<h2 id="instanceof-运算符的作用" tabindex="-1"><a class="header-anchor" href="#instanceof-运算符的作用" aria-hidden="true">#</a> <code v-pre>instanceof</code> 运算符的作用</h2>
<p>既然要手动实现一下 <code v-pre>instanceof</code>。那必然是要清楚 <code v-pre>instanceof</code> 是什么、能干什么。</p>
<p>MDN 上边给的解释是：</p>
<blockquote>
<p><code v-pre>instanceof</code> 运算符用于检测构造函数的 <code v-pre>prototype</code> 属性是否出现在某个实例对象的原型链上。</p>
</blockquote>
<p>这里其实是不考虑当前实例对象是否是该构造函数的实例对象，只要能在当前实例对象的原型链上找到该构造函数的原型对象，<code v-pre>instanceof</code> 运算符就会返回 <code v-pre>true</code>。</p>
<p>看一下实例代码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">"向阳"</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person <span class="token keyword">instanceof</span> <span class="token class-name">Person</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建一个构造函数 <code v-pre>Person</code>， 然后创建一个 <code v-pre>Person</code> 的实例对象 <code v-pre>person</code>，此时 <code v-pre>person.__proto__ === Person.prototype</code>，所以打印的时候打印出来的是 <code v-pre>true</code>。</p>
<p>下面再来看上边提到的另外一种情况：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
obj<span class="token punctuation">.</span>__proto__ <span class="token operator">=</span> <span class="token class-name">Person</span><span class="token punctuation">.</span>prototype<span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj <span class="token keyword">instanceof</span> <span class="token class-name">Person</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建一个空对象 <code v-pre>obj</code>，将 <code v-pre>obj</code> 的 <code v-pre>__proto__</code> 设置为构造函数 <code v-pre>Person</code> 的原型对象。</p>
<p>此时打印出来的也是 <code v-pre>true</code>。</p>
<p>这也就是为什么我们经常说的使用 <code v-pre>instanceof</code> 判断一个对象是否是一个构造函数的实例对象不准确的原因。就是因为实例对象的原型链是可以被改写的。</p>
<p>好了，说完了 <code v-pre>instanceof</code> 的作用之后，接下来就开始动手实现一下叭！
<img src="https://files.mdnice.com/user/17954/1506ce5d-f0e4-4bd9-a877-21050e131447.png" alt=""></p>
<h2 id="实现-instanceof" tabindex="-1"><a class="header-anchor" href="#实现-instanceof" aria-hidden="true">#</a> 实现 <code v-pre>instanceof</code></h2>
<p>话不多说，线上代码再解释！</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">"向阳"</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// obj.__proto__ = Person.prototype</span>

<span class="token doc-comment comment">/**
 *
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span> object <span class="token punctuation">}</span></span> <span class="token parameter">src</span> 实例对象
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span> <span class="token keyword">function</span> <span class="token punctuation">}</span></span> <span class="token parameter">target</span> 构造函数
 */</span>
<span class="token keyword">function</span> <span class="token function">myInstanceof</span><span class="token punctuation">(</span><span class="token parameter">src<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>src <span class="token operator">||</span> <span class="token operator">!</span>target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">"参数都没传对就来了"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> target <span class="token operator">!==</span> <span class="token string">"function"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token function">Error</span><span class="token punctuation">(</span><span class="token string">"target 不是一个构造函数！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">let</span> proto <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">getPrototypeOf</span><span class="token punctuation">(</span>src<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 也可以用 proto = src.__proto__</span>
  <span class="token keyword">const</span> targetProto <span class="token operator">=</span> target<span class="token punctuation">.</span>prototype<span class="token punctuation">;</span>

  <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>proto<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>proto <span class="token operator">===</span> targetProto<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    proto <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">getPrototypeOf</span><span class="token punctuation">(</span>proto<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 也可以用 proto = proto.__proto__</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">myInstanceof</span><span class="token punctuation">(</span>person<span class="token punctuation">,</span> Person<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">myInstanceof</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> Person<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>

obj<span class="token punctuation">.</span>__proto__ <span class="token operator">=</span> <span class="token class-name">Person</span><span class="token punctuation">.</span>prototype<span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">myInstanceof</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> Person<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建一个函数 <code v-pre>myInstanceof</code>，需要传入两个参数，第一个 <code v-pre>src</code> 是实例对象，第二个 <code v-pre>target</code> 是构造函数。</p>
<p>首先处理一下参数的问题，防止因为参数没传对而报错。</p>
<p>然后判断一下传进来的 <code v-pre>target</code> 是不是一个构造函数，如果不是，那后边就不用玩了。</p>
<p>获取构造函数的原型对象。这里你想用哪种方法都行，<code v-pre>Object.getPrototypeOf</code>是 <code v-pre>Object</code> 提供的获取对象原型的方法，<code v-pre>src.__proto__</code>，则是手动去访问对象的原型，效果是一样的。</p>
<p>拿到构造函数的原型对象 <code v-pre>targetProto</code></p>
<p>写一个 <code v-pre>while</code> 循环，因为你不知道要循环多少次，所以循环次数直接设置为 <code v-pre>true</code>。</p>
<p>先处理异常情况，如果没有 <code v-pre>proto</code> 直接退出循环，并返回 <code v-pre>false</code>.</p>
<p>如果存在，判断 <code v-pre>proto</code> 和 <code v-pre>targetProto</code> 是否相等，如果相等则退出循环，返回 <code v-pre>true</code>。</p>
<p>如果不相等，则顺着 <code v-pre>src</code> 的原型链，往上接着找 <code v-pre>proto</code> 的原型对象，开始下一次循环。</p>
<p>至此，手动实现 <code v-pre>instanceof</code> 运算符就讲完啦！
<img src="https://files.mdnice.com/user/17954/3464ccf7-2e2b-4506-970f-326a88a8c245.png" alt="">
如果你觉得写的不错的话，欢迎三连~
<img src="https://img.soogif.com/5HkHKKxGJ6ZmhQ7c8nLYOE9jfEXDpqp4.gif?scope=mdnice" alt=""></p>
</div></template>


