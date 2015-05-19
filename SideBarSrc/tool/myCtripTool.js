define(["store", "webConsole", "communication", "jsHelper", "cookie"], function (store, webConsole, communication, jsHelper, cookie) {

    return function () {
        var hostName = window.COSB.hostName;
        //Ctrip
        var tool = {
            tool_id: 'sb0002', //工具项ID      
            tool_name: 'myCtripTool',//工具项名称
            tool_display: 'on',//工具项是否显示  on[开]/off[关]
            tool_type: 'basic', //工具项类型 basic[基础功能]/func[自有功能]/bu[事业部]/other[其它]
            tool_sequence: 2, //工具条项目显示次序

            tool_iconType: 'server', //工具条项图标接入方式 server[读取]/local[本地]
            tool_iconTagId: 'myCtripTag', //图标ID  
            tool_iconBodyId: 'myCtripTip', //标签ID
            tool_iconBody: undefined, //标签内容
            tool_iconCreatationFn: function () {

                var loadIcon = function (userUrl) {
                    var tag = [
                        '<div class="stool_login ">',
                        '<i class="line line_s"></i>',
                        '<a id="myCtripTag" href="javascript:void(0)" class="stool_gravatar">',
                        '<img src="{0}" alt="">',
                        '<b></b></a>',
                        '<i class="line"></i>',
                        '<p id="myCtripTip" class="stool_hover_title" style="display:none;">我的携程</p>',
                        '</div>'
                    ].join('\n');

                    tool.tool_iconBody = tag.format(userUrl);
                };

                var bizCallback = {

                    bizId: "SummaryInfoHandler",
                    sucFn: function (responseObj) {

                        loadIcon(responseObj.AvatarNameEntities[0].URL);
                    },
                    failFn: function (contractObj) {
                        webConsole.warn("userImg is null or empty", "myCtripTool");
                        //默认头像加载
                        var backingImg = "http://pic.c-ctrip.com/common/side_tool_bar/gravatar_default.png";
                        loadIcon(backingImg);
                    }
                };

                communication.jsonpScript("http://my." + hostName + "/Sidebar-online/Handlers/SummaryInfoHandler.ashx?callback=COSB.jsonp.callback&InfoType=", bizCallback);
            }, //标签内容创建方法
            tool_iconOnLoadedFn: undefined, //标签内容重载方法

            tool_contentType: 'open',  //工具项显示内容类型
            tool_contentId: 'myCtripContent',  //工具项显示内容ID
            tool_content: [
                '<div id="myCtripContent" name="content" class="stool_cont_wrap stool_myctrip" style="display:none;width:0px;">',
                '<div class="stool_cont_hd">',
                '<h3>我的携程</h3>',
                '<a id="myCtripBack" href="javascript:void(0)" class="stool_icon stool_back">&gt;&gt;</a>',
                '</div>',
                '<div class="stool_cont_m" id="myCtripPool">',
                '</div></div></div>'
            ].join('\n'), //工具项显示内容
            tool_contentCreatationFn: undefined, //工具项显示内容创建方法
            tool_contentOnLoadedFn: undefined,//工具项显示内容重载方法
            tool_contentPoolType: 'show', //判断是否执行pool相关方法的标准  show||hide
            tool_contentPoolId: 'myCtripPool',//工具项显示内容池ID 
            tool_contentPool: undefined,//工具项显示内容池
            tool_contentPoolCreatationFn: function () {
                var poolError = [
                    '<div class="stool_retry">',
                    '<div class="stool_item_list">',
                    '<p class="stool_tips_no_list">加载失败了，请再试试吧</p></div>',
                    '<div class="stool_btn"><a id="refresh" href="javascript:void(0)">重试</a>',
                    '</div></div>'
                ].join('\n');

                var poolLogout = [
                    '<div class="stool_retry">',
                    '<div class="stool_item_list">',
                    '<p class="stool_tips_no_list">登录失效啦</p></div>',
                        '<div class="stool_btn"><a href="https://accounts.' + hostName + '/member/login.aspx?BackUrl=' + document.URL + '&responsemethod=get#ctm_ref=sbr_hp_nav_login_txt_23">重新登录</a>',
                    '</div></div>'
                ].join('\n');

                var userInfo, unReadMsg, orderCount, requestStatus = 0;

                var requestOrderCounts = function () {

                    var bizCallback = {
                        bizId: "OrderGroupCountsHandler",
                        sucFn: function (responseObj) {
                            orderCount = responseObj.OrderStatisticsGroupList;
                        },
                        failFn: function (contractObj) {
                            if (contractObj.status == "error") {
                                requestStatus = -1;
                            }
                            else if (contractObj.status == "unlogged") {
                                requestStatus = -2;
                            }
                        }
                    };

                    communication.jsonpScript("http://my." + hostName + "/Sidebar-online/Handlers/OrderGroupCountsHandler.ashx?callback=COSB.jsonp.callback&OrderCountGroups=All,NotTravel,AwaitReview,AwaitPay", bizCallback);
                };

                var requestUnreadMsg = function () {

                    var bizCallback = {
                        bizId: "AjaxGetcookie",
                        sucFn: function (responseObj) {
                            unReadMsg = responseObj;
                        },
                        failFn: function () {
                            unReadMsg = 0;
                        }
                    };

                    communication.jsonpScript("https://accounts." + hostName + "/member/ajax/AjaxGetcookie.ashx?jsonp=COSB.jsonp.callback", bizCallback);
                };

                var requestUserInfo = function () {

                    var bizCallback = {
                        bizId: "SummaryInfoHandler",
                        sucFn: function (responseObj) {
                            userInfo = responseObj;
                        },
                        failFn: function (contractObj) {
                            if (contractObj.status == "error") {

                                requestStatus = -1;
                            }
                            else if (contractObj.status == "unlogged") {

                                requestStatus = -2;
                            }
                        }
                    };

                    communication.jsonpScript("http://my." + hostName + "/Sidebar-online/Handlers/SummaryInfoHandler.ashx?InfoType=All&callback=COSB.jsonp.callback", bizCallback);
                };

                var installMemberBlock = function () {

                    var memberInfo = userInfo.UserMainInfo;
                    var touxiangInfo = userInfo.AvatarNameEntities[0];

                    var memberInfoBlock = [
                        '<div class="stool_member_info">',
                            '<a href="http://my.' + hostName + '/home/myinfo.aspx#ctm_ref=sbr_hp_nav_head_txt_1" target="_blank" class="stool_gravatar_b">',
                        '<img src="{0}" alt=""></a>',
                            '<a href="http://my.' + hostName + '/home/myinfo.aspx#ctm_ref=sbr_hp_nav_name_txt_2" target="_blank" class="stool_member_name">{1}</a> ',
                        '<em class="stool_member_level">{2}</em>',
                            '<a href="http://my.' + hostName + '/home/message/messagelist.aspx?status=F#ctm_ref=sbr_hp_nav_name_txt_2" target="_blank" class="stool_mail_num"><i class="stool_icon"></i>{3}</a>',
                        '</div>'
                    ].join('\n');

                    if (unReadMsg.noreadmessagecount == "0") {
                        unReadMsg.noreadmessagecount = "0"
                    }

                    return memberInfoBlock.format(touxiangInfo.URL, memberInfo.UserName, unReadMsg.vipgradename, " (" + unReadMsg.noreadmessagecount + ")");
                };

                var installMoneyBlock = function () {

                    var cash = jsHelper.foreach(userInfo.MemberAssetSummaries, "AssetType", "MerchantBalance").Balance;
                    var gift = jsHelper.foreach(userInfo.MemberAssetSummaries, "AssetType", "Gift").Balance;
                    var cashAccount = jsHelper.foreach(userInfo.MemberAssetSummaries, "AssetType", "Cash").Balance;
                    var moneyInfoBlock = [
                        '<div class="stool_member_money">',
                        '<ul>',
                            '<li><span>现金</span><a href="https://secure.' + hostName + '/Payment-Base-PaymentPwd/Wallet/View/MyWalletIndex.aspx#ctm_ref=sbr_hp_nav_cash_txt_4" target="_blank">{0}</a></li>',
                            '<li><span>礼品卡</span><a href="https://secure.' + hostName + '/Balance-GiftCard/zh-cn/TravelTicket.aspx#ctm_ref=sbr_hp_nav_card_txt_5" target="_blank">{1}</a></li>',
                            '<li><span>返现</span><a href="https://sinfo.' + hostName + '/Balance/zh-cn/CashAccount.aspx#ctm_ref=sbr_hp_nav_rebate_txt_6" target="_blank">{2}</a></li>',
                        '</ul>',
                        '</div>'
                    ].join('\n');

                    if (cash != 0) {
                        cash = cash / 100;
                    }

                    if (cash > 100000) {
                        cash = ">¥10万";
                    }
                    else if (cash == 100000) {
                        cash = "¥10万";
                    }
                    else if (cash.toString().split('.').length >= 1) {
                        var dotCount = cash.toString().split('.');
                        if (dotCount[1] != undefined && dotCount[1] == 0) {
                            cash = dotCount[0];
                        }
                    }

                    if (gift > 100000) {
                        gift = ">¥10万";
                    }
                    else if (gift == 100000) {
                        gift = "¥10万";
                    }
                    else if (gift.toString().split('.').length >= 1) {
                        var dotCount = gift.toString().split('.');
                        if (dotCount[1] != undefined && dotCount[1] == 0) {
                            gift = dotCount[0];
                        }
                    }

                    if (cashAccount > 100000) {
                        cashAccount = ">¥10万";
                    }
                    else if (cashAccount == 100000) {
                        cashAccount = "¥10万";
                    }
                    else if (cashAccount.toString().split('.').length >= 1) {
                        var dotCount = cashAccount.toString().split('.');

                        cashAccount = dotCount[0];
                    }

                    var getCurrentNumber = function (money) {
                        var money = money.toString();
                        if (!money.contains(">") && !money.contains("¥")) {
                            money = "¥" + money;
                        }
                        return money;
                    };

                    return moneyInfoBlock.format(getCurrentNumber(cash), getCurrentNumber(gift), getCurrentNumber(cashAccount));

                };


                var installOrderBlock = function () {

                    var awaitPay = jsHelper.foreach(orderCount, "GroupName", "AwaitPay").Count;   //待支付
                    var awaitReview = jsHelper.foreach(orderCount, "GroupName", "AwaitReview").Count; // 待点评
                    var notTravel = jsHelper.foreach(orderCount, "GroupName", "NotTravel").Count; //未出行
                    var all = jsHelper.foreach(orderCount, "GroupName", "All").Count; // 全部订单

                    var orderInfoBlock = [
                        '<div class="stool_member_order">',
                        '<ul>',
                            '<li class="stool_order_all"><i class="stool_icon"></i> <a href="http://my.' + hostName + '/Home/Order/AllOrder.aspx#ctm_ref=sbr_hp_nav_all_txt_7" target="_blank">全部订单 <em>({0})</em></a></li>',
                            '<li class="stool_order_wait"><i class="stool_icon"></i> <a href="http://my.' + hostName + '/Home/Order/AllOrder.aspx?OrderStatusClassify=AwaitPay#ctm_ref=sbr_hp_nav_awpay_txt_8" target="_blank">待付款订单 <em>({1})</em></a></li>',
                            '<li class="stool_order_will"><i class="stool_icon"></i> <a href="http://my.' + hostName + '/Home/Order/AllOrder.aspx?OrderStatusClassify=NotTravel#ctm_ref=sbr_hp_nav_ntrav_txt_9" target="_blank">未出行订单 <em>({2})</em></a></li>',
                            '<li class="stool_order_comment"><i class="stool_icon"></i> <a href="http://my.' + hostName + '/Home/Order/AllOrder.aspx?OrderStatusClassify=AwaitReview#ctm_ref=sbr_hp_nav_awrev_txt_10" target="_blank">待评价订单 <em>({3})</em></a></li>',
                        '</ul>',
                        '</div>'
                    ].join('\n');

                    return orderInfoBlock.format(all, awaitPay, notTravel, awaitReview);
                };

                var reloadFn = function () {

                    tool.tool_contentPool = poolError;

                    tool.tool_contentPoolOnLoadedFn = function () {
                        document.getElementById("refresh").onclick = function () {
                            event.stopPropagation();

                            COSB.sideBar.reloadPool(tool);
                        };
                    };
                };

                var loadFn = function () {
                    try {

                        var poolBody = "";

                        poolBody += installMemberBlock();

                        poolBody += installMoneyBlock();

                        poolBody += installOrderBlock();


                        var logoutInfoBlock = [
                                '<div class="stool_btn"><a id="logout" href="https://accounts.' + hostName + '/member/logout.aspx?BackUrl=' + document.URL + '&responsemethod=get">退出登录</a></div>'
                        ].join('\n');

                        poolBody += logoutInfoBlock;

                        tool.tool_contentPool = poolBody;

                    }
                    catch (ex) {
                        webConsole.error(ex, "tool_poolBodyCreatFn");
                        reloadFn();

                    }
                };

                var callService = function () {

                    requestUserInfo();
                    requestOrderCounts();
                    requestUnreadMsg();

                    var waitCallback = setInterval(
                        function () {
                            if (userInfo != undefined && unReadMsg != undefined && orderCount != undefined && requestStatus == 0) {

                                clearInterval(abort);

                                clearInterval(waitCallback);

                                loadFn();
                            }
                            else if (requestStatus == -1) {
                                clearInterval(abort);

                                clearInterval(waitCallback);

                                reloadFn();

                                requestStatus = 0;
                            }
                            else if (requestStatus == -2) {

                                clearInterval(abort);

                                clearInterval(waitCallback);

                                tool.tool_contentPool = poolLogout;

                                requestStatus = 0;

                            }
                        }
                        , 3);

                    var abort = setInterval(function () {
                        clearInterval(waitCallback);
                        clearInterval(abort);

                        reloadFn();

                    }, 15000);
                };


                callService();


            }, //工具项显示内容池创建方法
            tool_contentPoolOnLoadedFn: undefined,//工具项显示内容池重载方法
            tool_backId: 'myCtripBack' //工具项显示内容关闭按钮ID
        };

        return tool;
    };
});