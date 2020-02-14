"use strict";
var objects;
(function (objects) {
    class GameObject extends createjs.Bitmap {
        // CONSTRUCTOR
        constructor(imageString = "./Assets/images/placeholder.png", x = 0, y = 0, centered = false) {
            super(imageString);
            // initialization
            this._width = 0;
            this._height = 0;
            this._halfWidth = 0;
            this._halfHeight = 0;
            this._position = new objects.Vector2(0, 0, this);
            this._isColliding = false;
            this.image.addEventListener("load", () => {
                this.width = this.getBounds().width;
                this.height = this.getBounds().height;
                if (centered) {
                    this.regX = this.halfWidth;
                    this.regY = this.halfHeight;
                }
            });
            this.position = new objects.Vector2(x, y, this);
        }
        // PUBLIC PROPERTIES
        get width() {
            return this._width;
        }
        set width(newWidth) {
            this._width = newWidth;
            this._halfWidth = this._computeHalfWidth();
        }
        get height() {
            return this._height;
        }
        set height(newHeight) {
            this._height = newHeight;
            this._halfHeight = this._computeHalfHeight();
        }
        get halfWidth() {
            return this._halfWidth;
        }
        get halfHeight() {
            return this._halfHeight;
        }
        get position() {
            return this._position;
        }
        set position(newPosition) {
            this._position = newPosition;
            this.x = newPosition.x;
            this.y = newPosition.y;
        }
        get isColliding() {
            return this._isColliding;
        }
        set isColliding(newState) {
            this._isColliding = newState;
        }
        // PRIVATE METHODS
        _computeHalfWidth() {
            return this.width * 0.5;
        }
        _computeHalfHeight() {
            return this.height * 0.5;
        }
    }
    objects.GameObject = GameObject;
})(objects || (objects = {}));
//# sourceMappingURL=GameObject.js.map