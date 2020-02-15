"use strict";
var objects;
(function (objects) {
    class Label extends createjs.Text {
        // constructor
        constructor(labelString = "empty label", fontSize = "12px", fontFamily = "Consolas", fontColour = "#000000", x = 0, y = 0, isCentered = false) {
            super(labelString, fontSize + " " + fontFamily, fontColour);
            this._isCentered = isCentered;
            if (isCentered) {
                this.regX = this.getBounds().width * 0.5;
                this.regY = this.getMeasuredLineHeight() * 0.5;
            }
            this.x = x;
            this.y = y;
        }
        // methods
        setText(newText) {
            this.text = newText;
            if (this._isCentered) {
                this.regX = this.getBounds().width * 0.5;
                //          this.regY = this.getMeasuredLineHeight() * 0.5;
            }
        }
    }
    objects.Label = Label;
})(objects || (objects = {}));
//# sourceMappingURL=Label.js.map