"use strict";
var managers;
(function (managers) {
    var SpinAndResult = /** @class */ (function () {
        // CONSTRUCTOR
        function SpinAndResult() {
            // PRIVATE CONSTANTS
            this.reelCt = 5;
            this.linesCt = 3;
            this.Start();
        }
        // PRIVATE METHODS
        SpinAndResult.prototype.GetReelsResult = function () {
            var figCt = this.reelCt * this.linesCt;
            var result = new Array();
            for (var iCt = 0; iCt < figCt; iCt++) {
                var outcome = Math.floor((Math.random() * 65) + 1);
                switch (outcome) {
                    case check:
                }
            }
        };
        // PUBLIC METHODS
        // Initialize local objects
        SpinAndResult.prototype.Start = function () {
            this._reel1 = new objects.Button("emptyReel", 50, 140);
            this._reel2 = new objects.Button("emptyReel", 200, 140);
            this._reel3 = new objects.Button("emptyReel", 350, 140);
            this._reel4 = new objects.Button("emptyReel", 500, 140);
            this._reel5 = new objects.Button("emptyReel", 650, 140);
            this._spinning = false;
            this._betResult = [];
        };
        SpinAndResult.prototype.Update = function () { };
        // Add objects to a scene
        SpinAndResult.prototype.AddObjectsToScene = function (scene) {
            scene.addChild(this._reel1);
            scene.addChild(this._reel2);
            scene.addChild(this._reel3);
            scene.addChild(this._reel4);
            scene.addChild(this._reel5);
        };
        SpinAndResult.prototype.ExecuteSpin = function () {
            var valMng = config.Game.VALUE_MANAGER;
            // Verify if there is a spin executing, if so, will stop the reels (only in the UI, the results is already set)
            if (this._spinning) {
                stopSpinning();
            }
            else {
                this._spinning = true;
                // Verify if the user has enough credits to play
                if (valMng.Credits < valMng.Bet) {
                    this._spinning = false;
                    return false;
                }
                // Subtract the value from the credits
                valMng.SubtractCredits(valMng.Bet);
                // Get the results
                this._betResult = GetReelsResult();
            }
        };
        return SpinAndResult;
    }());
    managers.SpinAndResult = SpinAndResult;
})(managers || (managers = {}));
//# sourceMappingURL=SpinAndResult.js.map