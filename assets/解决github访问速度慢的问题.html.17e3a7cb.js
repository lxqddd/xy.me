import{_ as e,r as n,o as a,c as i,a as l,b as c}from"./app.e640ebd4.js";const d={},o=c(`<ol><li><p>\u6D4F\u89C8\u5668\u8BBF\u95EE\u8FD9\u4E2A\u7F51\u7AD9 <code>https://www.ipaddress.com/</code></p></li><li><p>\u5206\u522B\u8F93\u5165 <code>github.com</code> \u548C <code>github.global.ssl.fastly.net</code> \u83B7\u53D6\u5BF9\u5E94\u7684 ip \u5730\u5740 <img src="https://files.mdnice.com/user/17954/e11422ed-d2c4-4d9d-a27f-e5177415a8d8.png" alt=""></p></li><li><p>\u6253\u5F00 hosts \u6587\u4EF6</p></li></ol><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># mac</span>
<span class="token function">sudo</span> <span class="token function">vim</span> /etc/hosts

<span class="token comment"># windows</span>
<span class="token comment"># c:/Windows/System32/drivers/etc</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>\u5728\u6700\u540E\u8FFD\u52A0\u57DF\u540D\u5BF9\u5E94\u7684 IP \u5730\u5740\u5E76\u4FDD\u5B58</li></ol><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token number">192.30</span>.253.112 github.com
<span class="token number">151.101</span>.185.194 github.global.ssl.fastly.net
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5"><li>\u5237\u65B0 DNS \u7F13\u5B58</li></ol><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># Mac</span>
<span class="token function">sudo</span> <span class="token function">killall</span> <span class="token parameter variable">-HUP</span> mDNSResponder

<span class="token comment"># windows</span>
ipconfig/flushdns
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6);function t(r,m){const s=n("Plum");return a(),i("div",null,[o,l(s)])}const u=e(d,[["render",t],["__file","\u89E3\u51B3github\u8BBF\u95EE\u901F\u5EA6\u6162\u7684\u95EE\u9898.html.vue"]]);export{u as default};
