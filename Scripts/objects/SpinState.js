"use strict";
var objects;
(function (objects) {
    var SpinState;
    (function (SpinState) {
        SpinState[SpinState["IDLE"] = 0] = "IDLE";
        SpinState[SpinState["REQUEST_SPIN"] = 1] = "REQUEST_SPIN";
        SpinState[SpinState["SPINNING"] = 2] = "SPINNING";
        SpinState[SpinState["WAITING_RESULTS"] = 3] = "WAITING_RESULTS";
        SpinState[SpinState["PROCESS_RESULTS"] = 4] = "PROCESS_RESULTS";
        SpinState[SpinState["DISPLAY_LINES"] = 5] = "DISPLAY_LINES";
        SpinState[SpinState["NUM_OF_STATES"] = 6] = "NUM_OF_STATES";
    })(SpinState = objects.SpinState || (objects.SpinState = {}));
})(objects || (objects = {}));
//# sourceMappingURL=SpinState.js.map