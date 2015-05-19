define(["webConsole"], function (webConsole) {

    return function () {

        var tool = {
            tool_id: 'sb0006', //工具项ID
            tool_name: 'myImplementTool',//工具项名称
            tool_display: 'on',//工具项是否显示  on[开]/off[关]
            tool_type: 'func', //工具项类型 basic[基础功能]/func[自有功能]/bu[事业部]/other[其它]
            tool_sequence: 5, //工具条项目显示次序

            tool_iconType: 'local', //工具条项图标接入方式 server[读取]/local[本地]
            tool_iconTagId: 'myImplementTag', //图标ID  
            tool_iconBodyId: 'myImplementTip', //标签ID
            tool_iconBody: '<a id="myImplementTag" href="javascript:void(0)" class="stool_icon stool_tools ">工具箱</a><p id="myImplementTip" class="stool_hover_title stool_hover_tool" style="display:none;">工具箱</p>', //标签内容
            tool_iconCreatationFn: undefined,
            tool_iconOnLoadedFn: undefined,
           
            
            tool_contentType: 'open',  //工具项显示内容类型
            tool_contentId: 'myImplementContent',  //工具项显示内容ID
            tool_content:[
                                '<div id="myImplementContent" name="content" class="stool_cont_wrap stool_tool_list" style="display:none;width:0px;">',
                                '<div class="stool_cont_hd">',
                                '<h3>工具箱</h3>',
                                '<a id="myImplementBack" href="javascript:void(0)" class="stool_icon stool_back">&gt;&gt;</a>',
                                '</div>',
                                '<div class="stool_cont_m" id="myImplementPool" >',
                                '</div></div></div>'
            ].join('\n'), //工具项显示内容
            tool_contentCreatationFn: undefined, //工具项显示内容创建方法
            tool_contentOnLoadedFn: undefined,//工具项显示内容重载方法
            tool_contentPoolType: 'show', //判断是否执行pool相关方法的标准  show||hide
            tool_contentPoolId: 'myImplementPool',//工具项显示内容池ID 
            tool_contentPool: undefined,//工具项显示内容池            
            tool_contentPoolCreatationFn: function () {

                var poolError = [
                                '<div class="stool_retry">',
                               '<div class="stool_item_list">',
                               '<p class="stool_tips_no_list">加载失败了，请再试试吧</p></div>',
                               '<div class="stool_btn"><a id="refresh" href="javascript:void(0)">重试</a>',
                               '</div></div>'
                ].join('\n');

              

                var implementLink = [{
                    key: "train", url: "http://trains.ctrip.com/TrainSchedule#ctm_ref=sbr_hp_nav_tra_txt_11", title: "火车查询"
                }, {
                    key: "lowfly", url: "http://flights.ctrip.com/domestic/MyToolBox/Option.aspx#ctm_ref=sbr_hp_nav_flg_txt_12", title: "低价机票早知道"
                }, {
                    key: "flytime", url: "http://flights.ctrip.com/schedule#ctm_ref=sbr_hp_nav_sche_txt_13", title: "航班时刻"
                }, {
                    key: "credit", url: "http://pages.ctrip.com/commerce/promote/AllianceCard/200706/xyk/lyxykindex.htm#ctm_ref=sbr_hp_nav_credit_txt_14", title: "申请携程信用卡"
                }, {
                    key: "weather", url: "http://you.ctrip.com/weather#ctm_ref=sbr_hp_nav_weather_txt_15", title: "旅行天气"
                }, {
                    key: "car", url: "http://car.ctrip.com#ctm_ref=sbr_hp_nav_car_txt_16", title: "用车服务"
                }, {
                    key: "cartime", url: "http://bus.ctrip.com/schedule-sitemap.html#ctm_ref=sbr_hp_nav_bus_txt_17", title: "汽车时刻表"
                }, {
                    key: "hotel_join", url: "http://hotels.ctrip.com/jiameng#ctm_ref=sbr_hp_nav_hotjm_txt_18", title: "酒店加盟"
                }, {
                    key: "city", url: "http://piao.ctrip.com/citylist.html#ctm_ref=sbr_hp_nav_citylist_txt_19", title: "城市景点大全"
                }, {
                    key: "wifi", url: "http://huodong.ctrip.com/Activity-Booking-ShoppingWebSite/Marketing/WiFiMarketing.aspx#ctm_ref=sbr_hp_nav_wifi_txt_20", title: "出境上网服务"
                }
                ];
               
                var loadFn = function () {

                    var refreshFn = function () {
                        tool.tool_contentPool = poolError;

                        tool.tool_contentPoolOnLoadedFn = function () {
                            document.getElementById("refresh").onclick = function () {
                                loadFn();
                            };
                        };
                    };

                    try {

                        if (implementLink == undefined) {
                            refreshFn();
                        }
                        else {
                            var poolBody = '<div class="stool_item_list"><ul>';
                            for (var i = 0; i < implementLink.length; i++) {
                                var liItem = '<li id="{0}" class="stool_t_{1}"><a href="{2}" target="_blank"><i class="stool_icon_type"></i>{3}</a></li>';
                                var liItemFormatted = liItem.format(implementLink[i].key, implementLink[i].key, implementLink[i].url, implementLink[i].title);
                                poolBody += liItemFormatted;
                            }
                            poolBody += '</ul></div>';
                            tool.tool_contentPool = poolBody;
                        }
                    }
                    catch (ex) {
                        webConsole.error(ex, "tool_poolBodyCreatFn");
                        refreshFn();
                    }
                };
                loadFn();
            },
            tool_contentPoolOnLoadedFn: undefined,//工具项显示内容池重载方法
            tool_backId: 'myImplementBack'

        };




        return tool;

    };
});