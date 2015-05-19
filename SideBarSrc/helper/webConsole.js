define(["customConsole"], function (customConsole) {

    /**
     * 页面输出公共方法
     * @method 
     * @for webConsole
     * @param {String} type console类型
     *        {String} consoleStr 输出内容
     *        {String} consoleLocationStr 输出源
     * @return
     */
    var consoleFn = function (type, consoleStr, consoleLocationStr) {

        var loadConsoleObj = function (typ, str, locationStr) {

            var consoleObj = {
                consoleType: "",
                consoleStr: "",
                consoleLocationStr: ""
            };
            consoleObj.consoleType = "[webConsole--" + type + "]" || "[unKnown Type]";
            consoleObj.consoleStr = str || "";
            consoleObj.consoleLocationStr = locationStr || "";

            return consoleObj;
        }

        var consoleShow = "";
        if (typeof (type) != "string" && typeof (consoleStr) != "string") {

            type = "error";
            consoleShow = loadConsoleObj(type, "consoleFn's params need correct defining!", "consoleFn");
        }
        else {
            if (consoleStr != undefined && !consoleStr.isNull()) {
                consoleShow = loadConsoleObj(type, consoleStr, consoleLocationStr);
            }
            else {
                type = "warn";
                consoleShow = loadConsoleObj(type, "unKnown Error:" + "{type:" + type + "}" + "{consoleStr:" + consoleStr + "}" + "{consoleLocationStr:" + consoleLocationStr + "}", "consoleFn");
            }
        }
        //生产环境不写日志
        if (window.COSB.hostName == "ctrip.com")
            return;
        console.log(consoleShow);
    };

    /**
     * 页面错误输出
     * @method error
     * @for webConsole
     * @param {String} exStr 错误内容
     *        {String} locationExStr 错误源（建议）
     * @return
     */
    var errorFn = function (exStr, locationExStr) {

        if (consoleFn && typeof (consoleFn) == "function") {

            consoleFn("error", exStr, locationExStr);
        }
    };

    /**
     * 页面警告输出
     * @method warn
     * @for webConsole
     * @param {String} warnStr 警告内容
     *        {String} locationWarnStr 警告源（建议）
     * @return
     */
    var warnFn = function (warnStr, locationWarnStr) {

        if (consoleFn && typeof (consoleFn) == "function") {

            consoleFn("warn", warnStr, locationWarnStr);
        }
    }

    /**
    * 页面日志输出
    * @method log
    * @for webConsole
    * @param {String} logStr 日志内容
    *        {String} locationLogStr 日志源（可选）
    * @return
    */
    var logFn = function (logStr, locationLogStr) {

        if (consoleFn && typeof (consoleFn) == "function") {

            consoleFn("log", logStr, locationLogStr);
        }
    };

    return {
        error: errorFn,
        warn: warnFn,
        log: logFn
    }
});