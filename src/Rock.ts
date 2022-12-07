import { dimensions, position } from "./interfaces";
import Characters from "./Characters";

class Rock extends Characters {
  canvas: HTMLCanvasElement;
  url: string;
  direction!: string;
  interval!: number;
  constructor(
    dimensions: dimensions,
    position: position,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D | null,
    url: string
  ) {
    super(dimensions, position, ctx, url);
    this.url = url;
    this.canvas = canvas;
  }
  attack = async () => {};

  update(): void {}
}
export default Rock;
