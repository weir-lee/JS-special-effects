/**
 * Created by andy on 2015/11/19.
 */
function $(id) {return document.getElementById(id);}
function show(obj) { obj.style.display = "block";}
function hide(obj) { obj.style.display = "none";}
function scroll() {
    if(window.pageYOffset != null)  //  ie9+ 和其他浏览器
    {
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    }
    else if(document.compatMode == "CSS1Compat")  // 声明的了 DTD
    // 检测是不是怪异模式的浏览器 -- 就是没有 声明<!DOCTYPE html>
    {
        return {
            left: document.documentElement.scrollLeft,
            top: document.documentElement.scrollTop
        }
    }
    return { //  剩下的肯定是怪异模式的
        left: document.body.scrollLeft,
        top: document.body.scrollTop
    }
}


/**
 * Created by liwei on 2016/5/17.
 */
/*
function client(){
    if(window.innerWidth){
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }else if(document.documentElement.clientWidth){
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }else{
        return {
            width: document.body.clientWidth,
            height: document.body.clientHeight
        }
    }
}*/
function client(){
    if(window.innerWidth != null){   // ie9 +  最新浏览器
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }else if(document.compatMode === "CSS1Compat"){   // 标准浏览器
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }

    return {     // 怪异浏览器
        width: document.body.clientWidth,
        height: document.body.clientHeight
    }

}