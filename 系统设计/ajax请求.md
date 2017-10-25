
# 群益系统管理ajax请求文档

### 调用方式
---

和jquery的ajax一样调用 只是把$.ajax改成$.qyAjax

```js
/**
 * 缺省是get请求
 */
$.qyAjax({
	url: url,
	data: data,
	success: noop,
	error: noop
});

/**
 * get请求也可以：
 */
$.qyGet({
	url: url,
	data: data,
	success: noop,
	error: noop
});

/**
 * post请求
 */
$.qyPost({
	url: url,
	data: data,
	success: noop,
	error: noop
});

/**
 * promise方式
 */
$.qyFetch(url, data).then(func);
```

### 参数
---

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

> async

```Boolean``` ```Optional```

是否是异步请求 默认true 不建议使用同步方式

> complete

```Function``` ```Optional```

不论请求成功还是失败都可以触发这个钩子

### 封装内容
---




























