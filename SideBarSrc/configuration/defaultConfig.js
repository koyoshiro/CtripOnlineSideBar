define(function () {

    var mainToken = "openTheDoor";

    var mainSwitch = {
        ms_displaySideBar: "on",    //侧边栏开关
        ms_switchTools: ["sb0000", "sb0001", "sb0002", "sb0003", "sb0004", "sb0005", "sb0006", "sb0007", "sb0008", "sb0009"], //侧边栏加载工具项
        ms_loggedShowContent: ["sb0002", "sb0005"] //登陆后才可展开的工具项（未登录跳转登陆页面）
       
    };

    return {
        mainToken: mainToken,
        mainSwitch: mainSwitch
    }

});