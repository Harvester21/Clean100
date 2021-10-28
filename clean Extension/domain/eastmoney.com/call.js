setInterval(function () {
    var cut100_1 = document.querySelector(".dc-layer-tc");
    var cut100_2 = document.querySelector(".dc-fb");
    var cut100_3 = document.querySelector(".dc-result-tc");
    var cut100_4 = document.querySelector("#topDTT");
    var cut100_5 = document.querySelector("#openinapp");
    var cut100_7 = document.querySelector("a.fold-btn");
    
    var cut100_6 = document.querySelector("body");
    if (cut100_1) cut100_1.remove();
    if (cut100_2) cut100_2.remove();
    if (cut100_3) cut100_3.remove();
    if (cut100_4) cut100_4.remove();
    if (cut100_5) cut100_5.remove();
    if (cut100_6) cut100_6.style.setProperty('padding-top', '0', 'important');
    if (cut100_7) cut100_7.remove();
 }, 60);