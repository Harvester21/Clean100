setInterval(function () {
    var cut100_1 = document.querySelector(".article-top-swiper-goapp");
    var cut100_2 = document.querySelector(".open-app-fixed");
    var cur100_3 = document.querySelector(".tips-content .tips-list .tips-item:nth-child(2) .btn");
    var cur100_4 = document.querySelector(".float-app-button-wrp");
    if (cut100_1) cut100_1.remove();
    if (cut100_2) cut100_2.remove();
    if (cur100_3) {
        var e = document.createEvent("MouseEvents");
        e.initEvent("click", true, true);
        cur100_3.dispatchEvent(e);
    }
    if (cut100_4) cut100_4.remove();
 }, 50);