setInterval(function () {
    //document.querySelector("body").innerHTML="";
    var cut100_1 = document.querySelector(".uukjsi6a_zpZccrqYiI3k");
    var cut100_2 = document.querySelector(".default-container");
    var cut100_3=document.querySelector(".layer-itemBtn.normal");
    if (cut100_1) cut100_1.remove();
    if (cut100_2) cut100_2.remove();
    if (cut100_3) {
        var e = document.createEvent("MouseEvents");
        e.initEvent("click", true, true);
        cut100_3.dispatchEvent(e);
    };
 }, 10);

