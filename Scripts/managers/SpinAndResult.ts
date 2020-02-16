module managers {
  export class SpinAndResult {
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
    private _betResult: Array<objects.ReelFigures>;

    // CONSTRUCTOR
    constructor() {
      this.Start();
    }

    // PRIVATE METHODS
    private GetReelsResult(): Array<objects.ReelFigures> {
      let figCt = this.reelCt * this.linesCt;
      let result = new Array<objects.ReelFigures>();

      for (let iCt: number = 0; iCt < figCt; iCt++) {
        let outcome = Math.floor((Math.random() * 65) + 1);

        switch (outcome) {
          case check
        }
      }
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

    public ExecuteSpin(): boolean {
      let valMng: managers.InternalValues = config.Game.VALUE_MANAGER;

      // Verify if there is a spin executing, if so, will stop the reels (only in the UI, the results is already set)
      if (this._spinning) {
        stopSpinning();
      } else {
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
    }
  }
}
