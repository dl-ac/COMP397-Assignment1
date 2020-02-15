"use strict";
//IIFE - Immediately Invoked Function Expression
//means -> self-executing anonymous function
let game = (function () {
    // Constants declarations
    const MAX_CREDITS = 9999999999;
    // variable declarations
    let canvas = document.getElementsByTagName("canvas")[0];
    let stage;
    // Screen items declaration
    // Background static images
    let background;
    let reelSlot1;
    let reelSlot2;
    let reelSlot3;
    let jackpotFrame;
    let creditsFrame;
    let betFrame;
    let linesFrame;
    // Buttons
    let betButton;
    let maxBetButton;
    let linesButton;
    let spinButton;
    let twoDollarButton;
    let fiveDollarButton;
    let twentyDollarButton;
    let hundredDollarButton;
    // Labels
    let jackpotLabel;
    let creditsLabel;
    let betLabel;
    // Local values
    let betValues;
    let jackpot;
    let credits;
    let betId;
    let linesId;
    let helloLabel;
    let goodByeLabel;
    let resetButton;
    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */
    function Start() {
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
    function initializeSystem() {
        betValues = [1, 2, 3, 5, 10, 15, 20, 25, 30, 50, 75, 100];
        jackpot = 10000000;
        credits = 10000;
        betId = 0;
        linesId = 0;
    }
    /**
     * This function is triggered every frame (16ms)
     * The stage is then erased and redrawn
     */
    function Update() {
        stage.update();
    }
    function BetOneClick() {
        betId++;
        if (betId >= betValues.length) {
            betId = 0;
        }
        betLabel.setText(betValues[betId].toString());
    }
    function MaxBetClick() {
        betId = betValues.length - 1;
        betLabel.setText(betValues[betId].toString());
    }
    function AddCreditClick(e) {
        let evt = e;
        switch (evt.currentTarget) {
            case twoDollarButton:
                maintainCredits(200);
                break;
            case fiveDollarButton:
                maintainCredits(500);
                break;
            case twentyDollarButton:
                maintainCredits(2000);
                break;
            case hundredDollarButton:
                maintainCredits(10000);
                break;
        }
    }
    function maintainCredits(value, isDebit = false) {
        if (isDebit) {
            if (credits - value >= 0) {
                credits -= value;
            }
            else {
                return false;
            }
        }
        else {
            if (credits + value <= MAX_CREDITS) {
                credits += value;
            }
            else {
                return false;
            }
        }
        creditsLabel.setText(Math.floor(credits).toString());
        return true;
    }
    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */
    function Main() {
        // Background object
        background = new objects.Image("./Assets/images/background.png");
        stage.addChild(background);
        jackpotFrame = new objects.Image("./Assets/images/jackpot.png", 0, 20);
        stage.addChild(jackpotFrame);
        creditsFrame = new objects.Image("./Assets/images/credits.png", 10, 430);
        stage.addChild(creditsFrame);
        betFrame = new objects.Image("./Assets/images/betFrame.png", 255, 430);
        stage.addChild(betFrame);
        linesFrame = new objects.Image("./Assets/images/linesFrame.png", 400, 430);
        stage.addChild(linesFrame);
        // Reel slots
        reelSlot1 = new objects.Image("./Assets/images/emptyReel.png", 60, 170);
        stage.addChild(reelSlot1);
        reelSlot2 = new objects.Image("./Assets/images/emptyReel.png", 210, 170);
        stage.addChild(reelSlot2);
        reelSlot3 = new objects.Image("./Assets/images/emptyReel.png", 360, 170);
        stage.addChild(reelSlot3);
        reelSlot3 = new objects.Image("./Assets/images/emptyReel.png", 510, 170);
        stage.addChild(reelSlot3);
        reelSlot3 = new objects.Image("./Assets/images/emptyReel.png", 660, 170);
        stage.addChild(reelSlot3);
        // Create the label values
        jackpotLabel = new objects.Label(jackpot.toString(), "50px", "DigitalMono", "#BF190D", 160, 72, true);
        stage.addChild(jackpotLabel);
        creditsLabel = new objects.Label(credits.toString(), "36px", "DigitalMono", "#BF190D", 115, 482, true);
        stage.addChild(creditsLabel);
        betLabel = new objects.Label(betValues[betId].toString(), "36px", "DigitalMono", "#BF190D", 305, 482, true);
        stage.addChild(betLabel);
        // buttons
        spinButton = new objects.Button("./Assets/images/spinBtn.png", 950, 525, true);
        stage.addChild(spinButton);
        spinButton.on("click", function () {
            helloLabel.setText("clicked!");
        });
        betButton = new objects.Button("./Assets/images/betOneBtn.png", 220, 515, false);
        stage.addChild(betButton);
        maxBetButton = new objects.Button("./Assets/images/betMaxBtn.png", 310, 515, false);
        stage.addChild(maxBetButton);
        linesButton = new objects.Button("./Assets/images/payLinesBtn.png", 410, 515, false);
        stage.addChild(linesButton);
        twoDollarButton = new objects.Button("./Assets/images/2CAD.png", 10, 523, false);
        stage.addChild(twoDollarButton);
        fiveDollarButton = new objects.Button("./Assets/images/5CAD.png", 85, 515, false);
        stage.addChild(fiveDollarButton);
        twentyDollarButton = new objects.Button("./Assets/images/20CAD.png", 125, 515, false);
        stage.addChild(twentyDollarButton);
        hundredDollarButton = new objects.Button("./Assets/images/100CAD.png", 165, 515, false);
        stage.addChild(hundredDollarButton);
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
        twoDollarButton.on("click", AddCreditClick);
        fiveDollarButton.on("click", AddCreditClick);
        twentyDollarButton.on("click", AddCreditClick);
        hundredDollarButton.on("click", AddCreditClick);
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=game.js.map