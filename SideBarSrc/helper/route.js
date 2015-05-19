define(['webConsole'], function (webConsole) {

    var switchHost = function () {
        this.host = "ctrip.com";
        if (document.domain.contains("fat49") || document.domain.contains("fat35")) {
            this.host = "fat49.qa.nt.ctripcorp.com";
        }
        else if (document.domain.contains("uat")) {
            this.host = "uat.qa.nt.ctripcorp.com";
        }

    };

    switchHost.prototype.getHost = function () {
        return this.host;
    };

    var instance = new switchHost();

    return instance.getHost();
});