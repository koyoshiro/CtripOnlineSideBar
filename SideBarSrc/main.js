var configurationsPath = "configuration/",
    thirdPartyPath = "third-party/",
    originalPath = "original/",
    helpersPath = "helper/",
    toolsPath = "tool/";

require.config({
    //baseUrl: 'SideBarSrc/',
    baseUrl: 'http://webresource.c-ctrip.com/ResCRMOnline/R2/Sidebar.Online/SideBarSrc/',

    shim: {

        store: {
            exports: 'store'
        },
        mt: {
            exports: 'mt'
        },
        customConsole: {
            exports: 'customConsole'
        }
    },
    paths: {

        //configs
        'defaultCfg': configurationsPath + "defaultConfig",

        //third-party

        'store': thirdPartyPath + "store",
        'mt': thirdPartyPath + "mootools",
        'customConsole': thirdPartyPath + "console",

        //original
        'sideBar': originalPath + "sideBar",
        'animate': originalPath + "animate",
        'definition': originalPath + "definition",
        'access': originalPath + "access",
        'engine': originalPath + "engine",

        //tool
        'myImplementTool': toolsPath + "myImplementTool",
        'myHistoryTool': toolsPath + "myHistoryTool",
        'myFavoriteTool': toolsPath + "myFavoriteTool",
        'scanTool': toolsPath + "scanTool",
        'feedbackTool': toolsPath + "feedbackTool",
        'liveChatTool': toolsPath + "liveChatTool",
        'returnTopTool': toolsPath + "returnTopTool",
        'adTool': toolsPath + "adTool",
        'loggingTool': toolsPath + "loggingTool",
        'myCtripTool': toolsPath + "myCtripTool",

        //helper
        'region': helpersPath + "region",
        'webConsole': helpersPath + "webConsole",
        'expansion': helpersPath + "expansion",
        'verification': helpersPath + "verification",
        'communication': helpersPath + "communication",
        'cookie': helpersPath + "cookie",
        'jsHelper': helpersPath + "jsHelper",
        'route': helpersPath + "route"

    },
    waitSeconds: 15
});
require(['region', 'store', 'mt', "expansion", 'sideBar', 'route'],
    function (region, store, mt, expansion, sideBar, route) {

        var isIE = function (ver) {
            var b = document.createElement('b')
            b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->'
            return b.getElementsByTagName('i').length === 1
        };


        var loadStyle = function () {
            var style = document.createElement('link');
            //style.href = "SideBarSrc/content/side_tool.css";
            style.href = "http://webresource.c-ctrip.com/ResCRMOnline/R2/Sidebar.Online/SideBarSrc/content/side_tool.css";

            style.rel = 'stylesheet';
            style.type = 'text/css';
            document.getElementsByTagName('HEAD').item(0).appendChild(style);
        };

//        var loadCquery = function () {
//            var scriptTag = document.createElement('script');
//            scriptTag.type = 'text/javascript';
//            scriptTag.async = false;
//            scriptTag.src = "http://webresource.c-ctrip.com/code/cquery/cQuery_110421.js";
//            (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(scriptTag);
//        };
//
//        if (window.cQuery == undefined)
//            loadCquery();

        loadStyle();

        var waitLoadCQ = setInterval(function () {

            if (window.cQuery != undefined) {
                if ($.browser.isChrome || $.browser.isSafari || $.browser.isIE9 || $.browser.isIE10 || isIE(11) || $.browser.isFirefox || $.browser.isOpera || $.browser.isIPad) {

                    window.COSB.sideBar = sideBar;

                    window.COSB.hostName = route;

                    //执行暂缓执行项
                    $LAB.runQueue();

                    clearInterval(waitLoadCQ);

                }
                else {
                    window.console && console.log("Don't support this browser");
                    clearInterval(waitLoadCQ);
                }
            }
        }, 3);
    });

