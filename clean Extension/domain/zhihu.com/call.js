//知乎
setInterval(function () {
    var cut100_1 = document.querySelector(".ModalWrap");
    var cut100_2 = document.querySelector(".OpenInApp");
    var cut100_3 = document.querySelector(".MHotFeedAd");
    var cut100_4 = document.querySelector(".AdBelowMoreAnswers");
    var cut100_5 = document.querySelector("body");
    var cut100_6 = document.querySelector(".WeiboAd-wrap");
    var cut100_7 = document.querySelector(".MRelateFeedAd");
    var cut100_8 = document.querySelector(".MBannerAd");
    var cut100_9 = document.querySelector(".Baidu-header");
    var cut100_10 = document.querySelector(".Baidu-ad");
    var cut100_11 = document.querySelector(".OpenInAppButton");
    if (cut100_1) cut100_1.remove();
    if (cut100_2){
        cut100_2.style.setProperty('left', '-9999px', 'important');
    }
    if (cut100_3) cut100_3.remove();
    if (cut100_4) cut100_4.remove();
    if (cut100_5) {
        cut100_5.classList.remove("ModalWrap-body");
        cut100_5.style.overflow="auto";
    };
    if (cut100_6) cut100_6.remove();
    if (cut100_7) cut100_7.remove();
    if (cut100_8) cut100_8.remove();
    if (cut100_9) cut100_9.remove();
    if (cut100_10) cut100_10.remove();
    if (cut100_11) {
        cut100_11.style.setProperty('left', '-9999px', 'important');
    }
 },30);