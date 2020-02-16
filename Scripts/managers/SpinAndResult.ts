module managers {
  export class SpinAndResult {
    // CONSTANTS
    private static MULTIPLIER_TABLE = [
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
    private static JACKPOT_VALUE = 5000 * InternalValues.BET_BASE_VALUES[InternalValues.BET_BASE_VALUES.length - 1];

    // PRIVATE CONSTANTS
    private reelCt: number = 5;
    private linesCt: number = 3;

    // PRIVATE INSTANCE VARIABLES
    private _reel1: objects.Button;
    private _reel2: objects.Button;
    private _reel3: objects.Button;
    private _reel4: objects.Button;
    private _reel5: objects.Button;
    private _spinning: boolean;
    private _betResult: objects.ReelFigures[];
    private _winnings: number;
    private _winningLines: number[];
    private _isJackpot: boolean;

    // CONSTRUCTOR
    constructor() {
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
    private GetReelsResult(): objects.ReelFigures[] {
      let figCt = this.reelCt * this.linesCt;
      let result = new Array<objects.ReelFigures>(figCt);

      for (let iCt: number = 0; iCt < figCt; iCt++) {
        let outcome = Math.floor(Math.random() * 65 + 1);

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
    }

    /**
     * Determine the winning credits for each line. Based on bet value selected
     *
     * @private
     * @memberof SpinAndResult
     */
    private DetermineWinnings(): void {
      let valMng: managers.InternalValues = config.Game.VALUE_MANAGER;
      let winnings: number = 0;

      // Reset the numbers
      this._winnings = 0;
      this._winningLines = [];
      this._isJackpot = false;

      // Call the calculation function based on how many lines is selected
      for (let iCt = 0; iCt < valMng.Lines; iCt++) {
        let value = this.CalculateWinningsInLine(valMng.SingleBet, InternalValues.PAY_LINES_POSITIONS[iCt]);
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
    }

    /**
     * Calculate the winning in a single line
     *
     * @private
     * @param {number} betValue
     * @param {number[]} lineIds
     * @returns {number}
     * @memberof SpinAndResult
     */
    private CalculateWinningsInLine(betValue: number, lineIds: number[]): number {
      let winnings: number = 0;

      // The reels check is made by order, so, if
      if (this._betResult[lineIds[0]] != this._betResult[lineIds[1]]) {
        // First and second are different, no winnings.
        winnings = 0;
      } else if (this._betResult[lineIds[0]] != this._betResult[lineIds[3]]) {
        // First and third are different, check for winnings for 2 equals figure
        winnings = this.GetFigureMutiplier(this._betResult[lineIds[0]], 2) * betValue;
      } else if (this._betResult[lineIds[0]] != this._betResult[lineIds[4]]) {
        // First and fourth are different, check for winning for 3 equals figure
        winnings = this.GetFigureMutiplier(this._betResult[lineIds[0]], 3) * betValue;
      } else if (this._betResult[lineIds[0]] != this._betResult[lineIds[5]]) {
        // First and fifth are different, check for winning for 4 equals figure
        winnings = this.GetFigureMutiplier(this._betResult[lineIds[0]], 4) * betValue;
      } else {
        // All of them are equal, check for winning for 5 equals figure
        winnings = this.GetFigureMutiplier(this._betResult[lineIds[0]], 5) * betValue;
      }

      return winnings;
    }

    /**
     * Get the multiplier based on the figure and number of equals figure
     *
     * @private
     * @returns {number}
     * @memberof SpinAndResult
     */
    private GetFigureMutiplier(figure: objects.ReelFigures, qty: number): number {
      // The quantity must be between 2 and 5
      if (util.Util.inRange(qty, 2, 5)) {
        qty -= 2; // Subtract by 2 to get the right array index

        for (let item of SpinAndResult.MULTIPLIER_TABLE) {
          if (item.id == figure) {
            return item.multipliers[qty];
          }
        }
      }

      // If not found, return 0
      return 0;
    }

    // PUBLIC METHODS
    // Initialize local objects
    public Start(): void {
      this._reel1 = new objects.Button("emptyReel", 50, 140);
      this._reel2 = new objects.Button("emptyReel", 200, 140);
      this._reel3 = new objects.Button("emptyReel", 350, 140);
      this._reel4 = new objects.Button("emptyReel", 500, 140);
      this._reel5 = new objects.Button("emptyReel", 650, 140);

      this._spinning = false;
      this._betResult = [];
    }

    public Update(): void {}

    // Add objects to a scene
    public AddObjectsToScene(scene: objects.Scene): void {
      scene.addChild(this._reel1);
      scene.addChild(this._reel2);
      scene.addChild(this._reel3);
      scene.addChild(this._reel4);
      scene.addChild(this._reel5);
    }

    public SpinAndStop(): boolean {
      let valMng: managers.InternalValues = config.Game.VALUE_MANAGER;

      // Verify if there is a spin executing, if so, will stop the reels (only in the UI, the results is already set)
      if (this._spinning) {
        //this.StopSpinning();
      } else {
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
    }
  }
}