module managers {
  export class InternalValues {
    // CONSTANTS
    public static INITIAL_CREDITS: number = 10000;
    public static MAX_CREDITS: number = 9999999999;
    public static INITIAL_JACKPOT: number = 10000000;
    public static MAX_JACKPOT: number = 99999999;
    public static BET_BASE_VALUES: Array<number> = [1, 2, 3, 5, 10, 15, 20, 25, 30, 50, 75, 100];
    public static LINES_BASE_VALUES: Array<number> = [1, 3, 5, 7, 9, 10];
    // Array containing the 10 paylines, line one [0-4], line two [5-9] and line three [10-14]
    // It should be in order of the pay, so the first one will be the middle of the screen (line two), and so on
    public static PAY_LINES_POSITIONS: Array<Array<number>> = [
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

    // PRIVATE FIELDS
    private _credits: number;
    private _jackpot: number;
    private _betTotal: number;
    private _lines: number;
    private _betId: number;
    private _linesId: number;

    private _creditLcd: objects.LcdDisplay;
    private _betLcd: objects.LcdDisplay;
    private _linesLcd: objects.LcdDisplay;
    private _jackpotLcd: objects.LcdDisplay;

    // PROPERTIES
    get Credits(): number {
      return this._credits;
    }

    get TotalBet(): number {
      return this._betTotal;
    }

    get Lines(): number {
      return this._lines;
    }

    get Jackpot(): number {
      return this._jackpot;
    }

    get SingleBet(): number {
      return InternalValues.BET_BASE_VALUES[this._betId];
    }

    // CONSTRUCTOR
    constructor(
      credits: number = InternalValues.INITIAL_CREDITS,
      jackpot: number = InternalValues.INITIAL_JACKPOT,
      betId: number = 0,
      linesId: number = 0
    ) {
      this._credits = credits;
      this._jackpot = jackpot;
      this._betId = betId >= 0 && betId < InternalValues.BET_BASE_VALUES.length ? betId : 0;
      this._linesId = linesId >= 0 && linesId < InternalValues.LINES_BASE_VALUES.length ? linesId : 0;

      this._lines = InternalValues.LINES_BASE_VALUES[this._linesId];
      this._betTotal = InternalValues.BET_BASE_VALUES[this._betId] * this._lines;

      this.Start();
    }

    // Initialize local objects
    public Start(): void {
      this._creditLcd = new objects.LcdDisplay("largeFrame", "CREDITS", this._credits, 20, 430, false);
      this._betLcd = new objects.LcdDisplay("smallFrame", "BET", this._betTotal, 310, 430, false);
      this._linesLcd = new objects.LcdDisplay("smallFrame", "LINES", this._lines, 510, 430, false);
    }

    // Add objects to a scene
    public AddObjectsToScene(scene: objects.Scene): void {
      scene.addChild(this._creditLcd);
      scene.addChild(this._betLcd);
      scene.addChild(this._linesLcd);
      this._creditLcd.AddObjectsToScene(scene);
      this._betLcd.AddObjectsToScene(scene);
      this._linesLcd.AddObjectsToScene(scene);
    }

    // PRIVATE  METHODS
    private VerifyAndSetNewBetOrLine(betId: number, lineId: number): boolean {
      let nextBetValue: number = InternalValues.BET_BASE_VALUES[betId] * InternalValues.LINES_BASE_VALUES[lineId];

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
    }

    // PUBLIC METHODS

    /**
     * Update the Bet One value, checks if there will be enough credits to accept the change
     *
     * @returns {boolean}
     * @memberof InternalValues
     */
    public BetOne(): boolean {
      let nextBetId: number = this._betId + 1;

      // Do not pertmit to change the bet/lines while spinning
      if (config.Game.SPIN_RESULT_MANAGER.isSpinning) {
        return false;
      }

      if (nextBetId >= InternalValues.BET_BASE_VALUES.length) {
        nextBetId = 0;
      }

      return this.VerifyAndSetNewBetOrLine(nextBetId, this._linesId);
    }

    /**
     * Update the Bet Max value, deterime the max value based
     *
     * @returns {boolean}
     * @memberof InternalValues
     */
    public BetMax(): boolean {
      // Do not pertmit to change the bet/lines while spinning
      if (config.Game.SPIN_RESULT_MANAGER.isSpinning) {
        return false;
      }

      for (let iLn: number = this._linesId; iLn >= 0; iLn--) {
        for (let iCt: number = InternalValues.BET_BASE_VALUES.length - 1; iCt >= 0; iCt--) {
          if (this.VerifyAndSetNewBetOrLine(iCt, iLn)) {
            return true;
          }
        }
      }

      return false;
    }

    /**
     * Update the Pay Lines value, checks if there will be enough credits to accept the change
     *
     * @returns {boolean}
     * @memberof InternalValues
     */
    public PayLines(): boolean {
      let nextLineId: number = this._linesId + 1;

      // Do not pertmit to change the bet/lines while spinning
      if (config.Game.SPIN_RESULT_MANAGER.isSpinning) {
        return false;
      }

      if (nextLineId >= InternalValues.LINES_BASE_VALUES.length) {
        nextLineId = 0;
      }

      return this.VerifyAndSetNewBetOrLine(this._betId, nextLineId);
    }

    /**
     * Add credits to play, set to max value if exceed the limits
     *
     * @param {number} value
     * @memberof InternalValues
     */
    public AddCredits(value: number): void {
      this._credits += value;

      if (this._credits > InternalValues.MAX_CREDITS) {
        this._credits = InternalValues.MAX_CREDITS;
      }

      this._creditLcd.Value = this._credits;
    }

    /**
     * Subtract credits after the spin, do not allow go below 0
     *
     * @param {number} value
     * @memberof InternalValues
     */
    public SubtractCredits(value: number): void {
      this._credits -= value;

      if (this._credits < 0) {
        this._credits = 0;
      }

      this._creditLcd.Value = this._credits;
    }
  }
}
