setInterval(function () {
    var cut100_1 = document.querySelector("#TalionNav");
    var cut100_2 = document.querySelector("iframe");
    var cut100_3 = document.querySelector(".card>div");
    var cut100_4 = document.querySelectorAll(".card div");
    if (cut100_1) cut100_1.remove();
    if (cut100_2) cut100_2.remove();
    if (cut100_3) cut100_3.remove();
    cut100_4.forEach(function(item,index){
       if(item.innerText=="广告") item.remove()
    })
 }, 60);