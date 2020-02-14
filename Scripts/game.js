"use strict";
//IIFE - Immediately Invoked Function Expression
//means -> self-executing anonymous function
let Game = (function () {
    // variable declarations
    let canvas = document.getElementsByTagName("canvas")[0];
    let stage;
    let background;
    let reelBack1;
    let reelBack2;
    let reelBack3;
    let welcomeLabel;
    let startButton;
    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */
    function Start() {
        console.log(`%c Game Started!`, "color: blue; font-size: 20px; font-weight: bold;");
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
    function Update() {
        stage.update();
    }
    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */
    function Main() {
        console.log(`%c Main Started...`, "color: green; font-size: 16px;");
        background = new objects.Image("./Assets/images/background.png");
        stage.addChild(background);
        reelBack1 = new objects.Image("./Assets/images/reel.png");
        stage.addChild(reelBack1);
        reelBack2 = new objects.Image("./Assets/images/reel.png", 100);
        stage.addChild(reelBack2);
        reelBack3 = new objects.Image("./Assets/images/reel.png", 200);
        stage.addChild(reelBack3);
        //instantiate a new Text object
        welcomeLabel = new objects.Label("The Game", "80px", "Consolas", "#000000", 320, 180, true);
        stage.addChild(welcomeLabel);
        // buttons
        startButton = new objects.Button("./Assets/images/startButton.png", 320, 430, true);
        stage.addChild(startButton);
        startButton.on("click", function () {
            welcomeLabel.setText("clicked!");
        });
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=game.js.map