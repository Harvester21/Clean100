setInterval(function () {
    var cut100_1 = document.querySelector(".sw_c0");
    var cut100_2 = document.querySelector(".page_main");
    var cut100_3 = document.querySelector("#artFoldBox");
    var cut100_4 = document.querySelector(".callApp_fl_btn");
    var cut100_5 = document.querySelector("#midThreeAds");
    var cut100_6 = document.querySelector(".s_card_white_m");
    var cut100_7 = document.querySelector(".j_video_with_ad");
 
 
    if (cut100_1) cut100_1.remove();
    if (cut100_2) cut100_2.style.setProperty('padding-top', '0', 'important');
    if (cut100_3) cut100_3.remove();
    if (cut100_4) cut100_4.remove();
    if (cut100_5) cut100_5.remove();
    if (cut100_6) cut100_6.remove();
    if (cut100_7) cut100_7.remove();
 }, 60);