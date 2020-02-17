"use strict";
var objects;
(function (objects) {
    var ReelState;
    (function (ReelState) {
        ReelState[ReelState["STOPPED"] = 0] = "STOPPED";
        ReelState[ReelState["STARTING"] = 1] = "STARTING";
        ReelState[ReelState["SPINNING"] = 2] = "SPINNING";
        ReelState[ReelState["STOPPING"] = 3] = "STOPPING";
        ReelState[ReelState["READY_TO_STOP"] = 4] = "READY_TO_STOP";
        ReelState[ReelState["NUM_OF_STATES"] = 5] = "NUM_OF_STATES";
    })(ReelState = objects.ReelState || (objects.ReelState = {}));
})(objects || (objects = {}));
//# sourceMappingURL=ReelState.js.map