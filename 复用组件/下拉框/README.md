
# 下拉框

![下拉框](https://imgsa.baidu.com/forum/w%3D580/sign=bb453a2044c2d562f208d0e5d71090f3/84ac95539822720e0e8e76ba70cb0a46f31fab8e.jpg)

## 在线演示

您可能狠狠地点击这里：[dropdown demo](https://lianpen.github.io/demo/qy-bureau/html/component/dropdown.html)

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

## 获取当前选中的值

```js
$('.dropdown').data('value');
```

## 参数

### defaultValue

```String``` ```Optional```

默认选中的值 缺省为第一个值

### onChange

```Function``` ```Optional```

下拉框值改变时回调钩子

## 实现分享

1. 拉出的框不能直接绑在元素上，因为任何一级父元素设置超出隐藏的话，下拉框就看不到了。
正确的实现是组件初始化的时候，在body下挂一个元素，相对body来absolute定位。
在我的实现中，利用克隆ul元素，克隆出的ul来toggleShow，实现打开关闭。而组件下挂的元素display永远是none。

2. 下拉框打开时要在页面根元素注册一个点击事件来关闭下拉框。事件执行一次及销毁。jquery有现成$.fn.one。

3. 分享下拉和收缩的动画，我借鉴了ant-design的动画库slice-up。让scaleY从0.8-1的同时，让opacity从0到1。
transform-origin是0,0。
另外要注意toggleShow和toggleClass的顺序。

```css
@keyframes antSlideUpIn {
    0% {
        opacity: 0;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(.8);
        transform: scaleY(.8)
    }

    to {
        opacity: 1;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(1);
        transform: scaleY(1)
    }
}
.slide-up-enter,.slide-up-leave {
    -webkit-animation-duration: .2s;
    animation-duration: .2s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-play-state: paused;
    animation-play-state: paused
}

.slide-up-enter.slide-up-enter-active {
    -webkit-animation-name: antSlideUpIn;
    animation-name: antSlideUpIn;
    -webkit-animation-play-state: running;
    animation-play-state: running
}

.slide-up-leave.slide-up-leave-active {
    -webkit-animation-name: antSlideUpOut;
    animation-name: antSlideUpOut;
    -webkit-animation-play-state: running;
    animation-play-state: running;
    pointer-events: none
}
```

我是没有明白为何要额外加active，我觉得没啥用去掉了，精简成：

```css
.slide-up-enter {
    -webkit-animation: antSlideUpIn .2s;
    animation: antSlideUpIn .2s;
    animation-fill-mode: both;
}

.slide-up-leave {
    -webkit-animation: antSlideUpOut .2s;
    animation: antSlideUpOut .2s;
    animation-fill-mode: both;
}
```


4. 动画结束时需要关闭动画类，隐藏等操作，是用setTimeout或者transitionend实现的。
如果用户点的快的话，动画过程中会开启另一个动画，然后前一个动画时间到了触发事件就影响了下一个动画。
所以，每一个动画需要一个uuid。
闭包实现记住uuid和整个下拉框对象的uuid做比较，如果不一致，表示下一个动画已经登场了。就交给下一代了。


