"use strict";
var objects;
(function (objects) {
    class Image extends objects.GameObject {
        // constructor
        constructor(imagePath = "./Assets/images/placeholder.png", x = 0, y = 0, isCentered = false) {
            super(imagePath, x, y, isCentered);
            this.Start();
        }
        // PRIVATE METHODS
        _checkBounds() { }
        /**
         * This function is used for initialization
         *
         * @memberof Button
         */
        Start() { }
        Update() { }
        Reset() { }
    }
    objects.Image = Image;
})(objects || (objects = {}));
//# sourceMappingURL=Image.js.map