module objects {
  export class Label extends createjs.Text {
    private _isCentered: boolean;

    // constructor
    constructor(
      labelString: string = "empty label",
      fontSize: string = "12px",
      fontFamily: string = "Consolas",
      fontColour: string = "#000000",
      x: number = 0,
      y: number = 0,
      isCentered: boolean = false
    ) {
      super(labelString, fontSize + " " + fontFamily, fontColour);

      this._isCentered = isCentered;

      if (isCentered) {
        this.regX = this.getBounds().width * 0.5;
        this.regY = this.getMeasuredLineHeight() * 0.5;
      }

      this.x = x;
      this.y = y;
    }

    // methods

    public setText(newText: string) {
      this.text = newText;
      if (this._isCentered) {
        this.regX = this.getBounds().width * 0.5;
        //          this.regY = this.getMeasuredLineHeight() * 0.5;
      }
    }
  }
}
