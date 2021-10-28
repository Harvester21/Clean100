//百度知道
setInterval(function () {
    var cur_artBox = document.querySelectorAll(".w-detail-index");
    var cur_more = document.querySelector(".w-detail-display-btn");
    var cur_more2 = document.querySelector(".show-more-replies");
    if (cur_artBox) {
        cur_artBox.forEach(element => {
            element.style.setProperty('max-height', '10000px', 'important');    
        });
        
    }
    if (cur_more) {
        cur_more.remove();
    }
    /*展开其他答案*/
    if (cur_more2) {
        var e = document.createEvent("MouseEvents");
        e.initEvent("tap", true, true);
        cur_more2.dispatchEvent(e);
    }
}, 30);