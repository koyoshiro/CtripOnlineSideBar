define(function () {

    //TODO 暂写 可能不会用到


    var loadStyle = function (styleUrl) {
        var style = document.createElement('link');
        style.href = styleUrl;
        style.rel = 'stylesheet';
        style.type = 'text/css';
        document.getElementsByTagName('HEAD').item(0).appendChild(style);
    };


    var loadJS = function (scriptUrl,async) {
        var scriptTag = document.createElement('script');
        scriptTag.type = 'text/javascript';
        scriptTag.src = scriptUrl;
        scriptTag.async = async;
        //scriptTag.setAttribute("data-main", "SideBarSrc/main");;
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(scriptTag);
    };

});