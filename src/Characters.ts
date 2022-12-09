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
    arrowBeginningLeft!: HTMLImageElement;
    arrowBeginningRight!: HTMLImageElement;
    arrowBeginningDown!: HTMLImageElement;
    arrowBeginningUp!: HTMLImageElement;
    arrowRestLeft!: HTMLImageElement;
    arrowRestRight!: HTMLImageElement;
    arrowRestDown!: HTMLImageElement;
    arrowRestUp!: HTMLImageElement;
    theRock1!: HTMLImageElement;
    theRock2!: HTMLImageElement;
    theRock3!: HTMLImageElement;
    theRock4!: HTMLImageElement;
    enemy!: HTMLImageElement;
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
        this.arrowBeginningLeft = await createImage("./arrowBeginningLeft.png");
        this.arrowBeginningRight = await createImage(
            "./arrowBeginningRight.png"
        );
        this.arrowBeginningDown = await createImage("./arrowBeginningDown.png");
        this.arrowBeginningUp = await createImage("./arrowBeginningUp.png");
        this.arrowRestLeft = await createImage("./arrowRestLeft.png");
        this.arrowRestRight = await createImage("./arrowRestRight.png");
        this.arrowRestDown = await createImage("./arrowRestDown.png");
        this.arrowRestUp = await createImage("./arrowRestUp.png");
        this.theRock1 = await createImage("./theRock1.png");
        this.theRock2 = await createImage("./theRock2.png");
        this.theRock3 = await createImage("./theRock3.png");
        this.theRock4 = await createImage("./theRock4.png");
        this.enemy = await createImage("./enemy1.png");
        console.log("every sprite loaded");
    };
    drawBoy = async (boolean: boolean, direction: string) => {
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
    drawRocks = async () => {
       this.ctx!.drawImage(
           this.theRock1,
           this.position.x,
           this.position.y,
           this.dimensions.width,
           this.dimensions.height
       );
    };
    drawEnemy = async () => {
        this.ctx!.drawImage(
            this.enemy,
            this.position.x,
            this.position.y,
            this.dimensions.width,
            this.dimensions.height
        );
    };
}
export default Characters;
