define(["webConsole", "jsHelper"], function (webConsole, jsHelper) {

    return function () {

        var tool = {

            tool_id: 'sb0007', //工具项ID
            tool_name: 'returnTopTool',//工具项名称
            tool_display: 'on',//工具项是否显示  on[开]/off[关]
            tool_type: 'other', //工具项类型 basic[基础功能]/func[自有功能]/bu[事业部]/other[其它]
            tool_sequence: 7, //工具条项目显示次序

            tool_iconType: 'local', //工具条项图标接入方式 server[读取]/local[本地]
            tool_iconTagId: 'returnTopTag', //图标ID  
            tool_iconBodyId: 'returnTopTip', //标签ID
            tool_iconBody: '<a id="returnTopTag" href="javascript:void(0)"  class="stool_icon stool_top" style="display:none;">返回顶部</a><p id="returnTopTip" class="stool_hover_title stool_hover_top" style="display:none;">返回顶部</p>', //标签内容
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