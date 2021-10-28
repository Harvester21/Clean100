//百度百科
setInterval(function () {
    var cur_more = document.querySelector(".yx-load-more-inner");
    var cur_more2= document.querySelector("#ui_refresh_down");
    if (cur_more) {
        var e = document.createEvent("MouseEvents");
        e.initEvent("tap", true, true);
        cur_more.dispatchEvent(e);
    }
    if(cur_more2){
        cur_more2.remove();
    }
}, 30);