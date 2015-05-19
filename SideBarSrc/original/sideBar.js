define(["webConsole", "mt", "engine", "cookie", "myImplementTool", "myHistoryTool", "scanTool", "feedbackTool", "liveChatTool", "returnTopTool", "adTool", "loggingTool", "myCtripTool", "myFavoriteTool"],
    function (webConsole, mt, engine, cookie, myImplementTool, myHistoryTool, scanTool, feedbackTool, liveChatTool, returnTopTool, adTool, loggingTool, myCtripTool, myFavoriteTool) {

        /**
         * 侧边栏基础功能
         * @method
         * @for sideBar
         * @param {参数类型} 参数名 参数说明
         * @return {返回值类型} 返回值说明
         */
        var baseBarFn = function () {
            try {
                var tools = [myImplementTool(), myHistoryTool(), scanTool(), feedbackTool(), liveChatTool(), returnTopTool(), adTool(), myCtripTool(), myFavoriteTool()];
                var unloggedTools = [myImplementTool(), myHistoryTool(), scanTool(), feedbackTool(), liveChatTool(), returnTopTool(), adTool(), loggingTool(), myFavoriteTool()];

                window.COSB.installedTools.length = 0;//重置已加载项目

                if (window.COSB.logged) {

                    engine.ignition(tools);
                }
                else {
                    engine.ignition(unloggedTools);
                }
            }
            catch (ex) {
                webConsole.error(ex.message, "baseBarFn");
            }
            finally {
                webConsole.log("baseBar");
            }
        };

        /**
         * 侧边栏扩展功能
         * @method append
         * @for sideBar
         * @param {Array} addonArray 需扩展的数组
         *                {Json} addon[id,iconUrl,hoverHtml,openHtml]
         * @return {Bool} 扩展是否成功
         */
        var addonBarFn = function (tool) {
            try {

                waitLoadBacic = setInterval(function () {
                    if (window.COSB.sideBarStatus && window.COSB.sideBarStatus == "loadSuc") {
                        clearInterval(waitLoadBacic);
                        if (tool) {
                            engine.turbine(tool);
                        }
                        else {
                            webConsole.error("tool is error", "addonBarFn");
                        }
                    }
                }, 3);
            }
            catch (ex) {
                webConsole.error(ex.message);
            }
            finally {
                webConsole.log("addonBar");

            }
        };

        /**
         * 侧边栏展示功能
         * @method display
         * @for sideBar
         * @param {参数类型} 参数名 参数说明
         * @return {返回值类型} 返回值说明
         */
        var showBarFn = function (displayStatus) {

            try {

                waitLoadBacic = setInterval(function () {
                    if (window.COSB.sideBarStatus && window.COSB.sideBarStatus == "loadSuc") {
                        clearInterval(waitLoadBacic);

                        document.getElementById("WholeMatrix").style.display = displayStatus;
                        webConsole.log("showBar");
//                        document.getElementById("sidebar").style.display = "none";
                    }
                }, 3);
            }
            catch (ex) {
                webConsole.error(ex.message);
            }
            finally {
//                webConsole.log("showBar");
//                document.getElementById("sidebar").style.display = "none";
            }
        };

        /**
         * 侧边栏入口功能
         * @method init
         * @for sideBar
         * @return {返回值类型} 返回值说明
         */
        var runFn = function () {
            try {

                cookie.logIn();

                baseBarFn();
            }
            catch (ex) {
                webConsole.error(ex);
            }
            finally {
                webConsole.log("entrance");
            }
        };

        return {
            init: runFn,
            append: function () {
                return addonBarFn;
            },
            show: function () {
                return showBarFn("block");
            },
            hide: function () {
                return showBarFn("none");
            },
            closeTag: function () {
                return engine.closeAllTip();
            },
            closeContent: function () {
                return engine.closeAllContent();
            },
            reloadPool: function (toolObj) {
                return engine.reloadPool(toolObj);
            }
        }

    });