"use strict";
var objects;
(function (objects) {
    class Image extends createjs.Bitmap {
        // constructor
        constructor(imagePath = "./Assets/images/button.png", x = 0, y = 0, isCentered = false) {
            super(imagePath);
            this.image.addEventListener("load", () => {
                if (isCentered) {
                    this.regX = this.getBounds().width * 0.5;
                    this.regY = this.getBounds().height * 0.5;
                }
                this.x = x;
                this.y = y;
            });
        }
    }
    objects.Image = Image;
})(objects || (objects = {}));
//# sourceMappingURL=Image.js.map