define(["webConsole"], function (webConsole) {

    return function () {
        var hostName = window.COSB.hostName;
        var tool = {

            tool_id: 'sb0003', //工具项ID
            tool_name: 'loggingTool',//工具项名称
            tool_display: 'on',//工具项是否显示  on[开]/off[关]
            tool_type: 'basic', //工具项类型 basic[基础功能]/func[自有功能]/bu[事业部]/other[其它]
            tool_sequence: 3, //工具条项目显示次序

            tool_iconType: 'local', //工具条项图标接入方式 server[读取]/local[本地]
            tool_iconTagId: 'loggingTag', //图标ID  
            tool_iconBodyId: 'loggingTip', //标签ID
            tool_iconBody: [
                    '<div class="stool_login" >',
                    '<i class="line line_s"></i>',
                    '<a id="loggingTag"  href="https://accounts.' + hostName + '/member/login.aspx?BackUrl=' + document.URL + '&responsemethod=get#ctm_ref=sbr_hp_nav_login_txt_23"  class="stool_icon stool_non-login">未登录</a>',
                    '<i class="line"></i>',
			        '<p id="loggingTip" class="stool_hover_title"  style="display:none;">我的携程</p>',
		            '</div>'
            ].join('\n'), //标签内容
            tool_iconCreatationFn: undefined,
            tool_iconOnLoadedFn: undefined,


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