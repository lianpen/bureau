# 消息

## demo演示
您可能狠狠地点击这里：[message demo](https://lianpen.github.io/demo/demos/message.html)

## 调用

### 确认框

![确认框](https://imgsa.baidu.com/forum/w%3D580/sign=be3d20b53f9b033b2c88fcd225cf3620/75428319367adab420fa26f280d4b31c8701e431.jpg)

```js
$.confirm({
	title: '确认要修改刘丽娜吗？',
	content: '修改了刘丽娜以后刘丽娜就会变得奇怪了。',
	onOk: function() {
		console.log('确认无误。');
	}
});
```

### 普通消息框

![消息框](https://imgsa.baidu.com/forum/w%3D580/sign=b03d68d82e2dd42a5f0901a3333a5b2f/b449b61ab051f819e10f3efbd1b44aed2e73e731.jpg)

```js
$.message({
	icon: 'icon icon-check',
	iconColor: '#f00',
	iconFontSize: '22',
	title: '提交成功',
	content: '棒棒哒',
	onOk: function() {
		console.log('确认无误。');
	}
})
```

### 普通消息框 只有标题没有内容 没有底部按钮 3秒后自动关闭

![消息框](https://imgsa.baidu.com/forum/w%3D580/sign=6aed54c2f0f2b211e42e8546fa816511/926bec25b899a90136dd698716950a7b0308f577.jpg)

```js
$.message({
	title: '提交成功',
	hasButtons: false,
	duration: 3000
})
```

### 普通消息框 自定义底部按钮

![消息框](https://imgsa.baidu.com/forum/w%3D580/sign=a91e63e1073387449cc52f74610ed937/42a71b168a82b90115aafe82788da9773812efdc.jpg)

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

antd标准库库

```icon icon-check```

自定义库

```qyfont qyfont-check```

缺省是一个圆心勾

### iconColor

```String``` ```Optional```

图标颜色

### iconFontSize

```Number``` ```Optional```

图标大小

### hasButtons

```Boolean``` ```Optional``` ```default=true```

是否有底部按钮 缺省是有的

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
如果长度为1，那么第二个按钮是取消。
如果长度大于2，那么第二个以后的会失效。

### onOk

```Function``` ```Optional```

确认按钮回调函数 只有在hasButtons参数为缺省的true且buttons参数未定义时才生效

### duration

```Number``` ```Optional``` ```default=3000```

自动消失的持续时间 在hasButtons参数为false时才生效







