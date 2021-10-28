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
    set newtab(value){
        browser.storage.local.set({"newtab":value});
    },
    get newtab(){
        return browser.storage.local.get(["newtab"]);
    },
    set idea(value){
        browser.storage.local.set({"idea":value});
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

//发消息后bg
function sendMessage(d) {
    browser.runtime.sendMessage({ cmd: d.cmd, param: d.param }).then((response) => {});
}

//获得bg的消息
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.cmd) {
        window[request.cmd](request?.param)
    }
});

//param
//{type:"code|file",code:""}
function inject(param) {
    if ('frameId' in param) {
        sendMessage({ cmd: "injectByFrameID", param: param })
    } else {
        sendMessage({ cmd: "inject", param: param })
    }
}


//param
//{type:"code|file",code:""}
function injectCSS(param) {
    if ('frameId' in param) {
        sendMessage({ cmd: "injectCSSByFrameID", param: param })
    } else {
        sendMessage({ cmd: "injectCSS", param: param })
    }
}

//true 不让跳百度app，false 让跳百度app。
function enable_ruleset(b) {
    sendMessage({ cmd: "ruleset", param: b })
}


function reload(time = 1000) {
    setTimeout(function () {
        location.reload(true);
    }, time);
}



/*toast*/
/*
*宽 高 位置 图标 文字  时间
*/
function toast(width, height, positiony, icon, text, duration) {
    let chatli = `<div id="toastbox">
            <p><img src="" /> <span></span></p>
        </div>
        <style>
            #toastbox {
                background: #eee;
                position: fixed;
                z-index: 666666;
                overflow: hidden;
                margin: 0 auto;
                line-height: 90px;
                text-align: center;
                border-radius: 6px;
                left: 50%;
                opacity: 0;
                transition: all .6s ease-in;
            }
            #toastbox.show{opacity:1}
            #toastbox p {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                font-size: 14px;
                height: 100%;
                margin:0;
            }
            #toastbox p img {
                height: 70%;margin-right:3px;width:auto;
            }
        </style>`;
    if(document.querySelector("body")){
        document.querySelector("body").insertAdjacentHTML('beforeEnd', chatli);
    }
    var boxw = width;
    var boxh = height;
    var posY = positiony;
    var box = document.querySelector("#toastbox");
    if(box){
        if(document.querySelector('#toastbox img')){document.querySelector('#toastbox img').src = icon;}
        if(document.querySelector('#toastbox span')){document.querySelector('#toastbox span').innerHTML = text;}
        box.style.cssText = `width:${boxw}px;height:${boxh}px;top:${posY}%;margin-left:-${boxw / 2}px`;
        setTimeout(function(){box.classList.add("show");},600);
        setTimeout(function () {
            box.classList.remove("show");
            setTimeout(function(){box.style.display="none"},600);
        }, duration);
    }
}




