# 单选框

## 在线演示

您可能狠狠地点击这里：[pagination demo](https://lianpen.github.io/demo/demos/radio.html)

## 调用

```html
	<div class='radio-group'>
		<span class="radio" data-value='0'>
			<span>
				<input type="radio">
				<i></i>
			</span>
			<label>上海</label>
		</span>
		<span class="radio" data-value='1'>
			<span>
				<input type="radio">
				<i></i>
			</span>
			<label>北京</label>
		</span>
		<span class="radio" data-value='2'>
			<span>
				<input type="radio">
				<i></i>
			</span>
			<label>广州</label>
		</span>
		<span class="radio" data-value='3'>
			<span>
				<input type="radio">
				<i></i>
			</span>
			<label>深圳</label>
		</span>
	</div>
```

## 获取选中的值

```js
$('.radio-group').data('value');
```











