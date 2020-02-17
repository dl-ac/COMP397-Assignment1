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
    var Reel = /** @class */ (function (_super) {
        __extends(Reel, _super);
        // CONSTRUCTOR
        function Reel(initialFigures, x) {
            if (x === void 0) { x = 0; }
            var _this = _super.call(this, config.Game.ASSETS.getResult("reelFigures"), x, Reel.POS_Y, false) || this;
            _this._figures = initialFigures;
            _this.Start();
            return _this;
        }
        Object.defineProperty(Reel.prototype, "isMoving", {
            // PROPERTIES
            get: function () {
                return this.velocity.y != 0;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        Reel.prototype._checkBounds = function () {
            if (this.y >= Reel.POS_Y) {
                this.Reset();
            }
        };
        Reel.prototype.ConvertFigureToAssetId = function (value) {
            var assetId = "Blank";
            objects.ReelFigures.RED_XIII.toString().toLowerCase;
            switch (value) {
                case objects.ReelFigures.RED_XIII:
                    assetId = "RedXIII";
                    break;
                case objects.ReelFigures.CID:
                    assetId = "Cid";
                    break;
                case objects.ReelFigures.VINCENT:
                    assetId = "Vincent";
                    break;
                case objects.ReelFigures.YUFFIE:
                    assetId = "Yuffie";
                    break;
                case objects.ReelFigures.TIFA:
                    assetId = "Tifa";
                    break;
                case objects.ReelFigures.BARRET:
                    assetId = "Barret";
                    break;
                case objects.ReelFigures.AERIS:
                    assetId = "Aeris";
                case objects.ReelFigures.CLOUD:
                    assetId = "Cloud";
                    break;
                case objects.ReelFigures.SEPHIROTH:
                    assetId = "Sephiroth";
                    break;
            }
            return assetId;
        };
        Reel.prototype._move = function () {
            this.position = objects.Vector2.add(this.position, this.velocity);
        };
        // PUBLIC METHODS
        Reel.prototype.Start = function () {
            // Verify the initial configuration of the reel, if there isn't enough symbols, add Cloud :) to it
            if (this._figures.length < 3) {
                for (var iCt = this._figures.length; iCt < 3; iCt++) {
                    this._figures.push(objects.ReelFigures.CLOUD);
                }
            }
            this._line1 = new objects.SingleReel(this.ConvertFigureToAssetId(this._figures[0]), this.position.x + 10, Reel.POS_Y + Reel.SEPARATOR_HEIGHT);
            this._line2 = new objects.SingleReel(this.ConvertFigureToAssetId(this._figures[1]), this.position.x + 10, Reel.POS_Y + Reel.SEPARATOR_HEIGHT * 2 + Reel.SINGLE_REEL_HEIGHT);
            this._line3 = new objects.SingleReel(this.ConvertFigureToAssetId(this._figures[2]), this.position.x + 10, Reel.POS_Y + Reel.SEPARATOR_HEIGHT * 3 + Reel.SINGLE_REEL_HEIGHT * 2);
            this.Reset();
        };
        Reel.prototype.Update = function () {
            // Only move if there is enable to move
            if (this._state != objects.ReelState.STOPPED) {
                // Check if the single reels is moving
                if (this._line1.isMoving || this._line2.isMoving || this._line3.isMoving) {
                    this._line1.Update();
                    this._line2.Update();
                    this._line3.Update();
                }
                else {
                    // After the single reels stopped, increase or decrease the speed
                    if (this._state == objects.ReelState.STARTING) {
                        this.velocity.y += Reel.SPEED_STEP_PER_TICK;
                        if (this.velocity.y >= Reel.MAX_REEL_SPEED) {
                            this.velocity.y = Reel.MAX_REEL_SPEED;
                            this._state = objects.ReelState.SPINNING;
                        }
                    }
                    else if (this._state == objects.ReelState.STOPPING) {
                        this.velocity.y -= Reel.SPEED_STEP_PER_TICK;
                        if (this.velocity.y <= objects.SingleReel.SINGLE_REEL_SPEED) {
                            this.velocity.y = objects.SingleReel.SINGLE_REEL_SPEED;
                            this._state = objects.ReelState.READY_TO_STOP;
                        }
                    }
                }
                this._move();
                this._checkBounds();
            }
        };
        Reel.prototype.Reset = function () {
            this.position = new objects.Vector2(this.x, Reel.POS_Y - this.height + Reel.TOTAL_SCREEN_HEIGHT - Reel.SEPARATOR_HEIGHT);
        };
        Reel.prototype.AddObjectsToScene = function (scene) {
            scene.addChild(this._line1);
            scene.addChild(this._line2);
            scene.addChild(this._line3);
        };
        Reel.prototype.StartSpin = function (result) {
            this._figures = result;
            this.velocity = new objects.Vector2(0, objects.SingleReel.SINGLE_REEL_SPEED);
            this._state = objects.ReelState.STARTING;
            this._line1.StartMovement(this.ConvertFigureToAssetId(result[0]));
            this._line2.StartMovement(this.ConvertFigureToAssetId(result[1]));
            this._line3.StartMovement(this.ConvertFigureToAssetId(result[2]));
        };
        // CONSTANTS
        Reel.POS_Y = 140;
        Reel.TOTAL_SCREEN_HEIGHT = 280;
        Reel.SEPARATOR_HEIGHT = 10;
        Reel.SINGLE_REEL_HEIGHT = 80;
        Reel.SPEED_STEP_PER_TICK = 0.2;
        Reel.MAX_REEL_SPEED = 30;
        return Reel;
    }(objects.GameObject));
    objects.Reel = Reel;
})(objects || (objects = {}));
//# sourceMappingURL=Reel.js.map