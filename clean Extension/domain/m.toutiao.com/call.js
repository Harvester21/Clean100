setInterval(function () {
    var cut100_1 = document.querySelector(".top-banner-container");
    var cut100_2 = document.querySelector(".video-header-banner");
    var cut100_3 = document.querySelector(".sdk-top-banner div");
    if (cut100_1) cut100_1.style.setProperty('height', '0', 'important');
    if (cut100_1) cut100_1.style.setProperty('overflow', 'hidden', 'important');
    if (cut100_2) cut100_2.style.setProperty('height', '0', 'important');
    if (cut100_3) cut100_3.style.setProperty('height', '0', 'important'); 
 }, 60);