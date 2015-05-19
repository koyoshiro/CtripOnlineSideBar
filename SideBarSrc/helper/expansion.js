define(function () {

    return function () {

        /**
         * string.contains
         * @method 
         * @for String
         * @param {string} containStr 包含值
         * @return {bool} true:包含 ； false:不包含
         */
        String.prototype.contains = function (containStr) {
            return this.indexOf(containStr) > -1 ? true : false;
        };

        /**
         * string判空
         * @method 
         * @for String
         * @param 
         * @return {bool} true:空 ； false:非空
         */
        String.prototype.isNull = function () {
            return this == null || this.trim().length == 0;
        };

        /**
         * string格式化
         * @method 
         * @for String
         * @param 
         * @return 格式化后的字符串
         */
        String.prototype.format = function () {
            var args = arguments;
            return this.replace(/\{(\d+)\}/g, function (m, i, o, n) {
                return args[i];
            });
        }

        /**
         * string判空
         * @method 
         * @for String
         * @param 
         * @return {bool} true:空 ； false:非空
         */
        Number.prototype.isNull = function () {
            return this == null || isNaN(this);
        };

        Array.prototype.contains = function (item) {
            return RegExp("\\b" + item + "\\b").test(this);
        };

        Array.prototype.sortBy = function (sortKey) {

            this.sort(function (x, y) {
                return x[sortKey] > y[sortKey] ? 1 : -1;
            });
        };

        Array.prototype.remove = function (dx) {
            for (var i = 0, n = 0; i < this.length; i++) {
                if (this[i].bizId != dx.bizId) {
                    this[n++] = this[i]
                }
            }
            this.length -= 1
        }
    }();
});