<template><div><p>hello，最近写了一个压缩文件的命令行工具，今天分享给大家。</p>
<h2 id="起因" tabindex="-1"><a class="header-anchor" href="#起因" aria-hidden="true">#</a> 起因</h2>
<ol>
<li>由于前公司一些不可抗的情况，最近换了工作，吃饭的家伙也从 Mac 转成了 Win，之前用 Mac 的时候，习惯了终端操作，现在用 Win，感觉不是很适应，尽管 Win 自带的 <code v-pre>powershell</code> 也很强大。</li>
<li>工作中开发的项目在测试的时候需要先压缩成压缩包，再上传到对应的桌面应用测试。</li>
<li>在网上下载的压缩软件大都捆绑的有广告，hen~烦</li>
<li><code v-pre>powershell</code> 的压缩命令太长了，用起来不方便，并且桌面应用 ide 升级之后，通过 <code v-pre>Compress-Archive</code> 压缩的文件不能被正确的解析。</li>
<li>最后一个原因，我不想再去学 <code v-pre>powershell</code> 的指令了！！！</li>
</ol>
<p><img src="https://files.mdnice.com/user/17954/fc376ad8-2daf-435e-aaaa-babbbca93c9a.png" alt=""></p>
<p>综合上述的原因，我用 node 写了一个压缩工具 <strong><code v-pre>fzip</code></strong></p>
<h2 id="对比" tabindex="-1"><a class="header-anchor" href="#对比" aria-hidden="true">#</a> 对比</h2>
<p>来跟 <code v-pre>Compress-Archive</code> 做一下对比</p>
<ul>
<li>使用 <code v-pre>fzip</code> 压缩</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>fzip <span class="token parameter variable">-f</span> ./test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>使用 <code v-pre>Compress-Archive</code> 进行压缩</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Compress-Archive <span class="token parameter variable">-Path</span> ./test <span class="token parameter variable">-DestinationPath</span> ./test.zip
<span class="token comment"># 解释一下参数</span>
<span class="token comment"># -Path 来源</span>
<span class="token comment"># -DestinationPath 输出位置</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上边两条指令都会将当前目录下的 test 目录压缩成一个 zip 包，但是使用 <code v-pre>powershell</code> 的指令真的很长啊有木有！</p>
<p>当然了，<code v-pre>fzip</code> 也是支持指定输出位置和命名压缩包的，不仅如此，还支持设置压缩等级！下边会有详细的文档供您食用！</p>
<h2 id="使用方法" tabindex="-1"><a class="header-anchor" href="#使用方法" aria-hidden="true">#</a> 使用方法</h2>
<ul>
<li>使用 <code v-pre>npm</code> 安装</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> @lxqddd/fzip <span class="token parameter variable">-g</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>使用 <code v-pre>yarn</code> 安装</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">yarn</span> <span class="token function">install</span> @lxqddd/fzip <span class="token parameter variable">-g</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>使用 <code v-pre>pnpm</code> 安装</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">pnpm</span> <span class="token function">install</span> @lxqddd/fzip <span class="token parameter variable">-g</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="参数说明" tabindex="-1"><a class="header-anchor" href="#参数说明" aria-hidden="true">#</a> 参数说明</h2>
<table>
<thead>
<tr>
<th>参数</th>
<th>参数来源</th>
<th>参数注解</th>
</tr>
</thead>
<tbody>
<tr>
<td>-f</td>
<td>From</td>
<td>压缩目标来源（必选）</td>
</tr>
<tr>
<td>-o</td>
<td>Output</td>
<td>压缩产物输出位置（可选，不传则为来源同级目录）</td>
</tr>
<tr>
<td>-l</td>
<td>Level</td>
<td>压缩级别 0~9（可选，不传则默认为 6）</td>
</tr>
<tr>
<td>-n</td>
<td>Name</td>
<td>压缩包名称（可选，不传则默认为文件或目录的名字）</td>
</tr>
</tbody>
</table>
<h2 id="使用示例" tabindex="-1"><a class="header-anchor" href="#使用示例" aria-hidden="true">#</a> 使用示例</h2>
<div class="language-tree ext-tree line-numbers-mode"><pre v-pre class="language-tree"><code>.
├── LICENSE
├── README.md
├── gulpfile.js
├── package.json
├── src
│   ├── cli.ts
│   ├── core
│   │   └── index.ts
│   ├── types
│   │   └── index.ts
│   └── utils
│       └── index.ts
├── tsconfig.json
└── yarn.lock

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>基础用法</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 指令执行之后会在 `src` 的同级目录输出一个 `src.zip` 的压缩包</span>
fzip <span class="token parameter variable">-f</span> ./src
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>指定输出位置</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 指令执行之后会在桌面上输出一个 `src.zip` 的压缩包</span>
fzip <span class="token parameter variable">-f</span> ./src <span class="token parameter variable">-o</span> ~/Desktop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>指定压缩等级</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 压缩产物的压缩级别为 9</span>
fzip <span class="token parameter variable">-f</span> ./src <span class="token parameter variable">-o</span> ~/Desktop <span class="token parameter variable">-l</span> <span class="token number">9</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>重命名</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 指令执行之后会在 `src` 的通级目录下输出一个名为 `test.zip` 的压缩包</span>
fzip <span class="token parameter variable">-f</span> ./src <span class="token parameter variable">-n</span> <span class="token builtin class-name">test</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上边说的都是压缩目录的，也可以压缩单个文件，使用方法类似，只需要将输入路径指向被压缩的目标文件即可</p>
<ul>
<li>压缩单个文件</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 指令执行之后会在桌面输出一个名为 `test.zip` 的压缩包</span>
fzip <span class="token parameter variable">-f</span> ./src/cli.ts <span class="token parameter variable">-o</span> ~/Desktop <span class="token parameter variable">-n</span> <span class="token builtin class-name">test</span> <span class="token parameter variable">-l</span> <span class="token number">9</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>项目地址：https://github.com/lxqddd/FZip</p>
<p>欢迎 issues！</p>
<p>![](https://files.mdnice.com/user/17954/3464ccf7-2e2b-4506-970f-326a88a8c245.png =60%x)
如果你觉得写的不错的话，欢迎三连~
<img src="https://img.soogif.com/5HkHKKxGJ6ZmhQ7c8nLYOE9jfEXDpqp4.gif?scope=mdnice" alt=""></p>
<Back /><Plum /></div></template>


