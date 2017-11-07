
# 综合管理icon文档

我们的icon分为标准库和非标准库

标准库来自[ant-design](https://ant.design/components/icon-cn/)。无需维护。

非标准库是我们自己维护的。
我们可以从阿里的[iconfont](http://www.iconfont.cn/)等网站找到需要的icon。然后制作我们的webfont。

## icon使用

### 标准库使用

```html
<i class='icon icon-xxx'></i>
```

xxx写图标的名字 图标从[这里](https://ant.design/components/icon-cn/)找

注意要去掉中间的横杠。比如```<Icon type="down-circle-o" />```这个图标，要这样调用：

```html
<i class='icon icon-downcircleo'></i>
```

### 非标准库使用

```html
<i class='icomoon-xxx'></i>
```

xxx写图标的名字 在svg文件夹中

## 如何制作非标准图标

下面要隆重介绍我们的神器

![神器](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509445233745&di=749ad27c2a106d4a69cc0ea7b4ca0c93&imgtype=0&src=http%3A%2F%2Fimg.xskhome.com%2Fpic%2F2014%2Fgame%2F20140606%2F1251545285.png)




```math
ICOMOON
```

[icomoon](https://icomoon.io/app/#/select)是一个可以把一组svg文件生成webfont的在线生成工具。请果断收藏。

首先 在浏览器打开网站[https://icomoon.io/app/#/select](https://icomoon.io/app/#/select) 
就看到一个很吊的页面

![icomoon](https://imgsa.baidu.com/forum/w%3D580/sign=c0d40f668182b9013dadc33b438ca97e/5c93a287c9177f3e6821d84c7bcf3bc79f3d5631.jpg)

点击左上角的import icons，把svg文件都选出来 

然后点击右下角的Generate Font

![icomoon](https://imgsa.baidu.com/forum/w%3D580/sign=117d37e652ee3d6d22c687c373176d41/45ced442ad4bd11333b0937351afa40f4afb05c9.jpg)

就进入了生成页

![icomoon](https://imgsa.baidu.com/forum/w%3D580/sign=0a6596e5afc27d1ea5263bcc2bd4adaf/6886e21090ef76c679b5df6a9616fdfaae5167ec.jpg)

点击右下角的配置图标

![icomoon](https://imgsa.baidu.com/forum/w%3D580/sign=0bd2c54e8c94a4c20a23e7233ef51bac/086ee0dce71190efab9cb69ec51b9d16fcfa60ec.jpg)

把Font Name改成我们统一的icomoon。下面的Class Prefix改成统一的icomoon-。改一次就可以了，以后浏览器会记住的。

然后当然是。Download

![icomoon](https://imgsa.baidu.com/forum/w%3D580/sign=bb6d52d88926cffc692abfba89004a7d/bd15201e95cad1c8abaed866743e6709c93d5131.jpg)

你就拿到一个文件夹。长这副样子。

![icomoon](https://imgsa.baidu.com/forum/w%3D580/sign=3ef5d89b1ece36d3a20483380af23a24/c7b62b728bd4b31ce241b0fa8cd6277f9f2ff8ca.jpg)

然后把这个文件夹完整地替换到项目的svg目录下，就大功告成啦。

我们来使用一下

```html
<i class='icomoon-check' style='font-size: 666px'></i>
```

**nice!**

![icomoon](https://imgsa.baidu.com/forum/w%3D580/sign=e6fe81bbdac8a786be2a4a065708c9c7/5df909f531adcbefb5e85f47a7af2edda2cc9f6b.jpg)



















