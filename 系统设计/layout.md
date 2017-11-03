
# 页面布局

综合管理的所有页面，布局上都有一些相似的部分。

顶部是和积分制3.0项目一样的蓝底菜单

下面左边是综合管理的目录菜单

下面右边是各个不同的页面

![页面布局](http://imgsrc.baidu.com/forum/pic/item/ff5509f2d7ca7bcbd5a43569b5096b63f724a872.jpg)

## 主要结构

```html
<div class="frame">
	<div class="frame-header">
		<%@include file="../common/head.jsp" %>
	</div>
	<div class="frame-body">
		<div class="frame-aside">
			<%@include file="../common/navigation.jsp" %>
		</div>
		<div class="frame-main qy">
		
		</div>
	</div>
</div>
```

我们的根元素命名为frame

顶部菜单命名frame-header

顶部菜单以下的主题内容命名为frame-body

下面的左侧菜单是frame-aside

下面右边是各个页面自己的部分 frame-main

## 页面命名空间

frame-main类同时共享一个类.qy 内部就是各自的页面了

各自的页面以qy-开头，比如列表页使用qy-list，这个列表页内的结构就以qy-list-开头了

```html
<div class="frame-main qy">
	<div class="qy-list"> 
		<div class='qy-list-info'>
		</div>
		<div class="qy-list-action">
		</div>
		<div class='qy-list-table'>
			<h3>全部数据100条，已选<span>0</span>条</h3>
			<table class="table"></table>
		</div>
		<div class="qy-list-pagination">
			<ul class="pagination"></ul>
		</div>
	</div>
</div>
```

## 各页面命名空间列表

- 项目类别侧边栏: qy-aside
- 项目列表页: qy-list
- 项目添加编辑页: qy-edit
- 项目详情页: qy-info





