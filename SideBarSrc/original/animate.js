define(["webConsole"], function (webConsole) {

    /**
     * 收缩功能
     * @method
     * @for animate
     * @param {string} targetId    收缩DomId
     *        {number} targetWidth 收缩范围
     * @return
     */
    var elasticContentFn = function (targetId, targetWidth) {
        try {
            if (targetId != undefined && typeof (targetId) == "string" && targetId.isNull()) {
                webConsole.error("targetId is undefined", "elasticContent");
                return;
            }

            if (targetWidth != undefined && typeof (targetWidth) == "number" && targetWidth.isNull()) {
                webConsole.error("targetWidth is undefined", "elasticContent");
                return;
            }

            var toolBarDom = document.getElementById("ToolBarMatrix");

            if (toolBarDom.style.right == "")
                toolBarDom.style.right = "0px";

            var outer = document.getElementById(targetId) || "";


            var speed = 0;
            if (outer.offsetWidth < targetWidth) {
                speed = 5;
            } else {
                speed = -5;
            }

            document.getElementById(targetId).style.display = "block";

            var timer = setInterval(
                function () {
//                    outer.offsetWidth == targetWidth &&
                    if (Number(outer.style.width.slice(0, outer.style.width.length - 2)) == targetWidth) {
                        clearInterval(timer);
                        if (speed > 0)
                            document.getElementById(targetId).style.display = "block";
                        else
                            document.getElementById(targetId).style.display = "none";
                    } else {
//                        outer.style.width = outer.offsetWidth + speed + "px";
                        outer.style.width = Number(outer.style.width.slice(0, outer.style.width.length - 2)) + speed + "px";
//                        if (Number(toolBarDom.style.right.slice(0, toolBarDom.style.right.length - 2)) >= 0 && speed > 0)
                        toolBarDom.style.right = Number(toolBarDom.style.right.slice(0, toolBarDom.style.right.length - 2)) + speed + "px";

                    }
                }
                , 3);
        }
        catch (ex) {
            webConsole.error(ex.message, "elasticContent");
        }
    };

    /**
     * 展开内容
     * @method contentOpen
     * @for animate
     * @param {string} contentId    收缩DomId
     * @return
     */
    var contentOpenFn = function (contentId) {

        //再次点击-收起
        if (document.getElementById(contentId).style.display == "block") {
            elasticContentFn(contentId, 0);
            return;
        }

        var showed = false;
        var contentList = $(".stool_cont_wrap");//$(".stool_cont_wrap")
        if (contentList && contentList.length > 0) {
            for (var i = 0; i < contentList.length; i++) {

                //已有显示项时，隐藏已显示项
                if (contentList[i].id != contentId && contentList[i].style.display == "block") {
                    showed = true;
                    contentList[i].style.display = "none";
                    contentList[i].style.width = "0px";
                }
            }


            if (showed) { //已有显示项时，切换显示当前项，不使用动画效果
                document.getElementById(contentId).style.display = "block";
                document.getElementById(contentId).style.width = "235px";
            }
            else { //无显示项时，动画效果显示当前项
                elasticContentFn(contentId, 235);
            }
        }

    };

    /**
     * 收起内容
     * @method contentClose
     * @for animate
     * @param {string} contentId    收缩DomId
     * @return
     */
    var contentCloseFn = function (contentId) {
        elasticContentFn(contentId, 0);
    };


    var backToTopFn = function (btnId) {
        try {
            var btn = document.getElementById(btnId);
            var d = document.documentElement;
            var set = function () {
                btn.style.display = d.scrollTop ? 'block' : "none"
            }
            window.onscroll = set;
            var scrolldelay = setTimeout(function () {

                if (d.scrollTop == 0)
                    clearInterval(scrolldelay, window.onscroll = set);
                d.scrollTop -= Math.ceil(d.scrollTop * 0.1);
            }, 10);
        }
        catch (ex) {
            webConsole.error(ex.message, "backToTopFn");
        }
    };

    function goTop(acceleration, time) {
        acceleration = acceleration || 0.1;
        time = time || 16;

        var x1 = 0;
        var y1 = 0;
        var x2 = 0;
        var y2 = 0;
        var x3 = 0;
        var y3 = 0;

        if (document.documentElement) {
            x1 = document.documentElement.scrollLeft || 0;
            y1 = document.documentElement.scrollTop || 0;
        }
        if (document.body) {
            x2 = document.body.scrollLeft || 0;
            y2 = document.body.scrollTop || 0;
        }
        var x3 = window.scrollX || 0;
        var y3 = window.scrollY || 0;

        // 滚动条到页面顶部的水平距离
        var x = Math.max(x1, Math.max(x2, x3));
        // 滚动条到页面顶部的垂直距离
        var y = Math.max(y1, Math.max(y2, y3));

        // 滚动距离 = 目前距离 / 速度, 因为距离原来越小, 速度是大于 1 的数, 所以滚动距离会越来越小
        var speed = 1 + acceleration;
        window.scrollTo(Math.floor(x / speed), Math.floor(y / speed));

        // 如果距离不为零, 继续调用迭代本函数
        if (x > 0 || y > 0) {
            var invokeFunction = this.goTop(acceleration, time);
            window.setTimeout(invokeFunction, time);
        }
    };

    return {
        contentOpen: contentOpenFn,
        contentClose: contentCloseFn,
        backToTop: backToTopFn,
        goTop: goTop
    }
});