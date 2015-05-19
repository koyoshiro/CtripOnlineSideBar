define(function () {

    //收起状态
    var barStopHtml = [
       '<div class="pub_side_tool" id="tool">',
       '<div class="stool_ctrl">',
       '<div class="stool_other" style="width: 36px;">',
       '<a href="javascript:void(0)" class="stool_icon stool_top" style="display:;" id="top">返回顶部</a>',
       '<p class="stool_hover_title stool_hover_top">返回顶部</p>',
       '</div>',
       '<div class="stool_scale"><a href="javascript:void(0)" class="stool_icon stool_min">缩小</a></div>',
       '<div class="stool_scale" style="display:none;"><a href="javascript:void(0)" class="stool_icon stool_max">展开</a></div>',
       '</div></div>', ].join('\n');


    var testHtml = '<div id="myCtripContent" class="stool_cont_wrap stool_myctrip" style="display:block;width:0px;"><div class=stool_cont_hd><h3>我的携程</h3><a href="javascript:void(0)" class="stool_icon stool_back" id="back">&gt;&gt;</a></div><div class=stool_cont_m><div class=stool_member_info><a href="javascript:void(0)" class=stool_gravatar_b><img src=http://pic.c-ctrip.com/common/side_tool_bar/zzz_gravatar.jpg></a><a href="javascript:void(0)" class=stool_member_name>红小胖黄小胖灰小胖</a><em class=stool_member_level>钻石贵宾</em><a href="javascript:void(0)" class=stool_mail_num><i class=stool_icon></i>19</a></div><div class=stool_member_money><ul><li><span>现金</span><a href="javascript:void(0)">¥ 50000</a><li><span>礼品卡</span><a href="javascript:void(0)">¥ 1500</a><li><span>返现</span><a href="javascript:void(0)">¥ 80</a></ul></div><div class=stool_member_order><ul><li class=stool_order_all><i class=stool_icon></i><a href="javascript:void(0)">全部订单<em>(158)</em></a><li class=stool_order_wait><i class=stool_icon></i><a href="javascript:void(0)">待付款订单<em>(28)</em></a><li class=stool_order_will><i class=stool_icon></i><a href="javascript:void(0)">未出行订单<em>(6)</em></a><li class=stool_order_comment><i class=stool_icon></i><a href="javascript:void(0)">待评价订单<em>(2)</em></a></ul></div><div class=stool_btn><a href="javascript:void(0)">退出登录</a></div></div></div>';


    return {
        barStopHtml: barStopHtml,
        testHtml: testHtml
    }

});
