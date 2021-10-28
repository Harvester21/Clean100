setInterval(function () {
    var cut100_1 = document.querySelector("#swiper");
    var cut100_2 = document.querySelector("#openapp__fix");
    var cut100_3 = document.querySelector(".FloatDownloadButton_mobile_openapp__fix_1eD.FloatDownloadButton_mobile_new_1Tx");
    var cut100_4 = document.querySelector(".AppBanner_mobile_app-banner_3XM");
    
    if (cut100_1) cut100_1.remove();
    if (cut100_2) cut100_2.remove();
    if(cut100_3){
        cut100_3.style.setProperty('left', '-9999px', 'important');
    }
    if (cut100_4) cut100_4.remove();
 }, 60);