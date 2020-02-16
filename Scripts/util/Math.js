"use strict";
var util;
(function (util) {
    var Math = /** @class */ (function () {
        function Math() {
        }
        Math.Clamp = function (value, min, max) {
            if (value < min) {
                value = min;
            }
            else if (value > max) {
                value = max;
            }
            return value;
        };
        Math.Clamp01 = function (value) {
            if (value < 0.0) {
                return 0.0;
            }
            if (value > 1.0) {
                return 1.0;
            }
            return value;
        };
        Math.Lerp = function (a, b, t) {
            return a + (b - a) * Math.Clamp01(t);
        };
        Math.LerpUnclamped = function (a, b, t) {
            return a + (b - a) * t;
        };
        return Math;
    }());
    util.Math = Math;
})(util || (util = {}));
//# sourceMappingURL=Math.js.map