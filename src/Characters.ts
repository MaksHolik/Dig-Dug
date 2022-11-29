import { createImage } from "./ImageLoader";
import { position, dimensions } from "./interfaces";
abstract class Characters {
  dimensions: dimensions;
  position: position;
  ctx: CanvasRenderingContext2D | null;
  url: string;
  image!: HTMLImageElement;
  image1!: HTMLImageElement;
  image2!: HTMLImageElement;
  image3!: HTMLImageElement;
  image4!: HTMLImageElement;
  image1_1!: HTMLImageElement;
  image2_1!: HTMLImageElement;
  image3_1!: HTMLImageElement;
  image4_1!: HTMLImageElement;
  constructor(
    dimensions: dimensions,
    position: position,
    ctx: CanvasRenderingContext2D | null,
    url: string
  ) {
    this.dimensions = dimensions;
    this.position = position;
    this.ctx = ctx;
    this.url = url;
  }
  init = async () => {
    this.image = await createImage("./boy.png");
    this.image1 = await createImage("./boy1.png");
    this.image2 = await createImage("./boy2.png");
    this.image3 = await createImage("./boy3.png");
    this.image4 = await createImage("./boy4.png");
    this.image1_1 = await createImage("./boy1_1.png");
    this.image2_1 = await createImage("./boy2_1.png");
    this.image3_1 = await createImage("./boy3_1.png");
    this.image4_1 = await createImage("./boy4_1.png");
  };
  drawBoy = async (boolean: boolean, direction: string) => {
    console.log(boolean);
    
    let boyy = this.image1;
    if (direction == "ArrowUp") {
      boolean ? (boyy = this.image3_1) : (boyy = this.image4_1);
    } else if (direction == "ArrowDown") {
      boolean ? (boyy = this.image3) : (boyy = this.image4);
    } else if (direction == "ArrowLeft") {
      boolean ? (boyy = this.image1) : (boyy = this.image2);
    } else if (direction == "ArrowRight") {
      boolean ? (boyy = this.image1_1) : (boyy = this.image2_1);
    }

    this.ctx!.drawImage(
      boyy,
      this.position.x,
      this.position.y,
      this.dimensions.width,
      this.dimensions.height
    );
  };
}
export default Characters;
