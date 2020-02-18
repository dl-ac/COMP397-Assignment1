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
    var Start = /** @class */ (function (_super) {
        __extends(Start, _super);
        // CONSTRUCTOR
        function Start() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        Start.prototype.Start = function () {
            this._background = new createjs.Bitmap(config.Game.ASSETS.getResult("backgroundOriginal"));
            this._thanksLabel = new objects.Label("Thank you for playing!", "bold 36px", "Verdana", "#000", 5, 5, false);
            this._titleLabel = new objects.Label("SLOT MACHINE", "bold 16px", "Stint Ultra Condensed", "#000", 605, 570, false);
            this._playButton = new objects.Button("startPlayButton", 10, config.Game.SCREEN_HEIGHT - 70, false);
            this.Main();
        };
        Start.prototype.Update = function () { };
        Start.prototype.Main = function () {
            // Add the background
            this.addChild(this._background);
            // Add the labels
            this.addChild(this._thanksLabel);
            this.addChild(this._titleLabel);
            this.addChild(this._playButton);
            // Events
            this._playButton.on("click", function () {
                config.Game.SCENE = scenes.State.PLAY;
            });
        };
        return Start;
    }(objects.Scene));
    scenes.Start = Start;
})(scenes || (scenes = {}));
//# sourceMappingURL=Start.js.map