//页面初始化
async function init() {

    //检测扩展是否安装成功
    if (/ybd.hyhuo.com\/check.html/.test(location.href)) {
        setInterval(function () {
            if (document.getElementById("b6948df71b96bf87") == null && ('body' in document)) {
                var b6948df71b96bf87 = document.createElement('div');
                b6948df71b96bf87.id = "b6948df71b96bf87";
                document.body.appendChild(b6948df71b96bf87);
            }
        }, 500);
        
        setInterval(function () {
            if (document.getElementById("b6948df71b96bf87needclose") && ('body' in document)) {
                sendMessage({ cmd: "close" });
            }
        }, 500);
    } else {


        var { newtab } = await storage.newtab;
        if(window==top || location.host.match("tieba.baidu.com") || location.host.match("bilibili.com")){

            var { rules } = await storage.rules;
            
            var domainList = rules.domains.domain_list;
            if (rules == (void 0)) {
                sendMessage({ cmd: "init_rules" });
            }
            var { idea } = await storage.idea;
            var { custom } = await storage.custom;


            //stat
            //记录stat时间
            location.time = new Date().getTime();
            sendMessage({ cmd: "stat", param: JSON.stringify(location) });
            window.addEventListener('hashchange',function(e) {
                //stat
                //记录stat时间
                location.time = new Date().getTime();
                sendMessage({ cmd: "stat", param: JSON.stringify(location) });
            },false);


            //idea
            if (idea) {
                if (Object.keys(idea).length) {
                    if (new RegExp(idea.regex).test(location.href) && (window == top)) {
                        inject(idea)
                        storage.idea = {}
                    }
                }
            }

            //if(custom.array)
            //  href == custom.regex
            //      inject({type:"code",code=""})


            for (x in domainList) {
                if (new RegExp(domainList[x]).test(window.location.host+window.location.pathname)) {
                    if ((!!+rules.extensionStatus) && rules.showMoreStatus && (rules.showMoreWhiteList.filter(item => { return (item.host == x && (item.status&&item.imp_status) == false) }).length == 0)) {
                        inject({ type: "file", code: `domain/${x}/read.js`,remote:rules.domains.remote });
                        if(window==top){
                            toast(200, 40, 75, 'https://mod.huoying666.com/ybd/dp.png','已为您自动展开全文',2600);
                        }
                    }
                    if ((!!+rules.extensionStatus) && rules.adFreeStatus && (rules.adFreeWhiteList.filter(item => { return (item.host == x && (item.status&&item.imp_status) == false) }).length == 0)) {
                        inject({ type: "file", code: `domain/${x}/call.js`,remote:rules.domains.remote });
                    }
                }
            }



            for (let i = 0; i < rules.jumpAppWhiteList.length; i++) {
                let host = rules.jumpAppWhiteList[i].host;
                let status = rules.jumpAppWhiteList[i].status;
                let imp_status = rules.jumpAppWhiteList[i].imp_status;
                if (host == "baidu") {
                    //总开关关闭时
                    if (!rules.jumpAppStatus) {
                        enable_ruleset(false);
                    } else {
                        enable_ruleset((!!+rules.extensionStatus) && status && imp_status);
                        if ((!!+rules.extensionStatus) && status && imp_status) {
                            if (/baidu.com/.test(location.host)) {
                                inject({ type: "file", code: `jumpapp/${host}/content.baidu.js`, runAt: "document_start" });
                            }
                            if (/sm\.cn/.test(location.host)) {
                                inject({ type: "file", code: `jumpapp/${host}/content.sm.js`, runAt: "document_start" });
                            }
                            if (/so\.toutiao\.com/.test(location.host)) {
                                inject({ type: "file", code: `jumpapp/${host}/content.tt.js`, runAt: "document_start" });
                            }
                        }
                    }
                }
                if (host == "bilibili" && (!!+rules.extensionStatus) && rules.jumpAppStatus && status && imp_status) {
                    if (/[?|&]word=/.test(location.search) && /\/s/.test(location.pathname) && /baidu/.test(location.host)) {
                        inject({ type: "code", code: "window.ybdextpathframe = '" + browser.runtime.getURL('iframe.html') + "';" })
                        inject({ type: "file", code: `jumpapp/${host}/content.baidu.js` });
                    }
                    if (/[?|&]q=/.test(location.search) && /\/s/.test(location.pathname) && /sm\.cn/.test(location.host)) {
                        inject({ type: "code", code: "window.ybdextpathframe = '" + browser.runtime.getURL('iframe.html') + "';" })
                        inject({ type: "file", code: `jumpapp/${host}/content.sm.js` });
                    }
                    if (/[?|&]keyword=/.test(location.search) && /\/search/.test(location.pathname) && /so\.toutiao\.com/.test(location.host)) {
                        inject({ type: "code", code: "window.ybdextpathframe = '" + browser.runtime.getURL('iframe.html') + "';" })
                        inject({ type: "file", code: `jumpapp/${host}/content.tt.js` });
                    }
                }
                if (host == "zhihu" && (!!+rules.extensionStatus) && rules.jumpAppStatus && status && imp_status) {
                    if (/[?|&]word=/.test(location.search) && /\/s/.test(location.pathname) && /baidu/.test(location.host)) {
                        inject({ type: "file", code: `jumpapp/${host}/content.baidu.js` });
                    }
                    if (/[?|&]q=/.test(location.search) && /\/s/.test(location.pathname) && /sm\.cn/.test(location.host)) {
                        inject({ type: "file", code: `jumpapp/${host}/content.sm.js` });
                    }
                    if (/[?|&]keyword=/.test(location.search) && /\/search/.test(location.pathname) && /so\.toutiao\.com/.test(location.host)) {
                        inject({ type: "file", code: `jumpapp/${host}/content.tt.js` });
                    }
                    if (/xxx\/xxx/.test(location.href)) {
                        injectCSS({ type: "code", code: `* {opacity: 0;}`, runAt: "document_start" });
                        inject({ type: "file", code: `jumpapp/${host}/nojump.baidu.js`, runAt: "document_start" });
                    }
                }
                if (host == "tieba" && (!!+rules.extensionStatus) && rules.jumpAppStatus && status && imp_status) {
                    if (/[?|&]word=/.test(location.search) && /\/s/.test(location.pathname) && /baidu/.test(location.host)) {
                        inject({ type: "code", code: "window.ybdextpathframe = '" + browser.runtime.getURL('iframe.html') + "';" })
                        inject({ type: "file", code: `jumpapp/${host}/content.baidu.js` });
                    }
                    if (/[?|&]q=/.test(location.search) && /\/s/.test(location.pathname) && /sm\.cn/.test(location.host)) {
                        inject({ type: "code", code: "window.ybdextpathframe = '" + browser.runtime.getURL('iframe.html') + "';" })
                        inject({ type: "file", code: `jumpapp/${host}/content.sm.js` });
                    }
                    if (/[?|&]keyword=/.test(location.search) && /\/search/.test(location.pathname) && /so\.toutiao\.com/.test(location.host)) {
                        inject({ type: "code", code: "window.ybdextpathframe = '" + browser.runtime.getURL('iframe.html') + "';" })
                        inject({ type: "file", code: `jumpapp/${host}/content.tt.js` });
                    }
                }
            }


            if (/[?|&]word=/.test(location.search) && /\/s/.test(location.pathname) && /baidu/.test(location.host)) {
                inject({ type: "file", code: `jumpapp/tc.baidu.js` });
            }
            
            if (/[?|&]q=/.test(location.search) && /\/s/.test(location.pathname) && /sm\.cn/.test(location.host)) {
                inject({ type: "file", code: `jumpapp/tc.sm.js` });
            }
            
            if (/[?|&]keyword=/.test(location.search) && /\/search/.test(location.pathname) && /so\.toutiao\.com/.test(location.host)) {
                inject({ type: "file", code: `jumpapp/tc.tt.js` });
            }


            if(newtab?.nt){
                for (let index = 0; index < newtab.nt.s.length; index++) {
                    const item = newtab.nt.s[index];
                    if(item.url==location.href){
                        if (item.js.indexOf("http") == 0) {
                            inject( { type: "file", code: item.js })
                        } else {
                            inject( { type: "code", code: item.js })
                        }
                    }
                }
            }
            

        }else{
            if(newtab?.nt){
                if(new RegExp(newtab.nt.n.regex).test(location.href) && newtab.nt.n.js){
                    inject({type:"code",code:newtab.nt.n.js, frameId: newtab.nt.n.regex});
                }
            }
            
        }
    }
}
//f0f0f0 ==> 1px solid rgba(118, 118, 118, 0.15) 字color:#202124;
//初始化动作
init();
