<template><div><h1 id="最接近的三数之和" tabindex="-1"><a class="header-anchor" href="#最接近的三数之和" aria-hidden="true">#</a> 最接近的三数之和</h1>
<ol>
<li>首先还是要对数组进行排序，因为要用双指针的方式来降低时间复杂度</li>
<li>将数组中的前三项的和作为初始结果</li>
<li>因为我们要求的是最接近目标值的三数之和，所以中心思路还是先求出最大值和最小值的和</li>
<li>判断这个值得大小和目标值的关系，如果比目标值大，那就移动右指针，减小较大的数</li>
<li>如果比目标值小，那就移动左指针，增大较小的数</li>
</ol>
<h2 id="完整代码" tabindex="-1"><a class="header-anchor" href="#完整代码" aria-hidden="true">#</a> 完整代码</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span> <span class="token parameter">nums</span>
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> <span class="token parameter">target</span>
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span>
 */</span>
<span class="token keyword">var</span> <span class="token function-variable function">threeSumClosest</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">nums<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 数组从小到大排序</span>
  nums<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=></span> a <span class="token operator">-</span> b<span class="token punctuation">)</span>
  <span class="token comment">// 求初始值，为后边做比较用</span>
  <span class="token keyword">let</span> ret <span class="token operator">=</span> nums<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">+</span> nums<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">+</span> nums<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span>
  <span class="token keyword">let</span> len <span class="token operator">=</span> nums<span class="token punctuation">.</span>length

  <span class="token comment">// 遍历数组</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果有重复项，就进行下一次遍历</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">></span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">===</span> nums<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token keyword">continue</span>
    <span class="token comment">// 定义左指针</span>
    <span class="token keyword">let</span> <span class="token constant">L</span> <span class="token operator">=</span> i <span class="token operator">+</span> <span class="token number">1</span>
    <span class="token comment">// 定义右指针</span>
    <span class="token keyword">let</span> <span class="token constant">R</span> <span class="token operator">=</span> len <span class="token operator">-</span> <span class="token number">1</span>
    <span class="token comment">// 控制做右指针移动</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token constant">L</span> <span class="token operator">&lt;</span> <span class="token constant">R</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> sum <span class="token operator">=</span> nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">+</span> nums<span class="token punctuation">[</span><span class="token constant">L</span><span class="token punctuation">]</span> <span class="token operator">+</span> nums<span class="token punctuation">[</span><span class="token constant">R</span><span class="token punctuation">]</span>
      <span class="token comment">// 比较当前的差值和上一次的差值，如果当前的差值比上一次的差值小，则用的当前的和作为结果值</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">abs</span><span class="token punctuation">(</span>target <span class="token operator">-</span> sum<span class="token punctuation">)</span> <span class="token operator">&lt;</span> Math<span class="token punctuation">.</span><span class="token function">abs</span><span class="token punctuation">(</span>target <span class="token operator">-</span> ret<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        ret <span class="token operator">=</span> sum
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>sum <span class="token operator">></span> target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 当前结果比目标值大，向左移动右指针</span>
        <span class="token constant">R</span><span class="token operator">--</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>sum <span class="token operator">&lt;</span> target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 当前结果比目标值小，向右移动左指针</span>
        <span class="token constant">L</span><span class="token operator">++</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 这是三数之和刚好等于目标值的情况，直接返回三数之和</span>
        <span class="token keyword">return</span> ret
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> ret
<span class="token punctuation">}</span>

<span class="token keyword">let</span> nums <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">4</span><span class="token punctuation">]</span>
<span class="token comment">// let nums = [0, 0, 0]</span>
<span class="token keyword">let</span> target <span class="token operator">=</span> <span class="token number">1</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">threeSumClosest</span><span class="token punctuation">(</span>nums<span class="token punctuation">,</span> target<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><Back /><Plum /></div></template>


