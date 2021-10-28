//百度贴吧
setInterval(function () {
    var tbbody=document.querySelector("body");
    var cut100_1 = document.querySelector(".tb-backflow");
    var cut100_2 = document.querySelector(".nav-bar-wrapper");
    var cut100_3 = document.querySelector(".fengchao-banner");
    var cut100_4 = document.querySelector(".banner-wrapper");
    var cut100_5 = document.querySelector(".fixed-nav-bar");
    var cut100_6 = document.querySelector(".ertiao-wrap");
    var cut100_7 = document.querySelector(".tb-banner-wrapper");//具体贴吧首页
    

    if (cut100_1) cut100_1.remove();
    if(tbbody){
      tbbody.classList.remove("tb-modal-open");
    }
    if (cut100_2) cut100_2.remove();
    if (cut100_3) cut100_3.remove();
    if (cut100_4) cut100_4.remove();
    if (cut100_5) cut100_5.remove();
    if (cut100_6) cut100_6.remove();
    if (cut100_7) cut100_7.remove();
 },60);