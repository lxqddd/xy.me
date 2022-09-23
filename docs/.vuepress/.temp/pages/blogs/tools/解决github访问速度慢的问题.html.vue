<template><div><ol>
<li>
<p>浏览器访问这个网站 <code v-pre>https://www.ipaddress.com/</code></p>
</li>
<li>
<p>分别输入 <code v-pre>github.com</code> 和 <code v-pre>github.global.ssl.fastly.net</code> 获取对应的 ip 地址
<img src="https://files.mdnice.com/user/17954/e11422ed-d2c4-4d9d-a27f-e5177415a8d8.png" alt=""></p>
</li>
<li>
<p>打开 hosts 文件</p>
</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># mac</span>
<span class="token function">sudo</span> <span class="token function">vim</span> /etc/hosts

<span class="token comment"># windows</span>
<span class="token comment"># c:/Windows/System32/drivers/etc</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4">
<li>在最后追加域名对应的 IP 地址并保存</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">192.30</span>.253.112 github.com
<span class="token number">151.101</span>.185.194 github.global.ssl.fastly.net
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5">
<li>刷新 DNS 缓存</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># Mac</span>
<span class="token function">sudo</span> <span class="token function">killall</span> <span class="token parameter variable">-HUP</span> mDNSResponder

<span class="token comment"># windows</span>
ipconfig/flushdns
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><Back /><Plum /></div></template>


