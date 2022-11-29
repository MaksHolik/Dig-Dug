import { createImage } from "./ImageLoader";
import Text from "./Text";

class UI {
    ctx: CanvasRenderingContext2D;
    points: number;
    round: number;
    boy!: HTMLImageElement;
    hp: CanvasRenderingContext2D;
    hpCounter: number
    constructor(
        ctx: CanvasRenderingContext2D,
        points: number,
        hp: CanvasRenderingContext2D,
        hpCounter: number
    ) {
        this.ctx = ctx;
        this.points = points;
        this.round = 1;
        this.hp = hp
        this.hpCounter = hpCounter
    }
    init = async () => {
        this.boy = await createImage("./boy.png");
    };

    draw = (round: string) => {
        new Text({
            color: "red",
            size: 30,
            position: { left: 130, top: 25 },
            text: "1UP",
            ctx: this.ctx,
        });
        new Text({
            color: "red",
            size: 30,
            position: { left: 250, top: 25 },
            text: "HI-SCORE",
            ctx: this.ctx,
        });
        new Text({
            color: "white",
            size: 25,
            position: { left: 140, top: 50 },
            text: `${this.points}`,
            ctx: this.ctx,
        });
        new Text({
            color: "white",
            size: 25,
            position: { left: 305, top: 50 },
            text: "10000",
            ctx: this.ctx,
        });
        new Text({
            color: "white",
            size: 30,
            position: { left: 510, top: 840 },
            text: "ROUND",
            ctx: this.ctx,
        });
        new Text({
            color: "white",
            size: 30,
            position: { left: 630, top: 865 },
            text: `${round}`,
            ctx: this.ctx,
        });
        for (let i = 0; i < this.hpCounter; i++) {
            this.hp.drawImage(this.boy, 55 * i, 820, 50, 50);
        }
    };
}
export default UI;
