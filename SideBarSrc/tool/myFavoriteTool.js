define(["webConsole", "communication"], function (webConsole, communication) {

    return function () {
        var hostName = window.COSB.hostName;
        //Favorite
        var tool = {
            tool_id: 'sb0005', //工具项ID      
            tool_name: 'myFavoriteTool',//工具项名称
            tool_display: 'on',//工具项是否显示  on[开]/off[关]
            tool_type: 'func', //工具项类型 basic[基础功能]/func[自有功能]/bu[事业部]/other[其它]
            tool_sequence: 4, //工具条项目显示次序

            tool_iconType: 'local', //工具条项图标接入方式 server[读取]/local[本地]
            tool_iconTagId: 'myFavoriteTag', //图标ID  
            tool_iconBodyId: 'myFavoriteTip', //标签ID
            tool_iconBody: '<a id="myFavoriteTag" href="javascript:void(0)" class="stool_icon stool_fav ">收 藏</a><p id="myFavoriteTip" class="stool_hover_title stool_hover_fav" style="display:none;">收 藏</p>', //标签内容
            tool_iconCreatationFn: undefined,
            tool_iconOnLoadedFn: undefined,

            tool_contentType: 'open',  //工具项显示内容类型
            tool_contentId: 'myFavoriteContent',  //工具项显示内容ID
            tool_content: [
                '<div id="myFavoriteContent" name="content" class="stool_cont_wrap stool_fav_wrap" style="display:none;width:0px;">',
                '<div class="stool_cont_hd">',
                '<h3>我的收藏</h3>',
                '<a id="myFavoriteBack" href="javascript:void(0)" class="stool_icon stool_back">&gt;&gt;</a>',
                '</div>',
                '<div class="stool_cont_m" id="myFavoritePool">',
                '</div></div></div>'
            ].join('\n'), //工具项显示内容
            tool_contentCreatationFn: undefined, //工具项显示内容创建方法
            tool_contentOnLoadedFn: undefined,//工具项显示内容重载方法
            tool_contentPoolType: 'show', //判断是否执行pool相关方法的标准  show||hide
            tool_contentPoolId: 'myFavoritePool',//工具项显示内容池ID 
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
                    '<p class="stool_tips_no_list">您还没有收藏哦<br>快去看看有没有感兴趣的产品吧</p>',
                    '</div>'
                ].join('\n');

                var poolLogout = [
                    '<div class="stool_retry">',
                    '<div class="stool_item_list">',
                    '<p class="stool_tips_no_list">登录失效啦</p></div>',
                        '<div class="stool_btn"><a href="https://accounts.' + hostName + '/member/login.aspx?BackUrl=' + document.URL + '&responsemethod=get#ctm_ref=sbr_hp_nav_login_txt_23">重新登录</a>',
                    '</div></div>'
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
                        bizId: "MyFavoriteHandler",
                        sucFn: function (responseObj) {
                            loadFn(responseObj);
                        },
                        failFn: function (contractObj) {
                            if (contractObj.status == "error" ) {
                                reloadFn();
                            }
                            else if(contractObj.status == "unlogged"){

                                tool.tool_contentPool = poolLogout;

                            }
                        }
                    };

                    communication.jsonpScript("http://my." + hostName + "/Sidebar-online/Handlers/MyFavoriteHandler.ashx?callback=COSB.jsonp.callback&BizTypes=HOTEL&PageIndex=1&ReturnCount=30", bizCallback);

                };

                var loadFn = function (responseObj) {

                    try {

                        if (responseObj.FavoriteList == undefined) {

                            reloadFn();
                        }
                        else if (responseObj.FavoriteList.length == 0) {
                            tool.tool_contentPool = poolEmpty;
                        }
                        else {
                            var favoriteList = responseObj.FavoriteList;
                            var poolBody = '<div class="stool_item_list"><ul>';
                            for (var i = 0; i < favoriteList.length && i <= 19; i++) {

                                var liItem = [
                                    '<li>',
                                    '<a href="{0}#ctm_ref=sbr_hp_nav_collection_txt_26" target="_blank" class="borwsing_link">',
                                    '<span class="b_thumb"><img src="{1}" alt=""></span>',
                                    '<span class="b_name_single"><span title="{2}">{3}</span></span>',
                                    '<span class="{4}" title="{5}"></span>',//star0
                                    '<span class="b_price"><span class="c_price">{6}</span> 起</span>',
                                    '<span class="b_tag">{7}</span>',
                                    '</a>',
                                    '</li>'
                                ].join('\n');

                                var liItemFormatted = liItem.format(favoriteList[i].Url, favoriteList[i].PicUrl, favoriteList[i].ProductName, favoriteList[i].ProductName,
                                    favoriteList[i].Star, favoriteList[i].ProductName, favoriteList[i].Price, favoriteList[i].BizType);
                                poolBody += liItemFormatted;
                            }

                            //if (favoriteList.length >= 20) {

                            var viewAll = [
                                    '<div class="stool_btn"><a href="http://my.' + hostName + '/FavoriteOnline/hotel/hotellist.aspx" target="_blank">查看全部收藏</a></div>'
                            ].join('\n');

                            poolBody += viewAll;
                            //}

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
            tool_backId: 'myFavoriteBack'



        };

        return tool;
    };
});