
# 模态框

![模态框](https://imgsa.baidu.com/forum/w%3D580/sign=32a8cd873187e9504217f3642039531b/2cd082d7277f9e2f83a0df4c1430e924b999f3be.jpg)

## 调用

```html
<div class="modal">
	<div role="document" class="modal-dialog" style="width: 520px; height: 400px; ">
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

### 打开模态框

```js
$('.modal').modal('open');
```

### 关闭模态框

```js
$('.modal').modal('close');
```

### 切换打开/关闭

```js
$('.modal').modal('toggle');
```

## 一些姿势

1. 具有modal-close的类，点击时会关闭。
2. 框体的宽度，高度可以直接内联在modal-dialog这个类上。

## 实现分享

1. 我们在打开和关闭时需要两个动画。
第一个是全屏背景的淡入淡出，称之为fade。
第二个是主框的缩放，称之为zoom。
我完全借鉴了antd的实现

> fade

```css
@-webkit-keyframes antFadeIn {
    0% {
        opacity: 0
    }

    to {
        opacity: 1
    }
}

@keyframes antFadeIn {
    0% {
        opacity: 0
    }

    to {
        opacity: 1
    }
}

@-webkit-keyframes antFadeOut {
    0% {
        opacity: 1
    }

    to {
        opacity: 0
    }
}

@keyframes antFadeOut {
    0% {
        opacity: 1
    }

    to {
        opacity: 0
    }
}
.fade-enter,.fade-leave {
    -webkit-animation-duration: .2s;
    animation-duration: .2s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-play-state: paused;
    animation-play-state: paused
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear
}

.fade-enter {
    opacity: 0
}

.fade-enter.fade-enter-active {
    -webkit-animation-name: antFadeIn;
    animation-name: antFadeIn;
    -webkit-animation-play-state: running;
    animation-play-state: running
}

.fade-leave.fade-leave-active {
    -webkit-animation-name: antFadeOut;
    animation-name: antFadeOut;
    -webkit-animation-play-state: running;
    animation-play-state: running;
    pointer-events: none
}
```

> zoom

```css
@-webkit-keyframes antZoomIn {
    0% {
        opacity: 0;
        -webkit-transform: scale(.2);
        transform: scale(.2)
    }

    to {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1)
    }
}

@keyframes antZoomIn {
    0% {
        opacity: 0;
        -webkit-transform: scale(.2);
        transform: scale(.2)
    }

    to {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1)
    }
}

@-webkit-keyframes antZoomOut {
    0% {
        -webkit-transform: scale(1);
        transform: scale(1)
    }

    to {
        opacity: 0;
        -webkit-transform: scale(.2);
        transform: scale(.2)
    }
}

@keyframes antZoomOut {
    0% {
        -webkit-transform: scale(1);
        transform: scale(1)
    }

    to {
        opacity: 0;
        -webkit-transform: scale(.2);
        transform: scale(.2)
    }
}
.zoom-enter,.zoom-leave {
    -webkit-animation-duration: .2s;
    animation-duration: .2s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-play-state: paused;
    animation-play-state: paused
}

.zoom-enter {
    -webkit-transform: scale(0);
    -ms-transform: scale(0);
    transform: scale(0);
    -webkit-animation-timing-function: cubic-bezier(.08,.82,.17,1);
    animation-timing-function: cubic-bezier(.08,.82,.17,1)
}

.zoom-leave {
    -webkit-animation-timing-function: cubic-bezier(.78,.14,.15,.86);
    animation-timing-function: cubic-bezier(.78,.14,.15,.86)
}

.zoom-enter.zoom-enter-active {
    -webkit-animation-name: antZoomIn;
    animation-name: antZoomIn;
    -webkit-animation-play-state: running;
    animation-play-state: running
}

.zoom-leave.zoom-leave-active {
    -webkit-animation-name: antZoomOut;
    animation-name: antZoomOut;
    -webkit-animation-play-state: running;
    animation-play-state: running;
    pointer-events: none
}
```

2. 为了实现两个动画，就需要两个元素。
所以我在body上额外挂一个mask。我起名为modalMask。fade动画写在mask上。
每个modal实例会用资源池模式取单例。
另外这个mask不能加z-index，所以要让主元素清pointer-events。

