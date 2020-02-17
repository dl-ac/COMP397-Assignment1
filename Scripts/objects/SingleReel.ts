module objects {
  export class SingleReel extends objects.GameObject {
    // CONSTANTS
    public static SINGLE_REEL_SPEED = 10; // 8px per Frame

    // PRIVATE INSTANCE MEMBERS
    private _screenPosition: Vector2;
    private _belowPosition: Vector2;
    private _abovePosition: Vector2;

    // PROPERTIES
    get isMoving(): boolean {
      return this.velocity.y != 0;
    }

    // constructor
    constructor(imageId: string = "button", x: number = 0, y: number = 0) {
      super(config.Game.ASSETS.getResult(imageId), x, y, false);

      this._screenPosition = new Vector2(x, y);
      this._belowPosition = new Vector2(x, y + Reel.TOTAL_SCREEN_HEIGHT);
      this._abovePosition = new Vector2(x, y - Reel.TOTAL_SCREEN_HEIGHT);
    }

    // PRIVATE METHODS
    protected _checkBounds(): void {
      // Reel already ouside on the bottom of screen, stop spinning, set the new image, and set the position above screen
      if (this.y >= this._belowPosition.y) {
        this.velocity = new Vector2(0, 0);
        this.position = this._abovePosition;
      }

      // If the spin reach their original position, stop spinning
      if (this.y == this._screenPosition.y) {
        this.velocity = new Vector2(0, 0);
      }
    }

    protected _move(): void {
      this.position = Vector2.add(this.position, this.velocity);
    }

    public Start(): void {
      this.Reset();
    }

    public Update(): void {
      this._move();
      this._checkBounds();
    }

    public Reset(): void {
      this.position = this._screenPosition;
    }

    public StartMovement(newImage: string = undefined): void {
      if (newImage != undefined) {
        this.image = config.Game.ASSETS.getResult(newImage) as any;
      }
      this.velocity = this.velocity = new Vector2(0, SingleReel.SINGLE_REEL_SPEED);
    }
  }
}
