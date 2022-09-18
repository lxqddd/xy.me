<template><div><h1 id="在排序数组中查找元素的第一个和最后一个位置" tabindex="-1"><a class="header-anchor" href="#在排序数组中查找元素的第一个和最后一个位置" aria-hidden="true">#</a> 在排序数组中查找元素的第一个和最后一个位置</h1>
<blockquote>
<p>解这道题的主要思路其实还是遍历数组，找到数组中的的元素和目标值相等的那一个</p>
</blockquote>
<h2 id="详细思路" tabindex="-1"><a class="header-anchor" href="#详细思路" aria-hidden="true">#</a> 详细思路</h2>
<ol>
<li>首先需要定义一个空数组 ret，用来保存结果</li>
<li>定义两个指针，L 和 R, 一个指向数组头，一个指向数组尾
<ol>
<li>这里定义一个指针，通过一个指针去定位当然是可以的，但是会慢一点，双管齐下会更快</li>
</ol>
</li>
<li>通过 while 循环，遍历数组</li>
<li>如果 L 指向的元素和目标值相等并且 ret[0] 没有值，则给 ret[0] 赋值为 L，</li>
<li>如果 ret[0] 已经有值，说明第一个元素已经找到，则不需要再复制了，而指针 L 也不需要再移动</li>
<li>R 跟 L 同理，只不过 R 是从右向左移动</li>
<li>如果 ret[0] 和 ret[1] 都已经找到，则直接返回 ret</li>
<li>如果最终都没有找到，那就返回[-1, -1]，表示 target 再数组中不存在</li>
</ol>
<h2 id="完整代码" tabindex="-1"><a class="header-anchor" href="#完整代码" aria-hidden="true">#</a> 完整代码</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span> <span class="token parameter">nums</span>
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> <span class="token parameter">target</span>
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span>
 */</span>
<span class="token keyword">var</span> <span class="token function-variable function">searchRange</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">nums<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> ret <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token keyword">let</span> <span class="token constant">L</span> <span class="token operator">=</span> <span class="token number">0</span>
  <span class="token keyword">let</span> <span class="token constant">R</span> <span class="token operator">=</span> nums<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token constant">L</span> <span class="token operator">&lt;=</span> <span class="token constant">R</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">[</span><span class="token constant">L</span><span class="token punctuation">]</span> <span class="token operator">===</span> target <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>ret<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      ret<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token constant">L</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>ret<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token constant">L</span><span class="token operator">++</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">[</span><span class="token constant">R</span><span class="token punctuation">]</span> <span class="token operator">===</span> target <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>ret<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      ret<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token constant">R</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>ret<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token constant">R</span><span class="token operator">--</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>ret<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token keyword">undefined</span> <span class="token operator">&amp;&amp;</span> ret<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> ret
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> nums <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">]</span>
<span class="token keyword">const</span> target <span class="token operator">=</span> <span class="token number">6</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">searchRange</span><span class="token punctuation">(</span>nums<span class="token punctuation">,</span> target<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


