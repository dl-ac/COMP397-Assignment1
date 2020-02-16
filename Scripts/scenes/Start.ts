module scenes {
  export class Start extends objects.Scene {
    // PRIVATE INSTANCE MEMBERS
    private _welcomeLabel: objects.Label;
    private _startButton: objects.Button;
    private _ocean: objects.Ocean;
    private _background: createjs.Bitmap;

    // PUBLIC PROPERTIES

    // CONSTRUCTOR
    constructor() {
      super();

      this.Start();
    }

    // PRIVATE METHODS

    // PUBLIC METHODS
    public Start(): void {
      // Create the background
      this._background = new createjs.Bitmap(config.Game.ASSETS.getResult("background"));

      //instantiate a new Text object
      this._welcomeLabel = new objects.Label("The Game", "80px", "Consolas", "#FFFF00", 320, 180, true);
      // buttons
      //   this._startButton = new objects.Button(config.Game.ASSETS.getResult("startButton"), 320, 430, true);

      this._ocean = new objects.Ocean();
      this.Main();
    }

    public Update(): void {
      this._ocean.Update();
    }

    public Main(): void {
      this.addChild(this._background);

      this.addChild(this._ocean);

      this.addChild(this._welcomeLabel);

      this.addChild(this._startButton);

      this._startButton.on("click", () => {
        config.Game.SCENE = scenes.State.PLAY;
      });
    }
  }
}
