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
            // Add buttons events
            this._twoDollarButton.on("click", this.AddCreditClick);
            this._fiveDollarButton.on("click", this.AddCreditClick);
            this._twentyDollarButton.on("click", this.AddCreditClick);
            this._hundredDollarButton.on("click", this.AddCreditClick);
            this._betButton.on("click", this.BetOneClick);
            this._maxBetButton.on("click", this.MaxBetClick);
            this._linesButton.on("click", this.LinesClick);
            this.Main();
        };
        Play.prototype.Update = function () { };
        Play.prototype.Main = function () {
            this.addChild(this._background);
            // Add the buttons to the stage
            this.addChild(this._spinButton);
            this.addChild(this._twoDollarButton);
            this.addChild(this._fiveDollarButton);
            this.addChild(this._twentyDollarButton);
            this.addChild(this._hundredDollarButton);
            this.addChild(this._betButton);
            this.addChild(this._maxBetButton);
            this.addChild(this._linesButton);
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
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play.js.map