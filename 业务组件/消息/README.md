# 消息

![消息]()

## demo演示
您可能狠狠地点击这里：[message demo](https://lianpen.github.io/demo/demos/message.html)

## 调用

### 确认框

```js
$.confirm({
	title: '确认要移除吗？',
	content: '移除后将不可恢复',
	onOk: function() {
		console.log('确认无误。');
	}
});
```

### 普通消息框

```js
$.message({
	icon: 'icon icon-check',
	iconColor: '#f00',
	iconFontSize: '22',
	title: '确认要移除吗？',
	content: '移除后将不可恢复',
	onOk: function() {
		console.log('确认无误。');
	}
})
```

### 普通消息框 只有标题没有内容 没有底部按钮 3秒后自动关闭

```js
$.message({
	icon: 'icon icon-check',
	iconColor: '#f00',
	title: '恭喜你升级了',
	hasButtons: false,
	duration: 3000
})
```

### 普通消息框 自定义底部按钮

```js
$.message({
	title: '提交成功',
	buttons: [{
		text: '继续提交',
		onClick: noop
	}, {
		text: '从重新编辑',
		onClick: noop
	}]
});
```

## 参数

### title

```String``` ```Mandatory```

标题

### content

```String``` ```Optional```

内容 缺省没有内容

### icon

```String``` ```Optional```

图标 写图标的类 比如

```icon icon-check```

```qyfont qyfont-check```

缺省没有图标

### iconColor

```String``` ```Optional```

图标颜色

### iconFontSize

```Number``` ```Optional```

图标大小

### buttons

```Array``` ```Optional```

底部按钮

```js
buttons: [{
	text: '继续提交',
	onClick: noop
}, {
	text: '从重新编辑',
	onClick: noop
}]
```

```js

buttons: [{
	text: '继续提交',
	onClick: noop
}]
```

缺省是确认和取消两个按钮

buttons长度最多为2。
如果长度为1，那么第二个按钮是取消

### onOk

```Function``` ```Optional```

确认按钮回调函数 只有在未定义buttons参数时才生效

### duration

```Number``` ```Optional``` ```default=3000```

自动消失的持续时间 在未定义buttons参数时才生效







