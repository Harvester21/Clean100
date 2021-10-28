setInterval(function () {
    var cut100_1 = document.querySelector(".infzm-layout__footer");
    var cut100_2 = document.querySelector(".infzm-playment-prompt h4");
    var cut100_3 = document.querySelector(".infzm-playment-prompt a");
    var cut100_4 = document.querySelector(".van-modal");
    var cut100_5 = document.querySelector(".van-popup");
    var cut100_6 = document.querySelector(".infzm-playment-prompt");
    var cut100_body=document.querySelector("body");
    
    if (cut100_1) cut100_1.remove();
    if (cut100_2) cut100_2.remove();
    if (cut100_3) cut100_3.remove();
    if (cut100_4) cut100_4.remove();
    if (cut100_5) cut100_5.remove();
    if (cut100_6) cut100_6.remove();
    if(cut100_body){
        cut100_body.classList.remove("van-overflow-hidden");
    }
 }, 60);