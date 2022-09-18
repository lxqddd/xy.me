<template><div><h1 id="盛水最多的容器" tabindex="-1"><a class="header-anchor" href="#盛水最多的容器" aria-hidden="true">#</a> 盛水最多的容器</h1>
<blockquote>
<p>盛最多水的容器，可以理解为计算矩形的面积，矩形的高为数组中给定的数据，矩形的宽为两个高度之间的距离</p>
</blockquote>
<h2 id="第一种思路" tabindex="-1"><a class="header-anchor" href="#第一种思路" aria-hidden="true">#</a> 第一种思路</h2>
<blockquote>
<p>时间复杂度和空间复杂度都较高，理解起来相对容易</p>
</blockquote>
<ol>
<li>记录两个游标 i 和 j</li>
<li>i 和 j 分别对应不同的高度，而矩形的高度应该是两个高度之中较小的哪一个，因为要盛水~</li>
<li>矩形的宽度是 i 和 j 的差值</li>
<li>现在宽和高都已经定义好了，那我们就可以去计算矩形的面积了，不就是 <code v-pre>长 * 宽</code> 嘛</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">maxArea</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">height</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> area <span class="token operator">=</span> <span class="token number">0</span>
  <span class="token keyword">let</span> temp <span class="token operator">=</span> <span class="token number">0</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> height<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> j <span class="token operator">=</span> i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> j <span class="token operator">&lt;=</span> height<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>height<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">></span> height<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        temp <span class="token operator">=</span> height<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">*</span> <span class="token punctuation">(</span>j <span class="token operator">-</span> i<span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        temp <span class="token operator">=</span> height<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">*</span> <span class="token punctuation">(</span>j <span class="token operator">-</span> i<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>temp <span class="token operator">></span> area<span class="token punctuation">)</span> area <span class="token operator">=</span> temp
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> area
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="代码解读" tabindex="-1"><a class="header-anchor" href="#代码解读" aria-hidden="true">#</a> 代码解读</h3>
<ol>
<li>定义两个变量，area 和 temp，分别代表最大面积和一个临时面积</li>
<li>开始循环
<ol>
<li>按顺序取高度</li>
<li>第一层循环，表示第一个高度</li>
<li>长度减 2，表示 i 最多只能取到倒数第二个值</li>
<li>第二层循环，表示第二个高度</li>
<li>长度减 1 表示 j 可以取到最后一个值，这也是为什么 i 要减 2 的原因</li>
</ol>
</li>
<li>再循环中对两个高度进行比较，取出其中较小的一个和宽度相乘（宽度其实就是两个游标之间的距离，也就是 j - i）</li>
<li>比较 area 和 temp 的值，将较大的一个作为当前矩形的面积，然后进行下一轮循环</li>
</ol>
<p>这种解法虽然能够解决问题，但是因为用了双重循环，所以时间复杂度太高</p>
<h2 id="第二种方法" tabindex="-1"><a class="header-anchor" href="#第二种方法" aria-hidden="true">#</a> 第二种方法</h2>
<p>思路其实跟第一种解法差不多，只是游标的定义不太一样，我们直接看代码叭</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">maxArea</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">height</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> area <span class="token operator">=</span> <span class="token number">0</span>
  <span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span>
  <span class="token keyword">let</span> j <span class="token operator">=</span> height<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span>

  <span class="token keyword">for</span> <span class="token punctuation">(</span>i<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> j<span class="token punctuation">;</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> minHeight <span class="token operator">=</span> height<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">></span> height<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">?</span> height<span class="token punctuation">[</span>j<span class="token operator">--</span><span class="token punctuation">]</span> <span class="token operator">:</span> height<span class="token punctuation">[</span>i<span class="token operator">++</span><span class="token punctuation">]</span>
    <span class="token keyword">const</span> temp <span class="token operator">=</span> minHeight <span class="token operator">*</span> <span class="token punctuation">(</span>j <span class="token operator">-</span> i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span>
    area <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>area<span class="token punctuation">,</span> temp<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> area
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="代码解读-1" tabindex="-1"><a class="header-anchor" href="#代码解读-1" aria-hidden="true">#</a> 代码解读</h3>
<ol>
<li>首先还是要定义 area 作为最终面积的存储空间</li>
<li>定义两个指针 i 和 j
<ol>
<li>这里就和第一种方式不一样了，第一种方式定义的时候是两个指针统一从左向右移动</li>
<li>这里定义的两个指针分别指向第一个元素和最后一个元素</li>
</ol>
</li>
<li>开始循环，循环的起点是数组中的第一个元素，当两个指针相遇时结束循环</li>
<li>获取到两个高度中较小的一个，然后移动游标
<ol>
<li>如果左指针对应的高度比右指针对应的高度大</li>
<li>那就向内（向左）移动右指针</li>
<li>如果右指针对应的高度比左指针对应的高度大</li>
<li>那就向内（向右）移动左指针</li>
<li>为什么总是移动较小的哪一个呢？</li>
<li>因为如果移动较大的哪一个指针，那么移动之后的面积一定比当前的面积小
<ol>
<li>这里再稍微详细的解释一下</li>
<li>比如说现在 i 指向的高度是 2，j 指向的高度是 8，i 和 j 之间的距离是 6</li>
<li>那么这个时候的面积是 <code v-pre>2 * 6 = 12</code></li>
<li>如果移动的是 j，那不管移动的结果如何，哪怕 j 指向的高度比 8 更大，新的面积也只会比 12 更小</li>
<li>因为移动之后较小的高度是不变的，而 i 和 j 之间的距离变小了，所以 面积也是更小的</li>
<li>这就是要移动指向较小高度的指针的原因</li>
</ol>
</li>
</ol>
</li>
<li>指针移动之后，求一个临时面积 temp，这里在计算宽度的时候需要在 <code v-pre>j - i</code> 的基础上加 1，因为这里的 i 和 j 对应的是数组的下表，所以会比实际的宽度小 1</li>
<li>比较临时面积 temp 和 area，将较大的那一个作为最终面积</li>
</ol>
<Plum /></div></template>


