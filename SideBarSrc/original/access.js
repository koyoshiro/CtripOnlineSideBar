define(["webConsole", "definition"], function (webConsole, definition) {

    //母模板ID组
    var matrix = undefined;

    /**
    * 获取母模板ID组
    * @method 
    * @for access
    * @param 
    * @return
    */
    var getMatrix = function () {

        //防重复赋值
        if (matrix != undefined && typeof (matrix) == "object")
            return;

        try {
            //预置
            var wholeMatrixId = "WholeMatrix", //侧边栏母体Id
            toolBarMatrixId = "ToolBarMatrix",//工具栏母体Id
            myCtripMatrixId = 'MyCtripMatrix',
            funcGroupMatrixId = "FuncGroupMatrix",     //工具栏功能分组母体Id
            otherGroupMatrixId = "OtherGroupMatrix";    //工具栏其他分组母体Id

            if (definition.basicMatrixDefinition == undefined || definition.basicMatrixDefinition == null) {
                webConsole.warn("definition.basicMatrixDefinition is undefined and now using the preset", "accessToolFn");
            } else {
                wholeMatrixId = definition.basicMatrixDefinition.sideBar_WholeMatrixId;
                toolBarMatrixId = definition.basicMatrixDefinition.sideBar_ToolBarMatrixId;
                myCtripMatrixId = definition.basicMatrixDefinition.sideBar_MyCtripMatrixId;
                funcGroupMatrixId = definition.basicMatrixDefinition.sideBar_FuncGroupMatrixId;
                otherGroupMatrixId = definition.basicMatrixDefinition.sideBar_OtherGroupMatrixId;
            }

            matrix = {
                wholeId: wholeMatrixId,
                toolId: toolBarMatrixId,
                myGroupId: myCtripMatrixId,
                funcGroupId: funcGroupMatrixId,
                otherGroupId: otherGroupMatrixId
            };

        } catch (ex) {
            webConsole.error(ex.message, "getMatrix");
        }
    };

    /**
     * 加载工具项公共方法
     * @method accessCommon
     * @for access
     * @param 接入母体Id；插入位置 [last]最后||[first]最前；接入Dom元素
     * @return
     */
    var accessCommonFn = function (matrixId, accessDom) {

        try {

            if (matrixId == undefined || accessDom == undefined || matrixId == "" || accessDom == "")
                return;
            var accessTool = document.createElement("div");
            accessTool.innerHTML = accessDom;
            document.getElementById(matrixId).appendChild(accessTool);

            //var matirxDom = document.getElementById(matrixId);
            //matirxDom.insertBefore(accessTool.firstChild, matirxDom.childNodes[0]);

        }
        catch (ex) {
            webConsole.error(ex.message, "accessCommonFn");
        }
    }

    /**
     * 加载侧边栏
     * @method accessBar
     * @for access
     * @param 侧边栏默认Bar
     * @return
     */
    var accessBarFn = function (barHtml) {

        var stopBar = document.createElement("div");
        stopBar.innerHTML = barHtml;
        document.getElementsByTagName("body")[0].appendChild(stopBar.firstChild);
    };

    /**
     * 加载工具项
     * @method accessTool
     * @for access
     * @param 工具母体类型[none/func/bu/other]；接入工具DOM元素
     * @return
     */
    var accessToolFn = function (toolType, toolDom) {

        getMatrix();

        var matrixId;
        try {
            switch (toolType) {

                case "basic":
                    matrixId = matrix.myGroupId;
                    break;
                case "func":
                    matrixId = matrix.funcGroupId;
                    break;
                case "bu":
                    break;
                case "other":
                    matrixId = matrix.otherGroupId;
                    break;
                default:
                    matrixId = matrix.toolId;
                    break;
            }

            accessCommonFn(matrixId, toolDom);
        }
        catch (ex) {
            webConsole.error(ex.message, "accessToolFn");
        }
    };


    /**
      * 加载工具内容
      * @method accessToolStaticContent
      * @for access
      * @param 工具内容Dom元素
      * @return
      */
    var accessToolContentFn = function (contentDom) {

        getMatrix();

        try {
            var accesstoolContent = document.createElement("div");
            accesstoolContent.innerHTML = contentDom;
            //var children = document.getElementById(matrix.wholeId).childNodes;
            //for (i = 0; i < children.length; i++) {
            //    document.getElementById(matrix.wholeId).removeChild(children[i]);
            //}
            document.getElementById(matrix.wholeId).appendChild(accesstoolContent.firstChild);

        }
        catch (ex) {
            webConsole.error(ex.message, "accessToolStaticContentFn");
        }
    };


    /**
     * 加载工具池内容
     * @method accessToolContentPool
     * @for access
     * @param 工具池ID;工具池内容Dom元素
     * @return
     */
    var accessToolContentPoolFn = function (contentPoolId, poolDom) {

        try {
            var matrixDom = document.getElementById(contentPoolId);
            var matrixDomChildren = matrixDom.childNodes;
            for (i = 0; i < matrixDomChildren.length; i++) {
                matrixDom.removeChild(matrixDomChildren[i]);
            }

            accessCommonFn(contentPoolId,  poolDom);
        }
        catch (ex) {
            webConsole.error(ex.message, "accessToolContentPoolFn");
        }
    };

    return {

        accessTool: accessToolFn,
        accessToolContent: accessToolContentFn,
        accessBar: accessBarFn,
        accessToolContentPool: accessToolContentPoolFn
    };
});