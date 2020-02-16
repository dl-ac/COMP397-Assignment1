module config {
  export class Game {
    public static DISPLAY_COLOR: string = "#BF190D";

    public static SCREEN_WIDTH: number;
    public static SCREEN_HEIGHT: number;
    public static SCENE: scenes.State;
    public static ASSETS: createjs.LoadQueue;
    public static FPS: number = 60; // 60 Frames per second
    public static VALUE_MANAGER: managers.InternalValues;
  }
}
