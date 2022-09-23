<template><div><h1 id="你真的了解-object-assign-吗" tabindex="-1"><a class="header-anchor" href="#你真的了解-object-assign-吗" aria-hidden="true">#</a> 你真的了解 Object.assign()吗？</h1>
<p><code v-pre>Object.assign()</code> 这个方法在开发的时候算是用的比较多的一个方法了，使用他的场景大概也就是合并两个或多个对象。但是最近在看红宝书的时候发现在使用这个方法的时候可能会出现一些意料之外的结果，这是我之前不了解的，所以今天也拿出来分享给大家。</p>
<h2 id="红宝书官方定义" tabindex="-1"><a class="header-anchor" href="#红宝书官方定义" aria-hidden="true">#</a> 红宝书官方定义</h2>
<p>ECMAScript6 专门为合并对象提供了一个 <code v-pre>Object.assign()</code> 方法。这个方法接收一个目标对象和一个或多个源对象作为参数，然后将每个源对象中<strong>可枚举</strong>(<code v-pre>Object.propertyIsEnumerable()</code> 返回值为 <code v-pre>true</code>)和 <strong>自有</strong> (<code v-pre>Object.hasOwnProperty()</code> 返回 <code v-pre>true</code>) 属性复制到目标对象。以字符串和符号为键的属性会被复制。对每个符合条件的属性，这个方法会使用源对象上的 <code v-pre>[[Get]]</code> 取得属性值，然后使用目标对象的 <code v-pre>[[Set]]</code> 方法设置属性值。</p>
<p>emmmm，以上的定义是我照着红宝书一个字一个字敲出来的 😅。</p>
<h2 id="自己的一点理解" tabindex="-1"><a class="header-anchor" href="#自己的一点理解" aria-hidden="true">#</a> 自己的一点理解</h2>
<ol>
<li><code v-pre>Object.assign()</code> 是 ES6 提供的一个用来合并对象的方法。</li>
<li>这个方法可以接收一个或多个对象作为参数，第一个参数作为返回的目标对象，剩余的参数作为源对象。</li>
<li>在从源对象向目标对象复制属性的过程中，只会复制源对象中属性描述符 <code v-pre>enumerable</code> 值为 <code v-pre>true</code> 并且是源对象本身而非原型上的属性。</li>
<li>复制的时候以 <code v-pre>getter</code> 获取源对象的属性值，以 <code v-pre>setter</code> 在目标对象上存入该值。</li>
</ol>
<h2 id="上代码" tabindex="-1"><a class="header-anchor" href="#上代码" aria-hidden="true">#</a> 上代码</h2>
<p>密集的文字，在阅读的时候总是会让人觉得乏味，我更喜欢看代码！</p>
<p>首先， <code v-pre>Object.assign()</code> 这个方法是用来合并对象的，这应该没啥疑问的。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> obj1 <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'向阳'</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> obj2 <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token string">'18'</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> dest <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> obj1<span class="token punctuation">,</span> obj2<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>dest<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://files.mdnice.com/user/17954/4f097e11-3955-4386-bd9a-d70734b895d3.png" alt=""></p>
<p>重点不在这里，在后边的内容~</p>
<p>再来看一段代码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> person <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>person<span class="token punctuation">,</span> <span class="token string">'name'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">'向阳'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> dest <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> person<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>dest<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先创建一个空对象 <code v-pre>person</code>，然后通过 <code v-pre>Object.defineProperty()</code> 这个方法给 <code v-pre>person</code> 对象上边添加一个属性 <code v-pre>name</code>，属性值为 <code v-pre>向阳</code>。</p>
<p>接着使用 <code v-pre>Ojbect.assign()</code> 将 <code v-pre>person</code> 作为源对象和一个空的目标对象进行合并。
<img src="https://files.mdnice.com/user/17954/0c762212-8271-41f4-8f38-7de40687a054.png" alt=""></p>
<p>咋是个空对象？
![](https://files.mdnice.com/user/17954/48bdc69c-fa23-4cd2-81ff-f1d399d59c96.png =60%x)
是的，你没看错，这就是合并后的结果，通过 <code v-pre>Object.definedProperty()</code> 定义出来的属性，如果不设置的话，属性描述符 <code v-pre>enumerable</code> 默认为 <code v-pre>false</code>，而根据定义，不可枚举的属性是不能被复制滴~。</p>
<p>也可以通过 <code v-pre>Object.getOwnPropertyDescriptors()</code> 打印一下看看现在 <code v-pre>person</code> 各个属性描述符对应的值。
<img src="https://files.mdnice.com/user/17954/36586cdf-c52e-44c0-8155-58fc7f3e54a7.png" alt="">
全是 <code v-pre>false</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> person <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>person<span class="token punctuation">,</span> <span class="token string">'name'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">'向阳'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token comment">// 将属性设置为可枚举</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> dest <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> person<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>dest<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在将该属性的 <code v-pre>enumerable</code> 设置为 <code v-pre>true</code>，再来看看结果
<img src="https://files.mdnice.com/user/17954/76fcfcc3-892d-4a48-b732-fe7ae620d2b4.png" alt="">
✌🏻，已经能够正常合并了。</p>
<p>因为合并的过程是通过 <code v-pre>getter</code> 获取的源对象的属性值，通过 <code v-pre>setter</code> 对目标对象的值进行设置，结合这两个特性，咱再来看看另一种情况。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> src <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>src<span class="token punctuation">,</span> <span class="token string">'name'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 将属性设置为可枚举</span>
  <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">'向阳'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> target <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> <span class="token string">'name'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>store_name
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">set</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>store_name <span class="token operator">=</span> val
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

target<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'夜殇'</span>

<span class="token keyword">const</span> dest <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> src<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>dest<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过 <code v-pre>getter</code> 函数和 <code v-pre>setter</code> 函数来访问和设置对象的属性值，现在再来看一下结果。
<img src="https://files.mdnice.com/user/17954/0ebf35a0-cc4d-4d30-a5dd-e0f3325edc9d.png" alt="">
也是没有问题的，能正常合并；现在再来修改一下两个对象中 <code v-pre>getter</code> 函数和 <code v-pre>setter</code> 函数的内容。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> src <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>src<span class="token punctuation">,</span> <span class="token string">'name'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 将属性设置为可枚举</span>
  <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">'向阳'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> target <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> <span class="token string">'name'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>store_name
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">set</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>store_name <span class="token operator">=</span> <span class="token string">'夜殇'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> dest <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> src<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>dest<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将目标对象 <code v-pre>target</code> 中 <code v-pre>name</code> 属性的 <code v-pre>setter</code> 函数做一下修改，不管后边对 <code v-pre>name</code> 属性如何赋值，我们都将其设置为 <code v-pre>夜殇</code>。现在再来看看输出的结果。
<img src="https://files.mdnice.com/user/17954/3074fdf4-0d6d-4cf1-8181-17e39bb95533.png" alt="">
我们可以看到，目标对象中 <code v-pre>setter</code> 函数中的 <code v-pre>val</code> 值仍然是 <code v-pre>向阳</code>，但是合并后的结果却是 <code v-pre>夜殇</code>。</p>
<p>当然，这种情况应该是比较少的，或者应该说不应该会有这种代码出现在我们的代码中，万一真的有这种代码，这里也算是提供了一种调试的思路 😄。</p>
<p>说起来这种还算是正常的，如果对象的 name 属性的 <code v-pre>getter</code> 函数或是 <code v-pre>setter</code> 函数中抛出了一个异常，那 😱……合并就会报错。</p>
<p>来试一下呗……</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> src <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>src<span class="token punctuation">,</span> <span class="token string">'name'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 将属性设置为可枚举</span>
  <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">'merge error'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> target <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> <span class="token string">'name'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>store_name
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">set</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>store_name <span class="token operator">=</span> <span class="token string">'夜殇'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> dest <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> src<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>dest<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>来看看结果
<img src="https://files.mdnice.com/user/17954/da7c9dfb-e257-4f85-910f-d67340d80eac.png" alt="">
在合并的时候会直接抛出这个异常。相比较而言，这种情况发生的概率会更大一些，当我们使用 <code v-pre>getter</code> 函数或者 <code v-pre>setter</code> 函数对属性代理做一些处理的时候，有可能就会出错，再去拿当前对象跟别的对象合并，就会报错。</p>
<p>至此要讲的内容已经全部结束，希望能给你带来帮助，如果有看不明白或者讲的不对的地方欢迎指正~
![](https://files.mdnice.com/user/17954/914985e9-373e-4755-bc9a-0b5969a13c52.png =60%x)</p>
<p>最后补一句，作为一个前端的 developer，现在才开始精读红宝书，我很惭愧……
![](https://files.mdnice.com/user/17954/de44b0ae-dfa0-47aa-a965-e8aba9c3688b.png =60%x)
如果觉得内容对你有用的话，欢迎关注哦~
<img src="https://img.soogif.com/5HkHKKxGJ6ZmhQ7c8nLYOE9jfEXDpqp4.gif?scope=mdnice" alt=""></p>
<Back /><Plum /></div></template>


