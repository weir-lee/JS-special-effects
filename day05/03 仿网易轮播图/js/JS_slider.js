
window.onload = function(){
    function $(id) { return document.getElementById(id);}

    var js_slider = $("js_slider");  // 获取最大的盒子
    var slider_main = $("slider_main");
    var slider_ctrl = $("slider_ctrl");
    var slider_ctrl_next = $("slider_ctrl_next");
    var imgs = slider_main.children;

    // 生成小span
    for(var i = 0; i < imgs.length; i++){
        var span = document.createElement("span");
        span.innerHTML = i+1;
        span.className = "slider-ctrl-con";  // 添加类名
        slider_ctrl.insertBefore(span, slider_ctrl_next);
    }

    var spans = slider_ctrl.children;  // 获取所有按钮
    spans[1].setAttribute("class","slider-ctrl-con current"); // 给第一个小span添加两个类

    var scrollWidth = js_slider.clientWidth; // 获取大盒子的宽度
    for(var i = 1; i < imgs.length; i++){
        imgs[i].style.left = scrollWidth + "px"; // 第一幅图不动，其他图片移动到右边
    }


    var iNow = 0;  // 控制图片播放张数
    for(var i in spans){     // 遍历按钮
        spans[i].onclick = function(){
            var that = this.innerHTML-1;
            if("slider-ctrl-prev" == this.className){
               // alert("你点了向左的按钮");
    // 点击左侧按钮时，当前图片慢慢走到右侧310位置，上一张图片一定快速走到左侧-310位置，再慢慢走到舞台中央
                animate(imgs[iNow],{left:scrollWidth});
                --iNow < 0 ? iNow=imgs.length-1: iNow;
                imgs[iNow].style.left = -scrollWidth + "px";
                animate(imgs[iNow],{left:0});
                setSquare();
            }else if("slider-ctrl-next" == this.className){
    // 点击右侧按钮时，当前图片慢慢走到左侧，下一张图片一定快速走到右侧310位置，再慢慢走到舞台中央
                autoPlay();

            }else{
                // alert("你点了下面的按钮");
                  // 点击的是哪一张图片，获取索引号
                if(that > iNow){   // 如果点击的索引号大于当前图片的索引号
                // 做法等同于右侧按钮
                    animate(imgs[iNow],{left:-scrollWidth}); // 当前这张慢慢走到左侧
                    imgs[that].style.left = scrollWidth + "px"; //被点击的那张迅速走到右侧
                }else if(that < iNow){  // 点击的是当前图片左侧的图片
                // 做法等同于左侧按钮
                    animate(imgs[iNow],{left:scrollWidth}); //当前这张慢慢走到右侧
                    imgs[that].style.left = -scrollWidth + "px"; //被点击的这张迅速走到左侧
                }
                iNow = that;  // 比如当前播放的是第4张，点击的是第2张，下次应该播放第3张
                animate(imgs[that],{left:0}); //播放被点击的那张
                setSquare();
            }
        }
    }

    var timer = null;
    timer = setInterval(autoPlay,2000);  // 页面加载后开启定时器
    js_slider.onmouseout = function(){
        clearInterval(timer);
        timer = setInterval(autoPlay,2000);  //鼠标移出大盒子开启定时器
    }
    js_slider.onmouseover = function(){
        clearInterval(timer);   //鼠标移入大盒子清除定时器
    }

    // 控制小方块的样式
    function setSquare(){
        for(var i = 1; i < spans.length-1; i++){
            spans[i].className = "slider-ctrl-con";
        }
        spans[iNow+1].className = "slider-ctrl-con current";
    }

    // 自动播放相当于点击向右按钮，添加定时器
    function autoPlay(){
        animate(imgs[iNow],{left:-scrollWidth});
        ++iNow > imgs.length-1 ? iNow=0 : iNow;
        imgs[iNow].style.left = scrollWidth + "px"; // 快速执行，回到右侧310位置
        animate(imgs[iNow],{left:0});   // 再执行
        setSquare();
    }
}
