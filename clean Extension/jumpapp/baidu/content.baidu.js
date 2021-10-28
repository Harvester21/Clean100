setInterval(function(){
    var call = document.querySelector(".baiduappcall-wrap");
    if(call) call.remove();
    var call2 = document.querySelector(".callicon-wrap");
    if(call2) call2.remove();
    var banner  = document.querySelector(".banner");
    if(banner) banner.remove();
    localStorage.setItem("safariOneInvoke",JSON.stringify({"_value":3}));
    localStorage.setItem("wise_feed_xsource_baidu",new Date().getTime());
    var ifmht=document.querySelector(".sf-container");
    if(ifmht){
        ifmht.style.setProperty('height', '100vh', 'important');
    }
},500)

