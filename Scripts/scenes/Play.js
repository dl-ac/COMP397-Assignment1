"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scenes;
(function (scenes) {
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Play() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        //initialize and instatiate
        Play.prototype.Start = function () {
            this._background = new createjs.Bitmap(config.Game.ASSETS.getResult("background"));
            // Create the buttons on the scene
            this._spinButton = new objects.Button("spinButton", 720, 520, true);
            this._twoDollarButton = new objects.Button("twoCAD", 20, 523, false);
            this._fiveDollarButton = new objects.Button("fiveCAD", 95, 515, false);
            this._twentyDollarButton = new objects.Button("twentyCAD", 135, 515, false);
            this._hundredDollarButton = new objects.Button("hundredCAD", 175, 515, false);
            this._betButton = new objects.Button("betOneButton", 270, 515, false);
            this._maxBetButton = new objects.Button("betMaxButton", 370, 515, false);
            this._linesButton = new objects.Button("payLinesButton", 520, 515, false);
            this._quitButton = new objects.Button("quitButton", config.Game.SCREEN_WIDTH - 65, 5, false);
            this._resetButton = new objects.Button("resetButton", config.Game.SCREEN_WIDTH - 65, 70, false);
            this._hackButton = new objects.Button("emptyButton", config.Game.SCREEN_WIDTH - 60, config.Game.SCREEN_HEIGHT - 60, false);
            // Create labels
            this._titleLabel = new objects.Label("SLOT MACHINE", "bold 16px", "Stint Ultra Condensed", "#000", 605, 570, false);
            // Add buttons events
            this._spinButton.on("click", this.SpinClick);
            this._twoDollarButton.on("click", this.AddCreditClick);
            this._fiveDollarButton.on("click", this.AddCreditClick);
            this._twentyDollarButton.on("click", this.AddCreditClick);
            this._hundredDollarButton.on("click", this.AddCreditClick);
            this._betButton.on("click", this.BetOneClick);
            this._maxBetButton.on("click", this.MaxBetClick);
            this._linesButton.on("click", this.LinesClick);
            this._resetButton.on("click", this.ResetClick);
            this._quitButton.on("click", this.QuitClick);
            this._hackButton.on("click", this.HackClick);
            this.Main();
        };
        Play.prototype.Update = function () {
            config.Game.SPIN_RESULT_MANAGER.Update();
        };
        Play.prototype.Main = function () {
            // The Reels must be added behind the background to hide the objects.
            config.Game.SPIN_RESULT_MANAGER.AddObjectsToScene(this);
            // Add the background
            this.addChild(this._background);
            // Add the buttons to the stage
            this.addChild(this._hackButton); // Hack button must be behind the spin button
            this.addChild(this._spinButton);
            this.addChild(this._twoDollarButton);
            this.addChild(this._fiveDollarButton);
            this.addChild(this._twentyDollarButton);
            this.addChild(this._hundredDollarButton);
            this.addChild(this._betButton);
            this.addChild(this._maxBetButton);
            this.addChild(this._linesButton);
            this.addChild(this._quitButton);
            this.addChild(this._resetButton);
            // Add the label to stage
            this.addChild(this._titleLabel);
            // Add the value manager controls to the stage
            config.Game.VALUE_MANAGER.AddObjectsToScene(this);
        };
        // PRIVATE INTERNAL METHODS
        Play.prototype.AddCreditClick = function (e) {
            var evt = e;
            var btn = evt.currentTarget;
            var scene = btn.parent;
            switch (btn) {
                case scene._twoDollarButton:
                    config.Game.VALUE_MANAGER.AddCredits(200);
                    break;
                case scene._fiveDollarButton:
                    config.Game.VALUE_MANAGER.AddCredits(500);
                    break;
                case scene._twentyDollarButton:
                    config.Game.VALUE_MANAGER.AddCredits(2000);
                    break;
                case scene._hundredDollarButton:
                    config.Game.VALUE_MANAGER.AddCredits(10000);
                    break;
            }
        };
        Play.prototype.BetOneClick = function () {
            config.Game.VALUE_MANAGER.BetOne();
        };
        Play.prototype.MaxBetClick = function () {
            config.Game.VALUE_MANAGER.BetMax();
        };
        Play.prototype.LinesClick = function () {
            config.Game.VALUE_MANAGER.PayLines();
        };
        Play.prototype.SpinClick = function () {
            config.Game.SPIN_RESULT_MANAGER.SpinAndStop();
        };
        Play.prototype.HackClick = function () {
            config.Game.SPIN_RESULT_MANAGER.ForceJackpot();
        };
        Play.prototype.ResetClick = function () {
            if (!config.Game.SPIN_RESULT_MANAGER.isSpinning) {
                config.Game.VALUE_MANAGER.Reset();
            }
        };
        Play.prototype.QuitClick = function () {
            config.Game.SCENE = scenes.State.END;
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play.js.map