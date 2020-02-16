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
var objects;
(function (objects) {
    var LcdDisplay = /** @class */ (function (_super) {
        __extends(LcdDisplay, _super);
        // constructor
        function LcdDisplay(imageId, title, value, x, y, isCentered) {
            if (imageId === void 0) { imageId = "largeFrame"; }
            if (title === void 0) { title = " "; }
            if (value === void 0) { value = 0; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (isCentered === void 0) { isCentered = false; }
            var _this = _super.call(this, config.Game.ASSETS.getResult(imageId), x, y, isCentered) || this;
            _this._title = title;
            _this._value = value;
            _this.Start();
            return _this;
        }
        Object.defineProperty(LcdDisplay.prototype, "Value", {
            // Properties
            get: function () {
                return this._value;
            },
            set: function (newValue) {
                this._value = newValue;
                this._labelData.setText(Math.floor(this._value).toString());
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        LcdDisplay.prototype._checkBounds = function () { };
        /**
         * This function is used for initialization
         *
         * @memberof Button
         */
        LcdDisplay.prototype.Start = function () {
            var topLeftPos = this.getTopLeftPosition();
            this.name = "Display";
            // Create the labels
            this._labelTitle = new objects.Label(this._title, "bold 16px", "Verdana", "#FFF", topLeftPos.x + this.halfWidth, topLeftPos.y + 20, true);
            this._labelData = new objects.Label(Math.floor(this._value).toString(), "36px", "DigitalMono", config.Game.DISPLAY_COLOR, topLeftPos.x + this.halfWidth, topLeftPos.y + this.halfHeight + 12, true);
        };
        LcdDisplay.prototype.Update = function () { };
        LcdDisplay.prototype.Reset = function () { };
        LcdDisplay.prototype.AddObjectsToScene = function (scene) {
            // Add both label to the same parent as the frame (actual bitmap)
            scene.addChild(this._labelTitle);
            scene.addChild(this._labelData);
        };
        return LcdDisplay;
    }(objects.GameObject));
    objects.LcdDisplay = LcdDisplay;
})(objects || (objects = {}));
//# sourceMappingURL=LcdDisplay.js.map