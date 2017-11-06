
# ui使用

综合管理的ui是基于bootstrap的 但是最终效果要和ant-design一样 所以我做了bootstrap定制

总体ui使用上和
[bootstrap官方文档](http://v3.bootcss.com/css/)
一样 但是基于一些实现的考虑 有些地方略有区别

## 在线演示

您可能狠狠地点击这里：[ui demo](https://lianpen.github.io/demo/qy-bureau/html/component/ui.html)

## 文件引用

```html
<link rel="stylesheet" href="bootstrap.css" />
<link rel="stylesheet" href="bootstrap-theme.css" />
<link rel="stylesheet" href="iconfont.css" />
```

引用3个文件 

bootstrap.css是官方标准样式

bootstrap-theme.css是定制主题 我就是通过这个文件模仿ant-design的

iconfont.css是一个icon字体库 可使用的icon见[ant-design官方文档](https://ant.design/components/icon-cn/)

## 按钮

![按钮](https://imgsa.baidu.com/forum/w%3D580/sign=8590f5973dd12f2ece05ae687fc3d5ff/e0794a4b20a44623f78b31229322720e0df3d78e.jpg)

```html
<button type="button" class="btn">默认按钮</button>
<button type="button" class="btn btn-primary">主按钮</button>
<button type="button" class="btn btn-danger">危险点击</button>	
<button type="button" class="btn btn-disabled">禁用</button>	
```

## 复选框

![复选框](https://imgsa.baidu.com/forum/w%3D580/sign=22c7b83c5a0fd9f9a0175561152cd42b/c7cbf302738da977f02d116bbb51f8198718e3c9.jpg)

```html
  <div class="checkbox">
    <label>
      <input type="checkbox"> 
	  <i></i>Check me out
    </label>
  </div>
```

没有文字时也要套label

```html
  <div class="checkbox">
    <label>
      <input type="checkbox"> 
	  <i></i>
    </label>
  </div>
```

## 单选框

![单选框](https://imgsa.baidu.com/forum/w%3D580/sign=846e815f60600c33f079dec02a4c5134/0f7dcafd1e178a82560c3debfd03738da977e822.jpg)

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
</div>
```

## 图标

### 标准icon

```html
<i class="icon icon-down"></i>
```

### 非标准icon

```html
<i class="icomoon-check"></i>
```

详见[图标文档](https://github.com/lianpen/qy-bureau/demo/%E7%B3%BB%E7%BB%9F%E8%AE%BE%E8%AE%A1/icon.md)

## 输入框

![输入框](https://imgsa.baidu.com/forum/w%3D580/sign=331bc910073387449cc52f74610ed937/42a71b168a82b9018faf5473788da9773812efc9.jpg)

```html
<input type="text" class="form-control" placeholder="Email">
```

## 搜索框

![搜索框](https://imgsa.baidu.com/forum/w%3D580/sign=8cb9a854a018972ba33a00c2d6cc7b9d/b77228f4e0fe9925e09efd103fa85edf8cb171b8.jpg)

```html
<div class="search">
	<input type="text" class="form-control" placeholder="输入项目">
	<i class="icon icon-search"></i>
</div>
```

## 下拉框

![下拉框](https://imgsa.baidu.com/forum/w%3D580/sign=bb453a2044c2d562f208d0e5d71090f3/84ac95539822720e0e8e76ba70cb0a46f31fab8e.jpg)

```html
<div class="dropdown" data-value="0">
  <button class="btn dropdown-toggle">
	<label>检查人筛选</label>
	<i class="icon icon-down"></i>
  </button>
  <ul class="dropdown-menu">
	  <li data-value="0">全部</li>
	  <li data-value="1">熊攀峰</li>
	  <li data-value="2">陈岳麟</li>
	  <li data-value="3">余南山</li>
	  <li data-value="4">刘丽娜</li>
  </ul>
</div>	
```

详见[下拉框文档](https://github.com/lianpen/qy-bureau/tree/master/%E5%A4%8D%E7%94%A8%E7%BB%84%E4%BB%B6/%E4%B8%8B%E6%8B%89%E6%A1%860)

## 分页条

![分页条](https://imgsa.baidu.com/forum/w%3D580/sign=ab9b97a1242eb938ec6d7afae56385fe/c21125a5462309f76f2e3952790e0cf3d6cad68e.jpg)

```html
<div class='pagination'></div>
```

```js
$('.pagination').pagination({
	total: 500
});
```

详见[分页条文档](https://github.com/lianpen/qy-bureau/tree/master/%E5%A4%8D%E7%94%A8%E7%BB%84%E4%BB%B6/%E5%88%86%E9%A1%B5%E5%99%A8)

## 表格

![表格](https://imgsa.baidu.com/forum/w%3D580/sign=df9ff67fd2f9d72a17641015e42b282a/7b58768ca977391276c81721f3198618377ae265.jpg)

```html
<div class='table'></div>
```

```js
$('.table').table({
	columns: columns,
	data: data
});
```

详见[表格文档](https://github.com/lianpen/qy-bureau/tree/master/%E5%A4%8D%E7%94%A8%E7%BB%84%E4%BB%B6/%E8%A1%A8%E6%A0%BC)

## 模态框

![模态框](https://imgsa.baidu.com/forum/w%3D580/sign=32a8cd873187e9504217f3642039531b/2cd082d7277f9e2f83a0df4c1430e924b999f3be.jpg)

```html
<div class="modal">
	<div role="document" class="modal-dialog" style="width: 520px;">
		<div class="modal-content">
			<button class="modal-close"><span class="modal-close-x"></span></button>
			<div class="modal-header">
				<div class="ant-modal-title">模态框标题</div>
			</div>
			<div class="modal-body">
				<p>xiong</p>
				<p>ling</p>
				<p>yong</p>
				<p>lina</p>
				<p>diudiu</p>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn modal-close"><span>取消</span></button>
				<button type="button" class="btn btn-primary"><span>确定</span></button>
			</div>
		</div>
	</div>
</div>	
```

```js
$('.modal').modal('open');
```

详见[模态框文档](https://github.com/lianpen/qy-bureau/tree/master/%E5%A4%8D%E7%94%A8%E7%BB%84%E4%BB%B6/%E6%A8%A1%E6%80%81%E6%A1%86)