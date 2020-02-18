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
    var EndGame = /** @class */ (function (_super) {
        __extends(EndGame, _super);
        // CONSTRUCTOR
        function EndGame() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        EndGame.prototype.Start = function () {
            this._background = new createjs.Bitmap(config.Game.ASSETS.getResult("backgroundOriginal"));
            this._thanksLabel = new objects.Label("Thank you for playing!", "bold 36px", "Verdana", "#000", 5, 5, false);
            this._titleLabel = new objects.Label("SLOT MACHINE", "bold 16px", "Stint Ultra Condensed", "#000", 605, 570, false);
            this.Main();
        };
        EndGame.prototype.Update = function () { };
        EndGame.prototype.Main = function () {
            // Add the background
            this.addChild(this._background);
            // Add the labels
            this.addChild(this._thanksLabel);
            this.addChild(this._titleLabel);
        };
        return EndGame;
    }(objects.Scene));
    scenes.EndGame = EndGame;
})(scenes || (scenes = {}));
//# sourceMappingURL=EndGame.js.map