define(["webConsole", "access", "animate", "definition", "defaultCfg", "jsHelper"],
    function (webConsole, access, animate, definition, defaultCfg, jsHelper) {


        //收起状态
        var barHtml = [
            '<div id="WholeMatrix" class="pub_side_tool" style="display:none;">',
            '<div id="ToolBarMatrix" class="stool_ctrl">',
            '<div id="MyCtripMatrix"></div>',
            '<div id="FuncGroupMatrix" class="stool_func"></div>',
            '<div id="OtherGroupMatrix" class="stool_other stool_no_top"></div>',
            '<div id="btnToShort" class="stool_scale"><a href="javascript:void(0)" class="stool_icon stool_min">缩小</a></div>',
            '<div id="btnToLong" class="stool_scale" style="display:none;"><a href="javascript:void(0)" class="stool_icon stool_max">展开</a></div>',
            '</div></div>', ].join('\n');

        access.accessBar(barHtml);


        var mainControl;

        var installSwitchConfig = function () {
            try {
                //防重复赋值
                if (mainControl != undefined && typeof (mainControl) == "object")
                    return;

                mainControl = definition.mainSwitchDefinition;
                var defToken = defaultCfg.mainToken;
                var defMainSwitch = defaultCfg.mainSwitch;
                mainControl.ms_displaySideBar = { token: defToken, setVal: defMainSwitch.ms_displaySideBar };
                mainControl.ms_switchTools = { token: defToken, setVal: defMainSwitch.ms_switchTools };
                mainControl.ms_loggedShowContent = { token: defToken, setVal: defMainSwitch.ms_loggedShowContent };
                mainControl.ms_backUrl = { token: defToken, setVal: 'https://accounts.' + window.COSB.hostName + '/member/login.aspx?BackUrl=' + document.URL + '&responsemethod=get' };

            }
            catch (ex) {
                webConsole.error(ex.message, "installSwitchConfig");
            }
        }

        var controlSwitchFn = function (toolId, toolName) {

            installSwitchConfig();

            try {
                if (mainControl.ms_displaySideBar != "on" || mainControl.ms_switchTools.length <= 0) {

                    return false;  //todo 改成全局变量控制是否显示
                }
                else {

                    if (mainControl.ms_switchTools.contains(toolId)) {
                        return true;
                    }
                    else {
                        webConsole.log("toolId:" + toolId + ";toolName:" + toolName + "is switch-off", "controlSwitchFn");
                        return false;
                    }
                }
            }
            catch (ex) {
                webConsole.error(ex.message, "controlSwitchFn");
            }
        };

        var switchCurStyle = function (toolId) {
            var curStyleName = undefined;
            switch (toolId) {
                case "sb0001":
                    curStyleName = "stool_current";
                    break;
                case "sb0002":
                    curStyleName = "stool_current";
                    break;
                case "sb0004":
                    curStyleName = "stool_history_cur";
                    break;
                case "sb0005":
                    curStyleName = "stool_fav_cur";
                    break;
                case "sb0006":
                    curStyleName = "stool_tools_cur";
                    break;
            }
            ;
            return curStyleName;
        };

        var closeAllTipFn = function () {

            for (var i = 0; i < window.COSB.installedTools.length; i++) {
                var tool = window.COSB.installedTools[i];

                if (tool.tool_iconBodyId == undefined || document.getElementById(tool.tool_iconBodyId) == null)
                    continue;

                if (document.getElementById(tool.tool_iconBodyId).style.display == "block") {
                    document.getElementById(tool.tool_iconBodyId).style.display = "none";
                }
            }

        };

        var closeAllContentFn = function () {


            for (var i = 0; i < window.COSB.installedTools.length; i++) {

                var tool = window.COSB.installedTools[i];

                if (tool.tool_contentId == undefined || document.getElementById(tool.tool_contentId) == null)
                    continue;

                if (tool.tool_contentType == "open" && document.getElementById(tool.tool_contentId).style.display == "block") {
                    animate.contentClose(tool.tool_contentId);
                }
                else {
                    document.getElementById(tool.tool_contentId).style.display = "none";
                }
                jsHelper.removeClass(document.getElementById(tool.tool_iconTagId), switchCurStyle(tool.tool_id));
            }
        };

        var removeAllTagCur = function () {
            for (var i = 0; i < window.COSB.installedTools.length; i++) {

                var tool = window.COSB.installedTools[i];

                jsHelper.removeClass(document.getElementById(tool.tool_iconTagId), switchCurStyle(tool.tool_id));
            }
        };

        var changeSBType = function (type) {

            closeAllContentFn();
            jsHelper.toggleClass(document.getElementById("ToolBarMatrix"), "stool_short_box");
            window.COSB.type = type;
        };


        var reloadPoolFn = function (toolObj) {

            try {
                var poolLoading = ['<div class="stool_item_list stool_loading">',
                    '<p class="stool_tips_no_list"><img src="http://pic.c-ctrip.com/common/loading_blue_transparent.gif">努力加载中...</p>',
                    '</div>'
                ].join('\n');

                if (toolObj.tool_contentPoolCreatationFn != undefined && typeof (toolObj.tool_contentPoolCreatationFn) == "function") {//存在创建内容方法

                    access.accessToolContentPool(toolObj.tool_contentPoolId, poolLoading);

                    toolObj.tool_contentPoolCreatationFn();
                }

                var waitLoadPool = setInterval(function () {
                    if (toolObj.tool_contentPool != undefined && toolObj.tool_contentPool != null) {

                        clearInterval(waitLoadPool);

                        access.accessToolContentPool(toolObj.tool_contentPoolId, toolObj.tool_contentPool);
                        toolObj.tool_contentPool = undefined;
                        if (toolObj.tool_contentPoolOnLoadedFn != undefined && typeof (toolObj.tool_contentPoolOnLoadedFn) == "function") {
                            toolObj.tool_contentPoolOnLoadedFn();
                        }
                    }
                }, 3);
            }
            catch (ex) {
                webConsole.error(ex, "loadContentFn");
            }
        };

        var turbineFn = function (toolObj) {

            try {
                if (toolObj == "undefined" || toolObj == null) {
                    webConsole.log("toolObj is undefined", "turbineFn");
                    return;
                }

                var loadPoolFn = function () {

                    try {
                        var poolLoading = ['<div class="stool_item_list stool_loading">',
                            '<p class="stool_tips_no_list"><img src="http://pic.c-ctrip.com/common/loading_blue_transparent.gif">努力加载中...</p>',
                            '</div>'
                        ].join('\n');

                        if (toolObj.tool_contentPoolCreatationFn != undefined && typeof (toolObj.tool_contentPoolCreatationFn) == "function") {//存在创建内容方法

                            access.accessToolContentPool(toolObj.tool_contentPoolId, poolLoading);

                            toolObj.tool_contentPoolCreatationFn();
                        }

                        var waitLoadPool = setInterval(function () {
                            if (toolObj.tool_contentPool != undefined && toolObj.tool_contentPool != null) {

                                clearInterval(waitLoadPool);

                                access.accessToolContentPool(toolObj.tool_contentPoolId, toolObj.tool_contentPool);
                                toolObj.tool_contentPool = undefined;
                                if (toolObj.tool_contentPoolOnLoadedFn != undefined && typeof (toolObj.tool_contentPoolOnLoadedFn) == "function") {
                                    toolObj.tool_contentPoolOnLoadedFn();
                                }
                            }
                        }, 3);
                    }
                    catch (ex) {
                        webConsole.error(ex, "loadContentFn");
                    }
                };

                var loadContentFn = function () {
                    try {
                        if (window.COSB.logged || (!window.COSB.logged && !mainControl.ms_loggedShowContent.contains(toolObj.tool_id))) { //已登录 & 不需登录展开项

                            if (document.getElementById(toolObj.tool_contentId) == null) { //未加载


                                if (toolObj.tool_contentCreatationFn != undefined && typeof (toolObj.tool_contentCreatationFn) == "function") {//存在创建内容方法

                                    toolObj.tool_contentCreatationFn();
                                }
                            }

                            var waitLoadContent = setInterval(function () {

                                if (toolObj.tool_content != undefined && toolObj.tool_content != null) {

                                    clearInterval(waitLoadContent);
                                    access.accessToolContent(toolObj.tool_content);
                                    toolObj.tool_content = undefined;

                                    if (toolObj.tool_contentOnLoadedFn != undefined && typeof (toolObj.tool_contentOnLoadedFn) == "function") {
                                        toolObj.tool_contentOnLoadedFn();
                                    }

                                    document.getElementById(toolObj.tool_iconTagId).onclick = function () {

                                        if (window.COSB.type == "short") {
                                            changeSBType("long");
                                            document.getElementById("btnToLong").style.display = "none";
                                            document.getElementById("btnToShort").style.display = "block";
                                        }

                                        if (toolObj.tool_contentPoolType == "show" && document.getElementById(toolObj.tool_contentId).style.display == "none") {
                                            loadPoolFn();
                                        }

                                        if (toolObj.tool_backId != undefined && toolObj.tool_backId != null) {
                                            document.getElementById(toolObj.tool_backId).onclick = function () {

                                                closeAllTipFn();

                                                jsHelper.removeClass(document.getElementById(toolObj.tool_iconTagId), switchCurStyle(toolObj.tool_id));

                                                document.getElementById(toolObj.tool_iconBodyId).style.display = "none"

                                                animate.contentClose(toolObj.tool_contentId);
                                            };
                                        }
                                        else {
                                            webConsole.warn("tool_backId is undefined ! tool_id:" + toolObj.tool_id, "turbineFn");
                                        }

                                        if (cQuery.browser.isIPad) {

                                            if (document.getElementById(toolObj.tool_iconBodyId).style.display == "none") {

                                                closeAllTipFn();
                                                removeAllTagCur();
                                                document.getElementById(toolObj.tool_iconBodyId).style.display = "block";
                                                jsHelper.addClass(document.getElementById(toolObj.tool_iconTagId), switchCurStyle(toolObj.tool_id));
                                            }
                                            else {
                                                document.getElementById(toolObj.tool_iconBodyId).style.display = "none";
                                                jsHelper.removeClass(document.getElementById(toolObj.tool_iconTagId), switchCurStyle(toolObj.tool_id));
                                            }
                                        } else {
                                            if (document.getElementById(toolObj.tool_contentId).style.display == "none") {
                                                closeAllTipFn();
                                                removeAllTagCur();
                                                jsHelper.addClass(document.getElementById(toolObj.tool_iconTagId), switchCurStyle(toolObj.tool_id));
                                            }
                                            else {
                                                jsHelper.removeClass(document.getElementById(toolObj.tool_iconTagId), switchCurStyle(toolObj.tool_id));
                                            }
                                        }

                                        animate.contentOpen(toolObj.tool_contentId);
                                    }
                                }

                            }, 3);
                        }
                        else if (!window.COSB.logged && mainControl.ms_loggedShowContent.contains(toolObj.tool_id)) { //未登录且需登录展开项

                            document.getElementById(toolObj.tool_iconTagId).onclick = function () {
                                window.location.href = mainControl.ms_backUrl;
                            };
                        }


                    }
                    catch (ex) {
                        webConsole.error(ex, "loadContentFn");
                        return false;
                    }
                };

                if (controlSwitchFn(toolObj.tool_id)) {

                    if (toolObj.tool_display == "on") { //分控ON

                        if (toolObj.tool_iconType == "server") {

                            if (toolObj.tool_iconCreatationFn != undefined && typeof (toolObj.tool_iconCreatationFn) == "function") {

                                toolObj.tool_iconCreatationFn();

                                var waitIconBody = setInterval(
                                    function () {

                                        if (toolObj.tool_iconBody != undefined && typeof (toolObj.tool_iconBody) == "string" && !toolObj.tool_iconBody.isNull()) {

                                            clearInterval(waitIconBody);

                                            dom.Deferred(
                                                function () {

                                                    access.accessTool(toolObj.tool_type, toolObj.tool_iconBody);
                                                }
                                            )
                                                .then(function () {


                                                    if (!cQuery.browser.isIPad) {

                                                        if (toolObj.tool_id == "sb0000" || toolObj.tool_id == "sb0001") {

                                                            document.getElementById(toolObj.tool_iconTagId).onmouseover = function () {
                                                                closeAllTipFn();
                                                                document.getElementById(toolObj.tool_iconBodyId).style.display = "block";
                                                            };
                                                        }
                                                        else {
                                                            document.getElementById(toolObj.tool_iconTagId).onmouseover = function () {
                                                                closeAllTipFn();
                                                                document.getElementById(toolObj.tool_iconBodyId).style.display = "block";

                                                            };

                                                            document.getElementById(toolObj.tool_iconTagId).onmouseout = function () {

                                                                document.getElementById(toolObj.tool_iconBodyId).style.display = "none";
                                                            };
                                                        }
                                                    }
                                                    else {
                                                        document.getElementById(toolObj.tool_iconTagId).onclick = function () {

                                                            if (document.getElementById(toolObj.tool_iconBodyId).style.display == "none") {

                                                                closeAllTipFn();

                                                                document.getElementById(toolObj.tool_iconBodyId).style.display = "block";
                                                            }
                                                            else {
                                                                document.getElementById(toolObj.tool_iconBodyId).style.display = "none"
                                                            }

                                                        }
                                                    }

                                                    if (toolObj.tool_iconOnLoadedFn != undefined && typeof (toolObj.tool_iconOnLoadedFn) == "function") {
                                                        toolObj.tool_iconOnLoadedFn();
                                                    }

                                                    if (toolObj.tool_contentType == "open") {

                                                        loadContentFn();
                                                    }

                                                    window.COSB.installedTools.push(toolObj);
                                                }).fire();
                                        }
                                    }, 3);
                            }
                            else {
                                webConsole.error("tool_iconBodyCreatFn is undefined ! tool_id:" + toolObj.tool_id, "turbineFn");
                            }
                        }
                        else if (toolObj.tool_iconType == "local") {

                            if (toolObj.tool_iconBody != undefined && typeof (toolObj.tool_iconBody) == "string" && !toolObj.tool_iconBody.isNull()) {

                                dom.Deferred(access.accessTool(toolObj.tool_type, toolObj.tool_iconBody))
                                    .then(function () {

                                        if (toolObj.tool_iconOnLoadedFn != undefined && typeof (toolObj.tool_iconOnLoadedFn) == "function") {
                                            toolObj.tool_iconOnLoadedFn();
                                        }

                                        if (cQuery.browser.isIPad) {

                                            document.getElementById(toolObj.tool_iconTagId).onclick = function () {
                                                if (document.getElementById(toolObj.tool_iconBodyId).style.display == "none") {

                                                    closeAllTipFn();

                                                    document.getElementById(toolObj.tool_iconBodyId).style.display = "block";
                                                }
                                                else {
                                                    document.getElementById(toolObj.tool_iconBodyId).style.display = "none"
                                                }
                                            };
                                        }
                                        else {

                                            document.getElementById(toolObj.tool_iconTagId).onmouseover = function () {
                                                closeAllTipFn();
                                                document.getElementById(toolObj.tool_iconBodyId).style.display = "block";

                                            };

                                            document.getElementById(toolObj.tool_iconTagId).onmouseout = function () {
                                                document.getElementById(toolObj.tool_iconBodyId).style.display = "none";
                                            };
                                        }

                                        if (toolObj.tool_contentType == "open") {

                                            loadContentFn();
                                        }

                                        if (toolObj.tool_name == "returnTopTool") {
                                            window.onscroll = function () {
                                                if (Number((document.documentElement.scrollTop + document.body.scrollTop)) > 0) {
                                                    jsHelper.removeClass(document.getElementById("OtherGroupMatrix"), "stool_no_top");
                                                    document.getElementById(toolObj.tool_iconTagId).style.display = "block";

                                                } else {

                                                    jsHelper.addClass(document.getElementById("OtherGroupMatrix"), "stool_no_top");
                                                    document.getElementById(toolObj.tool_iconTagId).style.display = "none";
                                                }
                                            };

                                            document.getElementById(toolObj.tool_iconTagId).onclick = function () {
                                                animate.goTop();
                                            };
                                        }

                                        window.COSB.installedTools.push(toolObj);
                                    }).fire();
                            }
                            else {
                                webConsole.error("tool_iconBody is undefined ! tool_id:" + toolObj.tool_id, "turbineFn");
                            }
                        }
                        else {
                            webConsole.error("unknown tool_iconType! tool_id:" + toolObj.tool_id, "turbineFn");
                        }
                    }
                    else if (toolObj.tool_display == "off") { //分控OFF
                        webConsole.warn("toolId:" + toolObj.toolId + ";toolName:" + toolObj.toolName + "is switch-off", "turbineFn");
                    }
                    else {
                        webConsole.error("unknown error", "turbineFn");
                    }
                }
                else {
                    webConsole.log("this id:" + toolObj.tool_id + " offed,please talk with admin", "turbineFn");
                }
            }
            catch (ex) {
                webConsole.error(ex.message, "turbineFn");
            }
        };

        var ignitionFn = function (toolsArray) {

            try {
                if (toolsArray == undefined || toolsArray == null || toolsArray.length == 0) {
                    webConsole.error("toolsArray is undefined", "ignitionFn");
                    return;
                }

                toolsArray.sortBy("tool_sequence");

                var check = function () {
                    var checkNum = 0;
                    for (var i = 0; i < toolsArray.length; i++) {
                        if (document.getElementById(toolsArray[i].tool_iconTagId) != null) {
                            checkNum++;
                        }
                        else {
                            webConsole.error(toolsArray[i].tool_id + " load fail", "ignitionFn");
                            break;
                        }
                    }
                    if (checkNum == toolsArray.length) {
                        window.COSB.sideBarStatus = "loadSuc";
                    }
                    else {
                        window.COSB.sideBarStatus = "loadFail";
                    }
                };

                turbineFn(toolsArray[0]);
                var i = 1;
                oneByOne = setInterval(function () {
                    if (document.getElementById(toolsArray[i - 1].tool_iconTagId) != null) {

                        turbineFn(toolsArray[i]);
                        i += 1;
                    }

                    if (i == toolsArray.length) {
                        check();
                        clearInterval(oneByOne);
                        clearInterval(waitLoad);
                    }
                }, 3);

                waitLoad = setInterval(function () {
                    clearInterval(waitLoad);
                    check();
                    clearInterval(oneByOne);
                }, 20000);
            }
            catch (ex) {
                webConsole.error(ex.message, "ignitionFn");
                return;
            }
        };

        document.getElementById("btnToShort").onclick = function () {

            changeSBType("short");
            document.getElementById("btnToShort").style.display = "none";
            document.getElementById("btnToLong").style.display = "block";
            closeAllTipFn();
            removeAllTagCur();
        };

        document.getElementById("btnToLong").onclick = function () {
            changeSBType("long");
            document.getElementById("btnToLong").style.display = "none";
            document.getElementById("btnToShort").style.display = "block";
            closeAllTipFn();
            removeAllTagCur();

        };

        document.body.onclick = (function (e) {

            var _con = $("#WholeMatrix");   // 设置目标区域
            if (!_con.is(e.target) && !_con.contains(e.target)) {
                closeAllTipFn();
                closeAllContentFn();
            }
        });

        return {
            turbine: turbineFn,
            ignition: ignitionFn,
            closeAllTip: closeAllTipFn,
            closeAllContent: closeAllContentFn,
            reloadPool: reloadPoolFn
        };
    });




