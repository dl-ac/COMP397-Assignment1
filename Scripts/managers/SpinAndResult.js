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
        /**
         * Random function to determine each of character positions
         *
         * @private
         * @returns {Array<objects.ReelFigures>}
         * @memberof SpinAndResult
         */
        SpinAndResult.prototype.GetReelsResult = function () {
            var figCt = this.reelCt * this.linesCt;
            var result = new Array(figCt);
            for (var iCt = 0; iCt < figCt; iCt++) {
                var outcome = Math.floor(Math.random() * 65 + 1);
                switch (true) {
                    case util.Util.inRange(outcome, 1, 14): // 21.54% probability
                        result[iCt] = objects.ReelFigures.RED_XIII;
                        break;
                    case util.Util.inRange(outcome, 15, 27): // 20.00% probability
                        result[iCt] = objects.ReelFigures.CID;
                        break;
                    case util.Util.inRange(outcome, 28, 37): // 15.38% probability
                        result[iCt] = objects.ReelFigures.VINCENT;
                        break;
                    case util.Util.inRange(outcome, 38, 46): // 13.85% probability
                        result[iCt] = objects.ReelFigures.YUFFIE;
                        break;
                    case util.Util.inRange(outcome, 47, 54): // 12.30% probability
                        result[iCt] = objects.ReelFigures.TIFA;
                        break;
                    case util.Util.inRange(outcome, 55, 59): // 7.69% probability
                        result[iCt] = objects.ReelFigures.BARRET;
                        break;
                    case util.Util.inRange(outcome, 60, 62): // 4.62% probability
                        result[iCt] = objects.ReelFigures.AERIS;
                        break;
                    case util.Util.inRange(outcome, 63, 64): // 3.07% probability
                        result[iCt] = objects.ReelFigures.CLOUD;
                        break;
                    case util.Util.inRange(outcome, 65, 65): // 1.53% probability
                        result[iCt] = objects.ReelFigures.SEPHIROTH;
                        break;
                }
            }
            return result;
        };
        /**
         * Determine the winning credits for each line. Based on bet value selected
         *
         * @private
         * @memberof SpinAndResult
         */
        SpinAndResult.prototype.DetermineWinnings = function () {
            var valMng = config.Game.VALUE_MANAGER;
            var winnings = 0;
            // Reset the numbers
            this._winnings = 0;
            this._winningLines = [];
            this._isJackpot = false;
            // Call the calculation function based on how many lines is selected
            for (var iCt = 0; iCt < valMng.Lines; iCt++) {
                var value = this.CalculateWinningsInLine(valMng.SingleBet, managers.InternalValues.PAY_LINES_POSITIONS[iCt]);
                if (value > 0) {
                    // Set the winnings as the jackpot value and stop processing other lines
                    if (value === SpinAndResult.JACKPOT_VALUE) {
                        winnings = valMng.Jackpot;
                        this._isJackpot = true;
                        break;
                    }
                    winnings += value;
                    this._winningLines.push(iCt + 1);
                }
            }
            // Set the total winnings
            this._winnings = winnings;
        };
        /**
         * Calculate the winning in a single line
         *
         * @private
         * @param {number} betValue
         * @param {number[]} lineIds
         * @returns {number}
         * @memberof SpinAndResult
         */
        SpinAndResult.prototype.CalculateWinningsInLine = function (betValue, lineIds) {
            var winnings = 0;
            // The reels check is made by order, so, if
            if (this._betResult[lineIds[0]] != this._betResult[lineIds[1]]) {
                // First and second are different, no winnings.
                winnings = 0;
            }
            else if (this._betResult[lineIds[0]] != this._betResult[lineIds[3]]) {
                // First and third are different, check for winnings for 2 equals figure
                winnings = this.GetFigureMutiplier(this._betResult[lineIds[0]], 2) * betValue;
            }
            else if (this._betResult[lineIds[0]] != this._betResult[lineIds[4]]) {
                // First and fourth are different, check for winning for 3 equals figure
                winnings = this.GetFigureMutiplier(this._betResult[lineIds[0]], 3) * betValue;
            }
            else if (this._betResult[lineIds[0]] != this._betResult[lineIds[5]]) {
                // First and fifth are different, check for winning for 4 equals figure
                winnings = this.GetFigureMutiplier(this._betResult[lineIds[0]], 4) * betValue;
            }
            else {
                // All of them are equal, check for winning for 5 equals figure
                winnings = this.GetFigureMutiplier(this._betResult[lineIds[0]], 5) * betValue;
            }
            return winnings;
        };
        /**
         * Get the multiplier based on the figure and number of equals figure
         *
         * @private
         * @returns {number}
         * @memberof SpinAndResult
         */
        SpinAndResult.prototype.GetFigureMutiplier = function (figure, qty) {
            // The quantity must be between 2 and 5
            if (util.Util.inRange(qty, 2, 5)) {
                qty -= 2; // Subtract by 2 to get the right array index
                for (var _i = 0, _a = SpinAndResult.MULTIPLIER_TABLE; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (item.id == figure) {
                        return item.multipliers[qty];
                    }
                }
            }
            // If not found, return 0
            return 0;
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
        SpinAndResult.prototype.SpinAndStop = function () {
            var valMng = config.Game.VALUE_MANAGER;
            // Verify if there is a spin executing, if so, will stop the reels (only in the UI, the results is already set)
            if (this._spinning) {
                //this.StopSpinning();
            }
            else {
                this._spinning = true;
                // Verify if the user has enough credits to play
                if (valMng.Credits < valMng.TotalBet) {
                    this._spinning = false;
                    return false;
                }
                // Subtract the value from the credits
                valMng.SubtractCredits(valMng.TotalBet);
                // Get the results
                this._betResult = this.GetReelsResult();
                // Start spining
                //this.StartSpinning();
                // Determine Winnings
                this.DetermineWinnings();
                console.log("Winnings: " + this._winnings);
                console.log("Lines: " + this._winningLines);
                this._spinning = false;
            }
        };
        // CONSTANTS
        SpinAndResult.MULTIPLIER_TABLE = [
            { id: objects.ReelFigures.RED_XIII, multipliers: [0, 5, 25, 100] },
            { id: objects.ReelFigures.CID, multipliers: [0, 5, 25, 100] },
            { id: objects.ReelFigures.VINCENT, multipliers: [0, 5, 25, 100] },
            { id: objects.ReelFigures.YUFFIE, multipliers: [0, 5, 40, 150] },
            { id: objects.ReelFigures.TIFA, multipliers: [0, 5, 40, 150] },
            { id: objects.ReelFigures.BARRET, multipliers: [5, 30, 100, 750] },
            { id: objects.ReelFigures.AERIS, multipliers: [5, 35, 150, 1000] },
            { id: objects.ReelFigures.CLOUD, multipliers: [5, 40, 400, 2000] },
            { id: objects.ReelFigures.SEPHIROTH, multipliers: [10, 100, 1000, 5000] }
        ];
        // Jackpot value - Max multiplier times the max bet
        SpinAndResult.JACKPOT_VALUE = 5000 * managers.InternalValues.BET_BASE_VALUES[managers.InternalValues.BET_BASE_VALUES.length - 1];
        return SpinAndResult;
    }());
    managers.SpinAndResult = SpinAndResult;
})(managers || (managers = {}));
//# sourceMappingURL=SpinAndResult.js.map