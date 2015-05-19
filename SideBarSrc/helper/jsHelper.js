define(function () {

    var hasClassFn = function (obj, cls) {
        return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    };

    var addClassFn = function (obj, cls) {
        if (!hasClassFn(obj, cls)) obj.className += " " + cls;
    };

    var removeClassFn = function (obj, cls) {
        if (hasClassFn(obj, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            obj.className = obj.className.replace(reg, ' ');
        }
    };

    var toggleClassFn = function (obj, cls) {
        if (hasClassFn(obj, cls)) {
            removeClassFn(obj, cls);
        } else {
            addClassFn(obj, cls);
        }
    };

    var foreachFn = function (obj, key, val) {
        var reObj;
        for (var i = 0; i < obj.length; i++) {
            if (obj[i][key] == val) {
                reObj = obj[i];
            }
        }

        return reObj;
    }

    return {
        hasClass: hasClassFn,
        addClass: addClassFn,
        removeClass: removeClassFn,
        toggleClass: toggleClassFn,
        foreach: foreachFn
    };
});
