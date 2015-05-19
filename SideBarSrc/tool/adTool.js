define(["webConsole", "communication"], function (webConsole, communication) {

    return function () {
        var hostName = window.COSB.hostName;
        var tool = {
            tool_id: 'sb0000', //工具项ID
            tool_name: 'adTool',//工具项名称
            tool_display: 'on',//工具项是否显示  on[开]/off[关]
            tool_type: 'basic', //工具项类型 basic[基础功能]/func[自有功能]/bu[事业部]/other[其它]
            tool_sequence: 0, //工具条项目显示次序

            tool_iconType: 'server', //工具条项图标接入方式 server[读取]/local[本地]
            tool_iconTagId: 'adTag', //图标ID  
            tool_iconBodyId: 'adTip', //标签ID
            tool_iconBody: undefined, //标签内容
            tool_iconCreatationFn: function () {

                var loadIcon = function () {
                    var tagDom = [
                        '<div class="stool_ad ">',
                        '<a id="adTag" href="{0}">',
                        '<div><img src="{1}" width="{2}" height="{3}"></div>',
                        '</a>',
                        '<div id="adTip" class="stool_ad_pop" style="display:none">',
                            '<div><i class="stool_icon stool_arrow"></i><a href="javascript:void(0)" class="stool_icon stool_ad_close" id="hoverClose_' + tool.tool_name + '">关闭</a></div>',
                        '</div></div>'
                    ].join('\n');


                    var bizCallback = {
                        bizId: "ad",
                        sucFn: function (responseObj) {
                        },
                        failFn: function (responseObj) {
                        }
                    };
                    if (hostName == "ctrip.com") {
                        communication.jsonpScript('http://crm.ws.ctrip.com/Customer-Market-Proxy/AdCallProxy.aspx?re=ads&adlist=[{"adIDs":"5653","domID":"adTag"}]&backup=3', bizCallback);
                    }
                    else {
                        communication.jsonpScript('http://crm.ws.fws.qa.nt.ctripcorp.com/Customer-Market-Proxy/AdCallProxy.aspx?re=ads&adlist=[{"adIDs":"5653","domID":"adTag"}]&backup=3', bizCallback);
                    }
                    window.G_adContentConfigTwo = undefined;
                    var loadTagPic = setInterval(function () {
                        if (G_adContentConfigTwo) {

                            clearInterval(loadTagPic);
                            if (G_adContentConfigTwo.adTag != undefined && G_adContentConfigTwo.adTag.length > 0) {
                                var tagObj = G_adContentConfigTwo.adTag[0];
                                tagDom = tagDom.format("javascript:void(0)", tagObj.src, tagObj.width, tagObj.height);

                                tool.tool_iconBody = tagDom;
                                G_adContentConfigTwo = undefined;
                            }
                            else
                                webConsole.error("adTag lost", "jsonpCallback");
                        }
                    }, 3);
                };

                loadIcon();
            },
            tool_iconOnLoadedFn: function () {
                var bizCallback = {
                    bizId: "ad",
                    sucFn: function (responseObj) {
                    },
                    failFn: function (responseObj) {
                    }
                };
                if (hostName == "ctrip.com") {
                    communication.jsonpScript('http://crm.ws.ctrip.com/Customer-Market-Proxy/AdCallProxy.aspx?re=ads&adlist=[{"adIDs":"5639","domID":"adTip"}]&backup=3', bizCallback);
                }
                else {
                    communication.jsonpScript('http://crm.ws.fws.qa.nt.ctripcorp.com/Customer-Market-Proxy/AdCallProxy.aspx?re=ads&adlist=[{"adIDs":"5639","domID":"adTip"}]&backup=3', bizCallback);
                }

                var tipDom = [
                    '<div><a href="{0}" target="_blank"><img src="{1}" width="{2}" height="{3}"></a></div>',

                ].join('\n');

                var loadTipPic = setInterval(function () {
                    if (G_adContentConfigTwo && G_adContentConfigTwo.adTip != undefined && G_adContentConfigTwo.adTip.length > 0) {

                        clearInterval(loadTipPic);

                        var tipObj = G_adContentConfigTwo.adTip[0];
                        tipDom = tipDom.format(tipObj.link, tipObj.src, tipObj.width, tipObj.height);

                        var accessOne = document.createElement("div");
                        accessOne.innerHTML = tipDom;
                        document.getElementById("adTip").appendChild(accessOne);

                        document.getElementById("adTip").onmouseover = function () {

                            document.getElementById("adTip").style.display = "block";

                        };

                        document.getElementById("adTip").onmouseout = function () {

                            document.getElementById("adTip").style.display = "none";

                        };

                        if (document.getElementById("hoverClose_" + tool.tool_name) != undefined) {

                            document.getElementById("hoverClose_" + tool.tool_name).onclick = function () {

                                document.getElementById(tool.tool_iconBodyId).style.display = "none";
                            };
                        }


                        G_adContentConfigTwo = undefined;
                    }

                }, 3);
            }, //标签内容重载方法


            tool_contentType: 'close',  //工具项显示内容类型
            tool_contentId: undefined,  //工具项显示内容ID
            tool_content: undefined, //工具项显示内容
            tool_contentCreatationFn: undefined, //工具项显示内容创建方法
            tool_contentOnLoadedFn: undefined,//工具项显示内容重载方法
            tool_contentPoolType: 'hide', //判断是否执行pool相关方法的标准  show||hide
            tool_contentPoolId: undefined,//工具项显示内容池ID 
            tool_contentPool: undefined,//工具项显示内容池
            tool_contentPoolCreatationFn: undefined,
            tool_contentPoolOnLoadedFn: undefined,//工具项显示内容池重载方法
            tool_backId: undefined
        };

        return tool;
    };
});