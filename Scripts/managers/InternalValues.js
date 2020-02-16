"use strict";
var managers;
(function (managers) {
    var InternalValues = /** @class */ (function () {
        // CONSTRUCTOR
        function InternalValues(credits, jackpot, betId, linesId) {
            if (credits === void 0) { credits = InternalValues.INITIAL_CREDITS; }
            if (jackpot === void 0) { jackpot = InternalValues.INITIAL_JACKPOT; }
            if (betId === void 0) { betId = 0; }
            if (linesId === void 0) { linesId = 0; }
            this._credits = credits;
            this._jackpot = jackpot;
            this._betId = betId >= 0 && betId < InternalValues.BET_BASE_VALUES.length ? betId : 0;
            this._linesId = linesId >= 0 && linesId < InternalValues.LINES_BASE_VALUES.length ? linesId : 0;
            this._lines = InternalValues.LINES_BASE_VALUES[this._linesId];
            this._betTotal = InternalValues.BET_BASE_VALUES[this._betId] * this._lines;
            this.Start();
        }
        Object.defineProperty(InternalValues.prototype, "Credits", {
            // PROPERTIES
            get: function () {
                return this._credits;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InternalValues.prototype, "TotalBet", {
            get: function () {
                return this._betTotal;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InternalValues.prototype, "Lines", {
            get: function () {
                return this._lines;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InternalValues.prototype, "Jackpot", {
            get: function () {
                return this._jackpot;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InternalValues.prototype, "SingleBet", {
            get: function () {
                return InternalValues.BET_BASE_VALUES[this._betId];
            },
            enumerable: true,
            configurable: true
        });
        // Initialize local objects
        InternalValues.prototype.Start = function () {
            this._creditLcd = new objects.LcdDisplay("largeFrame", "CREDITS", this._credits, 20, 430, false);
            this._betLcd = new objects.LcdDisplay("smallFrame", "BET", this._betTotal, 310, 430, false);
            this._linesLcd = new objects.LcdDisplay("smallFrame", "LINES", this._lines, 510, 430, false);
        };
        // Add objects to a scene
        InternalValues.prototype.AddObjectsToScene = function (scene) {
            scene.addChild(this._creditLcd);
            scene.addChild(this._betLcd);
            scene.addChild(this._linesLcd);
            this._creditLcd.AddObjectsToScene(scene);
            this._betLcd.AddObjectsToScene(scene);
            this._linesLcd.AddObjectsToScene(scene);
        };
        // PRIVATE  METHODS
        InternalValues.prototype.VerifyAndSetNewBetOrLine = function (betId, lineId) {
            var nextBetValue = InternalValues.BET_BASE_VALUES[betId] * InternalValues.LINES_BASE_VALUES[lineId];
            if (nextBetValue <= this._credits) {
                // The bet value is always updated, so dont need to verify
                this._betTotal = nextBetValue;
                this._betId = betId;
                this._betLcd.Value = nextBetValue;
                // Only update the lines if the value changed
                if (this._linesId != lineId) {
                    this._lines = InternalValues.LINES_BASE_VALUES[lineId];
                    this._linesId = lineId;
                    this._linesLcd.Value = this._lines;
                }
                return true;
            }
            return false;
        };
        // PUBLIC METHODS
        /**
         * Update the Bet One value, checks if there will be enough credits to accept the change
         *
         * @returns {boolean}
         * @memberof InternalValues
         */
        InternalValues.prototype.BetOne = function () {
            var nextBetId = this._betId + 1;
            if (nextBetId >= InternalValues.BET_BASE_VALUES.length) {
                nextBetId = 0;
            }
            return this.VerifyAndSetNewBetOrLine(nextBetId, this._linesId);
        };
        /**
         * Update the Bet Max value, deterime the max value based
         *
         * @returns {boolean}
         * @memberof InternalValues
         */
        InternalValues.prototype.BetMax = function () {
            for (var iLn = this._linesId; iLn >= 0; iLn--) {
                for (var iCt = InternalValues.BET_BASE_VALUES.length - 1; iCt >= 0; iCt--) {
                    if (this.VerifyAndSetNewBetOrLine(iCt, iLn)) {
                        return true;
                    }
                }
            }
            return false;
        };
        /**
         * Update the Pay Lines value, checks if there will be enough credits to accept the change
         *
         * @returns {boolean}
         * @memberof InternalValues
         */
        InternalValues.prototype.PayLines = function () {
            var nextLineId = this._linesId + 1;
            if (nextLineId >= InternalValues.LINES_BASE_VALUES.length) {
                nextLineId = 0;
            }
            return this.VerifyAndSetNewBetOrLine(this._betId, nextLineId);
        };
        /**
         * Add credits to play, set to max value if exceed the limits
         *
         * @param {number} value
         * @memberof InternalValues
         */
        InternalValues.prototype.AddCredits = function (value) {
            this._credits += value;
            if (this._credits > InternalValues.MAX_CREDITS) {
                this._credits = InternalValues.MAX_CREDITS;
            }
            this._creditLcd.Value = this._credits;
        };
        /**
         * Subtract credits after the spin, do not allow go below 0
         *
         * @param {number} value
         * @memberof InternalValues
         */
        InternalValues.prototype.SubtractCredits = function (value) {
            this._credits -= value;
            if (this._credits < 0) {
                this._credits = 0;
            }
            this._creditLcd.Value = this._credits;
        };
        // CONSTANTS
        InternalValues.INITIAL_CREDITS = 10000;
        InternalValues.MAX_CREDITS = 9999999999;
        InternalValues.INITIAL_JACKPOT = 10000000;
        InternalValues.MAX_JACKPOT = 99999999;
        InternalValues.BET_BASE_VALUES = [1, 2, 3, 5, 10, 15, 20, 25, 30, 50, 75, 100];
        InternalValues.LINES_BASE_VALUES = [1, 3, 5, 7, 9, 10];
        // Array containing the 10 paylines, line one [0-4], line two [5-9] and line three [10-14]
        // It should be in order of the pay, so the first one will be the middle of the screen (line two), and so on
        InternalValues.PAY_LINES_POSITIONS = [
            [0, 1, 2, 3, 4],
            [5, 6, 7, 8, 9],
            [10, 11, 12, 13, 14],
            [0, 6, 12, 8, 4],
            [10, 6, 2, 8, 14],
            [5, 11, 12, 13, 9],
            [5, 1, 2, 3, 9],
            [10, 11, 7, 3, 4],
            [0, 1, 7, 13, 14],
            [10, 6, 7, 8, 4]
        ];
        return InternalValues;
    }());
    managers.InternalValues = InternalValues;
})(managers || (managers = {}));
//# sourceMappingURL=InternalValues.js.map