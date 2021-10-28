


var browser = browser;
browser = browser ?? chrome;

const storage = {
    set rules(value) {
        browser.storage.local.set({ "rules": value });
    },
    get rules() {
        return browser.storage.local.get(["rules"]);
    },
    set rules_version(value) {
        browser.storage.local.set({ "rules_version": value });
    },
    get rules_version() {
        return browser.storage.local.get(["rules_version"]);
    },
    set newtab(value) {
        browser.storage.local.set({ "newtab": value });
    },
    get newtab() {
        return browser.storage.local.get(["newtab"]);
    },
    set idea(value) {
        browser.storage.local.set({ "idea": value });
    },
    get idea() {
        return browser.storage.local.get(["idea"]);
    },
    set custom(value) {
        browser.storage.local.set({ "custom": value });
    },
    get custom() {
        return browser.storage.local.get(["custom"]);
    },
    //一般用不到,开发期间会用
    clear: function () {
        browser.storage.local.clear()
    }
}

//禁止手指缩放
document.addEventListener('gesturestart', function (event) {
    event.preventDefault();
});

//发消息后bg
function sendMessage(d, fn) {
    browser.runtime.sendMessage({ cmd: d.cmd, param: d.param }).then((response) => {
        fn && fn(response)
    });
}


//param
//{type:"code|file",code:""}
function inject(param) {
    if ('frameId' in param) {
        sendMessage({ cmd: "injectByFrameID", param: param })
    } else {
        sendMessage({ cmd: "inject", param: param })
    }
}

function reload(time = 1000) {
    setTimeout(function () {
        location.reload(true);
    }, time);
}

