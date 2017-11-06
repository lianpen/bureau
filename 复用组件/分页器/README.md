# 分页器

## 在线演示

您可能狠狠地点击这里：[pagination demo](https://lianpen.github.io/demo/qy-bureau/html/component/pagination.html)

## 调用

```html
<div class='pagination'></div>
```
```js
$('.pagination').pagination({
	total: 500,
	onChange: noop
});
```

## 参数

### total

```Number``` ```Mandatory```

数据总数

### onChange

```Function``` ```Optional```

分页变化时回调

```js
onChange = function(current) {
	console.log('当前页：' + current);
}
```

### pageSize

```Number``` ```Optional``` ```default=15```

每页条数

### current

```Number``` ```Optional``` ```default=1```

缺省的当前页

### jumpNumber

```Number``` ```Optional``` ```default=5```

快跳页数

## 实现功能

1. 页数小于等于9时 显示全部的页码

![image](https://imgsa.baidu.com/forum/w%3D580/sign=69d8145450b5c9ea62f303ebe538b622/bb21dfb54aed2e73d697a4738c01a18b86d6facb.jpg)

2. 页数大于9时 显示第一页，点点点，当前页前两页，当前页，当前页后两页，点点点，尾页

![image](https://imgsa.baidu.com/forum/w%3D580/sign=04f6de851ece36d3a20483380af23a24/c7b62b728bd4b31cd842b6e48cd6277f9f2ff8cb.jpg)

3. 当前页小于等于4时 不显示左边的点点点

![image](https://imgsa.baidu.com/forum/w%3D580/sign=7200caab5ada81cb4ee683c56267d0a4/70a1aa50f3deb48f533a8381fb1f3a292cf578fe.jpg)

4. 当前页大于等于总页数减4时 不显示右边的点点点

![image](https://imgsa.baidu.com/forum/w%3D580/sign=747723f4083b5bb5bed720f606d2d523/0b43337bdab44aed72309cbbb81c8701a08bfbcb.jpg)

5. 当前页为第一页时  前一页不可点击

![image](https://imgsa.baidu.com/forum/w%3D580/sign=3591bbc025dda3cc0be4b82831e83905/1cd4a5ed08fa513d58304e81366d55fbb3fbd9b7.jpg)

6. 当前页为最后一页时 最后一页不可点击

![image](https://imgsa.baidu.com/forum/w%3D580/sign=7faea4b19782d158bb8259b9b00b19d5/640b302bc65c1038fde4ec9db9119313b17e89b7.jpg)

7. 鼠标悬浮到点点点时 变成快进图标 点击后快进5页或快退5页

![image](https://imgsa.baidu.com/forum/w%3D580/sign=dfb9847cbb7eca80120539efa1229712/245a49096e061d9567d3156770f40ad163d9cab0.jpg)

## 依赖

[jquery](https://github.com/jquery/jquery)

[bootstrap](https://github.com/twbs/bootstrap)

[underscore](https://github.com/jashkenas/underscore)
















