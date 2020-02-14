"use strict";
var objects;
(function (objects) {
    class Button extends objects.Image {
        // constructor
        constructor(imagePath = "./Assets/images/button.png", x = 0, y = 0, isCentered = false) {
            super(imagePath, x, y, isCentered);
            this.on("mouseover", this.MouseOver);
            this.on("mouseout", this.MouseOut);
        }
        // methods
        MouseOver() {
            this.alpha = 0.7;
        }
        MouseOut() {
            this.alpha = 1.0;
        }
    }
    objects.Button = Button;
})(objects || (objects = {}));
//# sourceMappingURL=Button.js.map