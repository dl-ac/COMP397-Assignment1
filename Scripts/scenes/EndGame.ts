module scenes {
  export class EndGame extends objects.Scene {
    // PRIVATE INSTANCE MEMBERS
    private _background: createjs.Bitmap;
    private _thanksLabel: objects.Label;
    private _titleLabel: objects.Label;
    private _playAgainButton: objects.Button;

    // CONSTRUCTOR
    constructor() {
      super();

      this.Start();
    }

    public Start(): void {
      this._background = new createjs.Bitmap(config.Game.ASSETS.getResult("backgroundOriginal"));
      this._thanksLabel = new objects.Label("Thank you for playing!", "bold 36px", "Verdana", "#000", 5, 5, false);
      this._titleLabel = new objects.Label(
        "SLOT MACHINE",
        "bold 16px",
        "Stint Ultra Condensed",
        "#000",
        605,
        570,
        false
      );
      this._playAgainButton = new objects.Button("playAgainButton", 10, config.Game.SCREEN_HEIGHT - 70, false);

      this.Main();
    }

    public Update(): void {}

    public Main(): void {
      // Add the background
      this.addChild(this._background);

      // Add the labels
      this.addChild(this._thanksLabel);
      this.addChild(this._titleLabel);
      this.addChild(this._playAgainButton);

      // Events
      this._playAgainButton.on("click", function() {
        config.Game.SCENE = State.PLAY;
      });
    }
  }
}
