module objects {
  export class Reel extends GameObject {
    // CONSTANTS
    private static POS_Y = 140;
    public static TOTAL_SCREEN_HEIGHT = 280;
    public static SEPARATOR_HEIGHT = 10;
    public static SINGLE_REEL_HEIGHT = 80;
    public static SINGLE_REEL_SEPARATOR_HEIGHT = Reel.SINGLE_REEL_HEIGHT + Reel.SEPARATOR_HEIGHT;
    public static SPEED_STEP_PER_TICK = 2;
    public static MAX_REEL_SPEED = 40;

    // PRIVATE INSTANCE VARIABLES
    private _line1: objects.SingleReel;
    private _line2: objects.SingleReel;
    private _line3: objects.SingleReel;

    private _figures: objects.ReelFigures[];
    private _state: objects.ReelState;

    // PROPERTIES
    get isActive(): boolean {
      return this._state == ReelState.STARTING || this._state == ReelState.SPINNING;
    }

    get State(): objects.ReelState {
      return this._state;
    }

    // CONSTRUCTOR
    constructor(initialFigures: objects.ReelFigures[], x: number = 0) {
      super(config.Game.ASSETS.getResult("reelFigures"), x, Reel.POS_Y, false);

      this._figures = initialFigures;
      this.Start();
    }

    // PRIVATE METHODS
    protected _checkBounds(): void {
      if (this.y >= Reel.POS_Y) {
        this.position = new Vector2(
          this.x,
          Reel.POS_Y - this.height + Reel.TOTAL_SCREEN_HEIGHT - Reel.SEPARATOR_HEIGHT
        );
      }
    }

    private ConvertFigureToAssetId(value: objects.ReelFigures): string {
      let assetId: string = "Blank";

      switch (value) {
        case objects.ReelFigures.RED_XIII:
          assetId = "RedXIII";
          break;

        case objects.ReelFigures.CID:
          assetId = "Cid";
          break;

        case objects.ReelFigures.VINCENT:
          assetId = "Vincent";
          break;

        case objects.ReelFigures.YUFFIE:
          assetId = "Yuffie";
          break;

        case objects.ReelFigures.TIFA:
          assetId = "Tifa";
          break;

        case objects.ReelFigures.BARRET:
          assetId = "Barret";
          break;

        case objects.ReelFigures.AERIS:
          assetId = "Aeris";
          break;

        case objects.ReelFigures.CLOUD:
          assetId = "Cloud";
          break;

        case objects.ReelFigures.SEPHIROTH:
          assetId = "Sephiroth";
          break;
      }

      return assetId;
    }

    protected _move(): void {
      this.position = Vector2.add(this.position, this.velocity);
    }

    // PUBLIC METHODS
    public Start(): void {
      // Verify the initial configuration of the reel, if there isn't enough symbols, add Cloud :) to it
      if (this._figures.length < 3) {
        for (let iCt = this._figures.length; iCt < 3; iCt++) {
          this._figures.push(objects.ReelFigures.CLOUD);
        }
      }

      this._line1 = new objects.SingleReel(
        this.ConvertFigureToAssetId(this._figures[0]),
        this.position.x + 10,
        Reel.POS_Y + Reel.SEPARATOR_HEIGHT
      );

      this._line2 = new objects.SingleReel(
        this.ConvertFigureToAssetId(this._figures[1]),
        this.position.x + 10,
        Reel.POS_Y + Reel.SEPARATOR_HEIGHT * 2 + Reel.SINGLE_REEL_HEIGHT
      );

      this._line3 = new objects.SingleReel(
        this.ConvertFigureToAssetId(this._figures[2]),
        this.position.x + 10,
        Reel.POS_Y + Reel.SEPARATOR_HEIGHT * 3 + Reel.SINGLE_REEL_HEIGHT * 2
      );

      this.Reset();
    }

    public Update(): void {
      // Only move if there is enable to move
      if (this._state != ReelState.STOPPED) {
        if (this._state == ReelState.ALIGN_TO_STOP) {
          // Verify first position available
          let alignPos = this.position.y + (Reel.POS_Y - Reel.SINGLE_REEL_SEPARATOR_HEIGHT);

          if (alignPos % Reel.SINGLE_REEL_SEPARATOR_HEIGHT == 0) {
            this._line1.StartMovement(this.ConvertFigureToAssetId(this._figures[0]));
            this._line2.StartMovement(this.ConvertFigureToAssetId(this._figures[1]));
            this._line3.StartMovement(this.ConvertFigureToAssetId(this._figures[2]));
            this._state = ReelState.STOPPING;
          }
        }

        // Check if the single reels is moving
        if (this._line1.isMoving || this._line2.isMoving || this._line3.isMoving) {
          this._line1.Update();
          this._line2.Update();
          this._line3.Update();
        } else {
          // After the single reels stopped, increase or decrease the speed
          if (this._state == ReelState.STARTING) {
            this.velocity.y += Reel.SPEED_STEP_PER_TICK;
            if (this.velocity.y >= Reel.MAX_REEL_SPEED) {
              this.velocity.y = Reel.MAX_REEL_SPEED;
              this._state = ReelState.SPINNING;
            }
          } else if (this._state == ReelState.BEGIN_STOP) {
            this.velocity.y -= Reel.SPEED_STEP_PER_TICK;
            if (this.velocity.y <= SingleReel.SINGLE_REEL_SPEED) {
              this.velocity.y = SingleReel.SINGLE_REEL_SPEED;
              this._state = ReelState.ALIGN_TO_STOP;
            }
          } else if (this._state == ReelState.STOPPING) {
            this._state = ReelState.STOPPED;
            this.Reset();
            return;
          }
        }

        this._move();
        this._checkBounds();
      }
    }

    public Reset(): void {
      let defPos = Reel.POS_Y - this.height + Reel.TOTAL_SCREEN_HEIGHT - Reel.SEPARATOR_HEIGHT;
      let randomPos = (Reel.SEPARATOR_HEIGHT + Reel.SINGLE_REEL_HEIGHT) * Math.floor(Math.random() * 4 + 1);
      this.position = new Vector2(this.x, defPos + randomPos);
    }

    public AddObjectsToScene(scene: objects.Scene): void {
      scene.addChild(this._line1);
      scene.addChild(this._line2);
      scene.addChild(this._line3);
    }

    public StartSpin(): void {
      this.velocity = new Vector2(0, SingleReel.SINGLE_REEL_SPEED);
      this._state = ReelState.STARTING;
      this._line1.StartMovement();
      this._line2.StartMovement();
      this._line3.StartMovement();
    }

    public StopSpin(result: objects.ReelFigures[]): void {
      this._figures = result;
      this._state = ReelState.BEGIN_STOP;
    }
  }
}
