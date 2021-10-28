//腾讯新闻变种-app专享
setInterval(function(){
    var cur_artBox=document.querySelector("._2uqm7t0Q1edCEWGt25AMWI");
    var cur_more=document.querySelector("._31PCYTZEdFlOAgYNhhYJuN");
    if(cur_artBox){
        cur_artBox.style.setProperty('max-height', 'none', 'important');
    }
    if(cur_more){
        //删除会影响文章
        // cur_more.remove();
        cur_more.style.setProperty('left', '-9999px', 'important');
    }
},30)
