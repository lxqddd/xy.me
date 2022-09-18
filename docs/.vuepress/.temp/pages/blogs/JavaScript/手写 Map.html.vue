<template><div><h2 id="map-是什么" tabindex="-1"><a class="header-anchor" href="#map-是什么" aria-hidden="true">#</a> Map 是什么</h2>
<p>我们先来看看 MDN 官方的解释</p>
<blockquote>
<p>Map 对象保存键值对,并且能够记住键的原始插入顺序. 任何值都可以作为一个键或一个值.</p>
<p>一个 Map 对象在迭代时会根据对象中元素的插入顺序来进行 — 一个 for...of 循环在每次迭代后会返回一个形式为[key，value]的数组.</p>
</blockquote>
<p>下边让我来翻译一下上边说的是什么意思,其实其核心就是以下几点:</p>
<ol>
<li>Map 其实是一个二维数组</li>
<li>内部的数组必须包含两个元素,一个作为键,一个组位置,这两个元素可以是任何数据类型</li>
<li>Map 内部的元素都是唯一的,不可重复的.
(你说在官方的解释中看不出来要元素唯一,笨啊,这得自己悟,如果能重复的话,当我们使用 get 去获取对应键值的时候给我们返回的是哪一个呢?)</li>
</ol>
<p>emmmm, 其实今天的主要目的是手动实现一个 Map,所以话还是不多说了,先看看它有那些 Api 吧</p>
<h2 id="map-有哪些-api-方法" tabindex="-1"><a class="header-anchor" href="#map-有哪些-api-方法" aria-hidden="true">#</a> Map 有哪些 Api 方法</h2>
<ol>
<li><code v-pre>clear()</code>: 移除 Map 中的所有元素,也就是清空当前的 Map</li>
<li><code v-pre>delete(key)</code>: 通过给定的键值,移除对应的元素</li>
<li><code v-pre>forEach(callback)</code>: 遍历并执行回调函数中的操作,这跟我们遍历普通的数组的时候是类似的</li>
<li><code v-pre>get(key)</code>: 通过给定的 key 值,返回对应的 value 值</li>
<li><code v-pre>has(key)</code>: 判断当前 Map 中是否存在指定的键值,返回一个 boolean 值</li>
<li><code v-pre>keys()</code>: 将所有元素的 key 值放在一个数组中返回,有点类似 <code v-pre>Object.keys()</code></li>
<li><code v-pre>values()</code>: 将所有元素的 value 值放在一个数组中返回,跟 <code v-pre>Object.values()</code>是一样的</li>
<li><code v-pre>set(key, value)</code>: 向 Map 中添加新元素</li>
<li><code v-pre>size()</code>: 返回当前 Map 的长度</li>
<li><code v-pre>entries()</code>: 返回 Map 的一个可迭代对象</li>
</ol>
<p>接下来让我们一个一个来实现,当然了,为了一些 Api 的复用,所以我不会按着上边的顺序来,上边顺序是我从 MDN 上边抄下来的.</p>
<h3 id="先把架子搭起来" tabindex="-1"><a class="header-anchor" href="#先把架子搭起来" aria-hidden="true">#</a> 先把架子搭起来</h3>
<p>我这里用数组实现,当然也可以使用对象去实现</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">MyMap</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">items</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>items <span class="token operator">=</span> items
    <span class="token keyword">this</span><span class="token punctuation">.</span>allKeys <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>allValues <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>items <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>items<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>allKeys<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>item<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>allValues<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>item<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有时候会有需要传入初始值的情况,所以这里做一下初始化;当然,这里的实现其实是有些问题的,不够严谨,后边再补充.</p>
<h3 id="_1-has-key" tabindex="-1"><a class="header-anchor" href="#_1-has-key" aria-hidden="true">#</a> 1. <code v-pre>has(key)</code></h3>
<p>为什么先实现它呢? 我喜欢它!其实不是哈,主要是因为在实现其他 Api 的时候会先判断当前 Map 中时候存在指定的元素,所以咱在这里先实现这个玩意儿.</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">has</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>allKeys<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个太简单了,没啥可说的,就是去查一下当前要找的 key 是否在 Map 的 key 的集合中.</p>
<h3 id="_2-set-key-value" tabindex="-1"><a class="header-anchor" href="#_2-set-key-value" aria-hidden="true">#</a> 2. <code v-pre>set(key, value)</code></h3>
<p>向 Map 中添加一项,添加的时候需要先判断一下当当前 Map 中是否已经存在当前元素的 key,如果有的话就将其 value 值覆盖,如果不存在,则创建该元素.</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">#getKeyIndex</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>allKeys<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

