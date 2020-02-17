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

    // SPINNING TIMES
    private static FIRST_REEL_SPIN_TIME = 3;
    private static OTHER_REEL_SPIN_TIME = 1;

    // Jackpot value - Max multiplier times the max bet
    private static JACKPOT_VALUE = 5000 * InternalValues.BET_BASE_VALUES[InternalValues.BET_BASE_VALUES.length - 1];

    // PRIVATE CONSTANTS
    private _reelCt: number = 5;
    private _linesCt: number = 3;

    // PRIVATE INSTANCE VARIABLES
    private _reels: objects.Reel[];

    private _betResult: objects.ReelFigures[];
    private _betResultPerReel: objects.ReelFigures[][];
    private _winnings: number;
    private _winningLines: number[];
    private _isJackpot: boolean;
    private _forceJackpot: boolean;

    private _countTicks: number;
    private _stopIn: number;
    private _state: objects.SpinState;

    // PROPERTIES
    get isSpinning(): boolean {
      return this._state != objects.SpinState.IDLE && this._state != objects.SpinState.DISPLAY_LINES;
    }

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
      let figCt = this._reelCt * this._linesCt;
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

      // Function to hack the game
      if (this._forceJackpot) {
        let firstLine = InternalValues.PAY_LINES_POSITIONS[0];

        // Remove the Sephiroth from every line
        for (let iCt = 0; iCt < result.length; iCt++) {
          if (result[iCt] == objects.ReelFigures.SEPHIROTH) {
            result[iCt] = objects.ReelFigures.AERIS;
          }
        }

        // Add it to the first line
        for (let pos of firstLine) {
          result[pos] = objects.ReelFigures.SEPHIROTH;
        }

        // Turn the hack off after use
        this._forceJackpot = false;
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
      } else if (this._betResult[lineIds[0]] != this._betResult[lineIds[2]]) {
        // First and third are different, check for winnings for 2 equals figure
        winnings = this.GetFigureMutiplier(this._betResult[lineIds[0]], 2) * betValue;
      } else if (this._betResult[lineIds[0]] != this._betResult[lineIds[3]]) {
        // First and fourth are different, check for winning for 3 equals figure
        winnings = this.GetFigureMutiplier(this._betResult[lineIds[0]], 3) * betValue;
      } else if (this._betResult[lineIds[0]] != this._betResult[lineIds[4]]) {
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

    private StartSpinning(): void {
      for (let iCt = 0; iCt < this._reelCt; iCt++) {
        this._reels[iCt].StartSpin();
      }

      this._state = objects.SpinState.SPINNING;
      this._countTicks = 0;
      this._stopIn = config.Game.FPS * SpinAndResult.FIRST_REEL_SPIN_TIME;
    }

    private StopSpinning(): void {
      if (this._state == objects.SpinState.SPINNING) {
        let iCt = 0;
        // Check which spin to stop
        for (; iCt < this._reelCt; iCt++) {
          if (this._reels[iCt].isActive) {
            this._reels[iCt].StopSpin(this._betResultPerReel[iCt]);
            break;
          }
        }

        // If is the last one to stop change the status to Waiting Results (Waiting all spins to stop)
        if (iCt >= this._reelCt - 1) {
          this._state = objects.SpinState.WAITING_RESULTS;
        }

        this._countTicks = 0;
        this._stopIn = config.Game.FPS * SpinAndResult.OTHER_REEL_SPIN_TIME;
      }
    }

    private ResetLines(): void {}

    // PUBLIC METHODS
    // Initialize local objects
    public Start(): void {
      let pos = 50;
      let initialReels: objects.ReelFigures[] = this.GetReelsResult();
      let initialPerReel: objects.ReelFigures[][] = [
        [initialReels[0], initialReels[5], initialReels[10]],
        [initialReels[1], initialReels[6], initialReels[11]],
        [initialReels[2], initialReels[7], initialReels[12]],
        [initialReels[3], initialReels[8], initialReels[13]],
        [initialReels[4], initialReels[9], initialReels[14]]
      ];

      this._reels = new Array<objects.Reel>(this._reelCt);

      for (let iCt = 0; iCt < this._reelCt; iCt++) {
        this._reels[iCt] = new objects.Reel(initialPerReel[iCt], pos);
        pos += 150;
      }

      this._betResult = [];
      this._countTicks = 0;
      this._state = objects.SpinState.IDLE;
      this._forceJackpot = false;
    }

    public Update(): void {
      switch (this._state) {
        case objects.SpinState.WAITING_RESULTS:
          let allStopped = true;

          // Update all the spinnings, and check the status of each one
          for (let iCt = 0; iCt < this._reelCt; iCt++) {
            this._reels[iCt].Update();
            allStopped = allStopped && this._reels[iCt].State == objects.ReelState.STOPPED;
          }

          if (allStopped) {
            this._state = objects.SpinState.PROCESS_RESULTS;
          }
          break;

        case objects.SpinState.SPINNING:
          this._countTicks++;

          // Update all the spinnings, and check the status of each one
          for (let iCt = 0; iCt < this._reelCt; iCt++) {
            this._reels[iCt].Update();
            allStopped = allStopped && this._reels[iCt].State == objects.ReelState.STOPPED;

            if (this._countTicks > this._stopIn && this._reels[iCt].isActive) {
              this.StopSpinning();
            }
          }
          break;

        case objects.SpinState.PROCESS_RESULTS:
          let valMng = config.Game.VALUE_MANAGER;

          // Verify for jackpot
          if (this._isJackpot) {
            valMng.ResetJackpot();
          } else {
            valMng.UpdateJackpot();
          }

          // Validte the winnings
          if (this._winnings > 0) {
            let valMng = config.Game.VALUE_MANAGER;
            valMng.AddCredits(this._winnings);
            valMng.Winnings = this._winnings;
            this._state = objects.SpinState.DISPLAY_LINES;
          } else {
            this._state = objects.SpinState.IDLE;
          }

          break;

        case objects.SpinState.DISPLAY_LINES:
      }
    }

    // Add objects to a scene
    public AddObjectsToScene(scene: objects.Scene): void {
      for (let iCt = 0; iCt < this._reelCt; iCt++) {
        scene.addChild(this._reels[iCt]);
        this._reels[iCt].AddObjectsToScene(scene); // Add the extra objects to the scene
      }
    }

    public SpinAndStop(): boolean {
      let valMng: managers.InternalValues = config.Game.VALUE_MANAGER;

      // Verify if there is a spin executing, if so, will stop the reels (only in the UI, the results is already set)
      if (this.isSpinning) {
        this.StopSpinning();
      } else {
        // Display winning lines allows to start a new spin, so if this is the current state, reset it
        if (this._state == objects.SpinState.DISPLAY_LINES) {
          this.ResetLines();
        }

        // Set the current status
        this._state = objects.SpinState.REQUEST_SPIN;

        // Verify if the user has enough credits to play
        if (valMng.Credits < valMng.TotalBet) {
          this._state = objects.SpinState.IDLE;
          return false;
        }

        // Subtract the value from the credits
        valMng.SubtractCredits(valMng.TotalBet);
        valMng.Winnings = 0;

        // Get the results
        this._betResult = this.GetReelsResult();
        this._betResultPerReel = [
          [this._betResult[0], this._betResult[5], this._betResult[10]],
          [this._betResult[1], this._betResult[6], this._betResult[11]],
          [this._betResult[2], this._betResult[7], this._betResult[12]],
          [this._betResult[3], this._betResult[8], this._betResult[13]],
          [this._betResult[4], this._betResult[9], this._betResult[14]]
        ];

        // Start spining
        this.StartSpinning();

        // Determine Winnings
        this.DetermineWinnings();
      }
    }

    public ForceJackpot(): void {
      if (!this.isSpinning) {
        let valMng: managers.InternalValues = config.Game.VALUE_MANAGER;

        // Add the max bet credits for the current lines
        valMng.AddCredits(valMng.Lines * valMng.MaxBetValue);
        valMng.BetMax();
        this._forceJackpot = true;
        this.SpinAndStop();
      }
    }
  }
}
