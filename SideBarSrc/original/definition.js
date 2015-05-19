define(["verification"], function (verification) {

    /**
     * 基础母体定义
     */
    var basicMatrixDefinition = {
        sideBar_WholeMatrixId: 'WholeMatrix', //侧边栏母体Id
        sideBar_ToolBarMatrixId: 'ToolBarMatrix',//工具栏母体Id
        sideBar_MyCtripMatrixId: 'MyCtripMatrix', //工具栏我携分组母体Id
        sideBar_FuncGroupMatrixId: 'FuncGroupMatrix', //工具栏功能分组母体Id
        sideBar_OtherGroupMatrixId: 'OtherGroupMatrix' //工具栏其他分组母体Id
    };

    /**
     * 总控定义
     */
    var mainSwitchDefinition = { _displaySideBar: undefined, _switchTools: [], _loggedShowContent: [], _backUrl: undefined };
    Object.defineProperty(mainSwitchDefinition, "ms_displaySideBar", {
        get: function () {
            return this._displaySideBar; //侧边栏开关 
        },
        set: function (newObj) {
            if (typeof (newObj) == "object" && verification.verificateToken(newObj.token) && typeof (newObj.setVal) == "string")
                this._displaySideBar = newObj.setVal;
        }
    });

    Object.defineProperty(mainSwitchDefinition, "ms_switchTools", {
        get: function () {
            return this._switchTools; //工具项开关 
        },
        set: function (newObj) {
            if (typeof (newObj) == "object" && verification.verificateToken(newObj.token) && typeof (newObj.setVal) == "object")
                this._switchTools = newObj.setVal;
        }
    });

    Object.defineProperty(mainSwitchDefinition, "ms_loggedShowContent", {
        get: function () {
            return this._loggedShowContent; //登陆后才可展开的工具项（未登录跳转登陆页面）
        },
        set: function (newObj) {
            if (typeof (newObj) == "object" && verification.verificateToken(newObj.token) && typeof (newObj.setVal) == "object")
                this._loggedShowContent = newObj.setVal;
        }
    });

    Object.defineProperty(mainSwitchDefinition, "ms_backUrl", {
        get: function () {
            return this._backUrl; //回退URL
        },
        set: function (newObj) {
            if (typeof (newObj) == "object" && verification.verificateToken(newObj.token) && typeof (newObj.setVal) == "string")
                this._backUrl = newObj.setVal;
        }
    });




    /**
     * 工具栏定义
     */
    var toolDefinition = {
        tool_id: '', //工具项ID  格式：sb0001-sb9999
        tool_name: '', //工具项名称
        tool_display: '',//工具项是否显示  on[开]/off[关]
        tool_type: '', //工具项类型 my[我携]/bu[事业部]/other[其它]
        tool_iconWay: 'local', //工具条项图标接入方式 server[读取]/local[本地]
        tool_sequence: 99, //工具条项目显示次序 按数字（0-99）大小，由上到下加载。
        tool_contentType: '',  //工具项显示内容类型  null[无内容]/html[网页样式]/url[外链样式]
        tool_hoverTag: '', //浮层标签
        tool_hoverBody: '', //浮层内容
        tool_contentBody: '' //工具项内容
    };



    return {
        basicMatrixDefinition: basicMatrixDefinition,
        mainSwitchDefinition: mainSwitchDefinition,
        toolDefinition: toolDefinition
    };

});