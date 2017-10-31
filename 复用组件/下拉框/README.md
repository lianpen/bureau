
# 下拉框

![下拉框](https://imgsa.baidu.com/forum/w%3D580/sign=bb453a2044c2d562f208d0e5d71090f3/84ac95539822720e0e8e76ba70cb0a46f31fab8e.jpg)

## 调用

```html
<div class="dropdown">
  <button class="btn dropdown-toggle">
	<label>检查人筛选</label>
	<i class="icon icon-down"></i>
  </button>
  <ul class="dropdown-menu">
	  <li data-value='0'>全部</li>
	  <li data-value='1'>熊攀峰</li>
	  <li data-value='2'>陈岳麟</li>
	  <li data-value='3'>余南山</li>
	  <li data-value='4'>刘丽娜</li>
  </ul>
</div>	
```

组件实现时会自动对所有class=dropdown的所以元素调用插件效果
所以一般情况下无需脚本调用

但是一些特殊使用的情况需要脚本调用

1. 下拉框缺省选择的不是第一个值
2. 下拉框需要改变事件的钩子

```js
$('.dropdown').dropdown({
	defaultValue: 2,
	onChange: function(value) {
		console.log(value);
	}
});
```

## 参数

### defaultValue

```String``` ```Optional```

默认选中的值 缺省为第一个值

### onChange

```Function``` ```Optional```

下拉框值改变时回调钩子

## 实现分享

下拉框打开时要在页面根元素注册一个点击事件来关闭下拉框。事件执行一次及销毁。jquery有现成$.fn.one。
