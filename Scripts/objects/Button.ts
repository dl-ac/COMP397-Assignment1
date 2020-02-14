module objects {
  export class Button extends objects.Image {
    // constructor
    constructor(
      imagePath: string = "./Assets/images/button.png",
      x: number = 0,
      y: number = 0,
      isCentered: boolean = false
    ) {
      super(imagePath, x, y, isCentered);

      this.on("mouseover", this.MouseOver);
      this.on("mouseout", this.MouseOut);
    }

    // methods
    MouseOver(): void {
      this.alpha = 0.7;
    }

    MouseOut(): void {
      this.alpha = 1.0;
    }
  }
}
