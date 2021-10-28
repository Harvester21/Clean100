setInterval(function () {
    var cut100_1 = document.querySelector(".header-wrap");
    var cut100_2 = document.querySelector(".call-app-btn");
    var cut100_3 = document.querySelector("iframe");
    var cut100_4 = document.querySelector(".wrapper-_PVsE_0");
    var cut100_5 = document.querySelectorAll(".guidance-content .wrap-item-btn")[1];
    var cut100_6 = document.querySelector(".index_call-app-btn");
    
    if (cut100_1) cut100_1.remove();
    if (cut100_2) cut100_2.remove();
    if (cut100_3) cut100_3.remove();
    if (cut100_4) cut100_4.remove();
    if (cut100_5) {
        var e = document.createEvent("MouseEvents");
        e.initEvent("click", true, true);
        cut100_5.dispatchEvent(e);
    }
    if(cut100_6){
        cut100_6.style.setProperty('left', '-9999px', 'important');
    }
 }, 50);