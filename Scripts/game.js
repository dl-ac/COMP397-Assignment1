"use strict";
//IIFE - Immediately Invoked Function Expression
//means -> self-executing anonymous function
var Game = (function () {
    // variable declarations
    var canvas = document.getElementsByTagName("canvas")[0];
    var stage;
    var currentSceneState;
    var currentScene;
    var assets;
    var assetManifest = [
        // { id: "button", src: "./Assets/images/button.png" },
        // { id: "placeholder", src: "./Assets/images/placeholder.png" },
        // { id: "startButton", src: "./Assets/images/startButton.png" },
        // { id: "nextButton", src: "./Assets/images/nextButton.png" },
        // { id: "backButton", src: "./Assets/images/backButton.png" },
        // { id: "ocean", src: "./Assets/images/ocean.gif" },
        // { id: "plane", src: "./Assets/images/plane.png" },
        { id: "background", src: "./Assets/images/background.png" },
        { id: "backgroundOriginal", src: "./Assets/images/backgroundOriginal.png" },
        { id: "largeFrame", src: "./Assets/images/frameLarge.png" },
        { id: "smallFrame", src: "./Assets/images/frameSmall.png" },
        { id: "betOneButton", src: "./Assets/images/betOneBtn.png" },
        { id: "betMaxButton", src: "./Assets/images/betMaxBtn.png" },
        { id: "payLinesButton", src: "./Assets/images/payLinesBtn.png" },
        { id: "spinButton", src: "./Assets/images/spinBtn.png" },
        { id: "twoCAD", src: "./Assets/images/2CAD.png" },
        { id: "fiveCAD", src: "./Assets/images/5CAD.png" },
        { id: "twentyCAD", src: "./Assets/images/20CAD.png" },
        { id: "hundredCAD", src: "./Assets/images/100CAD.png" },
        { id: "emptyReel", src: "./Assets/images/emptyReel.png" },
        { id: "reelFigures", src: "./Assets/images/FullReel.png" },
        { id: "Aeris", src: "./Assets/images/Aeris.png" },
        { id: "Barret", src: "./Assets/images/Barret.png" },
        { id: "Cid", src: "./Assets/images/Cid.png" },
        { id: "Cloud", src: "./Assets/images/Cloud.png" },
        { id: "RedXIII", src: "./Assets/images/RedXIII.png" },
        { id: "Sephiroth", src: "./Assets/images/Sephiroth.png" },
        { id: "Tifa", src: "./Assets/images/Tifa.png" },
        { id: "Vincent", src: "./Assets/images/Vincent.png" },
        { id: "Yuffie", src: "./Assets/images/Yuffie.png" },
        { id: "blankReel", src: "./Assets/images/BlankReel.png" },
        { id: "emptyButton", src: "./Assets/images/emptyButton.png" },
        { id: "quitButton", src: "./Assets/images/quitBtn.png" },
        { id: "resetButton", src: "./Assets/images/resetBtn.png" }
    ];
    function Preload() {
        assets = new createjs.LoadQueue(); // asset container
        config.Game.ASSETS = assets; // make a reference to the assets in the global config
        assets.installPlugin(createjs.Sound); // supports sound preloading
        assets.loadManifest(assetManifest);
        assets.on("complete", Start);
    }
    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */
    function Start() {
        console.log("%c Game Started!", "color: blue; font-size: 20px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        // Create the managers
        config.Game.VALUE_MANAGER = new managers.InternalValues();
        config.Game.SPIN_RESULT_MANAGER = new managers.SpinAndResult();
        // Set the ticker
        createjs.Ticker.framerate = config.Game.FPS;
        createjs.Ticker.on("tick", Update);
        stage.enableMouseOver(20);
        currentSceneState = scenes.State.NO_SCENE;
        config.Game.SCENE = scenes.State.PLAY;
        config.Game.SCREEN_WIDTH = canvas.width;
        config.Game.SCREEN_HEIGHT = canvas.height;
    }
    /**
     * This function is triggered every frame (16ms)
     * The stage is then erased and redrawn
     */
    function Update() {
        if (currentSceneState != config.Game.SCENE) {
            Main();
        }
        currentScene.Update();
        stage.update();
    }
    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */
    function Main() {
        console.log("%c Scene Switched...", "color: green; font-size: 16px;");
        // clean up
        if (currentSceneState != scenes.State.NO_SCENE) {
            currentScene.removeAllChildren();
            stage.removeAllChildren();
        }
        // switch to the new scene
        switch (config.Game.SCENE) {
            case scenes.State.PLAY:
                console.log("switch to Play Scene");
                currentScene = new scenes.Play();
                break;
            case scenes.State.END:
                currentScene = new scenes.EndGame();
                break;
        }
        currentSceneState = config.Game.SCENE;
        stage.addChild(currentScene);
    }
    window.addEventListener("load", Preload);
})();
//# sourceMappingURL=game.js.map