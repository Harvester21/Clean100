//环球网
setInterval(function(){
    var cur_artBox=document.querySelector(".article-content");
    var cur_more=document.querySelector(".unfold-btn");
    if(cur_artBox){
        cur_artBox.style.setProperty('height','auto','important');
    }
    if(cur_more){
        cur_more.remove();
    }
},30)
