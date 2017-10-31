
# 群艺系统管理ajax请求文档

## 调用方式

和jquery的ajax一样调用 只是把$.ajax改成$.qyAjax

```js
/**
 * 缺省是get请求
 */
$.qyAjax({
	url: url,
	data: data,
	success: noop
});

/**
 * get请求也可以：
 */
$.qyGet({
	url: url,
	data: data,
	success: noop
});

/**
 * post请求
 */
$.qyPost({
	url: url,
	data: data,
	success: noop
});

/**
 * promise方式
 */
$.qyFetch(url, data).then(func);
```

## 参数

> url

```String``` ```Mandatory```

请求地址 建议写域名后的协议 也可以写完整url地址

> data

```Object/String``` ```Optional```

请求数据 建议传对象 也可以传组合后的字符串

> success

```Function``` ```Mandatory```

请求成功回调函数

> error

```Function``` ```Optional```

请求失败回调函数 请求失败已经做过统一处理了 通常不必单独处理

> imitate

```Boolean``` ```Optional```

是否使用前端模拟 当启动前端模拟时 模块查找window.config.feRequest中配置信息 如果匹配到结果返回模拟的响应

> async

```Boolean``` ```Optional```

是否是异步请求 默认true 不建议使用同步方式

> complete

```Function``` ```Optional```

不论请求成功还是失败都可以触发这个钩子

## 封装内容

### 处理url

模块会正则判断url是否带http 如果没有会补全系统的请求通用地址

### 处理模拟请求

应对无法远程请求的情况 设置param.imitate=true 前端根据配置文件模拟一个返回

### 防御csrf攻击

在 HTTP 请求中以參数的形式添加一个随机产生的 token，并在服务器端建立一个拦截器来验证这个 token，假设请求中没有 
token 或者 token 内容不对，则觉得可能是 CSRF 攻击而拒绝该请求

### 防御xss攻击

对于用户输入的内容 在输出数据之前对潜在的威胁的字符进行编码、转义。
```
< 转成 &lt;
> 转成 &gt;
& 转成 &amp;
" 转成 &quot;
' 转成 &#39
```

### 请求错误统一处理

初步考虑统一提示框 提示网络超时或请求错误


























