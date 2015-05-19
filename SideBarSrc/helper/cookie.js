define(['webConsole'], function (webConsole) {

    //读取cookies 
    var getCookie = function (name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

        if (arr = document.cookie.match(reg))

            return unescape(arr[2]);
        else
            return null;
    };

    var delCookie = function (name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    };

    var logInFn = function () {
        try {
            var logged = false;
            var ticket = getCookie("ticket_ctrip");
            if (ticket != undefined)
                logged = true;

            window.COSB.logged = logged;
        }
        catch (ex) {
            webConsole.error(ex.message, "loggedFn");
        }
    };

    var logOutFn = function () {

        try {
            delCookie("ticket_ctrip");

            var logged = logInFn();

            window.COSB.logged = logged;
        }
        catch (ex) {
            webConsole.error(ex.message, "logOutFn");
        }
    };

    return {       
        logIn: logInFn,
        logOut: logOutFn
    };
});

