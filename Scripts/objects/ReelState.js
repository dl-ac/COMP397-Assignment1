"use strict";
var objects;
(function (objects) {
    var ReelState;
    (function (ReelState) {
        ReelState[ReelState["STOPPED"] = 0] = "STOPPED";
        ReelState[ReelState["STARTING"] = 1] = "STARTING";
        ReelState[ReelState["SPINNING"] = 2] = "SPINNING";
        ReelState[ReelState["BEGIN_STOP"] = 3] = "BEGIN_STOP";
        ReelState[ReelState["ALIGN_TO_STOP"] = 4] = "ALIGN_TO_STOP";
        ReelState[ReelState["STOPPING"] = 5] = "STOPPING";
        ReelState[ReelState["NUM_OF_STATES"] = 6] = "NUM_OF_STATES";
    })(ReelState = objects.ReelState || (objects.ReelState = {}));
})(objects || (objects = {}));
//# sourceMappingURL=ReelState.js.map