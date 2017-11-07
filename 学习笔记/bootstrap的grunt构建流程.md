# bootstrap的grunt构建流程学习分享

bootstrap是基于grunt构建的，即使最新的bootstrap4.0基于es6和sass开发，还是沿用了grunt构建的流程。
我们使用的是3.4版本是老js和less构建的。
从webpack退回grunt感觉是有点奇怪，但是历史是很厚重的。
今天就分享一下bootstrap的grunt构建流程，来定义自己的样式库，组件库。

## 脚手架搭建流程

1. 从github上拉下项目

```js
git clone https://github.com/twbs/bootstrap.git
```

2. 拉下来是最新的4.0版本 要切换到我们使用的3.4版本

```js
git checkout -b v3.4.0-dev origin/v3.4.0-dev
```

3. 安装依赖库

```js
cnpm install
```

4. grunt构建

```js
grunt
```

## gruntfile.js语法解析

和webpack类似，grunt构建的入口是```Gruntfile.js```

文件很长 五百多行 主要分配置和注册任务两部分。grunt就是按照注册任务(registerTask)的顺序一个个执行下去。

```js
grunt.registerTask('test', testSubtasks);
grunt.registerTask('test-js', ['jshint:core', 'jshint:test', 'jshint:grunt', 'jscs:core', 'jscs:test', 'jscs:grunt', 'qunit']);

// JS distribution task.
grunt.registerTask('dist-js', ['concat', 'uglify:core', 'commonjs']);

// CSS distribution task.
grunt.registerTask('less-compile', ['less:compileCore', 'less:compileTheme', 'less:compileDocs']);
grunt.registerTask('dist-css', ['less-compile', 'autoprefixer:core', 'autoprefixer:theme', 'csscomb:dist', 'cssmin:minifyCore', 'cssmin:minifyTheme']);

// Full distribution task.
grunt.registerTask('dist', ['clean:dist', 'dist-css', 'copy:fonts', 'dist-js']);

// Default task.
grunt.registerTask('default', ['clean:dist', 'copy:fonts', 'test']);

grunt.registerTask('build-glyphicons-data', function () { generateGlyphiconsData.call(this, grunt); });

// task for building customizer
grunt.registerTask('build-customizer', ['build-customizer-html', 'build-raw-files']);
grunt.registerTask('build-customizer-html', 'pug');
grunt.registerTask('build-raw-files', 'Add scripts/less files to customizer.', function () {
var banner = grunt.template.process('<%= banner %>');
generateRawFiles(grunt, banner);
});

grunt.registerTask('commonjs', 'Generate CommonJS entrypoint module in dist dir.', function () {
var srcFiles = grunt.config.get('concat.bootstrap.src');
var destFilepath = 'dist/js/npm.js';
generateCommonJSModule(grunt, srcFiles, destFilepath);
});

// Docs task.
grunt.registerTask('docs-css', ['autoprefixer:docs', 'autoprefixer:examples', 'csscomb:docs', 'csscomb:examples', 'cssmin:minifyDocs']);
grunt.registerTask('lint-docs-css', ['csslint:docs', 'csslint:examples']);
grunt.registerTask('docs-js', ['uglify:docsJs', 'uglify:customize']);
grunt.registerTask('lint-docs-js', ['jshint:assets', 'jscs:assets']);
grunt.registerTask('docs', ['docs-css', 'lint-docs-css', 'docs-js', 'lint-docs-js', 'clean:docs', 'copy:docs', 'build-glyphicons-data', 'build-customizer']);
grunt.registerTask('docs-github', ['jekyll:github', 'htmlmin']);

grunt.registerTask('prep-release', ['dist', 'docs', 'docs-github', 'compress']);
```

bootstrap编译最重要的就是编译less文件了，对应的任务是less-compile

```js
grunt.registerTask('less-compile', ['less:compileCore', 'less:compileTheme', 'less:compileDocs']);
```

less-compile是从npm上拉下的一个模块，负责把less文件进行语法解析转换成css。
凡是less文件中import过的文件都会进入编译。
然后进入文件写入任务dist

```js
grunt.registerTask('dist', ['clean:dist', 'dist-css', 'copy:fonts', 'dist-js']);
```

根据先前提到的配置中的compileCore.dest写入文件

```
 grunt.initConfig({
    less: {
      compileCore: {
        src: 'less/bootstrap.less',
        dest: '../bootstrap-qy-3.3.7/css/bootstrap.css'
      }
    }
  });
```

经过这个流程所有的less文件就被编译成了期望目录下的bootstrap.css

## bootstrap的less文件组成

bootstrap的样式组成分为6个部分:

```js
// Core variables and mixins
@import "variables.less";
@import "mixins.less";

// Reset and dependencies
@import "normalize.less";
@import "print.less";
@import "glyphicons.less";

// Core CSS
@import "scaffolding.less";
@import "type.less";
@import "code.less";
@import "grid.less";
@import "tables.less";
@import "forms.less";
@import "buttons.less";

// Components
@import "component-animations.less";
@import "dropdowns.less";
@import "button-groups.less";
@import "input-groups.less";
@import "navs.less";
@import "navbar.less";
@import "breadcrumbs.less";
@import "pagination.less";
@import "pager.less";
@import "labels.less";
@import "badges.less";
@import "jumbotron.less";
@import "thumbnails.less";
@import "alerts.less";
@import "progress-bars.less";
@import "media.less";
@import "list-group.less";
@import "panels.less";
@import "responsive-embed.less";
@import "wells.less";
@import "close.less";

// Components w/ JavaScript
@import "modals.less";
@import "tooltip.less";
@import "popovers.less";
@import "carousel.less";

// Utility classes
@import "utilities.less";
@import "responsive-utilities.less";
```

1. 变量与混入

通过配置变量可以完成bootstrap的大部分定制内容
定义了通用色码，通用尺寸，通用间距，行高，z轴高度等全局变量
这个文件的编译有[脚手架](http://v3.bootcss.com/customize/)

混入是less语言核心的功能，定义了所有样式可能用到的通用函数。
bootstrap的混入做的比较极致，凡是能混的都混了。
这样编码上看起来优美，但是概念多了捋不清也会头疼。

2. normalize初始化

这是所有网站都会有的样式初始化文件，一般就叫normalize。
定义原始标签的初始样式，去除浏览器兼容差异。
然后bootstrap把icon也放在这里了。
我把icon去掉了，应该我发现icon从iconfont上找比较实在，加上还有antd的icon，字体太多了，antd的字体也要去掉。

3. bootstrap风格核心样式

这部分定义了bootstrap一些核心的概念，比如栅格系统，排版，表格表单按钮，对应文档[点这里](http://v3.bootcss.com/css/)

4. 组件库

[官方地址](http://v3.bootcss.com/components/)

bootstrap提供组件样式如下：

- icon字体图标
- 下拉菜单
- 按钮组
- 按钮式下拉菜单
- 输入框组
- 导航
- 导航条
- 路径导航
- 分页
- 标签
- 徽章
- 巨幕
- 页头
- 缩略图
- 警告框
- 进度条
- 媒体对象
- 列表组
- 面板

5. 插件

[官方地址](http://v3.bootcss.com/javascript/)

- 模态框
- 下拉菜单
- 滚动监听
- 标签页
- 工具提示
- 弹出框
- 警告框
- 定钉

6. 一些工具


