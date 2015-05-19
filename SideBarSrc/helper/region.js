/**
 * Created by jl.gu on 2015/5/8.
 */
define([], function () {

    return function () {

        if (!window.COSB) {
            //定义并公开域
            window.COSB = {
                sideBar: undefined,
                jsonp: new Object(),
                sideBarStatus: undefined, //loadSuc||loadFail
                hostName: undefined,
                logged: undefined,
                type: "long",
                installedTools: []
            };
        }

        window.g_adsconfig = "";

    }();
});