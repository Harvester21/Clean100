//天涯社区
setInterval(function(){
    // var cur_artBox=document.querySelector(".post .content .item .bd");
    // var cur_decorate=document.querySelector(".item-lz .bd.onhide:before");
    var cur_more=document.querySelector(".openFullPost");
    // if(cur_artBox){
    //     cur_artBox.style.setProperty('height', 'auto', 'important');
    // }
    // if(cur_more){
    //     cur_more.remove();
    // }
    // if(cur_decorate){
    //     cur_decorate.remove();
    // }
    if (cur_more) {
        var e = document.createEvent("MouseEvents");
        e.initEvent("click", true, true);
        cur_more.dispatchEvent(e);
    }
},30)
