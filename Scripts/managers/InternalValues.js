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
                return Math.floor(this._credits);
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
                return Math.floor(this._jackpot);
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
        Object.defineProperty(InternalValues.prototype, "Winnings", {
            set: function (newValue) {
                this._winningsLcd.Value = newValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InternalValues.prototype, "MaxBetValue", {
            get: function () {
                return InternalValues.BET_BASE_VALUES[InternalValues.BET_BASE_VALUES.length - 1];
            },
            enumerable: true,
            configurable: true
        });
        // Initialize local objects
        InternalValues.prototype.Start = function () {
            this._creditLcd = new objects.LcdDisplay("largeFrame", "CREDITS", this._credits, 10, 450, false);
            this._betLcd = new objects.LcdDisplay("smallFrame", "BET", this._betTotal, 310, 450, false);
            this._linesLcd = new objects.LcdDisplay("smallFrame", "LINES", this._lines, 510, 450, false);
            this._jackpotLcd = new objects.LcdDisplay("largeFrame", "JACKPOT", this._jackpot, 5, 5, false);
            this._winningsLcd = new objects.LcdDisplay("largeFrame", "WINNINGS", 0, 230, 5, false);
        };
        InternalValues.prototype.Reset = function () {
            // Reset the internal values
            this._jackpot = InternalValues.INITIAL_JACKPOT;
            this._credits = InternalValues.INITIAL_CREDITS;
            this._betId = 0;
            this._linesId = 0;
            this._lines = InternalValues.LINES_BASE_VALUES[this._linesId];
            this._betTotal = InternalValues.BET_BASE_VALUES[this._betId] * this._lines;
            // Reset the LCD display
            this._jackpotLcd.Value = this._jackpot;
            this.Winnings = 0;
            this._creditLcd.Value = this._credits;
            this._betLcd.Value = this._betTotal;
            this._linesLcd.Value = this._lines;
        };
        // Add objects to a scene
        InternalValues.prototype.AddObjectsToScene = function (scene) {
            scene.addChild(this._creditLcd);
            scene.addChild(this._betLcd);
            scene.addChild(this._linesLcd);
            scene.addChild(this._jackpotLcd);
            scene.addChild(this._winningsLcd);
            this._creditLcd.AddObjectsToScene(scene);
            this._betLcd.AddObjectsToScene(scene);
            this._linesLcd.AddObjectsToScene(scene);
            this._jackpotLcd.AddObjectsToScene(scene);
            this._winningsLcd.AddObjectsToScene(scene);
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
            // Do not pertmit to change the bet/lines while spinning
            if (config.Game.SPIN_RESULT_MANAGER.isSpinning) {
                return false;
            }
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
            // Do not pertmit to change the bet/lines while spinning
            if (config.Game.SPIN_RESULT_MANAGER.isSpinning) {
                return false;
            }
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
            // Do not pertmit to change the bet/lines while spinning
            if (config.Game.SPIN_RESULT_MANAGER.isSpinning) {
                return false;
            }
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
        /**
         * Resets jackpot to the initial value
         *
         * @memberof InternalValues
         */
        InternalValues.prototype.ResetJackpot = function () {
            this._jackpot = InternalValues.INITIAL_JACKPOT;
            this._jackpotLcd.Value = this._jackpot;
        };
        /**
         * Update the jack pot value to add a portion of the bet
         *
         * @memberof InternalValues
         */
        InternalValues.prototype.UpdateJackpot = function () {
            this._jackpot += this._betTotal * InternalValues.JACKPOT_BET_RATE_VALUE;
            if (this._jackpot > InternalValues.MAX_JACKPOT) {
                this._jackpot = InternalValues.MAX_JACKPOT;
            }
            this._jackpotLcd.Value = this._jackpot;
        };
        // CONSTANTS
        InternalValues.INITIAL_CREDITS = 10000;
        InternalValues.MAX_CREDITS = 9999999999;
        InternalValues.INITIAL_JACKPOT = 10000000;
        InternalValues.MAX_JACKPOT = 99999999;
        InternalValues.JACKPOT_BET_RATE_VALUE = 0.1;
        InternalValues.BET_BASE_VALUES = [1, 2, 3, 5, 10, 15, 20, 25, 30, 50, 75, 100];
        InternalValues.LINES_BASE_VALUES = [1, 3, 5, 7, 9, 10];
        // Array containing the 10 paylines, line one [0-4], line two [5-9] and line three [10-14]
        // It should be in order of the pay, so the first one will be the middle of the screen (line two), and so on
        InternalValues.PAY_LINES_POSITIONS = [
            [5, 6, 7, 8, 9],
            [0, 1, 2, 3, 4],
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