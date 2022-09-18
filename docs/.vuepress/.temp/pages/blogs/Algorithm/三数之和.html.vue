<template><div><h1 id="三数之和" tabindex="-1"><a class="header-anchor" href="#三数之和" aria-hidden="true">#</a> 三数之和</h1>
<blockquote>
<p>因为是三数之和，如果 nums 的长度小于三个，那直接返回一个空数组
对数组进行排序，如果数组中的第一项大于 0，那么这个数组中必然每一项都大于零，也就不可能有三数之和为 0，这种情况直接返回一个空数组
同样的，如果排序后的数组中的最后一项小于 0，那数组中的每一项也必然都小于 0，这种情况也返回一个空数组
遍历数组，定义三个指针，分别指向排序后的第一个元素、第二个元素和最后一个元素，
这里说一下排序的原因，1： 排序之后方便去重；2：双端指针可以减少遍历的次数
在遍历的过程中，将三个指针指向的元素相加，如果相加的和为 0，则存入结果中。
如果遍历的当前元素和前一个元素是相等的，那说明这一项会跟前一项重复，所以跳过这次遍历，进行下一次遍历
如果三数相加的和大于 0，则说明较大的数偏大，这种情况下向左移动右指针，减小较大的数据
如果三数相加的和小于 0，则说明较小的数偏下，这种情况下向右移动左指针，增大较小的数据</p>
</blockquote>
<h2 id="完整代码如下" tabindex="-1"><a class="header-anchor" href="#完整代码如下" aria-hidden="true">#</a> 完整代码如下</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">threeSum</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">threeSum</span><span class="token punctuation">(</span><span class="token parameter">nums</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 保存结果</span>
  <span class="token keyword">let</span> ret <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token comment">// 当数组长度小于3的时候直接返回空数组</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">.</span>length <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token keyword">return</span> ret
  <span class="token comment">// 记录数组长度</span>
  <span class="token keyword">let</span> len <span class="token operator">=</span> nums<span class="token punctuation">.</span>length
  <span class="token comment">// 将数组从小到大排序</span>
  nums<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=></span> a <span class="token operator">-</span> b<span class="token punctuation">)</span>
  <span class="token comment">// 如果排序后的数组的第一项大于0或者最后一项小于零，直接返回空数组</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">></span> <span class="token number">0</span> <span class="token operator">||</span> nums<span class="token punctuation">[</span>len <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">return</span> ret
  <span class="token comment">// 遍历数组</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 表示当前元素与前一项重复，结束本次循环，进行下一次循环</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">></span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">===</span> nums<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token keyword">continue</span>
    <span class="token comment">// 定义左指针</span>
    <span class="token keyword">let</span> <span class="token constant">L</span> <span class="token operator">=</span> i <span class="token operator">+</span> <span class="token number">1</span>
    <span class="token comment">// 定义右指针</span>
    <span class="token keyword">let</span> <span class="token constant">R</span> <span class="token operator">=</span> len <span class="token operator">-</span> <span class="token number">1</span>
    <span class="token comment">// 通过while循环，控制左右指针的移动</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token constant">L</span> <span class="token operator">&lt;</span> <span class="token constant">R</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 求和</span>
      <span class="token keyword">const</span> sum <span class="token operator">=</span> nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">+</span> nums<span class="token punctuation">[</span><span class="token constant">L</span><span class="token punctuation">]</span> <span class="token operator">+</span> nums<span class="token punctuation">[</span><span class="token constant">R</span><span class="token punctuation">]</span>
      <span class="token comment">// 如果三数之和为 0</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>sum <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 将对应的三个元素存入结果变量中</span>
        ret<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">[</span>nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> nums<span class="token punctuation">[</span><span class="token constant">L</span><span class="token punctuation">]</span><span class="token punctuation">,</span> nums<span class="token punctuation">[</span><span class="token constant">R</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
        <span class="token comment">// 左指针去重</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token constant">L</span> <span class="token operator">&lt;</span> <span class="token constant">R</span> <span class="token operator">&amp;&amp;</span> nums<span class="token punctuation">[</span><span class="token constant">L</span><span class="token punctuation">]</span> <span class="token operator">===</span> nums<span class="token punctuation">[</span><span class="token constant">L</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token constant">L</span><span class="token operator">++</span>
        <span class="token comment">// 右指针去重</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token constant">L</span> <span class="token operator">&lt;</span> <span class="token constant">R</span> <span class="token operator">&amp;&amp;</span> nums<span class="token punctuation">[</span><span class="token constant">R</span><span class="token punctuation">]</span> <span class="token operator">===</span> nums<span class="token punctuation">[</span><span class="token constant">R</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token constant">R</span><span class="token operator">--</span>
        <span class="token comment">// 移动左右指针</span>
        <span class="token constant">L</span><span class="token operator">++</span>
        <span class="token constant">R</span><span class="token operator">--</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>sum <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果三数之和大于 0，则向左移动右指针</span>
        <span class="token constant">R</span><span class="token operator">--</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果三数之和小于0，则向右移动左指针</span>
        <span class="token constant">L</span><span class="token operator">++</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> ret
<span class="token punctuation">}</span>

<span class="token comment">// let nums = [-1, 0, 1, 2, -1, -4]</span>
<span class="token comment">// let nums = [0, 0, 0, 0]</span>

<span class="token keyword">let</span> nums <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">threeSum</span><span class="token punctuation">(</span>nums<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


