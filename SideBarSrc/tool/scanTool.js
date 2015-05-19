define(["webConsole", "jsHelper"], function (webConsole, jsHelper) {

    return function () {

        var tool = {
            tool_id: 'sb0001', //工具项ID
            tool_name: 'scanTool',//工具项名称
            tool_display: 'on',//工具项是否显示  on[开]/off[关]
            tool_type: 'basic', //工具项类型 basic[基础功能]/func[自有功能]/bu[事业部]/other[其它]
            tool_sequence: 1, //工具条项目显示次序

            tool_iconType: 'server', //工具条项图标接入方式 server[读取]/local[本地]
            tool_iconTagId: 'scanTag', //图标ID  
            tool_iconBodyId: 'scanTip', //标签ID
            tool_iconBody: undefined, //标签内容
            tool_iconCreatationFn: function () {
                 
                var tipDom = [
                            '<div class="stool_qr_code">',
						    '<a id="scanTag" href="javascript:void(0)" class="stool_icon stool_qr">APP二维码</a>',
			                '<div id="scanTip" class="stool_qrcode_pop" style="display:none;">',
				            '<img src="http://images3.c-ctrip.com/rk/201406/D9013-01.png" alt="">',
				            '<div><a href="http://app.ctrip.com#ctm_ref=sbr_hp_nav_app_txt_24" target="_blank">携程旅行手机版 &gt;</a></div>',
				            '<a href="javascript:void(0)" class="stool_icon stool_qr_close" id="hoverClose_' + tool.tool_name + '">关闭</a>', //hoverClose
			                '</div>',
		                    '</div>'
                ].join('\n');

                tool.tool_iconBody = tipDom;
            },
            tool_iconOnLoadedFn: function () {

                if (document.getElementById("hoverClose_" + tool.tool_name) != undefined) {

                    document.getElementById("hoverClose_" + tool.tool_name).onclick = function () {

                        document.getElementById(tool.tool_iconBodyId).style.display = "none";
                    };
                }

                document.getElementById("scanTip").onmouseover = function () {

                    document.getElementById("scanTip").style.display = "block";

                };

                document.getElementById("scanTip").onmouseout = function () {

                    document.getElementById("scanTip").style.display = "none";

                };
            },


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