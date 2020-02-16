"use strict";
var util;
(function (util) {
    var Util = /** @class */ (function () {
        function Util() {
        }
        // PUBLIC STATIC METHODS
        Util.inRange = function (value, min, max) {
            return (value - min) * (value - max) <= 0;
        };
        return Util;
    }());
    util.Util = Util;
})(util || (util = {}));
//# sourceMappingURL=Util.js.map