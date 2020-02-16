module objects {
  export class Button extends GameObject {
    // FIELDS
    private _imageId: string;

    // PROPERTIES
    get ImageId(): string {
      return this._imageId;
    }

    // constructor
    constructor(imageId: String = "button", x: number = 0, y: number = 0, isCentered: boolean = false) {
      super(config.Game.ASSETS.getResult(imageId), x, y, isCentered);

      this._imageId = this.ImageId;

      this.on("mouseover", this.MouseOver);
      this.on("mouseout", this.MouseOut);

      this.Start();
    }

    // PRIVATE METHODS
    protected _checkBounds(): void {}

    // PUBLIC METHODS
    MouseOver(): void {
      this.alpha = 0.7;
    }

    MouseOut(): void {
      this.alpha = 1.0;
    }

    /**
     * This function is used for initialization
     *
     * @memberof Button
     */
    public Start(): void {
      this.name = "Button";
    }

    public Update(): void {}

    public Reset(): void {}
  }
}
