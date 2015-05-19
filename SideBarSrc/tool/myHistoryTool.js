define(["webConsole", "communication"], function (webConsole, communication) {

    return function () {
        var hostName = window.COSB.hostName;
        var tool = {

            tool_id: 'sb0004', //工具项ID      
            tool_name: 'myHistoryTool',//工具项名称
            tool_display: 'on',//工具项是否显示  on[开]/off[关]
            tool_type: 'func', //工具项类型 basic[基础功能]/func[自有功能]/bu[事业部]/other[其它]
            tool_sequence: 3, //工具条项目显示次序

            tool_iconType: 'local', //工具条项图标接入方式 server[读取]/local[本地]
            tool_iconTagId: 'myHistoryTag', //图标ID  
            tool_iconBodyId: 'myHistoryTip', //标签ID
            tool_iconBody: '<a id="myHistoryTag" href="javascript:void(0)" class="stool_icon stool_history ">浏览历史</a><p id="myHistoryTip" class="stool_hover_title stool_hover_history" style="display:none;">浏览历史</p>', //标签内容
            tool_iconCreatationFn: undefined,
            tool_iconOnLoadedFn: undefined,

            tool_contentType: 'open',  //工具项显示内容类型
            tool_contentId: 'myHistoryContent',  //工具项显示内容ID
            tool_content: [
                '<div id="myHistoryContent" name="content" class="stool_cont_wrap stool_history" style="display:none;width:0px;">',
                '<div class="stool_cont_hd">',
                '<h3>浏览历史</h3>',
                '<a id="myHistoryBack" href="javascript:void(0)" class="stool_icon stool_back">&gt;&gt;</a>',
                '</div>',
                '<div class="stool_cont_m" id="myHistoryPool">',
                '</div></div></div>'
            ].join('\n'), //工具项显示内容
            tool_contentCreatationFn: undefined, //工具项显示内容创建方法
            tool_contentOnLoadedFn: undefined,//工具项显示内容重载方法
            tool_contentPoolType: 'show', //判断是否执行pool相关方法的标准  show||hide
            tool_contentPoolId: 'myHistoryPool',//工具项显示内容池ID 
            tool_contentPool: undefined,//工具项显示内容池            
            tool_contentPoolCreatationFn: function () {

                var poolError = [
                    '<div class="stool_retry">',
                    '<div class="stool_item_list">',
                    '<p class="stool_tips_no_list">加载失败了，请再试试吧</p></div>',
                    '<div class="stool_btn"><a id="refresh" href="javascript:void(0)">重试</a>',
                    '</div></div>'
                ].join('\n');

                var poolEmpty = [
                    '<div class="stool_item_list">',
                    '<p class="stool_tips_no_list">您看过的产品会记录在这里</p>',
                    '</div>'
                ].join('\n');

                var reloadFn = function () {

                    tool.tool_contentPool = poolError;

                    tool.tool_contentPoolOnLoadedFn = function () {
                        document.getElementById("refresh").onclick = function () {
                            event.stopPropagation();

                            COSB.sideBar.reloadPool(tool);
                        };
                    };
                };


                var requestHistory = function () {

                    var bizCallback = {
                        bizId: "AjaxGetBrowserHistory",
                        sucFn: function (responseObj) {
                            loadFn(responseObj);
                        },
                        failFn: function (responseObj) {
                            reloadFn();
                        }
                    };

                    //communication.jsonpScript("http://www." + hostName + "/homepage/Tool/AjaxGetBrowserHistory.ashx?jsonp=COSB.jsonp.callback", bizCallback);
                    communication.jsonpScript("http://www." + hostName + "/homepage/tool/recommend/like?ch=0&callback=COSB.jsonp.callback", bizCallback);


                };

                var loadFn = function (responseObj) {

                    try {

                        if (responseObj.prdLst == undefined || responseObj.prdLst.length == 0) {
                            tool.tool_contentPool = poolEmpty;
                        } else {
                            var poolBody = '<div class="stool_item_list"><ul>';
                            for (var i = 0; i < responseObj.prdLst.length; i++) {
                                var liItem = [
                                    '<li>',
                                    '<a href="{0}#ctm_ref=sbr_hp_nav_history_txt_25" target="_blank" class="borwsing_link">',
                                    '<span class="b_thumb"><img src="{1}" alt=""></span>',
                                    '<span class="b_name_single"><span title="{2}">{3}</span></span>{4}',
//                                    '<span class="{4}" title="{5}"></span>',
//                                    '<span class="b_price"><span class="c_price">{5}</span> 起</span>',
                                    '<span class="b_price">{5}</span>',
                                    '<span class="b_tag">{6}</span>',
                                    '</a>',
                                    '</li>'
                                ].join('\n');

//                                var liItemFormatted = liItem.format(
//                              responseObj[i].sburl, responseObj[i].sbimg, responseObj[i].sbtitle, responseObj[i].sbname, responseObj[i].sbstar, responseObj[i].sbtitle,
//                                    responseObj[i].sbprice, responseObj[i].sbtype);

                                var prdObj = responseObj.prdLst[i];

                                var liItemFormatted = liItem.format(
                                    prdObj.lnk, prdObj.img, prdObj.nme, prdObj.nme, prdObj.star == undefined ? "" : prdObj.star,
                                        prdObj.price == "" ? '<span class="s_price">实时计价</span>' : '<span class="c_price">' + prdObj.price + '</span> 起', prdObj.zh);
                                poolBody += liItemFormatted;
                            }
                            poolBody += '</ul></div>';
                            tool.tool_contentPool = poolBody;
                        }
                    }
                    catch (ex) {
                        webConsole.error(ex, "tool_poolBodyCreatFn");
                        reloadFn();
                    }
                };
                requestHistory();
            },
            tool_contentPoolOnLoadedFn: undefined,//工具项显示内容池重载方法
            tool_backId: 'myHistoryBack'
        };

        return tool;
    };
});