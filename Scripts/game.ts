//IIFE - Immediately Invoked Function Expression
//means -> self-executing anonymous function
let game = (function() {
  // variable declarations
  let canvas: HTMLCanvasElement = document.getElementsByTagName("canvas")[0];
  let stage: createjs.Stage;

  // Screen items declaration
  let background: objects.Image;
  let reelSlot1: objects.Image;
  let reelSlot2: objects.Image;
  let reelSlot3: objects.Image;
  let betButton: objects.Button;
  let maxBetButton: objects.Button;
  let spinButton: objects.Button;
  let jackpotFrame: objects.Image;
  let creditsFrame: objects.Image;
  let betFrame: objects.Image;

  let betImage: objects.Image;
  let jackpotLabel: objects.Label;
  let creditsLabel: objects.Label;
  let betLabel: objects.Label;

  // Local values
  let betValues: Array<number>;
  let jackpot: number;
  let credits: number;
  let betId: number;

  let helloLabel: objects.Label;
  let goodByeLabel: objects.Label;

  let resetButton: objects.Button;

  /**
   * This method initializes the CreateJS (EaselJS) Library
   * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
   */
  function Start(): void {
    initializeSystem();
    stage = new createjs.Stage(canvas);
    createjs.Ticker.framerate = 60; // 60 FPS
    createjs.Ticker.on("tick", Update);
    stage.enableMouseOver(20);
    Main();
  }

  /**
   * Initialize the global values of the game
   *
   */
  function initializeSystem(): void {
    betValues = [1, 2, 3, 5, 10, 15, 20, 25, 30, 50, 75, 100];
    jackpot = 10000000;
    credits = 1234567890;
    betId = 0;
  }

  /**
   * This function is triggered every frame (16ms)
   * The stage is then erased and redrawn
   */
  function Update(): void {
    stage.update();
  }

  function BetOneClick(): void {
    betId++;
    if (betId >= betValues.length) {
      betId = 0;
    }
    betLabel.setText(betValues[betId].toString());
  }

  function MaxBetClick(): void {
    betId = betValues.length - 1;
    betLabel.setText(betValues[betId].toString());
  }
  /**
   * This is the main function of the Game (where all the fun happens)
   *
   */
  function Main(): void {
    // Background object
    background = new objects.Image("./Assets/images/background.png");
    stage.addChild(background);
    jackpotFrame = new objects.Image("./Assets/images/jackpot.png", 0, 20);
    stage.addChild(jackpotFrame);
    creditsFrame = new objects.Image("./Assets/images/credits.png", 10, 405);
    stage.addChild(creditsFrame);
    betFrame = new objects.Image("./Assets/images/betFrame.png", 255, 405);
    stage.addChild(betFrame);

    // Reel slots

    // Create the label values
    jackpotLabel = new objects.Label(jackpot.toString(), "50px", "DigitalMono", "#BF190D", 200, 90, true);
    stage.addChild(jackpotLabel);
    creditsLabel = new objects.Label(" ", "38px", "DigitalMono", "#BF190D", 120, 457, true);
    stage.addChild(creditsLabel);
    betLabel = new objects.Label(" ", "38px", "DigitalMono", "#BF190D", 305, 457, true);
    betLabel.setText(betValues[betId].toString());
    stage.addChild(betLabel);

    // buttons
    spinButton = new objects.Button("./Assets/images/spinBtn.png", 550, 430, true);
    stage.addChild(spinButton);

    spinButton.on("click", function() {
      helloLabel.setText("clicked!");
    });

    betButton = new objects.Button("./Assets/images/betOneBtn.png", 220, 490, false);
    stage.addChild(betButton);

    maxBetButton = new objects.Button("./Assets/images/betMaxBtn.png", 310, 490, false);
    stage.addChild(maxBetButton);

    // resetButton = new objects.Button(
    //   "./Assets/images/resetButton.png",
    //   150,
    //   430,
    //   true
    // );
    // stage.addChild(resetButton);

    // resetButton.on("click", function() {
    //   helloLabel.setText("Hello, World!");
    // });
    // Add buttons events
    betButton.on("click", BetOneClick);
    maxBetButton.on("click", MaxBetClick);
  }

  window.addEventListener("load", Start);
})();
