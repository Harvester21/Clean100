function prefetch(a){
    fetch(a.getAttribute("_href"))
    .then(function(response) {
        return response.text();
    })
    .then(function(text) {
        if(a.tagName=="A"){
            a.setAttribute("href",text.match(/replace\(\"(.*)\"\);/)[1]);
        }else{
            a.setAttribute("rl-link-href",text.match(/replace\(\"(.*)\"\);/)[1]);
        }
    });
}

if(location.host=="m.baidu.com"){
    setInterval(function(){
        document.querySelectorAll("article").forEach(item=>{
            document.querySelectorAll("a,div[rl-link-href]",item).forEach(a=>{
                if(a.tagName=="A"){
                    if(/baidu.com\/.*\/tc\?/.test(a.href)){
                        a.setAttribute("_href",a.href);
                        a.setAttribute("href","javascript:;");
                        prefetch(a);
                    }
                }else{
                    if(/baidu.com\/.*\/tc\?/.test(a.getAttribute("rl-link-href"))){
                        a.setAttribute("_href",a.getAttribute("rl-link-href"));
                        prefetch(a);
                    }
                }
            })
        })
    },500)
}else{
    location.replace(location.href.replace("//www.","//m."));
}


