(function(global, factory ){
    "use static";

    if(typeof module === 'object' && typeof module.export === 'object'){
        module.exports = global.document ?
            factory(global,true) :
            function(w){
                if(!w.document) {
                    throw new Eerror('该插件需要在浏览器中运行');
                }
                return factory(w);
            };
    }else{
        factory(global)
    }

})(window !== undefined ? window : this , function(window){
    // 声明变量
    var $, // 模仿jquery选择器,并不会暴露出去，内部使用
        doc = document;

    $ = function(selector,context){
        return new $.prototype.selector(selector,context);
    }

    $.prototype = {
        selector:function(selector,context){
            var match;
            if(typeof selector === 'string'){
                if(context){
                    match = [];
                    for(var i = 0; i< context.length; i++){
                        match = match.concat(Array.prototype.slice.call(context[i].querySelectorAll(selector),0));
                    }
                }else{
                    match = doc.querySelectorAll(selector);
                }
                for(var i = 0; i<match.length; i++){
                    this[i] = match[i];
                }
                this.length = match.length;
            }else{
                this[0] = selector;
                this.length = 1;
            }
            return this;
        },
        find:function(selector){
            return $(selector,this);
        },
        html:function(html){
            for(var i = 0; i<this.length;i++){
                this[i].innerHTML = '';
                this[i].insertAdjacentHTML('beforeend',html);
            }
        },
        append:function(html){
            for(var i = 0; i<this.length;i++){
                this[i].insertAdjacentHTML('beforeend',html);
            }
        },
        prepend:function(html){
            for(var i = 0 ; i<this.length; i++){
                this[i].insertAdjacentHTML('afterbegin',html);
            }
        },
        attr:function(key,value){
            if(!this.length>0) return null;
            if(!key) return null;
            if(!value) return this[0].getAttribute(key);
            return this[0].setAttribute(key,value);
        },
        css:function(){
            var arg = arguments;
            if(!arg) return this;
            if(arg.length === 2){
                for(var i = 0; i < this.length; i++){
                    this[i].style[arg[0]] = arg[1];
                }
                return this;
            }
            if(arg.length === 1 && typeof arg[0] === 'object'){
                for(var i = 0; i < this.length; i++){
                    for(var j in arg[0]){
                        this[i].style[j] = arg[0][j];
                    }
                }
                return this;
            }
        },
        height:function(h){
            var len = this.length;
            for(var i = 0; i<len; i++){
                this[i].style.height = h;
            }
        },
        each:function(callback){
            var self = this;
            var len = this.length;
            for (var i = 0; i<len; i++){
                (function(n){
                    if(callback) callback(self[n],n);
                })(i);
            }
        },
        on:function(event,handler,bool){
            var self = this;
            var len = this.length;
            for (var i = 0; i<len; i++){
                (function(n){
                    self[i].addEventListener(event,function(e){
                        handler(e);
                    },!!bool);
                })(i);
            }
        }
    }

    $.prototype.selector.prototype = $.prototype;




    var temp = '<div style="width:100%;height:auto;overflow:auto;margin-left:auto;margin-right:auto;display:block;border:1px solid #ddd;border-radius:4px;">\
            <div style="background:#e9e9e9;">\
                <div class="webEditor-bar webEditor-bar-img fa fa-picture-o" title="插入图片"></div>\
                <div class="webEditor-bar fa fa-header webEditor-drop" title="标题">\
                    <ul><li class="webEditor-bar-h" data-header="1">标题一</li><li class="webEditor-bar-h" data-header="2">标题二</li><li class="webEditor-bar-h" data-header="3">标题三</li><li class="webEditor-bar-h" data-header="4">标题四</li><li class="webEditor-bar-h" data-header="5">标题五</li><li class="webEditor-bar-h" data-header="6">标题六</li><li class="webEditor-bar-h" data-header="7">段落</li></ul>\
                </div>\
                <!--div class="webEditor-bar webEditor-bar-img fa fa-font webEditor-drop" title="字体">\
                    <ul><li>微软雅黑</li><li>宋体</li></ul>\
                </div-->\
                <div class="webEditor-bar webEditor-bar-color fa fa-eraser webEditor-bar-input" title="文字颜色">\
                    <input type="color" >\
                </div>\
                <div class="webEditor-bar webEditor-bar-size fa" title="字体大小">S\
                    <input type="number" style="width:60px;padding:0 0 0 15px;" >\
                </div>\
                <div class="webEditor-bar webEditor-bar-align fa fa-align-left webEditor-drop" title="对齐方式">\
                    <ul>\
                        <li class="fa fa-align-center" data-align="center">居中</li>\
                        <li class="fa fa-align-left" data-align="left">左对齐</li>\
                        <li class="fa fa-align-right" data-align="right">右对齐</li>\
                        <li class="fa fa-align-justify" data-align="justify">分散对齐</li>\
                    </ul>\
                </div>\
                <div class="webEditor-bar webEditor-bar-bold fa fa-bold" title="加粗"></div>\
                <div class="webEditor-bar webEditor-bar-italic fa fa-italic" title="倾斜"></div>\
                <div class="webEditor-bar webEditor-bar-link fa fa-link" title="超链接">\
                    <div>\
                        <p>链接文字：<input type="text" id="webEditor-bar-link-text"></p>\
                        <p>链接地址：<input type="text" id="webEditor-bar-link-addr"></p>\
                        <p>打开方式：<select id="webEditor-bar-link-target"><option value="_blank">新窗口打开</option><option value="_self">当前页面打开</option></select></p>\
                        <p><button id="webEditor-bar-link-sure">确定</button><button id="webEditor-bar-link-cancel">取消</button></p>\
                    </div>\
                </div>\
                <div class="webEditor-bar webEditor-bar-code fa fa-code" title="切换源代码/显示"></div>\
                <div class="webEditor-bar webEditor-bar-save fa fa-floppy-o" title="保存"></div>\
                <div style="clear:both;"></div>\
            </div>\
            <iframe name="webEditor_editor" id="webEditor_editor" width="100%" height="800" style="border:none;"></iframe>\
        </div>',
        webEditorStyle = "body{word-break:break-all;}ul,ol{padding:0;margin:0;list-style:none;}.webEditor-bar{transition:all 0.2s ease; color:#888; text-align:center; width:30px; height:30px; line-height:30px; font-size:16px; float:left;cursor:pointer;word-break:keep-all;position:relative;} .webEditor-bar:hover{color:#333;background:#ddd;}.webEditor-drop ul{border:1px solid #ddd;position:absolute;padding:10px 0;border-radius:4px;background:#fff;display:none;}.webEditor-drop:hover ul{display:block;}.webEditor-drop ul li{padding:0 15px;text-align:left;font-size:14px;display:block;line-height:30px;}.webEditor-drop ul li:hover{background:#ddd;}.webEditor-bar-input input{display:none;}.webEditor-bar-input:hover input{display:block;}.webEditor-bar-size input{display:none;}.webEditor-bar-link>div{padding:15px;background:#eaeaea;border:1px solid #ddd;position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);border-radius:5px;margin-left:-0.5px;margin-top:-0.5px;text-align:left;display:none;}.webEditor-bar-link>div input{border\:none;outline:none;padding:5px 10px;}.webEditor-bar-link button{border:none;margin-right:10px;background:#fff;cursor:pointer;padding:5px 15px;}",
        frameStyle = 'html{font-size:50px;}body{padding:.3rem;margin:0;}'
    var webEditor = function(container,content){
        return new webEditor.prototype.init(container,content);
    }

    webEditor.prototype = {
        first:function(){
            // 初始化编辑器，添加p标签
            this.doc.execCommand('formatBlock','false','<div>');
            var target = this.win.getSelection().focusNode;
            target.style.cssText = 'font-size:.28rem;margin:0;margin-bottom:.1rem;';
        },
        enterFn:function(){
            // 每次换行的时候添加p标签，否则是默认的div
            // this.doc.execCommand('formatBlock',false,'<p>');
            // this.doc.getSelection().focusNode
            var self = this;
            setTimeout(function(){
                var target = self.win.getSelection().focusNode;
                var type = Object.prototype.toString.call(self.win.getSelection().focusNode);
                if(type != '[object HTMLParagraphElement]') target = target.parentNode;
                var style = {
                    fontSize: target.style && target.style.fontSize || '.28rem',
                    margin:0,
                    marginBottom: target.style && target.style.marginBottom || '.1rem'
                }
                $(target).css(style);
            },0)
        },
        imageFn:function(src){
            var self = this;
            var $file = document.createElement('input');
            $file.type = 'file';
            $file.style.display = 'none';
            $file.addEventListener('change',function(){
                self.insertImage($file.value)
                $file = null;
            })
            document.body.appendChild($file);
            $file.click();
        },
        insertImage:function(url){
            this.doc.body.focus();
            // this.doc.execCommand('insertImage','false',url)
            // var $image = $(this.doc.getSelection().focusNode).find('img');
            // $image.css({maxWidth:'100%',display:'inline-block'});
            this.doc.execCommand('insertParagraph',false,null)
            this.doc.execCommand('insertHTML',false, '<div style="text-align:center"><img src="'+url+'" style="max-width:100%;display:inline-block;"></div>');
        },
        getImageFn:function(url){
            var self = this;
            if(Object.prototype.toString.call(url) === '[object Array]'){
                url.forEach(function(item,index){
                    self.insertImage.call(self,item);
                })
            }else{
                self.insertImage(url);
            }
        },
        headerFn:function(e){
            var h = '';
            var style = '';
            switch(parseInt(e.target.dataset.header)){
                case 1:
                    h = '<h1>';
                    style += 'font-size:.64rem;';
                    break;
                case 2:
                    h = '<h2>';
                    style += 'font-size:.48rem;';
                    break;
                case 3:
                    h = '<h3>';
                    style += 'font-size:.36rem;';
                    break;
                case 4:
                    h = '<h4>';
                    style += 'font-size:.32rem;';
                    break;
                case 5:
                    h = '<h5>';
                    style += 'font-size:.26rem;';
                    break;
                case 6:
                    h = '<h6>';
                    style += 'font-size:.21rem;';
                    break;
                case 7:
                    h = '<p>';
                    style += 'font-size:.28rem;'
            }
            this.doc.execCommand('formatBlock',false,h);
            var target = this.win.getSelection().focusNode.parentNode;
            target.style = style;
        },
        colorFn:function(e){
            var color = e.target.value;
            this.doc.execCommand('foreColor',false,color);
        },
        sizeFn:function(e){
            var size = parseInt(e.target.value) / 50;
            this.doc.execCommand('insertHTML',false,'<span style="font-size:'+size+'rem;">'+this.doc.getSelection()+'</span');
        },
        alignFn:function(e){
            var align = e.target.dataset.align;
            var s;
            switch(align){
                case 'center':
                    s = this.doc.execCommand('justifyCenter',false,null);
                    break;
                case 'left':
                    s = this.doc.execCommand('justifyLeft',false,null);
                    break;
                case 'right':
                    s = this.doc.execCommand('justifyRight',false,null);
                    break;
                case 'justify':
                    s = this.doc.execCommand('justifyFull',false,null);
                    break;
            }
        },
        boldFn:function(e){
            this.doc.execCommand('bold',false,null);
        },
        italicFn:function(e){
            this.doc.execCommand('italic',false,null);
        },
        showLinkFn:function(e){
            $('.webEditor-bar-link>div').css('display','block');
        },
        hideLinkFn:function(){
            $('#webEditor-bar-link-text')[0].value = '';
            $('#webEditor-bar-link-addr')[0].value = ''
            $('.webEditor-bar-link>div').css('display','none');
        },
        linkSureFn:function(e){
            var text = $('#webEditor-bar-link-text')[0].value,
                addr = $('#webEditor-bar-link-addr')[0].value,
                target = $('#webEditor-bar-link-target')[0].value,
                link = '<a href="'+addr+'" target="'+target+'" style="font-size:.28rem;">'+text+'</a>';
            this.doc.execCommand('insertHTML',false,link);
            this.hideLinkFn();
        },
        getHTML:function(){
            return this.doc.body.innerHTML
        },
        toggleCodeFn:function(e){
            var html = this.getHTML()
            if(!this.isCode){
                this.isCode = true;
                html = html.replace(/</g,'&lt;').replace(/>/g,'&gt;');
                $(this.doc.body).css('font-size','.24rem');
                this.doc.body.innerHTML = html;
            } else {
                this.isCode = false;
                html = html.replace(/&lt;/g,'<').replace(/&gt;/g,'>');
                $(this.doc.body).css('font-size','inherit');
                $(this.doc.body).html(html);
            }
        },
        saveFn:function(e){
            this.getHTML();
        },
        bindEvent:function(){
            var self = this;
            // 第一次进入，如果是空白的情况下手动添加p标签，否则第一个段落没有标签
            $(this.doc.body).on('focus',function(e){
                if(e.target.innerHTML) return ;
                self.first.call(self);
            })
            // 每次回车添加p标签，否则默认的是div
            $(this.doc.body).on('keydown',function(e){
                if(e.keyCode == 13){
                    self.enterFn.call(self);
                }
            })
            $('.webEditor-bar-img').on('click',function(e){
                self.imageFn.call(self,e);
            })
            $('.webEditor-bar-h').on('click',function(e){
                self.headerFn.call(self,e);
            })
            $('.webEditor-bar-color input').on('change',function(e){
                self.colorFn.call(self,e);
            })
            $('.webEditor-bar-size').on('click',function(e){
                e.stopPropagation();
                var $input = $('.webEditor-bar-size input')
                if(!$input[0].style.display || $input[0].style.display == 'none'){
                    $input.css('display','block');
                }else{
                    $input.css('display','none');
                }
            })
            $(document).on('click',function(){
                $('.webEditor-bar-size input').css('display','none');
            })
            $(self.doc).on('click',function(){
                $('.webEditor-bar-size input').css('display','none');
            })
            $('.webEditor-bar-size input').on('click',function(e){
                e.stopPropagation();
            })
            $('.webEditor-bar-size input').on('blur',function(e){
                self.sizeFn.call(self,e);
                $('.webEditor-bar-size input')[0].value = ''
            })
            $('.webEditor-bar-align li').on('click',function(e){
                self.alignFn.call(self,e);
            })
            $('.webEditor-bar-bold').on('click',function(e){
                self.boldFn.call(self,e);
            })
            $('.webEditor-bar-italic').on('click',function(e){
                self.italicFn.call(self,e);
            })
            $('.webEditor-bar-link').on('click',function(e){
                self.selection = self.doc.getSelection();
                self.showLinkFn.call(self,e);
            })
            $('#webEditor-bar-link-sure').on('click',function(e){
                e.stopPropagation();
                self.linkSureFn.call(self,e);
            })
            $('#webEditor-bar-link-cancel').on('click',function(e){
                self.hideLinkFn.call(self);
            })
            $('.webEditor-bar-link>div').on('click',function(e){
                e.stopPropagation();
            })
            $('.webEditor-bar-code').on('click',function(e){
                self.toggleCodeFn.call(self,e);
            })
            $('.webEditor-bar-save').on('click',function(e){
                self.saveFn.call(self,e);
            })
        }
    }

    var init = webEditor.prototype.init = function(container,content){
        if(!container) container = document.body;
        $(container).append(temp);
        $(document.head).append('<link href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"><style>'+webEditorStyle+'</style>');
        this.$el = $('#webEditor_editor');
        this.$iframe = $('#webEditor_editor');
        this.win = frames['webEditor_editor'];
        this.doc = this.win.document;
        this.doc.designMode = 'on';
        this.doc.contentEditable  = true;
        this.doc.execCommand("DefaultParagraphSeparator", false, "p");
        var $style = document.createElement('style');
        $style.innerHTML = frameStyle;
        this.doc.head.appendChild($style);
        if(content) $(this.doc.body).html(content);
        this.bindEvent();
    }
    init.prototype = webEditor.prototype;

    if(typeof define === 'function' && define.amd){
        define('webEditor',[],function(){
            return webEditor;
        })
    }

    window.webEditor = webEditor;
})
