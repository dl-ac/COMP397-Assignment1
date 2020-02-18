module scenes {
  export class EndGame extends objects.Scene {
    // PRIVATE INSTANCE MEMBERS
    private _background: createjs.Bitmap;
    private _thanksLabel: objects.Label;

    public Start(): void {
      this._background = new createjs.Bitmap(config.Game.ASSETS.getResult("backgroundOriginal"));
      this._thanksLabel = new objects.Label("Thank you for playing!", "bold 36px", "Verdana", "#000", 5, 5, false);

      this.Main();
    }

    public Update(): void {}

    public Main(): void {
      // Add the background
      this.addChild(this._background);

      // Add the label
      this.addChild(this._thanksLabel);
    }
  }
}
