module objects {
  export class LcdDisplay extends GameObject {
    // FIELDS
    private _title: string;
    private _value: number;

    // Label inside the display
    private _labelTitle: objects.Label;
    private _labelData: objects.Label;

    // Properties
    get Value(): number {
      return this._value;
    }

    set Value(newValue: number) {
      this._value = newValue;
      this._labelData.setText(Math.floor(this._value).toString());
    }

    // constructor
    constructor(
      imageId: string = "largeFrame",
      title: string = " ",
      value: number = 0,
      x: number = 0,
      y: number = 0,
      isCentered: boolean = false
    ) {
      super(config.Game.ASSETS.getResult(imageId), x, y, isCentered);

      this._title = title;
      this._value = value;

      this.Start();
    }

    // PRIVATE METHODS
    protected _checkBounds(): void {}

    /**
     * This function is used for initialization
     *
     * @memberof Button
     */
    public Start(): void {
      let topLeftPos: Vector2 = this.getTopLeftPosition();

      this.name = "Display";

      // Create the labels
      this._labelTitle = new objects.Label(
        this._title,
        "bold 16px",
        "Verdana",
        "#FFF",
        topLeftPos.x + this.halfWidth,
        topLeftPos.y + 20,
        true
      );

      this._labelData = new objects.Label(
        Math.floor(this._value).toString(),
        "36px",
        "DigitalMono",
        config.Game.DISPLAY_COLOR,
        topLeftPos.x + this.halfWidth,
        topLeftPos.y + this.halfHeight + 12,
        true
      );
    }

    public Update(): void {}

    public Reset(): void {}

    public AddObjectsToScene(scene: objects.Scene): void {
      // Add both label to the same parent as the frame (actual bitmap)
      scene.addChild(this._labelTitle);
      scene.addChild(this._labelData);
    }
  }
}
