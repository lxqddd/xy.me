---
title: 解决github访问速度慢的问题
author: 向阳
pubDate: 2022-02-16
tag: 'Tools'
description: 解决github访问速度慢的问题
---

1. 浏览器访问这个网站 `https://www.ipaddress.com/`

2. 分别输入 `github.com` 和 `github.global.ssl.fastly.net` 获取对应的 ip 地址
   ![](https://files.mdnice.com/user/17954/e11422ed-d2c4-4d9d-a27f-e5177415a8d8.png)

3. 打开 hosts 文件

```shell
# mac
sudo vim /etc/hosts

# windows
# c:/Windows/System32/drivers/etc
```

4. 在最后追加域名对应的 IP 地址并保存

```shell
192.30.253.112 github.com
151.101.185.194 github.global.ssl.fastly.net
```

5. 刷新 DNS 缓存

```shell
# Mac
sudo killall -HUP mDNSResponder

# windows
ipconfig/flushdns
```