//页面初始化
async function init() {
    var { rules } = await storage.rules;
    if (rules == (void 0)) {
        sendMessage({ cmd: "init_rules" });
        reload(3000);
    }

    var { newtab } = await storage.newtab;
    if (newtab?.nt == (void 0)) {
        storage.newtab = {
            "nt": {
                "h": "console.log('欢迎使用《拦截100》')",
                "n": {
                    "url": "",
                    "regex": "cpu.baidu.com",
                    "js": "setInterval(function(){\n    document.querySelectorAll(\".news-list\").forEach(item=>item.style.cssText=\"padding:0;\");\n    document.querySelectorAll(\".news-list .img img\").forEach(item=>item.style.cssText=\"border-radius:0.833rem;\");\n    document.querySelectorAll(\".news-list .img\").forEach(item=>item.style.cssText=\"background:none;\");\n    document.querySelectorAll(\".news-list .n-item\").forEach(item=>item.style.cssText=\"border-bottom:1px solid rgba(118, 118, 118, 0.15);padding:0.83rem 1rem;background-image:none;\");\n    document.querySelectorAll(\".news-list .dyna-item\").forEach(item=>item.style.cssText=\"border-bottom:1px solid rgba(118, 118, 118, 0.15);padding:0.83rem 1rem;background-image:none;\");\n    document.querySelectorAll(\".news-list .dyna-item .dyna-content\").forEach(item=>item.style.cssText=\"font-size:1.25rem;font-family: PingFangSC-Medium;\")\n    document.querySelectorAll(\".dyna-header .dyna-author\").forEach(item=>item.style.cssText=\"font-size:1.25rem;font-family: PingFangSC-Medium;\")\n    document.querySelectorAll(\".video-item .img.fixed-size .content\").forEach(item=>item.style.cssText=\"border-radius:0.833rem;\");\n    document.querySelectorAll(\".n-title span\").forEach(item=>item.style.cssText=\"font-size:1.25rem;font-family: PingFangSC-Medium;\");\n    document.querySelectorAll(\".news-list .small-video-item .n-item-link .n-title span.smallvideo-tag\").forEach(item=>item.style.cssText=\"font-size:1rem;\");\n    document.querySelectorAll(\".dislike-content-btn::after\").forEach(item=>item.style.cssText=\"background:red;\");\n    document.querySelectorAll(\"a.n-item-link\").forEach(function(link,index){\n        if(link.target!=\"_top\"){\n            link.href=link.href+\"?blockId=87242&blockId=87242\";\n            link.target=\"_top\";\n            link.outerHTML = link.outerHTML;\n        }\n    });\n\n},10);"
                },
                "s": [
                    {
                        "url": "https://m.baidu.com/?from=1024193p",
                        "title": "百度",
                        "icon": "http://vcdnb.huoying666.com/static/images/icon_bd@3x.png",
                        "js": ""
                    },
                    {
                        "url": "https://www.qweather.com/",
                        "title": "天气云图",
                        "icon": "http://vcdnb.huoying666.com/static/images/icon_tqyt@3x.png",
                        "js": "setInterval(function () {\n    var cut100_1 = document.querySelector(\".l-index-left__search\");\n    var cut100_2 = document.querySelector(\".l-index-left\");\n    var cut100_3 = document.querySelector(\".l-index-left__app\");\n    var cut100_4 = document.querySelector(\".l-index-left__plugin\");\n    if (cut100_1) cut100_1.remove();\n    if(cut100_2){\n        cut100_2.style.setProperty(\"padding\", \"5px 16px 0\", \"important\");\n    }\n    if (cut100_3) cut100_3.remove();\n    if (cut100_4) cut100_4.remove();\n }, 60);"
                    },
                    {
                        "url": "https://fanyi.baidu.com/",
                        "title": "翻译",
                        "icon": "http://vcdnb.huoying666.com/static/images/icon_fy@3x.png",
                        "js": "setInterval(function () {\n    var cut100_1 = document.querySelector(\"#new-header\");\n    var cut100_2 = document.querySelector(\"#shoubai-header\");\n    var cut100_3 = document.querySelector(\".app-bar\");\n    var cut100_4 = document.querySelector(\".article\");\n    var cut100_5 = document.querySelector(\".bottom-intro\");\n    if (cut100_1) cut100_1.remove();\n    if (cut100_2) cut100_2.remove();\n    if (cut100_3) cut100_3.remove();\n    if (cut100_4) cut100_4.remove();\n    if (cut100_5) cut100_5.remove();\n}, 60); "
                    },
                    {
                        "url": "https://www.baidu.com/s?word=节假日",
                        "title": "法定假日",
                        "icon": "http://vcdnb.huoying666.com/static/images/icon_fdjr@3x.png",
                        "js": ""
                    },
                    {
                        "url": "https://mnongli.huashu-inc.com/",
                        "title": "万年历",
                        "icon": "http://vcdnb.huoying666.com/static/images/icon_wnl@3x.png",
                        "js": "setInterval(function () {\n    var cut100_1 = document.querySelector(\".hl_head\");\n    var cut100_2 = document.querySelector(\".hl_mainBox\");\n    var cut100_3 = document.querySelector(\".hl_mains\");\n    var cut100_4 = document.querySelector(\".wx_kf\");\n    if (cut100_1) cut100_1.remove();\n    if(cut100_2){\n        cut100_2.style.setProperty(\"overflow\", \"hidden\", \"important\");\n    }\n    if (cut100_3) cut100_3.remove();\n    if (cut100_4) cut100_4.remove();\n}, 60); \n\n"
                    },
                    {
                        "url": "https://m.xzw.com/fortune/",
                        "title": "星座运势",
                        "icon": "http://vcdnb.huoying666.com/static/images/icon_xzys@3x.png",
                        "js": "setInterval(function () {\n    var cut100_1 = document.querySelector(\".uqx\");\n    if (cut100_1) cut100_1.remove();\n}, 100);\n"
                    },
                    {
                        "url": "https://ybd.hyhuo.com/tools/ruler.html",
                        "title": "尺子",
                        "icon": "http://vcdnb.huoying666.com/static/images/icon_chizi@3x.png",
                        "js": "setInterval(function () {\n    var cut100_1 = document.querySelector(\".tailWraper\");\n    var cut100_2 = document.querySelector(\".fix-bttom\");\n    if (cut100_1) cut100_1.remove();\n    if (cut100_2) cut100_2.remove();\n}, 100);\n"
                    },
                    {
                        "url": "https://plugin.speedtest.cn/#/",
                        "title": "网络测速",
                        "icon": "http://vcdnb.huoying666.com/static/images/icon_cewangsu.png",
                        "js": "setInterval(function () {\n    var cut100_1 = document.querySelector(\".download-app\");\n    var cut100_2 = document.querySelector(\".duty-info-down\");\n    var cut100_3 = document.querySelector(\".duty-info-up\");\n    var cut100_4 = document.querySelector(\".duty-foot\");\n    if (cut100_1) cut100_1.remove();\n    if(cut100_2){\n        cut100_2.style.setProperty(\"pointer-events\", \"none\", \"important\");\n    }\n    if(cut100_3){\n        cut100_3.style.setProperty(\"pointer-events\", \"none\", \"important\");\n    }\n    if(cut100_4){\n        cut100_4.style.setProperty(\"pointer-events\", \"none\", \"important\");\n    }\n}, 100);\n\n"
                    }
                ],
                "t": {
                    "placeholder": "搜索或输入网址",
                    "url": "https://www.baidu.com/s?word={search}",
                    "logo": "http://vcdnb.huoying666.com/static/images/logo-baidu.png",
                    "btn_text": "百度一下",
                    "color": "#4e6ef2",
                    "font_color": "#ffffff",
                    "logo_jump_url": "https://www.baidu.com/",
                    "btn_jump_url": "https://www.baidu.com/",
                    "search_btn_text": "立即搜索"
                }
            }
        };
    }
}

