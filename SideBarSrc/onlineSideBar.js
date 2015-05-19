/**
 * 外部接入入口
 */
(function () {

    var isIE = function (ver) {
        var b = document.createElement('b')
        b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->'
        return b.getElementsByTagName('i').length === 1
    }

    var commonInterface = function () {

        if (!window.COSB) {
            //定义并公开域
            window.COSB = {
                sideBar: undefined,
                jsonp: new Object(),
                sideBarStatus: undefined, //loadSuc||loadFail
                hostName: undefined,
                logged: undefined,
                type: "long",
                installedTools: []
            };
        }

        window.g_adsconfig = "";
    };

    var loadStyle = function () {
        var style = document.createElement('link');
        //style.href = "SideBarSrc/content/side_tool.css";
        style.href = "http://webresource.c-ctrip.com/ResCRMOnline/R2/Sidebar.Online/SideBarSrc/content/side_tool.css";

        style.rel = 'stylesheet';
        style.type = 'text/css';
        document.getElementsByTagName('HEAD').item(0).appendChild(style);
    };


    var loadRequire = function () {
        var scriptTag = document.createElement('script');
        scriptTag.type = 'text/javascript';
        scriptTag.async = false;
        scriptTag.src = "http://webresource.c-ctrip.com/ResCRMOnline/R2/Sidebar.Online/SideBarSrc/third-party/require2.js";
        //scriptTag.setAttribute("data-main", "SideBarSrc/main");

        scriptTag.setAttribute("data-main", "http://webresource.c-ctrip.com/ResCRMOnline/R2/Sidebar.Online/SideBarSrc/main");
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(scriptTag);
    };

    var loadCquery = function () {
        var scriptTag = document.createElement('script');
        scriptTag.type = 'text/javascript';
        scriptTag.async = false;
        scriptTag.src = "http://webresource.c-ctrip.com/code/cquery/cQuery_110421.js";
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(scriptTag);
    };


    if (window.cQuery == undefined)
        loadCquery();

    var waitLoadCQ = setInterval(function () {

        if (window.cQuery != undefined) {
            if ($.browser.isChrome || $.browser.isSafari || $.browser.isIE9 || $.browser.isIE10 || isIE(11) || $.browser.isFirefox || $.browser.isOpera || $.browser.isIPad) {

                commonInterface();

                loadStyle();

                loadRequire();

                clearInterval(waitLoadCQ);

            }
            else {
                window.console && console.log("Don't support this browser");
                clearInterval(waitLoadCQ);
                return;
            }
        }

    }, 3);

})();



