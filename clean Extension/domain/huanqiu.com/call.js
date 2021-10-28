setInterval(function () {
    var cut100_1 = document.querySelector(".mod-block-x");
    var cut100_2 = document.querySelectorAll("li");
    var cut100_3 = document.querySelector("div[id^=ad_survey_ad_slot_]");
    if (cut100_1) cut100_1.remove();
    if (cut100_3) cut100_3.remove();
    cut100_2.forEach(function(item,index){
       if(item.getElementsByTagName("a").length>1){item.remove()}
       
    })
 }, 60);