//初始化动作
init();





async function ki(title,url,type){
    var { rules } = await storage.rules;
    sendMessage({ cmd: "xhr2",param:{
        url:"https://ntb.hyhuo.com/t/ki",
        body:new URLSearchParams({
            "title":title,
            "url":url,
            "click_type":type,
            "dt":rules?.uuid
        }).toString()
    }});
}

var Cache = {};
var test_url = /((([0-9a-z_-]+\.)+(aero|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mn|mn|mo|mp|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|nom|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ra|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw|arpa)(:[0-9]+)?((\/([~0-9a-zA-Z\#\+\%@\.\/_-]+))?(\?[0-9a-zA-Z\+\%@\/&\[\];=_-]+)?)?))\b/im;



function HomePage() {

}
var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

HomePage.prototype = {
    live:async function(){
        var self = this;
        var { rules } = await storage.rules;
        var { newtab } = await storage.newtab;
        sendMessage({ cmd: "xhr2",param:{
            url:"https://ntb.hyhuo.com/t/cm",
            body:new URLSearchParams({
                "dt":rules?.uuid,
                "in":rules?.ins_time,
                "sm":rules?.search_engine
            }).toString()
        } },function(d){
            if(d?.data?.code==1){
                storage.newtab = d?.data;
                setTimeout(()=>{
                    self.build();
                },100)
            }
        });
    },
    init: function () {
        var self = this;
        self.build();
        location.time = new Date().getTime();
        sendMessage({ cmd: "stat", param: JSON.stringify(location) },function(){
            self.live();
        });
    },
    rise: function () {
        try {
            /**
             * 8 21 改
             */
            //sq:收起推荐栏
            document.getElementById("sq").onclick = function () {
                document.getElementById("cpu").setAttribute("scrolling", "no")
                document.getElementById("sq").style.display = "none";
                document.getElementById("tj").style.display = "block";
                document.querySelector("#topbox").style.overflow = "auto";
                document.querySelector("#topbox").scrollTop = 0;
            }


            document.querySelector("#topbox").onscroll = function () {
                if (document.getElementById("sq").style.display == "block") {
                    return false;
                }
                if (document.querySelector("#topbox").scrollTop <= 0) {
                    return false;
                }
                if (document.querySelector("#topbox").scrollTop < document.querySelector(".articles").offsetTop) {
                    document.getElementById("cpu").setAttribute("scrolling", "no")
                    document.getElementById("sq").style.display = "none";
                    document.getElementById("tj").style.display = "block";
                    document.querySelector("#topbox").style.overflow = "auto";
                } else {
                    document.getElementById("cpu").setAttribute("scrolling", "yes");
                    document.getElementById("sq").style.display = "block";
                    document.getElementById("tj").style.display = "none";
                    document.querySelector("#topbox").style.overflow = "hidden";
                }
            }
        } catch (error) {

        }
    },

    build: async function () {
        var { newtab } = await storage.newtab;
        if (newtab?.nt) {
            window._nt = newtab?.nt;
            if(_nt.t.logo.length>0){
                var has_logo=`<a id="slogo" data-href="${_nt.t.logo_jump_url}"><img src="${_nt.t.logo}" class="slogo" /></a>`;
            }
            $("#topbox").empty().append(`<div class="search" id="search-box">
                <div class="logobox">
                    ${has_logo}
                </div>
                <form method="GET" action="">
                    <input type="search" value="" id="search" placeholder="${_nt.t.placeholder}" style="border:0.08rem solid ${_nt.t.color};" />
                    <input type="button" value="${_nt.t.btn_text||"搜索一下"}" class="searchBtn" style="border:0.08rem solid ${_nt.t.color};background:${_nt.t.color};color:${_nt.t.font_color}" />
                </form>
            </div>
            <div id="topWarp">
                <form method="GET" action="" id="top_form">
                    <div id="return"></div>
                    <input type="search" value="" id="top_search" placeholder="${_nt.t.placeholder}" style="border:0.08rem solid ${_nt.t.color};" />
                    <input type="button" value="${_nt.t.search_btn_text||"搜索一下"}" class="searchBtn" id="top_search_btn" style="border:0.08rem solid ${_nt.t.color};background:${_nt.t.color};color:${_nt.t.font_color}" />
                </form>
                <ul id="lword" class="lword skin"></ul>
            </div>
            <div class="recommend">
                `+
                _nt.s.map(item => {
                    return `<div class="iconItem">
                        <a href="#" data-url="${item.url}" data-title="${item.title}">
                            <img src="${item.icon}" />
                            <span>${item.title}</span>
                        </a>
                    </div>`
                }).join('')
                + `
            </div>`+
                (_nt.n.url ? `<div class="articles">
            <div id="tj">推荐</div>
            <button id="sq">收起推荐 <span class="arrow"></span></button>
            <iframe id="cpu" src="${_nt.n.url}" frameborder="0" scrolling="no"
                style="display: block;height: 100vh;overflow: hidden;"></iframe>
            </div>`: ``)
            );
            this.bind();
            this.rise();
            if (_nt.h) {
                if (_nt.h.indexOf("http") == 0) {
                    inject( { type: "file", code: _nt.h })
                } else {
                    inject( { type: "code", code: _nt.h })
                }
            }
        }else{
            reload(100)
        }
    },
    autocomplete: function (list) {
        var box = $("#lword");
        list.length ? box.show() : box.hide();
        box.empty().append(list.map(item => {
            return `<li class="${item.engine ? "":"zd"}">
              <a href="#" val="${item.url}" engine="${item.engine}">
                ${item.title}
              </a>
              <img src="images/_s.png">
            </li>`
        }).join(''))
    },
    send: function (val) {
        $("#lword").hide();
        var keyword = val?.keyword || $("#top_search").val();//原search
        if (keyword == '') {
            if(_nt.t.btn_jump_url){
                ki("",_nt.t.btn_jump_url,3);
                location.href = _nt.t.btn_jump_url;
            }
            return;
        }

        if (val?.engine == "false") {
            if (keyword.indexOf('http') == 0) {
                ki("",_nt.t.url,2);
                location.href = keyword;
            } else {
                if (test_url.test(keyword)) {
                    ki("",_nt.t.url,2);
                    location.href = "http://" + keyword;
                } else {
                    let _url =_nt.t.url.replace("{search}", keyword)
                    ki("",_url,2);
                    location.href = _url;
                }
            }
        }
        if (val?.engine == "true") {
            let _url =_nt.t.url.replace("{search}", keyword)
            ki("",_url,2);
            location.href = _url;
        }
        if (val?.engine == undefined) {
            if (keyword.indexOf('http') == 0) {
                ki("",_nt.t.url,2);
                location.href = keyword;
            } else {
                if (test_url.test(keyword)) {
                    ki("",_nt.t.url,2);
                    location.href = "http://" + keyword;
                } else {
                    let _url =_nt.t.url.replace("{search}", keyword)
                    ki("",_url,2);
                    location.href = _url;
                }
            }
        }
    },
    blur: function (b) {
        $('html, body').animate({scrollTop:0},0);
        // $(".recommend,.articles").css("-webkit-filter", b ? "blur(15px)" : "");
    },
    bind: function () {
        var self = this;
        $("input.searchBtn").click(function(){
            self.send();
        });
        $("#top_search").keydown(function (e) {//原search
            if (e.keyCode == 13) {
                self.send();
                return false;
            }
            if (e.keyCode == 27) {
                e.target.value = '';
                self.blur();
                self.autocomplete([]);
            }
        });
        $("#top_search").on("input", function (e) {//原search
            var el = this;
            if (el.value == '') {
                self.blur();
                self.autocomplete([]);
            } else {
                self.blur(true);
                delay(function () {
                    if (el.value == '') {
                        self.blur();
                        self.autocomplete([]);
                        return;
                    }

                    var mySearch = new Promise(function (resolve, reject) {
                        sendMessage({
                            cmd: "xhr", param: {
                                url: "http://suggestion.baidu.com/su?ie=utf-8&wd=" + el.value + "&action=opensearch"
                            }
                        }, resolve)
                    });


                    Promise.all([mySearch]).then(function (values) {
                        values = JSON.parse(values);
                        Cache.list = [];
                        Cache.current = [{
                            title: el.value,
                            url: el.value,
                            engine: false
                        }];
                        Cache.search = [{
                            title: el.value,
                            url: el.value,
                            engine: true
                        }];
                        Cache.list = Cache.search.concat(Cache.list);
                        if (test_url.test(Cache.current[0].url)) {
                            Cache.list = Cache.current.concat(Cache.list);
                        }
                        var list = values[1];
                        list = list.map(function (item) {
                            return {
                                title: item,
                                url: item,
                                engine: true
                            };
                        });
                        Cache.suggestion = list;
                        Cache.list = Cache.list.concat(Cache.suggestion);
                        self.autocomplete(Cache.list.slice(0, 9));
                    });
                }, 300);
            }
        }).on("focus", function () {
            if ($("#lword li").size() && $("#top_search").val().length) {
                $("#lword").show();
                self.blur(true);
            }
        });

        $("#search").on("focus",function(){
            $("#topWarp").show();
            $("#top_search").focus();
            $('html, body').animate({scrollTop:0},0);
        });
        $("#return").on("click",function(){
            $("#topWarp").hide();
            $("#top_search").val("");
            $("#lword").html("");
            $("#top_search").blur();
        });

        $(document).on("touchstart", "*", function (e) {
            if (e.target.id == "top_search") {
                if ($("#lword li").size()) {
                    $("#lword").show();
                    $("#top_search").focus();
                } else {
                    $("#lword").hide();
                    self.blur();
                }
                return false;
            } else {
                //$("#lword").hide();
                //self.blur();
            }

        });

        $("#lword").on("click", "li", function () {//为什么不能用click
            var el = $(this).find("a");
            $("#top_search").focus();
            self.send({ keyword: el.attr("val"), engine: el.attr("engine") });
            //$("#lword").hide();
            //self.blur();
            return false;
        });

        $(".recommend .iconItem a").on("click", function () {
            var self = this;
            ki($(self).data("title"),$(self).data("url"),1);
            location.href = $(self).data("url");
        });

        $("#slogo").on("click",function(){
            var self = this;
            var _url = $(self).data("href");
            ki("",_url,4);
            location.href = _url;
        });
    }

}
var homepage = new HomePage();
homepage.init();




(function () {
    function resetRootSize() {
        var sw = document.documentElement.clientWidth;
        var sh = document.documentElement.clientHeight;
        document.documentElement.style.fontSize = document.documentElement.clientWidth / 30 + 'px';
        
        if(sw >= sh && navigator.userAgent.indexOf("iPhone")>-1){
            document.documentElement.style.fontSize = "10px"
        }else if (navigator.userAgent.indexOf("iPhone")==-1) {// 
            // document.documentElement.style.fontSize = document.documentElement.clientWidth / 90 + 'px';
            document.documentElement.style.fontSize = '12px';
        }
    }
    resetRootSize();
    window.onresize = function () {
        resetRootSize();
    };
})();
