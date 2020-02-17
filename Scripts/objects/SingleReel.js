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
    var SingleReel = /** @class */ (function (_super) {
        __extends(SingleReel, _super);
        // constructor
        function SingleReel(imageId, x, y) {
            if (imageId === void 0) { imageId = "button"; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var _this = _super.call(this, config.Game.ASSETS.getResult(imageId), x, y, false) || this;
            _this._screenPosition = new objects.Vector2(x, y);
            _this._belowPosition = new objects.Vector2(x, y + objects.Reel.TOTAL_SCREEN_HEIGHT);
            _this._abovePosition = new objects.Vector2(x, y - objects.Reel.TOTAL_SCREEN_HEIGHT);
            return _this;
        }
        Object.defineProperty(SingleReel.prototype, "isMoving", {
            // PROPERTIES
            get: function () {
                return this.velocity.y != 0;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        SingleReel.prototype._checkBounds = function () {
            // Reel already ouside on the bottom of screen, stop spinning, set the new image, and set the position above screen
            if (this.y >= this._belowPosition.y) {
                this.velocity = new objects.Vector2(0, 0);
                this.position = this._abovePosition;
            }
            // If the spin reach their original position, stop spinning
            if (this.y == this._screenPosition.y) {
                this.velocity = new objects.Vector2(0, 0);
            }
        };
        SingleReel.prototype._move = function () {
            this.position = objects.Vector2.add(this.position, this.velocity);
        };
        SingleReel.prototype.Start = function () {
            this.Reset();
        };
        SingleReel.prototype.Update = function () {
            this._move();
            this._checkBounds();
        };
        SingleReel.prototype.Reset = function () {
            this.position = this._screenPosition;
        };
        SingleReel.prototype.StartMovement = function (newImage) {
            if (newImage === void 0) { newImage = undefined; }
            if (newImage != undefined) {
                this.image = config.Game.ASSETS.getResult(newImage);
            }
            this.velocity = this.velocity = new objects.Vector2(0, SingleReel.SINGLE_REEL_SPEED);
        };
        // CONSTANTS
        SingleReel.SINGLE_REEL_SPEED = 10; // 8px per Frame
        return SingleReel;
    }(objects.GameObject));
    objects.SingleReel = SingleReel;
})(objects || (objects = {}));
//# sourceMappingURL=SingleReel.js.map