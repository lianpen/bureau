# 日期选择器

![日期选择器](http://imgsrc.baidu.com/forum/pic/item/6a4a95ee76c6a7eff3f62e60f6faaf51f2de6604.jpg)

## 功能

1. 选择每个月的哪天
2. 选择每年的哪月哪天

## demo演示
您可能狠狠地点击这里：[calendar demo](https://lianpen.github.io/demo/qy-bureau/html/component/calendar.html)

## 调用

```html
<span class="calendar">
	<input readonly="" placeholder="请选择日期" class="calendar-picker-input form-control">
	<span class="calendar-picker-icon"></span>
</span>	
```

```js
$('.calendar').datePicker({
	range: 'year',
	value: '5,11',
	onChange: function(value) {
		console.log(value);
	}
});
```

## 获取选中的日期

```js
$('.calendar').data('value'); 
```

## 参数

### range

```String``` ```Mandatory``` ```value=year || month```

选择范围 **必填** 填year或者month

在一个月中选择一天用month

在一年中选择一天用year

### value

```Number|String``` ```Optional```

日期缺省值

如果范围是月，那么value等一个数字，表示每月的几号

如果范围是年，那么value是月逗号日，表示每年的几月几号

另外**特别注意！**

#### 编程中数字是从0开始的 所以数字要减1 就是说4月的话month是3 26日的话day是25 

```js
//范围是月 每月6号
$('.calendar').datePicker({
	range: 'month',
	value: '5'
});

//范围是年 每年10月12日
$('.calendar').datePicker({
	range: 'year',
	value: '9,11'
});
```

### onChange

```Function``` ```Optional```

选中日期时回调

```js
onChange = function(value) {
	console.log('选中的日期' + value); //8
}
```










