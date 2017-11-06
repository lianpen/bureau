# 表格

## 在线演示

您可能狠狠地点击这里：[table demo](https://lianpen.github.io/blob/master/qy-bureau/html/component/table.html)

## 调用

```html
<div class='table'></div>
```
```js
var columns = [{
	title: '检查人',
	content: 'checkPerson'
}, {
	title: '绑定事件',
	content: 'time',
}, {
	title: '签名',
	content: function(data) {
		return '<div class="sign">' + data.sign + '</div>';
	}
}];
var data = [{
	checkPerson: 'lina',
	time: '2017-07-10',
	sign: 'xiong'
}, {
	checkPerson: 'diudiu',
	time: '2017-07-11',
	sign: 'ling'
}];
$('.table').table({
	columns: columns,
	data: data
});
```

## 更新数据

```js
$('.table').table({
	action: 'updateData',
	data: data
});
```

## 参数

### columns

```Array``` ```Mandatory```

行规则 在每行规则中 title是表头标题 content是内容

content内容可以写两种形式

第一种形式是键 匹配数据data中的键

第二种形式是函数 显示函数的返回的内容

### data

```Array``` ```Mandatory```

表格数据

### checkable

```Boolean``` ```Optional``` ```default=true```

表格最左边是否有勾选框

### onCheck

```Function``` ```Optional``` 

勾选框选中项改变事件钩子 返回全部的选中数据项

包括单行的勾选框改变 以及全部勾选框改变都会触发这个钩子

```js
onCheck = function(checkedData) {
	console.log(checkedData); 
	/**
	 *  [{
			checkPerson: 'lina',
			time: '2017-07-10',
			sign: 'xiong'
		}, {
			checkPerson: 'diudiu',
			time: '2017-07-11',
			sign: 'ling'
		}]
	 */
}
```

### onRowClick

```Function``` ```Optional```

单行点击事件 返回这一行的数据

```js
onRowClick = function(data) {
	console.log(data); 
	/**
	 *  {
			checkPerson: 'diudiu',
			time: '2017-07-11',
			sign: 'ling'
		}
	 */
}
```

## 依赖

[jquery](https://github.com/jquery/jquery)

[bootstrap](https://github.com/twbs/bootstrap)

[underscore](https://github.com/jashkenas/underscore)
















