define([ 'webConsole', 'jsHelper'], function (webConsole, jsHelper) {

    function contract(status, responseObj) {
        this.status = status; //error||unlogged
        this.responseObj = responseObj;
    };
    contract.prototype = {
        constructor: contract
    };

    if (window.COSB && window.COSB.jsonp) {
        window.COSB.jsonp.callback = function (responseObj) {
            try {
                if (responseObj && responseObj.Result && responseObj.Result.ResultCode != undefined) { //契约调用

                    var bizCallBackObj;
                    if (window.COSB.jsonp.bizCallback) {
                        var bizCBObj = jsHelper.foreach(window.COSB.jsonp.bizCallback, "bizId", responseObj.Result.ResultKind);
                        if (bizCBObj && bizCBObj.failFn && bizCBObj.sucFn) {
                            bizCallBackObj = bizCBObj;
                        }
                        else {
                            webConsole.log("bizCBObj is undefined", "jsonpCallback");
                            return;
                        }
                    }

                    if (responseObj.Result.ResultCode == -88 || responseObj.Result.ResultCode == -77) {

                        //登录超时
                        var lostPassport = new contract("unlogged", "");

                        bizCallBackObj.failFn(lostPassport);
                        window.COSB.jsonp.bizCallback.remove(bizCallBackObj);

                        webConsole.log("logging timeout", "jsonpCallback");
                    }
                    else if (responseObj.Result.ResultCode == -1 || responseObj.Result.ResultCode == -66 || responseObj.Result.ResultCode == -99) {
                        //service error
                        var serviceError = new contract("error", "");

                        bizCallBackObj.failFn(serviceError);
                        window.COSB.jsonp.bizCallback.remove(bizCallBackObj);


                        webConsole.log("service is error", "jsonpCallback");

                    }
                    else if (responseObj.Result.ResultCode == 0) {

                        bizCallBackObj.sucFn(responseObj);
                        window.COSB.jsonp.bizCallback.remove(bizCallBackObj);


                    } else {
                        //unknown code
                        var serviceError = new contract("error", "");

                        bizCallBackObj.failFn(serviceError);
                        window.COSB.jsonp.bizCallback.remove(bizCallBackObj);


                        webConsole.error("unknown resultCode", "jsonpCallback");
                    }
                }
                else { //非契约调用

                    if (window.COSB.jsonp.bizCallback) {

                        var getCookieObj = jsHelper.foreach(window.COSB.jsonp.bizCallback, "bizId", "AjaxGetcookie");
                        if (getCookieObj && getCookieObj.sucFn) {
                            getCookieObj.sucFn(responseObj);
                            window.COSB.jsonp.bizCallback.remove(getCookieObj);

                        }
                        else {
                            var getHistoryObj = jsHelper.foreach(window.COSB.jsonp.bizCallback, "bizId", "AjaxGetBrowserHistory");
                            if (getHistoryObj && getHistoryObj.sucFn) {
                                getHistoryObj.sucFn(responseObj);
                                window.COSB.jsonp.bizCallback.remove(getHistoryObj);
                            }

                            else {
                                webConsole.log("bizCBObj is undefined", "jsonpCallback");
                                return;
                            }

                        }
                    }
                }
            }
            catch (ex) {
                webConsole.error(ex.message, "jsonpCallback");
            }
        };
    }

    var jsonpScriptFn = function (url, bizCallback) {
        try {

            var jsonpScript = document.createElement('script');
            jsonpScript.src = url;
            document.body.appendChild(jsonpScript);

            if (window.COSB.jsonp && window.COSB.jsonp.bizCallback == undefined) {
                window.COSB.jsonp.bizCallback = new Array();
                window.COSB.jsonp.bizCallback.push(bizCallback);
            }
            else if (window.COSB.jsonp && window.COSB.jsonp.bizCallback != undefined) {
                //if (!window.COSB.jsonp.bizCallback.contains(bizCallback))
                window.COSB.jsonp.bizCallback.push(bizCallback);
            }
            else {
                webConsole.error("window.COSB.jsonp is undefined", "jsonpScriptFn");
            }
        }
        catch (ex) {
            webConsole.error(ex.message, "jsonpScriptFn");
        }
    };

    return {
        jsonpScript: jsonpScriptFn

    }


});


//communication.jsonpScript("./Handlers/OrderGroupCountsHandler.ashx?callback=COSB.jsonp.callback", function (a) {
//    console.log(a + 456);
//});