module util {
  export abstract class Util {
    // PUBLIC STATIC METHODS
    public static inRange(value: number, min: number, max: number): boolean {
      return (value - min) * (value - max) <= 0;
    }
  }
}