<span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>allValues<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">#getKeyIndex</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> value
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>allKeys<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>allValues<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里写了多写了一个工具函数,如果当前的 Map 中有要查找的元素,就返回该元素的索引值.</p>
<p>另外,写到这里,我们初期的搭的哪个有问题的架子也可以完善了</p>
<p>其实变动不大,把 init 方法改成这个样子就行了</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>items<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>item<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> item<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>按照之前的写法,将所有初始化的值直接 push 到对应的 <code v-pre>key-value</code> 中,如果用户传入的初始化键值对没有重复的还好,如果有重复的,Map 中就会存在重复项,这其实并不是我们想要的,所以这里要使用 <code v-pre>set</code> 方法重新处理一下.</p>
<h3 id="_3-get-key" tabindex="-1"><a class="header-anchor" href="#_3-get-key" aria-hidden="true">#</a> 3. <code v-pre>get(key)</code></h3>
<p>获取给定 key 值的 value 值</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">can't find </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>key<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> in Map</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>allValues<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">#getKeyIndex</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里要注意的一个点就是当前 Map 中不包含要找的值的情况,需要给用户一个提示.</p>
<h3 id="_4-delete-key" tabindex="-1"><a class="header-anchor" href="#_4-delete-key" aria-hidden="true">#</a> 4. <code v-pre>delete(key)</code></h3>
<p>删除指定的元素</p>
<div class="language-JavaScript ext-JavaScript line-numbers-mode"><pre v-pre class="language-JavaScript"><code>delete(key) {
  if (!this.has(key)) {
    throw new Error(`can't find ${key} in Map, because of I can't find it!`)
  }
  this.allKeys.splice(this.#getKeyIndex(key), 1)
  this.allValues.splice(this.#getKeyIndex(key), 1)
  return true
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-clear" tabindex="-1"><a class="header-anchor" href="#_5-clear" aria-hidden="true">#</a> 5. <code v-pre>clear()</code></h3>
<p>清空当前 Map</p>
<div class="language-JavaScript ext-JavaScript line-numbers-mode"><pre v-pre class="language-JavaScript"><code>clear() {
  this.allKeys = []
  this.allValues = []
  return true
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个贼简单,直接把保存键值的数组直接清空就行了</p>
<h3 id="_6-keys-values" tabindex="-1"><a class="header-anchor" href="#_6-keys-values" aria-hidden="true">#</a> 6. <code v-pre>keys(), values()</code></h3>
<p>返回当前 Map 的所有 key 值和 value 值</p>
<div class="language-JavaScript ext-JavaScript line-numbers-mode"><pre v-pre class="language-JavaScript"><code>keys() {
  return this.allKeys
}

values() {
  return this.allValues
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-foreach-callback" tabindex="-1"><a class="header-anchor" href="#_7-foreach-callback" aria-hidden="true">#</a> 7. <code v-pre>forEach(callback)</code></h3>
<p>遍历当前 Map,通过 callback 对遍历项做一下操作,这个相对来说有一丢丢麻烦,主要是要思考 <code v-pre>callback</code> 的使用问题</p>
<div class="language-JavaScript ext-JavaScript line-numbers-mode"><pre v-pre class="language-JavaScript"><code>forEach(callback) {
  this.allKeys.forEach((item, index) =&gt; {
    callback([item, this.allValues[index]], index)
  })
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里我们要做的就是对 Map 作遍历,然后把每一项作为回调函数的参会传进入,至于用户相对他们做什么,他都可以在回调函数中去处理.</p>
<h3 id="_8-size" tabindex="-1"><a class="header-anchor" href="#_8-size" aria-hidden="true">#</a> 8. <code v-pre>size()</code></h3>
<p>返回当前 Map 的长度</p>
<div class="language-JavaScript ext-JavaScript line-numbers-mode"><pre v-pre class="language-JavaScript"><code>size() {
  return this.allKeys.length
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里我们只需要把 <code v-pre>keys</code> 的长度返回就可以了</p>
<h3 id="_9-entries" tabindex="-1"><a class="header-anchor" href="#_9-entries" aria-hidden="true">#</a> 9. <code v-pre>entries()</code></h3>
<p>返回当前 Map 的可迭代对象</p>
<div class="language-JavaScript ext-JavaScript line-numbers-mode"><pre v-pre class="language-JavaScript"><code>entries() {
  const ret = []
  this.allKeys.forEach((item, index) =&gt; {
    ret.push([item, this.allValues[index]])
  })
  return ret
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里的实现方式就是将 key 和 value 组合在一起,直接返回</p>
<p>所有的方法在这里基本都实现完成了,这里只是写了实现方式的一种,其他的 emmm...以后再补充喽.</p>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<p>在我看来,Map 和 Object 其实很像,都是用来存放键值对的,区别在于 Object 所存放给的键值对是很明确的,而且 Object 也不能使用 <code v-pre>null</code>, <code v-pre>undefined</code>等这些作为键.关于这一点 Map 就很牛逼了,存放的键值对可以是任意类型,啥都可以,什么函数啊,对象啊, <code v-pre>null</code>, <code v-pre>undefined</code>这些都可以作为键值.</p>
<h3 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h3>
<ol>
<li>https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map</li>
</ol>
<Plum /></div></template>


