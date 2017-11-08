# 解决github官网打不开的方案

有时github会打不开，看到资源拉不到

那是因为域名解析失败

我们ping域名ping不到

我们通过ip地址网站找到ip

发现ip可以ping到

所以打开hosts 配置域名解析

```
151.101.112.133 assets-cdn.Github.com
151.101.112.133 avatars0.Githubusercontent.com
```

就可以了