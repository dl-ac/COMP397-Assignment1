//IIFE - Immediately Invoked Function Expression
//means -> self-executing anonymous function
let game = (function() {
  // variable declarations
  let canvas: HTMLCanvasElement = document.getElementsByTagName("canvas")[0];
  let stage: createjs.Stage;
  let helloLabel: objects.Label;
  let goodByeLabel: objects.Label;
  let dy = 2;
  let clickMeButton: objects.Button;
  let resetButton: objects.Button;
  let background: createjs.Bitmap;

  /**
   * This method initializes the CreateJS (EaselJS) Library
   * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
   */
  function Start(): void {
    stage = new createjs.Stage(canvas);
    createjs.Ticker.framerate = 60; // 60 FPS
    createjs.Ticker.on("tick", Update);
    stage.enableMouseOver(20);
    Main();
  }

  /**
   * This function is triggered every frame (16ms)
   * The stage is then erased and redrawn
   */
  function Update(): void {
    stage.update();
  }

  /**
   * This is the main function of the Game (where all the fun happens)
   *
   */
  function Main(): void {
    background = new createjs.Bitmap("./Assets/images/background.png");
    stage.addChild(background);

    //instantiate a new Text object
    helloLabel = new objects.Label(
      "Hello, World!",
      "40px",
      "Consolas",
      "#FFFFFF",
      320,
      240,
      true
    );
    stage.addChild(helloLabel);

    goodByeLabel = new objects.Label(
      "Good Bye",
      "30px",
      "Arial",
      "#FFFFFF",
      320,
      300,
      true
    );
    stage.addChild(goodByeLabel);

    // buttons
    clickMeButton = new objects.Button(
      "./Assets/images/clickMeButton.png",
      550,
      430,
      true
    );
    stage.addChild(clickMeButton);

    clickMeButton.on("click", function() {
      helloLabel.setText("clicked!");
    });

    resetButton = new objects.Button(
      "./Assets/images/resetButton.png",
      150,
      430,
      true
    );
    stage.addChild(resetButton);

    resetButton.on("click", function() {
      helloLabel.setText("Hello, World!");
    });
  }

  window.addEventListener("load", Start);
})();
