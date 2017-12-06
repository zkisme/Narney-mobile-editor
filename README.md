## Narney-mobile-editor

### 项目介绍

最近公司需要一个生成移动端页面产品详情的富文本编辑器，

在网上找的一些插件大多不符合需求，而且大多源码写的比较抽象，不适合修改和拓展

所以就打算自己造一个自己用的富文本编辑器，

比较简陋，源码也很丑，这版本就是为了解决需求，需要什么就添加了什么，所以这个插件外部几乎不能用

### 项目依赖

- 图标采用 font awesome 字体图标，通过插件脚本动态添加到head

- 没有使用jquery库，但是内部模拟了部分需要的jquery方法，外部不可访问

### 使用方法

```
<script src="../src/mobile-editor.js" charset="utf-8"></script>
<script type="text/javascript">
    webEditor(container,initStr);
</script>
```

### 参数说明

- container ：将富文本编辑器放入的容器名， 默认document.body ， 可以是class名或id名，如： .container | #id

- initStr ： 需要初始化的字符串

### example

[example](/example/index.html)
